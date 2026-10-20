// ============ GESTION DES PROGRAMMES ============

const DEFAULT_PROGRAM_ID = 'default';

// ── Accès au programme actif ──────────────────────────────────────────────────

function getActiveProgram() {
  if (!state.activeProgramId || state.activeProgramId === DEFAULT_PROGRAM_ID) {
    return PROGRAM;
  }
  const custom = (state.customPrograms || []).find(p => p.id === state.activeProgramId);
  return custom ? custom.days : PROGRAM;
}

function getActiveProgramMeta() {
  if (!state.activeProgramId || state.activeProgramId === DEFAULT_PROGRAM_ID) {
    return { id: DEFAULT_PROGRAM_ID, name: 'Programme Ponos', isDefault: true, days: PROGRAM };
  }
  return (state.customPrograms || []).find(p => p.id === state.activeProgramId)
      || { id: DEFAULT_PROGRAM_ID, name: 'Programme Ponos', isDefault: true, days: PROGRAM };
}

function setActiveProgram(id) {
  state.activeProgramId = id;
  // Réinitialiser dayIdx si le nouveau programme a moins de jours
  const prog = getActiveProgram();
  if (state.dayIdx >= prog.length) state.dayIdx = 0;
  state.activeEx = null;
  saveState();
}

// ── Retrouver un jour depuis son ID (pour l'historique) ───────────────────────

function findDayInfo(dayId) {
  // Programme par défaut
  const d = PROGRAM.find(d => d.id === dayId);
  if (d) return { day: d, programName: 'Programme Ponos' };
  // Programmes custom
  for (const prog of (state.customPrograms || [])) {
    const day = prog.days.find(d => d.id === dayId);
    if (day) return { day, programName: prog.name };
  }
  return null;
}

// ── Bibliothèque d'exercices (pour le picker) ─────────────────────────────────

// Mapping ID exercice → groupe musculaire
const MUSCLE_GROUPS = {
  a1:'Pectoraux', a2:'Dos', a3:'Pectoraux', a4:'Dos', a5:'Épaules', a6:'Bras',
  b1:'Épaules',   b2:'Dos', b3:'Dos',       b4:'Épaules', b5:'Épaules',
  c1:'Pectoraux', c2:'Dos', c3:'Pectoraux', c4:'Épaules', c5:'Épaules', c6:'Bras',
};

const MUSCLE_ORDER = ['Pectoraux', 'Dos', 'Épaules', 'Bras'];

function getExerciseLibrary() {
  const lib = [];
  const seen = new Set();
  PROGRAM.forEach(day => {
    day.exercises.forEach(ex => {
      if (!seen.has(ex.id)) {
        seen.add(ex.id);
        lib.push({
          ...ex,
          _muscle: MUSCLE_GROUPS[ex.id] || 'Autre',
          _accent: day.accent,
        });
      }
    });
  });
  // Trier par ordre musculaire défini
  lib.sort((a, b) => {
    const ia = MUSCLE_ORDER.indexOf(a._muscle);
    const ib = MUSCLE_ORDER.indexOf(b._muscle);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  return lib;
}

// ── CRUD programmes custom ────────────────────────────────────────────────────

function generateId() {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
}

function createCustomProgram(data) {
  if (!state.customPrograms) state.customPrograms = [];
  const prog = {
    id:        generateId(),
    name:      data.name      || 'Nouveau programme',
    objective: data.objective || 'force',
    days:      data.days      || [],
    createdAt: new Date().toISOString(),
  };
  state.customPrograms.push(prog);
  saveState();
  return prog;
}

function updateCustomProgram(id, data) {
  if (!state.customPrograms) return;
  const idx = state.customPrograms.findIndex(p => p.id === id);
  if (idx < 0) return;
  Object.assign(state.customPrograms[idx], data);
  saveState();
}

function deleteCustomProgram(id) {
  if (!state.customPrograms) return;
  state.customPrograms = state.customPrograms.filter(p => p.id !== id);
  // Si on supprime le programme actif → revenir au défaut
  if (state.activeProgramId === id) setActiveProgram(DEFAULT_PROGRAM_ID);
  saveState();
}

// ── Unicité des identifiants ──────────────────────────────────────────────────

// IDs de jours déjà pris ailleurs dans l'app (programme par défaut + autres programmes perso).
function usedDayIds(excludeProgramId) {
  const used = new Set(PROGRAM.map(d => d.id));
  (state.customPrograms || []).forEach(p => {
    if (p.id && p.id === excludeProgramId) return;
    p.days.forEach(d => used.add(d.id));
  });
  return used;
}

// Donne un nouvel ID à chaque jour dont l'ID est déjà utilisé ailleurs (ou en double
// dans ce même programme). À appeler avant d'enregistrer un programme.
function ensureUniqueDayIds(prog) {
  const used = usedDayIds(prog._fromDefault ? null : prog.id);
  prog.days.forEach(day => {
    if (!day.id || used.has(day.id)) day.id = `day-${generateId()}`;
    used.add(day.id);
  });
}

// ── Migration des données existantes ──────────────────────────────────────────
// Corrige deux problèmes des anciennes versions :
//  1. des jours de programmes différents partageaient le même ID (modèle vide
//     "new-day-0/1/2", copie du programme par défaut qui gardait "A/B/C") ;
//  2. un exercice de la bibliothèque ajouté à un programme perso recevait un
//     nouvel ID, ce qui coupait son historique.
// Renvoie true si quelque chose a été modifié.
function migrateProgramIds() {
  const programs = state.customPrograms || [];
  if (!programs.length) return false;
  let changed = false;

  // Nombre de séries d'une séance qui correspondent aux exercices d'un jour.
  const score = (entry, day) => {
    const ids = new Set(day.exercises.map(e => e.id));
    return Object.keys(entry.sets || {}).filter(k => ids.has(k.slice(0, k.lastIndexOf('_')))).length;
  };

  // 1. Jours en double. Le premier propriétaire d'un ID le garde (le programme par
  //    défaut d'abord) ; les suivants reçoivent un nouvel ID. Chaque séance est
  //    rattachée au jour dont les exercices correspondent le mieux à ses séries.
  const owners = new Map(); // id → [jours qui le portent]
  PROGRAM.forEach(d => owners.set(d.id, [d]));
  programs.forEach(p => p.days.forEach(d => {
    if (!owners.has(d.id)) owners.set(d.id, []);
    owners.get(d.id).push(d);
  }));

  owners.forEach((days, id) => {
    if (days.length < 2) return;
    // Choisir le jour de chaque séance AVANT de renommer
    const assignments = state.history
      .filter(h => h.dayId === id)
      .map(h => {
        let best = days[0], bestScore = score(h, days[0]);
        days.forEach(d => { const s = score(h, d); if (s > bestScore) { best = d; bestScore = s; } });
        return [h, best];
      });
    days.slice(1).forEach(d => { d.id = `day-${generateId()}`; });
    assignments.forEach(([h, d]) => { h.dayId = d.id; });
    changed = true;
  });

  // 2. Exercices de la bibliothèque avec un ID généré : reprendre l'ID d'origine
  //    (repéré par le nom exact) et réécrire les séries enregistrées.
  const libIdByName = {};
  PROGRAM.forEach(d => d.exercises.forEach(e => {
    if (!(e.name in libIdByName)) libIdByName[e.name] = e.id;
  }));
  const libIds = new Set(Object.values(libIdByName));

  programs.forEach(p => p.days.forEach(day => {
    day.exercises.forEach(ex => {
      const libId = libIdByName[ex.name];
      if (!libId || ex.id === libId || libIds.has(ex.id)) return;
      if (day.exercises.some(e => e.id === libId)) return; // déjà présent dans ce jour
      const oldId = ex.id;
      ex.id = libId;
      state.history.forEach(h => {
        if (h.dayId !== day.id || !h.sets) return;
        Object.keys(h.sets).forEach(k => {
          const i = k.slice(k.lastIndexOf('_') + 1);
          if (k.slice(0, k.lastIndexOf('_')) !== oldId) return;
          h.sets[`${libId}_${i}`] = h.sets[k];
          delete h.sets[k];
        });
      });
      Object.keys(state.current || {}).forEach(k => {
        if (!k.startsWith(oldId + '_')) return;
        const nk = libId + k.slice(oldId.length);
        if (!(nk in state.current)) state.current[nk] = state.current[k];
        delete state.current[k];
      });
      changed = true;
    });
  }));

  return changed;
}

// ============ PAGE PROGRAMMES & ÉDITEUR ============

// ── État de l'éditeur ─────────────────────────────────────────────────────────
let editorData   = null; // programme en cours de création/édition
let editorStep   = 1;    // 0 = Point de départ (nouveau), 1 = Programme, 2 = Jours, 3 = Exercices
let editorDayTab = 0;    // onglet actif dans l'étape 3
let editorIsNew  = false; // ouvert avec « Nouvelle mission » (étape 0 accessible)

// Bibliothèque (feuille « Ajouter un exercice »)
let pickerOpen         = false;
let pickerTargetDayIdx = 0;
let pickerFilter       = 'Tous';
let pickerSearch       = '';
let pickerPreviewId    = null; // exercice affiché en grand dans la feuille

const ACCENT_PRESETS = [
  '#C23B3B', '#2D7DD2', '#1A9E8F', '#E4A229',
  '#8B5CF6', '#F97316', '#06B6D4', '#EC4899',
];

const OBJECTIVE_LABELS = {
  force:   'Force',
  volume:  'Volume',
  mixte:   'Force & Volume',
};

// Réglages proposés par défaut selon l'objectif du programme
const OBJECTIVES = [
  { id:'volume', icon:'🔥', label:'Prendre du muscle', reps:'10-12', rest:90,
    desc:'Charges moyennes, 10-12 répétitions, 1 min 30 de repos. Le plus simple pour débuter.' },
  { id:'force',  icon:'⚡', label:'Devenir plus fort',  reps:'6-8',   rest:150,
    desc:'Charges lourdes, 6-8 répétitions, repos plus longs. Pour ceux qui ont déjà les bases.' },
  { id:'mixte',  icon:'⚔️', label:'Un peu des deux',    reps:'8-10',  rest:120,
    desc:'8-10 répétitions, 2 min de repos. Un bon compromis.' },
];
function objectiveOf(id) { return OBJECTIVES.find(o => o.id === id) || OBJECTIVES[0]; }

const WEEKDAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// ── Modèles de programme (pour démarrer sans rien connaître) ──────────────────
// Chaque exercice vient de la bibliothèque : animation et fiche incluses.
const PROGRAM_TEMPLATES = [
  {
    id: 'fullbody', icon: '🌱', name: 'Full body débutant', objective: 'volume',
    desc: '2 séances qui alternent, 3 fois par semaine. Tout le corps à chaque fois, surtout des machines faciles à prendre en main.',
    days: [
      { name: 'Séance A', subtitle: 'Tout le corps', when: 'Lundi', exercises: [
        ['x-presse', 3, '10-12', 120], ['c1', 3, '10-12', 90], ['x-divrow', 3, '10-12', 90],
        ['a4', 3, '10-12', 90], ['a5', 2, '12-15', 60], ['x-curl-poulie', 2, '10-12', 60] ] },
      { name: 'Séance B', subtitle: 'Tout le corps', when: 'Mercredi', exercises: [
        ['x-goblet', 3, '10-12', 90], ['x-incline-machine', 3, '10-12', 90], ['c2', 3, '10-12', 90],
        ['x-epaules-machine', 3, '10-12', 90], ['x-legcurl', 3, '10-12', 90], ['b5', 2, '15-20', 60] ] },
    ],
  },
  {
    id: 'hautbas', icon: '💪', name: 'Haut / Bas', objective: 'mixte',
    desc: '4 séances par semaine : 2 pour le haut du corps, 2 pour les jambes. Quand tu as quelques semaines de pratique.',
    days: [
      { name: 'Haut A', subtitle: 'Pecs, dos, épaules, bras', when: 'Lundi', exercises: [
        ['a1', 3, '8-10', 150], ['a2', 3, '8-10', 120], ['a3', 3, '10-12', 90],
        ['a4', 3, '10-12', 90], ['a5', 3, '12-15', 60], ['a6', 2, '10-12', 60] ] },
      { name: 'Bas A', subtitle: 'Jambes', when: 'Mardi', exercises: [
        ['x-presse', 4, '8-10', 120], ['x-legcurl', 3, '10-12', 90], ['x-legext', 3, '12-15', 60], ['x-mollets', 3, '12-15', 60] ] },
      { name: 'Haut B', subtitle: 'Pecs, dos, épaules, bras', when: 'Jeudi', exercises: [
        ['b1', 3, '8-10', 150], ['b2', 3, '8-10', 120], ['c1', 3, '10-12', 90],
        ['b3', 3, '10-12', 90], ['b5', 3, '15-20', 60], ['c6', 2, '10-12', 60] ] },
      { name: 'Bas B', subtitle: 'Jambes', when: 'Vendredi', exercises: [
        ['x-goblet', 3, '10-12', 90], ['x-presse', 3, '12-15', 90], ['x-legcurl', 3, '10-12', 90], ['x-mollets-presse', 3, '12-15', 60] ] },
    ],
  },
];

function buildFromTemplate(t) {
  return {
    id: null, name: t.name, objective: t.objective,
    days: t.days.map((d, i) => ({
      id: `day-${generateId()}`, name: d.name, subtitle: d.subtitle, when: d.when,
      accent: ACCENT_PRESETS[i % ACCENT_PRESETS.length],
      exercises: d.exercises.map(([exId, sets, reps, rest]) => {
        const lib = getExerciseById(exId);
        return { id: exId, name: lib.name, format: `${sets}×${reps}`, sets,
          topSet: false, superset: false, dropSet: false, rankKey: lib.rankKey || '',
          info: lib.info || null, restTime: rest, muscle: muscleOf(lib) };
      }),
    })),
  };
}

// ── Petites aides d'affichage ─────────────────────────────────────────────────
// Miniature fixe (légère) d'un exercice ; la fiche garde l'animation.
function exThumbSrc(ex) {
  const gif = ex && ex.info && ex.info.gif;
  return gif ? gif.replace(/\.gif$/, '.webp').replace('gifs/', 'gifs/thumbs/') : '';
}
function exThumb(ex, cls = '') {
  const src = exThumbSrc(ex);
  const col = MUSCLE_COLORS[muscleOf(ex)] || '#888';
  const letter = (ex.name || '?').charAt(0).toUpperCase();
  return src
    ? `<span class="pe-thumb ${cls}"><img src="${src}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='<span class=\\'pe-thumb-letter\\' style=\\'color:${col}\\'>${letter}</span>'"></span>`
    : `<span class="pe-thumb ${cls}"><span class="pe-thumb-letter" style="color:${col}">${letter}</span></span>`;
}
function fmtRest(sec) {
  if (!sec) return '';
  if (sec < 60) return `${sec} s`;
  return sec % 60 ? `${Math.floor(sec / 60)} min ${sec % 60}` : `${sec / 60} min`;
}
function hexA(hex, a) {
  const h = hex.replace('#', '');
  return `rgba(${parseInt(h.substr(0, 2), 16)},${parseInt(h.substr(2, 2), 16)},${parseInt(h.substr(4, 2), 16)},${a})`;
}

// ── Rendu de la page Programmes ───────────────────────────────────────────────
function renderPrograms() {
  const activeId  = state.activeProgramId || DEFAULT_PROGRAM_ID;
  const customs   = state.customPrograms  || [];
  const allProgs  = [
    { id: DEFAULT_PROGRAM_ID, name: 'Programme Ponos', objective: 'force', days: PROGRAM, isDefault: true },
    ...customs,
  ];

  let html = '<h2 class="page-title">Programmes</h2>';
  html += '<div class="warrior-section">Missions disponibles</div>';
  html += '<div class="hist-hint" style="margin:0 0 14px">Touche un programme pour le suivre · ✎ pour le modifier</div>';

  allProgs.forEach(prog => {
    const isActive = prog.id === activeId;
    html += `<div class="prog-card${isActive?' prog-card--active':''}" data-prog-id="${prog.id}" onclick="activateProgram('${prog.id}')">`;

    html += `<button class="pe-card-edit" aria-label="Modifier" onclick="event.stopPropagation();openProgramMenu('${prog.id}')">✎</button>`;

    // Badge actif
    if (isActive) {
      html += `<div class="prog-active-badge">
        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1L9 3L9 6Q9 9 5 10Q1 9 1 6L1 3Z" fill="none" stroke="currentColor" stroke-width="1"/></svg>
        EN COURS
      </div>`;
    }

    // Nom + objectif
    html += `<div class="prog-card-header">
      <div class="prog-card-name">${prog.name.toUpperCase()}</div>
      <div class="prog-card-meta">${OBJECTIVE_LABELS[prog.objective] || prog.objective} · ${prog.days.length} jour${prog.days.length > 1 ? 's' : ''}</div>
    </div>`;

    // Jours (pastilles colorées)
    html += '<div class="prog-day-dots">';
    prog.days.forEach(day => {
      html += `<div class="prog-day-dot" style="background:${day.accent}">
        <span class="prog-day-dot-label">${day.name.replace('Jour ','').replace('Séance ','').charAt(0)}</span>
      </div>`;
    });
    html += '</div>';

    // Noms des jours
    html += '<div class="prog-day-names">';
    prog.days.forEach(day => {
      html += `<span class="prog-day-name" style="color:${day.accent}">${day.name}</span>`;
    });
    html += '</div>';

    // Estimation de durée
    const estTime = estimateSessionTime(prog.days);
    if (estTime) {
      html += `<div class="prog-est-time">⏱ ${estTime} estimé par séance</div>`;
    }

    html += '</div>';
  });

  // Bouton créer
  html += `<div class="prog-create-btn" onclick="openProgramEditor(null)">
    <div class="prog-create-icon">＋</div>
    <div class="prog-create-label">Nouvelle mission</div>
  </div>`;

  document.getElementById('page-programs').innerHTML = html;
  initProgramLongPress();
}

function dayMinutes(day) {
  let sec = 600; // ~10 min d'échauffement
  (day.exercises || []).forEach(ex => { sec += (ex.sets || 3) * (40 + (ex.restTime || 90)); });
  return Math.round(sec / 60);
}

function estimateSessionTime(days) {
  if (!days || !days.length) return null;
  const min = Math.round(days.reduce((a, d) => a + dayMinutes(d), 0) / days.length);
  if (min < 60) return `${min} min`;
  return `${Math.floor(min/60)}h${min%60 > 0 ? (min%60)+'min' : ''}`;
}

function activateProgram(id) {
  setActiveProgram(id);
  renderPrograms();
  showToast(id === DEFAULT_PROGRAM_ID ? 'Programme Ponos activé' : 'Programme activé');
}

// Glisser vers la gauche (ou appui long) pour éditer/supprimer
function initProgramLongPress() {
  document.querySelectorAll('.prog-card[data-prog-id]').forEach(card => {
    const id = card.getAttribute('data-prog-id');

    let startX = 0, startY = 0, tracking = false, fired = false;

    card.addEventListener('touchstart', e => {
      startX   = e.touches[0].clientX;
      startY   = e.touches[0].clientY;
      tracking = true;
      fired    = false;
      card.style.transition = '';
    }, { passive: true });

    card.addEventListener('touchmove', e => {
      if (!tracking || fired) return;
      const dx = e.touches[0].clientX - startX;
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dy > Math.abs(dx) * 0.8 && dy > 8) { tracking = false; return; }
      if (dx < 0) card.style.transform = `translateX(${Math.max(dx * 0.4, -36)}px)`;
      if (dx < -55) {
        fired = true; tracking = false;
        card.style.transition = 'transform 0.2s ease, opacity 0.2s';
        card.style.transform  = 'translateX(-10px)';
        card.style.opacity    = '0.65';
        setTimeout(() => {
          card.style.transform = '';
          card.style.opacity   = '';
          card.style.transition = '';
          openProgramMenu(id);
        }, 180);
      }
    }, { passive: true });

    const reset = () => {
      if (fired) return;
      tracking = false;
      card.style.transition = 'transform 0.2s ease';
      card.style.transform  = '';
      card.style.opacity    = '';
    };
    card.addEventListener('touchend',    reset, { passive: true });
    card.addEventListener('touchcancel', reset, { passive: true });
    card.addEventListener('contextmenu', e => { e.preventDefault(); openProgramMenu(id); });
  });
}

function openProgramMenu(id) {
  const existing = document.getElementById('prog-actions-' + id);
  if (existing) { existing.remove(); return; }
  document.querySelectorAll('.prog-action-strip').forEach(el => el.remove());

  const isDefault = id === DEFAULT_PROGRAM_ID;
  const strip = document.createElement('div');
  strip.id        = 'prog-actions-' + id;
  strip.className = 'prog-action-strip';
  strip.innerHTML = isDefault
    ? `
    <button class="prog-action-btn prog-action-edit" onclick="openProgramEditor('${id}');document.getElementById('prog-actions-${id}')?.remove()">
      ✎ Modifier (copie)
    </button>`
    : `
    <button class="prog-action-btn prog-action-edit" onclick="openProgramEditor('${id}');document.getElementById('prog-actions-${id}')?.remove()">
      ✎ Modifier
    </button>
    <button class="prog-action-btn prog-action-del" onclick="confirmDeleteProgram('${id}')">
      ✕ Supprimer
    </button>
  `;

  const card = document.querySelector(`[data-prog-id='${id}']`);
  if (card) {
    card.insertAdjacentElement('afterend', strip);
    setTimeout(() => {
      document.addEventListener('touchstart', function dismiss(e) {
        if (!strip.contains(e.target) && !card.contains(e.target)) {
          strip.remove();
          document.removeEventListener('touchstart', dismiss);
        }
      }, { passive: true });
    }, 100);
  }
}

function confirmDeleteProgram(id) {
  document.getElementById('prog-actions-' + id)?.remove();
  const prog = (state.customPrograms || []).find(p => p.id === id);
  const name = prog ? prog.name : 'ce programme';
  if (!confirm(`Supprimer "${name}" ?\nCette action est irréversible.`)) return;
  deleteCustomProgram(id);
  renderPrograms();
  showToast('Programme supprimé');
}

// ── Éditeur de programme ──────────────────────────────────────────────────────

function blankDay(i) {
  return { id: `day-${generateId()}`, name: `Jour ${'ABCDEF'[i] || i + 1}`,
    when: ['Lundi', 'Mercredi', 'Vendredi', 'Mardi', 'Jeudi', 'Samedi'][i] || '',
    accent: ACCENT_PRESETS[i % ACCENT_PRESETS.length], subtitle: '', exercises: [] };
}

function openProgramEditor(id) {
  editorDayTab = 0;
  pickerOpen   = false;
  pendingExConfig = null;
  customExFormOpen = false;

  editorIsNew = !id;
  if (id) {
    editorStep = 1;
    if (id === DEFAULT_PROGRAM_ID) {
      editorData = JSON.parse(JSON.stringify({
        id: null, name: 'Programme Ponos', objective: 'force', days: PROGRAM, _fromDefault: true,
      }));
    } else {
      const existing = (state.customPrograms || []).find(p => p.id === id);
      editorData = JSON.parse(JSON.stringify(existing));
    }
  } else {
    // Nouveau : d'abord le point de départ (modèle ou page blanche)
    editorStep = 0;
    editorData = { id: null, name: '', objective: 'volume', days: [blankDay(0), blankDay(1), blankDay(2)] };
  }
  renderEditorOverlay();
}

function startFrom(kind) {
  if (kind === 'blank') {
    editorData = { id: null, name: '', objective: 'volume', days: [blankDay(0), blankDay(1), blankDay(2)] };
  } else if (kind === 'ponos') {
    editorData = JSON.parse(JSON.stringify({
      id: null, name: 'Programme Ponos (copie)', objective: 'force', days: PROGRAM, _fromDefault: true,
    }));
  } else {
    const t = PROGRAM_TEMPLATES.find(t => t.id === kind);
    if (t) editorData = buildFromTemplate(t);
  }
  editorStep = 1;
  renderEditorOverlay();
}

function renderEditorOverlay() {
  let overlay = document.getElementById('editor-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'editor-overlay';
    document.body.appendChild(overlay);
  }

  const stepLabels = ['Programme', 'Jours', 'Exercices'];
  const dots = stepLabels.map((l, i) =>
    `<div class="editor-step-dot ${editorStep === i+1 ? 'active' : editorStep > i+1 ? 'done' : ''}"></div>`
  ).join('');

  const header = editorStep === 0
    ? `<div class="editor-phase">
        <div class="editor-phase-label">NOUVEAU PROGRAMME</div>
        <div class="editor-phase-name">POINT DE DÉPART</div>
      </div>`
    : `<div class="editor-phase">
        <div class="editor-phase-label">ÉTAPE ${editorStep}/3</div>
        <div class="editor-phase-name">${stepLabels[editorStep-1].toUpperCase()}</div>
      </div>
      <div class="editor-step-dots">${dots}</div>`;

  let footer = '';
  if (editorStep > 0) {
    footer = `<div class="editor-footer">
      ${editorStep > 1 || editorIsNew
        ? `<button class="editor-btn editor-btn-prev" onclick="editorPrev()">← ${editorStep === 1 ? 'Départ' : 'Précédent'}</button>`
        : '<div></div>'}
      ${editorStep < 3
        ? '<button class="editor-btn editor-btn-next" onclick="editorNext()">Suivant →</button>'
        : '<button class="editor-btn editor-btn-save" onclick="editorSave()">✓ Enregistrer</button>'}
    </div>`;
  }

  overlay.className = 'editor-overlay' + (overlay.classList.contains('open') ? ' open' : '');
  overlay.innerHTML = `
    <div class="editor-header">
      <button class="editor-close" onclick="closeEditor()">✕</button>
      ${header}
    </div>
    <div class="editor-body" id="editor-body">${renderEditorStepHtml()}</div>
    ${footer}
    <div id="editor-sheet"></div>
  `;
  renderEditorSheet();
  requestAnimationFrame(() => overlay.classList.add('open'));
}

function renderEditorStepHtml() {
  return editorStep === 0 ? renderEditorStart()
    : editorStep === 1 ? renderEditorStep1()
    : editorStep === 2 ? renderEditorStep2()
    : renderEditorStep3();
}

function renderEditorBody() {
  const body = document.getElementById('editor-body');
  if (body) body.innerHTML = renderEditorStepHtml();
  renderEditorSheet();
}

// ── Étape 0 : Point de départ ─────────────────────────────────────────────────
function renderEditorStart() {
  const card = (onclick, icon, title, desc, badge = '') => `
    <button class="pe-start-card" onclick="${onclick}">
      <span class="pe-start-icon">${icon}</span>
      <span class="pe-start-text">
        <span class="pe-start-title">${title}${badge}</span>
        <span class="pe-start-desc">${desc}</span>
      </span>
      <span class="pe-start-arrow">›</span>
    </button>`;
  return `
    <p class="pe-lead">Tu peux partir d'un <strong>modèle tout prêt</strong> et l'ajuster, ou construire ton programme toi-même.</p>
    <div class="pe-section-label">Modèles</div>
    ${PROGRAM_TEMPLATES.map((t, i) => card(`startFrom('${t.id}')`, t.icon, t.name, t.desc,
      i === 0 ? '<span class="pe-badge">Conseillé pour débuter</span>' : '')).join('')}
    <div class="pe-section-label">Autres options</div>
    ${card(`startFrom('ponos')`, '⚔️', 'Copier le programme Ponos', '3 jours, haut du corps, avec top sets. Pour les habitués.')}
    ${card(`startFrom('blank')`, '📄', 'Partir de zéro', 'Tu choisis tout : nombre de jours, exercices, séries.')}
  `;
}

// ── Étape 1 : Programme ───────────────────────────────────────────────────────
function renderEditorStep1() {
  const dayCounts = [1, 2, 3, 4, 5, 6];
  return `
    <div class="editor-field">
      <div class="editor-field-label">Nom du programme</div>
      <input class="editor-input" type="text" placeholder="ex : Mon programme" value="${editorData.name}"
        oninput="editorData.name = this.value">
    </div>

    <div class="editor-field">
      <div class="editor-field-label">Objectif</div>
      <div class="pe-hint">Il sert à proposer les bons réglages quand tu ajoutes un exercice.</div>
      <div class="pe-objectives">
        ${OBJECTIVES.map(o => `
          <button class="pe-objective ${editorData.objective === o.id ? 'active' : ''}" onclick="editorData.objective='${o.id}';renderEditorBody()">
            <span class="pe-objective-icon">${o.icon}</span>
            <span><span class="pe-objective-label">${o.label}</span><span class="pe-objective-desc">${o.desc}</span></span>
          </button>`).join('')}
      </div>
    </div>

    <div class="editor-field">
      <div class="editor-field-label">Séances par semaine</div>
      <div class="pe-hint">Pour débuter, <strong>2 ou 3 séances</strong> suffisent largement.</div>
      <div class="editor-day-count-row">
        ${dayCounts.map(n => `
          <button class="editor-day-count-btn ${editorData.days.length === n ? 'active' : ''}" onclick="setEditorDayCount(${n})">${n}</button>`).join('')}
      </div>
    </div>
  `;
}

function setEditorDayCount(n) {
  const current = editorData.days.length;
  if (n < current && editorData.days.slice(n).some(d => d.exercises.length)) {
    if (!confirm(`Retirer ${current - n} séance${current - n > 1 ? 's' : ''} et leurs exercices ?`)) return;
  }
  for (let i = current; i < n; i++) editorData.days.push(blankDay(i));
  if (n < current) editorData.days = editorData.days.slice(0, n);
  if (editorDayTab >= n) editorDayTab = 0;
  renderEditorBody();
}

// ── Étape 2 : Les jours ───────────────────────────────────────────────────────
function renderEditorStep2() {
  return `<p class="pe-lead">Donne un nom à chaque séance et choisis le jour où tu la fais. La couleur sert juste à la repérer.</p>`
  + editorData.days.map((day, i) => `
    <div class="editor-day-config">
      <div class="editor-day-config-header" style="border-left:3px solid ${day.accent}">
        <div class="editor-day-config-num" style="color:${day.accent}">Séance ${i+1}</div>
      </div>

      <div class="editor-field-row">
        <div class="editor-field editor-field--half">
          <div class="editor-field-label">Nom</div>
          <input class="editor-input" type="text" value="${day.name}" placeholder="ex : Haut du corps"
            oninput="editorData.days[${i}].name = this.value">
        </div>
        <div class="editor-field editor-field--half">
          <div class="editor-field-label">Description</div>
          <input class="editor-input" type="text" value="${day.subtitle}" placeholder="ex : Pecs et dos"
            oninput="editorData.days[${i}].subtitle = this.value">
        </div>
      </div>

      <div class="editor-field">
        <div class="editor-field-label">Jour</div>
        <div class="pe-weekdays">
          ${WEEKDAYS.map(w => `<button class="pe-weekday ${day.when === w ? 'active' : ''}"
            style="${day.when === w ? `background:${day.accent};border-color:${day.accent}` : ''}"
            onclick="editorData.days[${i}].when='${day.when === w ? '' : w}';renderEditorBody()">${w.slice(0, 3)}</button>`).join('')}
        </div>
      </div>

      <div class="editor-field">
        <div class="editor-field-label">Couleur</div>
        <div class="editor-color-row">
          ${ACCENT_PRESETS.map(c => `
            <button class="editor-color-swatch ${day.accent === c ? 'active' : ''}" style="background:${c}"
              onclick="editorData.days[${i}].accent='${c}';renderEditorBody()"></button>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ── Étape 3 : Exercices ───────────────────────────────────────────────────────
function renderEditorStep3() {
  const day = editorData.days[editorDayTab];
  if (!day) return '';

  const tabs = editorData.days.map((d, i) => `
    <button class="editor-day-tab ${editorDayTab === i ? 'active' : ''}"
      style="${editorDayTab === i ? `color:${d.accent};border-bottom:2px solid ${d.accent}` : ''}"
      onclick="editorDayTab=${i}; renderEditorBody()">
      ${d.name}<span class="pe-tab-count">${d.exercises.length}</span>
    </button>`).join('');

  // Résumé de la séance : durée, séries, muscles travaillés
  const exos = day.exercises || [];
  const totalSets = exos.reduce((a, e) => a + (e.sets || 0), 0);
  const groups = [...new Set(exos.map(muscleOf))].filter(g => g !== 'Autre');
  const summary = exos.length ? `
    <div class="pe-summary">
      <div class="pe-summary-stats">
        <span><strong>${exos.length}</strong> exercice${exos.length > 1 ? 's' : ''}</span>
        <span><strong>${totalSets}</strong> séries</span>
        <span>≈ <strong>${dayMinutes(day)}</strong> min</span>
      </div>
      ${groups.length ? `<div class="pe-summary-groups">${groups.map(g =>
        `<span class="pe-group-chip" style="color:${MUSCLE_COLORS[g]};border-color:${hexA(MUSCLE_COLORS[g], 0.5)}">${g}</span>`).join('')}</div>` : ''}
    </div>` : '';

  const rows = exos.map((ex, ei) => {
    const tag = ex.topSet ? '<span class="pe-tag" style="color:var(--red)">TOP SET</span>'
      : ex.superset ? '<span class="pe-tag" style="color:var(--purple)">SUPERSET</span>'
      : ex.dropSet ? '<span class="pe-tag" style="color:var(--yellow)">DROP SET</span>' : '';
    return `
    <div class="pe-ex-row">
      <button class="pe-ex-thumb-btn" onclick="openEditorPreview('${ex.id}', ${ei})" aria-label="Voir la fiche">${exThumb(ex)}</button>
      <button class="pe-ex-main" onclick="editEditorEx(${ei})">
        <span class="pe-ex-name">${ei + 1}. ${ex.name}</span>
        <span class="pe-ex-meta">${ex.format}${ex.restTime ? ` · repos ${fmtRest(ex.restTime)}` : ''} ${tag}</span>
      </button>
      <span class="pe-ex-actions">
        <button class="pe-icon-btn" onclick="moveEditorEx(${ei},-1)" ${ei === 0 ? 'disabled' : ''} aria-label="Monter">↑</button>
        <button class="pe-icon-btn" onclick="moveEditorEx(${ei},1)" ${ei === exos.length - 1 ? 'disabled' : ''} aria-label="Descendre">↓</button>
        <button class="pe-icon-btn pe-icon-btn--del" onclick="removeEditorEx(${editorDayTab}, ${ei})" aria-label="Retirer">✕</button>
      </span>
    </div>`;
  }).join('');

  return `
    <div class="editor-day-tabs">${tabs}</div>
    ${summary}
    <div id="editor-exos-list">
      ${rows || `<div class="pe-empty">
        <div class="pe-empty-title">Aucun exercice pour l'instant</div>
        <div class="pe-empty-desc">Ajoute-en depuis la bibliothèque : chaque exercice a son animation et sa fiche. Compte <strong>5 à 7 exercices</strong> par séance.</div>
      </div>`}
    </div>
    ${exos.length ? '<div class="pe-hint" style="margin-top:6px">Touche un exercice pour changer ses séries · touche l\'image pour voir sa fiche.</div>' : ''}

    <div class="editor-add-ex-btns">
      <button class="editor-add-ex-btn" onclick="openExPicker(${editorDayTab})">+ Ajouter un exercice</button>
      <button class="editor-add-ex-btn editor-add-ex-btn--secondary" onclick="openCustomExForm(${editorDayTab})">+ Exercice absent de la liste</button>
    </div>
    ${customExFormOpen ? renderCustomExForm() : ''}
  `;
}

function moveEditorEx(ei, dir) {
  const list = editorData.days[editorDayTab].exercises;
  const j = ei + dir;
  if (j < 0 || j >= list.length) return;
  [list[ei], list[j]] = [list[j], list[ei]];
  renderEditorBody();
}

function removeEditorEx(dayIdx, exIdx) {
  editorData.days[dayIdx].exercises.splice(exIdx, 1);
  renderEditorBody();
}

// ── Feuilles (bibliothèque, fiche, réglages) ──────────────────────────────────
// Une seule feuille à la fois, au-dessus de l'éditeur.
function renderEditorSheet() {
  const el = document.getElementById('editor-sheet');
  if (!el) return;
  if (pendingExConfig)      el.innerHTML = renderExConfig();
  else if (pickerOpen)      el.innerHTML = renderExPicker();
  else                      el.innerHTML = '';
}

function sheet(title, content, { onClose = 'closeEditorSheet()', back = '', tall = true } = {}) {
  return `<div class="ex-picker-overlay" onclick="${onClose}">
    <div class="ex-picker pe-sheet${tall ? ' pe-sheet--tall' : ''}" onclick="event.stopPropagation()">
      <div class="ex-picker-header">
        ${back ? `<button class="pe-sheet-back" onclick="${back}">‹ Retour</button>` : ''}
        <div class="ex-picker-title">${title}</div>
        <button class="ex-picker-close" onclick="${onClose}">✕</button>
      </div>
      ${content}
    </div>
  </div>`;
}

function closeEditorSheet() {
  pickerOpen = false; pickerPreviewId = null; pendingExConfig = null;
  renderEditorSheet();
}

// ── Bibliothèque ──────────────────────────────────────────────────────────────
function openExPicker(dayIdx) {
  pickerOpen = true;
  pickerTargetDayIdx = dayIdx;
  pickerPreviewId = null;
  pickerSearch = '';
  customExFormOpen = false;
  renderEditorBody();
}

function closeExPicker() { closeEditorSheet(); }

function pickerMatches() {
  const q = pickerSearch.trim().toLowerCase();
  return getExerciseLibrary().filter(ex =>
    (pickerFilter === 'Tous' || ex._muscle === pickerFilter) &&
    (!q || ex.name.toLowerCase().includes(q) ||
      ((ex.info && ex.info.muscles && ex.info.muscles.main) || []).some(m => m.toLowerCase().includes(q))));
}

function renderPickerResults() {
  const day = editorData.days[pickerTargetDayIdx];
  const inDay = new Set(day.exercises.map(e => e.id));
  const list = pickerMatches();
  if (!list.length) return '<div class="pe-empty-desc" style="padding:24px 16px;text-align:center">Aucun exercice trouvé. Essaie un autre mot, ou ajoute un « exercice absent de la liste ».</div>';
  return list.map(ex => {
    const main = (ex.info && ex.info.muscles && ex.info.muscles.main) || [];
    return `<button class="pe-lib-item" onclick="pickerPreviewId='${ex.id}';renderEditorSheet()">
      ${exThumb(ex, 'pe-thumb--lg')}
      <span class="pe-lib-text">
        <span class="pe-lib-name">${ex.name}</span>
        <span class="pe-lib-muscles">${main.map(m => `<span style="color:${MUSCLE_COLORS[muscleGroupOf(m)]}">${m}</span>`).join(' · ')}</span>
        ${inDay.has(ex.id) ? '<span class="pe-lib-already">✓ Déjà dans cette séance</span>' : ''}
      </span>
      <span class="pe-start-arrow">›</span>
    </button>`;
  }).join('');
}

function renderExPicker() {
  const day = editorData.days[pickerTargetDayIdx];
  if (pickerPreviewId) return renderPickerPreview();

  const filters = ['Tous', ...MUSCLE_ORDER].map(g => {
    const col = MUSCLE_COLORS[g];
    const on = pickerFilter === g;
    const style = g === 'Tous'
      ? (on ? 'background:var(--text);border-color:var(--text);color:#000' : 'color:var(--text2)')
      : (on ? `background:${col};border-color:${col};color:#fff` : `color:${col}`);
    return `<button class="pe-filter${on ? ' active' : ''}" style="${style}"
      onclick="pickerFilter='${g}';renderEditorSheet()">${g}</button>`;
  }).join('');

  return sheet(`Ajouter à ${day.name}`, `
    <div class="pe-picker-tools">
      <input class="editor-input pe-search" type="search" placeholder="Rechercher (ex : presse, dos, biceps…)" value="${pickerSearch}"
        oninput="pickerSearch=this.value;document.getElementById('pe-picker-results').innerHTML=renderPickerResults()">
      <div class="pe-filters">${filters}</div>
    </div>
    <div class="ex-picker-list" id="pe-picker-results">${renderPickerResults()}</div>
  `);
}

// Fiche complète d'un exercice (animation, muscles, étapes) avant de l'ajouter
function renderExFicheHtml(ex) {
  const info = ex.info || {};
  const gif = info.gif ? info.gif.replace(/\.gif$/, '.webp') : '';
  const m = info.muscles || {};
  const chip = (name, main) => `<span class="muscle-chip${main ? ' muscle-chip--main' : ''}" style="--mc:${MUSCLE_COLORS[muscleGroupOf(name)]}">${name}</span>`;
  return `
    ${gif ? `<div class="info-gif-container pe-preview-gif"><img src="${gif}" alt="${ex.name}"></div>` : ''}
    <div class="pe-preview-name">${ex.name}</div>
    ${(m.main || []).length ? `<div class="info-muscles">
      <div class="info-muscles-row"><span class="info-muscles-label">Principaux</span><span class="info-muscles-chips">${m.main.map(x => chip(x, true)).join('')}</span></div>
      ${(m.secondary || []).length ? `<div class="info-muscles-row"><span class="info-muscles-label">Secondaires</span><span class="info-muscles-chips">${m.secondary.map(x => chip(x, false)).join('')}</span></div>` : ''}
    </div>` : ''}
    ${info.interet ? `<div class="info-why" style="margin-bottom:18px">${fmtFiche(info.interet)}</div>` : ''}
    ${(info.execution || []).length ? `<div class="info-section">
      <div class="info-section-title" style="color:var(--text)"><span class="dot" style="background:var(--text2)"></span>Comment le faire</div>
      <ol class="info-steps" style="--step-accent:#5A5A66">
        ${info.execution.map((p, i) => `<li class="info-step"><span class="info-step-num">${i + 1}</span><span class="info-step-text">${fmtFiche(p)}</span></li>`).join('')}
      </ol></div>` : ''}
  `;
}

function renderPickerPreview() {
  const ex = getExerciseById(pickerPreviewId);
  const day = editorData.days[pickerTargetDayIdx];
  if (!ex) { pickerPreviewId = null; return renderExPicker(); }
  return sheet('Fiche exercice', `
    <div class="pe-preview">${renderExFicheHtml(ex)}</div>
    <div class="pe-sheet-footer">
      <button class="editor-btn editor-btn-save" style="flex:1" onclick="addLibraryEx(${pickerTargetDayIdx}, '${ex.id}')">+ Ajouter à ${day.name}</button>
    </div>
  `, { back: "pickerPreviewId=null;renderEditorSheet()" });
}

// Fiche d'un exercice déjà dans le programme (depuis la miniature)
let editorPreviewIdx = null;
function openEditorPreview(exId, ei) {
  const ex = editorData.days[editorDayTab].exercises[ei];
  if (!ex) return;
  const el = document.getElementById('editor-sheet');
  el.innerHTML = sheet('Fiche exercice', `
    <div class="pe-preview">${ex.info ? renderExFicheHtml(ex) : `<div class="pe-preview-name">${ex.name}</div><div class="pe-empty-desc">Exercice personnalisé : pas de fiche.</div>`}</div>
    <div class="pe-sheet-footer">
      <button class="editor-btn editor-btn-next" style="flex:1" onclick="editEditorEx(${ei})">Changer les séries</button>
    </div>`);
}

// ── Réglages d'un exercice (ajout ou modification) ────────────────────────────
let pendingExConfig = null; // { name, dayIdx, rankKey, info, isCustom, libId, muscle, editIdx }
let exConfigSets    = 3;
let exConfigType    = 'normal'; // normal | topset | superset | dropset
let exConfigFormat  = '8-10';
let exConfigCustomFormat = '';
let exConfigRest    = 90; // secondes
let exConfigAdvanced = false;
let exConfigSuggested = null; // { reps, rest } conseillés pour cet exercice

const REST_PRESETS = [
  { label:'30 s',   val:30  },
  { label:'1 min',  val:60  },
  { label:'1:30',   val:90  },
  { label:'2 min',  val:120 },
  { label:'2:30',   val:150 },
  { label:'3 min',  val:180 },
];

const REP_PRESETS = [
  { label:'3-5',   val:'3-5'   },
  { label:'6-8',   val:'6-8'   },
  { label:'8-10',  val:'8-10'  },
  { label:'10-12', val:'10-12' },
  { label:'12-15', val:'12-15' },
  { label:'15-20', val:'15-20' },
];

const EX_TYPES = [
  { id:'normal',   label:'Normal',   desc:'Toutes les séries pareilles. Le bon choix dans 90 % des cas.' },
  { id:'topset',   label:'Top set',  desc:'1 série lourde (ta charge max), puis les autres un peu plus légères.' },
  { id:'superset', label:'Superset', desc:'Enchaîné sans repos avec l\'exercice suivant (ex : biceps puis triceps).' },
  { id:'dropset',  label:'Drop set', desc:'À la fin d\'une série, tu baisses la charge et tu continues.' },
];

function setupExConfig(base, ex) {
  const obj = objectiveOf(editorData.objective);
  const libReps = ex && ex.format ? (ex.format.match(/(\d+-\d+)/) || [])[1] : null;
  exConfigSuggested = { reps: (ex && ex.reps) || libReps || obj.reps, rest: (ex && ex.restTime) || obj.rest };
  pendingExConfig = base;
  exConfigSets   = (ex && ex.sets) || 3;
  exConfigType   = ex && ex.topSet ? 'topset' : ex && ex.superset ? 'superset' : ex && ex.dropSet ? 'dropset' : 'normal';
  exConfigFormat = exConfigSuggested.reps;
  exConfigCustomFormat = '';
  exConfigRest   = exConfigSuggested.rest;
  exConfigAdvanced = exConfigType !== 'normal';
}

function addLibraryEx(dayIdx, exId) {
  const ex = getExerciseById(exId);
  if (!ex) return;
  setupExConfig({
    name: ex.name, dayIdx, rankKey: ex.rankKey || '', info: ex.info || null,
    isCustom: false, libId: ex.id, // garder l'ID d'origine pour conserver l'historique
    muscle: muscleOf(ex),
  }, { ...ex, topSet: false, superset: false, dropSet: false });
  pickerOpen = false; pickerPreviewId = null;
  renderEditorBody();
}

function editEditorEx(ei) {
  const ex = editorData.days[editorDayTab].exercises[ei];
  if (!ex) return;
  setupExConfig({ name: ex.name, dayIdx: editorDayTab, rankKey: ex.rankKey || '', info: ex.info || null,
    isCustom: !ex.info, muscle: ex.muscle, editIdx: ei }, ex);
  // Garder exactement les réglages actuels (« 3×10-12 », « 3×(8+8) », « 4×10 »…)
  const f = ex.format || '';
  const range = f.match(/(\d+-\d+)/);
  const single = f.match(/(\d+)\s*(?:\+|\)|$)/);
  exConfigFormat = range ? range[1] : (single ? single[1] : exConfigFormat);
  if (!REP_PRESETS.some(r => r.val === exConfigFormat)) { exConfigCustomFormat = exConfigFormat; }
  exConfigRest = ex.restTime || exConfigRest;
  renderEditorBody();
}

// ── Formulaire exercice absent de la liste ───────────────────────────────────
let customExFormOpen = false;
let customExFormDay  = 0;
let customExMuscle   = 'Pectoraux';

function openCustomExForm(dayIdx) {
  customExFormOpen = true;
  customExFormDay  = dayIdx;
  pendingExConfig  = null;
  pickerOpen = false;
  renderEditorBody();
}

function closeCustomExForm() {
  customExFormOpen = false;
  renderEditorBody();
}

function renderCustomExForm() {
  if (!customExFormOpen) return '';
  return `<div class="custom-ex-form">
    <div class="editor-field-label" style="margin-bottom:8px">Nom de l'exercice</div>
    <input class="editor-input" id="cex-name" type="text" placeholder="ex : Squat barre" autofocus>
    <div class="editor-field-label" style="margin:14px 0 8px">Muscle travaillé</div>
    <div class="pe-filters" style="padding:0">
      ${MUSCLE_ORDER.map(g => `<button class="pe-filter${customExMuscle === g ? ' active' : ''}"
        style="${customExMuscle === g ? `background:${MUSCLE_COLORS[g]};border-color:${MUSCLE_COLORS[g]};color:#fff` : `color:${MUSCLE_COLORS[g]}`}"
        onclick="customExMuscle='${g}';const n=document.getElementById('cex-name').value;renderEditorBody();document.getElementById('cex-name').value=n">${g}</button>`).join('')}
    </div>
    <div class="editor-field-row" style="margin-top:14px;gap:8px">
      <button class="editor-btn editor-btn-prev" style="flex:1" onclick="closeCustomExForm()">Annuler</button>
      <button class="editor-btn editor-btn-next" style="flex:1" onclick="openCustomExConfig(${customExFormDay})">Suivant →</button>
    </div>
  </div>`;
}

function openCustomExConfig(dayIdx) {
  const name = document.getElementById('cex-name')?.value?.trim();
  if (!name) { showToast('Donne un nom à l\'exercice'); return; }
  setupExConfig({ name, dayIdx, rankKey: '', info: null, isCustom: true, muscle: customExMuscle }, null);
  customExFormOpen = false;
  renderEditorBody();
}

// ── Configurateur (commun bibliothèque + custom + modification) ──────────────
function exConfigSummary() {
  const reps = exConfigCustomFormat || exConfigFormat;
  const rest = fmtRest(exConfigRest);
  if (exConfigType === 'topset')   return `1 série lourde de ${reps} rép., puis ${Math.max(exConfigSets - 1, 0)} série${exConfigSets - 1 > 1 ? 's' : ''} plus légère${exConfigSets - 1 > 1 ? 's' : ''} · ${rest} de repos`;
  if (exConfigType === 'superset') return `${exConfigSets} séries de ${reps} rép., enchaînées avec l'exercice suivant`;
  if (exConfigType === 'dropset')  return `${exConfigSets} séries de ${reps} + ${reps} rép. · ${rest} de repos`;
  return `${exConfigSets} séries de ${reps} répétitions · ${rest} de repos`;
}

function renderExConfig() {
  if (!pendingExConfig) return '';
  const sug = exConfigSuggested || {};
  const isEdit = pendingExConfig.editIdx !== undefined;
  const fakeEx = { name: pendingExConfig.name, info: pendingExConfig.info, muscle: pendingExConfig.muscle };

  const repBtns = REP_PRESETS.map(r =>
    `<button class="ex-config-rep-btn ${exConfigFormat === r.val && !exConfigCustomFormat ? 'active' : ''}"
      onclick="exConfigFormat='${r.val}';exConfigCustomFormat='';renderEditorSheet()">
      ${r.label}${sug.reps === r.val ? '<span class="pe-reco">conseillé</span>' : ''}
    </button>`).join('');

  const restBtns = REST_PRESETS.map(r =>
    `<button class="ex-config-rep-btn ${exConfigRest === r.val ? 'active' : ''}"
      onclick="exConfigRest=${r.val};renderEditorSheet()">
      ${r.label}${sug.rest === r.val ? '<span class="pe-reco">conseillé</span>' : ''}
    </button>`).join('');

  const types = EX_TYPES.map(t =>
    `<button class="pe-type ${exConfigType === t.id ? 'active' : ''}" onclick="exConfigType='${t.id}';renderEditorSheet()">
      <span class="pe-type-label">${t.label}</span><span class="pe-type-desc">${t.desc}</span>
    </button>`).join('');

  return sheet(isEdit ? 'Modifier l\'exercice' : 'Réglages de l\'exercice', `
    <div class="pe-config">
      <div class="pe-config-head">
        ${exThumb(fakeEx, 'pe-thumb--lg')}
        <div>
          <div class="pe-preview-name" style="margin:0">${pendingExConfig.name}</div>
          <div class="pe-config-summary">${exConfigSummary()}</div>
        </div>
      </div>

      <div class="editor-field-label">Nombre de séries</div>
      <div class="ex-config-sets-row">
        <button class="ex-config-sets-btn" onclick="exConfigSets=Math.max(1,exConfigSets-1);renderEditorSheet()">−</button>
        <div class="ex-config-sets-val">${exConfigSets}</div>
        <button class="ex-config-sets-btn" onclick="exConfigSets=Math.min(8,exConfigSets+1);renderEditorSheet()">+</button>
      </div>
      <div class="pe-hint">Pour débuter : <strong>2 à 3 séries</strong> par exercice.</div>

      <div class="editor-field-label" style="margin-top:18px">Répétitions par série</div>
      <div class="ex-config-rep-presets">${repBtns}</div>
      <input class="editor-input ex-config-custom-input" type="text"
        placeholder="Ou un autre nombre (ex : 5, 20…)" value="${exConfigCustomFormat}"
        oninput="exConfigCustomFormat=this.value;exConfigFormat='custom';document.querySelector('.pe-config-summary').textContent=exConfigSummary()">

      <div class="editor-field-label" style="margin-top:18px">Repos entre deux séries</div>
      <div class="ex-config-rep-presets">${restBtns}</div>

      <button class="pe-advanced-toggle" onclick="exConfigAdvanced=!exConfigAdvanced;renderEditorSheet()">
        ${exConfigAdvanced ? '▾' : '▸'} Options avancées <span style="color:var(--text3)">(type de série)</span>
      </button>
      ${exConfigAdvanced ? `<div class="pe-types">${types}</div>` : ''}
    </div>
    <div class="pe-sheet-footer">
      <button class="editor-btn editor-btn-prev" style="flex:1" onclick="pendingExConfig=null;renderEditorBody()">Annuler</button>
      <button class="editor-btn editor-btn-save" style="flex:1" onclick="confirmAddEx()">${isEdit ? '✓ Enregistrer' : '+ Ajouter'}</button>
    </div>
  `, { onClose: 'pendingExConfig=null;renderEditorBody()' });
}

function confirmAddEx() {
  if (!pendingExConfig) return;
  const reps = (exConfigCustomFormat || exConfigFormat || '').trim();
  if (!reps || reps === 'custom') { showToast('Choisis un nombre de répétitions'); return; }
  const sets = exConfigSets;
  const type = exConfigType;

  let format;
  if (type === 'topset')        format = `Top set ${reps} + ${sets-1>0?sets-1+'×'+reps:'back-off'}`;
  else if (type === 'superset') format = `${sets}×${reps}`;
  else if (type === 'dropset')  format = `${sets}×(${reps}+${reps})`;
  else                          format = `${sets}×${reps}`;

  const targetDay = editorData.days[pendingExConfig.dayIdx];
  const fields = {
    format, sets,
    topSet:   type === 'topset',
    superset: type === 'superset',
    dropSet:  type === 'dropset',
    restTime: exConfigRest,
  };

  if (pendingExConfig.editIdx !== undefined) {
    Object.assign(targetDay.exercises[pendingExConfig.editIdx], fields);
    showToast('Exercice modifié');
  } else {
    // Un exercice de la bibliothèque garde son ID : ses perfs passées, suggestions
    // et PR restent liés, quel que soit le programme. Nouvel ID seulement s'il est
    // déjà présent dans ce jour (les clés de séries se mélangeraient).
    const libId = pendingExConfig.libId;
    const exId  = libId && !targetDay.exercises.some(e => e.id === libId) ? libId : generateId();
    targetDay.exercises.push({
      id: exId, name: pendingExConfig.name, ...fields,
      rankKey: pendingExConfig.rankKey || '',
      info:    pendingExConfig.info    || null,
      muscle:  pendingExConfig.muscle,
    });
    showToast(`${pendingExConfig.name} ajouté`);
  }

  pendingExConfig = null;
  renderEditorBody();
}

// ── Navigation entre étapes ───────────────────────────────────────────────────
function editorNext() {
  if (editorStep === 1 && !editorData.name.trim()) { showToast('Donne un nom au programme'); return; }
  editorStep++;
  renderEditorOverlay();
  document.getElementById('editor-body').scrollTop = 0;
}

function editorPrev() {
  editorStep--;
  if (editorStep < 0) editorStep = 0;
  renderEditorOverlay();
}

function editorSave() {
  const empty = editorData.days.findIndex(d => !d.exercises.length);
  if (empty >= 0) {
    editorDayTab = empty;
    renderEditorBody();
    showToast(`Ajoute au moins 1 exercice à ${editorData.days[empty].name}`);
    return;
  }

  // Chaque jour doit avoir un ID unique dans toute l'app, sinon l'historique
  // d'un programme est lu avec les exercices d'un autre.
  ensureUniqueDayIds(editorData);

  const fromDefault = editorData._fromDefault;
  if (editorData.id && !fromDefault) {
    updateCustomProgram(editorData.id, editorData);
  } else {
    const prog = createCustomProgram(editorData);
    setActiveProgram(prog.id);
  }
  closeEditor();
  setView('programs');
  renderPrograms();
  showToast(fromDefault ? 'Copie du programme enregistrée ✓' : 'Programme enregistré ✓');
}

function closeEditor() {
  const overlay = document.getElementById('editor-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.classList.add('closing');
    setTimeout(() => { overlay.remove(); }, 350);
  }
  editorData       = null;
  pickerOpen       = false;
  pickerPreviewId  = null;
  pendingExConfig  = null;
  customExFormOpen = false;
}

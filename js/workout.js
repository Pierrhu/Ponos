// ============ SÉANCE ============
// Deux modes : avant la séance (jour proposé, ordre de bataille) et en séance
// (validation d'une série en un tap, repos guidé, enchaînement des exercices).

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];

const ICONS = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  info:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
  sword: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2c1 4 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2.2 1-3.4 2-4.5 0 2 1 3.2 2 3.2 0-3-1.2-5.2 1-9.2z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  list:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg>',
  bike:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M5.5 17l4-8h6l3 8M9.5 9L8 6H6M15.5 9l-3 8"/></svg>',
  door:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6v18h8M10 12h11M18 9l3 3-3 3"/></svg>',
  next:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
};

const SHIELD_SVG = `<svg class="ws-emblem" viewBox="0 0 80 80" fill="none" aria-hidden="true">
  <path d="M40 4 L72 16 L72 44 Q72 64 40 76 Q8 64 8 44 L8 16 Z" stroke="var(--acc)" stroke-width="1.5" opacity="0.85"/>
  <path d="M40 10 L66 20 L66 43 Q66 60 40 71 Q14 60 14 43 L14 20 Z" fill="rgba(var(--acc-rgb),0.08)" stroke="rgba(var(--acc-rgb),0.35)" stroke-width="0.8"/>
  <path d="M28 57 L40 28 L52 57" stroke="var(--acc)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="32" y1="50" x2="48" y2="50" stroke="var(--acc)" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
</svg>`;

// ── Aides ─────────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const h = (hex || '#C23B3B').replace('#', '');
  return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)).join(',');
}

function fmtKg(v) {
  const n = parseFloat(v);
  if (!n && n !== 0) return v;
  return String(Math.round(n * 100) / 100).replace('.', ',');
}

function isSessionActive() { return !!state.sessionStart; }

function setKey(exId, i) { return `${exId}_${i}`; }
function isSetDone(exId, i) { return !!(state.done && state.done[setKey(exId, i)]); }
function setHasData(exId, i) {
  return !!(state.current[`${exId}_${i}_kg`] || state.current[`${exId}_${i}_reps`]);
}
function isExDone(ex) {
  for (let i = 0; i < ex.sets; i++) if (!isSetDone(ex.id, i)) return false;
  return true;
}
function firstOpenSet(ex) {
  for (let i = 0; i < ex.sets; i++) if (!isSetDone(ex.id, i)) return i;
  return -1;
}

// Jour proposé : celui qui suit la dernière séance faite dans le programme actif.
function suggestNextDayIdx() {
  const prog = getActiveProgram();
  for (let i = state.history.length - 1; i >= 0; i--) {
    const idx = prog.findIndex(d => d.id === state.history[i].dayId);
    if (idx >= 0) return (idx + 1) % prog.length;
  }
  return 0;
}

function doneThisWeek(dayId) {
  const wk = getWeekKey(new Date());
  return state.history.some(h => h.dayId === dayId && getWeekKey(h.date) === wk);
}

function lastDoneLabel() {
  for (let i = state.history.length - 1; i >= 0; i--) {
    const found = findDayInfo(state.history[i].dayId);
    if (!found) continue;
    const d = new Date(state.history[i].date);
    return `${found.day.name} · ${d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}`;
  }
  return null;
}

// Cible d'une série : ce que le ✓ enregistre si rien n'est saisi.
function getSetTarget(ex, i, sugg) {
  const prev = getLastPerf(ex.id, i);
  let kg   = prev ? prev.kg : '';
  let reps = prev ? prev.reps : '';

  if (ex.topSet) {
    if (i === 0) {
      if (sugg) kg = sugg;
    } else {
      const topKg   = parseFloat(state.current[`${ex.id}_0_kg`]);
      const topReps = parseInt  (state.current[`${ex.id}_0_reps`]);
      if (topKg   > 0) kg   = Math.round((topKg * 0.85) / 2.5) * 2.5;
      if (topReps > 0) reps = Math.min(topReps + 2, 8);
    }
  } else {
    if (sugg) kg = sugg;
    if (i > 0) {
      const pk = state.current[`${ex.id}_${i-1}_kg`];
      const pr = state.current[`${ex.id}_${i-1}_reps`];
      if (pk) kg = pk;
      if (pr) reps = pr;
    }
  }
  return { kg: kg === '' ? '' : String(kg), reps: reps === '' ? '' : String(reps) };
}

function exSummary(ex) {
  const parts = [];
  for (let i = 0; i < ex.sets; i++) {
    const kg = state.current[`${ex.id}_${i}_kg`], reps = state.current[`${ex.id}_${i}_reps`];
    parts.push(kg || reps ? `${fmtKg(kg || 0)} × ${reps || 0}` : '—');
  }
  return parts.join(' · ');
}

function restLabel(sec) {
  return sec >= 60 ? `${Math.floor(sec/60)}${sec%60 ? ':' + String(sec%60).padStart(2,'0') : ''} min` : `${sec} s`;
}

// ── Rendu ─────────────────────────────────────────────────────────────────────

function renderWorkout() {
  const prog = getActiveProgram();
  if (state.dayIdx >= prog.length) state.dayIdx = 0;
  const day = prog[state.dayIdx];
  document.body.classList.toggle('in-session', isSessionActive());
  const html = isSessionActive() ? renderSessionMode(day) : renderIdleMode(prog, day);
  const page = document.getElementById('page-workout');
  page.innerHTML = html;
  page.style.setProperty('--acc', day.accent);
  page.style.setProperty('--acc-rgb', hexToRgb(day.accent));

  // Boutons fixés en bas : hors de la page, dont l'animation d'entrée
  // (transform) les accrocherait à la page au lieu de l'écran.
  let dock = document.getElementById('ws-dock');
  if (!dock) { dock = document.createElement('div'); dock.id = 'ws-dock'; document.body.appendChild(dock); }
  dock.style.setProperty('--acc', day.accent);
  dock.style.setProperty('--acc-rgb', hexToRgb(day.accent));
  dock.innerHTML = state.view !== 'workout' ? ''
    : isSessionActive() ? sessionDockHtml(day) : idleDockHtml();
  bindWorkoutGestures();
}

function idleDockHtml() {
  return `<div class="ws-cta-wrap"><button class="ws-cta" onclick="startWorkout()">
    ${ICONS.sword}<span>Entrer dans l'arène</span>
  </button></div>`;
}

function sessionDockHtml(day) {
  return `<div class="ws-bar">
    <button class="ws-bar-next" onclick="nextExercise()">Exercice suivant ${ICONS.next}</button>
    <button class="ws-bar-end" onclick="requestFinish('${day.id}')">Terminer</button>
  </div>`;
}

function renderIdleMode(prog, day) {
  const suggested = suggestNextDayIdx();
  const streak    = computeStreak();
  const est       = typeof estimateSessionTime === 'function' ? estimateSessionTime([day]) : null;
  const last      = lastDoneLabel();
  const sugg      = getSuggestions(day);
  const isSuggested = state.dayIdx === suggested;

  let html = `<section class="ws-hero">
    <div class="ws-hero-grain"></div>
    <div class="ws-hero-glow"></div>
    <div class="ws-hero-top">
      <div class="ws-kicker">${isSuggested ? 'Prochaine bataille' : 'Bataille choisie'}</div>
      ${streak >= 2 ? `<div class="ws-streak">${ICONS.flame}<span>${streak} semaines</span></div>` : ''}
    </div>
    <div class="ws-hero-main">
      ${SHIELD_SVG}
      <div>
        <div class="ws-day-name">${day.name}</div>
        <div class="ws-day-sub">${day.subtitle || ''}</div>
      </div>
    </div>
    <div class="ws-hero-meta">
      <span>${ICONS.list}${day.exercises.length} exercices</span>
      ${est ? `<span>${ICONS.clock}${est}</span>` : ''}
    </div>
    ${last ? `<div class="ws-hero-last">Dernière bataille : ${last}</div>` : ''}
  </section>`;

  // Sélecteur de jour : médaillons
  html += '<div class="ws-days" role="tablist">';
  prog.forEach((d, i) => {
    const active = state.dayIdx === i;
    const done   = doneThisWeek(d.id);
    html += `<button role="tab" aria-selected="${active}" class="ws-day${active ? ' active' : ''}" style="--d-acc:${d.accent};--d-rgb:${hexToRgb(d.accent)}" onclick="selectDay(${i})">
      <span class="ws-day-letter">${(d.name.match(/\b([A-Z])$/) || [,'' + (i+1)])[1]}</span>
      <span class="ws-day-when">${done ? `<i class="ws-day-check">${ICONS.check}</i>Fait` : (i === suggested ? 'Proposé' : d.when || '')}</span>
    </button>`;
  });
  html += '</div>';

  // Ordre de bataille
  html += `<div class="ws-section"><span>Ordre de bataille</span></div><div class="ws-order">`;
  day.exercises.forEach((ex, idx) => {
    const last = getLastPerf(ex.id, 0);
    const tag  = ex.topSet ? '<span class="ws-tag">Top set</span>' : ex.superset ? '<span class="ws-tag ss">Superset</span>' : ex.dropSet ? '<span class="ws-tag drop">Drop set</span>' : '';
    html += `<button class="ws-order-row" onclick="openInfoModal('${ex.id}')">
      <span class="ws-num">${ROMAN[idx] || idx + 1}</span>
      <span class="ws-order-body">
        <span class="ws-order-name">${ex.name}${tag}</span>
        <span class="ws-order-sub">${ex.sets} × ${(ex.format.match(/(\d+-\d+)(?!.*\d+-\d+)/) || [,''])[1] || ex.format}${last ? ` · dernier ${fmtKg(last.kg)} kg × ${last.reps}` : ''}</span>
      </span>
      ${sugg[ex.id] ? `<span class="ws-up">↑ ${fmtKg(sugg[ex.id])} kg</span>` : ''}
    </button>`;
  });
  html += '</div>';

  html += finisherCard();

  html += `<div class="ws-links">
    <button onclick="openVeloModal()">${ICONS.bike}Sortie vélo</button>
    <button onclick="openBasicFit()">${ICONS.door}Ouvrir Basic-Fit</button>
  </div>`;

  return html;
}

function renderSessionMode(day) {
  const sugg    = getSuggestions(day);
  const doneEx  = day.exercises.filter(isExDone).length;
  const current = state.activeEx && day.exercises.some(e => e.id === state.activeEx)
    ? state.activeEx
    : (day.exercises.find(e => !isExDone(e)) || day.exercises[day.exercises.length - 1]).id;
  const curIdx  = day.exercises.findIndex(e => e.id === current);

  let html = `<header class="ws-war">
    <div class="ws-war-row">
      <div>
        <div class="ws-war-day">${day.name}<span>${day.subtitle || ''}</span></div>
        <div class="ws-war-sub">Exercice ${curIdx + 1} sur ${day.exercises.length}</div>
      </div>
      <div class="ws-clock"><i></i><span id="ws-session-time">${formatElapsed()}</span></div>
    </div>
    <div class="ws-progress" aria-label="${doneEx} exercices terminés sur ${day.exercises.length}">
      ${day.exercises.map(e => `<i class="${isExDone(e) ? 'done' : e.id === current ? 'cur' : ''}"></i>`).join('')}
    </div>
  </header>`;

  html += '<div class="ws-list">';
  day.exercises.forEach((ex, idx) => {
    if (ex.id === current) { html += renderOpenExercise(ex, idx, sugg[ex.id]); return; }
    const done = isExDone(ex);
    const started = !done && Array.from({ length: ex.sets }, (_, i) => isSetDone(ex.id, i)).some(Boolean);
    const last = getLastPerf(ex.id, 0);
    html += `<button class="ws-ex-row${done ? ' done' : ''}" onclick="focusExercise('${ex.id}')">
      <span class="ws-num">${done ? `<i class="ws-seal">${ICONS.check}</i>` : ROMAN[idx] || idx + 1}</span>
      <span class="ws-order-body">
        <span class="ws-order-name">${ex.name}</span>
        <span class="ws-order-sub">${done || started ? exSummary(ex) : `${ex.format}${last ? ` · dernier ${fmtKg(last.kg)} × ${last.reps}` : ''}`}</span>
      </span>
    </button>`;
  });
  html += '</div>';

  html += finisherCard();

  return html;
}

function renderOpenExercise(ex, idx, sugg) {
  const tag = ex.topSet ? '<span class="ws-tag">Top set</span>' : ex.superset ? '<span class="ws-tag ss">Superset</span>' : ex.dropSet ? '<span class="ws-tag drop">Drop set</span>' : '';
  const lastLine = Array.from({ length: ex.sets }, (_, i) => getLastPerf(ex.id, i))
    .filter(Boolean).map(p => `${fmtKg(p.kg)} × ${p.reps}`).join(' · ');
  const openSet = firstOpenSet(ex);

  let html = `<section class="ws-ex-open" data-exid="${ex.id}">
    <div class="ws-ex-head">
      <span class="ws-num big">${ROMAN[idx] || idx + 1}</span>
      <div class="ws-ex-title">
        <div class="ws-ex-name">${ex.name}${tag}</div>
        <div class="ws-ex-format">${ex.format} · repos ${restLabel(getRestDuration(ex.id))}</div>
      </div>
      ${ex.info ? `<button class="ws-icon-btn" aria-label="Fiche de l'exercice" onclick="openInfoModal('${ex.id}')">${ICONS.info}</button>` : ''}
    </div>
    ${lastLine ? `<div class="ws-ex-last">Dernière fois : ${lastLine}</div>` : ''}
    <div class="ws-sets">`;

  for (let i = 0; i < ex.sets; i++) {
    const kgKey = `${ex.id}_${i}_kg`, repsKey = `${ex.id}_${i}_reps`;
    const t     = getSetTarget(ex, i, sugg);
    const done  = isSetDone(ex.id, i);
    const cur   = i === openSet;
    const isTop = ex.topSet && i === 0;
    const cls   = done ? ' done' : cur ? ' cur' : ' later';
    const args  = `'${ex.id}',${i},'${kgKey}','${repsKey}',${!!ex.topSet},'${ex.rankKey || ''}'`;
    html += `<div class="ws-set${cls}">
      <span class="ws-set-label${isTop ? ' top' : ''}">${isTop ? 'Top' : 'S' + (i + 1)}</span>
      <label class="ws-field">
        <input type="number" inputmode="decimal" step="any" aria-label="Charge série ${i+1}" placeholder="${t.kg ? fmtKg(t.kg) : '—'}" value="${state.current[kgKey] || ''}"
          oninput="updateSet('${kgKey}',this.value);onSetInput(${args})">
        <span>kg</span>
      </label>
      <label class="ws-field">
        <input type="number" inputmode="numeric" aria-label="Répétitions série ${i+1}" placeholder="${t.reps || '—'}" value="${state.current[repsKey] || ''}"
          oninput="updateSet('${repsKey}',this.value);onSetInput(${args})">
        <span>reps</span>
      </label>
      <button class="ws-seal-btn" aria-label="${done ? 'Annuler la validation' : 'Valider la série ' + (i+1)}" onclick="validateSet('${ex.id}',${i})">${ICONS.check}</button>
    </div>`;
    if (isTop) html += `<div id="live1rm-${ex.id}" class="ws-live1rm">${live1RMHtml(ex)}</div>`;
  }
  html += `</div>
    ${openSet >= 0 ? '<div class="ws-hint">Un tap sur ✓ valide les valeurs proposées. Touche un chiffre pour le changer.</div>' : ''}
  </section>`;
  return html;
}

function live1RMHtml(ex) {
  const k = parseFloat(state.current[`${ex.id}_0_kg`]) || 0;
  const r = parseInt  (state.current[`${ex.id}_0_reps`]) || 0;
  if (!(k > 0 && r > 0) || !ex.rankKey || !STANDARDS[ex.rankKey]) return '';
  const rm = calc1RM(k, r), bw = state.bodyWeight || 95, ratio = rm / bw;
  const rk = getRankIdx(ratio, STANDARDS[ex.rankKey].thresholds);
  const o  = rk >= 0 ? RANKS[rk] : null;
  return `<span class="live-1rm ${o ? o.cls : ''}">1RM ${fmtKg(rm.toFixed(1))} kg · ${ratio.toFixed(2)}×PC ${o ? o.icon + ' ' + o.name : ''}</span>`;
}

function finisherCard() {
  return `<div class="ws-finisher">
    <div class="ws-finisher-k">Ordre supplémentaire</div>
    <div>2×3-5 tractions négatives (5 s de descente) en fin de séance. Alterner avec dips.</div>
  </div>`;
}

function bindWorkoutGestures() {
  // Glisser vers la gauche sur l'exercice ouvert : fiche de l'exercice
  document.querySelectorAll('#page-workout [data-exid]').forEach(card => {
    const exId = card.getAttribute('data-exid');
    let sx = 0, sy = 0, tracking = false;
    card.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true; }, { passive: true });
    card.addEventListener('touchmove', e => {
      if (!tracking) return;
      const dx = e.touches[0].clientX - sx, dy = Math.abs(e.touches[0].clientY - sy);
      if (dx < -50 && dy < Math.abs(dx) * 0.5) { tracking = false; openInfoModal(exId); }
    }, { passive: true });
    card.addEventListener('touchend', () => { tracking = false; }, { passive: true });
  });
}

// ── Actions ───────────────────────────────────────────────────────────────────

function selectDay(i) {
  if (isSessionActive()) return;
  state.dayIdx = i; state.activeEx = null; state._lastPRs = null; state._lastTimerSet = null;
  saveState(); render();
}
function toggleEx(id)  { focusExercise(id); }
function updateSet(key, val) { state.current[key] = val; saveState(); }

function startWorkout() {
  const day = getActiveProgram()[state.dayIdx];
  state.done = {};
  state.activeEx = day.exercises[0] ? day.exercises[0].id : null;
  unlockSound();
  startSession();
  window.scrollTo({ top: 0 });
  render();
}

function focusExercise(id) {
  state.activeEx = id;
  saveState();
  render();
  const el = document.querySelector(`.ws-ex-open[data-exid="${id}"]`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function nextExercise() {
  const day = getActiveProgram()[state.dayIdx];
  const cur = day.exercises.findIndex(e => e.id === state.activeEx);
  const order = day.exercises.slice(cur + 1).concat(day.exercises.slice(0, cur + 1));
  const next = order.find(e => !isExDone(e) && e.id !== state.activeEx) || day.exercises[(cur + 1) % day.exercises.length];
  focusExercise(next.id);
}

function validateSet(exId, i) {
  const day = getActiveProgram()[state.dayIdx];
  const ex  = day.exercises.find(e => e.id === exId);
  if (!ex) return;
  if (!state.done) state.done = {};
  const key = setKey(exId, i);

  // Second tap sur une série validée : on la rouvre
  if (state.done[key]) {
    delete state.done[key];
    saveState(); render();
    return;
  }

  const kgKey = `${exId}_${i}_kg`, repsKey = `${exId}_${i}_reps`;
  const t = getSetTarget(ex, i, getSuggestions(day)[exId]);
  if (!state.current[kgKey]   && t.kg)   state.current[kgKey]   = t.kg;
  if (!state.current[repsKey] && t.reps) state.current[repsKey] = t.reps;
  if (!state.current[kgKey] && !state.current[repsKey]) {
    showToast('Saisis la charge ou les répétitions', 'err');
    return;
  }
  state.done[key] = true;
  unlockSound();
  if (navigator.vibrate) navigator.vibrate(30);

  // Suite : prochaine série du même exercice, ou exercice suivant
  const nextSet = firstOpenSet(ex);
  let nextLabel;
  if (nextSet >= 0) {
    const nt = getSetTarget(ex, nextSet, getSuggestions(day)[exId]);
    nextLabel = `${ex.topSet && nextSet === 0 ? 'Top set' : 'Série ' + (nextSet + 1)}${nt.kg ? ` · ${fmtKg(nt.kg)} kg × ${nt.reps || '?'}` : ''}`;
  } else {
    const nextEx = day.exercises.find(e => !isExDone(e));
    if (nextEx) { state.activeEx = nextEx.id; nextLabel = nextEx.name; }
  }
  saveState();
  render();
  if (nextLabel) startRestTimer(getRestDuration(exId), nextLabel);
  else { skipRestTimer(); showToast('Tous les exercices sont faits. Termine la séance !'); }
  const open = document.querySelector('.ws-ex-open');
  if (open && nextSet < 0) open.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Mise à jour en direct pendant la saisie : 1RM du top set et propositions des séries suivantes
function onSetInput(exId, setIdx, kgKey, repsKey, isTopSet, rankKey) {
  const day = getActiveProgram()[state.dayIdx];
  const ex  = day && day.exercises.find(e => e.id === exId);
  if (!ex) return;
  if (isTopSet && setIdx === 0) {
    const el = document.getElementById('live1rm-' + exId);
    if (el) el.innerHTML = live1RMHtml(ex);
  }
  const sugg = getSuggestions(day)[exId];
  for (let s = setIdx + 1; s < ex.sets; s++) {
    const t = getSetTarget(ex, s, sugg);
    const kgInp   = document.querySelector(`.ws-ex-open input[aria-label="Charge série ${s+1}"]`);
    const repsInp = document.querySelector(`.ws-ex-open input[aria-label="Répétitions série ${s+1}"]`);
    if (kgInp   && t.kg)   kgInp.placeholder   = fmtKg(t.kg);
    if (repsInp && t.reps) repsInp.placeholder = t.reps;
  }
}

// ── Terminer la séance ────────────────────────────────────────────────────────

function requestFinish(dayId) {
  const day = getActiveProgram().find(d => d.id === dayId);
  const missing = [];
  day.exercises.forEach(ex => {
    const sets = [];
    for (let i = 0; i < ex.sets; i++) if (!setHasData(ex.id, i)) sets.push(i + 1);
    if (sets.length) missing.push({ name: ex.name, sets });
  });
  const anyData = day.exercises.some(ex => Array.from({ length: ex.sets }, (_, i) => setHasData(ex.id, i)).some(Boolean));
  if (!missing.length) { finishSession(dayId); return; }
  openFinishSheet(day, missing, anyData);
}

function openFinishSheet(day, missing, anyData) {
  const filled = day.exercises.reduce((n, ex) => n + Array.from({ length: ex.sets }, (_, i) => setHasData(ex.id, i)).filter(Boolean).length, 0);
  const nMissing = missing.reduce((n, m) => n + m.sets.length, 0);
  const lines = missing.slice(0, 3).map(m => `${m.name} — série${m.sets.length > 1 ? 's' : ''} ${m.sets.join(', ')}`).join('<br>');
  const more  = missing.length > 3 ? `<br>et ${missing.length - 3} autre${missing.length - 3 > 1 ? 's' : ''} exercice${missing.length - 3 > 1 ? 's' : ''}` : '';

  let el = document.getElementById('ws-finish');
  if (!el) { el = document.createElement('div'); el.id = 'ws-finish'; document.body.appendChild(el); }
  el.className = 'ws-sheet-overlay';
  el.style.setProperty('--acc', day.accent);
  el.style.setProperty('--acc-rgb', hexToRgb(day.accent));
  el.innerHTML = `<div class="ws-sheet" role="dialog" aria-label="Terminer la séance" onclick="event.stopPropagation()">
    <div class="ws-sheet-handle"></div>
    <h2 class="ws-sheet-title">Terminer la séance ?</h2>
    <div class="ws-sheet-stats">
      <div><b>${filled}</b><span>séries</span></div>
      <div><b>${formatElapsed()}</b><span>durée</span></div>
      <div><b>${day.exercises.filter(isExDone).length}/${day.exercises.length}</b><span>exercices</span></div>
    </div>
    <div class="ws-warn">
      <b>${nMissing} série${nMissing > 1 ? 's' : ''} pas encore faite${nMissing > 1 ? 's' : ''}</b>
      <span>${lines}${more}</span>
      <span>Elles ne seront pas enregistrées.</span>
    </div>
    ${anyData ? `<button class="ws-sheet-main" onclick="closeFinishSheet();finishSession('${day.id}')">Terminer quand même</button>` : ''}
    <button class="ws-sheet-alt" onclick="closeFinishSheet()">Reprendre la séance</button>
    ${!anyData ? `<button class="ws-sheet-ghost" onclick="closeFinishSheet();abandonSession()">Abandonner sans enregistrer</button>` : ''}
  </div>`;
  el.onclick = closeFinishSheet;
  requestAnimationFrame(() => el.classList.add('open'));
}

function closeFinishSheet() {
  const el = document.getElementById('ws-finish');
  if (!el) return;
  el.classList.remove('open');
  setTimeout(() => el.remove(), 250);
}

function abandonSession() {
  stopSession();
  skipRestTimer();
  state.done = {};
  state.activeEx = null;
  saveState();
  render();
}

function finishSession(dayId) {
  const day   = getActiveProgram().find(d => d.id === dayId);
  const entry = { dayId, date: new Date().toISOString(), sets: {} };
  let hasData = false;

  day.exercises.forEach(ex => {
    for (let i = 0; i < ex.sets; i++) {
      const kg   = state.current[`${ex.id}_${i}_kg`];
      const reps = state.current[`${ex.id}_${i}_reps`];
      if (kg || reps) {
        entry.sets[`${ex.id}_${i}`] = { kg: kg||'0', reps: reps||'0' };
        hasData = true;
      }
    }
  });

  if (!hasData) { showToast('Saisis au moins une série !'); return; }

  const elapsed = state.sessionStart ? Math.floor((Date.now() - state.sessionStart) / 1000) : 0;
  stopSession();
  skipRestTimer();

  day.exercises.forEach(ex => {
    for (let i = 0; i < ex.sets; i++) {
      delete state.current[`${ex.id}_${i}_kg`];
      delete state.current[`${ex.id}_${i}_reps`];
    }
  });

  state.history.push(entry);
  state.activeEx = null;
  state.done = {};
  state._lastTimerSet = null;
  state.dayIdx = suggestNextDayIdx();

  const prs = detectPRs(entry, day);
  if (prs.length) state._lastPRs = prs;
  saveState();

  showVictory(day, entry, elapsed, prs);
  render();
}

// ── Victory overlay ───────────────────────────────────────────────────────────
function showVictory(day, entry, elapsedSec, prs) {
  const overlay = document.getElementById('victory-overlay');
  if (!overlay) return;

  const sets          = Object.keys(entry.sets).length;
  const exosCompleted = new Set(Object.keys(entry.sets).map(k => k.split('_')[0])).size;
  const min           = Math.floor(elapsedSec / 60);
  const sec           = elapsedSec % 60;
  const timeStr       = elapsedSec > 0 ? `${min}:${sec.toString().padStart(2,'0')}` : '—';

  let vol = 0;
  Object.values(entry.sets).forEach(s => {
    vol += (parseFloat(s.kg)||0) * (parseInt(s.reps)||0);
  });

  overlay.style.setProperty('--victory-accent', day.accent);
  overlay.style.setProperty('--va-rgb', hexToRgb(day.accent));
  document.getElementById('victory-day').textContent  = day.name.toUpperCase() + ' — ' + (day.subtitle || '').toUpperCase();
  document.getElementById('victory-sets').textContent = sets;
  document.getElementById('victory-exos').textContent = exosCompleted;
  document.getElementById('victory-time').textContent = timeStr;
  document.getElementById('victory-vol').textContent  = vol > 0 ? vol.toLocaleString('fr-FR') + ' kg' : '—';

  overlay.classList.remove('hidden', 'out');
  overlay.classList.add('in');

  if (prs && prs.length) {
    setTimeout(() => showToast(`🏆 ${prs.length} PR${prs.length>1?'s':''} battu${prs.length>1?'s':''} !`, 'pr'), 600);
  }
}

function closeVictory() {
  const overlay = document.getElementById('victory-overlay');
  if (!overlay) return;
  overlay.classList.remove('in');
  overlay.classList.add('out');
  setTimeout(() => {
    overlay.classList.add('hidden');
    overlay.classList.remove('out');
    if (state._lastPRs && state._lastPRs.length) openPRCelebrate(0);
  }, 350);
}

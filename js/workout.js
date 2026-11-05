// ============ SÉANCE ============

function renderWorkout() {
  const day = getActiveProgram()[state.dayIdx];
  let html = '<h2 class="page-title">Séance</h2>';

  // Streak banner
  const streak = computeStreak();
  if (streak >= 2) {
    const flames = streak >= 8 ? '🔥🔥🔥' : streak >= 4 ? '🔥🔥' : '🔥';
    html += `<div class="streak-banner">
      <div class="streak-num">${streak}</div>
      <div>
        <div class="streak-label">${flames} Semaine${streak>1?'s':''} d'affilée</div>
        <div class="streak-sub">Continue comme ça, ne brise pas ta série !</div>
      </div>
    </div>`;
  }

  // Banners PR de la dernière séance
  if (state._lastPRs && state._lastPRs.length) {
    state._lastPRs.forEach((pr, idx) => {
      html += `<div class="pr-banner" onclick="openPRCelebrate(${idx})">
        <div class="pr-icon">🏆</div>
        <div><div class="pr-text">Nouveau record !</div><div class="pr-sub">${pr}</div></div>
        <div class="pr-tap">Voir →</div>
      </div>`;
    });
  }

  // Sélecteur de jour
  html += '<div class="day-sel">';
  getActiveProgram().forEach((d, i) => {
    const active = state.dayIdx === i;
    html += `<button class="day-btn${active?' active':''}" style="--active-color:${d.accent}15;--active-accent:${d.accent}" onclick="selectDay(${i})">
      <div class="day-name">${d.name}</div><div class="day-when">${doneThisWeek(d.id) ? '✓ Fait' : d.when}</div>
    </button>`;
  });
  html += '</div>';
  html += `<div class="warrior-section">${day.subtitle}</div>`;

  const exercises   = getSessionExercises(day);
  const suggestions = getSuggestions({ ...day, exercises });

  html += renderWarmup(day, exercises);

  // Exercices
  exercises.forEach(ex => {
    const isOpen   = state.activeEx === ex.id;
    const lastPerf = getLastPerf(ex.id, 0);
    const sugg     = suggestions[ex.id];
    let tagHtml = '';
    if (ex.topSet)   tagHtml  = '<span class="tag tag-top">TOP SET</span>';
    if (ex.superset) tagHtml  = '<span class="tag tag-ss">SUPERSET</span>';
    if (ex.dropSet)  tagHtml  = '<span class="tag tag-drop">DROP SET</span>';
    if (sugg)        tagHtml += `<span class="suggestion-tag">↑ Essaie ${sugg}kg</span>`;

    html += `<div class="card ex-card${isOpen?' open':''}" style="--ex-accent:${day.accent}" data-exid="${ex.id}" onclick="toggleEx('${ex.id}')">
      <div class="ex-header">
        <div style="flex:1">${tagHtml}
          <div class="ex-name">${ex.name}</div>
          ${ex._slotId ? `<div class="ex-swapped">⇄ à la place de ${ex._slotName}</div>` : ''}
          <div class="ex-format">${ex.format}${ex.restTime ? ' <span style="color:var(--text3);font-size:10px">· Repos ' + (ex.restTime >= 60 ? Math.floor(ex.restTime/60) + 'min' + (ex.restTime % 60 ? String(ex.restTime % 60).padStart(2,'0') : '') : ex.restTime + 's') + '</span>' : ''}</div>
          ${lastPerf ? `<div class="ex-prev" style="text-align:left;margin-top:3px">Préc: <strong style="color:${day.accent}">${lastPerf.kg}kg×${lastPerf.reps}</strong></div>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <div class="ex-arrow">${isOpen?'▾':'▸'}</div>
        </div>
      </div>`;

    if (isOpen) {
      html += '<div class="sets-area">';
      for (let i = 0; i < ex.sets; i++) {
        const prev    = getLastPerf(ex.id, i);
        const isTop   = ex.topSet && i === 0;
        const kgKey   = `${ex.id}_${i}_kg`;
        const repsKey = `${ex.id}_${i}_reps`;
        const { kg: sugKg, reps: sugReps } = getSetSuggestion(ex, i);
        const isDone = isSetDone(ex.id, i);

        html += `<div class="set-row">
          <div class="set-label${isTop?' top':''}">${isTop?'TOP':`Série ${i+1}`}</div>
          <div class="input-wrap">
            <input type="number" inputmode="decimal" placeholder="${sugKg||'kg'}"
              value="${state.current[kgKey]||''}"
              onclick="event.stopPropagation()"
              oninput="event.stopPropagation();updateSet('${kgKey}',this.value);onSetInput('${ex.id}',${i},'${kgKey}','${repsKey}',${ex.topSet||false},'${ex.rankKey||''}')">
            <span class="unit">kg</span>
          </div>
          <div class="input-wrap">
            <input type="number" inputmode="numeric" placeholder="${sugReps||'reps'}"
              value="${state.current[repsKey]||''}"
              onclick="event.stopPropagation()"
              oninput="event.stopPropagation();updateSet('${repsKey}',this.value);onSetInput('${ex.id}',${i},'${kgKey}','${repsKey}',${ex.topSet||false},'${ex.rankKey||''}')">
            <span class="unit">reps</span>
          </div>
          <button class="set-check${isDone ? ' done' : ''}" aria-label="${isDone ? 'Annuler la validation' : 'Valider la série'}"
            onclick="event.stopPropagation();validateSet('${ex.id}',${i})">✓</button>
        </div>`;

        if (ex.topSet && i === 0) {
          const curKg   = parseFloat(state.current[kgKey])   || 0;
          const curReps = parseInt  (state.current[repsKey]) || 0;
          let rmHtml = '';
          if (curKg > 0 && curReps > 0) {
            const rm    = calc1RM(curKg, curReps);
            const bw    = state.bodyWeight || 95;
            const ratio = rm / bw;
            const rk    = ex.rankKey ? getRankIdx(ratio, STANDARDS[ex.rankKey].thresholds) : -1;
            const rkObj = rk >= 0 ? RANKS[rk] : null;
            rmHtml = `<span class="live-1rm ${rkObj?rkObj.cls:''}" style="background:${rkObj?'rgba(255,255,255,0.06)':'transparent'};color:var(--text2)">
              1RM: ${rm.toFixed(1)}kg · ${ratio.toFixed(2)}×BW ${rkObj ? rkObj.icon+' '+rkObj.name : ''}
            </span>`;
          }
          html += `<div id="live1rm-${ex.id}" style="margin:-4px 0 6px 56px">${rmHtml}</div>`;
        }
      }
      const slotId = ex._slotId || ex.id;
      html += `<div class="swap-row">
        <button class="swap-btn" onclick="event.stopPropagation();openSwapPicker('${slotId}')">⇄ Changer d'exercice</button>
        ${ex._slotId ? `<button class="swap-btn swap-btn--back" onclick="event.stopPropagation();chooseSwap('${slotId}',null)">↺ ${ex._slotName}</button>` : ''}
      </div>`;
      html += '</div>';
    }
    html += '</div>';
  });

  // Bouton terminer
  html += `<button class="btn-primary" style="background:${day.accent}" onclick="requestFinish('${day.id}')">Terminer la séance ✓</button>`;

  html += `<button class="velo-btn"     onclick="openVeloModal()">🚴 Ajouter une sortie vélo</button>`;
  html += `<button class="basicfit-btn" onclick="openBasicFit()">⚔️ Aller au champ de bataille</button>`;

  document.getElementById('page-workout').innerHTML = html;

  // Swipe gauche pour ouvrir le panneau info
  document.querySelectorAll('.ex-card').forEach(card => {
    const exId = card.getAttribute('data-exid');
    if (!exId) return;
    let startX = 0, startY = 0, tracking = false;
    card.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX; startY = e.touches[0].clientY; tracking = true;
    }, { passive: true });
    card.addEventListener('touchmove', e => {
      if (!tracking) return;
      const dx = e.touches[0].clientX - startX;
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dx < -40 && dy < Math.abs(dx) * 0.6) { tracking = false; openInfoModal(exId); }
    }, { passive: true });
    card.addEventListener('touchend', () => { tracking = false; }, { passive: true });
  });
}

// ── Échauffement (6-7 min, haut du corps) ─────────────────────────────────────
const WARMUP = [
  { id:'rameur',   gif:'gifs/echauf-rameur.webp', name:'Rameur (ou vélo)', detail:'3-4 min, tranquille',
    text:'Juste de quoi **monter en température**, pas de quoi s\'essouffler. Le rameur chauffe aussi **le dos et les bras**. Si tous les rameurs sont pris : vélo ou elliptique.' },
  { id:'passage',  gif:'gifs/echauf-passage-epaule.webp', name:'Passages d\'épaule', detail:'10 allers-retours',
    text:'Avec un élastique, une corde de poulie ou un manche. **Bras tendus, prise large**, passe la barre de devant les cuisses jusque derrière le dos, puis reviens. Si ça force, **écarte encore les mains**.' },
  { id:'ecarte',   gif:'gifs/echauf-ecarte-arriere-elastique.webp', name:'Écartés arrière', detail:'15 répétitions, très léger',
    text:'Élastique ou poulie au plus léger. **Bras tendus devant**, ouvre vers l\'arrière en **serrant les omoplates**. Ça réveille l\'arrière des épaules avant les développés. Un face pull très léger fait la même chose.' },
  { id:'rotation', gif:'gifs/echauf-rotation-externe-poulie.webp', name:'Rotation externe à la poulie', detail:'10 par bras, très léger',
    text:'Poulie à hauteur du coude, **coude collé au corps** (une serviette coincée aide), avant-bras plié à 90°. **Tourne l\'avant-bras vers l\'extérieur**, lentement. C\'est la **coiffe des rotateurs** : la petite musculature qui protège l\'épaule.' },
];
let warmupOpen = null;   // null = automatique (ouvert tant que pas fini)
let warmupPreview = null;

function todayKey() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; }
function warmupDone() {
  if (!state.warmup || state.warmup.date !== todayKey()) state.warmup = { date: todayKey(), done: [] };
  return state.warmup.done;
}
function roundPlate(kg) { return Math.max(0, Math.round(kg / 2.5) * 2.5); }

function warmupItems(exercises) {
  const first = exercises[0];
  const items = [...WARMUP];
  if (first) {
    const prev = getLastPerf(first.id, 0);
    const w = prev && parseFloat(prev.kg) > 0 ? parseFloat(prev.kg) : null;
    const detail = w
      ? `Léger ×10 · ${roundPlate(w * 0.5)} kg ×6 · ${roundPlate(w * 0.75)} kg ×3`
      : 'Léger ×10 · ~50 % ×6 · ~75 % ×3';
    items.push({ id:'approche', gif: first.info && first.info.gif, name:`Séries d'approche : ${first.name}`, detail,
      text:`Avant tes vraies séries sur le premier gros exo : **barre vide ou très léger ×10**, puis **~50 % de ta charge ×6**, puis **~75 % ×3**. ${w ? `Calculé sur ta dernière charge (**${w} kg**). ` : ''}Pour les exos suivants, **une seule série légère** suffit : tu es déjà chaud.` });
  }
  return items;
}

function renderWarmup(day, exercises) {
  const items = warmupItems(exercises);
  const done  = warmupDone();
  const n     = items.filter(it => done.includes(it.id)).length;
  const all   = n === items.length;
  const open  = warmupOpen === null ? !all : warmupOpen;
  let h = `<div class="card warmup-card${all ? ' warmup-done' : ''}" style="--ex-accent:${day.accent}">
    <div class="warmup-head" onclick="toggleWarmup(${open})">
      <div style="flex:1">
        <div class="warmup-title">${all ? '✓ ' : ''}Échauffement <span class="warmup-time">· 6-7 min</span></div>
        <div class="warmup-sub">${all ? 'Fait, tu peux attaquer' : `${n}/${items.length} · épaules d'abord, elles protègent tout le reste`}</div>
      </div>
      <div class="ex-arrow">${open ? '▾' : '▸'}</div>
    </div>`;
  if (open) {
    h += '<div class="warmup-list">';
    items.forEach(it => {
      const ok = done.includes(it.id);
      const thumb = it.gif ? it.gif.replace(/\.gif$/, '.webp').replace('gifs/', 'gifs/thumbs/') : '';
      h += `<div class="warmup-item${ok ? ' ok' : ''}">
        <button class="warmup-thumb" onclick="event.stopPropagation();openWarmupPreview('${it.id}')" aria-label="Voir ${it.name}">${thumb ? `<img src="${thumb}" alt="" loading="lazy">` : ''}</button>
        <div class="warmup-txt" onclick="event.stopPropagation();openWarmupPreview('${it.id}')">
          <div class="warmup-name">${it.name}</div>
          <div class="warmup-detail">${it.detail}</div>
        </div>
        <button class="warmup-check${ok ? ' ok' : ''}" style="${ok ? `background:${day.accent};border-color:${day.accent}` : ''}" onclick="event.stopPropagation();toggleWarmupItem('${it.id}')" aria-label="${ok ? 'Décocher' : 'Cocher'} ${it.name}">${ok ? '✓' : ''}</button>
      </div>`;
    });
    h += '</div>';
  }
  return h + '</div>';
}

function toggleWarmup(isOpen) { warmupOpen = !isOpen; render(); }
function toggleWarmupItem(id) {
  const done = warmupDone();
  const i = done.indexOf(id);
  if (i >= 0) done.splice(i, 1); else done.push(id);
  const day = getActiveProgram()[state.dayIdx];
  if (warmupItems(getSessionExercises(day)).every(it => done.includes(it.id))) warmupOpen = null;
  saveState();
  render();
}
function openWarmupPreview(id) {
  const day = getActiveProgram()[state.dayIdx];
  const it  = warmupItems(getSessionExercises(day)).find(x => x.id === id);
  if (!it) return;
  const gif = it.gif ? it.gif.replace(/\.gif$/, '.webp') : '';
  const ok  = warmupDone().includes(id);
  let el = document.getElementById('warmup-preview');
  if (!el) { el = document.createElement('div'); el.id = 'warmup-preview'; document.body.appendChild(el); }
  el.innerHTML = `<div class="ex-picker-overlay" onclick="closeWarmupPreview()">
    <div class="ex-picker" onclick="event.stopPropagation()">
      <div class="ex-picker-header">
        <div class="ex-picker-title">Échauffement</div>
        <button class="ex-picker-close" onclick="closeWarmupPreview()">✕</button>
      </div>
      <div class="ex-picker-list swap-preview"><div class="pe-preview">
        ${gif ? `<div class="info-gif-container pe-preview-gif"><img src="${gif}" alt="${it.name}"></div>` : ''}
        <div class="pe-preview-name">${it.name}</div>
        <div class="warmup-detail" style="margin:-4px 0 12px;font-size:13px">${it.detail}</div>
        <div class="info-why">${fmtFiche(it.text)}</div>
      </div></div>
      <div class="swap-preview-footer">
        <button class="swap-choose" style="background:${day.accent}" onclick="${ok ? '' : `toggleWarmupItem('${id}');`}closeWarmupPreview()">${ok ? 'Fermer' : '✓ Fait'}</button>
      </div>
    </div>
  </div>`;
}
function closeWarmupPreview() { const el = document.getElementById('warmup-preview'); if (el) el.remove(); }

function selectDay(i)  { state.dayIdx = i; state.activeEx = null; state._lastPRs = null; state._lastTimerSet = null; saveState(); render(); }
function toggleEx(id)  { state.activeEx = state.activeEx === id ? null : id; render(); }
function updateSet(key, val) { state.current[key] = val; saveState(); }

// ── Logique input + 1RM live ──────────────────────────────────────────────────
function onSetInput(exId, setIdx, kgKey, repsKey, isTopSet, rankKey) {
  if (!state._sessionActive) startSession();

  const kg   = state.current[kgKey];
  const reps = state.current[repsKey];
  if (kg && reps && parseFloat(kg) > 0 && parseInt(reps) > 0) {
    document.querySelectorAll(`input[oninput*="'${kgKey}'"], input[oninput*="'${repsKey}'"]`).forEach(inp => {
      inp.classList.remove('input-flash');
      void inp.offsetWidth;
      inp.classList.add('input-flash');
    });
  }

  if (isTopSet && setIdx === 0 && rankKey) {
    const el = document.getElementById('live1rm-' + exId);
    if (el) {
      const k = parseFloat(state.current[kgKey])   || 0;
      const r = parseInt  (state.current[repsKey]) || 0;
      if (k > 0 && r > 0) {
        const rm    = calc1RM(k, r);
        const bw    = state.bodyWeight || 95;
        const ratio = rm / bw;
        const rk    = getRankIdx(ratio, STANDARDS[rankKey].thresholds);
        const rkObj = rk >= 0 ? RANKS[rk] : null;
        el.innerHTML = `<span class="live-1rm ${rkObj?rkObj.cls:''}" style="background:${rkObj?'rgba(255,255,255,0.06)':'transparent'};color:var(--text2)">
          1RM: ${rm.toFixed(1)}kg · ${ratio.toFixed(2)}×BW ${rkObj ? rkObj.icon+' '+rkObj.name : ''}
        </span>`;
      } else { el.innerHTML = ''; }
    }
    const topKg   = parseFloat(state.current[kgKey])   || 0;
    const topReps = parseInt  (state.current[repsKey]) || 0;
    if (topKg > 0) {
      const sugKg   = (Math.round((topKg * 0.85) / 2.5) * 2.5).toFixed(1).replace('.0','');
      const sugReps = topReps > 0 ? Math.min(topReps + 2, 8) : '';
      for (const ex of getSessionExercises(getActiveProgram()[state.dayIdx])) {
        if (ex.id !== exId) continue;
        for (let s = 1; s < ex.sets; s++) {
          const kgInp   = document.querySelector(`input[oninput*="'${exId}_${s}_kg'"]`);
          const repsInp = document.querySelector(`input[oninput*="'${exId}_${s}_reps'"]`);
          if (kgInp   && !kgInp.value)   kgInp.placeholder   = sugKg;
          if (repsInp && !repsInp.value && sugReps) repsInp.placeholder = sugReps;
        }
      }
    }
  }

  if (!isTopSet && kg) {
    const nextKg = document.querySelector(`input[oninput*="'${exId}_${setIdx+1}_kg'"]`);
    if (nextKg && !nextKg.value) nextKg.placeholder = kg;
  }
  if (!isTopSet && reps) {
    const nextReps = document.querySelector(`input[oninput*="'${exId}_${setIdx+1}_reps'"]`);
    if (nextReps && !nextReps.value) nextReps.placeholder = reps;
  }
}


// ── Jour proposé, séries validées ─────────────────────────────────────────────

// Jour qui suit la dernière séance faite dans le programme actif
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

function isSetDone(exId, i) { return !!(state.done && state.done[`${exId}_${i}`]); }
function isExDone(ex) {
  for (let i = 0; i < ex.sets; i++) if (!isSetDone(ex.id, i)) return false;
  return true;
}

// Valeurs proposées (placeholders) d'une série
function getSetSuggestion(ex, i) {
  const prev = getLastPerf(ex.id, i);
  let kg   = prev ? prev.kg : '';
  let reps = prev ? prev.reps : '';
  if (ex.topSet && i > 0) {
    const topKg   = parseFloat(state.current[`${ex.id}_0_kg`]);
    const topReps = parseInt  (state.current[`${ex.id}_0_reps`]);
    if (topKg   > 0) kg   = (Math.round((topKg * 0.85) / 2.5) * 2.5).toFixed(1).replace('.0','');
    if (topReps > 0) reps = Math.min(topReps + 2, 8);
  } else if (!ex.topSet && i > 0) {
    const pk = state.current[`${ex.id}_${i-1}_kg`];
    const pr = state.current[`${ex.id}_${i-1}_reps`];
    if (pk) kg = pk;
    if (pr) reps = pr;
  }
  return { kg: kg === '' ? '' : String(kg), reps: reps === '' ? '' : String(reps) };
}

// ✓ : enregistre la série (valeurs saisies, sinon celles proposées), lance le
// repos, puis ouvre l'exercice suivant quand toutes les séries sont faites.
function validateSet(exId, i) {
  const day = getActiveProgram()[state.dayIdx];
  const exercises = getSessionExercises(day);
  const ex  = exercises.find(e => e.id === exId);
  if (!ex) return;
  if (!state.done) state.done = {};
  const key = `${exId}_${i}`;

  if (state.done[key]) { delete state.done[key]; saveState(); render(); return; }

  const kgKey = `${exId}_${i}_kg`, repsKey = `${exId}_${i}_reps`;
  const sug = getSetSuggestion(ex, i);
  if (!state.current[kgKey]   && sug.kg)   state.current[kgKey]   = sug.kg;
  if (!state.current[repsKey] && sug.reps) state.current[repsKey] = sug.reps;
  if (!state.current[kgKey] && !state.current[repsKey]) { showToast('Saisis la charge ou les répétitions', 'err'); return; }

  state.done[key] = true;
  if (!state._sessionActive) startSession();
  if (navigator.vibrate) navigator.vibrate(30);

  if (isExDone(ex)) {
    const next = exercises.find(e => !isExDone(e));
    state.activeEx = next ? next.id : null;
  }
  saveState();
  render();
  startRestTimer(getRestDuration(exId));
  if (isExDone(ex) && state.activeEx) {
    const el = document.querySelector(`.ex-card[data-exid="${state.activeEx}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Terminer : confirmation s'il reste des séries vides
function requestFinish(dayId) {
  const day = getActiveProgram().find(d => d.id === dayId);
  const missing = [];
  let anyData = false;
  getSessionExercises(day).forEach(ex => {
    const sets = [];
    for (let i = 0; i < ex.sets; i++) {
      if (state.current[`${ex.id}_${i}_kg`] || state.current[`${ex.id}_${i}_reps`]) anyData = true;
      else sets.push(i + 1);
    }
    if (sets.length) missing.push(`${ex.name} — série${sets.length > 1 ? 's' : ''} ${sets.join(', ')}`);
  });
  if (!anyData) { showToast('Saisis au moins une série !'); return; }
  if (!missing.length) { finishSession(dayId); return; }

  let el = document.getElementById('finish-modal');
  if (!el) { el = document.createElement('div'); el.id = 'finish-modal'; document.body.appendChild(el); }
  el.className = 'modal-overlay';
  el.onclick = e => { if (e.target === el) closeFinishModal(); };
  el.innerHTML = `<div class="modal-box">
    <div class="modal-title">Terminer la séance ?</div>
    <div class="info-text" style="margin-bottom:6px">Il reste ${missing.length > 1 ? 'des séries' : 'une ou des séries'} non saisies, elles ne seront pas enregistrées :</div>
    <div class="info-text" style="color:var(--text2)">${missing.slice(0, 4).join('<br>')}${missing.length > 4 ? '<br>…' : ''}</div>
    <button class="btn-primary" style="background:${day.accent}" onclick="closeFinishModal();finishSession('${dayId}')">Terminer quand même</button>
    <button class="modal-cancel" onclick="closeFinishModal()">Continuer la séance</button>
  </div>`;
}

function closeFinishModal() {
  const el = document.getElementById('finish-modal');
  if (el) el.remove();
}

// ── Terminer la séance ────────────────────────────────────────────────────────
function finishSession(dayId) {
  const day   = getActiveProgram().find(d => d.id === dayId);
  const entry = { dayId, date: new Date().toISOString(), sets: {} };
  const exercises = getSessionExercises(day);
  let hasData = false;

  // Remplacements faits pendant la séance : gardés avec la séance pour que
  // l'historique sache quel exercice a vraiment été fait.
  const swaps = {};
  exercises.forEach(ex => { if (ex._slotId) swaps[ex._slotId] = ex.id; });
  if (Object.keys(swaps).length) entry.swaps = swaps;

  exercises.forEach(ex => {
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

  exercises.forEach(ex => {
    for (let i = 0; i < ex.sets; i++) {
      delete state.current[`${ex.id}_${i}_kg`];
      delete state.current[`${ex.id}_${i}_reps`];
    }
  });
  day.exercises.forEach(ex => { delete state.swaps[ex.id]; });

  state.history.push(entry);
  state.activeEx = null;
  state._lastTimerSet = null;
  state.done = {};
  state.dayIdx = suggestNextDayIdx();

  const prs = detectPRs(entry, { ...day, exercises });
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
  const exosCompleted = new Set(Object.keys(entry.sets).map(k => k.slice(0, k.lastIndexOf('_')))).size;
  const min           = Math.floor(elapsedSec / 60);
  const sec           = elapsedSec % 60;
  const timeStr       = elapsedSec > 0 ? `${min}:${sec.toString().padStart(2,'0')}` : '—';

  let vol = 0;
  Object.values(entry.sets).forEach(s => {
    vol += (parseFloat(s.kg)||0) * (parseInt(s.reps)||0);
  });

  const hex = day.accent.replace('#','');
  const r   = parseInt(hex.substr(0,2), 16);
  const g   = parseInt(hex.substr(2,2), 16);
  const b   = parseInt(hex.substr(4,2), 16);

  overlay.style.setProperty('--victory-accent', day.accent);
  overlay.style.setProperty('--va-rgb', `${r},${g},${b}`);
  document.getElementById('victory-day').textContent  = day.name.toUpperCase() + ' — ' + day.subtitle.toUpperCase();
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

// ── Changer d'exercice pendant la séance ──────────────────────────────────────
// Le remplacement ne vaut que pour la séance en cours : le programme ne change
// pas. Les séries sont enregistrées sous l'exercice réellement fait.

let swapPickerSlot = null;

function effectiveExId(slotId) { return (state.swaps && state.swaps[slotId]) || slotId; }

function exHasInput(exId, sets) {
  for (let i = 0; i < sets; i++) {
    if (state.current[`${exId}_${i}_kg`] || state.current[`${exId}_${i}_reps`]) return true;
  }
  return false;
}

function openSwapPicker(slotId) {
  const day  = getActiveProgram()[state.dayIdx];
  const slot = day.exercises.find(e => e.id === slotId);
  if (!slot) return;
  swapPickerSlot = slotId;
  const current = effectiveExId(slotId);
  // Pas un exercice déjà prévu ailleurs dans ce jour (les séries se mélangeraient)
  const taken = new Set(getSessionExercises(day).map(e => e.id));
  taken.delete(current);
  const usable = id => id !== slotId && id !== current && !taken.has(id) && getExerciseById(id);

  const suggested = (ALTERNATIVES[slotId] || []).filter(usable);
  const lib = getExerciseLibrary().filter(e => usable(e.id) && !suggested.includes(e.id));
  const groups = {};
  lib.forEach(e => { (groups[e._muscle] = groups[e._muscle] || []).push(e); });
  const slotMuscle = muscleOf(slot);
  const order = [slotMuscle, ...MUSCLE_ORDER.filter(m => m !== slotMuscle), 'Autre'];

  const item = ex => {
    const prev = getLastPerf(ex.id, 0);
    return `<div class="ex-picker-item swap-item" onclick="previewSwap('${slotId}','${ex.id}')">
      ${exThumb(ex)}
      <div class="swap-item-text">
        <div class="ex-picker-item-name">${ex.name}</div>
        <div class="ex-picker-item-meta">${slot.sets}×${repRange(ex)}${prev ? ` · Préc : ${prev.kg}kg×${prev.reps}` : ''}</div>
      </div>
      <button class="ex-picker-item-add" aria-label="Prendre ${ex.name}" style="background:${day.accent}26;color:${day.accent}" onclick="event.stopPropagation();chooseSwap('${slotId}','${ex.id}')">⇄</button>
    </div>`;
  };

  let html = `<div class="ex-picker-overlay" onclick="closeSwapPicker()">
    <div class="ex-picker" onclick="event.stopPropagation()">
      <div class="ex-picker-header">
        <div class="ex-picker-title">Remplacer ${slot.name}</div>
        <button class="ex-picker-close" onclick="closeSwapPicker()">✕</button>
      </div>`;
  if (exHasInput(current, slot.sets)) {
    html += `<div class="swap-warning">Les séries déjà saisies sur cet exercice seront effacées.</div>`;
  }
  html += '<div class="ex-picker-list">';
  if (current !== slotId) {
    html += `<div class="ex-picker-group" style="color:${day.accent};border-left:2px solid ${day.accent};padding-left:10px">Programme</div>`;
    html += item(slot).replace(`chooseSwap('${slotId}','${slot.id}')`, `chooseSwap('${slotId}',null)`);
  }
  if (suggested.length) {
    html += `<div class="ex-picker-group" style="color:${day.accent};border-left:2px solid ${day.accent};padding-left:10px">Suggestions</div>`;
    suggested.forEach(id => { html += item(getExerciseById(id)); });
  }
  order.forEach(g => {
    if (!groups[g]) return;
    html += `<div class="ex-picker-group" style="padding-left:12px">${g}</div>`;
    groups[g].forEach(e => { html += item(e); });
  });
  html += '</div></div></div>';

  let el = document.getElementById('swap-picker');
  if (!el) { el = document.createElement('div'); el.id = 'swap-picker'; document.body.appendChild(el); }
  el.innerHTML = html;
}

// Aperçu de la fiche avant de choisir
function previewSwap(slotId, exId) {
  const ex  = getExerciseById(exId);
  const day = getActiveProgram()[state.dayIdx];
  const el  = document.getElementById('swap-picker');
  if (!ex || !el) return;
  const slot = day.exercises.find(e => e.id === slotId);
  const backToProgram = slot && exId === slot.id;
  const box = el.querySelector('.ex-picker');
  box.innerHTML = `
    <div class="ex-picker-header">
      <button class="swap-back" onclick="openSwapPicker('${slotId}')" aria-label="Retour à la liste">‹ Liste</button>
      <button class="ex-picker-close" onclick="closeSwapPicker()">✕</button>
    </div>
    <div class="ex-picker-list swap-preview">
      <div class="pe-preview">${ex.info ? renderExFicheHtml(ex) : `<div class="pe-preview-name">${ex.name}</div>`}</div>
    </div>
    <div class="swap-preview-footer">
      <button class="swap-choose" style="background:${day.accent}" onclick="chooseSwap('${slotId}',${backToProgram ? 'null' : `'${exId}'`})">⇄ Prendre cet exercice</button>
    </div>`;
}

function closeSwapPicker() {
  swapPickerSlot = null;
  const el = document.getElementById('swap-picker');
  if (el) el.remove();
}

// altId = null : revenir à l'exercice du programme
function chooseSwap(slotId, altId) {
  const day  = getActiveProgram()[state.dayIdx];
  const slot = day.exercises.find(e => e.id === slotId);
  if (!slot) return;
  const oldId = effectiveExId(slotId);
  // Effacer ce qui a été saisi sur l'exercice qu'on quitte
  for (let i = 0; i < slot.sets; i++) {
    delete state.current[`${oldId}_${i}_kg`];
    delete state.current[`${oldId}_${i}_reps`];
    if (state.done) delete state.done[`${oldId}_${i}`];
  }
  if (!state.swaps) state.swaps = {};
  if (altId && altId !== slotId) state.swaps[slotId] = altId;
  else delete state.swaps[slotId];
  state.activeEx = effectiveExId(slotId);
  saveState();
  closeSwapPicker();
  render();
  showToast(altId ? `${getExerciseById(altId).name} pour cette séance` : `Retour à ${slot.name}`);
}

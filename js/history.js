// ============ HISTORIQUE ============

let editingIdx     = null;
let editingBodyIdx = null;
let editSets       = {};

let histFilter = 'all';

function setHistFilter(f) { histFilter = f; renderHistory(); }

function fmtNum(n, d = 1) { return (Math.round(n * 10 ** d) / 10 ** d).toLocaleString('fr-FR'); }

function renderHistory() {
  const all = [];
  state.history.forEach    ((h, i) => all.push({ type:'muscu', data:h, idx:i }));
  (state.veloSessions||[]) .forEach((v, i) => all.push({ type:'velo',  data:v, idx:i }));
  (state.bodyStats||[])    .forEach((b, i) => all.push({ type:'body',  data:b, idx:i }));
  all.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  const count = t => all.filter(e => e.type === t).length;
  const filters = [
    { id:'all',   label:'Tout',    n: all.length },
    { id:'muscu', label:'Muscu',   n: count('muscu') },
    ...(count('velo') ? [{ id:'velo',  label:'Vélo',    n: count('velo') }] : []),
    { id:'body',  label:'Mesures', n: count('body') },
  ];
  const entries = histFilter === 'all' ? all : all.filter(e => e.type === histFilter);

  let html = '<h2 class="page-title">Historique</h2>';
  html += `<div class="seg">${filters.map(f =>
    `<button class="seg-btn${histFilter === f.id ? ' active' : ''}" onclick="setHistFilter('${f.id}')">${f.label}<span class="seg-n">${f.n}</span></button>`).join('')}</div>`;

  if (!entries.length) {
    html += `<div class="hx-empty">
      <div class="hx-empty-title">${all.length ? 'Rien dans cette catégorie' : 'Aucune activité enregistrée'}</div>
      <div class="hx-empty-desc">${all.length ? 'Choisis un autre filtre.' : 'Termine ta première séance pour la voir ici.'}</div>
    </div>`;
  }

  let month = '';
  entries.forEach(entry => {
    const m = new Date(entry.data.date).toLocaleDateString('fr-FR', { month:'long', year:'numeric' });
    if (m !== month) {
      month = m;
      html += `<div class="hx-month">${m.charAt(0).toUpperCase() + m.slice(1)}</div>`;
    }
    const date = new Date(entry.data.date).toLocaleDateString('fr-FR', { weekday:'short', day:'numeric', month:'short' });

    if (entry.type === 'muscu') {
      const h = entry.data, i = entry.idx;
      const found = findDayInfo(h.dayId);
      if (!found) return;
      const d = found.day;
      const exos = getEntryExercises(h, d);
      let vol = 0, nSets = 0;
      Object.values(h.sets).forEach(st => { vol += (parseFloat(st.kg)||0) * (parseInt(st.reps)||0); nSets++; });
      const lines = exos.map(ex => {
        let best = null, n = 0;
        for (let k = 0; k < ex.sets; k++) {
          const st = h.sets[`${ex.id}_${k}`];
          if (!st) continue;
          n++;
          if (!best || (parseFloat(st.kg)||0) > (parseFloat(best.kg)||0)) best = st;
        }
        return best ? { ex, best, n } : null;
      }).filter(Boolean);

      html += `<button class="hx-card" style="--hx:${d.accent}" onclick="openEditSession(${i})">
        <div class="hx-top">
          <span class="hx-title">${d.name}<span class="hx-subtitle">${d.subtitle || ''}</span></span>
          <span class="hx-date">${date}</span>
        </div>
        <div class="hx-stats"><span><strong>${nSets}</strong> séries</span><span><strong>${lines.length}</strong> exercices</span>${vol ? `<span><strong>${fmtNum(vol / 1000)}</strong> t soulevées</span>` : ''}</div>
        <div class="hx-lines">
          ${lines.map(l => `<div class="hx-line">
            <span class="hx-line-name">${l.ex.name}${l.ex._slotId ? ' <span class="hx-swap">⇄</span>' : ''}</span>
            <span class="hx-line-perf">${l.best.kg} kg × ${l.best.reps}<span class="hx-line-n"> · ${l.n} série${l.n > 1 ? 's' : ''}</span></span>
          </div>`).join('')}
        </div>
      </button>`;
    }

    else if (entry.type === 'velo') {
      const v = entry.data, vi = entry.idx;
      const typeLabels = { endurance:'Endurance', long:'Sortie longue', recup:'Récupération' };
      const speed = v.distance && v.duration ? v.distance / (v.duration / 60) : 0;
      html += `<button class="hx-card hx-card--small" style="--hx:var(--yellow)" onclick="openEditVelo(${vi})">
        <div class="hx-top">
          <span class="hx-title">🚴 Vélo<span class="hx-subtitle">${typeLabels[v.type] || v.type || ''}</span></span>
          <span class="hx-date">${date}</span>
        </div>
        <div class="hx-stats">
          ${v.distance ? `<span><strong>${fmtNum(v.distance)}</strong> km</span>` : ''}
          ${v.duration ? `<span><strong>${v.duration}</strong> min</span>` : ''}
          ${speed ? `<span><strong>${fmtNum(speed)}</strong> km/h</span>` : ''}
        </div>
      </button>`;
    }

    else if (entry.type === 'body') {
      const b = entry.data, bi = entry.idx;
      const vals = [
        b.poids     ? `<span><strong>${fmtNum(parseFloat(b.poids))}</strong> kg</span>` : '',
        b.taille_cm ? `<span>taille <strong>${fmtNum(parseFloat(b.taille_cm))}</strong> cm</span>` : '',
        b.bras      ? `<span>bras <strong>${fmtNum(parseFloat(b.bras))}</strong> cm</span>` : '',
        b.poitrine  ? `<span>poitrine <strong>${fmtNum(parseFloat(b.poitrine))}</strong> cm</span>` : '',
      ].join('');
      html += `<button class="hx-card hx-card--small" style="--hx:var(--purple)" onclick="openEditBodyStat(${bi})">
        <div class="hx-top">
          <span class="hx-title">⚖️ Mesure</span>
          <span class="hx-date">${date}</span>
        </div>
        <div class="hx-stats">${vals || '<span>Mesure vide</span>'}</div>
      </button>`;
    }
  });

  if (all.length) html += '<div class="hx-hint">Touche une ligne pour la modifier ou la supprimer.</div>';

  // Données : export / import / remise à zéro, rangés en bas
  html += `<div class="warrior-section" style="margin-top:26px">Données</div>
    <div class="hx-tools">
      ${state.history.length ? '<button class="hx-tool" onclick="exportToExcel()">⬇ Exporter en Excel</button>' : ''}
      <button class="hx-tool" onclick="openImportModal()">⬆ Importer un Excel</button>
    </div>
    ${all.length ? '<button class="hx-reset" onclick="resetHistory()">Tout effacer</button>' : ''}`;

  document.getElementById('page-history').innerHTML = html;
}

// ── Long-press ────────────────────────────────────────────────────────────────
function initHistSwipe() {
  document.querySelectorAll('[data-hist-action]').forEach(card => {
    const action = card.getAttribute('data-hist-action');
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

      // Annuler si scroll vertical
      if (dy > Math.abs(dx) * 0.8 && dy > 8) { tracking = false; return; }

      // Suivre le doigt visuellement
      if (dx < 0) {
        card.style.transform = `translateX(${Math.max(dx * 0.4, -40)}px)`;
      }

      // Seuil atteint
      if (dx < -55) {
        fired    = true;
        tracking = false;
        card.style.transition = 'transform 0.2s cubic-bezier(0.4,0,0.2,1), opacity 0.2s';
        card.style.transform  = 'translateX(-12px)';
        card.style.opacity    = '0.7';
        setTimeout(() => {
          card.style.transform = '';
          card.style.opacity   = '';
          card.style.transition = '';
          eval(action);
        }, 180);
      }
    }, { passive: true });

    const reset = () => {
      if (fired) return;
      tracking = false;
      card.style.transition = 'transform 0.25s ease';
      card.style.transform  = '';
      card.style.opacity    = '';
    };
    card.addEventListener('touchend',    reset, { passive: true });
    card.addEventListener('touchcancel', reset, { passive: true });

    // Desktop : clic droit
    card.addEventListener('contextmenu', e => { e.preventDefault(); eval(action); });
  });
}

// ── Édition séance muscu ──────────────────────────────────────────────────────
function openEditSession(idx) {
  editingIdx = idx;
  const h = state.history[idx];
  const found = findDayInfo(h.dayId);
  if (!found) return;
  const d = found.day;
  editSets = JSON.parse(JSON.stringify(h.sets));

  document.getElementById('edit-modal-title').textContent = `Modifier — ${d.name} · ${formatDate(h.date)}`;
  let body = '';
  getEntryExercises(h, d).forEach(ex => {
    body += `<div style="margin-bottom:12px">
      <div style="font-size:12px;font-weight:700;color:${d.accent};margin-bottom:6px">${ex.name}${ex._slotId ? ` <span style="font-weight:500;color:var(--text3)">(à la place de ${ex._slotName})</span>` : ''}</div>`;
    for (let i = 0; i < ex.sets; i++) {
      const key   = `${ex.id}_${i}`;
      const s     = editSets[key] || {kg:'', reps:''};
      const isTop = ex.topSet && i === 0;
      body += `<div class="set-row">
        <div class="set-label${isTop?' top':''}" style="--ex-accent:${d.accent}">${isTop?'TOP':`S${i+1}`}</div>
        <div class="input-wrap">
          <input type="number" inputmode="decimal" placeholder="kg" value="${s.kg||''}" oninput="updateEditSet('${key}','kg',this.value)">
          <span class="unit">kg</span>
        </div>
        <div class="input-wrap">
          <input type="number" inputmode="numeric" placeholder="reps" value="${s.reps||''}" oninput="updateEditSet('${key}','reps',this.value)">
          <span class="unit">reps</span>
        </div>
      </div>`;
    }
    body += '</div>';
  });

  document.getElementById('edit-modal-body').innerHTML = body;
  document.getElementById('edit-modal-save').setAttribute('onclick', 'saveEditSession()');
  const delBtn = document.getElementById('edit-modal-delete');
  delBtn.setAttribute('onclick', `deleteSession(${idx})`);
  delBtn.style.display = 'block';
  document.getElementById('edit-modal').classList.remove('hidden');
}

function updateEditSet(key, field, val) {
  if (!editSets[key]) editSets[key] = {kg:'', reps:''};
  editSets[key][field] = val;
  if (!editSets[key].kg && !editSets[key].reps) delete editSets[key];
}

function saveEditSession() {
  if (editingIdx === null) return;
  state.history[editingIdx].sets = JSON.parse(JSON.stringify(editSets));
  saveState(); closeEditModal(); showToast('Séance modifiée ✓'); render();
}

function deleteSession(idx) {
  const h = state.history[idx];
  const d = PROGRAM.find(p => p.id === h.dayId);
  const label = d ? `${d.name} du ${formatDate(h.date)}` : 'cette séance';
  if (confirm(`Supprimer ${label} ? Cette action est irréversible.`)) {
    closeEditModal();
    state.history.splice(idx, 1);
    saveState(); showToast('Séance supprimée'); render();
  }
}

// ── Édition sortie vélo ───────────────────────────────────────────────────────
function openEditVelo(idx) {
  const v = state.veloSessions[idx];
  if (!v) return;
  document.getElementById('edit-modal-title').textContent = `Modifier — Sortie vélo du ${formatDate(v.date)}`;
  document.getElementById('edit-modal-body').innerHTML = `
    <div class="velo-input-row">
      <div class="velo-field"><label>Distance (km)</label><input type="number" inputmode="decimal" id="edit-velo-distance" value="${v.distance||''}"></div>
      <div class="velo-field"><label>Durée (min)</label><input type="number" inputmode="numeric" id="edit-velo-duration" value="${v.duration||''}"></div>
    </div>
    <div class="velo-input-row">
      <div class="velo-field"><label>Type</label>
        <select id="edit-velo-type">
          <option value="endurance" ${v.type==='endurance'?'selected':''}>Endurance</option>
          <option value="long"      ${v.type==='long'     ?'selected':''}>Sortie longue</option>
          <option value="recup"     ${v.type==='recup'    ?'selected':''}>Récupération</option>
        </select>
      </div>
    </div>`;
  document.getElementById('edit-modal-save').setAttribute('onclick', `saveEditVelo(${idx})`);
  const delBtn = document.getElementById('edit-modal-delete');
  delBtn.setAttribute('onclick', `deleteVeloSession(${idx})`);
  delBtn.style.display = 'block';
  document.getElementById('edit-modal').classList.remove('hidden');
}

function saveEditVelo(idx) {
  state.veloSessions[idx].distance = parseFloat(document.getElementById('edit-velo-distance').value) || 0;
  state.veloSessions[idx].duration = parseInt  (document.getElementById('edit-velo-duration').value) || 0;
  state.veloSessions[idx].type     = document.getElementById('edit-velo-type').value;
  saveState(); closeEditModal(); showToast('Sortie vélo modifiée ✓'); render();
}

function deleteVeloSession(idx) {
  const v = state.veloSessions[idx];
  if (confirm(`Supprimer sortie vélo du ${formatDate(v.date)} ?`)) {
    closeEditModal(); state.veloSessions.splice(idx, 1); saveState(); showToast('Sortie vélo supprimée'); render();
  }
}

// ── Édition mesure corporelle ─────────────────────────────────────────────────
function openEditBodyStat(idx) {
  editingBodyIdx = idx;
  const b = state.bodyStats[idx];
  if (!b) return;
  document.getElementById('edit-modal-title').textContent = (typeof newBodyIdx !== 'undefined' && newBodyIdx === idx) ? 'Nouvelle mesure' : `Modifier — Mesure du ${formatDate(b.date)}`;
  document.getElementById('edit-modal-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="stat-field"><label>Poids (kg)</label><input type="number" inputmode="decimal" id="edit-body-poids"    value="${b.poids   ||''}" placeholder="—"></div>
      <div class="stat-field"><label>Tour de bras (cm)</label><input type="number" inputmode="decimal" id="edit-body-bras"     value="${b.bras    ||''}" placeholder="—"></div>
      <div class="stat-field"><label>Poitrine (cm)</label><input type="number" inputmode="decimal" id="edit-body-poitrine" value="${b.poitrine||''}" placeholder="—"></div>
      <div class="stat-field"><label>Tour de taille (cm)</label><input type="number" inputmode="decimal" id="edit-body-taille"  value="${b.taille_cm||''}" placeholder="—"></div>
    </div>`;
  document.getElementById('edit-modal-save').setAttribute('onclick', 'saveEditBodyStat()');
  const delBtn = document.getElementById('edit-modal-delete');
  delBtn.setAttribute('onclick', `deleteBodyStat(${idx})`);
  delBtn.style.display = 'block';
  document.getElementById('edit-modal').classList.remove('hidden');
}

function saveEditBodyStat() {
  if (editingBodyIdx === null) return;
  const b = state.bodyStats[editingBodyIdx];
  b.poids     = document.getElementById('edit-body-poids').value;
  b.bras      = document.getElementById('edit-body-bras').value;
  b.poitrine  = document.getElementById('edit-body-poitrine').value;
  b.taille_cm = document.getElementById('edit-body-taille').value;
  // Même partage avec Hébé que la saisie classique
  const d = localYMD(b.date);
  if (b.poids) {
    state.bodyWeight = parseFloat(b.poids);
    if (!state.bodyWeightDate || d >= state.bodyWeightDate) state.bodyWeightDate = d;
    saveHebeWeight(parseFloat(b.poids), d);
  }
  if (b.taille_cm) saveHebeWaist(parseFloat(b.taille_cm), d);
  if (typeof newBodyIdx !== 'undefined') newBodyIdx = null;
  editingBodyIdx = null;
  saveState(); closeEditModal(); showToast('Mesure modifiée ✓'); render();
}

function deleteBodyStat(idx) {
  const b = state.bodyStats[idx];
  if (confirm(`Supprimer mesure du ${formatDate(b.date)} ?`)) {
    newBodyIdx = null;
    closeEditModal(); state.bodyStats.splice(idx, 1); saveState(); showToast('Mesure supprimée'); render();
  }
}

// ── Modal partagée ────────────────────────────────────────────────────────────
function closeEditModal() {
  // Nouvelle mesure abandonnée sans rien saisir : on ne la garde pas
  if (typeof newBodyIdx !== 'undefined' && newBodyIdx !== null) {
    const b = state.bodyStats[newBodyIdx];
    if (b && !b.poids && !b.bras && !b.poitrine && !b.taille_cm) { state.bodyStats.splice(newBodyIdx, 1); saveState(); render(); }
    newBodyIdx = null;
  }
  document.getElementById('edit-modal').classList.add('hidden');
  document.getElementById('edit-modal-delete').style.display = 'none';
  editingIdx = editingBodyIdx = null;
  editSets   = {};
}

function resetHistory() {
  if (confirm('Supprimer tout l\'historique (muscu, vélo et mesures) ? Cette action est irréversible.')) {
    state.history = []; state.veloSessions = []; state.bodyStats = [];
    saveState(); showToast('Historique supprimé'); render();
  }
}

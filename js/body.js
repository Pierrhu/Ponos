// ============ SUIVI CORPOREL ============

const BODY_FIELDS = [
  { key:'poids',     label:'Poids',          unit:'kg', hex:'#E4A229', goodDir:'context' },
  { key:'taille_cm', label:'Tour de taille', unit:'cm', hex:'#C23B3B', goodDir:'down'    },
  { key:'bras',      label:'Tour de bras',   unit:'cm', hex:'#8B5CF6', goodDir:'up'      },
  { key:'poitrine',  label:'Poitrine',       unit:'cm', hex:'#2D7DD2', goodDir:'up'      },
];

// Série complète d'une mesure (Ponos + Hébé pour le poids et le tour de taille)
function bodySeries(key) {
  const hebeList = key === 'poids' ? getHebeWeights() : key === 'taille_cm' ? getHebeWaist() : null;
  if (hebeList) return mergedBodySeries(key, hebeList, key === 'poids' ? 'kg' : 'cm');
  return state.bodyStats.filter(b => parseFloat(b[key]) > 0)
    .map(b => ({ d: localYMD(b.date), val: parseFloat(b[key]) })).sort((a, b) => a.d.localeCompare(b.d));
}

function renderBody() {
  let html = progressHeaderHtml();

  // ── Dernières valeurs ────────────────────────────────────────────────────
  const tiles = BODY_FIELDS.map(f => {
    const ser = bodySeries(f.key);
    if (!ser.length) return '';
    const last = ser[ser.length - 1], first = ser[0];
    const diff = last.val - first.val;
    const good = f.goodDir === 'down' ? diff < 0 : f.goodDir === 'up' ? diff > 0 : null;
    const col  = !diff || good === null ? 'var(--text2)' : good ? 'var(--green)' : 'var(--red)';
    return `<div class="bd-tile" style="--bd:${f.hex}">
      <div class="bd-tile-label">${f.label}</div>
      <div class="bd-tile-val">${last.val.toLocaleString('fr-FR')}<small> ${f.unit}</small></div>
      <div class="bd-tile-diff" style="color:${col}">${ser.length > 1 ? `${diff > 0 ? '+' : ''}${diff.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} ${f.unit} depuis le ${hebeDateFr(first.d)}` : `le ${hebeDateFr(last.d)}`}</div>
    </div>`;
  }).join('');

  html += tiles
    ? `<div class="bd-tiles">${tiles}</div>`
    : `<div class="hx-empty"><div class="hx-empty-title">Aucune mesure</div><div class="hx-empty-desc">Pèse-toi et mesure ton tour de taille une fois par semaine, le même jour, le matin à jeun.</div></div>`;

  html += `<button class="btn-primary" style="background:var(--yellow)" onclick="addBodyStat()">+ Nouvelle mesure</button>`;
  html += '<div class="bd-note">Même jour chaque semaine, le matin à jeun. C\'est la tendance qui compte, pas un chiffre isolé.'
    + (hebeAvailable() ? ' Le poids et le tour de taille sont partagés avec Hébé.' : '') + '</div>';

  // Graphes d'évolution
  {
    const metrics = [
      { key:'poids',     label:'Poids (kg)',          color:'var(--yellow)', hex:'#E4A229', goodDir:'context' },
      { key:'bras',      label:'Tour de bras (cm)',   color:'var(--purple)', hex:'#8B5CF6', goodDir:'up'      },
      { key:'poitrine',  label:'Poitrine (cm)',        color:'var(--blue)',   hex:'#2D7DD2', goodDir:'up'      },
      { key:'taille_cm', label:'Tour de taille (cm)', color:'var(--red)',    hex:'#C23B3B', goodDir:'down'    },
    ];

    metrics.forEach(m => {
      const hebeList = m.key === 'poids' ? getHebeWeights() : m.key === 'taille_cm' ? getHebeWaist() : null;
      const entries = hebeList
        ? mergedBodySeries(m.key, hebeList, m.key === 'poids' ? 'kg' : 'cm').slice(-12).map(e => ({
            val:  e.val,
            date: new Date(e.d + 'T12:00:00').toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit'})
          }))
        : state.bodyStats.filter(b => b[m.key]).map(b => ({
            val:  parseFloat(b[m.key]),
            date: new Date(b.date).toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit'})
          }));
      if (entries.length < 2) return;

      const vals  = entries.map(e => e.val);
      const minV  = Math.min(...vals), maxV = Math.max(...vals);
      const range = maxV - minV || 1;
      const diff  = vals[vals.length-1] - vals[0];
      const good  = m.goodDir === 'down' ? diff < 0 : m.goodDir === 'up' ? diff > 0 : null;

      const cH = 80, cW = 320, pX = 8, pT = 16, pB = 4;
      const uH = cH - pT - pB, uW = cW - pX * 2;

      const points = entries.map((e, i) => ({
        x: entries.length===1 ? cW/2 : pX + (i/(entries.length-1))*uW,
        y: pT + uH - ((e.val-minV)/range)*uH,
        val: e.val
      }));

      let linePath = `M${points[0].x},${points[0].y}`;
      let areaPath = `M${points[0].x},${cH-pB}L${points[0].x},${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        linePath += `L${points[i].x},${points[i].y}`;
        areaPath += `L${points[i].x},${points[i].y}`;
      }
      areaPath += `L${points[points.length-1].x},${cH-pB}Z`;

      html += `<div class="card" style="margin-top:10px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
          <span class="bd-chart-title" style="color:${m.color}">${m.label}</span>
          <span style="font-size:12px;font-weight:700;color:${good === null ? 'var(--text2)' : good ? 'var(--green)' : 'var(--red)'}">${diff>0?'+':''}${diff.toFixed(1)}</span>
        </div>
        <svg class="chart-svg" viewBox="0 0 ${cW} ${cH}" preserveAspectRatio="none" style="height:${cH}px">
          <defs>
            <linearGradient id="bgrad-${m.key}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stop-color="${m.hex}" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="${m.hex}" stop-opacity="0"/>
            </linearGradient>
          </defs>`;

      for (let g = 0; g <= 3; g++) {
        const gy = pT + (uH/3)*g;
        html += `<line x1="${pX}" y1="${gy}" x2="${cW-pX}" y2="${gy}" stroke="var(--border)" stroke-width="0.5"/>`;
      }
      html += `<path d="${areaPath}" fill="url(#bgrad-${m.key})"/>`;
      html += `<path d="${linePath}" fill="none" stroke="${m.hex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
      points.forEach((p, i) => {
        const isLast = i === points.length-1;
        if (isLast) html += `<circle cx="${p.x}" cy="${p.y}" r="7" fill="${m.hex}" opacity="0.15"/>`;
        html += `<circle cx="${p.x}" cy="${p.y}" r="${isLast?4.5:3}" fill="${isLast?m.hex:'var(--card)'}" stroke="${m.hex}" stroke-width="1.5"/>`;
        html += `<text x="${p.x}" y="${p.y-8<10?p.y+14:p.y-8}" text-anchor="middle" fill="${isLast?m.hex:'var(--text3)'}" font-size="${isLast?10:8}" font-weight="${isLast?700:500}" font-family="Space Grotesk,system-ui">${p.val}</text>`;
      });
      html += '</svg>';
      html += '<div class="chart-labels">';
      entries.forEach(e => { html += `<span>${e.date}</span>`; });
      html += '</div>';
      html += `<div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px">
        <span style="color:var(--text3)">Min: <strong style="color:var(--text2)">${minV.toFixed(1)}</strong></span>
        <span style="color:var(--text3)">Actuel: <strong style="color:${m.color}">${vals[vals.length-1].toFixed(1)}</strong></span>
        <span style="color:var(--text3)">Max: <strong style="color:var(--text2)">${maxV.toFixed(1)}</strong></span>
      </div></div>`;
    });
  }

  // ── Liste des mesures ────────────────────────────────────────────────────
  if (state.bodyStats.length) {
    html += '<div class="warrior-section" style="margin-top:22px">Toutes les mesures</div><div class="bd-list">';
    state.bodyStats.map((b, i) => ({ b, i })).sort((x, y) => new Date(y.b.date) - new Date(x.b.date)).forEach(({ b, i }) => {
      const cells = BODY_FIELDS.map(f => b[f.key] ? `<span><strong>${parseFloat(b[f.key]).toLocaleString('fr-FR')}</strong> ${f.unit}</span>` : '').filter(Boolean).join('');
      html += `<button class="bd-row" onclick="openEditBodyStat(${i})">
        <span class="bd-row-date">${new Date(b.date).toLocaleDateString('fr-FR', { day:'numeric', month:'short', year:'numeric' })}</span>
        <span class="bd-row-vals">${cells || '<span>—</span>'}</span>
        <span class="bd-row-edit">✎</span>
      </button>`;
    });
    html += '</div>';
  }

  document.getElementById('page-body').innerHTML = html;
}

// Nouvelle mesure : on ouvre directement la fenêtre de saisie
let newBodyIdx = null;
function addBodyStat() {
  state.bodyStats.push({ date:new Date().toISOString(), poids:'', bras:'', poitrine:'', taille_cm:'' });
  newBodyIdx = state.bodyStats.length - 1;
  openEditBodyStat(newBodyIdx);
}

function updateBody(idx, key, val) {
  state.bodyStats[idx][key] = val;
  const d = localYMD(state.bodyStats[idx].date);
  if (key === 'poids' && val) {
    state.bodyWeight = parseFloat(val);
    if (!state.bodyWeightDate || d >= state.bodyWeightDate) state.bodyWeightDate = d;
    saveHebeWeight(parseFloat(val), d);
  }
  if (key === 'taille_cm' && val) saveHebeWaist(parseFloat(val), d);
  saveState();
}

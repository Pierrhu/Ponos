// ============ GUIDE : RIR, PROGRESSION, LOGIQUE DU PROGRAMME ============

const GUIDE_TABS = [
  { id: 'rir',   label: 'RIR' },
  { id: 'prog',  label: 'Progression' },
  { id: 'why',   label: 'Le programme' },
];
let guideTab = 'rir';

const RIR_LEVELS = [
  { rir: '4+', color: '#3B7A57', title: 'Facile',      text: 'La charge monte **aussi vite** qu\'à la 1ʳᵉ rep. Tu es loin de l\'échec.',
    reps: [0.55, 0.55, 0.55, 0.6, 0.6, 0.6, 0.6, 0.65] },
  { rir: '3',  color: '#7FA34A', title: 'Ça pèse',     text: 'Tu sens l\'effort, mais **la vitesse ne baisse presque pas**.',
    reps: [0.55, 0.55, 0.6, 0.6, 0.65, 0.7, 0.8, 0.9] },
  { rir: '2',  color: '#D9A43B', title: 'Ça ralentit', text: '**Les dernières reps ralentissent nettement.** Deux de plus : dur, mais faisable.',
    reps: [0.55, 0.6, 0.6, 0.7, 0.8, 1.0, 1.3, 1.6] },
  { rir: '1',  color: '#D9702E', title: 'Ça force',    text: 'La dernière rep est **lente, tu dois pousser**. Une seule de plus passerait, tout juste.',
    reps: [0.55, 0.6, 0.7, 0.8, 1.0, 1.3, 1.8, 2.5] },
  { rir: '0',  color: '#C23B3B', title: 'Échec',       text: 'La dernière rep **cale presque à mi-chemin**. Tu n\'en referais pas une seule proprement.',
    reps: [0.6, 0.7, 0.8, 1.0, 1.3, 1.8, 2.6, 3.8], grind: true },
];
let rirSel = 2;
let rirAnimToken = 0;

function selectRir(i) {
  rirSel = i;
  const lv = RIR_LEVELS[i];
  document.querySelectorAll('.gd-rir-chip').forEach((b, k) => {
    b.classList.toggle('active', k === i);
    b.style.background = k === i ? RIR_LEVELS[k].color : '';
  });
  const t = document.getElementById('gd-rir-title'); if (t) { t.textContent = `RIR ${lv.rir} · ${lv.title}`; t.style.color = lv.color; }
  const x = document.getElementById('gd-rir-text');  if (x) x.innerHTML = fmtFiche(lv.text);
  startRirAnim();
}

// Une série de 8 reps : la montée ralentit d'autant plus qu'on s'arrête près de l'échec
function startRirAnim() {
  const token = ++rirAnimToken;
  const lv = RIR_LEVELS[rirSel];
  const bar = document.getElementById('gd-rir-bar');
  const cnt = document.getElementById('gd-rir-count');
  const fill = document.getElementById('gd-rir-fill');
  if (!bar) return;
  bar.style.background = lv.color; bar.style.boxShadow = `0 0 10px ${lv.color}99`;
  const TOP = 92, DOWN = 0.9, PAUSE = 0.25, END = 1.4;
  const seq = [];
  let t = 0;
  lv.reps.forEach((up, k) => {
    seq.push({ k, from: t, to: t + up, a: 0, b: 1, up: true, grind: lv.grind && k === lv.reps.length - 1 });
    t += up + PAUSE;
    seq.push({ k, from: t, to: t + DOWN, a: 1, b: 0 });
    t += DOWN + 0.15;
  });
  const total = t + END;
  const t0 = performance.now();
  const frame = now => {
    if (token !== rirAnimToken || !document.body.contains(bar)) return;
    const el = ((now - t0) / 1000) % total;
    let pos = 0, rep = lv.reps.length, slow = 0;
    for (const s of seq) {
      if (el < s.from) { pos = s.a === 0 ? 0 : 1; rep = s.k + 1; break; }
      if (el <= s.to) {
        let u = (el - s.from) / (s.to - s.from);
        if (s.grind) u = u < 0.45 ? u / 0.45 * 0.5 : u < 0.75 ? 0.5 + (u - 0.45) / 0.3 * 0.05 : 0.55 + (u - 0.75) / 0.25 * 0.45; // cale à mi-course
        pos = s.a + (s.b - s.a) * u; rep = s.k + 1;
        if (s.up) slow = Math.min(1, (s.to - s.from - 0.55) / 2.5);
        break;
      }
      pos = s.b; rep = s.k + 1;
    }
    bar.style.transform = `translateY(${-pos * TOP}px)`;
    if (cnt) cnt.textContent = el > t ? 'Série finie' : `Rep ${rep} / ${lv.reps.length}`;
    if (fill) fill.style.width = `${Math.round(slow * 100)}%`;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function guideRir() {
  const lv = RIR_LEVELS[rirSel];
  return `
    <div class="gd-lead">Le <strong>RIR</strong>, c'est le nombre de reps propres que tu aurais <strong>encore pu faire</strong> au moment où tu poses la charge. Ton repère : <strong>la vitesse</strong>.</div>

    <div class="gd-rir">
      <div class="gd-rir-anim" aria-hidden="true">
        <div class="gd-demo-track"><div class="gd-rir-bar" id="gd-rir-bar"></div></div>
      </div>
      <div class="gd-rir-side">
        <div class="gd-rir-chips" role="tablist" aria-label="Choisir un RIR">
          ${RIR_LEVELS.map((r, k) => `<button class="gd-rir-chip${k === rirSel ? ' active' : ''}" style="${k === rirSel ? `background:${r.color}` : ''};--c:${r.color}" onclick="selectRir(${k})" aria-label="RIR ${r.rir}">${r.rir}</button>`).join('')}
        </div>
        <div class="gd-rir-title" id="gd-rir-title" style="color:${lv.color}">RIR ${lv.rir} · ${lv.title}</div>
        <div class="gd-rir-text" id="gd-rir-text">${fmtFiche(lv.text)}</div>
        <div class="gd-rir-meta"><span id="gd-rir-count">Rep 1 / 8</span><span class="gd-rir-slow">lenteur <span class="gd-rir-slowbar"><span id="gd-rir-fill"></span></span></span></div>
      </div>
    </div>

    <div class="gd-h">Dans ton programme</div>
    <ul class="gd-list">
      <li><strong>Gros exos</strong> (couché, militaire, tirages, incliné) : <strong>RIR 1-2</strong>. Pendant les 2 premières semaines de reprise : RIR 2-3.</li>
      <li><strong>Isolation</strong> (latérales, curls, triceps, écartés) : <strong>RIR 0-1</strong>, et « dernière à fond » = la dernière série jusqu'à l'échec.</li>
      <li><strong>Jamais à l'échec au développé couché ou au militaire sans pareur.</strong> RIR 1-2, c'est déjà parfait.</li>
    </ul>

    <div class="gd-h">Calibrer ton ressenti</div>
    <div class="gd-text">Au début, presque tout le monde se croit plus près de l'échec qu'il ne l'est (souvent de 2-3 reps). Une fois par semaine, pendant 2-3 semaines :</div>
    <ol class="gd-steps">
      <li><span>Sur un exo <strong>sans danger</strong> (latérales, curl, machine, poulie), prends la dernière série.</span></li>
      <li><span>Avant de commencer, <strong>devine</strong> combien tu vas en faire.</span></li>
      <li><span>Va <strong>jusqu'à l'échec</strong>, puis compare. Tu pensais 12 et tu en fais 16 ? Ton « RIR 2 » était un RIR 6.</span></li>
    </ol>`;
}

function guideProg() {
  const ex = [
    { s: 'Séance 1', sets: ['10', '9', '8'], kg: '40 kg', note: 'Fourchette 8-12 : on garde 40 kg' },
    { s: 'Séance 2', sets: ['12', '11', '10'], kg: '40 kg', note: 'Ça progresse, toujours 40 kg' },
    { s: 'Séance 3', sets: ['12', '12', '12'], kg: '40 kg', note: '✓ Haut de la fourchette partout', ok: true },
    { s: 'Séance 4', sets: ['9', '8', '8'], kg: '42,5 kg', note: '+2,5 kg, on repart d\'en bas', up: true },
  ];
  return `
    <div class="gd-lead">La <strong>double progression</strong> : d'abord tu gagnes des <strong>reps</strong>, ensuite tu gagnes des <strong>kilos</strong>.</div>
    <ol class="gd-steps">
      <li><span>Tu gardes la même charge tant que tu n'as pas atteint <strong>le haut de la fourchette sur toutes les séries</strong>, au bon RIR.</span></li>
      <li><span>Quand c'est fait, tu montes : <strong>+2,5 kg</strong> sur les gros exos, <strong>le plus petit cran</strong> sur l'isolation.</span></li>
      <li><span>Tu retombes en bas de la fourchette, et tu recommences.</span></li>
    </ol>

    <div class="gd-h">Exemple : 3 × 8-12</div>
    <div class="gd-prog">
      ${ex.map(e => `
        <div class="gd-prog-row${e.ok ? ' ok' : ''}${e.up ? ' up' : ''}">
          <div class="gd-prog-s">${e.s}</div>
          <div class="gd-prog-kg">${e.kg}</div>
          <div class="gd-prog-sets">${e.sets.map(n => `<span>${n}</span>`).join('')}</div>
          <div class="gd-prog-note">${e.note}</div>
        </div>`).join('')}
    </div>

    <div class="gd-h">Le top set (couché, militaire)</div>
    <ul class="gd-list">
      <li><strong>Top set</strong> : ta série la plus lourde, <strong>4-6 reps</strong>, RIR 1-2.</li>
      <li>Puis <strong>2 séries de 6-8</strong> environ <strong>10 % plus léger</strong>.</li>
      <li>Quand le top set passe à <strong>6 reps</strong> au bon RIR → <strong>+2,5 kg</strong> la séance suivante.</li>
    </ul>

    <div class="gd-h">Quand ça bloque</div>
    <ul class="gd-list">
      <li><strong>Une</strong> séance moins bonne, c'est normal (sommeil, repas, stress). On ne change rien.</li>
      <li><strong>Deux séances de suite</strong> en baisse sur plusieurs exos → fatigue : une semaine allégée (moitié des séries, mêmes charges), puis ça repart.</li>
      <li>En sèche, <strong>tenir ses charges</strong> est déjà une victoire. Chaque rep gagnée compte.</li>
    </ul>`;
}

function guideWhy() {
  const vol = [
    { m: 'Épaules (latéraux)', n: 13, max: 18, c: 'var(--orange, #D9702E)', tag: 'Priorité' },
    { m: 'Dos (dorsaux)',      n: 17, max: 18, c: 'var(--blue, #2D7DD2)',   tag: 'Priorité' },
    { m: 'Pectoraux',          n: 10, max: 18, c: 'var(--red, #C23B3B)' },
    { m: 'Arrière d\'épaule',  n: 6,  max: 18, c: 'var(--orange, #D9702E)' },
    { m: 'Biceps',             n: 12, max: 18, c: 'var(--purple, #8E5BD6)' },
    { m: 'Triceps',            n: 11, max: 18, c: 'var(--purple, #8E5BD6)' },
    { m: 'Jambes',             n: 9,  max: 18, c: 'var(--green, #3B7A57)' },
  ];
  return `
    <div class="gd-lead">Objectif : <strong>un physique en V, athlétique</strong>. Deux muscles font la largeur : les <strong>deltoïdes latéraux</strong> et les <strong>dorsaux</strong>, travaillés 3 fois par semaine. Les <strong>jambes</strong> et un exercice <strong>explosif</strong> par séance te rendent athlétique. La taille s'affine en perdant du gras : c'est le rôle d'Hébé.</div>

    <div class="gd-h">Les 3 séances</div>
    <ul class="gd-list">
      <li><strong>A · Force</strong> : box jump, couché barre, hack squat, tractions + latérales, rowing, bras.</li>
      <li><strong>B · Épaules & dos</strong> : swing, militaire, tirage + latérales, soulevé de terre roumain, dips, oiseau.</li>
      <li><strong>C · Athlétique</strong> : squat sauté, incliné haltères, tirage + latérales en drop set, bulgare, rowing, bras, marche du fermier.</li>
      <li><strong>Supersets</strong> tirage → latérales : deux muscles qui ne se gênent pas, enchaînés. Même résultat, <strong>moins de temps</strong>.</li>
      <li><strong>Nouveau bloc tous les ~6 semaines</strong> (le prochain après Noël) : mêmes principes, variantes différentes, pour ne jamais t'en lasser.</li>
    </ul>

    <div class="gd-h">Séries dures par semaine</div>
    <div class="gd-vol">
      ${vol.map(v => `
        <div class="gd-vol-row">
          <div class="gd-vol-m">${v.m}${v.tag ? ` <span class="gd-vol-tag">${v.tag}</span>` : ''}</div>
          <div class="gd-vol-bar"><span style="width:${Math.round(v.n / v.max * 100)}%;background:${v.c}"></span></div>
          <div class="gd-vol-n">${v.n}</div>
        </div>`).join('')}
      <div class="gd-vol-zone">Zone efficace : 10 à 20 séries par muscle et par semaine</div>
    </div>

    <div class="gd-h">Ce que dit la recherche</div>
    <ul class="gd-list">
      <li><strong>Volume</strong> : plus de séries = plus de muscle, avec des rendements décroissants (Pelland et al., 2024). D'où 10-20 séries, et le maximum sur épaules et dos.</li>
      <li><strong>Proximité de l'échec</strong> : plus tu t'en approches, plus le muscle grossit ; pour la force, ça change peu (Robinson et al., 2024). D'où RIR 1-2 sur les gros exos, 0-1 sur l'isolation.</li>
      <li><strong>Repos</strong> : au-delà de 60-90 s, petit bonus de croissance (Singer et al., 2024). D'où 2-3 min sur les gros exos, 60-90 s sur l'isolation.</li>
      <li><strong>Latérales</strong> : haltères et poulie font aussi bien, à 12-16 reps proches de l'échec (Frontiers in Physiology, 2025). On alterne pour varier.</li>
      <li><strong>Position étirée</strong> : un muscle travaillé étiré grossit plus (Maeo et al., 2023). D'où le triceps au-dessus de la tête et le curl incliné.</li>
      <li><strong>Barre ou machine</strong> : même croissance (Haugen et al., 2023). La barre reste pour le couché et le militaire, parce que tes records y sont.</li>
      <li><strong>Supersets</strong> : autant de muscle et de force que des séries classiques, en moins de temps (Weakley et al., méta-analyse 2025).</li>
      <li><strong>Pliométrie</strong> (sauts, swings) : améliore la détente et l'explosivité, en plus de la muscu (méta-analyses 2023-2025).</li>
      <li><strong>Varier les exos</strong> de temps en temps donne des résultats au moins aussi bons et aide la motivation ; trop changer nuit à la progression (Kassiano et al., 2022). D'où un bloc stable de ~6 semaines.</li>
    </ul>`;
}

function renderGuide() {
  const body = guideTab === 'rir' ? guideRir() : guideTab === 'prog' ? guideProg() : guideWhy();
  return `<div class="ex-picker-overlay" onclick="closeGuide()">
    <div class="ex-picker gd" onclick="event.stopPropagation()">
      <div class="ex-picker-header">
        <div class="ex-picker-title">Le guide</div>
        <button class="ex-picker-close" onclick="closeGuide()" aria-label="Fermer">✕</button>
      </div>
      <div class="seg gd-tabs">${GUIDE_TABS.map(t =>
        `<button class="seg-btn${guideTab === t.id ? ' active' : ''}" onclick="setGuideTab('${t.id}')">${t.label}</button>`).join('')}</div>
      <div class="ex-picker-list gd-body">${body}</div>
    </div>
  </div>`;
}

function openGuide(tab) {
  if (tab) guideTab = tab;
  if (!state.guideSeen) { state.guideSeen = true; saveState(); }
  let el = document.getElementById('guide');
  if (!el) { el = document.createElement('div'); el.id = 'guide'; document.body.appendChild(el); }
  el.innerHTML = renderGuide();
  if (guideTab === 'rir') startRirAnim();
}
function setGuideTab(t) { guideTab = t; openGuide(); const b = document.querySelector('#guide .gd-body'); if (b) b.scrollTop = 0; }
function closeGuide() { const el = document.getElementById('guide'); if (el) el.remove(); }

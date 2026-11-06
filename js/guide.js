// ============ GUIDE : RIR, PROGRESSION, LOGIQUE DU PROGRAMME ============

const GUIDE_TABS = [
  { id: 'rir',   label: 'RIR' },
  { id: 'prog',  label: 'Progression' },
  { id: 'why',   label: 'Le programme' },
];
let guideTab = 'rir';

function guideRir() {
  const rows = [
    { rir: '4+', color: '#3B7A57', title: 'Facile', text: 'La charge monte aussi vite qu\'à la 1ʳᵉ rep.' },
    { rir: '3',  color: '#7FA34A', title: 'Ça pèse', text: 'Tu sens l\'effort, mais **la vitesse ne baisse pas encore**.' },
    { rir: '2',  color: '#D9A43B', title: 'Ça ralentit', text: '**La rep ralentit nettement.** Deux de plus : dur, mais faisable.' },
    { rir: '1',  color: '#D9702E', title: 'Ça force', text: 'Rep lente, tu dois pousser. **Une seule** de plus passerait, tout juste.' },
    { rir: '0',  color: '#C23B3B', title: 'Échec', text: 'Tu n\'en referais **pas une seule** proprement.' },
  ];
  return `
    <div class="gd-lead">Le <strong>RIR</strong> (<em>reps in reserve</em>), c'est le nombre de reps propres que tu aurais encore pu faire <strong>au moment où tu poses la charge</strong>.</div>

    <div class="gd-demo" aria-hidden="true">
      <div class="gd-demo-track">
        <div class="gd-demo-bar"><span></span></div>
      </div>
      <div class="gd-demo-cap">La charge <strong>ralentit</strong> à l'approche de l'échec : c'est ton meilleur repère.</div>
    </div>

    <div class="gd-scale">
      ${rows.map(r => `
        <div class="gd-scale-row">
          <div class="gd-scale-badge" style="background:${r.color}">${r.rir}</div>
          <div><div class="gd-scale-title">${r.title}</div><div class="gd-scale-text">${fmtFiche(r.text)}</div></div>
        </div>`).join('')}
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
    { m: 'Épaules (latéraux)', n: 11, max: 16, c: 'var(--orange, #D9702E)', tag: 'Priorité' },
    { m: 'Dos (dorsaux)',      n: 12, max: 16, c: 'var(--blue, #2D7DD2)',   tag: 'Priorité' },
    { m: 'Pectoraux',          n: 15, max: 16, c: 'var(--red, #C23B3B)' },
    { m: 'Biceps',             n: 9,  max: 16, c: 'var(--purple, #8E5BD6)' },
    { m: 'Triceps',            n: 9,  max: 16, c: 'var(--purple, #8E5BD6)' },
  ];
  return `
    <div class="gd-lead">Objectif : <strong>le plus grand ratio épaules / taille</strong>. Deux muscles font la largeur : les <strong>deltoïdes latéraux</strong> et les <strong>dorsaux</strong>. La taille, elle, s'affine en perdant du gras (aucun exo ne fait fondre le ventre localement : c'est le rôle d'Hébé).</div>

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
}
function setGuideTab(t) { guideTab = t; openGuide(); const b = document.querySelector('#guide .gd-body'); if (b) b.scrollTop = 0; }
function closeGuide() { const el = document.getElementById('guide'); if (el) el.remove(); }

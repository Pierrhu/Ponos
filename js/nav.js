// ============ NAVIGATION ============

function render() {
  renderNav();
  renderWorkout();
  renderRank();
  renderProgress();
  renderBody();
  renderHistory();
  renderPrograms();

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(activePageId()).classList.add('active');
}

// Progrès regroupe 3 pages : Rang, Exercices, Corps
const PROGRESS_TABS = [
  { id:'rank',      label:'Rang',      page:'page-rank' },
  { id:'exercices', label:'Exercices', page:'page-progress' },
  { id:'body',      label:'Corps',     page:'page-body' },
];

function activePageId() {
  if (state.view === 'progress') {
    const t = PROGRESS_TABS.find(t => t.id === state.progTab) || PROGRESS_TABS[0];
    return t.page;
  }
  return 'page-' + state.view;
}

function progressHeaderHtml() {
  const cur = state.progTab || 'rank';
  return `<h2 class="page-title">Progrès</h2>
    <div class="seg">${PROGRESS_TABS.map(t =>
      `<button class="seg-btn${cur === t.id ? ' active' : ''}" onclick="setProgTab('${t.id}')">${t.label}</button>`).join('')}</div>`;
}

function setProgTab(t) { state.progTab = t; render(); window.scrollTo(0, 0); }

function renderNav() {
  const tabs = [
    {id:'workout',  icon:'<img src="icons/seance.png" alt="">',     label:'Séance'},
    {id:'progress', icon:'<img src="icons/progres.png" alt="">',     label:'Progrès'},
    {id:'history',  icon:'<img src="icons/historique.png" alt="">',  label:'Historique'},
    {id:'programs', icon:'<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2L20 6V11C20 16 16 19.5 11 21C6 19.5 2 16 2 11V6L11 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M8 14L11 11L14 11L11 7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>', label:'Plans'},
  ];
  document.getElementById('nav').innerHTML = tabs.map(t =>
    `<button class="${state.view===t.id?'active':''}" onclick="setView('${t.id}')">
      <span class="icon">${t.icon}</span><span class="label">${t.label}</span>
    </button>`
  ).join('');
}

function setView(v) {
  // Anciennes vues devenues des sous-onglets de Progrès
  if (v === 'rank' || v === 'body') { state.progTab = v; v = 'progress'; }
  state.view = v; render(); window.scrollTo(0, 0);
}

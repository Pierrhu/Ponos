// ============ INIT ============
(async () => {
  await loadState();

  // Migration des identifiants (anciennes versions). Les données d'origine sont
  // gardées dans une copie de secours avant toute modification.
  try {
    const snapshot = JSON.parse(JSON.stringify({ history: state.history, customPrograms: state.customPrograms, current: state.current }));
    if (migrateProgramIds()) {
      await idbSet(STORAGE_KEY + '-backup-ids', { date: new Date().toISOString(), ...snapshot }).catch(() => {});
      saveState();
    }
  } catch (e) {
    console.warn('Migration des identifiants impossible', e);
    // Revenir aux données d'origine plutôt que garder un état à moitié migré
    try { await loadState(); } catch (e2) {}
  }

  render();

  // Récap hebdomadaire (lundi uniquement)
  setTimeout(() => checkWeeklyRecap(), 500);

  // Stockage persistant (Android Chrome)
  if (navigator.storage && navigator.storage.persist) {
    const granted = await navigator.storage.persist();
    console.log('Stockage persistant:', granted ? 'accordé' : 'refusé');
  }

  // Service Worker
  if ('serviceWorker' in navigator) {
    // Quand une nouvelle version prend le relais, recharger une fois pour l'afficher
    // (sauf en pleine séance, pour ne pas couper le chrono).
    const hadController = !!navigator.serviceWorker.controller;
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloading || state._sessionActive) return;
      reloading = true;
      location.reload();
    });
    try {
      await navigator.serviceWorker.register('sw.js');
      console.log('Service Worker enregistré');
    } catch(e) {
      console.warn('Service Worker non disponible');
    }
  }
})();

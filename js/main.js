// ============ INIT ============
(async () => {
  await loadState();
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

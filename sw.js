// Changer ce numéro force le nettoyage des anciens caches.
const CACHE = 'ponos-v2';

const PRECACHE = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './data/program.js',
  './data/standards.js',
  './data/programs.js',
  './js/state.js',
  './js/utils.js',
  './js/timers.js',
  './js/workout.js',
  './js/rank.js',
  './js/progress.js',
  './js/body.js',
  './js/history.js',
  './js/velo.js',
  './js/export.js',
  './js/modals.js',
  './js/programEditor.js',
  './js/nav.js',
  './js/main.js',
];

// Install : met l'app en cache pour le hors-ligne
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

// Activate : supprime les anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function putInCache(request, response) {
  if (response && response.ok && response.type !== 'opaque') {
    const clone = response.clone();
    caches.open(CACHE).then(cache => cache.put(request, clone));
  }
  return response;
}

// Le code de l'app (HTML, JS, CSS, JSON) : réseau d'abord, pour que chaque
// mise à jour poussée sur GitHub arrive tout de suite. Cache si hors-ligne.
function networkFirst(request) {
  return fetch(request)
    .then(response => putInCache(request, response))
    .catch(() => caches.match(request, { ignoreSearch: true })
      .then(cached => cached || caches.match('./index.html')));
}

// Images, GIF, polices, librairies externes : cache d'abord (ils changent
// rarement et sont lourds), réseau sinon.
function cacheFirst(request) {
  return caches.match(request).then(cached =>
    cached || fetch(request).then(response => putInCache(request, response))
  );
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isAppCode = sameOrigin && (
    req.mode === 'navigate' ||
    /\.(html|js|css|json)$/.test(url.pathname) ||
    url.pathname.endsWith('/')
  );

  e.respondWith(isAppCode ? networkFirst(req) : cacheFirst(req));
});

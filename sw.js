const CACHE_NAME = 'ca-dmv-v11';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/styles.css',
  './manifest.json',
  './js/apps-data.js',
  './js/questions.js',
  './js/illustrations.js',
  './js/animations.js',
  './js/adaptive-engine.js',
  './js/app.js'
];

// Install: cache assets and immediately take over
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: delete ALL old caches and claim all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: NETWORK-FIRST strategy
// Always try to get fresh content from the server.
// Only fall back to cache if the network is unavailable (offline).
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Got a fresh response — update the cache with it
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed — serve from cache (offline fallback)
        return caches.match(event.request);
      })
  );
});

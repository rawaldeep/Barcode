const CACHE_NAME = 'zxing-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/service-worker.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic',
  'https://unpkg.com/normalize.css@8.0.0/normalize.css',
  'https://unpkg.com/milligram@1.3.0/dist/milligram.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
  'https://unpkg.com/@zxing/library@latest/umd/index.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

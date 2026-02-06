const CACHE_NAME = 'songs-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/songs/1 life is a highway boosted.mp3',
  '/songs/2 Heigh-Ho.mp3',
  '/songs/3 AC_DC - Highway to Hell Audio.mp3',
  '/songs/4 Phone - Gibberish - Bonnie.mp3',
  '/songs/5 Willie Nelson - On The Road Again Official Audio.mp3',
  '/songs/6 Danger_ High Voltage 2025 Remaster.mp3',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// Self-unregistering service worker — clears stale registrations
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => {
  self.registration.unregister();
});

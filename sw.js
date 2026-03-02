self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: '🔔 Bell Trigger', body: 'Someone rang your bell!' };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>',
      vibrate: [200, 100, 200, 100, 200],
      tag: 'bell-trigger',
      renotify: true,
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {title:'🔔 Bell',body:'Someone rang!'};
  e.waitUntil(self.registration.showNotification(d.title,{
    body:d.body, vibrate:[200,100,200,100,200], tag:'bell', renotify:true,
    icon:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>',
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});

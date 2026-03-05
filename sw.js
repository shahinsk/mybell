self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

// ── Push notifications (Bell) ──
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {title:'🔔 Bell',body:'Someone rang!'};
  e.waitUntil(self.registration.showNotification(d.title,{
    body:d.body, vibrate:[200,100,200,100,200], tag:'bell', renotify:true,
    icon:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>',
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});

// ── Timer alarm scheduling ──
let alarmTimer = null;

self.addEventListener('message', e => {
  if (!e.data) return;

  if (e.data.type === 'SCHEDULE_ALARM') {
    // Cancel any existing alarm
    if (alarmTimer) { clearTimeout(alarmTimer); alarmTimer = null; }
    const delay = e.data.delayMs || 0;
    alarmTimer = setTimeout(async () => {
      alarmTimer = null;
      // Try to notify the open client first
      const allClients = await clients.matchAll({type:'window', includeUncontrolled:true});
      let notified = false;
      for (const client of allClients) {
        client.postMessage({type:'ALARM_FIRED'});
        notified = true;
      }
      // Also fire a push notification as backup (works when screen is off)
      await self.registration.showNotification('⏰ Timer Done!', {
        body: 'Your countdown has finished. Tap to open.',
        vibrate: [500,200,500,200,800,200,800],
        tag: 'timer-alarm',
        renotify: true,
        requireInteraction: true,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⏰</text></svg>',
      });
    }, delay);
  }

  if (e.data.type === 'CANCEL_ALARM') {
    if (alarmTimer) { clearTimeout(alarmTimer); alarmTimer = null; }
  }
});

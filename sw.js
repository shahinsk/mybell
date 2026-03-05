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

// ── State ──
let alarmTimer = null;
const prayerTimers = {};

self.addEventListener('message', e => {
  if (!e.data) return;

  // Timer alarm
  if (e.data.type === 'SCHEDULE_ALARM') {
    if (alarmTimer) { clearTimeout(alarmTimer); alarmTimer = null; }
    const delay = e.data.delayMs || 0;
    alarmTimer = setTimeout(async () => {
      alarmTimer = null;
      const all = await clients.matchAll({type:'window', includeUncontrolled:true});
      all.forEach(c => c.postMessage({type:'ALARM_FIRED'}));
      await self.registration.showNotification('⏰ Timer Done!', {
        body: 'Your countdown has finished. Tap to open.',
        vibrate: [500,200,500,200,800,200,800],
        tag: 'timer-alarm', renotify: true, requireInteraction: true,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⏰</text></svg>',
      });
    }, delay);
  }

  if (e.data.type === 'CANCEL_ALARM') {
    if (alarmTimer) { clearTimeout(alarmTimer); alarmTimer = null; }
  }

  // Bell ring screen-off notification
  if (e.data.type === 'BELL_RING') {
    const from = e.data.from || 'Someone';
    self.registration.showNotification('🔔 Bell!', {
      body: from + ' rang your bell!',
      vibrate: [200, 80, 200, 80, 400],
      tag: 'bell-ring', renotify: true, requireInteraction: true,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>',
    });
  }

  // Prayer reminders
  if (e.data.type === 'SCHEDULE_PRAYER') {
    const key = 'p_' + e.data.id;
    if (prayerTimers[key]) clearTimeout(prayerTimers[key]);
    const { name, mins, delayMs } = e.data;
    prayerTimers[key] = setTimeout(async () => {
      delete prayerTimers[key];
      const all = await clients.matchAll({type:'window', includeUncontrolled:true});
      all.forEach(c => c.postMessage({type:'PRAYER_FIRED', name, mins}));
      await self.registration.showNotification('🕌 ' + name + ' Prayer', {
        body: 'Prayer time in ' + mins + ' minutes.',
        vibrate: [100,60,100,60,200,60,300],
        tag: 'prayer-' + e.data.id, renotify: true, requireInteraction: true,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🕌</text></svg>',
      });
    }, delayMs);
  }

  if (e.data.type === 'CANCEL_PRAYER') {
    const key = 'p_' + e.data.id;
    if (prayerTimers[key]) { clearTimeout(prayerTimers[key]); delete prayerTimers[key]; }
  }
});

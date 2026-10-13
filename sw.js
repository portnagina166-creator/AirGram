// AirGram: сервис-воркер для системных уведомлений.
// Лежит рядом с index.html. Показывает уведомления и открывает нужный чат по нажатию.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("notificationclick", e => {
  e.notification.close();
  const chat = e.notification.data && e.notification.data.chat;
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if ("focus" in c) {
          c.postMessage({ type: "open-chat", chat });
          return c.focus();
        }
      }
      return self.clients.openWindow("./");
    })
  );
});

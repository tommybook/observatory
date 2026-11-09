// Сервис-воркер «Обсерватории»: только утренний пуш. Ничего не кэширует.
// Сервер шлёт пустой пуш, когда пластинки готовы; текст уведомления — здесь.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  e.waitUntil(self.registration.showNotification("Your plates are ready", {
    body: "Last night's photos are developed. Blink them and see what moved.",
    icon: "icon-192.png",
    badge: "favicon-32.png",
    tag: "plates",
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of list) if ("focus" in c) return c.focus();
    return self.clients.openWindow("./");
  })());
});

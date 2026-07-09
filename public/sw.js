// Service worker mínimo: habilita a instalação como app (PWA/TWA) e um cache
// básico do "casco" do site. O conteúdo dinâmico (Base44) continua vindo da
// rede. Navegações usam network-first, então o site sempre atualiza online.
const CACHE = "res-v1";
const SHELL = ["/", "/index.html", "/logo.svg", "/manifest.json"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Só interfere no próprio domínio. Base44, YouTube, etc. passam direto.
  if (url.origin !== self.location.origin) return;

  // Navegações (SPA): tenta a rede; se estiver offline, cai no index em cache.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match("/index.html")));
    return;
  }

  // Assets do próprio domínio (têm hash no nome): cache-first.
  e.respondWith(
    caches.match(req).then((hit) =>
      hit ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit)
    )
  );
});

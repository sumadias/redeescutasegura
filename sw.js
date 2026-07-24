// Service worker: habilita a instalação como app (PWA/TWA) e guarda o "casco"
// do site para funcionar offline. O conteúdo dinâmico (Base44) vem sempre da rede.
//
// A VERSÃO é substituída a cada build pelo workflow de deploy. Isso é o que faz
// o worker se atualizar: antes o nome do cache era fixo ("res-v1") e este arquivo
// nunca mudava um byte, então o navegador nunca reinstalava o worker, o `activate`
// nunca limpava nada, e quem já tinha visitado o site continuava rodando a versão
// antiga do app depois de cada publicação.
const VERSAO = "ff9aa81f06da";
const CACHE = `res-${VERSAO}`;

self.addEventListener("install", (e) => {
  self.skipWaiting();
  // O index.html não é pré-cacheado: ele é guardado a cada navegação bem
  // sucedida (abaixo), então a cópia offline acompanha o último build visto.
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(["/logo.svg", "/manifest.json"])).catch(() => {})
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(chaves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Só interfere no próprio domínio. Base44 e terceiros passam direto.
  if (url.origin !== self.location.origin) return;

  // O próprio worker e o manifest sempre da rede — senão voltamos ao problema
  // de congelar a atualização.
  if (url.pathname === "/sw.js" || url.pathname === "/manifest.json") return;

  // Navegações (SPA): rede primeiro; guarda a cópia e, se estiver offline,
  // devolve a última que funcionou.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put("/index.html", copia)).catch(() => {});
          return res;
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  // Arquivos de /assets/ têm hash no nome: cache-first é seguro.
  if (url.pathname.startsWith("/assets/")) {
    e.respondWith(
      caches.match(req).then((achado) =>
        achado ||
        fetch(req).then((res) => {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copia)).catch(() => {});
          return res;
        })
      )
    );
    return;
  }

  // Demais arquivos do domínio (sem hash): rede primeiro, cache como reserva.
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copia = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copia)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req))
  );
});

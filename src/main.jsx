import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

/* Service worker — necessário para instalar como app (PWA/TWA).
 *
 * `updateViaCache: 'none'` é o ponto central: sem isso o navegador busca o
 * /sw.js pelo cache HTTP, e o .htaccess chegou a marcar todo .js como
 * "immutable" por um ano. O worker antigo ficava congelado, continuava
 * servindo a versão velha do app, e a pessoa via telas que já não existiam
 * mais no código — foi o que aconteceu na volta do logout.
 *
 * Ao assumir um worker novo, recarregamos uma vez para a aba passar a rodar a
 * versão nova em vez de continuar na antiga.
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then((reg) => reg.update().catch(() => {}))
      .catch(() => {})

    let recarregando = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (recarregando) return
      recarregando = true
      window.location.reload()
    })
  })

  /* Limpeza do cache da versão antiga ("res-v1", nome fixo que nunca era
     invalidado). Some assim que o worker novo assumir, mas apagamos aqui
     também para quem ainda estiver com o worker antigo instalado. */
  if (window.caches) {
    caches.keys()
      .then((chaves) => Promise.all(chaves.filter((k) => k === 'res-v1').map((k) => caches.delete(k))))
      .catch(() => {})
  }
}

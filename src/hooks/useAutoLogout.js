import { useEffect, useRef } from "react";

const SENSITIVE_KEYS = [
  "esc_anon_id",
  "diary_master_key",
  "chat_session_key",
  "chat_draft",
  "diary_draft",
  "rede_escuta_temp",
];

/* Quanto tempo a aba pode ficar oculta antes de trancar ao voltar.
 *
 * Não é "imediato" de propósito. Trancar no instante em que a aba se oculta
 * derrubaria a sessão de quem troca de aba por três segundos para consultar um
 * telefone — e, num app onde se escreve carta e diário, isso significa perder
 * um texto difícil de escrever no meio. Meio minuto passa numa consulta rápida
 * e não passa num aparelho que foi largado. */
const MS_OCULTO = 30 * 1000;

/**
 * Auto-logout por inatividade. Limpa sessionStorage e chaves sensíveis do localStorage.
 *
 * A contagem é por CARIMBO DE TEMPO, não por setTimeout puro: navegadores de
 * celular suspendem timers em segundo plano, então um setTimeout sozinho pode
 * simplesmente não disparar enquanto o aparelho está bloqueado. Só se descobre
 * isso quando alguém volta e encontra a sessão aberta — que é justamente o que
 * a tranca deveria impedir.
 *
 * @param {object} options
 * @param {number} options.timeoutMs - Tempo de inatividade em ms (padrão: 5 min)
 * @param {() => void} options.onLogout - Callback chamado ao fazer logout
 */
export function useAutoLogout({ timeoutMs = 5 * 60 * 1000, onLogout } = {}) {
  const timerRef = useRef(null);
  const ultimaAtividadeRef = useRef(Date.now());
  const ocultaDesdeRef = useRef(null);

  /* onLogout entrava direto no array de dependências do efeito. Como quem chama
     passa uma arrow function nova a cada render — e o value do AuthContext não é
     memoizado, então todo consumidor re-renderiza junto —, o efeito desmontava e
     remontava, e cada remontagem REINICIAVA a contagem. Bastava a árvore
     re-renderizar de tempos em tempos para a sessão nunca trancar. Guardar o
     callback num ref desliga o efeito dessa instabilidade. */
  const onLogoutRef = useRef(onLogout);
  useEffect(() => {
    onLogoutRef.current = onLogout;
  }, [onLogout]);

  useEffect(() => {
    function limparDadosSensiveis() {
      try {
        sessionStorage.clear();
        SENSITIVE_KEYS.forEach((k) => localStorage.removeItem(k));
      } catch {}
    }

    function trancar() {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
      limparDadosSensiveis();
      onLogoutRef.current?.();
    }

    /* Confere o tempo decorrido de verdade, em vez de confiar que o timer
       disparou na hora. Se o relógio do app ficou suspenso, isto pega. */
    function verificarOuAgendar() {
      const parada = Date.now() - ultimaAtividadeRef.current;
      if (parada >= timeoutMs) {
        trancar();
        return;
      }
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(verificarOuAgendar, timeoutMs - parada);
    }

    /* Só carimba o horário. Não reagenda o timer: mousemove dispara dezenas de
       vezes por segundo, e destruir/recriar o timeout a cada disparo era puro
       desperdício. Como o timer confere o tempo decorrido ao acordar, ele se
       reagenda sozinho pelo tempo que faltar. */
    function registrarAtividade() {
      ultimaAtividadeRef.current = Date.now();
      if (timerRef.current === null) verificarOuAgendar();
    }

    function aoMudarVisibilidade() {
      if (document.visibilityState === "hidden") {
        /* Aba oculta ou aparelho bloqueado. Guarda o instante: o timer pode ser
           congelado a partir daqui e não dá para contar com ele. */
        ocultaDesdeRef.current = Date.now();
        return;
      }

      const oculta = ocultaDesdeRef.current;
      ocultaDesdeRef.current = null;

      /* De volta à tela. Este é o momento em que o conteúdo voltaria a ficar
         visível para quem estiver segurando o aparelho — então é aqui que a
         decisão de trancar tem de ser tomada, e não depois. */
      if (oculta !== null && Date.now() - oculta >= MS_OCULTO) {
        trancar();
        return;
      }
      verificarOuAgendar();
    }

    const eventos = ["mousemove", "keydown", "click", "touchstart", "scroll"];
    eventos.forEach((e) =>
      window.addEventListener(e, registrarAtividade, { passive: true })
    );
    document.addEventListener("visibilitychange", aoMudarVisibilidade);

    ultimaAtividadeRef.current = Date.now();
    verificarOuAgendar();

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      eventos.forEach((e) => window.removeEventListener(e, registrarAtividade));
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
    };
  }, [timeoutMs]);
}

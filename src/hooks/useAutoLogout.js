import { useEffect, useRef } from "react";

const SENSITIVE_KEYS = [
  "esc_anon_id",
  "diary_master_key",
  "chat_session_key",
  "chat_draft",
  "diary_draft",
  "rede_escuta_temp",
];

/**
 * Auto-logout por inatividade. Limpa sessionStorage e chaves sensíveis do localStorage.
 * @param {object} options
 * @param {number} options.timeoutMs - Tempo de inatividade em ms (padrão: 5 min)
 * @param {() => void} options.onLogout - Callback chamado ao fazer logout
 */
export function useAutoLogout({ timeoutMs = 5 * 60 * 1000, onLogout } = {}) {
  const timerRef = useRef(null);

  useEffect(() => {
    function clearSensitiveData() {
      try {
        sessionStorage.clear();
        SENSITIVE_KEYS.forEach((k) => localStorage.removeItem(k));
      } catch {}
    }

    function handleLogout() {
      clearSensitiveData();
      onLogout?.();
    }

    function resetTimer() {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(handleLogout, timeoutMs);
    }

    const events = ["mousemove", "keydown", "click", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [timeoutMs, onLogout]);
}
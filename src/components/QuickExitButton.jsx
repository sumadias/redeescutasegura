import { useEffect } from "react";
import { X } from "lucide-react";

const DEFAULT_EXIT_URL = "https://www.google.com/search?q=previsao+do+tempo+hoje";

export function getQuickExitUrl() {
  try {
    return localStorage.getItem("quick_exit_url") || DEFAULT_EXIT_URL;
  } catch {
    return DEFAULT_EXIT_URL;
  }
}

function activateExit() {
  // Limpar dados sensíveis antes de sair (quick_exit_url é mantido intencionalmente)
  try {
    localStorage.removeItem("esc_anon_id");
    localStorage.removeItem("diary_master_key");
    localStorage.removeItem("chat_session_key");
    sessionStorage.clear();
  } catch {}

  // Substituir histórico para não voltar com "voltar"
  try {
    window.history.replaceState(null, "", "/");
  } catch {}

  window.location.replace(getQuickExitUrl());
}

export default function QuickExitButton() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") activateExit();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <button
      type="button"
      onClick={activateExit}
      className="fixed top-3 right-3 z-50 flex items-center gap-1.5 px-4 h-9 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-lg hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-teal-400 transition-all duration-200"
      aria-label="Sair rapidamente da plataforma. Pressione ESC a qualquer momento."
    >
      <X className="w-3.5 h-3.5" aria-hidden="true" />
      <span>Sair rapidamente</span>
    </button>
  );
}
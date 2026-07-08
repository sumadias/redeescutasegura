/**
 * useDiscreteMode — troca o título da aba e o favicon por valores neutros
 * quando o modo discreto está ativo, para proteger a privacidade da pessoa
 * em caso de exposição da tela.
 *
 * Uso:
 *   import useDiscreteMode from "@/hooks/useDiscreteMode";
 *   useDiscreteMode(user?.safe_mode_enabled);
 */

import { useEffect } from "react";

const DISCRETE_TITLE = "Calculadora";
const ORIGINAL_TITLE = "Rede Escuta Segura";

// Favicon neutro (calculadora em base64 — ícone genérico SVG)
const DISCRETE_FAVICON = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧮</text></svg>`;
const ORIGINAL_FAVICON = "/logo.svg";

function setFavicon(href) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function useDiscreteMode(enabled) {
  useEffect(() => {
    if (enabled) {
      document.title = DISCRETE_TITLE;
      setFavicon(DISCRETE_FAVICON);
    } else {
      document.title = ORIGINAL_TITLE;
      setFavicon(ORIGINAL_FAVICON);
    }

    return () => {
      // Restaura ao desmontar para não deixar título discreto em outras abas
      document.title = ORIGINAL_TITLE;
      setFavicon(ORIGINAL_FAVICON);
    };
  }, [enabled]);
}
import { useState, useEffect, useCallback } from "react";

/* Preferências de acessibilidade.
 *
 * Guardadas no localStorage porque precisam valer em todas as páginas e a cada
 * visita — e não são dado sensível: "fonte maior" não revela o propósito do
 * site nem coloca ninguém em risco num aparelho compartilhado. É diferente de
 * relato, localização ou histórico, que o app deliberadamente NÃO guarda.
 */
const CHAVE = "res_acessibilidade";

const PADRAO = { fonte: 0, espacado: false, semMovimento: false, sublinhar: false };

function ler() {
  try {
    return { ...PADRAO, ...JSON.parse(localStorage.getItem(CHAVE) || "{}") };
  } catch {
    return { ...PADRAO };
  }
}

export function useAcessibilidade() {
  const [prefs, setPrefs] = useState(ler);

  /* aplica no <html> e persiste sempre que mudar */
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("a11y-fonte-1", "a11y-fonte-2", "a11y-fonte-3");
    if (prefs.fonte > 0) html.classList.add(`a11y-fonte-${prefs.fonte}`);
    html.classList.toggle("a11y-espacado", prefs.espacado);
    html.classList.toggle("a11y-sem-movimento", prefs.semMovimento);
    html.classList.toggle("a11y-sublinhar", prefs.sublinhar);
    try {
      localStorage.setItem(CHAVE, JSON.stringify(prefs));
    } catch {
      /* storage bloqueado: a preferência ainda vale nesta sessão */
    }
  }, [prefs]);

  const mudarFonte = useCallback((delta) => {
    setPrefs((p) => ({ ...p, fonte: Math.max(0, Math.min(3, p.fonte + delta)) }));
  }, []);

  const alternar = useCallback((chave) => {
    setPrefs((p) => ({ ...p, [chave]: !p[chave] }));
  }, []);

  const redefinir = useCallback(() => setPrefs({ ...PADRAO }), []);

  return { prefs, mudarFonte, alternar, redefinir };
}

import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/* Controla a rolagem ao trocar de rota.
 *
 * O React Router não mexe na rolagem sozinho: ao navegar, a posição da página
 * anterior é mantida. Com a Home ficando longa (quase 2800px), quem clicava num
 * link do meio da página caía no MEIO da página de destino — e, se o destino
 * fosse mais curto, caía depois do conteúdo e via uma tela em branco. Parecia
 * que o site tinha perdido tudo.
 *
 * Regra: navegação nova (PUSH) sempre começa no topo; voltar/avançar (POP)
 * devolve a pessoa exatamente onde ela estava. Também desligamos a restauração
 * automática do Chrome, que num SPA restaura antes do conteúdo existir e
 * costuma parar em lugar nenhum.
 */
export default function RolagemDeRota() {
  const { pathname, key } = useLocation();
  const tipo = useNavigationType();
  const posicoes = useRef(new Map());

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  /* guarda onde a pessoa estava; a limpeza roda ao sair desta entrada */
  useEffect(() => {
    const guardar = () => posicoes.current.set(key, window.scrollY);
    window.addEventListener("pagehide", guardar);
    return () => {
      guardar();
      window.removeEventListener("pagehide", guardar);
    };
  }, [key]);

  useEffect(() => {
    if (tipo === "POP") {
      const y = posicoes.current.get(key);
      window.scrollTo(0, typeof y === "number" ? y : 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, key, tipo]);

  return null;
}

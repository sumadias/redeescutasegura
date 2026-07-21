import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LogoRES from "./LogoRES";
import { T, NAV } from "./tokens";

/* Cabeçalho do site institucional.
   O botão fixo "Sair rapidamente" (top-3 right-3, ~151px, z-50) não participa
   do layout, então é aqui que o espaço precisa ser reservado — senão ele cobre
   o CTA. No desktop reservamos a faixa; no celular o menu vira gaveta e o
   gatilho fica embaixo dele. */
export default function SiteHeader() {
  const [aberto, setAberto] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setAberto(false), [pathname]);

  useEffect(() => {
    const fechar = (e) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, []);

  const linkBase = "text-sm font-medium transition-colors whitespace-nowrap";

  return (
    <header
      className="bg-white border-b sticky top-0 z-30"
      style={{ borderColor: T.borda }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:pr-[168px]">
        <div className="h-[68px] flex items-center gap-6">
          <Link to="/" aria-label="Rede Escuta Segura — início" className="flex-shrink-0">
            <LogoRES tamanho={38} id="hdr" />
          </Link>

          <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-7 ml-4">
            {NAV.map((i) => (
              <NavLink
                key={i.href}
                to={i.href}
                className={linkBase}
                style={({ isActive }) => ({
                  color: isActive ? T.rosa : T.texto,
                  borderBottom: isActive ? `2px solid ${T.rosa}` : "2px solid transparent",
                  paddingBottom: 3,
                })}
              >
                {i.rotulo}
              </NavLink>
            ))}
          </nav>

          <a
            href="tel:180"
            className="hidden lg:inline-flex ml-auto h-10 px-5 rounded-lg text-sm font-semibold text-white items-center gap-2 flex-shrink-0"
            style={{ background: T.roxo }}
            aria-label="Ligar para o 180 — Central de Atendimento à Mulher"
          >
            Preciso de ajuda agora
          </a>

          {/* mobile: só o gatilho da gaveta; fica à esquerda da faixa do
              "Sair rapidamente" para os dois não se encostarem */}
          <button
            onClick={() => setAberto((v) => !v)}
            className="lg:hidden ml-auto mr-[152px] w-10 h-10 rounded-lg inline-flex items-center justify-center"
            style={{ color: T.roxo, background: T.roxoSuave }}
            aria-expanded={aberto}
            aria-controls="menu-site"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          >
            {aberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* gaveta mobile */}
      {aberto && (
        <div id="menu-site" className="lg:hidden border-t" style={{ borderColor: T.borda }}>
          <nav aria-label="Navegação principal" className="px-4 py-3 flex flex-col">
            {NAV.map((i) => (
              <NavLink
                key={i.href}
                to={i.href}
                className="py-3 text-sm font-medium border-b last:border-b-0"
                style={({ isActive }) => ({
                  color: isActive ? T.rosa : T.texto,
                  borderColor: T.borda,
                })}
              >
                {i.rotulo}
              </NavLink>
            ))}
            <a
              href="tel:180"
              className="mt-3 h-11 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center"
              style={{ background: T.roxo }}
            >
              Preciso de ajuda agora
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

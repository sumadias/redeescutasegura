import { Outlet } from "react-router-dom";
import QuickExitButton from "@/components/QuickExitButton";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { T } from "./tokens";

/* Casca do site institucional: cabeçalho, rodapé e o botão de saída rápida.
   A /emergencia NÃO usa este layout — ela tem cabeçalho próprio e ficou
   intocada, conforme combinado. */
/* A rolagem ao trocar de rota é tratada globalmente em <RolagemDeRota />,
   dentro do Router — aqui ela cobriria só as páginas institucionais, e o
   problema aparecia justamente ao ir para /emergencia e /assistente. */
export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: T.pagina }}>
      <QuickExitButton />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold focus:shadow-lg"
      >
        Ir para o conteúdo principal
      </a>
      <SiteHeader />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

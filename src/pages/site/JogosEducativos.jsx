import { Link } from "react-router-dom";
import { Gamepad2, ArrowRight, BookOpen } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";

/* A seção existe, os jogos ainda não estão publicados aqui. Não inventamos
   jogos de exemplo pelo mesmo motivo das notícias: num site no ar, exemplo é
   lido como coisa real. Quando houver jogo, ele entra nesta página. */
export default function JogosEducativos() {
  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
            Jogos Educativos
          </h1>
          <p className="text-sm md:text-lg mt-4 leading-relaxed max-w-2xl" style={{ color: "#E4DBFB" }}>
            Aprender sobre direitos, reconhecer sinais de violência e conversar sobre o assunto
            de um jeito leve — especialmente com adolescentes e nas escolas.
          </p>
        </div>
      </div>

      <Secao className="py-10 md:py-14">
        <Cartao className="p-10 md:p-14 text-center">
          <span className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5"
            style={{ background: T.roxoSuave }}>
            <Gamepad2 className="w-7 h-7" style={{ color: T.roxo }} aria-hidden="true" />
          </span>
          <p className="font-bold text-lg" style={{ color: T.tinta }}>
            Em preparação
          </p>
          <p className="text-sm mt-2.5 leading-relaxed max-w-md mx-auto" style={{ color: T.texto }}>
            Esta área está reservada para os jogos educativos da Rede. Enquanto eles não entram,
            o conteúdo informativo e o assistente já estão no ar e são abertos, sem cadastro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
            <Link to="/app/direitos"
              className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
              style={{ background: T.roxo }}>
              <BookOpen className="w-4 h-4" aria-hidden="true" /> Conhecer meus direitos
            </Link>
            <Link to="/assistente"
              className="h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 border"
              style={{ borderColor: T.borda, color: T.texto }}>
              Falar com o assistente <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Cartao>
      </Secao>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

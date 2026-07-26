import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Phone } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";
import { AJUDANDO } from "@/data/orientacao";

/* #8 "Estou ajudando alguém" — guia para quem apoia (família, amiga, vizinho,
   escola, trabalho). Nunca incentiva confronto com o agressor. */
export default function EstouAjudando() {
  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
          <Link to="/orientacao" className="text-sm font-medium inline-flex items-center gap-1.5"
            style={{ color: "#E4DBFB" }}>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Orientação
          </Link>
          <h1 className="text-3xl md:text-[38px] font-extrabold text-white tracking-tight leading-tight mt-3">
            Estou ajudando alguém
          </h1>
          <p className="text-sm md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            Você percebeu que alguém pode estar vivendo violência e quer ajudar. Apoiar com
            cuidado faz diferença — e você não precisa resolver tudo sozinho.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        <div className="space-y-3">
          {AJUDANDO.map((s, i) => (
            <Cartao key={i} className="p-5 md:p-6">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: T.rosaSuave, color: T.rosaTinta }} aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-base" style={{ color: T.tinta }}>{s.titulo}</p>
                  <p className="text-sm mt-1.5 leading-relaxed" style={{ color: T.texto }}>{s.texto}</p>
                </div>
              </div>
            </Cartao>
          ))}
        </div>

        <Cartao className="mt-6 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <Heart className="w-8 h-8 flex-shrink-0" style={{ color: T.roxo }} aria-hidden="true" />
          <p className="text-sm flex-1" style={{ color: T.texto }}>
            O <strong style={{ color: T.tinta }}>Ligue 180</strong> também orienta quem está
            ajudando. Em perigo imediato, <strong style={{ color: T.tinta }}>190</strong>.
          </p>
          <a href="tel:180"
            className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
            style={{ background: T.roxo }}>
            <Phone className="w-4 h-4" aria-hidden="true" /> Ligar 180
          </a>
        </Cartao>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, FolderOpen } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, TituloSecao, Cartao, FaixaAjuda } from "@/components/site/ui";
import { PROJETOS, SITUACOES } from "@/data/projetos";

const CORES = {
  rosa: { fg: T.rosa, bg: T.rosaSuave },
  roxo: { fg: T.roxo, bg: T.roxoSuave },
  verde: { fg: T.verde, bg: T.verdeSuave },
  ambar: { fg: T.ambar, bg: T.ambarSuave },
};

export default function NossosProjetos() {
  const [aba, setAba] = useState("andamento");

  /* só mostramos aba que tem projeto — aba vazia é promessa que não se cumpre */
  const abas = useMemo(
    () => SITUACOES.filter((s) => PROJETOS.some((p) => p.situacao === s.id)),
    []
  );
  const lista = useMemo(() => PROJETOS.filter((p) => p.situacao === aba), [aba]);

  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
            Nossos Projetos
          </h1>
          <p className="text-sm md:text-lg mt-4 leading-relaxed max-w-2xl" style={{ color: "#E4DBFB" }}>
            Desenvolvemos iniciativas que promovem informação, acolhimento, prevenção e autonomia
            para mulheres em todo o estado da Paraíba.
          </p>
        </div>
      </div>

      <Secao className="py-10 md:py-14">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="tablist" aria-label="Situação dos projetos">
          {abas.map((s) => {
            const ativo = aba === s.id;
            return (
              <button key={s.id} onClick={() => setAba(s.id)}
                role="tab" aria-selected={ativo}
                className="flex-shrink-0 h-10 px-5 rounded-lg text-sm font-medium border transition-colors"
                style={{
                  background: ativo ? T.roxoSuave : T.cartao,
                  color: ativo ? T.roxoTinta : T.texto,
                  borderColor: ativo ? T.roxo + "55" : T.borda,
                }}>
                {s.rotulo}
              </button>
            );
          })}
        </div>

        {lista.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {lista.map((p) => {
              const c = CORES[p.cor] || CORES.roxo;
              return (
                <Cartao key={p.id} className="p-6 flex gap-4">
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: c.bg }}>
                    <Sparkles className="w-5 h-5" style={{ color: c.fg }} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-base leading-snug" style={{ color: T.tinta }}>
                      {p.titulo}
                    </p>
                    <p className="text-sm mt-1.5 leading-relaxed" style={{ color: T.texto }}>
                      {p.resumo}
                    </p>
                    <span className="inline-block text-xs px-2.5 py-1 rounded-md font-medium mt-3"
                      style={{ background: c.bg, color: c.fg }}>
                      {p.etiqueta}
                    </span>
                    {p.link && (
                      <Link to={p.link}
                        className="text-sm font-semibold mt-3 ml-3 inline-flex items-center gap-1.5"
                        style={{ color: T.roxo }}>
                        {p.linkRotulo || "Saiba mais"}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </Cartao>
              );
            })}
          </div>
        ) : (
          <Cartao className="p-10 text-center">
            <FolderOpen className="w-9 h-9 mx-auto mb-3" style={{ color: "#D3CCEC" }} aria-hidden="true" />
            <p className="font-semibold text-sm" style={{ color: T.tinta }}>
              Nenhum projeto nesta categoria por enquanto.
            </p>
          </Cartao>
        )}
      </Secao>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

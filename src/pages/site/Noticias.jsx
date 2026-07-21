import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Newspaper, ArrowRight, ExternalLink } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";
import { NOTICIAS } from "@/data/noticias";

function formatarData(iso) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function Noticias() {
  const [cat, setCat] = useState("Todas");

  const ordenadas = useMemo(
    () => [...NOTICIAS].sort((a, b) => String(b.data).localeCompare(String(a.data))),
    []
  );
  /* filtros montados a partir do que existe, não de uma lista fixa */
  const categorias = useMemo(() => {
    const c = [];
    ordenadas.forEach((n) => n.categoria && !c.includes(n.categoria) && c.push(n.categoria));
    return ["Todas", ...c];
  }, [ordenadas]);
  const lista = useMemo(
    () => (cat === "Todas" ? ordenadas : ordenadas.filter((n) => n.categoria === cat)),
    [cat, ordenadas]
  );

  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
            Notícias
          </h1>
          <p className="text-sm md:text-lg mt-4 leading-relaxed max-w-2xl" style={{ color: "#E4DBFB" }}>
            Fique por dentro das ações, campanhas e informações importantes sobre a rede de
            proteção na Paraíba.
          </p>
        </div>
      </div>

      <Secao className="py-10 md:py-14">
        {ordenadas.length === 0 ? (
          <Cartao className="p-10 md:p-14 text-center">
            <span className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5"
              style={{ background: T.roxoSuave }}>
              <Newspaper className="w-7 h-7" style={{ color: T.roxo }} aria-hidden="true" />
            </span>
            <p className="font-bold text-lg" style={{ color: T.tinta }}>
              Ainda não há notícias publicadas
            </p>
            <p className="text-sm mt-2.5 leading-relaxed max-w-md mx-auto" style={{ color: T.texto }}>
              Esta área está pronta e será atualizada com campanhas, eventos e informes da rede.
              Enquanto isso, o diretório de serviços e o assistente já estão no ar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
              <Link to="/emergencia"
                className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
                style={{ background: T.roxo }}>
                Ver a rede de atendimento <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to="/projetos"
                className="h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center justify-center border"
                style={{ borderColor: T.borda, color: T.texto }}>
                Conhecer os projetos
              </Link>
            </div>
          </Cartao>
        ) : (
          <>
            {categorias.length > 2 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {categorias.map((c) => {
                  const ativo = cat === c;
                  return (
                    <button key={c} onClick={() => setCat(c)}
                      className="flex-shrink-0 h-10 px-5 rounded-lg text-sm font-medium border transition-colors"
                      style={{
                        background: ativo ? T.roxoSuave : T.cartao,
                        color: ativo ? T.roxoTinta : T.texto,
                        borderColor: ativo ? T.roxo + "55" : T.borda,
                      }}>
                      {c}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {lista.map((n) => (
                <Cartao key={n.id} className="p-6">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {n.categoria && (
                      <span className="text-xs px-2.5 py-1 rounded-md font-medium"
                        style={{ background: T.roxoSuave, color: T.roxo }}>{n.categoria}</span>
                    )}
                    <span className="text-xs" style={{ color: T.apagado }}>{formatarData(n.data)}</span>
                  </div>
                  <p className="font-bold text-base leading-snug mt-3" style={{ color: T.tinta }}>
                    {n.titulo}
                  </p>
                  {n.resumo && (
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: T.texto }}>{n.resumo}</p>
                  )}
                  {n.link && (
                    <a href={n.link} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-semibold mt-4 inline-flex items-center gap-1.5"
                      style={{ color: T.roxo }}>
                      Leia mais <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </Cartao>
              ))}
            </div>
          </>
        )}
      </Secao>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Lightbulb, ArrowRight, Phone, Check } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";
import { CENARIOS } from "@/data/simulador";

/* #7 Simulador — praticar decisões em situações fictícias. Sem pontuação, sem
   "resposta errada": toda escolha traz um retorno e, quando há um caminho mais
   seguro, ele é destacado. Sempre dá para tentar de novo ou sair. */
export default function Simulador() {
  const [i, setI] = useState(0);
  const [escolha, setEscolha] = useState(null);

  const c = CENARIOS[i];
  const respondido = escolha !== null;
  const opcaoSegura = c.opcoes.find((o) => o.seguro);

  function proximo() {
    setEscolha(null);
    setI((v) => (v + 1) % CENARIOS.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
          <Link to="/jogos" className="text-sm font-medium inline-flex items-center gap-1.5"
            style={{ color: "#E4DBFB" }}>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Jogos Educativos
          </Link>
          <h1 className="text-3xl md:text-[38px] font-extrabold text-white tracking-tight leading-tight mt-3">
            Simulador de situações
          </h1>
          <p className="text-sm md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            Situações fictícias para pensar com calma, sem pressa e sem julgamento. Aqui não
            existe resposta errada — só caminhos mais ou menos seguros.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        <Cartao className="p-6 md:p-8">
          <p className="text-xs font-bold tracking-wide uppercase" style={{ color: T.roxo }}>
            {c.tema} · {i + 1} de {CENARIOS.length}
          </p>
          <blockquote className="mt-3 rounded-xl border-l-4 px-5 py-4 text-sm md:text-base leading-relaxed"
            style={{ background: T.pagina, borderColor: T.rosa, color: T.tinta }}>
            {c.situacao}
          </blockquote>
          <p className="font-bold text-base mt-5" style={{ color: T.tinta }}>{c.pergunta}</p>

          <div className="space-y-2.5 mt-4" role="group" aria-label={c.pergunta}>
            {c.opcoes.map((o, k) => {
              const escolhida = escolha === k;
              const destaqueSeguro = respondido && o.seguro;
              let borda = T.borda, fundo = T.cartao;
              if (destaqueSeguro) { borda = "#86EFAC"; fundo = "#F0FDF4"; }
              else if (escolhida) { borda = T.roxo; fundo = T.roxoSuave; }
              return (
                <button key={k} onClick={() => !respondido && setEscolha(k)} disabled={respondido}
                  className="w-full text-left rounded-xl border px-4 py-3.5 text-sm transition-colors flex items-start gap-3 disabled:cursor-default enabled:hover:border-violet-300"
                  style={{ background: fundo, borderColor: borda, color: T.tinta }}
                  aria-pressed={escolhida}>
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ borderColor: borda }} aria-hidden="true">
                    {destaqueSeguro && <Check className="w-3.5 h-3.5" style={{ color: "#16A34A" }} />}
                  </span>
                  <span className="leading-relaxed">{o.texto}</span>
                </button>
              );
            })}
          </div>

          {respondido && (
            <div className="mt-5 rounded-xl px-5 py-4" role="status" aria-live="polite"
              style={{ background: "#FFF7ED", border: "1px solid #FDBA74" }}>
              <p className="font-bold text-sm flex items-center gap-2" style={{ color: "#9A3412" }}>
                <Lightbulb className="w-4 h-4" aria-hidden="true" /> Vamos pensar juntas
              </p>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "#7C2D12" }}>
                {c.opcoes[escolha].retorno}
              </p>
              {!c.opcoes[escolha].seguro && opcaoSegura && (
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "#7C2D12" }}>
                  <strong>Caminho mais seguro:</strong> {opcaoSegura.retorno}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-6">
            {respondido && (
              <>
                <button onClick={() => setEscolha(null)}
                  className="h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 border"
                  style={{ borderColor: T.borda, color: T.texto, background: T.cartao }}>
                  <RotateCcw className="w-4 h-4" aria-hidden="true" /> Tentar outra resposta
                </button>
                <button onClick={proximo}
                  className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2"
                  style={{ background: T.roxo }}>
                  Próxima situação <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </>
            )}
            <a href="tel:180"
              className="h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 border"
              style={{ borderColor: T.rosa + "66", color: T.rosa, background: T.cartao }}>
              <Phone className="w-4 h-4" aria-hidden="true" /> Sair e ligar 180
            </a>
          </div>
        </Cartao>

        <p className="text-xs mt-5 leading-relaxed" style={{ color: T.apagado }}>
          Situações fictícias, feitas para aprendizado. Elas não descrevem você nem preveem risco.
          Em perigo imediato, ligue 190.
        </p>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

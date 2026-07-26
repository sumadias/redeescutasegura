import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Lightbulb, ArrowRight, Check, Users } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";
import { CENARIOS_PROF } from "@/data/treinoAcolhimento";

/* #16 Treino de acolhimento (para profissionais). Escolha de resposta com
   retorno por rubrica. Sem pontuação, sem certificação, sem avaliar ninguém. */
export default function TreinoAcolhimento() {
  const [i, setI] = useState(0);
  const [escolha, setEscolha] = useState(null);

  const c = CENARIOS_PROF[i];
  const respondido = escolha !== null;
  const acolhedora = c.opcoes.find((o) => o.seguro);

  function proximo() {
    setEscolha(null);
    setI((v) => (v + 1) % CENARIOS_PROF.length);
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
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide mt-4"
            style={{ color: "#F5B8CE" }}>
            <Users className="w-3.5 h-3.5" aria-hidden="true" /> Para profissionais
          </span>
          <h1 className="text-3xl md:text-[38px] font-extrabold text-white tracking-tight leading-tight mt-1.5">
            Treino de acolhimento
          </h1>
          <p className="text-sm md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            Pratique respostas com uma personagem inteiramente fictícia. Escolha uma resposta e veja
            o retorno com base numa rubrica de acolhimento.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        <Cartao className="p-6 md:p-8">
          <p className="text-xs font-bold tracking-wide uppercase" style={{ color: T.roxo }}>
            Situação {i + 1} de {CENARIOS_PROF.length}
          </p>
          <blockquote className="mt-3 rounded-xl border-l-4 px-5 py-4 text-sm md:text-base leading-relaxed"
            style={{ background: T.pagina, borderColor: T.rosa, color: T.tinta }}>
            {c.persona}
          </blockquote>
          <p className="font-bold text-base mt-5" style={{ color: T.tinta }}>{c.pergunta}</p>

          <div className="space-y-2.5 mt-4" role="group" aria-label={c.pergunta}>
            {c.opcoes.map((o, k) => {
              const escolhida = escolha === k;
              const destaque = respondido && o.seguro;
              let borda = T.borda, fundo = T.cartao;
              if (destaque) { borda = "#86EFAC"; fundo = "#F0FDF4"; }
              else if (escolhida) { borda = T.roxo; fundo = T.roxoSuave; }
              return (
                <button key={k} onClick={() => !respondido && setEscolha(k)} disabled={respondido}
                  className="w-full text-left rounded-xl border px-4 py-3.5 text-sm transition-colors flex items-start gap-3 disabled:cursor-default enabled:hover:border-violet-300"
                  style={{ background: fundo, borderColor: borda, color: T.tinta }}
                  aria-pressed={escolhida}>
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ borderColor: borda }} aria-hidden="true">
                    {destaque && <Check className="w-3.5 h-3.5" style={{ color: "#16A34A" }} />}
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
                <Lightbulb className="w-4 h-4" aria-hidden="true" /> Retorno
              </p>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "#7C2D12" }}>
                {c.opcoes[escolha].retorno}
              </p>
              {!c.opcoes[escolha].seguro && acolhedora && (
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "#7C2D12" }}>
                  <strong>Resposta que acolhe melhor:</strong> {acolhedora.texto}
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
          </div>
        </Cartao>

        <div className="mt-5 rounded-2xl border p-5" style={{ background: T.pagina, borderColor: T.borda }}>
          <p className="text-sm leading-relaxed" style={{ color: T.texto }}>
            <strong style={{ color: T.tinta }}>Sobre este treino:</strong> as situações são fictícias e
            o retorno segue uma rubrica de acolhimento. Ele <strong>não avalia nem certifica</strong> o
            profissional, e a rubrica deve ser validada por especialistas antes de qualquer uso formal.
          </p>
        </div>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

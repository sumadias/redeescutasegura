import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Info } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, FaixaAjuda } from "@/components/site/ui";
import { DOCUMENTOS, NIVEL_ROTULO } from "@/data/orientacao";

/* #11 Lista de documentos por serviço.
   Interativa, mas nada é gravado: os "tenho" ficam só na tela, marcados para
   você se organizar. A falta de um documento nunca é apresentada como
   impedimento — só como algo a confirmar com o órgão. */
export default function ListaDocumentos() {
  const [servicoId, setServicoId] = useState(DOCUMENTOS[0].id);
  const [tenho, setTenho] = useState({});

  const servico = DOCUMENTOS.find((s) => s.id === servicoId) || DOCUMENTOS[0];
  const chave = (i) => `${servicoId}-${i}`;

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
            Lista de documentos
          </h1>
          <p className="text-sm md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            O que costuma ajudar em cada serviço. Marque o que você já tem — nada é gravado, é só
            para você se organizar.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        {/* seletor de serviço */}
        <label htmlFor="servico" className="text-sm font-semibold" style={{ color: T.texto }}>
          Para qual serviço?
        </label>
        <select id="servico" value={servicoId} onChange={(e) => setServicoId(e.target.value)}
          className="mt-1.5 w-full h-12 rounded-xl border px-3 text-sm bg-white focus:outline-none focus:ring-2"
          style={{ borderColor: "#D1D5DB", color: T.tinta }}>
          {DOCUMENTOS.map((s) => <option key={s.id} value={s.id}>{s.servico}</option>)}
        </select>

        <p className="text-sm mt-4" style={{ color: T.texto }}>{servico.intro}</p>

        <div className="space-y-2.5 mt-4">
          {servico.itens.map((item, i) => {
            const marcado = !!tenho[chave(i)];
            const nivel = NIVEL_ROTULO[item.nivel];
            return (
              <button key={i}
                onClick={() => setTenho((t) => ({ ...t, [chave(i)]: !t[chave(i)] }))}
                className="w-full text-left rounded-xl border p-4 flex items-start gap-3 transition-colors"
                style={{ background: marcado ? "#F0FDF4" : T.cartao, borderColor: marcado ? "#86EFAC" : T.borda }}
                aria-pressed={marcado}>
                <span className="w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ borderColor: marcado ? "#16A34A" : "#D1D5DB", background: marcado ? "#16A34A" : "#fff" }}
                  aria-hidden="true">
                  {marcado && <Check className="w-4 h-4 text-white" />}
                </span>
                <span className="flex-1">
                  <span className="text-sm" style={{ color: T.tinta }}>{item.doc}</span>
                  {nivel && (
                    <span className="inline-block ml-2 text-[11px] px-2 py-0.5 rounded-md font-medium align-middle"
                      style={{ background: nivel.fundo, color: nivel.cor }}>{nivel.texto}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FFF7ED", borderColor: "#FDBA74" }} role="note">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.ambar }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7C2D12" }}>
            <strong>Não tem algum documento?</strong> A falta dele não significa, por si só, que você
            não poderá ser atendida. Procure o serviço mesmo assim e confirme a exigência com o
            próprio órgão — as listas podem variar por município.
          </p>
        </div>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

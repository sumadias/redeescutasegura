import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Info } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";
import { ROTA } from "@/data/orientacao";

/* #10 Rota de atendimento — apresentada como caminhos possíveis, não como uma
   sequência obrigatória. Cada porta é uma entrada válida por si só. */
export default function RotaAtendimento() {
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
            Rota de atendimento
          </h1>
          <p className="text-sm md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            Estes são caminhos possíveis — não uma ordem obrigatória. Você pode começar por
            qualquer um, mesmo sem ter todos os documentos ou uma decisão tomada.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        <div className="space-y-3">
          {ROTA.map((etapa) => (
            <Cartao key={etapa.id} className="p-5 md:p-6">
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: T.roxoSuave }}>
                  <MapPin className="w-5 h-5" style={{ color: T.roxo }} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-bold text-base" style={{ color: T.tinta }}>{etapa.titulo}</p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: T.roxo }}>{etapa.onde}</p>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: T.texto }}>{etapa.texto}</p>
                </div>
              </div>
            </Cartao>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FFF7ED", borderColor: "#FDBA74" }} role="note">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.ambar }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7C2D12" }}>
            Boletim de ocorrência é um direito, <strong>não uma exigência</strong> para todo
            atendimento. Não sabe por onde começar? Ligue <strong>180</strong> — a central orienta
            de acordo com a sua situação e a sua cidade. Este conteúdo é educativo e pode variar por
            município.
          </p>
        </div>

        <div className="mt-6">
          <Link to="/emergencia"
            className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2"
            style={{ background: T.roxo }}>
            Ver os serviços da minha cidade
          </Link>
        </div>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

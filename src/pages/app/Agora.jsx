import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, MapPin, DoorOpen, Phone, ArrowLeft } from "lucide-react";
import QuickExitButton, { getQuickExitUrl } from "@/components/QuickExitButton";

/* "Tenho apenas 30 segundos" (#13).
 *
 * Página deliberadamente mínima: três decisões, alvos de toque grandes, alto
 * contraste, sem cabeçalho pesado e sem nada que dependa de rede depois de
 * carregada. Fora do SiteLayout de propósito — leveza é o requisito.
 *
 * A chamada ao 190 NÃO dispara sozinha: só depois de a pessoa confirmar que é
 * seguro ligar neste aparelho, como pede o documento de melhorias.
 */
const C = {
  fundo: "#150E38",
  perigo: "#DC2626",
  servico: "#6D3FD4",
  sair: "#1F2937",
  texto: "#F3F0FA",
};

function Botao({ cor, icone: Icone, titulo, sub, ...rest }) {
  return (
    <button
      className="w-full rounded-2xl px-5 py-6 text-left flex items-center gap-4 focus:outline-none focus:ring-4 focus:ring-white/60 transition-transform active:scale-[0.99]"
      style={{ background: cor, color: "#fff", minHeight: 96 }}
      {...rest}
    >
      <Icone className="w-9 h-9 flex-shrink-0" aria-hidden="true" />
      <span>
        <span className="block text-xl font-extrabold leading-tight">{titulo}</span>
        <span className="block text-sm mt-0.5 opacity-90">{sub}</span>
      </span>
    </button>
  );
}

export default function Agora() {
  const navigate = useNavigate();
  const [confirmarLigacao, setConfirmarLigacao] = useState(false);

  function sairDiscreto() {
    try { sessionStorage.clear(); } catch {}
    window.location.replace(getQuickExitUrl());
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.fundo, color: C.texto }}>
      <QuickExitButton />

      <main className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full px-5 py-10">
        <h1 className="text-2xl font-extrabold text-center mb-1">O que você precisa agora?</h1>
        <p className="text-center text-sm mb-8" style={{ color: "#C9C2E8" }}>
          Toque em uma opção. Nada é registrado.
        </p>

        <div className="space-y-4">
          {/* PERIGO — confirma antes de ligar */}
          {!confirmarLigacao ? (
            <Botao
              cor={C.perigo}
              icone={ShieldAlert}
              titulo="Perigo agora"
              sub="Chamar a polícia (190)"
              onClick={() => setConfirmarLigacao(true)}
              aria-label="Perigo agora — preparar ligação para a polícia 190"
            />
          ) : (
            <div className="rounded-2xl px-5 py-5" style={{ background: C.perigo }}>
              <p className="font-bold text-base">Confirme só se for seguro ligar neste aparelho.</p>
              <p className="text-sm mt-1 opacity-90">
                A ligação para o 190 só começa quando você tocar abaixo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a
                  href="tel:190"
                  className="flex-1 h-14 rounded-xl bg-white inline-flex items-center justify-center gap-2 font-extrabold text-lg"
                  style={{ color: C.perigo }}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" /> Ligar 190
                </a>
                <button
                  onClick={() => setConfirmarLigacao(false)}
                  className="h-14 px-5 rounded-xl border-2 border-white/70 font-semibold text-white"
                >
                  Agora não
                </button>
              </div>
            </div>
          )}

          <Botao
            cor={C.servico}
            icone={MapPin}
            titulo="Encontrar serviço"
            sub="Delegacia, apoio e saúde perto de você"
            onClick={() => navigate("/emergencia")}
            aria-label="Encontrar serviço de apoio perto de você"
          />

          <Botao
            cor={C.sair}
            icone={DoorOpen}
            titulo="Sair discretamente"
            sub="Abre uma página neutra na hora"
            onClick={sairDiscreto}
            aria-label="Sair discretamente para uma página neutra"
          />
        </div>

        <p className="text-center text-xs mt-8" style={{ color: "#9E96C8" }}>
          <strong style={{ color: "#C9C2E8" }}>180</strong> orienta e recebe denúncia ·{" "}
          <strong style={{ color: "#C9C2E8" }}>190</strong> é emergência imediata.
          A tecla Esc também sai daqui.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 mx-auto text-sm inline-flex items-center gap-1.5"
          style={{ color: "#9E96C8" }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Voltar ao site
        </button>
      </main>
    </div>
  );
}

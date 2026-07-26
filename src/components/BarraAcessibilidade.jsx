import { useState, useEffect, useRef } from "react";
import {
  Accessibility, X, Type, AlignJustify, Pause, Volume2, RotateCcw, Check, Underline,
} from "lucide-react";
import { useAcessibilidade } from "@/hooks/useAcessibilidade";
import { useLeituraEmVoz } from "@/hooks/useLeituraEmVoz";

/* Controles de acessibilidade, presentes em todo o site (WCAG 2.2 AA / eMAG).
 *
 * Fica no canto INFERIOR direito, longe do botão "Sair rapidamente" (superior
 * direito), para os dois nunca se encostarem. É o único FAB permanente além
 * daquele.
 */
const NIVEIS_FONTE = ["Padrão", "Grande", "Maior", "Máxima"];

export default function BarraAcessibilidade() {
  const [aberto, setAberto] = useState(false);
  const { prefs, mudarFonte, alternar, redefinir } = useAcessibilidade();
  const { disponivel, lendo, lerConteudo, parar } = useLeituraEmVoz();
  const painelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const semAlteracao =
    prefs.fonte === 0 && !prefs.espacado && !prefs.semMovimento && !prefs.sublinhar;

  const linhaBotao = "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-left transition-colors border";

  return (
    <>
      {/* gatilho */}
      <button
        onClick={() => setAberto((v) => !v)}
        className="fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white focus:outline-none focus:ring-4 focus:ring-violet-300 transition-transform hover:scale-105"
        style={{ background: "#6D3FD4" }}
        aria-expanded={aberto}
        aria-controls="painel-acessibilidade"
        aria-label="Acessibilidade: ajustar fonte, contraste e leitura"
      >
        <Accessibility className="w-6 h-6" aria-hidden="true" />
      </button>

      {aberto && (
        <div
          id="painel-acessibilidade"
          ref={painelRef}
          role="dialog"
          aria-label="Opções de acessibilidade"
          className="fixed bottom-20 right-4 z-40 w-[290px] max-w-[calc(100vw-2rem)] rounded-2xl border shadow-2xl p-4"
          style={{ background: "#FFFFFF", borderColor: "#E7E3F5" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-sm" style={{ color: "#1F1B33" }}>Acessibilidade</p>
            <button onClick={() => setAberto(false)} className="p-1 rounded-lg hover:bg-violet-50"
              aria-label="Fechar">
              <X className="w-4 h-4" style={{ color: "#7C7898" }} />
            </button>
          </div>

          {/* tamanho da fonte */}
          <div className="mb-3">
            <p className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: "#4B4667" }}>
              <Type className="w-3.5 h-3.5" aria-hidden="true" /> Tamanho do texto
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => mudarFonte(-1)} disabled={prefs.fonte === 0}
                className="w-9 h-9 rounded-lg border font-bold disabled:opacity-40"
                style={{ borderColor: "#E7E3F5", color: "#6D3FD4" }} aria-label="Diminuir texto">
                A−
              </button>
              <div className="flex-1 text-center text-sm font-medium" style={{ color: "#1F1B33" }}
                role="status" aria-live="polite">
                {NIVEIS_FONTE[prefs.fonte]}
              </div>
              <button onClick={() => mudarFonte(1)} disabled={prefs.fonte === 3}
                className="w-9 h-9 rounded-lg border font-bold text-lg disabled:opacity-40"
                style={{ borderColor: "#E7E3F5", color: "#6D3FD4" }} aria-label="Aumentar texto">
                A+
              </button>
            </div>
          </div>

          {/* espaçamento */}
          <button
            onClick={() => alternar("espacado")}
            className={linhaBotao + " mb-2"}
            style={{
              borderColor: prefs.espacado ? "#6D3FD4" : "#E7E3F5",
              background: prefs.espacado ? "#EDE7FD" : "#FFF",
              color: "#1F1B33",
            }}
            aria-pressed={prefs.espacado}
          >
            <AlignJustify className="w-4 h-4 flex-shrink-0" style={{ color: "#6D3FD4" }} aria-hidden="true" />
            <span className="flex-1">Mais espaçamento</span>
            {prefs.espacado && <Check className="w-4 h-4" style={{ color: "#6D3FD4" }} aria-hidden="true" />}
          </button>

          {/* reduzir movimento */}
          <button
            onClick={() => alternar("semMovimento")}
            className={linhaBotao + " mb-2"}
            style={{
              borderColor: prefs.semMovimento ? "#6D3FD4" : "#E7E3F5",
              background: prefs.semMovimento ? "#EDE7FD" : "#FFF",
              color: "#1F1B33",
            }}
            aria-pressed={prefs.semMovimento}
          >
            <Pause className="w-4 h-4 flex-shrink-0" style={{ color: "#6D3FD4" }} aria-hidden="true" />
            <span className="flex-1">Reduzir animações</span>
            {prefs.semMovimento && <Check className="w-4 h-4" style={{ color: "#6D3FD4" }} aria-hidden="true" />}
          </button>

          {/* sublinhar links */}
          <button
            onClick={() => alternar("sublinhar")}
            className={linhaBotao + " mb-2"}
            style={{
              borderColor: prefs.sublinhar ? "#6D3FD4" : "#E7E3F5",
              background: prefs.sublinhar ? "#EDE7FD" : "#FFF",
              color: "#1F1B33",
            }}
            aria-pressed={prefs.sublinhar}
          >
            <Underline className="w-4 h-4 flex-shrink-0" style={{ color: "#6D3FD4" }} aria-hidden="true" />
            <span className="flex-1">Sublinhar links</span>
            {prefs.sublinhar && <Check className="w-4 h-4" style={{ color: "#6D3FD4" }} aria-hidden="true" />}
          </button>

          {/* ler em voz alta */}
          {disponivel && (
            <button
              onClick={() => (lendo ? parar() : lerConteudo())}
              className={linhaBotao}
              style={{
                borderColor: lendo ? "#6D3FD4" : "#E7E3F5",
                background: lendo ? "#EDE7FD" : "#FFF",
                color: "#1F1B33",
              }}
              aria-pressed={lendo}
            >
              <Volume2 className="w-4 h-4 flex-shrink-0" style={{ color: "#6D3FD4" }} aria-hidden="true" />
              <span className="flex-1">{lendo ? "Parar leitura" : "Ouvir esta página"}</span>
            </button>
          )}

          {!semAlteracao && (
            <button onClick={redefinir}
              className="w-full mt-3 text-xs font-medium inline-flex items-center justify-center gap-1.5 py-1.5"
              style={{ color: "#7C7898" }}>
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Restaurar padrão
            </button>
          )}

          <p className="text-[11px] mt-3 leading-snug" style={{ color: "#9A94B8" }}>
            A leitura em voz usa a voz do seu aparelho. Nada do que você lê é enviado para fora.
          </p>
        </div>
      )}
    </>
  );
}

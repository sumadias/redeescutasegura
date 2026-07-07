import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";
import { GravuraGota } from "@/components/art/Gravuras";

const FASES = [
  { label: "Inspire...",       dur: 4, fase: "expand" },
  { label: "Segure...",        dur: 4, fase: "hold" },
  { label: "Solte devagar...", dur: 6, fase: "contract" },
];

const GROUNDING_STEPS = [
  { num: 5, sentido: "veja",    instrucao: "5 coisas que você consegue ver agora",                       color: "#0F766E" },
  { num: 4, sentido: "toque",   instrucao: "4 coisas que você consegue tocar",                           color: "#0F766E" },
  { num: 3, sentido: "ouça",    instrucao: "3 sons que você consegue ouvir",                             color: "#9A3412" },
  { num: 2, sentido: "cheiro",  instrucao: "2 coisas que você consegue cheirar",                         color: "#15803D" },
  { num: 1, sentido: "paladar", instrucao: "1 coisa que você consegue saborear ou sentir na boca",       color: "#0F766E" },
];

function RespiracaoGuiada({ reducedMotion }) {
  const [ativa, setAtiva] = useState(false);
  const [faseIdx, setFaseIdx] = useState(0);
  const [ciclos, setCiclos] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const fase = FASES[faseIdx];

  useEffect(() => {
    if (!ativa) return;
    setProgresso(0);
    const total = fase.dur * 1000;
    const tick = 50;
    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += tick;
      setProgresso(Math.min(elapsed / total, 1));
    }, tick);
    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      setFaseIdx(prev => {
        const next = (prev + 1) % FASES.length;
        if (next === 0) setCiclos(c => c + 1);
        return next;
      });
    }, total);
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [ativa, faseIdx]);

  const parar = () => {
    setAtiva(false);
    setFaseIdx(0);
    setCiclos(0);
    setProgresso(0);
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  };

  const circleSize = reducedMotion ? 160 : fase.fase === "expand"
    ? 80 + progresso * 80
    : fase.fase === "hold"
    ? 160
    : 160 - progresso * 80;

  return (
    <div className="flex flex-col items-center gap-6">
      {!ativa ? (
        <div className="text-center space-y-4">
          <p className="text-base leading-relaxed" style={{ color: "#57534E" }}>
            Respire junto com o círculo. Inspire quando ele crescer, segure quando parar, solte quando contrair.
          </p>
          <button
            onClick={() => setAtiva(true)}
            className="h-12 px-8 rounded-xl font-semibold text-white text-base transition-all active:scale-95 focus:outline-none focus:ring-2"
            style={{ background: "#0F766E", minWidth: 160 }}
          >
            Começar
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 w-full">
          <div
            className="relative flex items-center justify-center"
            style={{ width: 200, height: 200 }}
            aria-live="polite"
            aria-label={fase.label}
          >
            <div
              className="rounded-full"
              style={{
                width: reducedMotion ? 160 : circleSize,
                height: reducedMotion ? 160 : circleSize,
                background: "radial-gradient(circle, #0F766E44 0%, #0F766E22 100%)",
                border: "3px solid #0F766E66",
                transition: reducedMotion ? "none" : "width 0.1s linear, height 0.1s linear",
              }}
            />
          </div>

          <p className="text-3xl font-semibold text-center" style={{ color: "#0F766E", fontFamily: "var(--font-lora)", minHeight: 40 }}>
            {fase.label}
          </p>

          {ciclos > 0 && (
            <p className="text-sm" style={{ color: "#78716C" }}>
              {ciclos} {ciclos === 1 ? "ciclo completo" : "ciclos completos"}
            </p>
          )}

          <button
            onClick={parar}
            className="h-11 px-6 rounded-xl font-medium text-sm border hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2"
            style={{ borderColor: "#E7E5E4", color: "#57534E" }}
          >
            Parar quando quiser
          </button>
        </div>
      )}
    </div>
  );
}

function Grounding() {
  const [step, setStep] = useState(0);
  const [concluido, setConcluido] = useState(false);

  const atual = GROUNDING_STEPS[step];

  const avancar = () => {
    if (step < GROUNDING_STEPS.length - 1) setStep(s => s + 1);
    else setConcluido(true);
  };

  if (concluido) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="flex justify-center">
          <GravuraGota size={60} color="#15803D" opacity={0.8} />
        </div>
        <p className="font-semibold text-lg" style={{ color: "#15803D", fontFamily: "var(--font-lora)" }}>Você fez isso.</p>
        <p className="text-base leading-relaxed" style={{ color: "#57534E" }}>
          Ao trazer atenção para os seus sentidos, você ajudou o seu sistema nervoso a se acalmar. Parabéns pela coragem de cuidar de si.
        </p>
        <button
          onClick={() => { setStep(0); setConcluido(false); }}
          className="h-11 px-6 rounded-xl border text-sm hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2"
          style={{ borderColor: "#E7E5E4", color: "#57534E" }}
        >
          Refazer
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
          style={{ background: atual.color + "18", color: atual.color }}
        >
          {atual.num}
        </div>
        <p className="text-lg font-semibold leading-snug" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>
          {atual.instrucao}
        </p>
        <p className="text-sm" style={{ color: "#78716C" }}>
          {step + 1} de {GROUNDING_STEPS.length}
        </p>
        <button
          onClick={avancar}
          className="h-12 px-8 rounded-xl font-semibold text-white text-base transition-all active:scale-95 focus:outline-none focus:ring-2"
          style={{ background: atual.color, minWidth: 160 }}
        >
          {step < GROUNDING_STEPS.length - 1 ? "Próximo" : "Concluir"}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function MomentoCalma() {
  const navigate = useNavigate();
  const [aba, setAba] = useState("respiracao");
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      <main className="flex-1 px-4 pt-14 pb-10 max-w-md mx-auto w-full space-y-6">
        {/* Header com marca-d'água */}
        <div className="pt-4 flex items-center gap-3 relative overflow-hidden">
          <div className="absolute -top-2 -right-2 pointer-events-none" aria-hidden="true">
            <GravuraGota size={140} color="#0F766E" opacity={0.10} />
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#57534E" }} />
          </button>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Momento de calma</h1>
            <p className="text-sm" style={{ color: "#57534E" }}>Respire. Você está segura aqui.</p>
          </div>
        </div>

        {/* Abas */}
        <div className="flex rounded-xl overflow-hidden border" style={{ background: "#fff", borderColor: "#E7E5E4" }}>
          {[
            { id: "respiracao", label: "Respiração guiada" },
            { id: "grounding",  label: "Técnica 5-4-3-2-1" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setAba(tab.id)}
              className="flex-1 h-11 text-sm font-medium transition-colors focus:outline-none focus:ring-2"
              style={{
                background: aba === tab.id ? "#0F766E" : "transparent",
                color: aba === tab.id ? "#fff" : "#57534E",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #E7E5E4" }}>
          {aba === "respiracao" ? (
            <RespiracaoGuiada reducedMotion={reducedMotion} />
          ) : (
            <Grounding />
          )}
        </div>

        {reducedMotion && aba === "respiracao" && (
          <p className="text-xs text-center" style={{ color: "#78716C" }}>
            Animação reduzida ativada — o círculo permanece estático, apenas o texto muda.
          </p>
        )}
      </main>
    </div>
  );
}
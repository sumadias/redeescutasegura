import { useState } from "react";
import AppFooter from "@/components/AppFooter";
import { useNavigate } from "react-router-dom";
import { FLAGS } from "@/lib/featureFlags";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mic, Send, MapPin, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuickExitButton from "@/components/QuickExitButton";
import RiskBadge from "@/components/RiskBadge";
import { GravuraMaos } from "@/components/art/Gravuras";

const SKIP = "Prefiro não responder";

const questions = [
  {
    id: 1,
    text: "Você está em segurança agora?",
    options: ["Sim, estou em segurança", "Não tenho certeza", "Não estou em segurança", "Preciso de ajuda urgente", SKIP],
  },
  {
    id: 2,
    text: "Como você está se sentindo?",
    options: ["Estou bem", "Estou com medo", "Estou triste", "Estou confuso(a) ou sobrecarregado(a)", SKIP],
  },
  {
    id: 3,
    text: "O que você gostaria agora?",
    options: ["Falar com alguém", "Ver serviços próximos", ...(FLAGS.ENABLE_AGENDAMENTO ? ["Agendar atendimento"] : []), "Só quero informação", SKIP],
  },
];

function getRiskLevel(answers) {
  const dangerous = ["Preciso de ajuda urgente", "Não estou em segurança"];
  const moderate = ["Não tenho certeza", "Estou com medo", "Estou triste"];
  let score = 0;
  answers.forEach(a => {
    if (dangerous.includes(a)) score += 3;
    else if (moderate.includes(a)) score += 1;
  });
  if (score >= 3) return "vermelho";
  if (score >= 1) return "amarelo";
  return "verde";
}

export default function Acolhimento() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [risk, setRisk] = useState(null);
  const [report, setReport] = useState("");
  const [showReport, setShowReport] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setRisk(getRiskLevel(newAnswers));
    }
  };

  const riskMessages = {
    verde:    { title: "Estamos aqui",              desc: "Os recursos do app estão disponíveis sempre que precisar. Você pode explorar no seu próprio ritmo." },
    amarelo:  { title: "Você não está só",          desc: "Há profissionais prontos para ouvir. Recomendamos buscar atendimento em um dos serviços da rede." },
    vermelho: { title: "Ajuda imediata disponível", desc: "Sua segurança é prioridade agora. Ligue 180 — é gratuito, sigiloso e funciona 24h." },
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      <div className="px-4 pt-14 pb-12 max-w-sm mx-auto w-full space-y-6">
        <button
          onClick={() => navigate("/app/menu")}
          className="flex items-center gap-2 text-sm focus:outline-none focus:ring-2 rounded"
          style={{ color: "#78716C" }}
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        {/* Cabeçalho com marca-d'água */}
        <div className="relative overflow-hidden">
          <div className="absolute -top-2 -right-2 pointer-events-none" aria-hidden="true">
            <GravuraMaos size={140} color="#9A3412" opacity={0.10} />
          </div>
          <h1 className="text-xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Acolhimento Seguro</h1>
          <p className="text-sm mt-1" style={{ color: "#57534E" }}>Responda no seu ritmo. Tudo é opcional.</p>
        </div>

        {!risk ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-white p-6" style={{ borderColor: "#E7E5E4" }}>
                <p className="text-lg font-semibold mb-4" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>{questions[step].text}</p>
                <div className="space-y-2">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all text-base font-medium focus:outline-none focus:ring-2 ${opt === SKIP ? "border-dashed" : "border"}`}
                      style={{
                        borderColor: opt === SKIP ? "#D6D3D1" : "#E7E5E4",
                        color: opt === SKIP ? "#78716C" : "#292524",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2">
                {questions.map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full transition-colors" style={{ background: i <= step ? "#0F766E" : "#E7E5E4" }} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-xl border p-6"
              style={{
                background: risk === "vermelho" ? "#fff5f5" : risk === "amarelo" ? "#FFFBEB" : "#F0FDF4",
                borderColor: risk === "vermelho" ? "#B91C1C33" : risk === "amarelo" ? "#92400E33" : "#15803D33",
              }}
            >
              <div className="text-center space-y-3">
                <RiskBadge level={risk} size="lg" />
                <h2 className="text-lg font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>{riskMessages[risk].title}</h2>
                <p className="text-base leading-relaxed" style={{ color: "#57534E" }}>{riskMessages[risk].desc}</p>
              </div>
            </div>

            {risk === "vermelho" && (
              <a href="tel:180" className="block w-full text-white text-center py-4 rounded-xl font-semibold text-lg transition-colors" style={{ background: "#B91C1C" }}>
                Ligar agora para o 180
              </a>
            )}

            <div className="space-y-2">
              {risk !== "verde" && (
                <button onClick={() => navigate("/app/mapa")} className="w-full h-12 rounded-xl font-semibold text-white transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2" style={{ background: "#0F766E" }}>
                  <MapPin className="w-4 h-4" /> Ver serviços próximos
                </button>
              )}
              <button onClick={() => navigate("/app/apoio")} className="w-full h-12 rounded-xl font-semibold border transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2" style={{ borderColor: "#0F766E33", color: "#0F766E", background: "#fff" }}>
                <Users className="w-4 h-4" /> Falar com profissional
              </button>
            </div>

            <div className="rounded-xl border bg-white p-4" style={{ borderColor: "#E7E5E4" }}>
              <button onClick={() => setShowReport(!showReport)} className="text-sm font-semibold w-full text-left focus:outline-none focus:ring-2 rounded" style={{ color: "#0F766E" }}>
                Registrar relato {showReport ? "▲" : "▼"}
              </button>
              {showReport && (
                <div className="mt-3 space-y-3">
                  <Textarea
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    placeholder="Escreva o que quiser aqui. Suas palavras são seguras..."
                    className="min-h-[100px] rounded-xl"
                  />
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 h-10 px-4 rounded-xl border text-sm focus:outline-none focus:ring-2" style={{ borderColor: "#E7E5E4", color: "#57534E" }}>
                      <Mic className="w-4 h-4" /> Gravar voz
                    </button>
                    <button className="flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm text-white ml-auto focus:outline-none focus:ring-2" style={{ background: "#0F766E" }}>
                      <Send className="w-4 h-4" /> Enviar
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => { setStep(0); setAnswers([]); setRisk(null); }} className="w-full text-sm py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2" style={{ borderColor: "#E7E5E4", color: "#78716C" }}>
              Refazer triagem
            </button>
          </motion.div>
        )}
      </div>
      <AppFooter />
    </div>
  );
}
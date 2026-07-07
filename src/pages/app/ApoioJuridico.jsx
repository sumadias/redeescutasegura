import { useState } from "react";
import AppFooter from "@/components/AppFooter";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, ChevronDown, ChevronUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import QuickExitButton from "@/components/QuickExitButton";
import { mockProfissionais, faqData } from "@/lib/mockData";

const attendanceLabels = {
  presencial: "Presencial",
  online: "Online",
  chat: "Chat",
  presencial_online: "Presencial e Online",
};

export default function ApoioJuridico() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [aba, setAba] = useState("profissionais");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      <div className="px-4 pt-14 pb-10 max-w-sm mx-auto w-full space-y-6">
        <button onClick={() => navigate("/app/menu")} className="flex items-center gap-2 text-sm focus:outline-none focus:ring-2 rounded pt-4" style={{ color: "#78716C" }}>
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <div>
          <h1 className="text-xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Apoio Jurídico e Terapêutico</h1>
          <p className="text-sm mt-1" style={{ color: "#57534E" }}>Profissionais e respostas às dúvidas mais comuns</p>
        </div>

        {/* Abas */}
        <div className="flex rounded-xl overflow-hidden border" style={{ background: "#fff", borderColor: "#E7E5E4" }}>
          {[
            { id: "profissionais", label: "Profissionais" },
            { id: "faq",           label: "Perguntas" },
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

        {aba === "profissionais" && (
          <div className="space-y-3">
            {mockProfissionais.map((prof, i) => (
              <motion.div key={prof.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="rounded-xl border p-4 space-y-3 bg-white" style={{ borderColor: "#E7E5E4" }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm" style={{ color: "#292524" }}>{prof.name}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "#57534E" }}>{prof.specialty}</p>
                      <p className="text-xs" style={{ color: "#78716C" }}>{prof.institution}</p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-semibold"
                      style={{
                        background: prof.available ? "#F0FDFA" : "#F5F5F4",
                        color: prof.available ? "#0F766E" : "#78716C",
                      }}
                    >
                      {prof.available ? "Disponível" : "Indisponível"}
                    </span>
                  </div>
                  <span
                    className="inline-block text-xs px-2 py-1 rounded-full border"
                    style={{ borderColor: "#E7E5E4", color: "#57534E" }}
                  >
                    {attendanceLabels[prof.attendance_type]}
                  </span>
                  {prof.available && (
                    <div className="flex gap-2">
                      <a href={`tel:${prof.phone.replace(/\D/g, "")}`} className="flex-1">
                        <button className="w-full h-10 rounded-xl text-xs font-semibold border transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2" style={{ borderColor: "#E7E5E4", color: "#57534E" }}>
                          <Phone className="w-3.5 h-3.5" /> Ligar
                        </button>
                      </a>
                      <button className="flex-1 h-10 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2" style={{ background: "#0F766E" }}>
                        <MessageCircle className="w-3.5 h-3.5" /> Agendar
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {aba === "faq" && (
          <div className="space-y-2">
            {faqData.map((item, i) => (
              <div key={i} className="rounded-xl border overflow-hidden bg-white" style={{ borderColor: "#E7E5E4" }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full text-left p-4 flex justify-between items-center focus:outline-none focus:ring-2"
                >
                  <span className="font-semibold text-sm pr-2" style={{ color: "#292524" }}>{item.question}</span>
                  {expandedFaq === i
                    ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: "#78716C" }} />
                    : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "#78716C" }} />}
                </button>
                {expandedFaq === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-4 pb-4 border-t" style={{ borderColor: "#F5F5F4" }}>
                    <p className="text-sm leading-relaxed pt-3" style={{ color: "#57534E" }}>{item.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <AppFooter />
    </div>
  );
}
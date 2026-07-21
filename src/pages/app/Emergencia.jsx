import { useNavigate } from "react-router-dom";
import { Phone, Shield } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";
import RedeMunicipios from "@/components/RedeMunicipios";

export default function Emergencia() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAFAFB" }}>
      <QuickExitButton />

      {/* Topo institucional */}
      <div className="bg-white border-b sticky top-0 z-20" style={{ borderColor: "#E5E7EB" }}>
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <button
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
            className="flex items-center gap-2.5 min-w-0"
            aria-label="Voltar"
          >
            <svg viewBox="0 0 512 512" className="w-9 h-9 flex-shrink-0" aria-hidden="true">
              <defs>
                <linearGradient id="emgRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#5B4BB8" /><stop offset="1" stopColor="#8360D6" />
                </linearGradient>
                <radialGradient id="emgHeart" cx="42%" cy="34%" r="75%">
                  <stop offset="0" stopColor="#FDE7F0" /><stop offset="45%" stopColor="#F8AECB" /><stop offset="100%" stopColor="#EE7DA9" />
                </radialGradient>
              </defs>
              <circle cx="256" cy="256" r="150" fill="none" stroke="url(#emgRing)" strokeWidth="34" />
              <g transform="translate(171,179) scale(1.7)">
                <path d="M50,88 C22,66 8,50 8,32 C8,18 18,10 30,10 C40,10 47,17 50,24 C53,17 60,10 70,10 C82,10 92,18 92,32 C92,50 78,66 50,88 Z" fill="url(#emgHeart)" />
              </g>
            </svg>
            <span className="font-bold text-sm leading-tight text-left" style={{ color: "#1F2937" }}>
              Rede Escuta<br />Segura
            </span>
          </button>
          <a
            href="tel:180"
            className="h-10 px-4 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2 flex-shrink-0"
            style={{ background: "#E8235C" }}
          >
            <Phone className="w-4 h-4" aria-hidden="true" /> Preciso de ajuda agora
          </a>
        </div>
      </div>

      {/* HERO */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1A1145 0%,#251657 55%,#2E1B6B 100%)" }}>
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            right: -70, top: "50%", transform: "translateY(-50%)",
            width: 340, height: 340, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,45,120,0.38), transparent 68%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14 relative">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Emergência</h1>
          <p className="text-lg md:text-xl font-bold mt-2" style={{ color: "#FF4D8D" }}>
            Você não está sozinha. Estamos aqui por você.
          </p>
          <p className="text-sm md:text-base mt-4 max-w-xl leading-relaxed" style={{ color: "#C9C2E8" }}>
            Encontre serviços de apoio e atendimento em todo o estado da Paraíba.
            Filtre por cidade para te ajudar a encontrar ajuda perto de você.
          </p>
        </div>
      </div>

      {/* Aviso de privacidade */}
      <div className="text-white text-center text-xs px-4 py-2" style={{ background: "#1A1145" }} role="note">
        <Shield className="w-3 h-3 inline mr-1" style={{ color: "#5CC8BC" }} aria-hidden="true" />
        Esta página não requer cadastro. Seus dados não são coletados aqui.
      </div>

      {/* Rede de atendimento por município */}
      <RedeMunicipios />
    </div>
  );
}

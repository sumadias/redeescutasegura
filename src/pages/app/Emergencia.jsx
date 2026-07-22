import { useNavigate } from "react-router-dom";
import { Shield, MessageCircle } from "lucide-react";
import RedeMunicipios from "@/components/RedeMunicipios";
import MapaPBNeon from "@/components/MapaPBNeon";

export default function Emergencia() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col" style={{ background: "#FAFAFB" }}>
      {/* HERO */}
      <div
        className="relative overflow-hidden min-h-[320px] md:min-h-[380px] flex items-center"
        style={{ background: "linear-gradient(115deg,#150E38 0%,#1E1450 45%,#2A1A63 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 relative w-full
                        md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,47%)] md:items-center md:gap-6">
          {/* No celular a silhueta é fundo (absoluta, bem apagada, atrás do
              texto). No desktop ela é COLUNA DA GRADE, não elemento absoluto:
              posicionamento absoluto fazia o mapa passar por baixo do texto em
              certas larguras, porque a caixa dele não participava do layout.
              Como coluna, os dois nunca se encostam, em largura nenhuma. */}
          <MapaPBNeon className="absolute inset-y-0 right-[-26%] h-full w-auto max-w-none opacity-20 pointer-events-none
                                 md:static md:opacity-100 md:h-auto md:w-full md:col-start-2 md:row-start-1" />

          <div className="relative md:col-start-1 md:row-start-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Emergência</h1>
            <p className="text-lg md:text-xl font-bold mt-2" style={{ color: "#FF4D8D" }}>
              Você não está sozinha. Estamos aqui por você.
            </p>
            <p className="text-sm md:text-base mt-4 leading-relaxed" style={{ color: "#C9C2E8" }}>
              Encontre serviços de apoio e atendimento em todo o estado da Paraíba.
              Filtre por cidade ou pergunte ao assistente para achar ajuda perto de você.
            </p>
            <button
              onClick={() => navigate("/assistente")}
              className="mt-6 h-12 px-6 rounded-full text-sm font-bold text-white inline-flex items-center gap-2 shadow-lg"
              style={{ background: "#E8235C", boxShadow: "0 8px 28px rgba(232,35,92,0.45)" }}
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Perguntar ao assistente
            </button>
          </div>
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

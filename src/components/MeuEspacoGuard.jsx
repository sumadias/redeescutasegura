import { useNavigate } from "react-router-dom";
import { ShieldAlert, Lock } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";

export default function MeuEspacoGuard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative" style={{ background: "#FAFAF9" }}>
      <QuickExitButton />

      <div className="max-w-sm w-full space-y-6 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ background: "#FFF1F2" }}>
          <Lock className="w-7 h-7" style={{ color: "#9F1239" }} />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-semibold" style={{ color: "#292524" }}>Este espaço é privado</h1>
          <p className="text-sm leading-relaxed" style={{ color: "#57534E" }}>
            Entre com segurança para acessar seus registros, conteúdos e ferramentas de cuidado.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate(`/login?next=${encodeURIComponent(window.location.pathname)}`)}
            className="w-full h-12 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ background: "#9F1239" }}
          >
            Entrar com segurança
          </button>

          <button
            onClick={() => navigate("/app/menu")}
            className="w-full h-11 rounded-xl text-sm font-semibold border transition-colors"
            style={{ borderColor: "#D6D3D1", color: "#57534E", background: "#fff" }}
          >
            Voltar ao início
          </button>

          <button
            onClick={() => navigate("/app/emergencia")}
            className="w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}
          >
            <ShieldAlert className="w-4 h-4" />
            Preciso de ajuda agora
          </button>
        </div>

        <p className="text-xs" style={{ color: "#A8A29E" }}>
          Nenhum dado pessoal é coletado antes do seu consentimento.
        </p>
      </div>
    </div>
  );
}
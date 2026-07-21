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
            O diário, o plano de segurança e as cartas ficam guardados na sua conta — só você
            tem acesso. Para usar, entre ou crie o seu espaço.
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

          {/* Faltava o caminho do cadastro: quem ainda não tem conta chegava aqui
              e só tinha a opção de entrar, sem saber como criar a sua. */}
          <button
            onClick={() => navigate(`/register?next=${encodeURIComponent(window.location.pathname)}`)}
            className="w-full h-12 rounded-xl text-sm font-semibold border-2 transition-colors"
            style={{ borderColor: "#9F1239", color: "#9F1239", background: "#fff" }}
          >
            Criar meu espaço
          </button>

          <button
            onClick={() => navigate("/")}
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
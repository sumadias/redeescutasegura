import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Shield, Lock } from "lucide-react";

/**
 * Segunda camada de guarda — defesa em profundidade.
 * RoleGuardRoute é a primeira camada (nível de rota).
 * PanelGuard é a segunda camada (nível de layout).
 * Nenhum dado é renderizado antes da validação.
 */
export default function PanelGuard({ children, requiredRole = "profissional" }) {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    base44.auth.me()
      .then((user) => {
        if (cancelled) return;
        if (!user) { setStatus("unauthenticated"); return; }
        const role = (user.role || "user").toLowerCase();
        // admin pode acessar tudo; profissional só acessa /painel
        const allowed =
          role === "admin" ||
          (requiredRole === "profissional" && role === "profissional");
        setStatus(allowed ? "allowed" : "unauthorized");
      })
      .catch(() => { if (!cancelled) setStatus("unauthenticated"); });
    return () => { cancelled = true; };
  }, [requiredRole, location.pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF9" }}>
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#0F766E" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    const next = encodeURIComponent(location.pathname);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6" style={{ background: "#FAFAF9" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#F5F3FF" }}>
          <Lock className="w-8 h-8" style={{ color: "#6D5BA6" }} />
        </div>
        <div className="space-y-2 max-w-xs">
          <h1 className="text-xl font-semibold" style={{ color: "#292524" }}>Área restrita</h1>
          <p className="text-sm leading-relaxed" style={{ color: "#57534E" }}>
            Este acesso é reservado para profissionais e administradores previamente autorizados.
            Por segurança, é necessário solicitar liberação ao administrador da plataforma.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => navigate(`/login?next=${next}`)}
            className="w-full h-12 rounded-xl font-semibold text-sm text-white transition-colors"
            style={{ background: "#6D5BA6" }}
          >
            Entrar com credenciais autorizadas
          </button>
          <button
            onClick={() => navigate("/app/menu")}
            className="w-full h-12 rounded-xl font-semibold text-sm border transition-colors"
            style={{ borderColor: "#D6D3D1", color: "#57534E" }}
          >
            Entendi
          </button>
        </div>
      </div>
    );
  }

  if (status === "unauthorized") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6" style={{ background: "#FAFAF9" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#FEF2F2" }}>
          <Shield className="w-8 h-8" style={{ color: "#B91C1C" }} />
        </div>
        <div className="space-y-2 max-w-xs">
          <h1 className="text-xl font-semibold" style={{ color: "#292524" }}>Acesso não autorizado</h1>
          <p className="text-sm leading-relaxed" style={{ color: "#57534E" }}>
            Acesso não autorizado. Solicite liberação ao administrador da plataforma.
          </p>
        </div>
        <button
          onClick={() => navigate("/app/menu")}
          className="w-full h-12 max-w-xs rounded-xl font-semibold text-sm border transition-colors"
          style={{ borderColor: "#D6D3D1", color: "#57534E" }}
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  return children;
}
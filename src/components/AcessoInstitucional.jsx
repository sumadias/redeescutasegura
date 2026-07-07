import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Building2, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";

const AREAS = {
  "/painel": {
    label: "Painel Profissional",
    loginLabel: "Entrar com credenciais autorizadas",
    color: "text-[#315C72]",
    border: "border-[#315C72]/30",
    ring: "focus:ring-[#315C72]/40",
    hover: "hover:bg-[#315C72]/5",
    iconColor: "text-[#315C72]",
    bg: "bg-[#315C72]/10",
  },
  "/admin": {
    label: "Administração Municipal",
    loginLabel: "Entrar como administrador",
    color: "text-[#6D5BA6]",
    border: "border-[#6D5BA6]/30",
    ring: "focus:ring-[#6D5BA6]/40",
    hover: "hover:bg-[#6D5BA6]/5",
    iconColor: "text-[#6D5BA6]",
    bg: "bg-[#6D5BA6]/10",
  },
};

export default function AcessoInstitucional() {
  const navigate = useNavigate();
  const [activeArea, setActiveArea] = useState(null); // null | "/painel" | "/admin"

  async function handlePortalClick(path) {
    try {
      const user = await base44.auth.me();
      if (user) {
        const role = user.role || "user";
        const canAccess =
          role === "admin" ||
          (path === "/painel" && role === "profissional");
        if (canAccess) {
          navigate(path);
          return;
        }
      }
    } catch {}
    // Sem autenticação ou sem permissão: mostrar modal
    setActiveArea(path);
  }

  const area = activeArea ? AREAS[activeArea] : null;

  return (
    <>
      <div className="border-t border-[#D6DBE3] pt-4 space-y-3">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#6D5BA6]" aria-hidden="true" />
          <p className="text-xs text-[#667085] font-semibold uppercase tracking-wide">Acesso Institucional</p>
        </div>
        <p className="text-xs text-[#667085] leading-relaxed">
          Área exclusiva para profissionais autorizados e administração municipal.
        </p>
        <div className="flex gap-2">
          {Object.entries(AREAS).map(([path, cfg]) => (
            <button
              key={path}
              onClick={() => handlePortalClick(path)}
              className={`flex-1 text-xs ${cfg.color} font-semibold border ${cfg.border} rounded-lg py-2.5 px-3 ${cfg.hover} transition-colors focus:outline-none focus:ring-2 ${cfg.ring} flex items-center justify-center gap-1.5`}
            >
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
              {cfg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modal de área restrita */}
      <AnimatePresence>
        {activeArea && area && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setActiveArea(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Lock className={`w-4 h-4 ${area.iconColor}`} />
                  <span className="font-extrabold text-sm text-foreground">Área restrita</span>
                </div>
                <button
                  onClick={() => setActiveArea(null)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col items-center text-center space-y-4">
                <div className={`w-14 h-14 ${area.bg} rounded-full flex items-center justify-center`}>
                  <ShieldAlert className={`w-7 h-7 ${area.iconColor}`} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Este acesso é reservado para profissionais autorizados e administradores da plataforma.
                  Para solicitar liberação, entre em contato com o administrador.
                </p>
              </div>

              {/* Botões */}
              <div className="px-6 pb-6 flex flex-col gap-3">
                <Button
                  onClick={() => navigate(`/login?next=${activeArea}`)}
                  className="w-full rounded-xl bg-[#6D5BA6] hover:bg-[#5a4a8a]"
                >
                  {area.loginLabel}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveArea(null)}
                  className="w-full rounded-xl"
                >
                  Entendi
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, ShieldAlert, Scale, Lock, X, ChevronRight,
  Stethoscope, ShieldCheck, UserPlus, LayoutDashboard, FileText
} from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";
import { FLAGS } from "@/lib/featureFlags";
import { base44 } from "@/api/base44Client";
import { GravuraBroto, DivisorCostura } from "@/components/art/Gravuras";
import AppFooter from "@/components/AppFooter";

const AREAS = {
  "/painel": { label: "Painel Profissional", loginLabel: "Entrar com credenciais autorizadas" },
  "/admin":  { label: "Administração Municipal", loginLabel: "Entrar como administrador" },
};

function AreaRestritaModal({ path, onClose, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#E7E5E4" }}>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" style={{ color: "#0F766E" }} />
            <span className="font-semibold text-sm" style={{ color: "#292524" }}>Área restrita</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-stone-100 transition-colors" aria-label="Fechar">
            <X className="w-4 h-4" style={{ color: "#78716C" }} />
          </button>
        </div>
        <div className="p-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ background: "#F0FDFA" }}>
            <ShieldAlert className="w-7 h-7" style={{ color: "#0F766E" }} />
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#57534E" }}>
            Este acesso é reservado para profissionais autorizados e administradores da plataforma.
          </p>
        </div>
        <div className="px-6 pb-6 flex flex-col gap-3">
          <button
            onClick={() => onNavigate(`/login?next=${path}`)}
            className="w-full h-12 font-semibold rounded-xl text-sm transition-colors text-white"
            style={{ background: "#0F766E" }}
          >
            {AREAS[path]?.loginLabel}
          </button>
          <button
            onClick={onClose}
            className="w-full h-12 border font-semibold rounded-xl text-sm transition-colors hover:bg-stone-50"
            style={{ borderColor: "#E7E5E4", color: "#57534E" }}
          >
            Entendi
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AppMenu() {
  const navigate = useNavigate();
  const [restrictedPath, setRestrictedPath] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    base44.auth.isAuthenticated().then(setIsLoggedIn).catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      <main className="flex-1 px-4 pt-14 pb-10 max-w-md mx-auto w-full space-y-6">

        {/* Saudação com marca-d'água */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 space-y-1 relative overflow-hidden"
        >
          <div className="absolute -top-2 -right-4 pointer-events-none" aria-hidden="true">
            <GravuraBroto size={140} color="#0F766E" opacity={0.10} />
          </div>
          <h1 className="text-2xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>
            Como podemos te apoiar agora?
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#57534E" }}>
            Escolha uma opção. Você pode sair rapidamente a qualquer momento.
          </p>
        </motion.div>

        {/* Emergência */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onClick={() => navigate("/app/emergencia")}
          aria-label="Preciso de ajuda agora — acessar emergência"
          className="w-full flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ background: "#B91C1C", minHeight: 64 }}
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
            <ShieldAlert className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-base leading-tight">Preciso de ajuda agora</p>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>190 · 180 · 192 · Serviços próximos</p>
          </div>
          <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.6)" }} />
        </motion.button>

        {/* Meu Espaço — logo após emergência */}
        {isLoggedIn && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            onClick={() => navigate("/app/meu-espaco")}
            className="w-full flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all active:scale-[0.98] focus:outline-none focus:ring-2 shadow-sm"
            style={{ background: "#0F766E", minHeight: 68 }}
            aria-label="Acessar meu espaço"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
              <LayoutDashboard className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base leading-tight text-white">Meu espaço</p>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>Diário, plano de segurança, cartas e mais</p>
            </div>
            <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.6)" }} />
          </motion.button>
        )}

        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="space-y-2"
          >
            <button
              onClick={() => navigate("/register")}
              className="w-full flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all active:scale-[0.98] focus:outline-none focus:ring-2 shadow-sm"
              style={{ background: "#0F766E", minHeight: 68 }}
              aria-label="Criar meu espaço"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                <UserPlus className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base leading-tight text-white">Criar o meu espaço</p>
                <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>Diário, conteúdos de cuidado e plano de segurança.</p>
              </div>
              <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.6)" }} />
            </button>
            <div className="text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-sm underline underline-offset-2 focus:outline-none focus:ring-2 rounded"
                style={{ color: "#78716C" }}
              >
                Já tenho cadastro — entrar
              </button>
            </div>
          </motion.div>
        )}

        {/* Mapa */}
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/app/mapa")}
          className="w-full flex items-center gap-4 rounded-xl px-4 py-4 text-left border bg-white transition-all active:scale-[0.99] focus:outline-none focus:ring-2"
          style={{ borderColor: "#15803D33", minHeight: 64 }}
          aria-label="Encontrar serviços próximos"
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F0FDF4" }}>
            <MapPin className="w-5 h-5" style={{ color: "#15803D" }} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-base leading-tight" style={{ color: "#292524" }}>Encontrar serviços próximos</p>
            <p className="text-sm mt-0.5" style={{ color: "#57534E" }}>Delegacias, abrigos, CRAM e mais</p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "#15803D66" }} />
        </motion.button>

        {/* Divisor */}
        <div className="flex justify-center">
          <DivisorCostura width={180} color="#D6D3D1" />
        </div>

        {/* Talvez você precise de… */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="space-y-2"
        >
          <p className="text-sm font-semibold" style={{ color: "#57534E" }}>Talvez você precise de…</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Scale,      label: "Orientação jurídica",     path: "/app/apoio",              color: "#0F766E" },
              { icon: Stethoscope,label: "Serviços de saúde",       path: "/app/mapa?categoria=saude",color: "#0F766E" },
              { icon: ShieldCheck,label: "Proteção e acolhimento",  path: "/app/emergencia",         color: "#B91C1C" },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1.5 rounded-xl p-3 text-center border bg-white hover:bg-stone-50 active:scale-[0.97] transition-all focus:outline-none focus:ring-2"
                style={{ minHeight: 80, borderColor: item.color + "22" }}
                aria-label={item.label}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} aria-hidden="true" />
                <span className="text-sm font-medium leading-tight" style={{ color: "#292524" }}>{item.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Meus direitos + BO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => navigate("/app/direitos")}
            className="flex items-center gap-3 rounded-xl px-4 py-4 text-left border bg-white transition-all active:scale-[0.98] focus:outline-none focus:ring-2"
            style={{ borderColor: "#0F766E22", minHeight: 64 }}
            aria-label="Meus direitos"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F0FDFA" }}>
              <Scale className="w-4 h-4" style={{ color: "#0F766E" }} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight" style={{ color: "#292524" }}>Meus direitos</p>
              <p className="text-xs mt-0.5" style={{ color: "#57534E" }}>Informações simples</p>
            </div>
          </button>
          <a
            href="https://delegaciaonline.pc.pb.gov.br/tipo-ocorrencia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-4 text-left border bg-white transition-all active:scale-[0.98] focus:outline-none focus:ring-2"
            style={{ borderColor: "#9A341222", minHeight: 64 }}
            aria-label="Boletim de Ocorrência Online"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FEF5EF" }}>
              <FileText className="w-4 h-4" style={{ color: "#9A3412" }} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight" style={{ color: "#292524" }}>B.O Online</p>
              <p className="text-xs mt-0.5" style={{ color: "#57534E" }}>Registrar ocorrência</p>
            </div>
          </a>
        </motion.div>


      </main>

      <AppFooter />

      <AnimatePresence>
        {restrictedPath && (
          <AreaRestritaModal
            path={restrictedPath}
            onClose={() => setRestrictedPath(null)}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
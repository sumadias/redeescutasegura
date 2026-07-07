import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, HeartHandshake, MapPin, Lock, UserPlus, Scale, FileText } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";
import { GravuraPassarinha } from "@/components/art/Gravuras";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col px-5 py-6 relative" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold focus:shadow-lg focus:ring-2 focus:ring-teal-600"
      >
        Ir para o conteúdo principal
      </a>

      <main id="main-content" className="flex flex-col flex-1 max-w-md mx-auto w-full pt-10 pb-8 space-y-6">

        {/* Marca */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2 relative overflow-hidden"
        >
          {/* Marca-d'água */}
          <div className="absolute -top-4 -right-6 pointer-events-none" aria-hidden="true">
            <GravuraPassarinha size={180} color="#57534E" opacity={0.08} />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#0F766E" }}>
              <HeartHandshake className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-base font-semibold" style={{ color: "#292524", fontFamily: "var(--font-inter)" }}>Rede Escuta Segura</span>
          </div>
          <h1 className="text-2xl font-semibold leading-tight" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>
            Apoio seguro, discreto e acolhedor.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#57534E" }}>
            Para pessoas em situação de violência que precisam de ajuda, orientação ou escuta qualificada. Todas as identidades de gênero são bem-vindas.
          </p>
        </motion.header>

        {/* 1. Emergência */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <button
            onClick={() => navigate("/emergencia")}
            className="w-full text-white font-semibold py-4 px-5 rounded-xl text-base transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm flex items-center justify-center gap-2"
            style={{ background: "#B91C1C", minHeight: 52 }}
            aria-label="Preciso de ajuda agora — acessar emergência"
          >
            <Shield className="w-4 h-4" aria-hidden="true" />
            Preciso de ajuda agora
          </button>

          <div className="flex gap-2">
            <a href="tel:190" className="flex-1">
              <button className="w-full border font-semibold py-2.5 px-3 rounded-xl text-sm transition-colors" style={{ borderColor: "#B91C1C33", background: "#fff5f5", color: "#B91C1C" }}>190 — PM</button>
            </a>
            <a href="tel:180" className="flex-1">
              <button className="w-full border font-semibold py-2.5 px-3 rounded-xl text-sm transition-colors" style={{ borderColor: "#B91C1C33", background: "#fff5f5", color: "#B91C1C" }}>180 — Mulher</button>
            </a>
            <a href="tel:192" className="flex-1">
              <button className="w-full border font-semibold py-2.5 px-3 rounded-xl text-sm transition-colors" style={{ borderColor: "#92400E33", background: "#FEF3C7", color: "#92400E" }}>192 — SAMU</button>
            </a>
          </div>
        </motion.div>

        {/* 2. BO Online */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <a
            href="https://delegaciaonline.pc.pb.gov.br/tipo-ocorrencia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl px-5 py-4 text-left border bg-white w-full transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2"
            style={{ borderColor: "#9A341233" }}
            aria-label="Boletim de Ocorrência Online"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FEF5EF" }}>
              <FileText className="w-5 h-5" style={{ color: "#9A3412" }} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base leading-tight" style={{ color: "#292524" }}>Boletim de Ocorrência Online</p>
              <p className="text-sm mt-0.5" style={{ color: "#57534E" }}>Registrar boletim de ocorrência</p>
              <p className="text-sm mt-0.5" style={{ color: "#9A3412" }}>Para residentes no Estado da Paraíba</p>
            </div>
          </a>
        </motion.div>

        {/* 3. Cards informativos */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => navigate("/app/o-que-e-violencia")}
            className="flex flex-col items-center gap-3 rounded-xl px-4 py-5 border bg-white transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2"
            style={{ borderColor: "#9A341233" }}
            aria-label="O que é violência contra a mulher?"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#FEF5EF" }}>
              <span className="text-3xl" role="img" aria-hidden="true">👫</span>
            </div>
            <p className="font-semibold text-sm leading-tight text-center" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>O que é violência contra a mulher?</p>
          </button>
          <button
            onClick={() => navigate("/app/violencia-domestica")}
            className="flex flex-col items-center gap-3 rounded-xl px-4 py-5 border bg-white transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2"
            style={{ borderColor: "#9A341233" }}
            aria-label="Quando ocorre a violência doméstica?"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#FEF5EF" }}>
              <span className="text-3xl" role="img" aria-hidden="true">🏠</span>
            </div>
            <p className="font-semibold text-sm leading-tight text-center" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Quando ocorre a violência doméstica?</p>
          </button>
        </motion.div>

        {/* 4. Meus direitos + Serviços */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => navigate("/app/direitos")}
            className="flex flex-col items-center gap-3 rounded-xl px-4 py-5 border bg-white transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2"
            style={{ borderColor: "#0F766E33" }}
            aria-label="Meus direitos"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#F0FDFA" }}>
              <Scale className="w-6 h-6" style={{ color: "#0F766E" }} aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm leading-tight" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Meus direitos</p>
              <p className="text-xs mt-1 leading-tight" style={{ color: "#0F766E" }}>Informações em linguagem simples</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/app/mapa")}
            className="flex flex-col items-center gap-3 rounded-xl px-4 py-5 border bg-white transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2"
            style={{ borderColor: "#15803D33" }}
            aria-label="Serviços próximos"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#F0FDF4" }}>
              <MapPin className="w-6 h-6" style={{ color: "#15803D" }} aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm leading-tight" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Serviços próximos</p>
              <p className="text-xs mt-1 leading-tight" style={{ color: "#15803D" }}>Delegacias, abrigos e mais</p>
            </div>
          </button>
        </motion.div>

        {/* 5. Cadastro / Login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="space-y-2"
        >
          <button
            onClick={() => navigate("/register")}
            className="w-full border bg-white font-semibold py-3 px-4 rounded-xl text-base transition-colors focus:outline-none focus:ring-2 flex items-center justify-center gap-1.5"
            style={{ borderColor: "#0F766E33", color: "#292524" }}
          >
            <UserPlus className="w-4 h-4" style={{ color: "#0F766E" }} aria-hidden="true" />
            Criar meu espaço
          </button>
          <p className="text-center" style={{ color: "#78716C" }}>
            <button onClick={() => navigate("/login")} className="text-sm underline underline-offset-2 hover:text-stone-800 transition-colors focus:outline-none focus:ring-2 rounded">
              Já tenho cadastro — entrar
            </button>
          </p>
        </motion.div>

        {/* Card de privacidade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="rounded-xl p-4 flex gap-3 border bg-white"
          style={{ borderColor: "#0F766E22" }}
          role="note"
          aria-label="Informação de privacidade"
        >
          <Lock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0F766E" }} aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold" style={{ color: "#292524" }}>Você controla o que compartilha</p>
            <p className="text-sm mt-0.5 leading-relaxed" style={{ color: "#57534E" }}>
              Dados sensíveis — como relatos, diário e localização — exigem seu consentimento. Nenhuma informação identificável é coletada sem sua permissão.
            </p>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
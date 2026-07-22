import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookHeart, ShieldCheck, Mail, Palette,
  ChevronRight, LogOut, GraduationCap, Wind,
  TrendingUp, Bookmark, Scale, Lock
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { sairDaConta } from "@/lib/sairDaConta";
import { GravuraBroto, DivisorCostura } from "@/components/art/Gravuras";

const FRASES = [
  "Devagar também é caminho.",
  "Toda semente conhece a hora de nascer.",
  "Há força no simples fato de estar aqui.",
  "Cuidar de si também é coragem.",
  "Um dia de cada vez, uma página de cada vez.",
];

function getFraseHoje() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return FRASES[dayOfYear % FRASES.length];
}

const RECURSOS = [
  { icon: BookHeart,    label: "Diário de emoções",           desc: "Registre como você está se sentindo",     path: "/app/diario",    color: "#E8235C", border: "#E8235C33" },
  { icon: ShieldCheck,  label: "Plano de segurança",          desc: "Contatos de confiança e lugar seguro",    path: "/app/plano",     color: "#0D9488", border: "#0D948833" },
  { icon: Mail,         label: "Cartas para mim",             desc: "Escreva uma mensagem para o futuro",      path: "/app/cartas",    color: "#EA580C", border: "#EA580C33" },
  { icon: Palette,      label: "Arte & Escuta",               desc: "Expressão criativa e autocuidado",        path: "/app/arte",      color: "#EA580C", border: "#EA580C33" },
  { icon: GraduationCap,label: "Trilha Recomeço",             desc: "Cursos gratuitos e caminhos para autonomia", path: "/app/trilha", color: "#0D9488", border: "#0D948833" },
  { icon: Wind,         label: "Momento de calma",            desc: "Respiração guiada para momentos difíceis", path: "/app/calma",   color: "#0D9488", border: "#0D948833" },
  { icon: TrendingUp,   label: "Como estou ao longo do tempo",desc: "Veja seus registros de humor",            path: "/app/humor",    color: "#EA580C", border: "#EA580C33" },
  { icon: Bookmark,     label: "Meus salvos",                 desc: "Cursos e conteúdos que você guardou",     path: "/app/salvos",   color: "#0D9488", border: "#0D948833" },
  { icon: Scale,        label: "Meus direitos",               desc: "Informações práticas em linguagem simples",path: "/app/direitos", color: "#0D9488", border: "#0D948833" },
];

export default function MeuEspaco() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  /* Sair volta para a porta do Meu Espaço, que sem sessão mostra "Este espaço
     é privado", com entrar e criar conta. Ver src/lib/sairDaConta.js: o logout
     do SDK levava para o domínio da Base44, fora do nosso site. */
  const handleLogout = () => sairDaConta("/app/meu-espaco");

  return (
    <div className="flex flex-col" style={{ background: "#F8F7FC" }}>
      <main className="flex-1 px-4 pt-14 pb-10 max-w-md mx-auto w-full space-y-6">

        {/* Cabeçalho com marca-d'água */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 flex items-center justify-between relative overflow-hidden"
        >
          <div className="absolute -top-2 -right-4 pointer-events-none" aria-hidden="true">
            <GravuraBroto size={140} color="#0D9488" opacity={0.10} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold" style={{ color: "#1F1B33", fontFamily: "var(--font-lora)" }}>
              Meu espaço
            </h1>
            {user?.full_name && (
              <p className="text-sm mt-0.5" style={{ color: "#4B4667" }}>
                Olá, {user.full_name.split(" ")[0]}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border bg-white hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2"
            style={{ color: "#7C7898", borderColor: "#E7E3F5" }}
            aria-label="Sair da conta"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            Sair
          </button>
        </motion.div>

        {/* Frase do dia */}
        <div className="px-4 py-3 rounded-xl border-l-4" style={{ background: "#EDE7FD", borderLeftColor: "#6D3FD4" }}>
          <p className="text-sm italic leading-relaxed" style={{ color: "#3B1980", fontFamily: "var(--font-lora)" }}>
            "{getFraseHoje()}"
          </p>
        </div>

        {/* Recursos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <p className="text-sm font-semibold" style={{ color: "#4B4667" }}>Seus recursos</p>
          {RECURSOS.map((item, i) => (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-4 rounded-xl px-4 py-4 text-left border bg-white transition-all active:scale-[0.99] focus:outline-none focus:ring-2"
              style={{ borderColor: item.border, minHeight: 64 }}
              aria-label={item.label}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.color + "18" }}>
                <item.icon className="w-5 h-5" style={{ color: item.color }} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base leading-tight" style={{ color: "#1F1B33" }}>{item.label}</p>
                <p className="text-sm mt-0.5" style={{ color: "#4B4667" }}>{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: item.color + "99" }} />
            </motion.button>
          ))}
        </motion.div>

        {/* Divisor */}
        <div className="flex justify-center py-2">
          <DivisorCostura width={180} color="#E7E3F5" />
        </div>

        {/* Nota de privacidade */}
        <div className="flex items-start gap-2.5 rounded-xl px-4 py-3 border bg-white"
          style={{ borderColor: "#0D948822" }}>
          <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#0D9488" }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#4B4667" }}>
            Tudo neste espaço é privado. Profissionais e administração não têm acesso.
          </p>
        </div>

        {/* Voltar ao menu */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigate("/")}
            className="text-sm underline underline-offset-2 focus:outline-none focus:ring-2 rounded"
            style={{ color: "#7C7898" }}
          >
            ← Voltar para a Home
          </button>
        </div>

      </main>
    </div>
  );
}
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell } from "lucide-react";

const MENSAGENS = [
  { emoji: "🌟", texto: "Você está indo muito bem! Continue para ganhar sua próxima medalha." },
  { emoji: "💪", texto: "Falta pouco! Complete o próximo módulo e ganhe +50 XP." },
  { emoji: "🎯", texto: "Sua jornada está progredindo. Cada passo conta!" },
  { emoji: "🌸", texto: "Você merece celebrar sua evolução. Vamos ao próximo módulo?" },
  { emoji: "✨", texto: "Sua determinação é inspiradora. Continue sua Trilha Recomeço!" },
];

export default function NotificacaoIncentivo({ show, onClose }) {
  const [msg] = useState(() => MENSAGENS[Math.floor(Math.random() * MENSAGENS.length)]);

  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 5000);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -80, scale: 0.95 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto"
        >
          <div className="bg-white border border-primary/20 rounded-2xl shadow-xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-primary mb-0.5">Trilha Recomeço</p>
              <p className="text-sm text-foreground leading-snug">
                {msg.emoji} {msg.texto}
              </p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
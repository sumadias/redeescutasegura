import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function ConquistaModal({ conquista, onClose }) {
  useEffect(() => {
    if (conquista) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#8b5cf6", "#ec4899", "#f97316", "#10b981"],
      });
    }
  }, [conquista]);

  return (
    <AnimatePresence>
      {conquista && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="bg-white rounded-3xl p-8 max-w-xs w-full shadow-2xl text-center relative"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>

            {/* Medalha animada */}
            <motion.div
              initial={{ rotate: -15 }}
              animate={{ rotate: [-15, 15, -10, 10, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-7xl mb-4 select-none"
            >
              {conquista.medalha}
            </motion.div>

            <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              🏆 CONQUISTA DESBLOQUEADA
            </div>

            <h2 className="text-xl font-extrabold text-foreground mb-1">{conquista.titulo}</h2>
            <p className="text-sm text-muted-foreground mb-2">{conquista.descricao}</p>

            <div className="flex items-center justify-center gap-1 mb-5">
              <span className="text-amber-500 text-lg">⭐</span>
              <span className="font-extrabold text-lg text-amber-600">+{conquista.xp} XP</span>
            </div>

            <Button onClick={onClose} className="w-full rounded-2xl h-11 font-bold">
              Incrível! Continuar 🚀
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
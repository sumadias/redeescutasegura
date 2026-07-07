import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const NIVEIS = [
  { min: 0, label: "Semente 🌱", cor: "from-green-400 to-emerald-500" },
  { min: 100, label: "Broto 🌿", cor: "from-teal-400 to-cyan-500" },
  { min: 250, label: "Flor 🌸", cor: "from-pink-400 to-rose-500" },
  { min: 500, label: "Árvore 🌳", cor: "from-purple-500 to-violet-600" },
  { min: 800, label: "Estrela ⭐", cor: "from-amber-400 to-orange-500" },
];

function getNivel(xp) {
  for (let i = NIVEIS.length - 1; i >= 0; i--) {
    if (xp >= NIVEIS[i].min) return { ...NIVEIS[i], next: NIVEIS[i + 1] };
  }
  return { ...NIVEIS[0], next: NIVEIS[1] };
}

export default function PainelXP({ xp, conquistas }) {
  const nivel = getNivel(xp);
  const progPercent = nivel.next
    ? Math.round(((xp - nivel.min) / (nivel.next.min - nivel.min)) * 100)
    : 100;

  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/20 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Seu Nível</p>
          <p className="font-extrabold text-lg">{nivel.label}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-sm">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="font-extrabold text-amber-600">{xp} XP</span>
        </div>
      </div>

      {nivel.next && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Próximo: {nivel.next.label}</span>
            <span>{progPercent}%</span>
          </div>
          <div className="h-2.5 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${nivel.cor}`}
            />
          </div>
        </div>
      )}

      {conquistas.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-xs text-muted-foreground">Medalhas:</span>
          {conquistas.map((c, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="text-xl"
              title={c.titulo}
            >
              {c.medalha}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}
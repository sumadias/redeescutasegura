import { motion } from "framer-motion";

export const EMOCOES = [
  { value: "otima",      emoji: "😄", label: "Ótima",       cor: "#10b981", bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-700" },
  { value: "bem",        emoji: "🙂", label: "Bem",         cor: "#3b82f6", bg: "bg-blue-50",    border: "border-blue-400",    text: "text-blue-700" },
  { value: "neutro",     emoji: "😐", label: "Neutro",      cor: "#f59e0b", bg: "bg-amber-50",   border: "border-amber-400",   text: "text-amber-700" },
  { value: "triste",     emoji: "😔", label: "Triste",      cor: "#8b5cf6", bg: "bg-violet-50",  border: "border-violet-400",  text: "text-violet-700" },
  { value: "muito_triste", emoji: "😢", label: "Muito triste", cor: "#ef4444", bg: "bg-red-50", border: "border-red-400",     text: "text-red-700" },
];

export default function SeletorEmocao({ value, onChange }) {
  return (
    <div className="flex justify-between gap-2">
      {EMOCOES.map((e, i) => (
        <motion.button
          key={e.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(e.value)}
          className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl border-2 transition-all ${
            value === e.value
              ? `${e.bg} ${e.border} scale-105 shadow-md`
              : "bg-card border-border hover:bg-muted"
          }`}
        >
          <span className="text-2xl leading-none">{e.emoji}</span>
          <span className={`text-[10px] font-bold leading-tight ${value === e.value ? e.text : "text-muted-foreground"}`}>
            {e.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
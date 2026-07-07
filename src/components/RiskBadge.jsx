import { cn } from "@/lib/utils";

const riskConfig = {
  verde: { label: "Estável", emoji: "🟢", bg: "bg-green-100 text-green-800 border-green-300" },
  amarelo: { label: "Risco Moderado", emoji: "🟡", bg: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  vermelho: { label: "Risco Imediato", emoji: "🔴", bg: "bg-red-100 text-red-800 border-red-300" },
};

export default function RiskBadge({ level, size = "sm" }) {
  const config = riskConfig[level] || riskConfig.verde;
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-semibold",
      config.bg,
      size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-4 py-1.5 text-sm"
    )}>
      <span>{config.emoji}</span>
      {config.label}
    </span>
  );
}
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

const formatTime = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
};

export default function BolhaMensagem({ mensagem, perspectiva = "usuaria" }) {
  const { remetente, conteudo, tipo, created_date } = mensagem;

  const isSistema = remetente === "sistema";
  const isMinhaMsg =
    perspectiva === "usuaria" ? remetente === "usuaria" : remetente === "profissional";

  if (isSistema) {
    return (
      <div className="flex justify-center my-2">
        <div className="flex items-center gap-1.5 bg-muted/60 text-muted-foreground text-xs px-3 py-1.5 rounded-full">
          <Shield className="w-3 h-3" />
          {conteudo}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2 mb-3", isMinhaMsg ? "justify-end" : "justify-start")}>
      {!isMinhaMsg && (
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
          <span className="text-xs font-bold text-primary">
            {perspectiva === "usuaria" ? "P" : "U"}
          </span>
        </div>
      )}

      <div className={cn("max-w-[75%] space-y-0.5", isMinhaMsg && "items-end flex flex-col")}>
        {tipo === "recurso" && (
          <div className={cn(
            "text-xs font-semibold px-2 py-1 rounded-t-lg",
            isMinhaMsg ? "bg-primary/20 text-primary" : "bg-amber-100 text-amber-700"
          )}>
            📎 Recurso compartilhado
          </div>
        )}
        {tipo === "encaminhamento" && (
          <div className="text-xs font-semibold px-2 py-1 rounded-t-lg bg-green-100 text-green-700">
            ➡️ Encaminhamento
          </div>
        )}
        <div className={cn(
          "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
          tipo !== "texto" && "rounded-t-none",
          isMinhaMsg
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card border border-border text-foreground rounded-bl-sm shadow-sm"
        )}>
          {conteudo}
        </div>
        <span className="text-[10px] text-muted-foreground px-1">
          {formatTime(created_date)}
        </span>
      </div>
    </div>
  );
}
import { Clock, Users, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatusFila({ posicao, status, profissionalNome }) {
  if (status === "ativa") {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl text-xs font-semibold text-green-700">
        <Wifi className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />
        Conectado/a com {profissionalNome || "profissional"}
      </div>
    );
  }

  if (status === "encerrada") {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-xl text-xs font-semibold text-muted-foreground">
        Sessão encerrada
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
      <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
      <span className="font-semibold">Aguardando atendimento</span>
      {posicao > 0 && (
        <span className="flex items-center gap-1 ml-auto" aria-label={`Posição ${posicao} na fila`}>
          <Users className="w-3 h-3" aria-hidden="true" />
          {posicao}ª na fila
        </span>
      )}
    </div>
  );
}
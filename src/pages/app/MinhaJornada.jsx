import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import QuickExitButton from "@/components/QuickExitButton";
import { mockJornada } from "@/lib/mockData";
import { getOrCreateAnonymousId } from "@/lib/anonymousId";

const typeConfig = {
  acesso: { color: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  triagem: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  encaminhamento: { color: "bg-purple-100 text-purple-700 border-purple-200", dot: "bg-purple-500" },
  atendimento: { color: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" },
  curso: { color: "bg-pink-100 text-pink-700 border-pink-200", dot: "bg-pink-500" },
};

export default function MinhaJornada() {
  const navigate = useNavigate();
  const anonId = getOrCreateAnonymousId();

  return (
    <div className="min-h-screen bg-background px-4 py-6 pb-20 relative">
      <QuickExitButton />

      <div className="max-w-sm mx-auto space-y-6">
        <button onClick={() => navigate("/app/menu")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground pt-6">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <h1 className="text-xl font-extrabold">Minha Jornada 🕐</h1>

        <Card className="p-4 bg-accent/50 flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">ID protegido</p>
            <p className="text-sm font-bold font-mono">{anonId}</p>
          </div>
        </Card>

        <div className="relative pl-6">
          <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-4">
            {[...mockJornada].reverse().map((item, i) => {
              const config = typeConfig[item.type] || typeConfig.acesso;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  <div className={`absolute -left-6 top-3 w-3 h-3 rounded-full border-2 border-background ${config.dot}`} />
                  <Card className="p-3 ml-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{item.event}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <Badge variant="outline" className={`text-xs shrink-0 ${config.color}`}>
                        {item.type}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Card className="p-4 text-center text-xs text-muted-foreground bg-muted/50">
          <Shield className="w-5 h-5 mx-auto mb-1 text-primary" />
          Seus registros são privados e protegidos por controle de acesso. Nenhum dado identificável é exibido a outras pessoas.
        </Card>
      </div>
    </div>
  );
}
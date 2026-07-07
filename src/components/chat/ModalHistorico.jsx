import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, Download } from "lucide-react";
import BolhaMensagem from "./BolhaMensagem";

function hashSimples(str) {
  // Hash simples para demo — em produção usar bcrypt no backend
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return String(Math.abs(h));
}

export default function ModalHistorico({ open, onClose, sessao, mensagens, perspectiva = "usuaria" }) {
  const [fase, setFase] = useState("senha"); // senha | historico
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [erro, setErro] = useState("");

  const handleDesbloqueio = () => {
    if (!sessao?.senha_historico) {
      // Se não tem senha definida, permite acesso direto para profissional
      if (perspectiva === "profissional") {
        setFase("historico");
        return;
      }
      setErro("Histórico não disponível.");
      return;
    }
    if (hashSimples(senha) === sessao.senha_historico) {
      setFase("historico");
      setErro("");
    } else {
      setErro("Senha incorreta. Tente novamente.");
    }
  };

  const handleFechar = () => {
    setFase("senha");
    setSenha("");
    setErro("");
    onClose();
  };

  const formatDate = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleFechar}>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-5 border-b">
          <DialogTitle className="flex items-center gap-2 text-base">
            <Lock className="w-4 h-4 text-primary" />
            Histórico Protegido
          </DialogTitle>
          {sessao && (
            <div className="text-xs text-muted-foreground mt-1">
              Sessão #{sessao.id?.slice(-8)} • {formatDate(sessao.iniciada_em)}
            </div>
          )}
        </DialogHeader>

        {fase === "senha" ? (
          <div className="p-6 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm font-semibold">Acesso ao histórico protegido</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {perspectiva === "usuaria"
                  ? "Digite a senha que você criou ao iniciar o atendimento."
                  : "Digite a senha de acesso ao histórico desta sessão."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••"
                  className="rounded-xl pr-10"
                  onKeyDown={(e) => e.key === "Enter" && handleDesbloqueio()}
                />
                <button
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {erro && <p className="text-xs text-destructive font-medium">{erro}</p>}
            </div>

            <Button onClick={handleDesbloqueio} className="w-full rounded-xl" disabled={!senha.trim()}>
              Desbloquear Histórico
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 bg-muted/20 space-y-1 min-h-0">
              {mensagens.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-8">Sem mensagens neste histórico</p>
              ) : (
                mensagens.map((msg) => (
                  <BolhaMensagem key={msg.id} mensagem={msg} perspectiva={perspectiva} />
                ))
              )}
            </div>
            <div className="p-4 border-t flex gap-2">
              <Button variant="outline" onClick={handleFechar} className="flex-1 rounded-xl text-sm">
                Fechar
              </Button>
              <Button variant="outline" className="gap-1.5 rounded-xl text-sm">
                <Download className="w-4 h-4" /> Exportar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
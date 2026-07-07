import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, History, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import QuickExitButton from "@/components/QuickExitButton";
import BolhaMensagem from "@/components/chat/BolhaMensagem";
import InputMensagem from "@/components/chat/InputMensagem";
import StatusFila from "@/components/chat/StatusFila";
import ModalHistorico from "@/components/chat/ModalHistorico";
import { useChatSessao } from "@/hooks/useChatSessao";
import { getOrCreateAnonymousId } from "@/lib/anonymousId";

function hashSimples(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return String(Math.abs(h));
}

export default function ChatUsuaria() {
  const navigate = useNavigate();
  const [fase, setFase] = useState("inicio"); // inicio | configurar | chat | encerrado
  const [tipo, setTipo] = useState("social");
  const [anonymousId] = useState(() => getOrCreateAnonymousId());
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroCampos, setErroCampos] = useState("");
  const [sessaoId, setSessaoId] = useState(null);
  const [modalHistorico, setModalHistorico] = useState(false);
  const [sessoeAnteriores, setSessoeAnteriores] = useState([]);
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
  const [msgsSessaoAnt, setMsgsSessaoAnt] = useState([]);
  const bottomRef = useRef(null);

  const { mensagens, sessao, loading, enviarMensagem } = useChatSessao(sessaoId);

  const tipoLabels = {
    social: "👥 Assistente Social",
    psicologico: "🧠 Psicólogo/a",
    juridico: "⚖️ Advogado/a",
  };

  // Auto-scroll para última mensagem
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  // Verifica se foi aceita
  useEffect(() => {
    if (sessao?.status === "ativa" && fase === "chat") {
      // Já está ativa, nada a fazer
    }
    if (sessao?.status === "encerrada" && fase === "chat") {
      setFase("encerrado");
    }
  }, [sessao?.status]);

  const handleIniciarSessao = async () => {
    if (!senha || senha.length < 4) {
      setErroCampos("Crie uma senha com pelo menos 4 caracteres.");
      return;
    }
    if (senha !== confirmarSenha) {
      setErroCampos("As senhas não coincidem.");
      return;
    }
    setErroCampos("");

    // Conta quantos estão aguardando para posição na fila
    const fila = await base44.entities.ChatSessao.filter({ status: "aguardando" });
    const posicao = fila.length + 1;

    const nova = await base44.entities.ChatSessao.create({
      anonymous_id: anonymousId,
      status: "aguardando",
      tipo_atendimento: tipo,
      posicao_fila: posicao,
      senha_historico: hashSimples(senha),
      iniciada_em: new Date().toISOString(),
    });

    // Mensagem de sistema
    await base44.entities.ChatMensagem.create({
      sessao_id: nova.id,
      remetente: "sistema",
      conteudo: `Sessão iniciada. Você está na posição ${posicao} da fila. Um(a) ${tipoLabels[tipo]} responderá em breve.`,
      tipo: "texto",
    });

    setSessaoId(nova.id);
    setFase("chat");
  };

  const handleEnviar = async (texto) => {
    if (sessao?.status === "aguardando") return;
    await enviarMensagem(texto, "usuaria");
  };

  const handleVerHistorico = async () => {
    const anteriores = await base44.entities.ChatSessao.filter(
      { anonymous_id: anonymousId, status: "encerrada" },
      "-created_date",
      10
    );
    setSessoeAnteriores(anteriores);
    setFase("historico");
  };

  const handleAbrirSessao = async (s) => {
    const msgs = await base44.entities.ChatMensagem.filter({ sessao_id: s.id }, "created_date", 200);
    setSessaoSelecionada(s);
    setMsgsSessaoAnt(msgs);
    setModalHistorico(true);
  };

  const formatDate = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="h-screen bg-background flex flex-col relative">
      <QuickExitButton />

      {/* Header */}
      <div className="px-4 py-3 border-b bg-card flex items-center gap-3 shrink-0">
        <button onClick={() => fase === "historico" ? setFase("inicio") : navigate("/app/menu")} className="p-1 hover:bg-muted rounded-lg transition-colors mt-5">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 mt-5">
          <h1 className="font-extrabold text-sm">
            {fase === "chat" ? "Chat ao Vivo" : fase === "historico" ? "Histórico" : "Atendimento Online"}
          </h1>
          {sessao && fase === "chat" && (
            <StatusFila posicao={sessao.posicao_fila} status={sessao.status} profissionalNome={sessao.profissional_nome} />
          )}
        </div>
        {fase === "inicio" && (
          <button onClick={handleVerHistorico} className="mt-5 flex items-center gap-1.5 text-xs text-primary font-semibold">
            <History className="w-4 h-4" /> Histórico
          </button>
        )}
      </div>

      {/* FASE: INÍCIO */}
      <AnimatePresence mode="wait">
        {fase === "inicio" && (
          <motion.div
            key="inicio"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto px-4 py-6 space-y-5 max-w-sm mx-auto w-full"
          >
            <Card className="p-5 bg-accent/40 border-primary/20 border-2 space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <p className="text-sm font-bold text-primary">Atendimento Sigiloso</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Você será identificado(a) apenas pelo seu ID anônimo. Crie uma senha para proteger o histórico desta conversa.
              </p>
            </Card>

            <Button onClick={() => setFase("configurar")} className="w-full h-12 rounded-xl text-base gap-2">
              💬 Iniciar Atendimento
            </Button>

            <div className="grid grid-cols-3 gap-2 text-center">
              {Object.entries(tipoLabels).map(([k, v]) => (
                <Card key={k} className="p-3 space-y-1 cursor-pointer hover:border-primary transition-colors" onClick={() => { setTipo(k); setFase("configurar"); }}>
                  <div className="text-2xl">{v.split(" ")[0]}</div>
                  <p className="text-xs font-semibold text-muted-foreground">{v.split(" ").slice(1).join(" ")}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* FASE: CONFIGURAR */}
        {fase === "configurar" && (
          <motion.div
            key="configurar"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto px-4 py-6 space-y-5 max-w-sm mx-auto w-full"
          >
            <h2 className="font-extrabold text-base">Configure seu atendimento</h2>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Tipo de apoio</label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social">👥 Assistente Social</SelectItem>
                  <SelectItem value="psicologico">🧠 Psicólogo/a</SelectItem>
                  <SelectItem value="juridico">⚖️ Advogado/a</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Crie uma senha para o histórico</label>
              <Input
                type="password"
                placeholder="Mínimo 4 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Confirme a senha</label>
              <Input
                type="password"
                placeholder="Repita a senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="rounded-xl"
                onKeyDown={(e) => e.key === "Enter" && handleIniciarSessao()}
              />
              {erroCampos && <p className="text-xs text-destructive font-medium">{erroCampos}</p>}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setFase("inicio")} className="flex-1 rounded-xl">Voltar</Button>
              <Button onClick={handleIniciarSessao} className="flex-1 rounded-xl">Entrar na Fila</Button>
            </div>
          </motion.div>
        )}

        {/* FASE: CHAT */}
        {fase === "chat" && (
          <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col min-h-0">
            {sessao?.status === "aguardando" && (
              <div className="p-3 bg-amber-50 border-b border-amber-200 text-center text-xs text-amber-800 font-medium space-y-2">
                <p><span aria-hidden="true">⏳</span> Aguardando profissional disponível...</p>
                <p className="text-amber-700 text-xs">Enquanto isso, você pode:</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <a href="tel:180" className="underline font-bold">Ligar 180</a>
                  <span aria-hidden="true">·</span>
                  <a href="/app/mapa" className="underline font-bold">Ver serviços próximos</a>
                  <span aria-hidden="true">·</span>
                  <a href="/app/agendamento" className="underline font-bold">Agendar</a>
                </div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-muted/10">
              {mensagens.map((msg) => (
                <BolhaMensagem key={msg.id} mensagem={msg} perspectiva="usuaria" />
              ))}
              <div ref={bottomRef} />
            </div>
            <InputMensagem
              onEnviar={handleEnviar}
              disabled={sessao?.status !== "ativa"}
              placeholder={sessao?.status === "aguardando" ? "Aguardando profissional..." : "Digite sua mensagem..."}
            />
          </motion.div>
        )}

        {/* FASE: ENCERRADO */}
        {fase === "encerrado" && (
          <motion.div
            key="encerrado"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center px-6 space-y-5 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-lg font-extrabold">Atendimento encerrado</h2>
            <p className="text-sm text-muted-foreground">Obrigado(a) por buscar apoio. Cuide-se! <span aria-hidden="true">💜</span></p>
            <Button onClick={() => setFase("historico")} variant="outline" className="rounded-xl gap-2">
              <History className="w-4 h-4" /> Ver Histórico
            </Button>
            <Button onClick={() => navigate("/app/menu")} className="rounded-xl w-full">
              Voltar ao início
            </Button>
          </motion.div>
        )}

        {/* FASE: HISTÓRICO */}
        {fase === "historico" && (
          <motion.div key="historico" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {sessoeAnteriores.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                <History className="w-10 h-10 mx-auto mb-3 opacity-40" />
                Nenhum histórico encontrado para este ID.
              </div>
            ) : (
              sessoeAnteriores.map((s) => (
                <Card key={s.id} className="p-4 space-y-2 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleAbrirSessao(s)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold">
                        {s.tipo_atendimento === "psicologico" ? "🧠 Psicológico" : s.tipo_atendimento === "juridico" ? "⚖️ Jurídico" : "👥 Social"}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatDate(s.iniciada_em)}</p>
                    </div>
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  {s.profissional_nome && (
                    <p className="text-xs text-primary font-medium">Profissional: {s.profissional_nome}</p>
                  )}
                </Card>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ModalHistorico
        open={modalHistorico}
        onClose={() => setModalHistorico(false)}
        sessao={sessaoSelecionada}
        mensagens={msgsSessaoAnt}
        perspectiva="usuaria"
      />
    </div>
  );
}
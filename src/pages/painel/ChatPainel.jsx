import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  MessageCircle, Users, Clock, CheckCircle2, PhoneOff, History, Send,
  RefreshCw, ArrowRight, Shield, Star, AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BolhaMensagem from "@/components/chat/BolhaMensagem";
import InputMensagem from "@/components/chat/InputMensagem";
import ModalHistorico from "@/components/chat/ModalHistorico";
import { useChatSessao } from "@/hooks/useChatSessao";
import { useFila } from "@/hooks/useFila";

const PROFISSIONAL_DEMO = {
  id: "prof-001",
  nome: "Dra. Ana Beatriz",
  especialidade: "Psicóloga Clínica",
};

const tipoLabel = {
  social: { label: "Assistente Social", color: "bg-blue-100 text-blue-800 border-blue-300", emoji: "👥" },
  psicologico: { label: "Psicológico", color: "bg-purple-100 text-purple-800 border-purple-300", emoji: "🧠" },
  juridico: { label: "Jurídico", color: "bg-amber-100 text-amber-800 border-amber-300", emoji: "⚖️" },
};

const statusColor = {
  aguardando: "bg-amber-100 text-amber-800 border-amber-300",
  ativa: "bg-green-100 text-green-800 border-green-300",
  encerrada: "bg-gray-100 text-gray-600 border-gray-300",
};

function CardFila({ sessao, onAceitar, onVerHistorico, selecionada }) {
  const tipo = tipoLabel[sessao.tipo_atendimento] || tipoLabel.social;
  const tempoEspera = sessao.iniciada_em
    ? Math.round((Date.now() - new Date(sessao.iniciada_em).getTime()) / 60000)
    : 0;

  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
      <Card
        className={`p-4 space-y-3 cursor-pointer transition-all border-2 ${selecionada ? "border-primary bg-accent/30" : "border-transparent hover:border-border"}`}
        onClick={() => onVerHistorico && onVerHistorico(sessao)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{tipo.emoji}</span>
            <div>
              <p className="text-xs font-bold text-foreground font-mono">{sessao.anonymous_id}</p>
              <p className="text-xs text-muted-foreground">{tipo.label}</p>
            </div>
          </div>
          <Badge variant="outline" className={`text-xs ${statusColor[sessao.status]}`}>
            {sessao.status === "aguardando" ? "Na fila" : sessao.status === "ativa" ? "Ativo" : "Encerrado"}
          </Badge>
        </div>

        {sessao.status === "aguardando" && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {tempoEspera}min aguardando
            </span>
            <Button
              size="sm"
              className="h-7 text-xs rounded-lg gap-1 px-3"
              onClick={(e) => { e.stopPropagation(); onAceitar(sessao); }}
            >
              <ArrowRight className="w-3 h-3" /> Aceitar
            </Button>
          </div>
        )}

        {sessao.status === "ativa" && sessao.profissional_nome && (
          <p className="text-xs text-green-700 font-medium">
            ✓ Em atendimento com {sessao.profissional_nome}
          </p>
        )}
      </Card>
    </motion.div>
  );
}

// Painel de chat ativo com uma sessão
function PainelChatAtivo({ sessaoId, onEncerrar, profissional }) {
  const { mensagens, sessao, enviarMensagem } = useChatSessao(sessaoId);
  const [modalEnc, setModalEnc] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0);
  const [observacoes, setObservacoes] = useState("");
  const [recursoTexto, setRecursoTexto] = useState("");
  const [showRecurso, setShowRecurso] = useState(false);
  const [modalHistorico, setModalHistorico] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const handleEnviar = async (texto) => {
    await enviarMensagem(texto, "profissional");
  };

  const handleEnviarRecurso = async () => {
    if (!recursoTexto.trim()) return;
    await enviarMensagem(recursoTexto, "profissional", "recurso");
    setRecursoTexto("");
    setShowRecurso(false);
  };

  const handleEncerrar = async () => {
    await base44.entities.ChatSessao.update(sessaoId, {
      status: "encerrada",
      encerrada_em: new Date().toISOString(),
      avaliacao,
      observacoes_profissional: observacoes,
    });
    await base44.entities.ChatMensagem.create({
      sessao_id: sessaoId,
      remetente: "sistema",
      conteudo: "Atendimento encerrado pelo profissional. Obrigada por confiar no Rede Escuta Segura 💜",
      tipo: "texto",
    });
    setModalEnc(false);
    onEncerrar();
  };

  if (!sessao) return (
    <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
      Carregando sessão...
    </div>
  );

  const tipo = tipoLabel[sessao.tipo_atendimento] || tipoLabel.social;

  return (
    <div className="flex flex-col h-full">
      {/* Header da sessão ativa */}
      <div className="px-4 py-3 border-b bg-card flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-lg">
          {tipo.emoji}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold font-mono">{sessao.anonymous_id}</p>
          <Badge variant="outline" className={`text-xs ${tipo.color}`}>{tipo.label}</Badge>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg gap-1" onClick={() => setModalHistorico(true)}>
            <History className="w-3 h-3" /> Histórico
          </Button>
          <Button size="sm" variant="destructive" className="h-8 text-xs rounded-lg gap-1" onClick={() => setModalEnc(true)}>
            <PhoneOff className="w-3 h-3" /> Encerrar
          </Button>
        </div>
      </div>

      {/* Ações rápidas */}
      <div className="px-3 py-2 border-b flex gap-2 overflow-x-auto">
        <button
          onClick={() => setShowRecurso(!showRecurso)}
          className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/80 transition-colors"
        >
          📎 Compartilhar recurso
        </button>
        <button
          onClick={() => enviarMensagem("Vou encaminhar você para um serviço especializado.", "profissional", "encaminhamento")}
          className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-green-50 text-green-700 font-medium hover:bg-green-100 transition-colors border border-green-200"
        >
          ➡️ Fazer encaminhamento
        </button>
        <button
          onClick={() => enviarMensagem("Caso precise de ajuda imediata, ligue agora para o 180 (gratuito, 24h).", "profissional")}
          className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors border border-red-200"
        >
          📞 Informar 180
        </button>
      </div>

      {/* Campo de recurso */}
      <AnimatePresence>
        {showRecurso && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-3 py-2 border-b overflow-hidden">
            <div className="flex gap-2">
              <Textarea
                value={recursoTexto}
                onChange={(e) => setRecursoTexto(e.target.value)}
                placeholder="Descreva o recurso ou cole o link..."
                className="rounded-lg text-xs min-h-[60px] resize-none"
              />
              <Button size="sm" onClick={handleEnviarRecurso} className="rounded-lg self-end">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-muted/10">
        {mensagens.map((msg) => (
          <BolhaMensagem key={msg.id} mensagem={msg} perspectiva="profissional" />
        ))}
        <div ref={bottomRef} />
      </div>

      <InputMensagem onEnviar={handleEnviar} placeholder="Responder à pessoa atendida..." />

      {/* Modal encerrar */}
      <Dialog open={modalEnc} onOpenChange={setModalEnc}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Encerrar Atendimento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Avaliação do atendimento</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAvaliacao(v)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${avaliacao >= v ? "bg-amber-400 text-white" : "bg-muted"}`}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Observações (uso interno)</label>
              <Textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Resumo do atendimento, próximos passos..."
                className="rounded-xl min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalEnc(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleEncerrar}>Encerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ModalHistorico
        open={modalHistorico}
        onClose={() => setModalHistorico(false)}
        sessao={sessao}
        mensagens={mensagens}
        perspectiva="profissional"
      />
    </div>
  );
}

// Componente principal
export default function ChatPainel() {
  const { aguardando, ativas, loading, refetch } = useFila();
  const [sessaoAtiva, setSessaoAtiva] = useState(null); // sessão sendo atendida AGORA
  const [view, setView] = useState("fila"); // fila | chat
  const [histSessao, setHistSessao] = useState(null);
  const [histMsgs, setHistMsgs] = useState([]);
  const [modalHist, setModalHist] = useState(false);
  const [encerradas, setEncerradas] = useState([]);
  const [loadingEnc, setLoadingEnc] = useState(false);

  const minhasAtivas = ativas.filter(s => s.profissional_id === PROFISSIONAL_DEMO.id);

  const handleAceitar = async (sessao) => {
    await base44.entities.ChatSessao.update(sessao.id, {
      status: "ativa",
      profissional_id: PROFISSIONAL_DEMO.id,
      profissional_nome: PROFISSIONAL_DEMO.nome,
      profissional_especialidade: PROFISSIONAL_DEMO.especialidade,
    });
    await base44.entities.ChatMensagem.create({
      sessao_id: sessao.id,
      remetente: "sistema",
      conteudo: `${PROFISSIONAL_DEMO.nome} entrou no atendimento. Você pode começar a escrever.`,
      tipo: "texto",
    });
    setSessaoAtiva(sessao.id);
    setView("chat");
    refetch();
  };

  const handleEncerrarAtivo = () => {
    setSessaoAtiva(null);
    setView("fila");
    refetch();
  };

  const handleVerHistorico = async (s) => {
    const msgs = await base44.entities.ChatMensagem.filter({ sessao_id: s.id }, "created_date", 200);
    setHistSessao(s);
    setHistMsgs(msgs);
    setModalHist(true);
  };

  const handleCarregarEncerradas = async () => {
    setLoadingEnc(true);
    const enc = await base44.entities.ChatSessao.filter({ status: "encerrada" }, "-created_date", 20);
    setEncerradas(enc);
    setLoadingEnc(false);
  };

  const totalEspera = aguardando.length;

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* SIDEBAR - Fila */}
      <div className={`${view === "chat" ? "hidden lg:flex" : "flex"} flex-col lg:w-80 border-r border-border bg-card`}>
        {/* Header fila */}
        <div className="p-4 border-b space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-base flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" /> Chat ao Vivo
            </h2>
            <button onClick={refetch} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <Card className="p-2">
              <p className="text-xl font-extrabold text-amber-600">{totalEspera}</p>
              <p className="text-xs text-muted-foreground">Na fila</p>
            </Card>
            <Card className="p-2">
              <p className="text-xl font-extrabold text-green-600">{ativas.length}</p>
              <p className="text-xs text-muted-foreground">Em atend.</p>
            </Card>
          </div>

          {sessaoAtiva && (
            <Button
              size="sm"
              className="w-full rounded-xl gap-2 text-xs"
              onClick={() => setView("chat")}
            >
              <MessageCircle className="w-3.5 h-3.5" /> Voltar ao chat ativo
            </Button>
          )}
        </div>

        {/* Tabs fila / encerradas */}
        <div className="flex border-b">
          {[
            { id: "aguardando", label: `Fila (${aguardando.length})` },
            { id: "ativas", label: `Ativas (${ativas.length})` },
            { id: "encerradas", label: "Histórico" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => { if (t.id === "encerradas") handleCarregarEncerradas(); }}
              className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${t.id === "aguardando" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {aguardando.length === 0 && ativas.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <Users className="w-10 h-10 mx-auto text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">Nenhuma pessoa aguardando</p>
                </div>
              ) : (
                <>
                  {aguardando.map((s) => (
                    <CardFila key={s.id} sessao={s} onAceitar={handleAceitar} onVerHistorico={handleVerHistorico} selecionada={sessaoAtiva === s.id} />
                  ))}
                  {ativas.map((s) => (
                    <CardFila key={s.id} sessao={s} onAceitar={() => { setSessaoAtiva(s.id); setView("chat"); }} onVerHistorico={handleVerHistorico} selecionada={sessaoAtiva === s.id} />
                  ))}
                  {encerradas.map((s) => (
                    <CardFila key={s.id} sessao={s} onVerHistorico={handleVerHistorico} selecionada={false} />
                  ))}
                </>
              )}
            </>
          )}
        </div>

        <div className="p-3 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>Atendendo como: <strong>{PROFISSIONAL_DEMO.nome}</strong></span>
          </div>
        </div>
      </div>

      {/* ÁREA PRINCIPAL */}
      <div className={`${view === "fila" ? "hidden lg:flex" : "flex"} flex-1 flex-col min-h-0`}>
        {sessaoAtiva ? (
          <PainelChatAtivo
            sessaoId={sessaoAtiva}
            onEncerrar={handleEncerrarAtivo}
            profissional={PROFISSIONAL_DEMO}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-extrabold">Módulo de Chat</h2>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Aceite um atendimento da fila ao lado para iniciar uma conversa em tempo real com a pessoa atendida.
            </p>
            {totalEspera > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                {totalEspera} pessoa{totalEspera > 1 ? "s" : ""} aguardando atendimento
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botão voltar no mobile quando em chat */}
      {view === "chat" && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-2 bg-card border-b flex items-center gap-2">
          <button onClick={() => setView("fila")} className="flex items-center gap-1 text-sm text-muted-foreground">
            ← Fila
          </button>
        </div>
      )}

      <ModalHistorico
        open={modalHist}
        onClose={() => setModalHist(false)}
        sessao={histSessao}
        mensagens={histMsgs}
        perspectiva="profissional"
      />
    </div>
  );
}
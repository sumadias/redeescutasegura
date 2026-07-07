import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Clock, User, RefreshCw, CheckCircle, X, Bell, ChevronLeft, ChevronRight } from "lucide-react";

const STATUS_COLORS = {
  agendada: "bg-amber-100 text-amber-700 border-amber-200",
  confirmada: "bg-blue-100 text-blue-700 border-blue-200",
  realizada: "bg-green-100 text-green-700 border-green-200",
  cancelada: "bg-red-100 text-red-700 border-red-200",
};

const TIPO_LABELS = { psicologico: "Psicológico", juridico: "Jurídico", social: "Social" };
const TIPO_COLORS = { psicologico: "bg-purple-100 text-purple-700", juridico: "bg-blue-100 text-blue-700", social: "bg-green-100 text-green-700" };

function getWeekDays(base) {
  const monday = new Date(base);
  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff);
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

export default function Agenda() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekBase, setWeekBase] = useState(new Date());
  const [updating, setUpdating] = useState(null);

  const dias = getWeekDays(weekBase);

  useEffect(() => {
    loadConsultas();
  }, []);

  async function loadConsultas() {
    setLoading(true);
    const data = await base44.entities.Consulta.list("-data", 100);
    setConsultas(data);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    setUpdating(id);
    await base44.entities.Consulta.update(id, { status });
    setConsultas(c => c.map(x => x.id === id ? { ...x, status } : x));
    setUpdating(null);
  }

  async function enviarLembrete(consulta) {
    if (!consulta.email_contato) return;
    setUpdating(consulta.id);
    await base44.integrations.Core.SendEmail({
      to: consulta.email_contato,
      subject: "⏰ Lembrete de consulta — Rede Escuta Segura",
      body: `Olá!\n\nEste é um lembrete da sua consulta agendada para amanhã.\n\n📅 Data: ${consulta.data}\n⏰ Horário: ${consulta.horario}\n👩‍⚕️ Profissional: ${consulta.profissional_nome}\n💻 Modalidade: ${consulta.modalidade === "online" ? "Online" : "Presencial"}\n\nRede Escuta Segura — Campina Grande/PB`
    });
    await base44.entities.Consulta.update(consulta.id, { lembrete_enviado: true });
    setConsultas(c => c.map(x => x.id === consulta.id ? { ...x, lembrete_enviado: true } : x));
    setUpdating(null);
  }

  const agendadas = consultas.filter(c => c.status !== "cancelada" && c.status !== "realizada");
  const historico = consultas.filter(c => c.status === "realizada" || c.status === "cancelada");

  function consultasNoDia(d) {
    return agendadas.filter(c => c.data === toISODate(d));
  }

  const hoje = toISODate(new Date());
  const semanaLabel = `${dias[0].toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} — ${dias[4].toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}`;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Agenda</h1>
            <p className="text-sm text-muted-foreground">Consultas agendadas e histórico</p>
          </div>
          <Button variant="outline" size="sm" onClick={loadConsultas}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        <Tabs defaultValue="semana">
          <TabsList>
            <TabsTrigger value="semana">Semana</TabsTrigger>
            <TabsTrigger value="lista">Lista</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          {/* VISÃO SEMANAL */}
          <TabsContent value="semana" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <button onClick={() => { const d = new Date(weekBase); d.setDate(d.getDate() - 7); setWeekBase(d); }} className="p-1 hover:bg-accent rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-bold">{semanaLabel}</span>
              <button onClick={() => { const d = new Date(weekBase); d.setDate(d.getDate() + 7); setWeekBase(d); }} className="p-1 hover:bg-accent rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {dias.map((d, i) => {
                const isHoje = toISODate(d) === hoje;
                const cts = consultasNoDia(d);
                return (
                  <div key={i} className={`rounded-xl border-2 p-2 min-h-[120px] ${isHoje ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                    <div className="text-center mb-2">
                      <p className="text-xs text-muted-foreground capitalize">{d.toLocaleDateString("pt-BR", { weekday: "short" })}</p>
                      <p className={`text-lg font-extrabold ${isHoje ? "text-primary" : ""}`}>{d.getDate()}</p>
                    </div>
                    <div className="space-y-1">
                      {cts.map(c => (
                        <div key={c.id} className={`text-xs p-1 rounded-lg font-bold truncate ${TIPO_COLORS[c.tipo]}`}>
                          {c.horario} {c.profissional_nome?.split(" ")[0]}
                        </div>
                      ))}
                      {cts.length === 0 && <p className="text-xs text-muted-foreground/50 text-center">—</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* LISTA */}
          <TabsContent value="lista" className="mt-4 space-y-3">
            {loading && <p className="text-sm text-muted-foreground text-center py-8">Carregando...</p>}
            {!loading && agendadas.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nenhuma consulta agendada</p>
              </div>
            )}
            {agendadas.sort((a,b) => a.data > b.data ? 1 : -1).map(c => (
              <Card key={c.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-xs ${TIPO_COLORS[c.tipo]}`}>{TIPO_LABELS[c.tipo]}</Badge>
                      <Badge className={`text-xs border ${STATUS_COLORS[c.status]}`}>{c.status}</Badge>
                      {c.recorrente && <Badge variant="outline" className="text-xs gap-1"><RefreshCw className="w-3 h-3" />{c.frequencia}</Badge>}
                    </div>
                    <p className="font-bold text-sm">{c.profissional_nome}</p>
                    <p className="text-xs text-muted-foreground">{c.profissional_especialidade}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-sm font-bold">
                      <Calendar className="w-4 h-4 text-primary" />
                      {new Date(c.data + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {c.horario}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {c.status === "agendada" && (
                    <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => updateStatus(c.id, "confirmada")} disabled={updating === c.id}>
                      <CheckCircle className="w-3 h-3 mr-1" /> Confirmar
                    </Button>
                  )}
                  {(c.status === "agendada" || c.status === "confirmada") && (
                    <>
                      <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => updateStatus(c.id, "realizada")} disabled={updating === c.id}>
                        <CheckCircle className="w-3 h-3 mr-1 text-green-600" /> Realizada
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-7 text-destructive hover:text-destructive" onClick={() => updateStatus(c.id, "cancelada")} disabled={updating === c.id}>
                        <X className="w-3 h-3 mr-1" /> Cancelar
                      </Button>
                    </>
                  )}
                  {c.email_contato && !c.lembrete_enviado && (
                    <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => enviarLembrete(c)} disabled={updating === c.id}>
                      <Bell className="w-3 h-3 mr-1" /> Enviar lembrete
                    </Button>
                  )}
                  {c.lembrete_enviado && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Bell className="w-3 h-3" />Lembrete enviado</span>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* HISTÓRICO */}
          <TabsContent value="historico" className="mt-4 space-y-3">
            {historico.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nenhuma consulta no histórico ainda</p>
              </div>
            )}
            {historico.sort((a,b) => a.data < b.data ? 1 : -1).map(c => (
              <Card key={c.id} className="p-4 opacity-80">
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs border ${STATUS_COLORS[c.status]}`}>{c.status}</Badge>
                      <Badge className={`text-xs ${TIPO_COLORS[c.tipo]}`}>{TIPO_LABELS[c.tipo]}</Badge>
                    </div>
                    <p className="font-bold text-sm">{c.profissional_nome}</p>
                    <p className="text-xs text-muted-foreground">{c.anonymous_id}</p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{new Date(c.data + "T12:00:00").toLocaleDateString("pt-BR")}</p>
                    <p>{c.horario}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, CheckCircle, RefreshCw, Mail, ChevronRight } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";

const TIPOS = [
  { value: "psicologico", label: "Psicológico", emoji: "🧠", desc: "Apoio emocional e saúde mental" },
  { value: "juridico", label: "Jurídico", emoji: "⚖️", desc: "Orientação legal e direitos" },
  { value: "social", label: "Social", emoji: "🤝", desc: "Assistência social e encaminhamentos" },
];

const HORARIOS = ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"];

const FREQS = [
  { value: "semanal", label: "Toda semana" },
  { value: "quinzenal", label: "A cada 2 semanas" },
  { value: "mensal", label: "Todo mês" },
];

function getProximosDias(n = 14) {
  const dias = [];
  const hoje = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(hoje);
    d.setDate(hoje.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dias.push(d);
    }
  }
  return dias;
}

function formatDate(d) {
  return d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
}

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

export default function Agendamento() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profissionais, setProfissionais] = useState([]);
  const [form, setForm] = useState({
    tipo: "",
    profissional: null,
    data: null,
    horario: "",
    modalidade: "online",
    recorrente: false,
    frequencia: "semanal",
    email_contato: "",
  });
  const [loading, setLoading] = useState(false);
  const [consultaId, setConsultaId] = useState(null);
  const dias = getProximosDias(14);

  useEffect(() => {
    if (step === 2 && form.tipo) {
      base44.entities.Profissional.filter({ available: true }).then(setProfissionais);
    }
  }, [step, form.tipo]);

  const profFiltrados = profissionais.filter(p => {
    if (form.tipo === "psicologico") return p.specialty?.toLowerCase().includes("psic");
    if (form.tipo === "juridico") return p.specialty?.toLowerCase().includes("juríd") || p.specialty?.toLowerCase().includes("jurid") || p.specialty?.toLowerCase().includes("adv");
    return true;
  });

  async function confirmar() {
    setLoading(true);
    const anonId = "ESC-" + Math.floor(Math.random() * 9000 + 1000);
    const record = await base44.entities.Consulta.create({
      anonymous_id: anonId,
      profissional_id: form.profissional.id,
      profissional_nome: form.profissional.name,
      profissional_especialidade: form.profissional.specialty,
      data: toISODate(form.data),
      horario: form.horario,
      tipo: form.tipo,
      modalidade: form.modalidade,
      recorrente: form.recorrente,
      frequencia: form.recorrente ? form.frequencia : undefined,
      status: "agendada",
      email_contato: form.email_contato || undefined,
    });
    if (form.email_contato) {
      await base44.integrations.Core.SendEmail({
        to: form.email_contato,
        subject: "✅ Consulta agendada — Rede Escuta Segura",
        body: `Olá!\n\nSua consulta foi agendada com sucesso.\n\n📅 Data: ${form.data.toLocaleDateString("pt-BR")}\n⏰ Horário: ${form.horario}\n👩‍⚕️ Profissional: ${form.profissional.name} (${form.profissional.specialty})\n💻 Modalidade: ${form.modalidade === "online" ? "Online" : "Presencial"}\n${form.recorrente ? `🔁 Recorrência: ${FREQS.find(f => f.value === form.frequencia)?.label}\n` : ""}\nLembrete: enviaremos um aviso 24h antes.\n\nRede Escuta Segura — Campina Grande/PB`
      });
    }
    setConsultaId(record.id);
    setLoading(false);
    setStep(5);
  }

  return (
    <div className="min-h-screen bg-background relative">
      <QuickExitButton />

      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => step > 1 ? setStep(s => s - 1) : navigate("/app/menu")} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-bold">Agendar Consulta</h1>
          <div className="flex gap-1 mt-1">
            {[1,2,3,4].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-sm mx-auto px-4 py-6">
        <AnimatePresence mode="wait">

          {/* STEP 1 — Tipo */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
              <div>
                <h2 className="text-lg font-extrabold">Que tipo de apoio você precisa?</h2>
                <p className="text-sm text-muted-foreground mt-1">Escolha a área de atendimento</p>
              </div>
              {TIPOS.map(t => (
                <button key={t.value} onClick={() => { setForm(f => ({ ...f, tipo: t.value })); setStep(2); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-border hover:border-primary bg-card hover:bg-accent/30 transition-all text-left">
                  <span className="text-3xl">{t.emoji}</span>
                  <div>
                    <p className="font-bold text-sm">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </button>
              ))}
            </motion.div>
          )}

          {/* STEP 2 — Profissional */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
              <div>
                <h2 className="text-lg font-extrabold">Escolha a profissional</h2>
                <p className="text-sm text-muted-foreground mt-1">Disponíveis para atendimento</p>
              </div>
              {profFiltrados.length === 0 && profissionais.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">Carregando...</p>
              )}
              {profFiltrados.length === 0 && profissionais.length > 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">Nenhuma profissional disponível para esta área no momento.</p>
              )}
              {profFiltrados.map(p => (
                <button key={p.id} onClick={() => { setForm(f => ({ ...f, profissional: p })); setStep(3); }}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-border hover:border-primary bg-card hover:bg-accent/30 transition-all text-left">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{p.specialty}</p>
                    <p className="text-xs text-muted-foreground">{p.institution}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </motion.div>
          )}

          {/* STEP 3 — Data e Horário */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
              <div>
                <h2 className="text-lg font-extrabold">Quando você prefere?</h2>
                <p className="text-sm text-muted-foreground mt-1">Selecione data e horário</p>
              </div>

              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Data</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dias.map((d, i) => (
                    <button key={i} onClick={() => setForm(f => ({ ...f, data: d }))}
                      className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl border-2 text-xs transition-all ${form.data && toISODate(form.data) === toISODate(d) ? "border-primary bg-primary text-white" : "border-border bg-card hover:border-primary/50"}`}>
                      <span className="font-bold capitalize">{d.toLocaleDateString("pt-BR", { weekday: "short" })}</span>
                      <span className="text-lg font-extrabold">{d.getDate()}</span>
                      <span className="capitalize">{d.toLocaleDateString("pt-BR", { month: "short" })}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Horário</p>
                <div className="grid grid-cols-4 gap-2">
                  {HORARIOS.map(h => (
                    <button key={h} onClick={() => setForm(f => ({ ...f, horario: h }))}
                      className={`py-2 rounded-xl border-2 text-xs font-bold transition-all ${form.horario === h ? "border-primary bg-primary text-white" : "border-border bg-card hover:border-primary/50"}`}>
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Modalidade</p>
                <div className="flex gap-2">
                  {["online","presencial"].map(m => (
                    <button key={m} onClick={() => setForm(f => ({ ...f, modalidade: m }))}
                      className={`flex-1 py-2 rounded-xl border-2 text-xs font-bold capitalize transition-all ${form.modalidade === m ? "border-primary bg-primary text-white" : "border-border bg-card hover:border-primary/50"}`}>
                      {m === "online" ? "💻 Online" : "🏢 Presencial"}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full" disabled={!form.data || !form.horario} onClick={() => setStep(4)}>
                Continuar
              </Button>
            </motion.div>
          )}

          {/* STEP 4 — Recorrência + Confirmação */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
              <div>
                <h2 className="text-lg font-extrabold">Confirmar agendamento</h2>
              </div>

              {/* Resumo */}
              <div className="bg-accent/30 rounded-2xl p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Tipo</span><span className="font-bold capitalize">{TIPOS.find(t=>t.value===form.tipo)?.label}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Profissional</span><span className="font-bold">{form.profissional?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Data</span><span className="font-bold">{form.data?.toLocaleDateString("pt-BR")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Horário</span><span className="font-bold">{form.horario}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Modalidade</span><span className="font-bold capitalize">{form.modalidade}</span></div>
              </div>

              {/* Recorrência */}
              <div className="space-y-3">
                <button onClick={() => setForm(f => ({ ...f, recorrente: !f.recorrente }))}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${form.recorrente ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                  <RefreshCw className={`w-5 h-5 ${form.recorrente ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-left">
                    <p className="font-bold text-sm">Consulta recorrente</p>
                    <p className="text-xs text-muted-foreground">Repetir automaticamente</p>
                  </div>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.recorrente ? "border-primary bg-primary" : "border-border"}`}>
                    {form.recorrente && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>

                {form.recorrente && (
                  <div className="grid grid-cols-3 gap-2">
                    {FREQS.map(f => (
                      <button key={f.value} onClick={() => setForm(fm => ({ ...fm, frequencia: f.value }))}
                        className={`py-2 px-1 rounded-xl border-2 text-xs font-bold text-center transition-all ${form.frequencia === f.value ? "border-primary bg-primary text-white" : "border-border bg-card hover:border-primary/50"}`}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Email lembrete */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase">Lembrete por e-mail (opcional)</p>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email_contato}
                    onChange={e => setForm(f => ({ ...f, email_contato: e.target.value }))}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Enviaremos uma confirmação e lembrete 24h antes.</p>
              </div>

              <Button className="w-full" onClick={confirmar} disabled={loading}>
                {loading ? "Agendando..." : "Confirmar Agendamento"}
              </Button>
            </motion.div>
          )}

          {/* STEP 5 — Sucesso */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold">Consulta agendada! 💜</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {form.data?.toLocaleDateString("pt-BR")} às {form.horario} com {form.profissional?.name}
                </p>
                {form.recorrente && (
                  <Badge className="mt-2 bg-primary/10 text-primary border-primary/20">
                    🔁 Recorrente — {FREQS.find(f=>f.value===form.frequencia)?.label}
                  </Badge>
                )}
                {form.email_contato && (
                  <p className="text-xs text-muted-foreground mt-3">📧 Confirmação enviada para {form.email_contato}</p>
                )}
              </div>
              <div className="space-y-3">
                <Button className="w-full" onClick={() => navigate("/app/menu")}>Voltar ao menu</Button>
                <Button variant="outline" className="w-full" onClick={() => { setStep(1); setForm({ tipo:"", profissional:null, data:null, horario:"", modalidade:"online", recorrente:false, frequencia:"semanal", email_contato:"" }); }}>
                  Agendar outra consulta
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
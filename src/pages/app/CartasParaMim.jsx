import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Send, Trash2, ChevronDown, ChevronUp, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuickExitButton from "@/components/QuickExitButton";
import { base44 } from "@/api/base44Client";
import { getOrCreateAnonymousId } from "@/lib/anonymousId";
import { GravuraBroto } from "@/components/art/Gravuras";

const ANONYMOUS_ID = getOrCreateAnonymousId();

const OPCOES_DATA = [
  { label: "1 semana", dias: 7 },
  { label: "1 mês",   dias: 30 },
  { label: "3 meses", dias: 90 },
  { label: "Data específica", dias: null },
];

function addDias(dias) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().split("T")[0];
}

function hoje() { return new Date().toISOString().split("T")[0]; }

function formatarData(dateStr) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

function estaAberta(carta) { return carta.abrir_em <= hoje(); }

export default function CartasParaMim() {
  const navigate = useNavigate();
  const [cartas, setCartas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [escrevendo, setEscrevendo] = useState(false);
  const [conteudo, setConteudo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [opcaoIdx, setOpcaoIdx] = useState(0);
  const [dataCustom, setDataCustom] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [expandidaId, setExpandidaId] = useState(null);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    setCarregando(true);
    try {
      const data = await base44.entities.CartaPessoal.filter({ anonymous_id: ANONYMOUS_ID }, "-criada_em", 50);
      setCartas(data);
    } catch {}
    setCarregando(false);
  }

  function getDataAbrir() {
    const op = OPCOES_DATA[opcaoIdx];
    if (op.dias !== null) return addDias(op.dias);
    return dataCustom || addDias(30);
  }

  async function enviarCarta() {
    if (!conteudo.trim()) return;
    setSalvando(true);
    try {
      await base44.entities.CartaPessoal.create({
        anonymous_id: ANONYMOUS_ID,
        titulo: titulo.trim() || "Carta para mim",
        conteudo: conteudo.trim(),
        abrir_em: getDataAbrir(),
        criada_em: hoje(),
      });
      setConteudo(""); setTitulo(""); setOpcaoIdx(0); setDataCustom("");
      setEscrevendo(false);
      await carregar();
    } catch {}
    setSalvando(false);
  }

  async function excluir(id) {
    await base44.entities.CartaPessoal.delete(id);
    await carregar();
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      <div className="px-4 pt-14 pb-12 max-w-md mx-auto w-full space-y-6">
        <button onClick={() => navigate("/app/menu")} className="flex items-center gap-2 text-sm focus:outline-none focus:ring-2 rounded" style={{ color: "#78716C" }}>
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        {/* Header com marca-d'água */}
        <div className="flex items-center gap-3 relative overflow-hidden">
          <div className="absolute -top-2 -right-2 pointer-events-none" aria-hidden="true">
            <GravuraBroto size={140} color="#9A3412" opacity={0.10} />
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FEF5EF" }}>
            <PenLine className="w-5 h-5" style={{ color: "#9A3412" }} />
          </div>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Cartas para Mim</h1>
            <p className="text-xs" style={{ color: "#78716C" }}>Privado · Somente você tem acesso</p>
          </div>
        </div>

        {/* Botão escrever */}
        {!escrevendo && (
          <button
            onClick={() => setEscrevendo(true)}
            className="w-full h-12 rounded-xl text-base font-semibold text-white focus:outline-none focus:ring-2 flex items-center justify-center gap-2"
            style={{ background: "#9A3412" }}
          >
            <PenLine className="w-4 h-4" /> Escrever uma carta
          </button>
        )}

        {/* Formulário */}
        <AnimatePresence>
          {escrevendo && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="rounded-xl border overflow-hidden"
              style={{ background: "#FFFBF7", borderColor: "#E7E5E4", backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #F0EDE8 28px)" }}
            >
              <div className="px-5 pt-4 pb-2 border-b" style={{ borderColor: "#EDE9E2", background: "#FFF8F0" }}>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#A8A29E" }}>Nova carta para você</p>
              </div>
              <div className="px-5 py-5 space-y-4">
                <input
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  placeholder="Título (opcional)"
                  className="w-full rounded-xl px-3 py-2 text-base border focus:outline-none focus:ring-2"
                  style={{ borderColor: "#E7E5E4", fontFamily: "Georgia, serif" }}
                />
                <textarea
                  value={conteudo}
                  onChange={e => setConteudo(e.target.value)}
                  placeholder="Querida eu..."
                  rows={8}
                  className="w-full rounded-xl px-3 py-2.5 text-base resize-none focus:outline-none focus:ring-2"
                  style={{ background: "transparent", border: "1px dashed #D6D3D1", color: "#292524", lineHeight: "28px", fontFamily: "Georgia, serif" }}
                />

                <div className="space-y-2">
                  <p className="text-sm font-semibold" style={{ color: "#292524" }}>Abrir em…</p>
                  <div className="flex flex-wrap gap-2">
                    {OPCOES_DATA.map((op, i) => (
                      <button
                        key={i}
                        onClick={() => setOpcaoIdx(i)}
                        className="h-9 px-3 rounded-xl border text-xs font-semibold transition-all focus:outline-none focus:ring-2"
                        style={{
                          borderColor: opcaoIdx === i ? "#9A3412" : "#E7E5E4",
                          background: opcaoIdx === i ? "#FEF5EF" : "#fff",
                          color: opcaoIdx === i ? "#9A3412" : "#57534E",
                        }}
                      >
                        {op.label}
                      </button>
                    ))}
                  </div>
                  {OPCOES_DATA[opcaoIdx].dias === null && (
                    <input
                      type="date"
                      value={dataCustom}
                      min={addDias(1)}
                      onChange={e => setDataCustom(e.target.value)}
                      className="w-full rounded-xl px-3 py-2 text-base border focus:outline-none focus:ring-2"
                      style={{ borderColor: "#E7E5E4" }}
                    />
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEscrevendo(false)}
                    className="flex-1 h-11 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2"
                    style={{ borderColor: "#D6D3D1", color: "#57534E" }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={enviarCarta}
                    disabled={!conteudo.trim() || salvando}
                    className="flex-1 h-11 rounded-xl text-sm font-semibold text-white disabled:opacity-40 flex items-center justify-center gap-2 focus:outline-none focus:ring-2"
                    style={{ background: "#9A3412" }}
                  >
                    <Send className="w-4 h-4" /> {salvando ? "Enviando..." : "Enviar carta"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lista de cartas */}
        {carregando ? (
          <div className="py-8 flex justify-center">
            <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#9A3412" }} />
          </div>
        ) : cartas.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="flex justify-center">
              <GravuraBroto size={80} color="#9A3412" opacity={0.8} />
            </div>
            <p className="text-base font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Nenhuma carta ainda.</p>
            <p className="text-sm italic" style={{ color: "#9A3412", fontFamily: "var(--font-lora)" }}>Que tal escrever a primeira?</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-semibold" style={{ color: "#57534E" }}>Suas cartas ({cartas.length})</p>
            {cartas.map(carta => {
              const aberta = estaAberta(carta);
              const expandida = expandidaId === carta.id;
              return (
                <div key={carta.id} className="rounded-xl border overflow-hidden bg-white" style={{ borderColor: "#E7E5E4" }}>
                  <button
                    onClick={() => aberta && setExpandidaId(expandida ? null : carta.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left focus:outline-none focus:ring-2"
                    aria-expanded={expandida}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: aberta ? "#FEF5EF" : "#F5F5F4" }}>
                      {aberta
                        ? <PenLine className="w-4 h-4" style={{ color: "#9A3412" }} />
                        : <Lock className="w-4 h-4" style={{ color: "#A8A29E" }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "#292524" }}>{carta.titulo}</p>
                      <p className="text-xs" style={{ color: "#78716C" }}>
                        {aberta ? `Aberta em ${formatarData(carta.abrir_em)}` : `Abre em ${formatarData(carta.abrir_em)}`}
                      </p>
                    </div>
                    {aberta && (expandida ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: "#A8A29E" }} /> : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "#A8A29E" }} />)}
                    {!aberta && <Lock className="w-4 h-4 flex-shrink-0" style={{ color: "#A8A29E" }} />}
                  </button>
                  <AnimatePresence>
                    {expandida && aberta && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: "#F0EDE8" }}>
                          <p className="pt-3 text-base leading-relaxed whitespace-pre-wrap" style={{ color: "#292524", fontFamily: "Georgia, serif" }}>{carta.conteudo}</p>
                          <button onClick={() => excluir(carta.id)} className="flex items-center gap-1.5 text-xs font-semibold focus:outline-none focus:ring-2 rounded" style={{ color: "#B91C1C" }}>
                            <Trash2 className="w-3.5 h-3.5" /> Excluir carta
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-xs text-center" style={{ color: "#A8A29E" }}>
          Seus registros ficam com ID anônimo. Profissionais não têm acesso.
        </p>
      </div>
    </div>
  );
}
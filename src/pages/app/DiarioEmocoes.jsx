import { useState, useEffect, useRef } from "react";
import { GravuraCoracao } from "@/components/art/Gravuras";
import AppFooter from "@/components/AppFooter";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, ImagePlus, Save, ChevronDown, ChevronUp, Pencil, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuickExitButton from "@/components/QuickExitButton";
import CanvasDesenho from "@/components/diario/CanvasDesenho";
import GravadorAudio from "@/components/diario/GravadorAudio";
import { base44 } from "@/api/base44Client";
import { getOrCreateAnonymousId } from "@/lib/anonymousId";

const EMOCOES = [
  { value: "otima",       emoji: "😊", label: "Ótima" },
  { value: "bem",         emoji: "🙂", label: "Bem" },
  { value: "neutro",      emoji: "😐", label: "Neutro" },
  { value: "triste",      emoji: "😔", label: "Triste" },
  { value: "muito_triste",emoji: "😢", label: "Muito triste" },
];

const GRAVURAS = ["🌷","🌿","🕊️","☀️","🌙","⭐","🦋","🍃","💪","🫶"];
const MAX_GRAVURAS = 5;

const ANONYMOUS_ID = getOrCreateAnonymousId();

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function formatarData(dateStr) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export default function DiarioEmocoes() {
  const navigate = useNavigate();
  const today = getTodayStr();
  const fileRef = useRef();

  // Estado do registro de hoje
  const [emocao, setEmocao] = useState(null);
  const [texto, setTexto] = useState("");
  const [imagemLocal, setImagemLocal] = useState(null);   // URL objeto (foto)
  const [desenhoLocal, setDesenhoLocal] = useState(null); // dataURL do canvas
  const [audioLocal, setAudioLocal] = useState(null);     // { url, blob }
  const [mostrarGravador, setMostrarGravador] = useState(false);
  const [gravuras, setGravuras] = useState([]);           // array de emojis (máx 5)
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [registroHojeId, setRegistroHojeId] = useState(null);

  // Canvas
  const [mostrarCanvas, setMostrarCanvas] = useState(false);


  // Histórico
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [expandidoId, setExpandidoId] = useState(null);

  useEffect(() => {
    carregarHistorico();
  }, []);

  async function carregarHistorico() {
    setCarregando(true);
    try {
      const data = await base44.entities.DiarioEmocao.filter({ anonymous_id: ANONYMOUS_ID }, "-data", 30);
      setHistorico(data);
      const hoje = data.find(r => r.data === today);
      if (hoje) {
        setEmocao(hoje.emocao);
        setTexto(hoje.nota || "");
        setGravuras(hoje.tags || []);
        setRegistroHojeId(hoje.id);
        setSalvo(true);
      }
    } catch {}
    setCarregando(false);
  }

  async function salvarRegistro() {
    if (!emocao) return;
    setSalvando(true);
    const payload = {
      anonymous_id: ANONYMOUS_ID,
      data: today,
      emocao,
      nota: texto.trim(),
      tags: gravuras,
    };
    try {
      if (registroHojeId) {
        await base44.entities.DiarioEmocao.update(registroHojeId, payload);
      } else {
        const novo = await base44.entities.DiarioEmocao.create(payload);
        setRegistroHojeId(novo.id);
      }
      await carregarHistorico();
      setSalvo(true);
    } catch {}
    setSalvando(false);
  }

  async function excluirRegistro(id) {
    await base44.entities.DiarioEmocao.delete(id);
    if (id === registroHojeId) {
      setEmocao(null); setTexto(""); setImagemLocal(null);
      setDesenhoLocal(null); setAudioLocal(null); setGravuras([]);
      setRegistroHojeId(null); setSalvo(false);
    }
    await carregarHistorico();
  }

  function adicionarImagem(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagemLocal(URL.createObjectURL(file));
    setSalvo(false);
    e.target.value = "";
  }

  function guardarDesenho(dataUrl) {
    setDesenhoLocal(dataUrl);
    setMostrarCanvas(false);
    setSalvo(false);
  }

  function adicionarGravura(emoji) {
    if (gravuras.length >= MAX_GRAVURAS) return;
    setGravuras(prev => [...prev, emoji]);
    setSalvo(false);
  }

  function removerGravura(idx) {
    setGravuras(prev => prev.filter((_, i) => i !== idx));
    setSalvo(false);
  }

  const emocaoObj = EMOCOES.find(e => e.value === emocao);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      <div className="px-4 pt-14 pb-10 max-w-md mx-auto w-full space-y-5">
        {/* Navegação */}
        <button
          onClick={() => navigate("/app/menu")}
          className="flex items-center gap-2 text-sm focus:outline-none focus:ring-2 rounded"
          style={{ color: "#78716C" }}
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        {/* Título com marca-d'água */}
        <div className="flex items-center gap-3 relative overflow-hidden">
          <div className="absolute -top-2 -right-2 pointer-events-none" aria-hidden="true">
            <GravuraCoracao size={140} color="#9F1239" opacity={0.10} />
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FFF1F2" }}>
            <GravuraCoracao size={26} color="#9F1239" opacity={1} />
          </div>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Diário de Emoções</h1>
            <p className="text-xs" style={{ color: "#78716C" }}>Privado · Somente você tem acesso</p>
          </div>
        </div>

        {/* Página do diário — hoje */}
        <div
          className="rounded-xl shadow-sm border overflow-hidden"
          style={{ background: "#FFFBF7", borderColor: "#E7E5E4", backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #F0EDE8 28px)" }}
        >
          {/* Topo da página */}
          <div className="px-5 pt-4 pb-2 border-b" style={{ borderColor: "#EDE9E2", background: "#FFF8F0" }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#A8A29E" }}>
              {formatarData(today)}
            </p>
          </div>

          <div className="px-5 py-5 space-y-5">
            {/* Como estou hoje */}
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: "#292524" }}>Como estou hoje?</p>
              <div className="flex gap-2 flex-wrap">
                {EMOCOES.map(e => (
                  <button
                    key={e.value}
                    onClick={() => { setEmocao(e.value); setSalvo(false); }}
                    className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 transition-all focus:outline-none focus:ring-2"
                    style={{
                      borderColor: emocao === e.value ? "#9F1239" : "#E7E5E4",
                      background: emocao === e.value ? "#FFF1F2" : "#fff",
                      minWidth: 52,
                    }}
                    aria-label={e.label}
                    aria-pressed={emocao === e.value}
                  >
                    <span className="text-2xl leading-none">{e.emoji}</span>
                    <span className="text-xs font-medium" style={{ color: emocao === e.value ? "#9F1239" : "#78716C" }}>{e.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gravuras */}
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: "#292524" }}>
                Gravuras {gravuras.length > 0 && <span style={{ color: "#A8A29E", fontWeight: 400 }}>({gravuras.length}/{MAX_GRAVURAS})</span>}
              </p>

              {/* Gravuras adicionadas */}
              {gravuras.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {gravuras.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => removerGravura(i)}
                      aria-label={`Remover gravura ${g}`}
                      className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all focus:outline-none focus:ring-2"
                      style={{ background: "#FFF8F0", borderColor: "#E7E5E4" }}
                      title="Toque para remover"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}

              {/* Seletor rolável */}
              <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Escolher gravura decorativa">
                {GRAVURAS.map(g => (
                  <button
                    key={g}
                    onClick={() => adicionarGravura(g)}
                    disabled={gravuras.length >= MAX_GRAVURAS}
                    aria-label={`Adicionar gravura ${g}`}
                    className="flex-shrink-0 text-2xl w-11 h-11 rounded-lg border flex items-center justify-center transition-all focus:outline-none focus:ring-2 disabled:opacity-40"
                    style={{ background: "#fff", borderColor: "#E7E5E4" }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Área de escrita */}
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: "#292524" }}>
                {emocaoObj ? `Você está se sentindo ${emocaoObj.label.toLowerCase()} ${emocaoObj.emoji}. O que mais você quer registrar?` : "Escreva o que quiser..."}
              </p>
              <textarea
                value={texto}
                onChange={e => { setTexto(e.target.value); setSalvo(false); }}
                placeholder="Esta é sua página. Escreva, desabafe, registre. Ninguém mais vai ler."
                rows={6}
                className="w-full rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2"
                style={{
                  background: "transparent",
                  border: "1px dashed #D6D3D1",
                  color: "#292524",
                  lineHeight: "28px",
                  fontFamily: "Georgia, serif",
                }}
              />
            </div>

            {/* Imagem foto */}
            {imagemLocal && (
              <div className="relative">
                <img src={imagemLocal} alt="Foto do diário" className="w-full rounded-lg object-cover max-h-48" />
                <button
                  onClick={() => { setImagemLocal(null); setSalvo(false); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-white shadow"
                  aria-label="Remover foto"
                >
                  <Trash2 className="w-3.5 h-3.5" style={{ color: "#B91C1C" }} />
                </button>
              </div>
            )}

            {/* Áudio gravado */}
            {audioLocal && (
              <div className="flex items-center gap-3 rounded-lg border px-3 py-2.5" style={{ background: "#FFF1F2", borderColor: "#F9A8D4" }}>
                <Mic className="w-4 h-4 flex-shrink-0" style={{ color: "#9F1239" }} />
                <div className="flex-1 min-w-0">
                  <audio src={audioLocal.url} controls className="w-full h-8" style={{ maxWidth: "100%" }} />
                </div>
                <button
                  onClick={() => { setAudioLocal(null); setSalvo(false); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-white shadow flex-shrink-0"
                  aria-label="Remover áudio"
                >
                  <Trash2 className="w-3.5 h-3.5" style={{ color: "#B91C1C" }} />
                </button>
              </div>
            )}

            {/* Gravador */}
            <AnimatePresence>
              {mostrarGravador && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <GravadorAudio
                    onGuardar={(blob, url) => { setAudioLocal({ blob, url }); setMostrarGravador(false); setSalvo(false); }}
                    onCancelar={() => setMostrarGravador(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desenho guardado */}
            {desenhoLocal && (
              <div className="relative">
                <img src={desenhoLocal} alt="Desenho do diário" className="w-full rounded-lg object-cover border" style={{ borderColor: "#E7E5E4" }} />
                <button
                  onClick={() => { setDesenhoLocal(null); setSalvo(false); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-white shadow"
                  aria-label="Remover desenho"
                >
                  <Trash2 className="w-3.5 h-3.5" style={{ color: "#B91C1C" }} />
                </button>
              </div>
            )}

            {/* Canvas de desenho */}
            <AnimatePresence>
              {mostrarCanvas && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <CanvasDesenho
                    onGuardar={guardarDesenho}
                    onCancelar={() => setMostrarCanvas(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ações da página */}
            <div className="flex flex-col gap-2 pt-1">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={adicionarImagem} />

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="h-10 rounded-lg border text-sm font-medium flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus:ring-2"
                  style={{ borderColor: "#D6D3D1", color: "#57534E", background: "#fff" }}
                  aria-label="Adicionar foto ou imagem ao diário"
                >
                  <ImagePlus className="w-4 h-4" /> Foto
                </button>

                <button
                  onClick={() => { setMostrarCanvas(v => !v); setMostrarGravador(false); }}
                  aria-label="Abrir área de desenho no diário"
                  aria-pressed={mostrarCanvas}
                  className="h-10 rounded-lg border text-sm font-medium flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus:ring-2"
                  style={{
                    borderColor: mostrarCanvas ? "#0F766E" : "#D6D3D1",
                    color: mostrarCanvas ? "#0F766E" : "#57534E",
                    background: mostrarCanvas ? "#F0FDFA" : "#fff",
                  }}
                >
                  <Pencil className="w-4 h-4" /> Desenhar
                </button>

                <button
                  onClick={() => { setMostrarGravador(v => !v); setMostrarCanvas(false); }}
                  aria-label="Gravar áudio para o diário"
                  aria-pressed={mostrarGravador}
                  className="h-10 rounded-lg border text-sm font-medium flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus:ring-2"
                  style={{
                    borderColor: mostrarGravador ? "#9F1239" : "#D6D3D1",
                    color: mostrarGravador ? "#9F1239" : "#57534E",
                    background: mostrarGravador ? "#FFF1F2" : "#fff",
                  }}
                >
                  <Mic className="w-4 h-4" /> Áudio
                </button>
              </div>

              <button
                onClick={salvarRegistro}
                disabled={!emocao || salvando}
                className="w-full h-11 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 text-white transition-colors disabled:opacity-40 focus:outline-none focus:ring-2"
                style={{ background: "#9F1239" }}
                aria-label="Salvar registro do diário"
              >
                <Save className="w-4 h-4" />
                {salvando ? "Salvando..." : salvo ? "✓ Salvo" : "Salvar registro"}
              </button>

              {!salvo && emocao && (
                <p className="text-xs text-center" style={{ color: "#A8A29E" }}>
                  Seus registros ficam no banco de dados com ID anônimo. Profissionais não têm acesso.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Histórico */}
        <div>
          <button
            onClick={() => setMostrarHistorico(!mostrarHistorico)}
            className="w-full flex items-center justify-between py-2 text-sm font-semibold focus:outline-none focus:ring-2 rounded"
            style={{ color: "#57534E" }}
          >
            <span>Páginas anteriores ({historico.filter(r => r.data !== today).length})</span>
            {mostrarHistorico ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {mostrarHistorico && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {carregando ? (
                  <div className="py-6 flex justify-center">
                    <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#9F1239" }} />
                  </div>
                ) : (
                  <div className="space-y-2 pt-2">
                    {historico.filter(r => r.data !== today).length === 0 ? (
                      <div className="text-center py-10 space-y-3">
                        <div className="flex justify-center">
                          <GravuraCoracao size={72} color="#9F1239" opacity={0.75} />
                        </div>
                        <p className="text-sm italic" style={{ color: "#9F1239", fontFamily: "var(--font-lora)" }}>Sua primeira página está em branco, esperando por você.</p>
                      </div>
                    ) : (
                      historico.filter(r => r.data !== today).map(reg => {
                        const em = EMOCOES.find(e => e.value === reg.emocao);
                        const aberto = expandidoId === reg.id;
                        return (
                          <div key={reg.id} className="rounded-xl border overflow-hidden" style={{ background: "#FFFBF7", borderColor: "#E7E5E4" }}>
                            <button
                              onClick={() => setExpandidoId(aberto ? null : reg.id)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left focus:outline-none focus:ring-2"
                              aria-expanded={aberto}
                            >
                              <span className="text-xl flex-shrink-0">{em?.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold" style={{ color: "#292524" }}>
                                  {new Date(reg.data + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" })}
                                </p>
                                <p className="text-xs" style={{ color: "#78716C" }}>
                                  {em?.label}
                                  {reg.tags?.length > 0 && <span className="ml-2">{reg.tags.join(" ")}</span>}
                                </p>
                              </div>
                              {aberto ? <ChevronUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#A8A29E" }} /> : <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#A8A29E" }} />}
                            </button>
                            <AnimatePresence>
                              {aberto && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: "#F0EDE8" }}>
                                    {reg.tags?.length > 0 && (
                                      <div className="pt-3 flex flex-wrap gap-1">
                                        {reg.tags.map((g, i) => (
                                          <span key={i} className="text-xl">{g}</span>
                                        ))}
                                      </div>
                                    )}
                                    {reg.nota ? (
                                      <p className="pt-2 text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#292524", fontFamily: "Georgia, serif" }}>
                                        {reg.nota}
                                      </p>
                                    ) : (
                                      <p className="pt-3 text-sm italic" style={{ color: "#A8A29E" }}>Sem texto nesta entrada.</p>
                                    )}
                                    <button
                                      onClick={() => excluirRegistro(reg.id)}
                                      className="flex items-center gap-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 rounded"
                                      style={{ color: "#B91C1C" }}
                                      aria-label="Excluir este registro"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Excluir esta entrada
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
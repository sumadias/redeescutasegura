import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Headphones, Pencil, Image as ImageIcon, Trash2, ExternalLink } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";
import { GravuraSol } from "@/components/art/Gravuras";

const TABS = [
  { id: "videos",  label: "Vídeos",       icon: Play },
  { id: "audios",  label: "Áudios",       icon: Headphones },
  { id: "criar",   label: "Criar",        icon: Pencil },
  { id: "galeria", label: "Minha galeria",icon: ImageIcon },
];

const VIDEOS = [
  { id: 1, title: "Respiração para aterramento emocional", duration: "4 min", url: "https://www.youtube.com/watch?v=aNXKjGFUlMs", desc: "Exercício guiado de respiração diafragmática." },
  { id: 2, title: "Você tem força",                        duration: "3 min", url: "https://www.youtube.com/watch?v=cjJTH5Bt0kQ", desc: "Mensagem motivadora de acolhimento e reconhecimento." },
  { id: 3, title: "Técnica 5-4-3-2-1 de aterramento",     duration: "5 min", url: "https://www.youtube.com/watch?v=30VMIEmA114", desc: "Exercício sensorial para momentos de ansiedade." },
  { id: 4, title: "Autocuidado: pequenos gestos",          duration: "6 min", url: "https://www.youtube.com/watch?v=t1rRo6cgM_E", desc: "Práticas simples de autocuidado para o dia a dia." },
];

const AUDIOS = [
  { id: 1, title: "Meditação guiada — paz interior",  duration: "8 min",  desc: "Conduz você a um estado de calma e segurança." },
  { id: 2, title: "Afirmações de acolhimento",        duration: "5 min",  desc: "Frases gentis que reconhecem sua força e trajetória." },
  { id: 3, title: "Sons da natureza para relaxar",    duration: "15 min", desc: "Chuva, vento e pássaros para ajudar no descanso." },
];

export default function ArteEscuta() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("videos");
  const [galeria, setGaleria] = useState([]);
  const [textoLivre, setTextoLivre] = useState("");
  const [salvouTexto, setSalvouTexto] = useState(false);
  const fileRef = useRef();

  function salvarTexto() {
    if (!textoLivre.trim()) return;
    setGaleria(prev => [
      { id: Date.now(), tipo: "texto", conteudo: textoLivre.trim(), data: new Date().toLocaleDateString("pt-BR") },
      ...prev,
    ]);
    setTextoLivre("");
    setSalvouTexto(true);
    setTimeout(() => setSalvouTexto(false), 2500);
  }

  function adicionarImagem(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setGaleria(prev => [
      { id: Date.now(), tipo: "imagem", conteudo: url, data: new Date().toLocaleDateString("pt-BR") },
      ...prev,
    ]);
    e.target.value = "";
  }

  function excluir(id) {
    setGaleria(prev => prev.filter(item => item.id !== id));
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      {/* Header com marca-d'água */}
      <div className="px-4 pt-14 pb-3 max-w-md mx-auto w-full relative overflow-hidden">
        <div className="absolute top-10 -right-4 pointer-events-none" aria-hidden="true">
          <GravuraSol size={140} color="#9A3412" opacity={0.10} />
        </div>
        <button
          onClick={() => navigate("/app/menu")}
          className="flex items-center gap-2 text-sm mb-4 focus:outline-none focus:ring-2 rounded"
          style={{ color: "#78716C" }}
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FEF5EF" }}>
            <GravuraSol size={24} color="#9A3412" opacity={1} />
          </div>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Arte de Escuta Digital</h1>
            <p className="text-sm" style={{ color: "#78716C" }}>Espaço seguro de expressão e autocuidado</p>
          </div>
        </div>
      </div>

      {/* Aviso */}
      <div className="mx-4 max-w-md self-center w-full mb-3">
        <div className="rounded-xl px-4 py-2.5 text-sm border" style={{ background: "#FEF3C7", color: "#92400E", borderColor: "#92400E22" }}>
          Todo conteúdo aqui foi selecionado com cuidado. Você pode sair a qualquer momento.
        </div>
      </div>

      {/* Abas */}
      <div className="px-4 max-w-md mx-auto w-full">
        <div className="flex gap-1 rounded-xl p-1 mb-4" style={{ background: "#F5F5F4" }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 px-1 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2"
              style={{
                background: activeTab === tab.id ? "#fff" : "transparent",
                color: activeTab === tab.id ? "#9A3412" : "#78716C",
                boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
              aria-label={tab.label}
            >
              <tab.icon className="w-4 h-4" />
              <span className="leading-tight">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 px-4 pb-10 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === "videos" && (
            <motion.div key="videos" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-xl border p-4 flex gap-3 bg-white" style={{ borderColor: "#E7E5E4" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FEF5EF" }}>
                    <GravuraSol size={28} color="#9A3412" opacity={0.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight" style={{ color: "#292524" }}>{v.title}</p>
                    <p className="text-xs mt-0.5 mb-2" style={{ color: "#78716C" }}>{v.desc} · {v.duration}</p>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-1.5 transition-colors"
                      style={{ background: "#FEF5EF", color: "#9A3412" }}
                    >
                      <Play className="w-3 h-3" /> Assistir <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "audios" && (
            <motion.div key="audios" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {AUDIOS.map(a => (
                <div key={a.id} className="rounded-xl border p-4 flex gap-3 bg-white" style={{ borderColor: "#E7E5E4" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F0FDFA" }}>
                    <Headphones className="w-5 h-5" style={{ color: "#0F766E" }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: "#292524" }}>{a.title}</p>
                    <p className="text-xs mt-0.5 mb-2" style={{ color: "#78716C" }}>{a.desc} · {a.duration}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "#E7E5E4" }}>
                        <div className="h-full rounded-full w-0" style={{ background: "#0F766E" }} />
                      </div>
                      <button
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 focus:outline-none focus:ring-2"
                        style={{ background: "#F0FDFA" }}
                        aria-label={`Ouvir ${a.title}`}
                      >
                        <Play className="w-4 h-4" style={{ color: "#0F766E" }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-center pt-2" style={{ color: "#A8A29E" }}>
                Áudios disponíveis em breve. Use fones se precisar de privacidade.
              </p>
            </motion.div>
          )}

          {activeTab === "criar" && (
            <motion.div key="criar" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="rounded-xl border p-4 space-y-3 bg-white" style={{ borderColor: "#E7E5E4" }}>
                <p className="font-semibold text-sm" style={{ color: "#292524" }}>Escrita expressiva</p>
                <p className="text-sm" style={{ color: "#78716C" }}>Escreva livremente. Não precisa fazer sentido. Só precisa ser seu.</p>
                <textarea
                  value={textoLivre}
                  onChange={e => setTextoLivre(e.target.value)}
                  placeholder="O que está no seu coração agora?"
                  rows={5}
                  className="w-full rounded-xl border px-3 py-2.5 text-base resize-none focus:outline-none focus:ring-2"
                  style={{ borderColor: "#E7E5E4", color: "#292524", background: "#FAF9F7" }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={salvarTexto}
                    disabled={!textoLivre.trim()}
                    className="flex-1 h-11 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-40 focus:outline-none focus:ring-2"
                    style={{ background: "#9A3412" }}
                  >
                    {salvouTexto ? "Salvo na galeria" : "Salvar na minha galeria"}
                  </button>
                  <button
                    onClick={() => setTextoLivre("")}
                    className="h-11 px-3 rounded-xl text-sm border transition-colors focus:outline-none focus:ring-2"
                    style={{ borderColor: "#E7E5E4", color: "#78716C" }}
                    aria-label="Limpar texto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-xl border p-4 space-y-3 bg-white" style={{ borderColor: "#E7E5E4" }}>
                <p className="font-semibold text-sm" style={{ color: "#292524" }}>Adicionar imagem</p>
                <p className="text-sm" style={{ color: "#78716C" }}>Foto, desenho escaneado ou qualquer imagem que represente como você está.</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={adicionarImagem} />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-11 rounded-xl border-2 border-dashed text-sm font-semibold transition-colors focus:outline-none focus:ring-2"
                  style={{ borderColor: "#D6D3D1", color: "#78716C" }}
                >
                  + Escolher imagem do dispositivo
                </button>
                <p className="text-xs" style={{ color: "#A8A29E" }}>Salvo apenas neste dispositivo. Não enviado para servidores.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "galeria" && (
            <motion.div key="galeria" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {galeria.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="flex justify-center">
                    <GravuraSol size={80} color="#9A3412" opacity={0.8} />
                  </div>
                  <p className="text-base font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Sua galeria está vazia</p>
                  <p className="text-sm italic" style={{ color: "#9A3412", fontFamily: "var(--font-lora)" }}>Crie algo na aba "Criar" para ver aqui.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs" style={{ color: "#78716C" }}>
                    {galeria.length} {galeria.length === 1 ? "criação" : "criações"} · Visível apenas para você
                  </p>
                  {galeria.map(item => (
                    <div key={item.id} className="rounded-xl border p-4 bg-white" style={{ borderColor: "#E7E5E4" }}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs" style={{ color: "#A8A29E" }}>{item.data}</span>
                        <button
                          onClick={() => excluir(item.id)}
                          className="p-1 rounded hover:bg-red-50 transition-colors focus:outline-none focus:ring-2"
                          aria-label="Excluir esta criação"
                        >
                          <Trash2 className="w-3.5 h-3.5" style={{ color: "#B91C1C" }} />
                        </button>
                      </div>
                      {item.tipo === "texto" ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#292524" }}>{item.conteudo}</p>
                      ) : (
                        <img src={item.conteudo} alt="Criação" className="w-full rounded-lg object-cover max-h-48" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
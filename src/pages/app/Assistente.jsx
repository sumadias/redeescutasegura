import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone, Send, ArrowLeft, Lock, MapPin, Clock, Navigation, Bot, ShieldAlert,
} from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";
import MapaPBNeon from "@/components/MapaPBNeon";
import { base44 } from "@/api/base44Client";
import { MUNICIPIOS } from "@/data/redePB";
import { responder, responderInformativo, SAUDACAO, detectarCidade, semAcento } from "@/lib/assistenteRede";

const C = {
  page: "#FAFAFB", card: "#FFFFFF", border: "#E5E7EB",
  ink: "#1F2937", muted: "#6B7280",
  pink: "#E8235C", pinkSoft: "#FCE7F3",
  purple: "#7C3AED", purpleSoft: "#F3E8FF",
};

const TIPOS_SIGILOSOS = ["casa_acolhimento"];
const TEXTO_SIGILO_CARD =
  "Endereço sigiloso por segurança — acesso somente mediante encaminhamento do CRAM, DEAM ou da Justiça.";
const TIPO_ROTULO = {
  delegacia: "Delegacia / DEAM", casa_acolhimento: "Abrigo", cram: "CRAM", creas: "CREAS",
  upa: "UPA / Saúde", hospital: "Hospital", defensoria: "Defensoria",
  ministerio_publico: "Ministério Público", ong: "ONG / Coletivo", universidade: "Universidade",
  orgao_gestao: "Órgão gestor", pericia: "Perícia / Sala Lilás", policiamento: "Patrulha Maria da Penha",
};

/* negrito **assim** e itálico *assim*, sem trazer uma lib de markdown inteira
   para dentro de uma tela que precisa abrir rápido em 3G */
function Texto({ children }) {
  const partes = String(children).split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {partes.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

function CartaoServico({ s, cidade }) {
  const tel = String(s.telefone || "").replace(/\D/g, "");
  const cor = s.estadual ? C.purple : C.pink;
  const fundo = s.estadual ? C.purpleSoft : C.pinkSoft;
  return (
    <div className="rounded-xl border p-3.5" style={{ background: C.card, borderColor: C.border }}>
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-sm leading-snug" style={{ color: C.ink }}>{s.servico}</p>
        <span className="text-[11px] px-2 py-0.5 rounded-md font-medium flex-shrink-0"
          style={{ background: fundo, color: cor }}>{s.categoria}</span>
      </div>

      {s.sigiloso ? (
        <p className="text-xs mt-2 flex items-start gap-1.5 font-medium" style={{ color: "#BE1249" }}>
          <Lock className="w-3.5 h-3.5 mt-[1px] flex-shrink-0" aria-hidden="true" />
          {TEXTO_SIGILO_CARD}
        </p>
      ) : s.endereco ? (
        <p className="text-xs mt-2 flex items-start gap-1.5" style={{ color: C.muted }}>
          <MapPin className="w-3.5 h-3.5 mt-[1px] flex-shrink-0" aria-hidden="true" />{s.endereco}
        </p>
      ) : null}

      {s.horario && (
        <p className="text-xs mt-1 flex items-center gap-1.5" style={{ color: C.muted }}>
          <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />{s.horario}
        </p>
      )}
      {s.orientacao && (
        <p className="text-xs mt-2 px-2.5 py-1.5 rounded-lg" style={{ background: "#FEF3C7", color: "#92400E" }}>
          {s.orientacao}
        </p>
      )}

      <div className="flex gap-2 mt-3">
        {tel.length >= 3 && (
          <a href={`tel:${tel}`}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-xs font-semibold text-white"
            style={{ background: cor }} aria-label={`Ligar para ${s.servico}`}>
            <Phone className="w-3.5 h-3.5" aria-hidden="true" /> {s.telefone}
          </a>
        )}
        {!s.sigiloso && s.endereco && !s.estadual && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              `${s.servico}, ${s.endereco}, ${cidade || ""} - PB`)}&travelmode=driving`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-xs font-semibold border"
            style={{ borderColor: cor + "55", color: cor }}
            aria-label={`Traçar rota até ${s.servico} — abre o mapa em nova aba`}>
            <Navigation className="w-3.5 h-3.5" aria-hidden="true" /> Rota
          </a>
        )}
      </div>
    </div>
  );
}

export default function Assistente() {
  const navigate = useNavigate();
  const [msgs, setMsgs] = useState([{ de: "bot", ...SAUDACAO }]);
  const [texto, setTexto] = useState("");
  const [cidadeAtual, setCidadeAtual] = useState(null);
  const [cadastrados, setCadastrados] = useState([]);
  const [pensando, setPensando] = useState(false);
  const fimRef = useRef(null);

  /* mesma normalização e mesma regra de sigilo do diretório */
  useEffect(() => {
    let vivo = true;
    base44.entities.Servico.filter({ active: true })
      .then((rows) => {
        if (!vivo) return;
        setCadastrados((rows || []).map((r) => {
          const sigiloso = TIPOS_SIGILOSOS.includes(r.type);
          const cid = detectarCidade(`${r.address || ""} ${r.name || ""}`);
          return {
            id: `loc-${r.id}`,
            categoria: TIPO_ROTULO[r.type] || "Outros serviços",
            servico: r.name,
            telefone: r.phone || "",
            horario: r.hours || "",
            endereco: sigiloso ? "" : r.address || "",
            sigiloso,
            cidadeIbge: cid ? cid.ibge : null,
          };
        }));
      })
      .catch(() => {});
    return () => { vivo = false; };
  }, []);

  useEffect(() => { fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, pensando]);

  function enviar(pergunta) {
    const p = String(pergunta || "").trim();
    if (!p) return;
    setMsgs((m) => [...m, { de: "eu", texto: p }]);
    setTexto("");
    setPensando(true);

    /* pequeno atraso só para a resposta não "piscar" na tela; a busca é local */
    setTimeout(() => {
      const nova = detectarCidade(p);
      if (nova) setCidadeAtual(nova);
      const r =
        responderInformativo(p) ||
        responder(p, { cidadeAtual: nova || cidadeAtual, cadastrados });
      setMsgs((m) => [...m, { de: "bot", ...r, cidadeNome: (nova || cidadeAtual)?.nome }]);
      setPensando(false);
    }, 260);
  }

  const sugestoes = msgs[msgs.length - 1]?.sugestoes || [];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.page }}>
      <QuickExitButton />

      {/* topo */}
      <div className="relative overflow-hidden shrink-0" style={{ background: "linear-gradient(115deg,#150E38 0%,#1E1450 45%,#2A1A63 100%)" }}>
        {/* dimensionada pela altura da faixa, como no hero da Emergência */}
        <MapaPBNeon className="absolute pointer-events-none opacity-40 h-[190%] w-auto max-w-none right-[-8%] top-1/2 -translate-y-1/2" />
        {/* pr reserva a faixa do botão fixo "Sair rapidamente" (z-50) */}
        <div className="max-w-2xl mx-auto pl-2 pr-[160px] py-4 relative flex items-center gap-3">
          <button onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/emergencia"))}
            className="p-1.5 rounded-lg text-white/80 hover:text-white" aria-label="Voltar">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,45,120,0.18)", border: "1px solid rgba(255,45,120,0.4)" }}>
            <Bot className="w-5 h-5" style={{ color: "#FF7DAE" }} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-white font-bold text-base leading-tight">Assistente da Rede</h1>
            <p className="text-xs" style={{ color: "#C9C2E8" }}>
              Sem login · sem gravação {cidadeAtual ? `· ${cidadeAtual.nome}` : ""}
            </p>
          </div>
          <a href="tel:180"
            className="ml-auto h-9 px-3.5 rounded-full text-xs font-bold text-white inline-flex items-center gap-1.5 flex-shrink-0"
            style={{ background: C.pink }}>
            <Phone className="w-3.5 h-3.5" aria-hidden="true" /> 180
          </a>
        </div>
      </div>

      {/* conversa */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-5 space-y-4">
          {msgs.map((m, i) =>
            m.de === "eu" ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-white"
                  style={{ background: C.purple }}>{m.texto}</div>
              </div>
            ) : (
              <div key={i} className="space-y-2.5">
                <div className="max-w-[92%] rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed border whitespace-pre-line"
                  style={{
                    background: m.urgente ? "#FEF2F2" : C.card,
                    borderColor: m.urgente ? "#FCA5A5" : C.border,
                    color: C.ink,
                  }}>
                  {m.urgente && (
                    <p className="flex items-center gap-1.5 font-bold mb-1.5" style={{ color: "#B91C1C" }}>
                      <ShieldAlert className="w-4 h-4" aria-hidden="true" /> Perigo imediato
                    </p>
                  )}
                  <Texto>{m.texto}</Texto>
                </div>
                {(m.cartoes || []).map((s, j) => (
                  <CartaoServico key={j} s={s} cidade={m.cidadeNome} />
                ))}
              </div>
            )
          )}
          {pensando && (
            <div className="rounded-2xl rounded-bl-md px-4 py-3 border inline-flex gap-1.5"
              style={{ background: C.card, borderColor: C.border }} aria-live="polite">
              <span className="sr-only">Procurando…</span>
              {[0, 1, 2].map((d) => (
                <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ background: "#C4B5FD", animationDelay: `${d * 120}ms` }} />
              ))}
            </div>
          )}
          <div ref={fimRef} />
        </div>
      </div>

      {/* sugestões + campo */}
      <div className="sticky bottom-0 border-t" style={{ background: C.card, borderColor: C.border }}>
        <div className="max-w-2xl mx-auto px-4 pt-3 pb-3">
          {sugestoes.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2.5"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {sugestoes.map((s) => (
                <button key={s} onClick={() => enviar(s)}
                  className="flex-shrink-0 h-9 px-3.5 rounded-full text-xs font-medium border"
                  style={{ borderColor: C.purple + "44", color: C.purple, background: C.purpleSoft }}>
                  {s}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); enviar(texto); }} className="flex gap-2">
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Sua cidade e o que você precisa…"
              aria-label="Escreva sua pergunta"
              className="flex-1 h-12 rounded-xl border px-4 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: "#D1D5DB", color: C.ink }}
            />
            <button type="submit" aria-label="Enviar"
              className="w-12 h-12 rounded-xl text-white inline-flex items-center justify-center flex-shrink-0"
              style={{ background: C.pink }}>
              <Send className="w-5 h-5" aria-hidden="true" />
            </button>
          </form>
          <p className="text-[11px] text-center mt-2" style={{ color: "#9CA3AF" }}>
            Respostas montadas a partir das fontes oficiais do site. Em perigo imediato, ligue 190.
          </p>
        </div>
      </div>
    </div>
  );
}

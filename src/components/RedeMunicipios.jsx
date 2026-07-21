import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone, ShieldAlert, Plus, Flame, Users, MapPin, Search, Clock,
  Info, Heart, MessageCircle, ChevronDown, Lock, Scale, GraduationCap,
  Building2, Stethoscope, HandHeart, Navigation,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import {
  SERVICOS_ESTADUAIS, MUNICIPIOS,
  ORIENTACAO_ZONA_RURAL, DATA_VERIFICACAO,
} from "@/data/redePB";
import { SERVICOS_LOCAIS, FONTE_SAUDE } from "@/data/redeSaudePB";

/* Tipos que são SEMPRE sigilosos, independentemente do que estiver cadastrado.
   Abrigo de mulheres em situação de violência nunca pode ter endereço público. */
const TIPOS_SIGILOSOS = ["casa_acolhimento"];
const TEXTO_SIGILO =
  "Endereço sigiloso por segurança — acesso somente mediante encaminhamento do CRAM, DEAM ou da Justiça.";

/* type do cadastro -> rótulo exibido */
const TIPO_ROTULO = {
  delegacia: "Delegacia / DEAM",
  casa_acolhimento: "Abrigo",
  cram: "CRAM",
  creas: "CREAS",
  upa: "UPA / Saúde",
  hospital: "Hospital",
  defensoria: "Defensoria",
  ministerio_publico: "Ministério Público",
  ong: "ONG / Coletivo",
  universidade: "Universidade",
  orgao_gestao: "Órgão gestor",
  pericia: "Perícia / Sala Lilás",
  policiamento: "Patrulha Maria da Penha",
};

function semAcento(t) {
  return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/* Descobre a cidade do serviço a partir do texto (endereço/nome), antes de
   qualquer ocultação por sigilo. Usa o maior nome que casar, para não confundir
   municípios cujo nome é parte de outro. */
function detectarCidade(texto, municipios) {
  const t = semAcento(texto);
  if (!t) return null;
  let achado = null;
  for (const m of municipios) {
    const n = semAcento(m.nome);
    if (n.length > 2 && t.includes(n)) {
      if (!achado || n.length > semAcento(achado.nome).length) achado = m;
    }
  }
  return achado;
}

/* Paleta do layout institucional */
const C = {
  page: "#FAFAFB", card: "#FFFFFF", border: "#E5E7EB",
  ink: "#1F2937", muted: "#6B7280",
  pink: "#E8235C", pinkSoft: "#FCE7F3", pinkInk: "#BE1249",
  purple: "#7C3AED", purpleSoft: "#F3E8FF", purpleInk: "#6D28D9",
  red: "#EF4444", redSoft: "#FEE2E2", redInk: "#B91C1C",
  orange: "#EA580C", orangeSoft: "#FFEDD5", orangeInk: "#C2410C",
  teal: "#0D9488", tealSoft: "#CCFBF1", tealInk: "#0F766E",
};

const ESTADUAL_UI = {
  "180": { icon: Phone,       fg: C.purple, bg: C.purpleSoft, badgeBg: C.purpleSoft, badgeFg: C.purpleInk, titulo: "Disque 180", sub: "Central de Atendimento\nà Mulher" },
  "190": { icon: ShieldAlert, fg: C.purple, bg: C.purpleSoft, badgeBg: C.purpleSoft, badgeFg: C.purpleInk, titulo: "190",        sub: "Polícia Militar\nEmergência" },
  "192": { icon: Plus,        fg: C.red,    bg: C.redSoft,    badgeBg: C.redSoft,    badgeFg: C.redInk,    titulo: "SAMU 192",   sub: "Serviço de Atendimento\nMóvel de Urgência" },
  "193": { icon: Flame,       fg: C.orange, bg: C.orangeSoft, badgeBg: C.orangeSoft, badgeFg: C.orangeInk, titulo: "193",        sub: "Corpo de Bombeiros\nMilitar" },
  "100": { icon: Users,       fg: C.teal,   bg: C.tealSoft,   badgeBg: C.tealSoft,   badgeFg: C.tealInk,   titulo: "Disque 100", sub: "Direitos Humanos\n(Anônimo)" },
};

const CAT_UI = {
  /* serviços estaduais (planilha verificada) */
  "Atendimento à mulher":  { fg: "#DB2777", bg: C.pinkSoft,   icon: Users,       rot: "Atendimento à Mulher" },
  "Segurança pública":     { fg: C.purple,  bg: C.purpleSoft, icon: ShieldAlert, rot: "Segurança Pública" },
  "Urgência em saúde":     { fg: C.red,     bg: C.redSoft,    icon: Plus,        rot: "Saúde" },
  "Incêndio e salvamento": { fg: C.orange,  bg: C.orangeSoft, icon: Flame,       rot: "Incêndio e Salvamento" },
  "Direitos humanos":      { fg: C.teal,    bg: C.tealSoft,   icon: Heart,       rot: "Direitos Humanos" },
  /* serviços municipais (cadastro verificado) */
  "Delegacia / DEAM":      { fg: C.purple,  bg: C.purpleSoft, icon: ShieldAlert, rot: "Delegacia / DEAM" },
  "Abrigo":                { fg: "#DB2777", bg: C.pinkSoft,   icon: Lock,        rot: "Abrigo" },
  "CRAM":                  { fg: "#DB2777", bg: C.pinkSoft,   icon: HandHeart,   rot: "CRAM" },
  "CREAS":                 { fg: C.teal,    bg: C.tealSoft,   icon: HandHeart,   rot: "CREAS" },
  "UPA / Saúde":           { fg: C.red,     bg: C.redSoft,    icon: Plus,        rot: "UPA / Saúde" },
  "Hospital":              { fg: C.red,     bg: C.redSoft,    icon: Stethoscope, rot: "Hospital" },
  "CAPS":                  { fg: C.teal,    bg: C.tealSoft,   icon: HandHeart,   rot: "CAPS (saúde mental)" },
  "Saúde":                 { fg: C.red,     bg: C.redSoft,    icon: Plus,        rot: "Saúde" },
  "Defensoria":            { fg: C.teal,    bg: C.tealSoft,   icon: Scale,       rot: "Defensoria" },
  "Ministério Público":    { fg: C.teal,    bg: C.tealSoft,   icon: Scale,       rot: "Ministério Público" },
  "ONG / Coletivo":        { fg: C.orange,  bg: C.orangeSoft, icon: HandHeart,   rot: "ONG / Coletivo" },
  "Universidade":          { fg: C.purple,  bg: C.purpleSoft, icon: GraduationCap, rot: "Universidade" },
  "Órgão gestor":          { fg: C.purple,  bg: C.purpleSoft, icon: Building2,   rot: "Órgão gestor" },
  "Perícia / Sala Lilás":  { fg: C.orange,  bg: C.orangeSoft, icon: Info,        rot: "Perícia / Sala Lilás" },
  "Patrulha Maria da Penha": { fg: C.purple, bg: C.purpleSoft, icon: ShieldAlert, rot: "Patrulha Maria da Penha" },
};

function LinhaServico({ s, cidade }) {
  const [aberto, setAberto] = useState(false);
  const ui = CAT_UI[s.categoria] || { fg: C.muted, bg: "#F3F4F6", icon: Info, rot: s.categoria };
  const Icone = ui.icon;
  const tel = String(s.telefone).replace(/\D/g, "");

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
      <div className="p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex items-start gap-3 md:w-[34%] min-w-0">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: ui.bg }}>
            <Icone className="w-5 h-5" style={{ color: ui.fg }} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm leading-snug" style={{ color: C.ink }}>{s.servico}</p>
            <span className="inline-block text-xs px-2 py-0.5 rounded-md font-medium mt-1"
              style={{ background: ui.bg, color: ui.fg }}>{ui.rot}</span>
          </div>
        </div>

        <div className="md:w-[28%] text-xs leading-relaxed" style={{ color: C.muted }}>
          <p className="flex items-center gap-1.5 font-medium" style={{ color: C.ink }}>
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ui.fg }} aria-hidden="true" />
            {s.local ? `${cidade || "Município"} – PB` : "Toda a Paraíba"}
          </p>
          {s.local ? (
            s.sigiloso ? (
              <p className="mt-1 pl-5 flex items-start gap-1.5 font-medium" style={{ color: "#BE1249" }}>
                <Lock className="w-3.5 h-3.5 mt-[1px] flex-shrink-0" aria-hidden="true" />
                Endereço sigiloso
              </p>
            ) : (
              <p className="mt-0.5 pl-5">{s.endereco}</p>
            )
          ) : (
            <p className="mt-0.5 pl-5">Cobertura estadual/nacional</p>
          )}
        </div>

        <div className="md:w-[24%] text-xs" style={{ color: C.muted }}>
          <p className="flex items-center gap-1.5 font-medium" style={{ color: C.ink }}>
            <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ui.fg }} aria-hidden="true" />{s.telefone}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />{s.horario}
          </p>
        </div>

        <div className="md:w-[14%] flex md:justify-end gap-2">
          {tel.length >= 8 && (
            <a href={`tel:${tel}`}
              className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg text-xs font-semibold text-white"
              style={{ background: ui.fg }} aria-label={`Ligar para ${s.servico}`}>
              <Phone className="w-3.5 h-3.5" aria-hidden="true" /> Ligar
            </a>
          )}
          <button onClick={() => setAberto(!aberto)}
            className="inline-flex items-center justify-center gap-1 h-9 px-3 rounded-lg text-xs font-semibold border"
            style={{ borderColor: ui.fg + "55", color: ui.fg, background: C.card }}
            aria-expanded={aberto}>
            Detalhes
            <ChevronDown className="w-3.5 h-3.5 transition-transform" style={{ transform: aberto ? "rotate(180deg)" : "none" }} aria-hidden="true" />
          </button>
        </div>
      </div>

      {aberto && (
        <div className="px-4 pb-4 border-t" style={{ borderColor: "#F3F4F6" }}>
          {s.sigiloso && (
            <p className="text-sm mt-3 px-3 py-2.5 rounded-lg flex items-start gap-2" style={{ background: C.pinkSoft, color: "#831843" }}>
              <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{TEXTO_SIGILO}</span>
            </p>
          )}
          {!s.sigiloso && s.endereco && (
            <>
              <p className="text-sm mt-3 flex items-start gap-2" style={{ color: C.muted }}>
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />{s.endereco}
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${s.servico}, ${s.endereco}, ${cidade || ""} - PB`
                )}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold text-white"
                style={{ background: ui.fg }}
                aria-label={`Traçar rota até ${s.servico} — abre o mapa em nova aba`}
              >
                <Navigation className="w-4 h-4" aria-hidden="true" /> Rota GPS
              </a>
            </>
          )}
          {s.descricao && (
            <p className="text-sm mt-2 leading-relaxed" style={{ color: C.muted }}>{s.descricao}</p>
          )}
          {s.orientacao && (
            <p className="text-xs mt-2 px-3 py-2 rounded-lg" style={{ background: "#FEF3C7", color: "#92400E" }}>
              {s.orientacao}
            </p>
          )}
          {s.whatsapp && (
            <p className="text-xs mt-2" style={{ color: C.muted }}>WhatsApp: <strong>{s.whatsapp}</strong></p>
          )}
        </div>
      )}
    </div>
  );
}

export default function RedeMunicipios() {
  const navigate = useNavigate();
  const [ibge, setIbge] = useState("");
  const [busca, setBusca] = useState("");
  const [aba, setAba] = useState("Todos os serviços");
  const [cadastrados, setCadastrados] = useState([]);

  /* Serviços municipais verificados (cadastro). Normalizados e com sigilo
     FORÇADO para abrigos — nunca exibimos endereço/coordenada de abrigo. */
  useEffect(() => {
    let vivo = true;
    base44.entities.Servico.filter({ active: true })
      .then((rows) => {
        if (!vivo) return;
        const norm = (rows || []).map((r) => {
          const sigiloso = TIPOS_SIGILOSOS.includes(r.type);
          /* cidade detectada ANTES de ocultar o endereço */
          const cidade = detectarCidade(`${r.address || ""} ${r.name || ""}`, MUNICIPIOS);
          return {
            id: `loc-${r.id}`,
            categoria: TIPO_ROTULO[r.type] || "Outros serviços",
            servico: r.name,
            telefone: r.phone || "",
            horario: r.hours || "",
            descricao: r.inclusion_notes || "",
            orientacao: "",
            endereco: sigiloso ? TEXTO_SIGILO : r.address || "",
            sigiloso,
            cidadeIbge: cidade ? cidade.ibge : null,
            local: true,
          };
        });
        setCadastrados(norm);
      })
      .catch(() => {});
    return () => { vivo = false; };
  }, []);

  const municipio = useMemo(() => MUNICIPIOS.find((m) => m.ibge === ibge) || null, [ibge]);

  /* Serviços do município selecionado: os do arquivo verificado + os cadastrados
     cujo endereço menciona a cidade. Sem cidade selecionada, não listamos os
     municipais (evita misturar cidades). */
  const locais = useMemo(() => {
    if (!municipio) return [];
    const daPlanilha = SERVICOS_LOCAIS[ibge] || [];
    const doCadastro = cadastrados.filter((s) => s.cidadeIbge === ibge);
    return [...daPlanilha, ...doCadastro];
  }, [municipio, ibge, cadastrados]);

  /* A cidade tem algum serviço ESPECIALIZADO em violência contra a mulher?
     (saúde geral não substitui delegacia/CRAM/abrigo/defensoria) */
  const ESPECIALIZADOS = ["Delegacia / DEAM", "CRAM", "Abrigo", "Defensoria", "CREAS", "Ministério Público", "Patrulha Maria da Penha"];
  const temEspecializado = useMemo(
    () => locais.some((s) => ESPECIALIZADOS.includes(s.categoria)),
    [locais]
  );

  /* abas: só das categorias municipais presentes (os serviços estaduais já
     aparecem no bloco "Atendimento Estadual", não repetimos aqui) */
  const abas = useMemo(() => {
    const cats = [];
    locais.forEach((s) => {
      if (!cats.includes(s.categoria)) cats.push(s.categoria);
    });
    return ["Todos os serviços", ...cats];
  }, [locais]);

  /* se a aba ativa sumir ao trocar de cidade, volta para "Todos" */
  useEffect(() => {
    if (!abas.includes(aba)) setAba("Todos os serviços");
  }, [abas, aba]);

  const lista = useMemo(() => {
    let base = [...locais];
    if (aba !== "Todos os serviços") base = base.filter((s) => s.categoria === aba);
    const q = busca.trim().toLowerCase();
    if (q) base = base.filter((s) =>
      s.servico.toLowerCase().includes(q) || s.categoria.toLowerCase().includes(q) || String(s.telefone).includes(q));
    return base;
  }, [busca, aba, locais]);

  return (
    <div style={{ background: C.page }}>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* ATENDIMENTO ESTADUAL */}
        <section className="rounded-2xl border p-5 md:p-6" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.purpleSoft }}>
              <ShieldAlert className="w-5 h-5" style={{ color: C.purple }} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: C.ink }}>Atendimento Estadual</h2>
              <p className="text-sm" style={{ color: C.muted }}>Serviços disponíveis em todo o estado da Paraíba</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {SERVICOS_ESTADUAIS.map((s) => {
              const ui = ESTADUAL_UI[String(s.telefone)] || ESTADUAL_UI["180"];
              const Icone = ui.icon;
              return (
                <a key={s.id} href={`tel:${String(s.telefone).replace(/\D/g, "")}`}
                  className="rounded-xl border p-4 text-center transition-colors hover:border-gray-300"
                  style={{ borderColor: C.border, background: C.card }}
                  aria-label={`Ligar para ${s.servico}`}>
                  <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-2.5" style={{ background: ui.bg }}>
                    <Icone className="w-6 h-6" style={{ color: ui.fg }} aria-hidden="true" />
                  </div>
                  <p className="font-bold text-sm" style={{ color: C.ink }}>{ui.titulo}</p>
                  <p className="text-xs mt-0.5 whitespace-pre-line leading-snug" style={{ color: C.muted }}>{ui.sub}</p>
                  <span className="inline-block text-xs px-2 py-1 rounded-md font-medium mt-2.5"
                    style={{ background: ui.badgeBg, color: ui.badgeFg }}>24h – Todos os dias</span>
                </a>
              );
            })}
          </div>

          <p className="text-sm text-center mt-5" style={{ color: C.muted }}>
            Estes serviços atendem todo o estado da Paraíba. Em caso de emergência, ligue!
          </p>
        </section>

        {/* FILTROS */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-5 h-5" style={{ color: C.pink }} aria-hidden="true" />
            <h2 className="text-xl font-bold" style={{ color: C.ink }}>Encontre ajuda na sua região</h2>
          </div>
          <p className="text-sm mb-4" style={{ color: C.muted }}>
            Use os filtros abaixo para encontrar serviços de apoio na sua cidade
          </p>

          <div className="rounded-2xl border p-4 md:p-5 grid md:grid-cols-[1fr_1fr_auto] gap-3 items-end"
            style={{ background: C.card, borderColor: C.border }}>
            <div>
              <label htmlFor="cidade" className="text-xs font-medium" style={{ color: C.muted }}>Filtrar por Cidade</label>
              <select id="cidade" value={ibge} onChange={(e) => setIbge(e.target.value)}
                className="mt-1.5 w-full h-11 rounded-lg border px-3 text-sm bg-white focus:outline-none focus:ring-2"
                style={{ borderColor: "#D1D5DB", color: C.ink }}>
                <option value="">Todas as cidades da Paraíba</option>
                {MUNICIPIOS.map((m) => <option key={m.ibge} value={m.ibge}>{m.nome}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="busca" className="text-xs font-medium" style={{ color: C.muted }}>Buscar por Serviço (opcional)</label>
              <input id="busca" value={busca} onChange={(e) => setBusca(e.target.value)}
                placeholder="Ex: mulher, polícia, saúde..."
                className="mt-1.5 w-full h-11 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: "#D1D5DB", color: C.ink }} />
            </div>
            <div className="h-11 px-6 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
              style={{ background: C.pink }} aria-hidden="true">
              <Search className="w-4 h-4" /> Buscar
            </div>
          </div>
        </section>

        {/* SERVIÇOS DISPONÍVEIS */}
        <section>
          <h2 className="text-xl font-bold" style={{ color: C.ink }}>Serviços disponíveis</h2>
          <p className="text-sm mb-4" style={{ color: C.muted }}>
            Resultados para: {municipio ? `${municipio.nome} – PB` : "Todas as cidades"}
            {aba !== "Todos os serviços" ? ` · ${CAT_UI[aba]?.rot || aba}` : ""}
          </p>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {abas.map((a) => {
              const ativo = aba === a;
              return (
                <button key={a} onClick={() => setAba(a)}
                  className="flex-shrink-0 h-10 px-4 rounded-lg text-sm font-medium border transition-colors"
                  style={{
                    background: ativo ? C.pinkSoft : C.card,
                    color: ativo ? C.pinkInk : C.muted,
                    borderColor: ativo ? C.pink + "55" : C.border,
                  }}>
                  {a === "Todos os serviços" ? a : (CAT_UI[a]?.rot || a)}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {lista.map((s) => (
              <LinhaServico key={`${s.id}-${s.servico}`} s={s} cidade={municipio?.nome} />
            ))}
            {lista.length === 0 && (
              <div className="rounded-xl border p-6 text-center" style={{ background: C.card, borderColor: C.border }}>
                <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: "#D1D5DB" }} aria-hidden="true" />
                <p className="text-sm font-medium" style={{ color: C.ink }}>
                  {municipio
                    ? `Nenhum serviço encontrado em ${municipio.nome} com esse filtro.`
                    : "Selecione sua cidade acima"}
                </p>
                <p className="text-sm mt-1" style={{ color: C.muted }}>
                  {municipio
                    ? "Tente outra categoria ou use o Atendimento Estadual acima."
                    : "Assim mostramos os serviços que atendem você. Os telefones de emergência acima funcionam em todo o estado."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* REDE ESPECIALIZADA — referência regional */}
        {municipio && !temEspecializado && (
          <section className="rounded-2xl border p-5" style={{ background: "#FFF7ED", borderColor: "#FDBA74" }}>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: C.orange }} aria-hidden="true" />
              <div>
                <p className="font-bold text-sm" style={{ color: C.orangeInk }}>
                  {municipio.nome} não tem serviço especializado próprio
                </p>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: "#7C2D12" }}>
                  Nem toda cidade da Paraíba tem Delegacia da Mulher (DEAM), CRAM, casa abrigo ou
                  Defensoria. Nesses casos, o atendimento é feito por uma <strong>unidade de referência
                  regional</strong> — e você tem direito a ser atendida nela.
                </p>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "#7C2D12" }}>
                  <strong>Ligue 180</strong> (gratuito, 24h): a central identifica a unidade de referência
                  da sua região e te orienta sobre onde ir e como chegar. Em perigo imediato, ligue{" "}
                  <strong>190</strong>.
                </p>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "#7C2D12" }}>
                  Você também pode procurar o <strong>CRAS</strong> da sua cidade ou a{" "}
                  <strong>Secretaria de Assistência Social</strong>, que fazem o encaminhamento.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ZONA RURAL */}
        <section className="rounded-2xl border p-5" style={{ background: "#FDF2F8", borderColor: "#FBCFE8" }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.pinkSoft }}>
              <Info className="w-5 h-5" style={{ color: C.pink }} aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: C.pinkInk }}>Mora na zona rural?</p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "#831843" }}>
                {ORIENTACAO_ZONA_RURAL}
              </p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "#831843" }}>
                Você também pode ligar para o <strong>Disque 180</strong> e ser orientada sobre os serviços
                disponíveis na sua região.
              </p>
            </div>
          </div>
        </section>

        {/* PRECISA DE AJUDA AGORA */}
        <section className="rounded-2xl border p-5 flex flex-col md:flex-row md:items-center gap-4"
          style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center gap-3 flex-1">
            <Heart className="w-9 h-9 flex-shrink-0" style={{ color: C.purple }} aria-hidden="true" />
            <div>
              <p className="font-bold text-base" style={{ color: C.ink }}>Precisa de ajuda agora?</p>
              <p className="text-sm" style={{ color: C.muted }}>Não espere. Você merece viver sem violência.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="tel:180"
              className="h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 border"
              style={{ borderColor: C.purple + "66", color: C.purple, background: C.card }}>
              <Phone className="w-4 h-4" aria-hidden="true" /> Ligar para 180
            </a>
            <button onClick={() => navigate("/app/chat")}
              className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2"
              style={{ background: C.purple }}>
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> Chatbot
            </button>
          </div>
        </section>

        <p className="text-xs text-center pb-2" style={{ color: "#9CA3AF" }}>
          Informações verificadas em fontes oficiais (gov.br, IBGE). Última atualização: {DATA_VERIFICACAO}.
        </p>
      </div>
    </div>
  );
}

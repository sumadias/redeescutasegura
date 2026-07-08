import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, GraduationCap, Briefcase, Users, Scale, Monitor, Lightbulb, ChevronRight } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";
import { GravuraSol } from "@/components/art/Gravuras";

const CATEGORIAS = [
  { id: "todos",           label: "Todos",            icon: GraduationCap },
  { id: "cursos",          label: "Cursos",           icon: GraduationCap },
  { id: "direitos",        label: "Direitos",         icon: Scale },
  { id: "renda",           label: "Renda e finanças", icon: Briefcase },
  { id: "empreendedorismo",label: "Empreendedorismo", icon: Lightbulb },
];

// Cursos reais da Escola Virtual do Governo (gov.br / Enap) — gratuitos e com
// certificado. Links verificados para escolavirtual.gov.br/curso/<id>.
const CURSOS = [
  { id: 1, categoria: "direitos",         titulo: "O Protagonismo das Mulheres",              instituicao: "Escola Virtual Gov (Enap)",    formato: "Online",  duracao: "30h", link: "https://www.escolavirtual.gov.br/curso/1189", gratuito: true, certificado: true, publico: "Mulheres e pessoas interessadas na participação das mulheres em espaços de poder", obs: "" },
  { id: 2, categoria: "cursos",           titulo: "Autoconhecimento e Motivação",             instituicao: "Escola Virtual Gov (Enap)",    formato: "Online",  duracao: "",    link: "https://www.escolavirtual.gov.br/curso/765",  gratuito: true, certificado: true, publico: "Público geral", obs: "" },
  { id: 3, categoria: "renda",            titulo: "Educação Financeira Pessoal",              instituicao: "Escola Virtual Gov (Enap)",    formato: "Online",  duracao: "",    link: "https://www.escolavirtual.gov.br/curso/1076", gratuito: true, certificado: true, publico: "Público geral", obs: "" },
  { id: 4, categoria: "renda",            titulo: "Gestão de Finanças Pessoais",              instituicao: "Banco Central · Escola Virtual Gov", formato: "Online", duracao: "", link: "https://www.escolavirtual.gov.br/curso/170",  gratuito: true, certificado: true, publico: "Público geral", obs: "" },
  { id: 5, categoria: "empreendedorismo", titulo: "Economia criativa, empreendedorismo e inovação", instituicao: "Escola Virtual Gov (Enap)", formato: "Online", duracao: "", link: "https://www.escolavirtual.gov.br/curso/849",  gratuito: true, certificado: true, publico: "Interessadas em empreender e gerar renda", obs: "" },
  { id: 6, categoria: "cursos",           titulo: "Gestão do Tempo e Produtividade",          instituicao: "Escola Virtual Gov (Enap)",    formato: "Online",  duracao: "",    link: "https://www.escolavirtual.gov.br/curso/468",  gratuito: true, certificado: true, publico: "Público geral", obs: "" },
];

export default function TrilhaRecomeco() {
  const navigate = useNavigate();
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [expandido, setExpandido] = useState(null);

  const cursosFiltrados = categoriaAtiva === "todos"
    ? CURSOS
    : CURSOS.filter(c => c.categoria === categoriaAtiva);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      {/* Header com marca-d'água */}
      <div className="px-4 pt-14 pb-3 max-w-md mx-auto w-full relative overflow-hidden">
        <div className="absolute top-10 -right-4 pointer-events-none" aria-hidden="true">
          <GravuraSol size={140} color="#9A3412" opacity={0.10} />
        </div>
        <button
          onClick={() => navigate("/app/meu-espaco")}
          className="flex items-center gap-2 text-sm mb-4 focus:outline-none focus:ring-2 rounded"
          style={{ color: "#78716C" }}
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F0FDF4" }}>
            <GraduationCap className="w-5 h-5" style={{ color: "#15803D" }} />
          </div>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Trilha Recomeço</h1>
            <p className="text-sm" style={{ color: "#78716C" }}>Cursos, mentorias e caminhos para autonomia</p>
          </div>
        </div>
      </div>

      {/* Aviso */}
      <div className="mx-4 max-w-md self-center w-full mb-3 space-y-2">
        <div className="rounded-xl px-4 py-2.5 text-sm border" style={{ background: "#F0FDF4", color: "#166534", borderColor: "#15803D22" }}>
          Cursos gratuitos e com certificado da Escola Virtual do Governo (gov.br). Os links abrem em nova aba.
        </div>
        <a
          href="https://www.escolavirtual.gov.br/catalogo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-sm font-semibold border transition-colors"
          style={{ borderColor: "#15803D", color: "#15803D", background: "#fff" }}
        >
          Ver todo o catálogo de cursos <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Filtros */}
      <div className="px-4 max-w-md mx-auto w-full mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all focus:outline-none focus:ring-2"
              style={{
                background: categoriaAtiva === cat.id ? "#15803D" : "#fff",
                color: categoriaAtiva === cat.id ? "#fff" : "#57534E",
                borderColor: categoriaAtiva === cat.id ? "#15803D" : "#D6D3D1",
              }}
              aria-label={cat.label}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="flex-1 px-4 pb-10 max-w-md mx-auto w-full space-y-3">
        <p className="text-xs" style={{ color: "#A8A29E" }}>{cursosFiltrados.length} recursos disponíveis</p>
        {cursosFiltrados.map((curso, i) => {
          const aberto = expandido === curso.id;
          return (
            <motion.div
              key={curso.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border overflow-hidden bg-white"
              style={{ borderColor: "#E7E5E4" }}
            >
              <button
                onClick={() => setExpandido(aberto ? null : curso.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left focus:outline-none focus:ring-2"
                aria-expanded={aberto}
                aria-label={curso.titulo}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm" style={{ color: "#292524" }}>{curso.titulo}</p>
                    {curso.gratuito && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#F0FDF4", color: "#15803D" }}>Gratuito</span>
                    )}
                    {curso.certificado && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#F0FDFA", color: "#0F766E" }}>Certificado</span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#78716C" }}>{curso.instituicao} · {curso.formato}{curso.duracao ? ` · ${curso.duracao}` : ""}</p>
                </div>
                <ChevronRight
                  className="w-4 h-4 flex-shrink-0 transition-transform"
                  style={{ color: "#A8A29E", transform: aberto ? "rotate(90deg)" : "rotate(0deg)" }}
                />
              </button>

              <AnimatePresence>
                {aberto && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: "#F5F5F4" }}>
                      <div className="pt-3 space-y-1.5">
                        <p className="text-xs" style={{ color: "#57534E" }}>
                          <strong>Público:</strong> {curso.publico}
                        </p>
                        {curso.obs && (
                          <p className="text-xs px-3 py-2 rounded-xl" style={{ background: "#FEF3C7", color: "#92400E" }}>
                            {curso.obs}
                          </p>
                        )}
                      </div>
                      <a
                        href={curso.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-sm font-semibold text-white transition-colors"
                        style={{ background: "#15803D" }}
                        aria-label={`Acessar ${curso.titulo} — abre em nova aba`}
                      >
                        Acessar curso <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <p className="text-xs text-center" style={{ color: "#A8A29E" }}>Este link abre em uma nova aba, em site externo.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
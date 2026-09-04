import { Link } from "react-router-dom";
import {
  Route, HeartHandshake, FileText, ShieldCheck, BookOpen, Satellite,
  Smartphone, Baby, NotebookPen, Sparkles, ArrowRight,
} from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, TituloSecao, FaixaAjuda } from "@/components/site/ui";

/* Hub de Orientação. Só os guias próprios desta área — não repetimos aqui o que
   já tem lugar no menu (Jogos, Assistente) nem o conteúdo informativo que já
   existe em outras páginas (O que é violência, Meus direitos). */
const RECURSOS = [
  {
    icone: Route, cor: T.roxo, bg: T.roxoSuave, href: "/orientacao/rota",
    titulo: "Rota de atendimento", texto: "Onde começar e o que acontece em cada porta da rede — sem ordem obrigatória.",
  },
  {
    icone: HeartHandshake, cor: T.rosa, bg: T.rosaSuave, href: "/orientacao/ajudando",
    titulo: "Estou ajudando alguém", texto: "O que dizer, o que evitar e como apoiar com segurança quem vive violência.",
  },
  {
    icone: FileText, cor: T.verde, bg: T.verdeSuave, href: "/orientacao/documentos",
    titulo: "Lista de documentos", texto: "O que costuma ajudar em cada serviço — lembrando que a falta não impede o atendimento.",
  },
  {
    icone: ShieldCheck, cor: T.verde, bg: T.verdeSuave, href: "/seguranca",
    titulo: "Segurança e privacidade", texto: "Como usar o site com discrição e o que ele faz para proteger você.",
  },
  {
    icone: Satellite, cor: T.roxo, bg: T.roxoSuave, href: "/orientacao/zona-rural",
    titulo: "Zona rural e baixa conectividade", texto: "Buscar pela sua cidade sem GPS, usar offline e ouvir as informações.",
  },
  {
    icone: Smartphone, cor: T.roxo, bg: T.roxoSuave, href: "/orientacao/seguranca-digital",
    titulo: "Segurança digital", texto: "Passos por aparelho para proteger suas contas e reduzir a vigilância.",
  },
  {
    icone: Baby, cor: T.verde, bg: T.verdeSuave, href: "/orientacao/plano-filhos",
    titulo: "Plano para filhos e dependentes", texto: "Checklist para se organizar — sem pedir nomes e sem guardar nada.",
  },
  {
    icone: NotebookPen, cor: T.rosa, bg: T.rosaSuave, href: "/orientacao/relato",
    titulo: "Organizar meu relato", texto: "Anotar o que aconteceu em ordem de data. Nada é gravado; você baixa se quiser.",
  },
  {
    icone: Sparkles, cor: T.verde, bg: T.verdeSuave, href: "/orientacao/simples",
    titulo: "Explicação simples", texto: "As informações mais importantes com palavras fáceis e frases curtas.",
  },
];

export default function Orientacao() {
  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
            Orientação
          </h1>
          <p className="text-sm md:text-lg mt-4 leading-relaxed max-w-2xl" style={{ color: "#E4DBFB" }}>
            Guias e ferramentas para entender seus direitos, saber a quem recorrer e apoiar quem
            precisa. Conteúdo aberto, sem cadastro.
          </p>
        </div>
      </div>

      <Secao className="py-10 md:py-14">
        <TituloSecao
          titulo="Por onde você quer começar"
          sub="Cada card leva a um guia. Você não precisa seguir nenhuma ordem."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RECURSOS.map((r) => (
            <Link key={r.href} to={r.href}
              className="rounded-2xl border p-6 transition-colors hover:border-violet-300 flex flex-col"
              style={{ background: T.cartao, borderColor: T.borda }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: r.bg }}>
                <r.icone className="w-5 h-5" style={{ color: r.cor }} aria-hidden="true" />
              </span>
              <p className="font-bold text-base leading-snug" style={{ color: T.tinta }}>{r.titulo}</p>
              <p className="text-sm mt-2 leading-relaxed flex-1" style={{ color: T.texto }}>{r.texto}</p>
              <span className="text-sm font-semibold mt-4 inline-flex items-center gap-1.5"
                style={{ color: r.cor }}>
                Abrir <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FFF7ED", borderColor: "#FDBA74" }} role="note">
          <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.ambar }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7C2D12" }}>
            <strong>Conteúdo educativo.</strong> Estes guias ajudam a entender e a se orientar, mas
            não substituem atendimento jurídico, psicológico, policial, de saúde ou de assistência
            social. Em perigo imediato, ligue <strong>190</strong>.
          </p>
        </div>
      </Secao>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

import { Link } from "react-router-dom";
import {
  ArrowLeft, Hand, Scale, ListChecks, Phone, MapPin, BookOpen, Info,
} from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";

/* #18 Leitura simplificada — versão em linguagem simples dos temas essenciais.
 *
 * Regras seguidas: uma ideia por bloco, frases curtas, passos numerados, sem
 * jargão, sem retirar alertas ou direitos importantes, sem infantilizar. Os
 * pictogramas (ícones) sempre vêm com texto. Cada tema aponta para o texto
 * completo.
 *
 * Primeira versão — deve passar por revisão de um especialista em linguagem
 * simples e por testes com pessoas de diferentes níveis de escolaridade.
 */
function Bloco({ children }) {
  return <p className="text-base leading-relaxed" style={{ color: T.tinta }}>{children}</p>;
}

export default function LeituraSimples() {
  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 py-10 md:py-14">
          <Link to="/orientacao" className="text-sm font-medium inline-flex items-center gap-1.5"
            style={{ color: "#E4DBFB" }}>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Orientação
          </Link>
          <h1 className="text-3xl md:text-[38px] font-extrabold text-white tracking-tight leading-tight mt-3">
            Explicação simples
          </h1>
          <p className="text-base md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            As informações mais importantes, com palavras fáceis e frases curtas.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-10 space-y-6">

        {/* O que é violência */}
        <Cartao className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: T.rosaSuave }}>
              <Hand className="w-5 h-5" style={{ color: T.rosa }} aria-hidden="true" />
            </span>
            <h2 className="text-xl font-bold" style={{ color: T.tinta }}>O que é violência</h2>
          </div>
          <div className="space-y-3">
            <Bloco>Violência não é só bater.</Bloco>
            <Bloco>Também é humilhar, xingar e controlar você.</Bloco>
            <Bloco>É forçar você a fazer sexo.</Bloco>
            <Bloco>É tomar seu dinheiro ou seus documentos.</Bloco>
            <Bloco>É espalhar mentiras para te envergonhar.</Bloco>
            <Bloco><strong>Nada disso é culpa sua.</strong> Você pode pedir ajuda.</Bloco>
          </div>
          <Link to="/app/o-que-e-violencia" className="text-sm font-semibold mt-4 inline-flex items-center gap-1.5"
            style={{ color: T.roxo }}>
            <BookOpen className="w-4 h-4" aria-hidden="true" /> Ler o texto completo
          </Link>
        </Cartao>

        {/* Seus direitos */}
        <Cartao className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: T.roxoSuave }}>
              <Scale className="w-5 h-5" style={{ color: T.roxo }} aria-hidden="true" />
            </span>
            <h2 className="text-xl font-bold" style={{ color: T.tinta }}>Você tem direitos</h2>
          </div>
          <div className="space-y-3">
            <Bloco>Pedir ajuda é de graça.</Bloco>
            <Bloco>Você pode pedir uma ordem para o agressor ficar longe. Isso se chama medida protetiva.</Bloco>
            <Bloco>Você não precisa de advogado nem de dinheiro para isso.</Bloco>
            <Bloco>A polícia tem o dever de te atender.</Bloco>
          </div>
          <Link to="/app/direitos" className="text-sm font-semibold mt-4 inline-flex items-center gap-1.5"
            style={{ color: T.roxo }}>
            <BookOpen className="w-4 h-4" aria-hidden="true" /> Ler o texto completo
          </Link>
        </Cartao>

        {/* O que fazer agora */}
        <Cartao className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: T.verdeSuave }}>
              <ListChecks className="w-5 h-5" style={{ color: T.verde }} aria-hidden="true" />
            </span>
            <h2 className="text-xl font-bold" style={{ color: T.tinta }}>O que fazer agora</h2>
          </div>
          <ol className="space-y-3">
            {[
              "Se você está em perigo agora, ligue 190.",
              "Para conversar e receber orientação, ligue 180. É de graça e funciona dia e noite.",
              "Procure a delegacia da mulher, o CRAM ou a Defensoria.",
              "Você pode levar uma pessoa de confiança com você.",
            ].map((passo, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: T.verdeSuave, color: "#0F766E" }} aria-hidden="true">{i + 1}</span>
                <span className="text-base leading-relaxed" style={{ color: T.tinta }}>{passo}</span>
              </li>
            ))}
          </ol>
        </Cartao>

        {/* Onde pedir ajuda */}
        <Cartao className="p-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: T.tinta }}>Onde pedir ajuda</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:180"
              className="flex-1 h-14 rounded-xl inline-flex items-center justify-center gap-2 text-base font-bold text-white"
              style={{ background: T.roxo }}>
              <Phone className="w-5 h-5" aria-hidden="true" /> Ligar 180
            </a>
            <a href="tel:190"
              className="flex-1 h-14 rounded-xl inline-flex items-center justify-center gap-2 text-base font-bold text-white"
              style={{ background: "#DC2626" }}>
              <Phone className="w-5 h-5" aria-hidden="true" /> Ligar 190
            </a>
          </div>
          <Link to="/emergencia"
            className="mt-3 h-14 rounded-xl inline-flex items-center justify-center gap-2 text-base font-bold border w-full"
            style={{ borderColor: T.roxo, color: T.roxo, background: T.cartao }}>
            <MapPin className="w-5 h-5" aria-hidden="true" /> Ver ajuda perto de mim
          </Link>
        </Cartao>

        <div className="rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FFF7ED", borderColor: "#FDBA74" }} role="note">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.ambar }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7C2D12" }}>
            Esta é uma versão em linguagem simples, feita para ser fácil de ler. Ela ainda vai passar
            por revisão. Os textos completos trazem mais detalhes.
          </p>
        </div>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";

export default function OQueEViolencia() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAFAF9" }}>
      <QuickExitButton />
      <main className="flex-1 px-4 pt-14 pb-10 max-w-md mx-auto w-full space-y-6">
        <div className="pt-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#57534E" }} />
          </button>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "#292524" }}>O que é violência contra a mulher?</h1>
            <p className="text-sm" style={{ color: "#57534E" }}>Entenda seus direitos</p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#57534E" }}>
          <p>
            Violência contra a mulher não é apenas agressão física. É toda atitude que fere sua dignidade, tira sua paz, limita sua liberdade, ameaça sua vida ou causa sofrimento físico, psicológico, sexual, moral ou patrimonial.
          </p>
          <p>
            Muitas mulheres vivem situações de violência em silêncio. Algumas sentem medo, vergonha, culpa ou dependência emocional e financeira. Outras não reconhecem de imediato que estão sendo violentadas, porque a violência, muitas vezes, começa de forma sutil: uma palavra que humilha, um controle disfarçado de cuidado, uma ameaça escondida em uma conversa, uma proibição apresentada como proteção.
          </p>
          <p>
            Mas nenhuma mulher merece viver com medo. Nenhuma mulher deve ser diminuída, controlada, machucada ou silenciada.
          </p>
          <p>
            A violência doméstica é uma das principais causas de feminicídio no Brasil e no mundo. Por isso, falar sobre esse tema é uma forma de proteger vidas, romper ciclos de abuso e lembrar que toda mulher tem direito ao respeito, à segurança e à liberdade.
          </p>

          <p className="font-semibold pt-2" style={{ color: "#292524" }}>Conheça algumas formas de violência contra a mulher</p>

          <div className="space-y-3">
            <p><strong style={{ color: "#292524" }}>Violência física:</strong> quando o corpo da mulher é agredido por meio de tapas, socos, empurrões, chutes, puxões de cabelo, queimaduras, cortes, apertões, ferimentos ou qualquer outra ação que cause dor ou lesão.</p>
            <p><strong style={{ color: "#292524" }}>Violência sexual:</strong> quando a mulher é obrigada, pressionada ou manipulada a fazer algo contra sua vontade no campo sexual. Isso inclui forçar relações sexuais, impedir o uso de métodos contraceptivos, obrigar aborto, casamento, prostituição ou exposição a conteúdos pornográficos.</p>
            <p><strong style={{ color: "#292524" }}>Violência moral:</strong> quando a honra e a imagem da mulher são atacadas por xingamentos, acusações falsas, humilhações públicas, mentiras espalhadas sobre ela ou palavras usadas para destruir sua reputação.</p>
            <p><strong style={{ color: "#292524" }}>Violência patrimonial:</strong> quando o agressor controla, retém, destrói ou danifica bens, documentos, roupas, dinheiro, objetos pessoais ou instrumentos de trabalho da mulher, tentando impedir sua independência e autonomia.</p>
            <p><strong style={{ color: "#292524" }}>Violência psicológica:</strong> quando a mulher é ameaçada, humilhada, chantageada, perseguida, manipulada, isolada da família e dos amigos, impedida de estudar, trabalhar ou sair de casa. Também acontece quando o agressor controla seu celular, suas redes sociais, suas escolhas e faz com que ela duvide de si mesma.</p>
          </div>

          <p className="pt-2">
            Romper o silêncio pode salvar vidas. Buscar ajuda não é fraqueza: é um ato de coragem. Toda mulher merece viver sem medo, com dignidade, respeito e liberdade.
          </p>
        </div>

        <div className="rounded-xl px-5 py-4 flex items-start gap-3" style={{ background: "#FEF3C7", border: "1px solid #B4530922" }}>
          <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#92400E" }} />
          <p className="text-sm leading-relaxed" style={{ color: "#92400E" }}>
            Em perigo imediato? Ligue <strong>190</strong> ou <strong>180</strong> agora.
          </p>
        </div>

        <p className="text-xs text-center px-2 leading-relaxed" style={{ color: "#A8A29E" }}>
          Estas informações são orientativas e não substituem atendimento jurídico profissional.
          Para orientação gratuita, procure a Defensoria Pública do seu estado.
        </p>
      </main>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";

export default function ViolenciaDomestica() {
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
            <h1 className="text-xl font-semibold" style={{ color: "#292524" }}>Quando ocorre a violência doméstica?</h1>
            <p className="text-sm" style={{ color: "#57534E" }}>Entenda seus direitos</p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#57534E" }}>
          <p>
            A violência doméstica pode estar mais perto do que muitas pessoas imaginam. Ela não acontece apenas quando existe agressão física. Também pode surgir dentro de casa, na convivência familiar ou em relações marcadas por afeto, confiança e intimidade.
          </p>
          <p>
            Ela pode ocorrer quando o agressor mora com a vítima, quando faz parte da família ou quando teve, ou ainda tem, algum vínculo afetivo com ela. Muitas vezes, essa violência vem de alguém que a mulher amou, em quem confiou ou com quem dividiu sonhos, casa, filhos e planos de vida.
          </p>
          <p>
            Por isso, reconhecer a violência nem sempre é fácil. Em muitos casos, ela começa de forma silenciosa: uma cobrança excessiva, uma palavra que machuca, um ciúme apresentado como amor, uma ameaça disfarçada de preocupação. Aos poucos, a mulher pode se sentir presa, culpada, confusa e com medo de pedir ajuda.
          </p>
          <p>
            A violência doméstica costuma seguir um ciclo doloroso, que pode se repetir várias vezes se não for interrompido.
          </p>

          <p className="font-semibold pt-2" style={{ color: "#292524" }}>O ciclo da violência</p>

          <div className="space-y-4">
            <div className="rounded-xl p-4 space-y-1" style={{ background: "#FFF7ED", border: "1px solid #FED7AA" }}>
              <p className="font-semibold text-xs uppercase tracking-wide" style={{ color: "#C2410C" }}>1. Aumento da tensão</p>
              <p>Nessa fase, o agressor começa a demonstrar irritação, raiva, controle e agressividade. Podem surgir xingamentos, ameaças, humilhações, acusações e atitudes que deixam a mulher em constante estado de alerta. Ela passa a medir palavras, evitar conflitos e tentar impedir que a situação piore.</p>
            </div>
            <div className="rounded-xl p-4 space-y-1" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
              <p className="font-semibold text-xs uppercase tracking-wide" style={{ color: "#B91C1C" }}>2. Ato de violência</p>
              <p>É o momento em que a tensão se transforma em agressão. A violência pode ser física, psicológica, sexual, moral ou patrimonial. O agressor perde o controle e descarrega sua raiva sobre a vítima, causando dor, medo, sofrimento e insegurança.</p>
            </div>
            <div className="rounded-xl p-4 space-y-1" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
              <p className="font-semibold text-xs uppercase tracking-wide" style={{ color: "#15803D" }}>3. Arrependimento ou "lua de mel"</p>
              <p>Depois da agressão, o agressor pode pedir perdão, prometer que vai mudar, demonstrar carinho, chorar ou tentar convencer a vítima de que aquilo não acontecerá novamente. Essa fase pode gerar esperança e confusão, fazendo a mulher acreditar que a relação ainda pode melhorar.</p>
            </div>
          </div>

          <p>
            Mas, quando não há uma mudança real e ajuda adequada, o ciclo tende a se repetir. A tensão volta, a violência acontece novamente e o pedido de desculpas passa a fazer parte de um padrão de abuso.
          </p>
          <p>
            Nenhuma mulher deve se sentir culpada pela violência que sofre. A responsabilidade nunca é da vítima. Toda mulher tem direito à segurança, ao respeito, à liberdade e a uma vida sem medo.
          </p>
          <p className="font-medium" style={{ color: "#292524" }}>
            Pedir ajuda é um ato de coragem. Romper o silêncio pode salvar uma vida.
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
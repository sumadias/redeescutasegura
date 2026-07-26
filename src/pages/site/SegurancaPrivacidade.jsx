import { Link } from "react-router-dom";
import {
  DoorOpen, MapPinOff, EyeOff, Users, Info, ArrowRight, Zap,
} from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";

/* Modo camuflado e segurança digital (#6).
 *
 * Reúne, num só lugar, medidas que já valem no site — não promete o que não
 * controla (ex.: não afirma que apaga o histórico do navegador). Cada item é
 * um fato verdadeiro sobre como o site já funciona hoje.
 */
const MEDIDAS = [
  {
    icone: DoorOpen, titulo: "Sair rápido, a qualquer momento",
    texto: "O botão “Sair rapidamente” fica sempre no canto da tela. A tecla Esc faz o mesmo: troca esta página por uma neutra na hora. Ninguém precisa saber o que você estava vendo.",
  },
  {
    icone: MapPinOff, titulo: "O site não pede sua localização",
    texto: "Você encontra serviços buscando pelo nome da sua cidade. Em nenhum momento pedimos ou usamos onde você está.",
  },
  {
    icone: EyeOff, titulo: "Não guardamos o que você faz aqui",
    texto: "O assistente e os jogos não gravam nada. O que você escreve no Meu Espaço fica só na sua conta — nem a equipe nem a administração têm acesso.",
  },
  {
    icone: Users, titulo: "Cuidado com aparelhos e contas compartilhados",
    texto: "Se outra pessoa usa o mesmo celular, computador ou as mesmas contas (e-mail, nuvem), ela pode ver rastros que não dependem deste site. Prefira um aparelho a que só você tem acesso quando puder.",
  },
];

export default function SegurancaPrivacidade() {
  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
            Segurança e privacidade
          </h1>
          <p className="text-sm md:text-lg mt-4 leading-relaxed max-w-2xl" style={{ color: "#E4DBFB" }}>
            Como usar este site com mais discrição, e o que ele faz — e não faz — para proteger
            você. Faça só o que for seguro neste momento.
          </p>
        </div>
      </div>

      <Secao className="py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {MEDIDAS.map((m) => (
            <Cartao key={m.titulo} className="p-6 flex gap-4">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: T.roxoSuave }}>
                <m.icone className="w-5 h-5" style={{ color: T.roxo }} aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold text-base" style={{ color: T.tinta }}>{m.titulo}</p>
                <p className="text-sm mt-1.5 leading-relaxed" style={{ color: T.texto }}>{m.texto}</p>
              </div>
            </Cartao>
          ))}
        </div>

        {/* honestidade sobre o que o site NÃO controla */}
        <div className="mt-6 rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FFF7ED", borderColor: "#FDBA74" }} role="note">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.ambar }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7C2D12" }}>
            <strong>O que não podemos prometer:</strong> este site não controla o histórico do seu
            navegador, notificações do aparelho ou o que outras contas registram. Por isso não
            dizemos que “apagamos tudo” — dizemos com honestidade o que está no nosso alcance.
          </p>
        </div>

        {/* atalho para a Central Meus Dados */}
        <Cartao className="mt-6 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: T.roxoSuave }}>
            <EyeOff className="w-5 h-5" style={{ color: T.roxo }} aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-base" style={{ color: T.tinta }}>Meus dados</p>
            <p className="text-sm mt-1" style={{ color: T.texto }}>
              Veja o que está guardado neste aparelho e apague o que quiser.
            </p>
          </div>
          <Link to="/meus-dados"
            className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
            style={{ background: T.roxo }}>
            Abrir <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Cartao>

        {/* atalho para a página de 30 segundos */}
        <Cartao className="mt-6 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: T.rosaSuave }}>
            <Zap className="w-5 h-5" style={{ color: T.rosa }} aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-base" style={{ color: T.tinta }}>Tem pouco tempo?</p>
            <p className="text-sm mt-1" style={{ color: T.texto }}>
              Uma tela enxuta com só três opções: pedir socorro, achar serviço ou sair.
            </p>
          </div>
          <Link to="/agora"
            className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
            style={{ background: T.roxo }}>
            Abrir <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Cartao>
      </Secao>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

import { Link } from "react-router-dom";
import {
  ShieldAlert, MessageCircle, ArrowRight, HeartHandshake, Compass, Network,
  BookOpen, Home as Casa, Scale, Lock, Route, Smartphone,
} from "lucide-react";
import MapaPBNeon from "@/components/MapaPBNeon";
import { T } from "@/components/site/tokens";
import { Secao, TituloSecao, Cartao, AtendimentoEstadual, FaixaAjuda } from "@/components/site/ui";

const MISSAO = [
  {
    icone: HeartHandshake, fg: T.rosa, bg: T.rosaSuave, titulo: "Acolhimento",
    texto: "Escuta ativa e humanizada, para que nenhuma mulher se sinta sozinha.",
  },
  {
    icone: Compass, fg: T.roxo, bg: T.roxoSuave, titulo: "Orientação",
    texto: "Informações claras sobre direitos e sobre os serviços disponíveis na sua cidade.",
  },
  {
    icone: Network, fg: T.verde, bg: T.verdeSuave, titulo: "Conexão",
    texto: "Encaminhamento para os serviços de proteção e apoio especializado.",
  },
];

const GUIAS = [
  {
    icone: Route, fg: T.roxo, bg: T.roxoSuave, href: "/orientacao/rota",
    titulo: "Rota de atendimento", texto: "Por onde começar e o que acontece em cada porta — sem ordem obrigatória.",
  },
  {
    icone: HeartHandshake, fg: T.rosa, bg: T.rosaSuave, href: "/orientacao/ajudando",
    titulo: "Estou ajudando alguém", texto: "O que dizer, o que evitar e como apoiar com segurança.",
  },
  {
    icone: Smartphone, fg: T.verde, bg: T.verdeSuave, href: "/orientacao/seguranca-digital",
    titulo: "Segurança digital", texto: "Proteger suas contas e reduzir a vigilância, passo a passo.",
  },
];

const INFORMATIVOS = [
  {
    icone: BookOpen, href: "/app/o-que-e-violencia", titulo: "O que é violência contra a mulher",
    texto: "As cinco formas que a lei reconhece — e por que nenhuma delas é culpa sua.",
  },
  {
    icone: Casa, href: "/app/violencia-domestica", titulo: "Quando ocorre a violência doméstica",
    texto: "Sinais, ciclo da violência e o que fazer em cada momento.",
  },
  {
    icone: Scale, href: "/app/direitos", titulo: "Meus direitos",
    texto: "Medida protetiva, Lei Maria da Penha e atendimento gratuito, em linguagem simples.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#150E38 0%,#1E1450 45%,#2A1A63 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative w-full
                        md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,45%)] md:items-center md:gap-8">
          {/* mesma regra do hero da Emergência: no desktop a silhueta é coluna
              da grade (nunca encosta no texto); no celular vira fundo apagado */}
          <MapaPBNeon className="absolute inset-y-0 right-[-26%] h-full w-auto max-w-none opacity-20 pointer-events-none
                                 md:static md:opacity-100 md:h-auto md:w-full md:col-start-2 md:row-start-1" />

          <div className="relative md:col-start-1 md:row-start-1">
            <p className="text-xs font-bold tracking-[0.18em] uppercase mb-3" style={{ color: "#9E8AE8" }}>
              Paraíba
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.08]">
              Rede Escuta Segura
            </h1>
            <p className="text-lg md:text-xl font-bold mt-3" style={{ color: "#FF4D8D" }}>
              Você não está sozinha. Estamos aqui por você.
            </p>
            <p className="text-sm md:text-base mt-4 leading-relaxed" style={{ color: "#C9C2E8" }}>
              Uma rede comprometida em acolher, orientar e conectar mulheres em situação de
              violência a serviços confiáveis e seguros em todo o estado da Paraíba.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <Link to="/emergencia"
                className="h-12 px-6 rounded-full text-sm font-bold text-white inline-flex items-center justify-center gap-2"
                style={{ background: T.rosa, boxShadow: "0 8px 28px rgba(232,35,92,0.45)" }}>
                <ShieldAlert className="w-4 h-4" aria-hidden="true" /> Encontrar ajuda agora
              </Link>
              <Link to="/assistente"
                className="h-12 px-6 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 border"
                style={{ borderColor: "rgba(255,255,255,0.35)", color: "#FFFFFF" }}>
                <MessageCircle className="w-4 h-4" aria-hidden="true" /> Perguntar ao assistente
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-white text-center text-xs px-4 py-2" style={{ background: "#1A1145" }} role="note">
        <Lock className="w-3 h-3 inline mr-1" style={{ color: "#5CC8BC" }} aria-hidden="true" />
        Navegação livre: as páginas de emergência e de informação não pedem cadastro.
      </div>

      {/* ATENDIMENTO ESTADUAL */}
      <Secao className="py-10 md:py-14">
        <Cartao className="p-5 md:p-6">
          <TituloSecao
            icone={ShieldAlert}
            titulo="Atendimento Estadual"
            sub="Serviços que atendem todo o estado da Paraíba, 24 horas por dia. Em caso de emergência, ligue."
          />
          <AtendimentoEstadual />
        </Cartao>
      </Secao>

      {/* MISSÃO */}
      <Secao className="pb-10 md:pb-14">
        <TituloSecao
          centro
          titulo="Nossa missão"
          sub="Promover o acolhimento humanizado e o acesso à informação de qualidade, conectando mulheres a serviços de apoio e proteção."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {MISSAO.map((m) => (
            <Cartao key={m.titulo} className="p-6 text-center">
              <span className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4"
                style={{ background: m.bg }}>
                <m.icone className="w-6 h-6" style={{ color: m.fg }} aria-hidden="true" />
              </span>
              <p className="font-bold text-base" style={{ color: T.tinta }}>{m.titulo}</p>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: T.texto }}>{m.texto}</p>
            </Cartao>
          ))}
        </div>
      </Secao>

      {/* ORIENTAÇÃO — destaque dos guias (substitui o mapa, que já aparece no topo) */}
      <Secao className="pb-10 md:pb-14">
        <div className="rounded-3xl border p-6 md:p-10"
          style={{ borderColor: T.borda, background: "linear-gradient(135deg,#F1EBFF 0%,#FCE9F1 100%)" }}>
          <div className="md:flex md:items-end md:justify-between gap-6 mb-6">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-[0.16em] uppercase mb-2" style={{ color: T.roxo }}>
                Orientação
              </p>
              <h2 className="text-2xl md:text-[28px] font-bold tracking-tight" style={{ color: T.tinta }}>
                Não sabe por onde começar?
              </h2>
              <p className="text-sm md:text-base mt-2 leading-relaxed" style={{ color: T.texto }}>
                A gente te orienta em cada passo: o que fazer, quais são seus direitos, como se
                proteger e como ajudar alguém.
              </p>
            </div>
            <Link to="/orientacao"
              className="hidden md:inline-flex h-11 px-5 rounded-lg text-sm font-semibold text-white items-center gap-2 flex-shrink-0"
              style={{ background: T.roxo }}>
              Ver toda a orientação <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {GUIAS.map((g) => (
              <Link key={g.href} to={g.href}
                className="rounded-2xl border p-5 transition-colors hover:border-violet-300 flex flex-col"
                style={{ background: T.cartao, borderColor: T.borda }}>
                <span className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: g.bg }}>
                  <g.icone className="w-5 h-5" style={{ color: g.fg }} aria-hidden="true" />
                </span>
                <p className="font-bold text-sm" style={{ color: T.tinta }}>{g.titulo}</p>
                <p className="text-sm mt-1.5 leading-relaxed flex-1" style={{ color: T.texto }}>{g.texto}</p>
                <span className="text-sm font-semibold mt-3 inline-flex items-center gap-1.5" style={{ color: g.fg }}>
                  Abrir <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <Link to="/orientacao"
            className="md:hidden mt-5 h-11 w-full rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
            style={{ background: T.roxo }}>
            Ver toda a orientação <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </Secao>

      {/* INFORMATIVOS */}
      <Secao className="pb-10 md:pb-14">
        <TituloSecao
          icone={BookOpen}
          titulo="Informação que protege"
          sub="Conteúdo em linguagem simples, aberto e sem cadastro."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {INFORMATIVOS.map((c) => (
            <Link key={c.href} to={c.href}
              className="rounded-2xl border p-6 transition-colors hover:border-violet-300 block"
              style={{ background: T.cartao, borderColor: T.borda }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: T.roxoSuave }}>
                <c.icone className="w-5 h-5" style={{ color: T.roxo }} aria-hidden="true" />
              </span>
              <p className="font-bold text-base leading-snug" style={{ color: T.tinta }}>{c.titulo}</p>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: T.texto }}>{c.texto}</p>
              <span className="text-sm font-semibold mt-4 inline-flex items-center gap-1.5"
                style={{ color: T.roxo }}>
                Ler <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Secao>

      {/* MEU ESPAÇO */}
      <Secao className="pb-10 md:pb-14">
        <Cartao className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
          <span className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: T.roxoSuave }}>
            <Lock className="w-6 h-6" style={{ color: T.roxo }} aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-lg" style={{ color: T.tinta }}>Meu espaço</p>
            <p className="text-sm mt-1.5 leading-relaxed" style={{ color: T.texto }}>
              Diário de emoções, plano de segurança, cartas para si mesma e conteúdos salvos.
              Fica guardado só na sua conta — ninguém mais tem acesso.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/register"
              className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center"
              style={{ background: T.roxo }}>
              Criar meu espaço
            </Link>
            <Link to="/login"
              className="h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center justify-center border"
              style={{ borderColor: T.borda, color: T.texto }}>
              Já tenho cadastro
            </Link>
          </div>
        </Cartao>
      </Secao>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

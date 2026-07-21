import { Link } from "react-router-dom";
import {
  HeartHandshake, Compass, Network, Target, MapPin, ArrowRight, ShieldCheck, Database,
} from "lucide-react";
import MapaPBNeon from "@/components/MapaPBNeon";
import LogoRES from "@/components/site/LogoRES";
import { T } from "@/components/site/tokens";
import { Secao, TituloSecao, Cartao, FaixaAjuda } from "@/components/site/ui";

const PILARES = [
  {
    icone: HeartHandshake, fg: T.rosa, bg: T.rosaSuave, titulo: "Acolhimento",
    texto: "Escuta ativa e humanizada, para que nenhuma mulher se sinta sozinha.",
  },
  {
    icone: Compass, fg: T.roxo, bg: T.roxoSuave, titulo: "Orientação",
    texto: "Informações claras sobre direitos e sobre os serviços disponíveis.",
  },
  {
    icone: Network, fg: T.verde, bg: T.verdeSuave, titulo: "Conexão",
    texto: "Encaminhamento para serviços de proteção e apoio especializado.",
  },
];

/* Estes três compromissos descrevem decisões que já estão implementadas no
   produto — não são promessa de marketing. Ver /emergencia e /assistente. */
const COMPROMISSOS = [
  {
    icone: ShieldCheck, titulo: "Endereço de abrigo é sigiloso",
    texto:
      "Casa de acolhimento nunca aparece com endereço, coordenada ou rota. O acesso se dá por encaminhamento do CRAM, da DEAM ou da Justiça.",
  },
  {
    icone: Database, titulo: "Só publicamos o que foi verificado",
    texto:
      "Os contatos vêm do CNES/Ministério da Saúde, do IBGE e do Observatório da Mulher contra a Violência do Senado. Onde as fontes divergem, publicamos o telefone e avisamos para confirmar.",
  },
  {
    icone: Target, titulo: "Sem cadastro para pedir ajuda",
    texto:
      "As páginas de emergência, de informação e o assistente são abertas e não coletam dados. Cadastro só existe para o Meu Espaço, que é pessoal.",
  },
];

export default function SobreARede() {
  return (
    <>
      {/* HERO */}
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16
                        md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10">
          <div>
            <h1 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
              Sobre a Rede Escuta Segura
            </h1>
            <p className="text-sm md:text-lg mt-4 leading-relaxed max-w-2xl" style={{ color: "#E4DBFB" }}>
              Somos uma rede comprometida em acolher, orientar e conectar mulheres em situação
              de violência a serviços confiáveis e seguros em todo o estado da Paraíba.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <span className="w-[168px] h-[168px] rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
              <LogoRES tamanho={96} semTexto id="sobre" />
            </span>
          </div>
        </div>
      </div>

      {/* MISSÃO */}
      <Secao className="py-10 md:py-14">
        <Cartao className="p-6 md:p-9">
          <TituloSecao
            icone={Target}
            titulo="Nossa missão"
            sub="Promover o acolhimento humanizado e o acesso à informação de qualidade, conectando mulheres a serviços de apoio e proteção."
          />
          <div className="grid gap-4 md:grid-cols-3 mt-2">
            {PILARES.map((p) => (
              <div key={p.titulo} className="rounded-xl border p-6 text-center"
                style={{ background: T.pagina, borderColor: T.borda }}>
                <span className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4"
                  style={{ background: p.bg }}>
                  <p.icone className="w-6 h-6" style={{ color: p.fg }} aria-hidden="true" />
                </span>
                <p className="font-bold text-base" style={{ color: T.tinta }}>{p.titulo}</p>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: T.texto }}>{p.texto}</p>
              </div>
            ))}
          </div>
        </Cartao>
      </Secao>

      {/* COMPROMISSOS */}
      <Secao className="pb-10 md:pb-14">
        <TituloSecao
          titulo="Como cuidamos da sua segurança"
          sub="Três decisões que orientam tudo o que publicamos."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {COMPROMISSOS.map((c) => (
            <Cartao key={c.titulo} className="p-6">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: T.roxoSuave }}>
                <c.icone className="w-5 h-5" style={{ color: T.roxo }} aria-hidden="true" />
              </span>
              <p className="font-bold text-base leading-snug" style={{ color: T.tinta }}>{c.titulo}</p>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: T.texto }}>{c.texto}</p>
            </Cartao>
          ))}
        </div>
      </Secao>

      {/* COBERTURA */}
      <Secao className="pb-10 md:pb-14">
        <Cartao className="overflow-hidden">
          <div className="grid md:grid-cols-[1.1fr_1fr] items-center">
            <div className="p-6 md:p-9">
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: T.tinta }}>
                Atuação em todo o estado da Paraíba
              </h2>
              <p className="text-sm md:text-base mt-3 leading-relaxed" style={{ color: T.texto }}>
                Conectamos você aos serviços mais próximos, onde quer que você esteja. O projeto
                começou em Campina Grande e hoje cobre os 223 municípios do estado.
              </p>
              <Link to="/emergencia"
                className="mt-6 h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2"
                style={{ background: T.roxo }}>
                <MapPin className="w-4 h-4" aria-hidden="true" /> Ver a rede por município
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="relative min-h-[220px] md:min-h-[300px] flex items-center justify-center p-6"
              style={{ background: "linear-gradient(135deg,#1A1145 0%,#2A1A63 100%)" }}>
              <MapaPBNeon className="w-full h-auto max-w-[420px]" />
            </div>
          </div>
        </Cartao>
      </Secao>

      {/* QUEM FAZ */}
      <Secao className="pb-10 md:pb-14">
        <Cartao className="p-6 md:p-9">
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: T.tinta }}>
            Quem faz a Rede Escuta Segura
          </h2>
          <p className="text-sm md:text-base mt-3 leading-relaxed max-w-3xl" style={{ color: T.texto }}>
            A plataforma é uma iniciativa da <strong>Nous Inovação &amp; Tecnologia Inova Simples I.S.</strong>,
            sediada em Campina Grande–PB. O acesso é gratuito, sem publicidade e sem monetização.
          </p>
          <p className="text-sm md:text-base mt-3 leading-relaxed max-w-3xl italic" style={{ color: T.apagado }}>
            “Toda semente conhece a hora de nascer.”
          </p>
        </Cartao>
      </Secao>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

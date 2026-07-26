import { Link } from "react-router-dom";
import {
  ArrowLeft, Search, WifiOff, Volume2, Info, MapPin,
} from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";

/* #2 Modo rural e baixa conectividade — parte viável sem parceria.
 *
 * O que é real hoje: busca por nome (o site nunca pede localização), diretório
 * que já vem embutido no app e funciona offline depois de aberto, leitura em
 * voz alta e data de verificação. As partes que dependem de convênio (equipes
 * itinerantes, transporte, lista oficial de comunidades) ficam sinalizadas com
 * honestidade — não prometemos o que ainda não temos.
 */
const RECURSOS = [
  {
    icone: Search, cor: T.roxo, bg: T.roxoSuave,
    titulo: "Busque pelo nome da sua cidade",
    texto: "Você não precisa ativar localização — o site nunca pede onde você está. Basta digitar o nome do seu município na busca da rede.",
  },
  {
    icone: WifiOff, cor: T.verde, bg: T.verdeSuave,
    titulo: "Funciona depois de aberto, mesmo sem sinal",
    texto: "Você pode adicionar este site à tela inicial do celular, como um aplicativo. Uma vez aberto, o diretório de serviços continua disponível mesmo sem internet.",
  },
  {
    icone: Volume2, cor: T.rosa, bg: T.rosaSuave,
    titulo: "Ouça as informações",
    texto: "O botão de acessibilidade, no canto da tela, lê a página em voz alta usando a voz do próprio aparelho — útil quando é difícil ler ou digitar.",
  },
];

export default function ZonaRural() {
  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
          <Link to="/orientacao" className="text-sm font-medium inline-flex items-center gap-1.5"
            style={{ color: "#E4DBFB" }}>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Orientação
          </Link>
          <h1 className="text-3xl md:text-[38px] font-extrabold text-white tracking-tight leading-tight mt-3">
            Zona rural e baixa conectividade
          </h1>
          <p className="text-sm md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            Encontre apoio mesmo com pouca internet, e sem precisar mostrar onde você está.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {RECURSOS.map((r) => (
            <Cartao key={r.titulo} className="p-5 md:p-6">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ background: r.bg }}>
                <r.icone className="w-5 h-5" style={{ color: r.cor }} aria-hidden="true" />
              </span>
              <p className="font-bold text-base" style={{ color: T.tinta }}>{r.titulo}</p>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: T.texto }}>{r.texto}</p>
            </Cartao>
          ))}
        </div>

        {/* honestidade sobre o que depende de convênio */}
        <div className="mt-6 rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FFF7ED", borderColor: "#FDBA74" }} role="note">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.ambar }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7C2D12" }}>
            <strong>Equipes itinerantes, transporte e a lista de comunidades atendidas</strong> variam
            por município e dependem de convênios que estamos construindo com as prefeituras e a
            rede. Enquanto isso, ligue <strong>180</strong> (gratuito, funciona de qualquer telefone)
            para saber o que atende a sua comunidade. O endereço de casa abrigo nunca é exibido, por
            segurança.
          </p>
        </div>

        <div className="mt-6">
          <Link to="/emergencia"
            className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2"
            style={{ background: T.roxo }}>
            <MapPin className="w-4 h-4" aria-hidden="true" /> Ver a rede da minha cidade
          </Link>
        </div>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

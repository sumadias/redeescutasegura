import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, EyeOff, HeartHandshake, DoorOpen } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, TituloSecao, Cartao, FaixaAjuda } from "@/components/site/ui";
import { LISTA_JOGOS } from "@/data/jogos";
import GravuraJogos from "@/components/GravuraJogos";

const CORES = {
  sementes: { fg: "#15803D", bg: "#DCFCE7" },
  rede: { fg: T.roxo, bg: T.roxoSuave },
  missao: { fg: T.rosa, bg: T.rosaSuave },
};

const PRINCIPIOS = [
  { icone: EyeOff, titulo: "Uso anônimo", texto: "Sem cadastro, sem nome real e sem localização. Nenhum relato é coletado." },
  { icone: HeartHandshake, titulo: "Errar faz parte", texto: "O erro é tratado como aprendizado: você recebe a explicação, sem punição nem culpa." },
  { icone: DoorOpen, titulo: "Saída rápida", texto: "O botão de sair está sempre no canto da tela, e a tecla ESC também funciona." },
  { icone: ShieldCheck, titulo: "Nada fica gravado", texto: "As respostas ficam só na memória da aba e somem ao fechar — não gravamos nada no aparelho." },
];

export default function JogosEducativos() {
  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        {/* mesma estrutura dos outros heros: no desktop a gravura é COLUNA da
            grade, então nunca encosta no texto; no celular vira fundo apagado */}
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative w-full
                        md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,42%)] md:items-center md:gap-8">
          <GravuraJogos className="absolute inset-y-0 right-[-24%] h-full w-auto max-w-none opacity-20 pointer-events-none
                                   md:static md:opacity-100 md:h-auto md:w-full md:col-start-2 md:row-start-1" />

          <div className="relative md:col-start-1 md:row-start-1">
            <h1 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
              Jogos Educativos
            </h1>
            <p className="text-sm md:text-lg mt-4 leading-relaxed max-w-2xl" style={{ color: "#E4DBFB" }}>
              Três jornadas interativas para reconhecer sinais de violência, conhecer direitos e
              saber a quem recorrer. Sem cadastro e sem deixar rastro no aparelho.
            </p>
          </div>
        </div>
      </div>

      <Secao className="py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {LISTA_JOGOS.map((j) => {
            const c = CORES[j.id] || CORES.rede;
            return (
              <Cartao key={j.id} className="p-6 flex flex-col">
                <span className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: c.bg }} aria-hidden="true">{j.icone}</span>
                <span className="inline-block text-xs px-2.5 py-1 rounded-md font-medium self-start"
                  style={{ background: c.bg, color: c.fg }}>{j.publico}</span>
                <h2 className="font-bold text-lg mt-3 leading-snug" style={{ color: T.tinta }}>{j.titulo}</h2>
                <p className="text-sm mt-2 leading-relaxed flex-1" style={{ color: T.texto }}>{j.resumo}</p>
                <ul className="text-xs mt-4 space-y-1" style={{ color: T.apagado }}>
                  <li>{j.missoes.length} missões</li>
                  <li>{j.conquistas.length} conquistas</li>
                  <li>Cerca de {Math.max(5, j.missoes.length * 2)} minutos</li>
                </ul>
                <Link to={`/jogos/${j.id}`}
                  className="mt-5 h-11 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
                  style={{ background: c.fg }}>
                  Começar <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Cartao>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FFF7ED", borderColor: "#FDBA74" }} role="note">
          <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.ambar }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7C2D12" }}>
            <strong>Conteúdo educativo.</strong> Estas jornadas ajudam a reconhecer situações e a
            conhecer caminhos de proteção, mas não substituem atendimento psicológico, jurídico,
            policial, de saúde ou de assistência social. Em perigo imediato, ligue <strong>190</strong>.
          </p>
        </div>
      </Secao>

      <Secao className="pb-10 md:pb-14">
        <TituloSecao
          titulo="Como cuidamos de quem joga"
          sub="Gamificação sem exposição e sem culpabilização."
        />
        <div className="grid gap-4 md:grid-cols-4">
          {PRINCIPIOS.map((p) => (
            <Cartao key={p.titulo} className="p-5">
              <span className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: T.roxoSuave }}>
                <p.icone className="w-5 h-5" style={{ color: T.roxo }} aria-hidden="true" />
              </span>
              <p className="font-bold text-sm" style={{ color: T.tinta }}>{p.titulo}</p>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: T.texto }}>{p.texto}</p>
            </Cartao>
          ))}
        </div>
      </Secao>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Check, X, Trophy, RotateCcw, Phone, Lightbulb,
} from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao } from "@/components/site/ui";
import { JOGOS } from "@/data/jogos";

/* Uma partida. Sem cadastro, sem envio de nada para servidor: as respostas
   ficam só na memória desta aba e somem ao fechar.
   Não gravamos progresso no aparelho de propósito — num contexto de violência
   doméstica, rastro salvo no navegador pode ser lido por quem convive com a
   pessoa. O protótipo original guardava em localStorage; aqui não guardamos. */
export default function JogoPartida() {
  const { jogoId } = useParams();
  const jogo = JOGOS[jogoId];

  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [terminou, setTerminou] = useState(false);
  const retornoRef = useRef(null);

  const missao = jogo?.missoes[indice];
  const total = jogo?.missoes.length || 0;
  const pontosPossiveis = useMemo(
    () => (jogo ? jogo.missoes.reduce((a, m) => a + m.pontos, 0) : 0),
    [jogo]
  );

  /* leva o foco ao retorno, para quem usa leitor de tela ouvir a explicação */
  useEffect(() => {
    if (escolha !== null) retornoRef.current?.focus();
  }, [escolha]);

  if (!jogo) return <Navigate to="/jogos" replace />;

  function responder(i) {
    if (escolha !== null) return;
    setEscolha(i);
    if (missao.opcoes[i].correta) {
      setPontos((p) => p + missao.pontos);
      setAcertos((a) => a + 1);
    }
  }

  function avancar() {
    if (indice + 1 >= total) {
      setTerminou(true);
    } else {
      setIndice((i) => i + 1);
      setEscolha(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function recomecar() {
    setIndice(0); setEscolha(null); setPontos(0); setAcertos(0); setTerminou(false);
    window.scrollTo({ top: 0 });
  }

  /* ---------- fim da jornada ---------- */
  if (terminou) {
    const conquistadas = jogo.conquistas.slice(0, acertos);
    return (
      <Secao className="py-10 md:py-14">
        <Cartao className="p-8 md:p-12 text-center">
          <span className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5"
            style={{ background: T.roxoSuave }}>
            <Trophy className="w-7 h-7" style={{ color: T.roxo }} aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-bold" style={{ color: T.tinta }}>Jornada concluída</h1>
          <p className="text-sm mt-2" style={{ color: T.texto }}>
            {jogo.titulo} — {acertos} de {total} missões no caminho mais seguro
            {" · "}{pontos} de {pontosPossiveis} {jogo.rotuloPontos.toLowerCase()}
          </p>

          {conquistadas.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-7">
              {conquistadas.map((c) => (
                <div key={c.nome} className="rounded-xl border px-4 py-3 text-left max-w-[210px]"
                  style={{ background: T.pagina, borderColor: T.borda }}>
                  <span className="text-2xl" aria-hidden="true">{c.icone}</span>
                  <p className="font-bold text-sm mt-1" style={{ color: T.tinta }}>{c.nome}</p>
                  <p className="text-xs mt-0.5" style={{ color: T.apagado }}>{c.descricao}</p>
                </div>
              ))}
            </div>
          )}

          <p className="text-sm mt-8 px-4 py-3 rounded-lg inline-block" style={{ background: "#FEF3C7", color: "#92400E" }}>
            Este é um conteúdo educativo. Ele não substitui atendimento psicológico,
            jurídico, policial, de saúde ou de assistência social.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
            <button onClick={recomecar}
              className="h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 border"
              style={{ borderColor: T.borda, color: T.texto, background: T.cartao }}>
              <RotateCcw className="w-4 h-4" aria-hidden="true" /> Jogar de novo
            </button>
            <Link to="/emergencia"
              className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
              style={{ background: T.roxo }}>
              Ver a rede da minha cidade <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a href="tel:180"
              className="h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 border"
              style={{ borderColor: T.rosa + "66", color: T.rosa, background: T.cartao }}>
              <Phone className="w-4 h-4" aria-hidden="true" /> Ligar 180
            </a>
          </div>
          <p className="mt-6">
            <Link to="/jogos" className="text-sm font-semibold" style={{ color: T.roxo }}>
              Voltar aos jogos
            </Link>
          </p>
        </Cartao>
      </Secao>
    );
  }

  /* ---------- missão em andamento ---------- */
  const respondida = escolha !== null;
  const acertou = respondida && missao.opcoes[escolha].correta;

  return (
    <>
      <div style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link to="/jogos" className="text-sm font-medium inline-flex items-center gap-1.5"
            style={{ color: "#E4DBFB" }}>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Jogos Educativos
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-3 tracking-tight">
            <span aria-hidden="true">{jogo.icone}</span> {jogo.titulo}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.22)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${((indice + (respondida ? 1 : 0)) / total) * 100}%`, background: "#FF4D8D" }} />
            </div>
            <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "#E4DBFB" }}>
              {indice + 1} de {total} · {pontos} {jogo.rotuloPontos.toLowerCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        <Cartao className="p-6 md:p-8">
          <p className="text-xs font-bold tracking-wide uppercase" style={{ color: T.roxo }}>
            {missao.capitulo}
          </p>
          <h2 className="text-xl md:text-2xl font-bold mt-1.5" style={{ color: T.tinta }}>{missao.titulo}</h2>
          <p className="text-sm mt-3 leading-relaxed" style={{ color: T.texto }}>{missao.intro}</p>

          <blockquote className="mt-5 rounded-xl border-l-4 px-5 py-4 text-sm leading-relaxed"
            style={{ background: T.pagina, borderColor: T.rosa, color: T.tinta }}>
            {missao.cena}
          </blockquote>

          <p className="font-bold text-base mt-6" style={{ color: T.tinta }}>{missao.pergunta}</p>

          <div className="space-y-2.5 mt-4" role="group" aria-label={missao.pergunta}>
            {missao.opcoes.map((o, i) => {
              const escolhida = escolha === i;
              const revelarCerta = respondida && o.correta;
              let borda = T.borda, fundo = T.cartao, cor = T.tinta;
              if (revelarCerta) { borda = "#86EFAC"; fundo = "#F0FDF4"; cor = "#166534"; }
              else if (escolhida) { borda = "#FCA5A5"; fundo = "#FEF2F2"; cor = "#991B1B"; }
              return (
                <button key={i} onClick={() => responder(i)} disabled={respondida}
                  className="w-full text-left rounded-xl border px-4 py-3.5 text-sm transition-colors flex items-start gap-3
                             disabled:cursor-default enabled:hover:border-violet-300"
                  style={{ background: fundo, borderColor: borda, color: cor }}>
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ borderColor: borda }} aria-hidden="true">
                    {revelarCerta ? <Check className="w-3.5 h-3.5" /> : escolhida ? <X className="w-3.5 h-3.5" /> : null}
                  </span>
                  <span className="leading-relaxed">{o.texto}</span>
                </button>
              );
            })}
          </div>

          {respondida && (
            <div ref={retornoRef} tabIndex={-1} role="status" aria-live="polite"
              className="mt-5 rounded-xl px-5 py-4 outline-none"
              style={{ background: acertou ? "#F0FDF4" : "#FFF7ED", border: `1px solid ${acertou ? "#BBF7D0" : "#FDBA74"}` }}>
              <p className="font-bold text-sm flex items-center gap-2" style={{ color: acertou ? "#166534" : "#9A3412" }}>
                <Lightbulb className="w-4 h-4" aria-hidden="true" />
                {acertou ? `Caminho mais seguro · +${missao.pontos} ${jogo.rotuloPontos.toLowerCase()}` : "Vamos pensar juntas"}
              </p>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: acertou ? "#166534" : "#7C2D12" }}>
                {missao.opcoes[escolha].retorno}
              </p>
              {!acertou && (
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "#7C2D12" }}>
                  <strong>Caminho mais seguro:</strong>{" "}
                  {missao.opcoes.find((o) => o.correta)?.retorno}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button onClick={avancar} disabled={!respondida}
              className="h-11 px-6 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2 disabled:opacity-40"
              style={{ background: T.roxo }}>
              {indice + 1 === total ? "Concluir jornada" : "Próxima missão"}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </Cartao>

        <p className="text-xs text-center mt-5" style={{ color: T.apagado }}>
          Suas respostas não são gravadas nem enviadas. Ao fechar esta página, tudo é apagado.
        </p>
      </div>
    </>
  );
}

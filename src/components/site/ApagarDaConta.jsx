import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Trash2, Cloud, Loader2, AlertTriangle, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { T } from "@/components/site/tokens";
import { Cartao } from "@/components/site/ui";

/* SEG-07 da auditoria de 03/09/2026.
 *
 * Antes só dava para apagar um registro por vez, e a Central Meus Dados
 * limpava apenas o que estava NESTE aparelho — o que ficou na conta continuava
 * no servidor. Isto é a exclusão do conteúdo pessoal guardado na conta.
 *
 * Além de ser direito do titular, aqui é recurso de segurança: pode existir o
 * momento em que ela precise apagar tudo em minutos.
 *
 * O que esta tela NÃO apaga, de propósito: conversas de atendimento e
 * agendamentos. Os dois têm outra pessoa do lado (profissional da rede) e
 * apagar unilateralmente atrapalharia um atendimento em curso. O pedido segue
 * pelo canal do encarregado — e isso está escrito na tela, não escondido.
 */

const ENTIDADES = [
  { chave: "DiarioEmocao",   rotulo: "Registros do diário" },
  { chave: "PlanoSeguranca", rotulo: "Plano de segurança" },
  { chave: "CartaPessoal",   rotulo: "Cartas para mim" },
  { chave: "ItemSalvo",      rotulo: "Conteúdos salvos" },
];

export default function ApagarDaConta() {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const [contagem, setContagem] = useState(null);
  const [erroLeitura, setErroLeitura] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const [palavra, setPalavra] = useState("");
  const [apagando, setApagando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const contar = useCallback(async () => {
    setErroLeitura(false);
    try {
      const pares = await Promise.all(
        ENTIDADES.map(async (e) => [e.chave, (await base44.entities[e.chave].filter({})).length])
      );
      setContagem(Object.fromEntries(pares));
    } catch {
      /* Não deixamos falhar em silêncio: sem a contagem, a pessoa não sabe se
         não há nada guardado ou se a leitura é que não funcionou. */
      setErroLeitura(true);
      setContagem(null);
    }
  }, []);

  useEffect(() => { if (isAuthenticated) contar(); }, [isAuthenticated, contar]);

  async function apagarTudoDaConta() {
    if (palavra.trim().toUpperCase() !== "APAGAR") return;
    setApagando(true);
    const falhas = [];
    let apagados = 0;

    for (const ent of ENTIDADES) {
      try {
        const registros = await base44.entities[ent.chave].filter({});
        for (const r of registros) {
          try {
            await base44.entities[ent.chave].delete(r.id);
            apagados += 1;
          } catch {
            falhas.push(ent.rotulo);
          }
        }
      } catch {
        falhas.push(ent.rotulo);
      }
    }

    setApagando(false);
    setConfirmando(false);
    setPalavra("");
    /* Falha parcial é o caso perigoso: dizer "apagamos tudo" quando sobrou
       coisa seria pior do que não ter o botão. */
    setResultado({ apagados, falhas: [...new Set(falhas)] });
    contar();
  }

  if (isLoadingAuth) return null;

  if (!isAuthenticated) {
    return (
      <div className="mt-8">
        <h2 className="text-base font-bold mb-3" style={{ color: T.tinta }}>Guardado na sua conta</h2>
        <Cartao className="p-5">
          <p className="text-sm leading-relaxed" style={{ color: T.texto }}>
            Diário, plano de segurança, cartas e conteúdos salvos ficam na sua conta, não neste
            aparelho. Para ver quanto há e apagar tudo de uma vez,{" "}
            <Link to="/login?next=%2Fmeus-dados" className="font-semibold underline" style={{ color: T.roxo }}>
              entre na sua conta
            </Link>.
          </p>
        </Cartao>
      </div>
    );
  }

  const total = contagem ? Object.values(contagem).reduce((s, n) => s + n, 0) : null;

  return (
    <div className="mt-8">
      <h2 className="text-base font-bold mb-3" style={{ color: T.tinta }}>Guardado na sua conta</h2>

      <div className="rounded-2xl border p-5 flex items-start gap-3 mb-4"
        style={{ background: T.roxoSuave, borderColor: T.borda }} role="note">
        <Cloud className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.roxo }} aria-hidden="true" />
        <p className="text-sm leading-relaxed" style={{ color: T.tinta }}>
          <strong>Isto não está no aparelho.</strong> Fica guardado na sua conta e acompanha você em
          qualquer celular ou computador em que você entrar.
        </p>
      </div>

      {erroLeitura ? (
        <Cartao className="p-5 flex items-start gap-3" style={{ borderColor: "#FCA5A5" }}>
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#B91C1C" }} aria-hidden="true" />
          <div>
            <p className="text-sm font-bold" style={{ color: "#B91C1C" }}>Não foi possível ler sua conta</p>
            <p className="text-sm mt-1" style={{ color: T.texto }}>
              Isso não quer dizer que não há nada guardado. Verifique a conexão e{" "}
              <button onClick={contar} className="font-semibold underline" style={{ color: T.roxo }}>
                tente de novo
              </button>.
            </p>
          </div>
        </Cartao>
      ) : contagem === null ? (
        <Cartao className="p-5 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" style={{ color: T.roxo }} aria-hidden="true" />
          <p className="text-sm" style={{ color: T.texto }}>Conferindo o que está guardado…</p>
        </Cartao>
      ) : (
        <div className="space-y-3">
          {ENTIDADES.map((e) => (
            <Cartao key={e.chave} className="p-4 flex items-center gap-3">
              <p className="flex-1 font-bold text-sm" style={{ color: T.tinta }}>{e.rotulo}</p>
              <span className="text-sm tabular-nums" style={{ color: T.texto }}>
                {contagem[e.chave]} {contagem[e.chave] === 1 ? "registro" : "registros"}
              </span>
            </Cartao>
          ))}
        </div>
      )}

      {resultado && (
        <Cartao className="p-5 mt-4 flex items-start gap-3"
          style={{ borderColor: resultado.falhas.length ? "#FCA5A5" : "#86EFAC" }}>
          {resultado.falhas.length
            ? <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#B91C1C" }} aria-hidden="true" />
            : <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#15803D" }} aria-hidden="true" />}
          <div>
            <p className="text-sm font-bold" style={{ color: resultado.falhas.length ? "#B91C1C" : "#15803D" }}>
              {resultado.falhas.length
                ? "Apagamos parte, mas sobrou coisa"
                : `Pronto — ${resultado.apagados} ${resultado.apagados === 1 ? "registro apagado" : "registros apagados"}`}
            </p>
            {resultado.falhas.length > 0 && (
              <p className="text-sm mt-1 leading-relaxed" style={{ color: T.texto }}>
                Não conseguimos apagar: {resultado.falhas.join(", ")}. Esses registros continuam na
                sua conta. Tente de novo em alguns minutos.
              </p>
            )}
          </div>
        </Cartao>
      )}

      {total > 0 && (
        <div className="mt-4">
          {!confirmando ? (
            <button onClick={() => { setConfirmando(true); setResultado(null); }}
              className="text-sm font-semibold inline-flex items-center gap-1.5"
              style={{ color: "#B91C1C" }}>
              <Trash2 className="w-4 h-4" aria-hidden="true" /> Apagar tudo da minha conta
            </button>
          ) : (
            <Cartao className="p-5" style={{ borderColor: "#FCA5A5" }}>
              <p className="font-bold text-sm" style={{ color: "#B91C1C" }}>
                Apagar {total} {total === 1 ? "registro" : "registros"} da sua conta?
              </p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: T.texto }}>
                Diário, plano de segurança, cartas e salvos somem de todos os aparelhos e não há
                como recuperar. Para confirmar, escreva <strong>APAGAR</strong> abaixo.
              </p>
              <label htmlFor="confirma-apagar" className="block text-sm font-semibold mt-3 mb-1"
                style={{ color: T.tinta }}>
                Escreva APAGAR
              </label>
              <input id="confirma-apagar" value={palavra} onChange={(ev) => setPalavra(ev.target.value)}
                autoComplete="off" className="w-full h-11 px-3 rounded-lg border text-sm"
                style={{ borderColor: T.borda, color: T.tinta, background: T.cartao }} />
              <div className="flex gap-3 mt-3">
                <button onClick={apagarTudoDaConta}
                  disabled={apagando || palavra.trim().toUpperCase() !== "APAGAR"}
                  className="h-10 px-4 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2 disabled:opacity-50"
                  style={{ background: "#B91C1C" }}>
                  {apagando && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                  {apagando ? "Apagando…" : "Sim, apagar tudo"}
                </button>
                <button onClick={() => { setConfirmando(false); setPalavra(""); }} disabled={apagando}
                  className="h-10 px-4 rounded-lg text-sm font-semibold border"
                  style={{ borderColor: T.borda, color: T.texto, background: T.cartao }}>
                  Cancelar
                </button>
              </div>
            </Cartao>
          )}
        </div>
      )}

      <p className="text-sm mt-4 leading-relaxed" style={{ color: T.texto }}>
        Conversas de atendimento e agendamentos não são apagados aqui: têm um profissional da rede do
        outro lado, e apagar sozinha poderia interromper um atendimento em andamento. Para pedir a
        exclusão desses, fale com a Rede pelo canal indicado em{" "}
        <Link to="/seguranca" className="font-semibold underline" style={{ color: T.roxo }}>
          Segurança e privacidade
        </Link>.
      </p>
    </div>
  );
}

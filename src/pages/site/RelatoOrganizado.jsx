import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Plus, Trash2, Download, Copy, Check, Info, ShieldAlert,
} from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";

/* #14 Gerador de relato organizado.
 *
 * Decisão de segurança: NADA é gravado. Os trechos ficam só na memória desta
 * aba e somem ao fechar ou atualizar — não há rastro no aparelho, que é o
 * cuidado mais forte num contexto de violência doméstica. Se a pessoa quiser
 * guardar, ela BAIXA um arquivo, por escolha própria.
 *
 * A ferramenta só ORGANIZA (ordena por data) o que a pessoa escreveu. Não usa
 * IA, não completa lacunas, não interpreta intenção, não envia texto para fora.
 * Relato é dado sensível: mantê-lo local e efêmero é o mais protetor.
 */
function formatarData(iso) {
  if (!iso) return "Sem data";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function RelatoOrganizado() {
  const [trechos, setTrechos] = useState([]);
  const [data, setData] = useState("");
  const [texto, setTexto] = useState("");
  const [copiado, setCopiado] = useState(false);

  const ordenados = useMemo(
    () =>
      [...trechos].sort((a, b) => {
        if (!a.data) return 1;
        if (!b.data) return -1;
        return a.data.localeCompare(b.data);
      }),
    [trechos]
  );

  function adicionar() {
    const t = texto.trim();
    if (!t) return;
    setTrechos((l) => [...l, { id: `${Date.now()}-${l.length}`, data, texto: t }]);
    setData("");
    setTexto("");
  }

  function remover(id) {
    setTrechos((l) => l.filter((x) => x.id !== id));
  }

  function montarTexto() {
    const linhas = ordenados.map(
      (t) => `• ${formatarData(t.data)}\n${t.texto}`
    );
    return `Relato organizado\n\n${linhas.join("\n\n")}\n`;
  }

  function baixar() {
    const blob = new Blob([montarTexto()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meu-relato.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(montarTexto());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      /* alguns navegadores bloqueiam a área de transferência sem gesto direto */
    }
  }

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
            Organizar meu relato
          </h1>
          <p className="text-sm md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            Anote o que aconteceu, com as suas palavras. A ferramenta apenas coloca em ordem de
            data — não completa, não interpreta e não decide se algo é verdadeiro.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        {/* aviso: nada é gravado */}
        <div className="rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: T.roxoSuave, borderColor: T.borda }} role="note">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.roxo }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: T.tinta }}>
            <strong>Nada é gravado.</strong> O que você escreve fica só nesta tela e some ao fechar
            ou atualizar a página. Para guardar, use “Baixar” — o arquivo fica com você.
          </p>
        </div>

        {/* formulário */}
        <Cartao className="mt-5 p-5 md:p-6">
          <label htmlFor="data" className="text-sm font-semibold" style={{ color: T.texto }}>
            Quando aconteceu (aproximado)
          </label>
          <input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)}
            className="mt-1.5 w-full sm:w-auto h-11 rounded-xl border px-3 text-sm bg-white focus:outline-none focus:ring-2"
            style={{ borderColor: "#D1D5DB", color: T.tinta }} />

          <label htmlFor="texto" className="text-sm font-semibold mt-4 block" style={{ color: T.texto }}>
            O que aconteceu
          </label>
          <textarea id="texto" value={texto} onChange={(e) => setTexto(e.target.value)}
            rows={4} placeholder="Escreva com as suas palavras…"
            className="mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: "#D1D5DB", color: T.tinta }} />

          <button onClick={adicionar} disabled={!texto.trim()}
            className="mt-3 h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-2 disabled:opacity-40"
            style={{ background: T.roxo }}>
            <Plus className="w-4 h-4" aria-hidden="true" /> Adicionar ao relato
          </button>
        </Cartao>

        {/* linha do tempo */}
        {ordenados.length > 0 && (
          <>
            <div className="flex items-center justify-between mt-8 mb-3">
              <h2 className="text-base font-bold" style={{ color: T.tinta }}>
                Seu relato ({ordenados.length})
              </h2>
              <div className="flex gap-2">
                <button onClick={copiar}
                  className="h-9 px-3 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border"
                  style={{ borderColor: T.borda, color: T.texto, background: T.cartao }}>
                  {copiado ? <Check className="w-3.5 h-3.5" style={{ color: "#16A34A" }} /> : <Copy className="w-3.5 h-3.5" />}
                  {copiado ? "Copiado" : "Copiar"}
                </button>
                <button onClick={baixar}
                  className="h-9 px-3 rounded-lg text-xs font-semibold text-white inline-flex items-center gap-1.5"
                  style={{ background: T.roxo }}>
                  <Download className="w-3.5 h-3.5" aria-hidden="true" /> Baixar
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {ordenados.map((t) => (
                <Cartao key={t.id} className="p-4 flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold" style={{ color: T.roxo }}>{formatarData(t.data)}</p>
                    <p className="text-sm mt-1 leading-relaxed whitespace-pre-line" style={{ color: T.tinta }}>{t.texto}</p>
                  </div>
                  <button onClick={() => remover(t.id)} aria-label="Excluir este trecho"
                    className="p-1.5 rounded-lg flex-shrink-0" style={{ color: "#B91C1C" }}>
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </Cartao>
              ))}
            </div>
          </>
        )}

        <div className="mt-6 rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FFF7ED", borderColor: "#FDBA74" }} role="note">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.ambar }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7C2D12" }}>
            Este relato é seu e organizado por você. Para uso jurídico, leve-o a um profissional — a
            Defensoria acompanha de graça. A ferramenta não substitui o registro oficial nem decide
            o valor do que você escreveu.
          </p>
        </div>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

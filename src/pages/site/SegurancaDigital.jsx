import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Check, ExternalLink, Lock } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";
import { APARELHOS } from "@/data/segurancaDigital";

/* #1 Segurança digital guiada. Checklist por aparelho. Marcações ficam só na
   tela (nada é gravado). Nunca pede senha; cada passo leva ao canal oficial. */
export default function SegurancaDigital() {
  const [aparelhoId, setAparelhoId] = useState(APARELHOS[0].id);
  const [feito, setFeito] = useState({});

  const aparelho = APARELHOS.find((a) => a.id === aparelhoId) || APARELHOS[0];
  const chave = (i) => `${aparelhoId}-${i}`;

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
            Segurança digital
          </h1>
          <p className="text-sm md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            Passos para proteger suas contas e reduzir a vigilância. Faça só o que for seguro
            agora.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        {/* aviso de risco — sempre visível */}
        <div className="rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FEF2F2", borderColor: "#FCA5A5" }} role="note">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#B91C1C" }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7F1D1D" }}>
            <strong>Faça só o que for seguro neste momento.</strong> Trocar senhas ou desconectar
            aparelhos pode ser percebido por outra pessoa. Se isso te coloca em risco, procure
            orientação antes — ligue <strong>180</strong>.
          </p>
        </div>

        {/* nunca pede senha */}
        <div className="mt-4 rounded-xl border p-4 flex items-start gap-3"
          style={{ background: T.roxoSuave, borderColor: T.borda }}>
          <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: T.roxo }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: T.tinta }}>
            Este site <strong>nunca pede suas senhas</strong>. Cada passo abre a página oficial da
            própria empresa (WhatsApp, Google, Apple), onde você faz a mudança com segurança.
          </p>
        </div>

        {/* aparelho */}
        <div className="flex gap-2 overflow-x-auto pb-2 mt-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} role="tablist">
          {APARELHOS.map((a) => {
            const ativo = aparelhoId === a.id;
            return (
              <button key={a.id} onClick={() => setAparelhoId(a.id)} role="tab" aria-selected={ativo}
                className="flex-shrink-0 h-10 px-5 rounded-lg text-sm font-medium border transition-colors"
                style={{
                  background: ativo ? T.roxoSuave : T.cartao,
                  color: ativo ? T.roxoTinta : T.texto,
                  borderColor: ativo ? T.roxo + "55" : T.borda,
                }}>
                {a.rotulo}
              </button>
            );
          })}
        </div>

        <div className="space-y-3 mt-4">
          {aparelho.passos.map((p, i) => {
            const marcado = !!feito[chave(i)];
            return (
              <Cartao key={i} className="p-5">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => setFeito((f) => ({ ...f, [chave(i)]: !f[chave(i)] }))}
                    className="w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ borderColor: marcado ? "#16A34A" : "#D1D5DB", background: marcado ? "#16A34A" : "#fff" }}
                    aria-pressed={marcado} aria-label={marcado ? "Desmarcar passo" : "Marcar passo como feito"}>
                    {marcado && <Check className="w-4 h-4 text-white" aria-hidden="true" />}
                  </button>
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ color: T.tinta, textDecoration: marcado ? "line-through" : "none" }}>
                      {p.titulo}
                    </p>
                    <p className="text-sm mt-1.5 leading-relaxed" style={{ color: T.texto }}>{p.texto}</p>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-semibold mt-2.5 inline-flex items-center gap-1.5"
                      style={{ color: T.roxo }}>
                      {p.linkRotulo} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Cartao>
            );
          })}
        </div>

        <p className="text-xs mt-5 leading-relaxed" style={{ color: T.apagado }}>
          Suas marcações ficam só nesta tela e somem ao fechar. As telas dos aplicativos podem mudar;
          os links levam sempre às páginas oficiais.
        </p>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

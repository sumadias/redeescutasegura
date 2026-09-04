import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Info } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, FaixaAjuda } from "@/components/site/ui";
import { PERFIS, CHECKLIST } from "@/data/planoFilhos";

/* #3 Plano para filhos e dependentes. Sem nomes, sem gravação. A pessoa escolhe
   quem incluir e vê os itens que fazem sentido; marca só o que for seguro. */
export default function PlanoFilhos() {
  const [perfis, setPerfis] = useState([]);
  const [feito, setFeito] = useState({});

  const alternarPerfil = (id) =>
    setPerfis((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  /* mostra o item se ele não tem restrição, ou se algum perfil escolhido casa */
  const mostrar = (item) => !item.perfis || item.perfis.some((p) => perfis.includes(p));

  const categorias = useMemo(
    () => CHECKLIST.map((c) => ({ ...c, itens: c.itens.filter(mostrar) })).filter((c) => c.itens.length),
    [perfis]
  );

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
            Plano para filhos e dependentes
          </h1>
          <p className="text-sm md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            Um checklist para se organizar com calma. Você não precisa completar tudo hoje — marque
            só o que for seguro preparar.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        <p className="text-sm font-semibold" style={{ color: T.texto }}>Quem você precisa incluir?</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {PERFIS.map((p) => {
            const ativo = perfis.includes(p.id);
            return (
              <button key={p.id} onClick={() => alternarPerfil(p.id)}
                className="h-10 px-4 rounded-full text-sm font-medium border transition-colors inline-flex items-center gap-1.5"
                style={{
                  background: ativo ? T.roxoSuave : T.cartao,
                  color: ativo ? T.roxoTinta : T.texto,
                  borderColor: ativo ? T.roxo + "55" : T.borda,
                }}
                aria-pressed={ativo}>
                {ativo && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                {p.rotulo}
              </button>
            );
          })}
        </div>

        <div className="space-y-6 mt-8">
          {categorias.map((c) => (
            <div key={c.categoria}>
              <h2 className="text-base font-bold mb-2.5" style={{ color: T.tinta }}>{c.categoria}</h2>
              <div className="space-y-2">
                {c.itens.map((item, i) => {
                  const k = `${c.categoria}-${i}`;
                  const marcado = !!feito[k];
                  return (
                    <button key={k} onClick={() => setFeito((f) => ({ ...f, [k]: !f[k] }))}
                      className="w-full text-left rounded-xl border p-4 flex items-start gap-3 transition-colors"
                      style={{ background: marcado ? "#F0FDF4" : T.cartao, borderColor: marcado ? "#86EFAC" : T.borda }}
                      aria-pressed={marcado}>
                      <span className="w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ borderColor: marcado ? "#16A34A" : "#D1D5DB", background: marcado ? "#16A34A" : "#fff" }}
                        aria-hidden="true">
                        {marcado && <Check className="w-4 h-4 text-white" />}
                      </span>
                      <span className="text-sm" style={{ color: T.tinta, textDecoration: marcado ? "line-through" : "none" }}>
                        {item.texto}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FFF7ED", borderColor: "#FDBA74" }} role="note">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.ambar }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7C2D12" }}>
            Este plano fica só na sua tela — não pedimos nomes nem guardamos nada. É educativo e não
            garante ausência de risco: um plano de saída deve considerar a sua situação, e o CRAM ou
            a assistência social podem ajudar a montá-lo com segurança. Em perigo imediato, ligue
            <strong> 190</strong>.
          </p>
        </div>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

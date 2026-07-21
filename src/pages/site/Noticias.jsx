import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Newspaper, ArrowRight, ExternalLink, Info } from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";

/* As notícias vêm de public/noticias.json, gerado no build por
   scripts/coletar-noticias.mjs a partir de fontes oficiais. Buscamos em tempo
   de execução, do próprio domínio — sem CORS e sem servidor.
   Publicamos título, fonte, data e link: o texto da matéria fica com quem
   escreveu, e quem quiser ler vai lá. */

function formatarData(iso) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function Noticias() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(false);
  const [escopo, setEscopo] = useState("Todas");

  useEffect(() => {
    let vivo = true;
    fetch("/noticias.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => vivo && setDados(d))
      .catch(() => vivo && setErro(true));
    return () => { vivo = false; };
  }, []);

  const noticias = dados?.noticias || [];
  const escopos = useMemo(() => {
    const e = [];
    noticias.forEach((n) => n.escopo && !e.includes(n.escopo) && e.push(n.escopo));
    return e.length > 1 ? ["Todas", ...e] : [];
  }, [noticias]);
  const lista = useMemo(
    () => (escopo === "Todas" ? noticias : noticias.filter((n) => n.escopo === escopo)),
    [escopo, noticias]
  );

  const carregando = !dados && !erro;

  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
            Notícias
          </h1>
          <p className="text-sm md:text-lg mt-4 leading-relaxed max-w-2xl" style={{ color: "#E4DBFB" }}>
            Leis, decretos e avanços para as mulheres, no Brasil e no mundo. Reunimos de fontes
            oficiais e levamos você direto à matéria original.
          </p>
        </div>
      </div>

      <Secao className="py-10 md:py-14">
        {escopos.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {escopos.map((e) => {
              const ativo = escopo === e;
              return (
                <button key={e} onClick={() => setEscopo(e)}
                  className="flex-shrink-0 h-10 px-5 rounded-lg text-sm font-medium border transition-colors"
                  style={{
                    background: ativo ? T.roxoSuave : T.cartao,
                    color: ativo ? T.roxoTinta : T.texto,
                    borderColor: ativo ? T.roxo + "55" : T.borda,
                  }}>
                  {e}
                </button>
              );
            })}
          </div>
        )}

        {carregando && (
          <div className="grid gap-4 md:grid-cols-2" aria-busy="true" aria-live="polite">
            <span className="sr-only">Carregando notícias…</span>
            {[0, 1, 2, 3].map((i) => (
              <Cartao key={i} className="p-6">
                <div className="h-3 w-24 rounded" style={{ background: T.borda }} />
                <div className="h-4 w-full rounded mt-4" style={{ background: T.borda }} />
                <div className="h-4 w-3/4 rounded mt-2" style={{ background: T.borda }} />
              </Cartao>
            ))}
          </div>
        )}

        {!carregando && lista.length > 0 && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {lista.map((n, i) => (
                <Cartao key={`${n.link}-${i}`} className="p-6 flex flex-col">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs px-2.5 py-1 rounded-md font-medium"
                      style={{ background: T.roxoSuave, color: T.roxo }}>{n.fonte}</span>
                    {n.escopo && (
                      <span className="text-xs px-2.5 py-1 rounded-md font-medium"
                        style={{ background: T.rosaSuave, color: T.rosaTinta }}>{n.escopo}</span>
                    )}
                    <span className="text-xs" style={{ color: T.apagado }}>{formatarData(n.data)}</span>
                  </div>
                  <p className="font-bold text-base leading-snug mt-3 flex-1" style={{ color: T.tinta }}>
                    {n.titulo}
                  </p>
                  <a href={n.link} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-semibold mt-4 inline-flex items-center gap-1.5 self-start"
                    style={{ color: T.roxo }}
                    aria-label={`Ler "${n.titulo}" no site da ${n.fonte} — abre em nova aba`}>
                    Ler na fonte <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </Cartao>
              ))}
            </div>

            <p className="text-xs mt-6 flex items-start gap-2" style={{ color: T.apagado }}>
              <Info className="w-4 h-4 flex-shrink-0 mt-px" aria-hidden="true" />
              <span>
                Reunimos títulos publicados por Agência Brasil, Agência Senado e ONU Mulheres.
                Os textos pertencem a cada veículo — os links levam à matéria original.
                {dados?.atualizadoEm && ` Atualizado em ${formatarData(dados.atualizadoEm.slice(0, 10))}.`}
              </span>
            </p>
          </>
        )}

        {!carregando && lista.length === 0 && (
          <Cartao className="p-10 md:p-14 text-center">
            <span className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5"
              style={{ background: T.roxoSuave }}>
              <Newspaper className="w-7 h-7" style={{ color: T.roxo }} aria-hidden="true" />
            </span>
            <p className="font-bold text-lg" style={{ color: T.tinta }}>
              Nenhuma notícia nova por enquanto
            </p>
            <p className="text-sm mt-2.5 leading-relaxed max-w-md mx-auto" style={{ color: T.texto }}>
              Esta lista é atualizada todo dia a partir de fontes oficiais. Quando não há
              publicação nova sobre leis e direitos das mulheres, ela fica vazia — preferimos
              isso a encher a página com o que não é do assunto.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
              <Link to="/app/direitos"
                className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
                style={{ background: T.roxo }}>
                Conhecer meus direitos <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to="/jogos"
                className="h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center justify-center border"
                style={{ borderColor: T.borda, color: T.texto }}>
                Jogos educativos
              </Link>
            </div>
          </Cartao>
        )}
      </Secao>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

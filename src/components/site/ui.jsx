import { Link } from "react-router-dom";
import { Phone, MessageCircle, Heart } from "lucide-react";
import { T, TELEFONES } from "./tokens";

/* Peças reaproveitadas pelas páginas institucionais. */

export function Secao({ children, className = "", ...rest }) {
  return (
    <section className={`max-w-6xl mx-auto px-4 ${className}`} {...rest}>
      {children}
    </section>
  );
}

export function TituloSecao({ titulo, sub, icone: Icone, centro = false }) {
  return (
    <div className={`mb-6 ${centro ? "text-center" : ""}`}>
      <div className={`flex items-center gap-2.5 ${centro ? "justify-center" : ""}`}>
        {Icone && (
          <span className="w-9 h-9 rounded-lg inline-flex items-center justify-center flex-shrink-0"
            style={{ background: T.roxoSuave }}>
            <Icone className="w-5 h-5" style={{ color: T.roxo }} aria-hidden="true" />
          </span>
        )}
        <h2 className="text-2xl md:text-[28px] font-bold tracking-tight" style={{ color: T.tinta }}>
          {titulo}
        </h2>
      </div>
      {sub && (
        <p className={`text-sm md:text-base mt-2 leading-relaxed ${centro ? "mx-auto max-w-2xl" : "max-w-3xl"}`}
          style={{ color: T.texto }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export function Cartao({ children, className = "", ...rest }) {
  return (
    <div className={`rounded-2xl border ${className}`}
      style={{ background: T.cartao, borderColor: T.borda }} {...rest}>
      {children}
    </div>
  );
}

/* Bloco "Atendimento Estadual" — os 5 canais verificados, clicáveis. */
export function AtendimentoEstadual({ compacto = false }) {
  const cores = [
    { fg: T.roxo, bg: T.roxoSuave },
    { fg: T.roxo, bg: T.roxoSuave },
    { fg: "#EF4444", bg: "#FEE2E2" },
    { fg: T.ambar, bg: T.ambarSuave },
    { fg: T.verde, bg: T.verdeSuave },
  ];
  return (
    <div className={`grid grid-cols-2 md:grid-cols-5 gap-3 ${compacto ? "" : "mt-1"}`}>
      {TELEFONES.map((t, i) => {
        const c = cores[i] || cores[0];
        return (
          <a key={t.numero} href={`tel:${t.numero}`}
            className="rounded-xl border p-4 text-center transition-colors hover:border-violet-300"
            style={{ background: T.cartao, borderColor: T.borda }}
            aria-label={`Ligar para ${t.nome} — ${t.sub}`}>
            <span className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-2.5"
              style={{ background: c.bg }}>
              <Phone className="w-5 h-5" style={{ color: c.fg }} aria-hidden="true" />
            </span>
            <p className="font-bold text-sm" style={{ color: T.tinta }}>{t.nome}</p>
            <p className="text-xs mt-0.5 leading-snug" style={{ color: T.apagado }}>{t.sub}</p>
            <span className="inline-block text-[11px] px-2 py-1 rounded-md font-medium mt-2.5"
              style={{ background: c.bg, color: c.fg }}>24h — Todos os dias</span>
          </a>
        );
      })}
    </div>
  );
}

/* Faixa "Precisa de ajuda agora?" que fecha as páginas institucionais. */
export function FaixaAjuda() {
  return (
    <Cartao className="p-5 flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex items-center gap-3 flex-1">
        <Heart className="w-9 h-9 flex-shrink-0" style={{ color: T.roxo }} aria-hidden="true" />
        <div>
          <p className="font-bold text-base" style={{ color: T.tinta }}>Precisa de ajuda agora?</p>
          <p className="text-sm" style={{ color: T.texto }}>Não espere. Você merece viver sem violência.</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <a href="tel:180"
          className="h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 border"
          style={{ borderColor: T.roxo + "66", color: T.roxo, background: T.cartao }}>
          <Phone className="w-4 h-4" aria-hidden="true" /> Ligar para 180
        </a>
        <Link to="/assistente"
          className="h-11 px-5 rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2"
          style={{ background: T.roxo }}>
          <MessageCircle className="w-4 h-4" aria-hidden="true" /> Assistente da Rede
        </Link>
      </div>
    </Cartao>
  );
}

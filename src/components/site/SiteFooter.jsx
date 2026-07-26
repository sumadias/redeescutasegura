import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import LogoRES from "./LogoRES";
import { T, NAV, TELEFONES, CONTATO } from "./tokens";

/* Rodapé do site institucional.
   A coluna "Informações" do layout previa Política de Privacidade, Termos de
   Uso e FAQ — páginas que ainda não existem. Em vez de deixar link quebrado,
   ela aponta para o conteúdo informativo que já está publicado e é público. */
const INFORMATIVOS = [
  { rotulo: "O que é violência contra a mulher", href: "/app/o-que-e-violencia" },
  { rotulo: "Quando ocorre a violência doméstica", href: "/app/violencia-domestica" },
  { rotulo: "Meus direitos", href: "/app/direitos" },
  { rotulo: "Segurança e privacidade", href: "/seguranca" },
  { rotulo: "Meus dados", href: "/meus-dados" },
  { rotulo: "Assistente da Rede", href: "/assistente" },
];

function Coluna({ titulo, children }) {
  return (
    <div>
      <p className="text-sm font-bold text-white mb-3.5">{titulo}</p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

const itemCls = "text-sm transition-colors hover:text-white";
const itemStyle = { color: "#CFC4F2" };

export default function SiteFooter() {
  return (
    <footer style={{ background: T.roxoProfundo }} className="mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="grid gap-9 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            {/* símbolo + nome numa linha só (não mais empilhado em 3 linhas) */}
            <div className="flex items-center gap-3">
              <LogoRES tamanho={48} semTexto escuro id="ftr" />
              <span className="font-bold text-white text-lg leading-tight">Rede Escuta Segura</span>
            </div>
            <p className="text-sm mt-4 leading-relaxed max-w-[16rem]" style={{ color: "#CFC4F2" }}>
              Você não está sozinha.<br />Estamos aqui por você.
            </p>

            {/* e-mail e Instagram com a MESMA caixinha de ícone, para os dois
                alinharem — o texto começa exatamente no mesmo ponto. */}
            <a
              href={`mailto:${CONTATO.email}`}
              className="mt-5 flex items-center gap-2.5 text-sm transition-colors hover:text-white w-fit break-all"
              style={{ color: "#CFC4F2" }}
            >
              <span
                className="w-9 h-9 rounded-lg inline-flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </span>
              {CONTATO.email}
            </a>

            <a
              href={CONTATO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2.5 text-sm transition-colors hover:text-white w-fit"
              style={{ color: "#CFC4F2" }}
              aria-label={`Instagram da Rede Escuta Segura, ${CONTATO.instagramArroba} — abre em nova aba`}
            >
              <span
                className="w-9 h-9 rounded-lg inline-flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </span>
              {CONTATO.instagramArroba}
            </a>

            <p className="text-xs mt-4 leading-relaxed max-w-[16rem]" style={{ color: "#A697DC" }}>
              Estes canais são para parcerias e imprensa. Para pedir ajuda, ligue 180 ou 190.
            </p>
          </div>

          <Coluna titulo="Navegação">
            {NAV.map((i) => (
              <li key={i.href}>
                <Link to={i.href} className={itemCls} style={itemStyle}>{i.rotulo}</Link>
              </li>
            ))}
          </Coluna>

          <Coluna titulo="Serviços">
            {TELEFONES.map((t) => (
              <li key={t.numero}>
                <a href={`tel:${t.numero}`} className={itemCls} style={itemStyle}
                  aria-label={`Ligar para ${t.nome} — ${t.sub}`}>
                  {t.nome}
                </a>
              </li>
            ))}
          </Coluna>

          <Coluna titulo="Informações">
            {INFORMATIVOS.map((i) => (
              <li key={i.href}>
                <Link to={i.href} className={itemCls} style={itemStyle}>{i.rotulo}</Link>
              </li>
            ))}
          </Coluna>
        </div>

        <div className="mt-9 pt-6 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-2"
          style={{ borderColor: "rgba(255,255,255,0.16)" }}>
          <p className="text-xs" style={{ color: "#B9AAE8" }}>
            Uma iniciativa da Nous Inovação &amp; Tecnologia Inova Simples I.S. — CNPJ 65.276.411/0001-50
          </p>
          <p className="text-xs" style={{ color: "#B9AAE8" }}>
            © {new Date().getFullYear()} Rede Escuta Segura. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

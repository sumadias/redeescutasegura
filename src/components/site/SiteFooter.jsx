import { Link } from "react-router-dom";
import LogoRES from "./LogoRES";
import { T, NAV, TELEFONES } from "./tokens";

/* Rodapé do site institucional.
   A coluna "Informações" do layout previa Política de Privacidade, Termos de
   Uso e FAQ — páginas que ainda não existem. Em vez de deixar link quebrado,
   ela aponta para o conteúdo informativo que já está publicado e é público. */
const INFORMATIVOS = [
  { rotulo: "O que é violência contra a mulher", href: "/app/o-que-e-violencia" },
  { rotulo: "Quando ocorre a violência doméstica", href: "/app/violencia-domestica" },
  { rotulo: "Meus direitos", href: "/app/direitos" },
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
            <LogoRES tamanho={44} escuro id="ftr" />
            <p className="text-sm mt-4 leading-relaxed max-w-[16rem]" style={{ color: "#CFC4F2" }}>
              Você não está sozinha.<br />Estamos aqui por você.
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

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Download, Trash2, Database, Info, ShieldCheck, HardDrive,
} from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";
import { sairDaConta } from "@/lib/sairDaConta";
import ApagarDaConta from "@/components/site/ApagarDaConta";

/* #21 Central "Meus Dados" — parte técnica.
 *
 * Mostra o que está guardado NESTE APARELHO (localStorage), com finalidade em
 * linguagem clara, e deixa exportar e apagar. Nada aqui foi enviado para a
 * Rede: são dados do próprio navegador.
 *
 * O texto jurídico (quem é o controlador, o encarregado, prazos de retenção)
 * fica pendente das definições da equipe — não inventamos papéis de LGPD.
 */

/* chaves conhecidas → rótulo e finalidade em linguagem simples */
const CONHECIDOS = {
  res_acessibilidade: {
    rotulo: "Preferências de acessibilidade",
    finalidade: "Guarda seus ajustes de tamanho de fonte, espaçamento e movimento.",
  },
  esc_anon_id: {
    rotulo: "Identificador anônimo",
    finalidade: "Um código aleatório que permite continuar um atendimento sem dar seu nome.",
  },
  quick_exit_url: {
    rotulo: "Página de saída rápida",
    finalidade: "Para onde o botão “Sair rapidamente” leva você.",
  },
  diary_master_key: {
    rotulo: "Chave do diário",
    finalidade: "Protege o conteúdo do seu diário neste aparelho.",
  },
  chat_session_key: {
    rotulo: "Chave do atendimento",
    finalidade: "Mantém a conversa de um atendimento ligada a você, sem identificação.",
  },
  base44_access_token: {
    rotulo: "Sessão (login)",
    finalidade: "Mantém você conectada à sua conta. Apagar aqui é o mesmo que sair.",
    ehSessao: true,
  },
  token: {
    rotulo: "Sessão (login)",
    finalidade: "Mantém você conectada à sua conta. Apagar aqui é o mesmo que sair.",
    ehSessao: true,
  },
};

function lerLocal() {
  const itens = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      const info = CONHECIDOS[chave] || {
        rotulo: "Outro dado guardado",
        finalidade: `Item técnico (${chave}).`,
      };
      itens.push({ chave, ...info });
    }
  } catch {
    /* storage bloqueado */
  }
  return itens;
}

export default function MeusDados() {
  const [itens, setItens] = useState([]);
  const [confirmarTudo, setConfirmarTudo] = useState(false);

  const recarregar = useCallback(() => setItens(lerLocal()), []);
  useEffect(() => { recarregar(); }, [recarregar]);

  function apagar(item) {
    if (item.ehSessao) {
      /* apagar a sessão é sair da conta, com segurança */
      sairDaConta("/meus-dados");
      return;
    }
    try { localStorage.removeItem(item.chave); } catch {}
    recarregar();
  }

  function exportar() {
    const dados = {};
    itens.forEach((i) => {
      if (i.ehSessao) return; // não exportamos o token de sessão
      try { dados[i.chave] = localStorage.getItem(i.chave); } catch {}
    });
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meus-dados.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function apagarTudo() {
    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch {}
    setConfirmarTudo(false);
    recarregar();
  }

  return (
    <>
      <div className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
          <Link to="/seguranca" className="text-sm font-medium inline-flex items-center gap-1.5"
            style={{ color: "#E4DBFB" }}>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Segurança e privacidade
          </Link>
          <h1 className="text-3xl md:text-[38px] font-extrabold text-white tracking-tight leading-tight mt-3">
            Meus dados
          </h1>
          <p className="text-sm md:text-lg mt-3 leading-relaxed" style={{ color: "#E4DBFB" }}>
            Veja o que está guardado neste aparelho, para que serve, e apague o que quiser.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        <div className="rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: T.roxoSuave, borderColor: T.borda }} role="note">
          <HardDrive className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.roxo }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: T.tinta }}>
            <strong>Tudo abaixo fica só neste navegador.</strong> Nada nesta lista foi enviado para a
            Rede — são dados do seu próprio aparelho.
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 mb-3">
          <h2 className="text-base font-bold" style={{ color: T.tinta }}>
            Guardado neste aparelho ({itens.length})
          </h2>
          {itens.length > 0 && (
            <button onClick={exportar}
              className="h-9 px-3 rounded-lg text-xs font-semibold text-white inline-flex items-center gap-1.5"
              style={{ background: T.roxo }}>
              <Download className="w-3.5 h-3.5" aria-hidden="true" /> Exportar
            </button>
          )}
        </div>

        {itens.length === 0 ? (
          <Cartao className="p-8 text-center">
            <Database className="w-8 h-8 mx-auto mb-2" style={{ color: "#D3CCEC" }} aria-hidden="true" />
            <p className="text-sm font-medium" style={{ color: T.tinta }}>Nada guardado neste aparelho.</p>
            <p className="text-sm mt-1" style={{ color: T.texto }}>
              Ajustes e sessões aparecem aqui conforme você usa o site.
            </p>
          </Cartao>
        ) : (
          <div className="space-y-3">
            {itens.map((item) => (
              <Cartao key={item.chave} className="p-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: T.tinta }}>{item.rotulo}</p>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: T.texto }}>{item.finalidade}</p>
                </div>
                <button onClick={() => apagar(item)}
                  className="h-9 px-3 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border flex-shrink-0"
                  style={{ borderColor: "#FCA5A5", color: "#B91C1C", background: "#fff" }}
                  aria-label={item.ehSessao ? "Sair da conta" : `Apagar ${item.rotulo}`}>
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  {item.ehSessao ? "Sair" : "Apagar"}
                </button>
              </Cartao>
            ))}
          </div>
        )}

        {itens.length > 0 && (
          <div className="mt-6">
            {!confirmarTudo ? (
              <button onClick={() => setConfirmarTudo(true)}
                className="text-sm font-semibold inline-flex items-center gap-1.5"
                style={{ color: "#B91C1C" }}>
                <Trash2 className="w-4 h-4" aria-hidden="true" /> Apagar tudo deste aparelho
              </button>
            ) : (
              <Cartao className="p-5" style={{ borderColor: "#FCA5A5" }}>
                <p className="font-bold text-sm" style={{ color: "#B91C1C" }}>Apagar tudo?</p>
                <p className="text-sm mt-1" style={{ color: T.texto }}>
                  Isso remove todos os ajustes e encerra a sessão neste aparelho. Não dá para desfazer.
                </p>
                <div className="flex gap-3 mt-3">
                  <button onClick={apagarTudo}
                    className="h-10 px-4 rounded-lg text-sm font-semibold text-white"
                    style={{ background: "#B91C1C" }}>
                    Sim, apagar tudo
                  </button>
                  <button onClick={() => setConfirmarTudo(false)}
                    className="h-10 px-4 rounded-lg text-sm font-semibold border"
                    style={{ borderColor: T.borda, color: T.texto, background: T.cartao }}>
                    Cancelar
                  </button>
                </div>
              </Cartao>
            )}
          </div>
        )}

        {/* SEG-07: o que está na conta, e a exclusão de tudo de uma vez. Até
            aqui esta página só alcançava o armazenamento local, e o que ficava
            no servidor não tinha como ser apagado pela própria pessoa. */}
        <ApagarDaConta />

        {/* Para que usamos cada dado — finalidades (#5 governança / A5) */}
        <div className="mt-8">
          <h2 className="text-base font-bold mb-3" style={{ color: T.tinta }}>Para que usamos seus dados</h2>
          <div className="space-y-3">
            {[
              { fim: "Lembrar seus ajustes", onde: "Neste aparelho", txt: "Tamanho de fonte, espaçamento e outras preferências de acessibilidade." },
              { fim: "Atender sem seu nome", onde: "Neste aparelho", txt: "Um código aleatório permite continuar um atendimento sem que você se identifique." },
              { fim: "Guardar diário, plano e cartas", onde: "Na sua conta", txt: "Só ficam guardados se você usar essas ferramentas, e só você tem acesso." },
            ].map((f) => (
              <Cartao key={f.fim} className="p-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-sm" style={{ color: T.tinta }}>{f.fim}</p>
                  <span className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                    style={{ background: T.roxoSuave, color: T.roxo }}>{f.onde}</span>
                </div>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: T.texto }}>{f.txt}</p>
              </Cartao>
            ))}
          </div>
          <p className="text-sm mt-3 leading-relaxed" style={{ color: T.texto }}>
            <strong style={{ color: T.tinta }}>Você controla cada finalidade:</strong> se você não usa
            uma função, nada é guardado para ela. Para retirar o que já existe, apague aqui (aparelho)
            ou no <Link to="/app/meu-espaco" style={{ color: T.roxo, fontWeight: 600 }}>Meu Espaço</Link> (conta).
          </p>
        </div>

        {/* dados da conta + pendência jurídica, com honestidade */}
        <Cartao className="mt-8 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.verde }} aria-hidden="true" />
            <div>
              <p className="font-bold text-sm" style={{ color: T.tinta }}>Dados da sua conta</p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: T.texto }}>
                Se você tem login, seu diário, plano de segurança e cartas ficam guardados na sua
                conta — visíveis só para você. Para exportar ou apagar esses, entre no{" "}
                <Link to="/app/meu-espaco" style={{ color: T.roxo, fontWeight: 600 }}>Meu Espaço</Link>.
              </p>
            </div>
          </div>
        </Cartao>

        <div className="mt-4 rounded-2xl border p-5 flex items-start gap-3"
          style={{ background: "#FFF7ED", borderColor: "#FDBA74" }} role="note">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: T.ambar }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#7C2D12" }}>
            O controlador dos seus dados é a <strong>Nous Inovação &amp; Tecnologia Inova Simples I.S.</strong> (CNPJ 65.276.411/0001-50) e o encarregado (DPO) é <strong>Victor Higo Alves de Souza</strong>, OAB/PB 27.292. Para exercer seus direitos, escreva para <strong>contato@redeescutasegura.com.br</strong>. A política completa está em <a href="/privacidade" className="underline font-semibold">Política de Privacidade</a>.
          </p>
        </div>
      </div>

      <Secao className="pb-14">
        <FaixaAjuda />
      </Secao>
    </>
  );
}

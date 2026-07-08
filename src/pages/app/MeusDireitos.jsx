import { useState } from "react";
import AppFooter from "@/components/AppFooter";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, Phone } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";

const TOPICOS = [
  {
    titulo: "Lei Maria da Penha",
    conteudo: `A Lei 11.340/2006 — conhecida como Lei Maria da Penha — é a principal lei de proteção às mulheres em situação de violência doméstica e familiar no Brasil.

Ela reconhece cinco tipos de violência: física, psicológica, sexual, patrimonial e moral. A lei criou mecanismos específicos de punição para os agressores e garantiu às mulheres o direito a medidas protetivas de urgência, atendimento especializado e acompanhamento judicial.

Por causa dessa lei, a violência doméstica deixou de ser considerada crime de menor potencial ofensivo e passou a ter penas mais severas. O agressor pode ser preso em flagrante ou preventivamente, mesmo sem que a vítima precise assinar qualquer representação.`,
  },
  {
    titulo: "Medidas protetivas de urgência",
    conteudo: `As medidas protetivas são ordens judiciais que protegem a mulher de forma imediata, sem que ela precise esperar o julgamento do agressor.

Elas podem determinar:
• Afastamento do agressor da residência da vítima
• Proibição de aproximação e contato com a vítima e seus filhos
• Proibição de frequentar os mesmos lugares que a vítima
• Suspensão do porte de arma do agressor
• Prestação de alimentos provisionais

Para solicitar uma medida protetiva, basta ir a uma delegacia, registrar o boletim de ocorrência e pedir a medida. O juiz tem até 48 horas para decidir. Você não precisa de advogado para esse pedido.`,
  },
  {
    titulo: "Como registrar um boletim de ocorrência",
    conteudo: `Registrar o boletim de ocorrência é o primeiro passo para acionar a proteção legal. Você pode fazer isso:

• Presencialmente em qualquer Delegacia de Polícia Civil
• Na Delegacia Especializada de Atendimento à Mulher (DEAM), quando disponível na sua cidade
• Pelo site da Delegacia Online do seu estado (disponível em alguns estados)

Você não precisa de provas físicas para registrar o BO. O seu relato já é suficiente. Leve documentos pessoais se possível, mas mesmo sem eles o registro pode ser feito.

Após o registro, você pode solicitar imediatamente as medidas protetivas de urgência.`,
  },
  {
    titulo: "Lei do Feminicídio",
    conteudo: `A Lei 13.104/2015 incluiu o feminicídio no Código Penal brasileiro como uma forma qualificada de homicídio doloso.

O feminicídio é o assassinato de uma mulher por razões de condição de sexo feminino — ou seja, quando a morte ocorre em contexto de violência doméstica ou familiar, ou por menosprezo e discriminação à condição de mulher.

Por ser crime hediondo, a pena é de 12 a 30 anos de reclusão e pode ser aumentada em casos específicos, como quando o crime é cometido na presença de filhos, durante a gestação ou contra mulher com deficiência.`,
  },
  {
    titulo: "Direito ao sigilo e à privacidade",
    conteudo: `A mulher em situação de violência tem direito ao sigilo de seus dados pessoais durante todo o processo de atendimento e investigação.

Seus dados — como endereço, telefone e local de trabalho — não podem ser divulgados ao agressor nem a terceiros sem sua autorização.

Esse direito está garantido pela Lei Maria da Penha e pelo Marco Civil da Internet (Lei 12.965/2014), que também protege contra a divulgação não autorizada de imagens e mensagens íntimas.`,
  },
  {
    titulo: "Assistência jurídica gratuita",
    conteudo: `Toda mulher em situação de violência tem direito a assistência jurídica gratuita e integral, independentemente de sua renda.

Esse serviço é oferecido pela Defensoria Pública, presente em todos os estados brasileiros. A Defensoria pode:

• Orientar sobre seus direitos
• Representá-la em processos judiciais
• Solicitar medidas protetivas
• Auxiliar em ações de divórcio, guarda dos filhos e pensão alimentícia

Para acessar, procure a Defensoria Pública do seu estado ou ligue para o número 129 (Central de Atendimento à Mulher).`,
  },
  {
    titulo: "Canais de denúncia",
    conteudo: `Você pode denunciar situações de violência por diferentes canais:

• 180 — Central de Atendimento à Mulher (24h, gratuito, sigiloso)
• 190 — Polícia Militar (emergências)
• 197 — Polícia Civil
• 192 — SAMU (emergências médicas)
• Ligue 100 — Direitos Humanos (denúncias de violações)

Todos os atendimentos são gratuitos, funcionam 24 horas e garantem sigilo. Você pode ligar mesmo sem certeza — os profissionais estão preparados para orientar e acolher.`,
  },
];

function Topico({ item }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: "#fff", borderColor: "#e5e7eb" }}>
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none transition-colors hover:bg-gray-50"
        aria-expanded={aberto}
        style={{ minHeight: 56 }}
      >
        <span className="font-semibold text-base leading-snug pr-4" style={{ color: "#292524" }}>{item.titulo}</span>
        {aberto
          ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: "#57534E" }} />
          : <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: "#57534E" }} />}
      </button>
      {aberto && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <p className="text-sm leading-relaxed whitespace-pre-line mt-4" style={{ color: "#57534E" }}>{item.conteudo}</p>
        </div>
      )}
    </div>
  );
}

export default function MeusDireitos() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAFAF9" }}>
      <QuickExitButton />
      <main className="flex-1 px-4 pt-14 pb-10 max-w-md mx-auto w-full space-y-6">
        <div className="pt-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#57534E" }} />
          </button>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "#292524" }}>Meus direitos</h1>
            <p className="text-sm" style={{ color: "#57534E" }}>Leis, proteção e como denunciar</p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#57534E" }}>
          <p>Você tem direitos garantidos por lei. Conhecê-los é uma forma de proteção.</p>
          <p>Aqui você encontra informações sobre as principais leis que protegem a mulher, como solicitar medidas protetivas, onde registrar uma ocorrência e como acessar assistência jurídica gratuita — tudo em linguagem simples.</p>
        </div>

        <div className="space-y-3">
          {TOPICOS.map((t, i) => (
            <Topico key={i} item={t} />
          ))}
        </div>

        <div className="rounded-xl px-5 py-4 flex items-start gap-3" style={{ background: "#FEF3C7", border: "1px solid #B4530922" }}>
          <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#92400E" }} />
          <p className="text-sm leading-relaxed" style={{ color: "#92400E" }}>
            Em perigo imediato? Ligue <strong>190</strong> ou <strong>180</strong> agora.
          </p>
        </div>

        <p className="text-xs text-center px-2 leading-relaxed" style={{ color: "#A8A29E" }}>
          Estas informações são orientativas e não substituem atendimento jurídico profissional.
          Para orientação gratuita, procure a Defensoria Pública do seu estado.
        </p>
      </main>
      <AppFooter />
    </div>
  );
}
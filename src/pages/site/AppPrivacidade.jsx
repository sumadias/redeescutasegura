import {
  Smartphone, MapPin, Users, ShieldCheck, Trash2, PhoneCall, Info,
} from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";

/* Política de privacidade do APLICATIVO SOS Agora (exigência da Play Store).
 *
 * RASCUNHO para revisão (Suzana + Victor) antes de publicar. Descreve com
 * exatidão o que o app faz na fase 1 (modo de teste, dados só no aparelho).
 * Quando a fase 2 (Firebase) for ativada, esta página DEVE ser atualizada.
 */
const SECOES = [
  {
    icone: Smartphone,
    titulo: "Quais dados o aplicativo coleta",
    texto:
      "No cadastro: seu nome completo, telefone, CPF e endereço. Nos contatos de " +
      "confiança: apenas nome e telefone (no máximo 3 pessoas). Durante um alerta: " +
      "sua localização GPS naquele momento.",
  },
  {
    icone: ShieldCheck,
    titulo: "Onde os dados ficam",
    texto:
      "Nesta versão, todos os dados ficam armazenados somente no seu aparelho. " +
      "Não são enviados para servidores da Rede Escuta Segura nem vendidos ou " +
      "compartilhados com terceiros. O acesso ao app é protegido por PIN e, " +
      "quando disponível, biometria (a leitura da digital acontece no próprio " +
      "aparelho — o app não vê nem guarda sua biometria).",
  },
  {
    icone: PhoneCall,
    titulo: "Para que os dados são usados",
    texto:
      "Exclusivamente para o socorro: ao tocar no botão SOS, o app envia aos seus " +
      "contatos de confiança uma mensagem com seu nome, a data/hora e um link do " +
      "Google Maps com a sua posição, e liga para o primeiro contato. Seu CPF e o " +
      "seu endereço NUNCA são mostrados aos contatos.",
  },
  {
    icone: MapPin,
    titulo: "Localização",
    texto:
      "A localização é usada apenas durante um alerta. Enquanto a tela do alerta " +
      "está aberta, o app pode enviar atualizações da sua posição por SMS quando " +
      "você se desloca. O app não acompanha sua localização em segundo plano no " +
      "dia a dia, e nenhuma trajetória é armazenada.",
  },
  {
    icone: Users,
    titulo: "Permissões que o app pede",
    texto:
      "Localização (para incluir sua posição no alerta), SMS (para enviar o pedido " +
      "de socorro automaticamente) e telefone (para ligar ao seu 1º contato sem " +
      "toques). Todas são explicadas dentro do app antes do pedido do sistema e " +
      "são usadas apenas na emergência.",
  },
  {
    icone: Trash2,
    titulo: "Seus direitos (LGPD)",
    texto:
      "Você pode ver e corrigir seus dados a qualquer momento em Configurações, " +
      "remover contatos, apagar o histórico e excluir tudo desinstalando o " +
      "aplicativo. Dúvidas ou solicitações: contato@redeescutasegura.com.br.",
  },
];

export default function AppPrivacidade() {
  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
            Privacidade do aplicativo SOS Agora
          </h1>
          <p className="text-sm md:text-lg mt-4 leading-relaxed max-w-2xl" style={{ color: "#E4DBFB" }}>
            Como o aplicativo de emergência da Rede Escuta Segura trata seus dados:
            o que coleta, para quê, e o que nunca faz.
          </p>
        </div>
      </div>

      <Secao className="py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {SECOES.map((s) => (
            <Cartao key={s.titulo} className="p-6 flex gap-4">
              <span
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: T.roxoSuave }}
              >
                <s.icone className="w-5 h-5" style={{ color: T.roxo }} aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold text-base" style={{ color: T.tinta }}>{s.titulo}</p>
                <p className="text-sm mt-1.5 leading-relaxed" style={{ color: T.texto }}>{s.texto}</p>
              </div>
            </Cartao>
          ))}
        </div>

        <Cartao className="p-6 mt-6 flex gap-4" style={{ background: "#FEF9C3" }}>
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#854D0E" }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#854D0E" }}>
            <strong>Importante:</strong> o SOS Agora não substitui a polícia. Em perigo
            imediato, ligue <strong>190</strong>. O aplicativo é um apoio para avisar
            rapidamente pessoas de confiança e depende de sinal de celular e GPS.
            Última atualização desta política: 31/07/2026.
          </p>
        </Cartao>
      </Secao>

      <FaixaAjuda />
    </>
  );
}

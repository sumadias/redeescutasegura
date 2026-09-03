import {
  BookLock, MapPinOff, UserCog, Trash2, Users, Server, Clock, Info,
} from "lucide-react";
import { T } from "@/components/site/tokens";
import { Secao, Cartao, FaixaAjuda } from "@/components/site/ui";

/* Política de privacidade do SITE/APP Rede Escuta Segura (LGPD + exigência da
 * Play Store para a ficha do aplicativo).
 *
 * NÃO confundir com /app-privacidade, que é a política do SOS Agora — outro
 * produto, que pede CPF e endereço e usa localização. Este aqui não faz nada
 * disso, e apontar a política errada na ficha da Play descreveria um app que
 * não é este.
 *
 * O conteúdo abaixo foi escrito a partir do que o código realmente grava
 * (entidades DiarioEmocao, PlanoSeguranca, CartaPessoal, ItemSalvo,
 * ChatSessao/ChatMensagem, Consulta), não do que se supõe que ele faça.
 *
 * PENDENTE DE DEFINIÇÃO (Victor): base legal por finalidade e prazo de
 * retenção. Estão marcados na tela como "em definição" em vez de inventados —
 * declarar prazo errado na Segurança dos Dados da Play é pior que admitir
 * que ainda não há prazo.
 */

const DADOS = [
  {
    icone: BookLock,
    titulo: "O que você escreve no Meu Espaço",
    texto:
      "Diário de emoções, plano de segurança (incluindo nome e telefone das pessoas de " +
      "confiança que você cadastrar, lugar seguro e palavra-código), cartas para você mesma " +
      "e itens salvos. Tudo isso fica na sua conta e só você acessa — nem a equipe da Rede " +
      "nem a administração do site conseguem ler.",
  },
  {
    icone: Users,
    titulo: "O que você envia a um profissional",
    texto:
      "Se você iniciar uma conversa no chat ou marcar um atendimento, o profissional do " +
      "outro lado lê o que você escreveu — é o objetivo do serviço. Isso é diferente do " +
      "diário e das cartas, que ninguém além de você vê.",
  },
  {
    icone: MapPinOff,
    titulo: "O que NÃO pedimos",
    texto:
      "Não pedimos CPF, endereço nem localização. O site não usa GPS: o servidor bloqueia " +
      "o acesso à localização, à câmera e ao microfone, então nem um script invasor " +
      "conseguiria pedir. Serviços são encontrados digitando o nome da cidade.",
  },
  {
    icone: Server,
    titulo: "Onde os dados ficam",
    texto:
      "Na plataforma Base44, que hospeda a sua conta e os seus registros. A conexão é " +
      "sempre criptografada (HTTPS). No seu aparelho ficam apenas preferências de uso — " +
      "tamanho de fonte, contraste e o endereço da saída rápida.",
  },
  {
    icone: Trash2,
    titulo: "Você apaga quando quiser",
    texto:
      "Cada registro pode ser excluído na própria tela, e em Meus Dados existe a opção de " +
      "apagar de uma vez o diário, o plano, as cartas e os itens salvos. A exclusão é " +
      "imediata e definitiva — não vai para uma lixeira.",
  },
  {
    icone: Clock,
    titulo: "Sua sessão fecha sozinha",
    texto:
      "Depois de 2 minutos sem uso nas telas do Meu Espaço, a sessão é encerrada " +
      "automaticamente. É proteção para o caso de o aparelho ficar com outra pessoa — " +
      "nada do que você escreveu é perdido.",
  },
];

export default function PoliticaPrivacidade() {
  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(115deg,#5327B0 0%,#6D3FD4 55%,#7C4DE0 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight">
            Política de Privacidade
          </h1>
          <p className="text-sm md:text-lg mt-4 leading-relaxed max-w-2xl" style={{ color: "#E4DBFB" }}>
            O que a Rede Escuta Segura guarda, o que nunca pede, quem responde por
            esses dados e como você apaga tudo.
          </p>
        </div>
      </div>

      <Secao className="py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {DADOS.map((s) => (
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

        {/* Controlador e encarregado — LGPD art. 41, §1º exige identidade E contato. */}
        <Cartao className="p-6 mt-6">
          <div className="flex gap-4">
            <span
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: T.roxoSuave }}
            >
              <UserCog className="w-5 h-5" style={{ color: T.roxo }} aria-hidden="true" />
            </span>
            <div>
              <p className="font-bold text-base" style={{ color: T.tinta }}>
                Quem responde pelos seus dados
              </p>

              <p className="text-sm mt-3 leading-relaxed" style={{ color: T.texto }}>
                <strong>Controlador:</strong> Nous Inovação &amp; Tecnologia Inova Simples I.S.
                — CNPJ 65.276.411/0001-50.
              </p>

              <p className="text-sm mt-2 leading-relaxed" style={{ color: T.texto }}>
                <strong>Encarregado pelo tratamento de dados (DPO):</strong>{" "}
                Victor Higo Alves de Souza — OAB/PB 27.292.
              </p>

              <p className="text-sm mt-2 leading-relaxed" style={{ color: T.texto }}>
                <strong>Para exercer seus direitos</strong> — saber quais dados existem,
                corrigir, apagar ou tirar dúvidas — escreva para{" "}
                <a
                  href="mailto:contato@redeescutasegura.com.br"
                  className="font-semibold underline"
                  style={{ color: T.roxo }}
                >
                  contato@redeescutasegura.com.br
                </a>
                . Os pedidos que forem do encarregado são encaminhados a ele.
              </p>
            </div>
          </div>
        </Cartao>

        {/* Honesto sobre o que ainda não está definido, em vez de inventar prazo. */}
        <Cartao className="p-6 mt-4 flex gap-4" style={{ background: "#FEF9C3" }}>
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#854D0E" }} aria-hidden="true" />
          <p className="text-sm leading-relaxed" style={{ color: "#854D0E" }}>
            <strong>Em definição:</strong> a base legal de cada finalidade e o prazo de
            guarda dos registros estão sendo formalizados pelo encarregado e serão
            publicados aqui. Enquanto isso, vale o que já está escrito acima: você pode
            apagar seus dados a qualquer momento, e nenhum registro do Meu Espaço é
            acessível à equipe.
          </p>
        </Cartao>

        <p className="text-xs mt-6 text-center" style={{ color: T.apagado }}>
          Esta política trata do site e do aplicativo Rede Escuta Segura. O aplicativo
          SOS Agora tem política própria, em /app-privacidade.
        </p>
      </Secao>

      <FaixaAjuda />
    </>
  );
}

import { useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useAutoLogout } from "@/hooks/useAutoLogout";
import { sairDaConta } from "@/lib/sairDaConta";

/* SEG-01 / SEG-05 da auditoria de 03/09/2026.
 *
 * O hook useAutoLogout existia no repositório desde sempre e NUNCA era chamado
 * em lugar nenhum — era código morto que dava a impressão, para quem lesse o
 * projeto, de que havia tranca por inatividade. Não havia: a sessão ficava no
 * localStorage sem prazo, e quem pegasse o celular destravado entrava direto no
 * diário e no plano de segurança. Este componente liga o hook.
 *
 * Só vale nas rotas que guardam conteúdo pessoal. Encerrar a sessão de quem
 * está lendo /orientacao ou /emergencia não protegeria nada e atrapalharia.
 *
 * A tranca de verdade — código de acesso e biometria antes de abrir o Meu
 * Espaço — é da Onda 2. Isto é o que dá para fazer sem mexer no desenho das
 * telas: enquanto não há código, pelo menos a sessão não fica aberta para
 * sempre.
 */

const ROTAS_PRIVADAS = [
  "/app/meu-espaco", "/app/diario", "/app/plano", "/app/cartas", "/app/humor",
  "/app/salvos", "/app/arte", "/app/calma", "/app/trilha", "/app/jornada",
  "/app/chat", "/app/agendamento", "/painel", "/admin",
];

/* Dois minutos parados. O relógio reinicia a cada toque, tecla ou digitação,
   então quem está escrevendo no diário não é interrompida — só quem largou o
   aparelho. Para conteúdo sensível (plano de segurança, contatos de fuga),
   2 min é o equilíbrio entre praticidade e risco de alguém pegar o celular. */
const MINUTOS = 2;

function Relogio() {
  useAutoLogout({
    timeoutMs: MINUTOS * 60 * 1000,
    /* O destino é a própria porta do Meu Espaço: sem sessão ela mostra
       "Este espaço é privado". O ?expirou=1 troca o texto para explicar
       que foi a inatividade, e não um erro. */
    onLogout: () => sairDaConta("/app/meu-espaco?expirou=1"),
  });
  return null;
}

export default function TrancaPorInatividade() {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const emRotaPrivada = ROTAS_PRIVADAS.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );

  /* O relógio vive num filho para poder simplesmente não existir fora das
     rotas privadas — hook não pode ser chamado condicionalmente. */
  if (!isAuthenticated || !emRotaPrivada) return null;
  return <Relogio />;
}

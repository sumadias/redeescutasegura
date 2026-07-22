/* Encerra a sessão e devolve a pessoa a uma página nossa.
 *
 * POR QUE NÃO USAMOS base44.auth.logout(url):
 * o SDK navega para <app>.base44.app/api/apps/auth/logout?from_url=... e o
 * Base44 só redireciona de volta para domínios que ele mesmo hospeda. Quem
 * clicava em "Sair" no nosso domínio terminava em
 * omniscient-escuta-segura-rede.base44.app — outro site, com outra versão do
 * app. É o mesmo limite que já nos obrigou a remover o login com Google.
 *
 * Podemos encerrar por conta própria porque o SDK autentica apenas com o
 * Bearer token guardado no localStorage (verificado em client.js: nenhuma
 * chamada usa cookie/withCredentials). Sem o token, não há sessão aqui.
 * O cookie que fica no domínio da Base44 só vale para a versão hospedada lá.
 *
 * Usamos replace() para o "voltar" do navegador não devolver a tela logada.
 */
const CHAVES_DE_SESSAO = ["base44_access_token", "token"];

/* Apaga a credencial sem sair da página. Para quem precisa encerrar a sessão
   e continuar onde está (ex.: sessão expirada, com aviso na tela). */
export function limparSessao() {
  try {
    CHAVES_DE_SESSAO.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    /* navegador com storage bloqueado */
  }
  try {
    window.sessionStorage.clear();
  } catch {}
}

export function sairDaConta(destino = "/app/meu-espaco") {
  limparSessao();
  /* recarga completa de propósito: zera o estado do SDK em memória, que
     mantém o header Authorization já configurado */
  window.location.replace(destino);
}

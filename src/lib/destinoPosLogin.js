/* Para onde mandar a pessoa depois de entrar ou criar a conta.
 *
 * O guard do Meu Espaço manda ?next=/app/meu-espaco, mas Login e Register
 * ignoravam o parâmetro e jogavam todo mundo em /app/menu — quem clicava em
 * "Meu Espaço" no menu entrava e caía em outro lugar, sem entender por quê.
 *
 * Só aceitamos caminho interno: precisa começar com uma única barra. Isso
 * bloqueia "//site.com" e "https://site.com", que transformariam o formulário
 * de login num redirecionador para fora do domínio.
 */
export function destinoPosLogin(padrao = "/app/menu") {
  try {
    const bruto = new URLSearchParams(window.location.search).get("next");
    if (!bruto) return padrao;
    if (!bruto.startsWith("/") || bruto.startsWith("//")) return padrao;
    return bruto;
  } catch {
    return padrao;
  }
}

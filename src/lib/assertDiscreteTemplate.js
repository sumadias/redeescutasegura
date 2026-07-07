/**
 * Valida que um template de notificação não contém termos que
 * possam expor a natureza sensível da plataforma.
 */

const FORBIDDEN_TERMS = [
  /Rede Escuta Segura/i,
  /viol[eê]ncia/i,
  /v[ií]tima/i,
  /acolhimento/i,
  /consulta agendada/i,
  /apoio jur[ií]dico/i,
  /delegacia/i,
  /abuso/i,
  /agress[aã]o/i,
];

/**
 * Lança um erro se o template contiver termos proibidos.
 * Use em testes unitários e antes de enviar qualquer notificação.
 * @param {object} template - Template com subject, body, pushTitle, pushBody, senderName
 * @returns {object} O mesmo template se válido
 */
export function assertDiscreteTemplate(template) {
  const content = [
    template.subject,
    template.senderName,
    template.body,
    template.pushTitle,
    template.pushBody,
  ]
    .filter(Boolean)
    .join(" ");

  const forbidden = FORBIDDEN_TERMS.find((term) => term.test(content));
  if (forbidden) {
    throw new Error(
      `Template de notificação não discreto. Termo proibido encontrado: "${forbidden}"`
    );
  }

  return template;
}
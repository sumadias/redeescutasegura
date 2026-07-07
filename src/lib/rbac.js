/**
 * RBAC client-side — regras de acesso por papel.
 * Reforço real deve ser feito server-side (backend functions).
 * Este módulo é usado para ocultar/desabilitar elementos na UI
 * e como documentação das políticas de acesso.
 */

export const ROLES = {
  USER: "user",
  PROFESSIONAL: "professional",
  MANAGER: "manager",
  ADMIN: "admin",
};

/**
 * Verifica se o usuário pode acessar um chat.
 * USER: apenas seus próprios chats.
 * PROFESSIONAL: apenas chats aceitos/atribuídos a ele.
 * Nenhum outro papel deve ler conteúdo privado de chat.
 */
export function canAccessChat({ user, chat }) {
  if (!user || !chat) return false;
  if (user.role === ROLES.USER) return chat.owner_user_id === user.id;
  if (user.role === ROLES.PROFESSIONAL) return chat.assigned_professional_id === user.id;
  return false;
}

/**
 * Verifica se o usuário pode ler entradas do diário.
 * Apenas o próprio usuário pode ler seu diário.
 */
export function canAccessDiary({ user, entry }) {
  if (!user || !entry) return false;
  return entry.anonymous_id === user.anonymous_id;
}

/**
 * Verifica se o usuário pode ver relatórios agregados (sem dados individuais).
 */
export function canViewAggregatedReports(user) {
  return [ROLES.MANAGER, ROLES.ADMIN].includes(user?.role);
}

/**
 * Verifica se o usuário pode gerenciar a lista de serviços da rede.
 */
export function canManageServices(user) {
  return [ROLES.MANAGER, ROLES.ADMIN].includes(user?.role);
}

/**
 * Verifica se o usuário pode aceitar atendimentos da fila.
 */
export function canAcceptQueueSession(user) {
  return user?.role === ROLES.PROFESSIONAL;
}

/**
 * Verifica se o usuário pode gerenciar outros usuários e papéis.
 */
export function canManageUsers(user) {
  return user?.role === ROLES.ADMIN;
}
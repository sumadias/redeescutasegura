/**
 * Feature Flags — Rede Escuta Segura
 * Flags de funcionalidades temporariamente ocultas.
 * Não apagar o código das páginas — apenas ocultar entradas e bloquear rotas.
 * Para reativar um módulo, altere o valor para true.
 */
export const FLAGS = {
  ENABLE_TRILHA_RECOMECO: true,   // Trilha aprovada, manter visível
  ENABLE_MINHA_JORNADA: false,
  ENABLE_AGENDAMENTO: false,
};

// Retrocompatibilidade com importações antigas
export const FEATURE_FLAGS = FLAGS;
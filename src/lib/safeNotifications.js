/**
 * Templates discretos para notificações — nunca revelam a finalidade da plataforma,
 * o nome da aplicação ou qualquer dado sensível em assuntos de e-mail/push.
 *
 * USO: import { sendDiscreteEmail } from "@/lib/safeNotifications";
 *      await sendDiscreteEmail("appointment_confirmed", "destinatario@email.com");
 */

import { base44 } from "@/api/base44Client";

/**
 * Envia e-mail discreto usando os templates seguros.
 * @param {"appointmentConfirmed"|"appointmentReminder"|"newChatMessage"} templateKey
 * @param {string} toEmail - e-mail do destinatário
 * @returns {Promise<void>}
 */
export async function sendDiscreteEmail(templateKey, toEmail) {
  if (!toEmail) return;
  const tpl = DISCRETE_TEMPLATES[templateKey];
  if (!tpl) return;
  await base44.integrations.Core.SendEmail({
    to: toEmail,
    subject: tpl.subject,
    body: tpl.body,
    from_name: tpl.senderName,
  });
}

export const DISCRETE_TEMPLATES = {
  appointmentConfirmed: {
    subject: "Confirmação",
    senderName: "Notificações",
    body: `Seu horário foi confirmado.\n\nAcesse sua área segura para ver os detalhes.\n\nEsta é uma mensagem automática.`,
  },
  appointmentReminder: {
    subject: "Lembrete",
    senderName: "Notificações",
    body: `Você tem um horário agendado.\n\nAcesse sua área segura para ver os detalhes.\n\nEsta é uma mensagem automática.`,
  },
  newChatMessage: {
    subject: "Nova mensagem",
    senderName: "Notificações",
    body: `Você recebeu uma mensagem.\n\nAcesse sua área segura para visualizar.`,
    pushTitle: "Nova mensagem",
    pushBody: "Você recebeu uma mensagem",
  },
};

/** @deprecated use DISCRETE_TEMPLATES */
export const safeNotificationCopy = {
  appointmentConfirmed: {
    subject: "Seu horário foi confirmado",
    body: "Você tem um horário agendado. Acesse sua área para ver os detalhes.",
  },
  appointmentReminder: {
    subject: "Lembrete de horário",
    body: "Você tem um compromisso agendado para hoje. Acesse sua área para detalhes.",
  },
  newMessage: {
    subject: "Nova mensagem",
    body: "Você recebeu uma nova mensagem em sua área segura.",
  },
  sessionStarted: {
    subject: "Atendimento iniciado",
    body: "Seu atendimento foi iniciado. Acesse o app para continuar.",
  },
  sessionEnded: {
    subject: "Atendimento concluído",
    body: "Seu atendimento foi concluído. Acesse sua área para ver o histórico.",
  },
  queueUpdate: {
    subject: "Atualização de horário",
    body: "Sua posição foi atualizada. Acesse o app para acompanhar.",
  },
  generalUpdate: {
    subject: "Nova atualização",
    body: "Há uma novidade disponível para você. Acesse sua área.",
  },
};
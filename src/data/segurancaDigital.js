/* #1 Segurança digital guiada.
 *
 * Checklist por aparelho. Cada passo LEVA ao canal oficial da empresa — este
 * site nunca pede senha e nunca executa a mudança por você. É orientação, não
 * ferramenta de acesso às suas contas.
 *
 * Conteúdo educativo, a ser mantido por equipe de segurança digital. As telas
 * das empresas mudam com o tempo; os links apontam para as páginas oficiais.
 */

const COMUM = [
  {
    titulo: "Veja os aparelhos conectados ao seu WhatsApp",
    texto:
      "No WhatsApp, abra Configurações → Aparelhos conectados. Se houver um aparelho que você não reconhece, desconecte. Faça isso só quando for seguro — a outra pessoa pode perceber que a sessão dela caiu.",
    link: "https://faq.whatsapp.com/1317564962315842",
    linkRotulo: "Como ver aparelhos conectados",
  },
  {
    titulo: "Ative a verificação em duas etapas",
    texto:
      "Com a verificação em duas etapas, ninguém entra na sua conta só com a senha. Ative no WhatsApp, no e-mail e nas redes sociais que você usa.",
    link: "https://faq.whatsapp.com/1920866721452534",
    linkRotulo: "Verificação em duas etapas no WhatsApp",
  },
];

const ANDROID = [
  {
    titulo: "Confira o compartilhamento de localização",
    texto:
      "No Google Maps, toque na sua foto → Compartilhamento de localização. Veja se você está compartilhando sua localização com alguém sem querer.",
    link: "https://support.google.com/maps/answer/7326816",
    linkRotulo: "Compartilhamento de localização no Maps",
  },
  {
    titulo: "Revise os aparelhos conectados à conta Google",
    texto:
      "A Verificação de Segurança do Google mostra em quais aparelhos sua conta está aberta e o que está compartilhado. Encerre o que você não reconhece.",
    link: "https://myaccount.google.com/security-checkup",
    linkRotulo: "Verificação de Segurança do Google",
  },
];

const IPHONE = [
  {
    titulo: "Verifique o app Buscar (Find My)",
    texto:
      "Em Ajustes → seu nome → Buscar, veja se “Compartilhar Minha Localização” está ligado e com quem. Você pode parar de compartilhar a qualquer momento.",
    link: "https://support.apple.com/pt-br/HT210514",
    linkRotulo: "Compartilhamento de localização no iPhone",
  },
  {
    titulo: "Revise os dispositivos do seu ID Apple",
    texto:
      "Em Ajustes → seu nome, role até a lista de dispositivos. Remova aparelhos que você não reconhece.",
    link: "https://support.apple.com/pt-br/HT205064",
    linkRotulo: "Dispositivos do ID Apple",
  },
];

const COMPUTADOR = [
  {
    titulo: "Encerre sessões abertas nas suas contas",
    texto:
      "No e-mail e nas redes sociais existe uma opção para “sair de todos os aparelhos” ou ver sessões abertas. Use para fechar acessos que não são seus.",
    link: "https://myaccount.google.com/device-activity",
    linkRotulo: "Aparelhos com sua conta Google",
  },
  {
    titulo: "Verifique extensões e programas desconhecidos",
    texto:
      "No navegador, confira as extensões instaladas e remova as que você não reconhece — algumas podem monitorar o que você faz.",
    link: "https://support.google.com/chrome/answer/2765944",
    linkRotulo: "Gerenciar extensões do navegador",
  },
];

export const APARELHOS = [
  { id: "android", rotulo: "Celular Android", passos: [...COMUM, ...ANDROID] },
  { id: "iphone", rotulo: "iPhone", passos: [...COMUM, ...IPHONE] },
  { id: "computador", rotulo: "Computador", passos: [...COMUM, ...COMPUTADOR] },
];

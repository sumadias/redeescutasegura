/* Conteúdo dos recursos de Orientação.
 *
 * Escrito a partir de fontes públicas oficiais (Lei Maria da Penha nº 11.340/2006,
 * material da Casa da Mulher Brasileira, orientações do gov.br e do Ligue 180).
 * É conteúdo EDUCATIVO — não substitui atendimento jurídico, psicológico,
 * policial, de saúde ou de assistência social, e está sujeito a revisão
 * profissional antes de ser tratado como definitivo.
 *
 * Regras seguidas: nada é apresentado como obrigatório ou linear; não se afirma
 * que boletim de ocorrência é exigido em todo atendimento; a falta de um
 * documento nunca é apresentada como impedimento automático.
 */

/* -------- #10 Rota de atendimento (não-linear) -------- */
export const ROTA = [
  {
    id: "acolhimento",
    titulo: "Acolhimento e orientação",
    onde: "CRAM, CRAS ou Ligue 180",
    texto:
      "Você pode começar por aqui mesmo sem ter documentos ou decisão tomada. O acolhimento escuta, informa seus direitos e ajuda a pensar os próximos passos, no seu tempo.",
  },
  {
    id: "saude",
    titulo: "Atendimento de saúde",
    onde: "UPA, hospital ou posto",
    texto:
      "Se houve lesão, violência sexual ou você precisa de cuidado, a rede de saúde atende — inclusive de forma sigilosa. Não é preciso ter registrado ocorrência para ser atendida.",
  },
  {
    id: "registro",
    titulo: "Registro na delegacia",
    onde: "DEAM ou delegacia comum",
    texto:
      "Registrar um boletim de ocorrência é um direito, não uma obrigação em todo atendimento. Na delegacia você também pode pedir medida protetiva na hora.",
  },
  {
    id: "protetiva",
    titulo: "Medida protetiva de urgência",
    onde: "Delegacia, Defensoria ou Justiça",
    texto:
      "É uma ordem da Justiça para o agressor se afastar. É gratuita, não exige advogado, e o juiz tem até 48 horas para decidir. Descumprir a medida é crime — ligue 190.",
  },
  {
    id: "juridico",
    titulo: "Apoio jurídico e assistência social",
    onde: "Defensoria Pública, CREAS",
    texto:
      "A Defensoria acompanha você sem custo em medida protetiva, divórcio, guarda e pensão. A assistência social ajuda com benefícios e acompanhamento continuado.",
  },
  {
    id: "acolhimento-protegido",
    titulo: "Acolhimento protegido",
    onde: "Casa abrigo, via encaminhamento",
    texto:
      "Em situação de risco, existe acolhimento em local sigiloso. O acesso acontece por encaminhamento do CRAM, da DEAM ou da Justiça — o endereço nunca é público, por segurança.",
  },
];

/* -------- #8 Estou ajudando alguém -------- */
export const AJUDANDO = [
  {
    titulo: "Reconhecer os sinais",
    texto:
      "Isolamento de família e amigos, medo de contrariar o parceiro, controle de celular e dinheiro, marcas ou explicações que não fecham, mudança brusca de humor. Um sinal sozinho não confirma nada — o conjunto merece atenção.",
  },
  {
    titulo: "Como começar a conversa",
    texto:
      "Escolha um momento seguro e privado. Ouça mais do que fale. Frases que acolhem: “Eu acredito em você”, “Isso não é culpa sua”, “Você não precisa decidir tudo agora”, “Como posso ajudar de um jeito seguro?”.",
  },
  {
    titulo: "O que evitar dizer",
    texto:
      "Evite “Por que você não vai embora?”, “Eu no seu lugar já teria saído” ou pressionar por uma decisão. Julgar afasta. A pessoa conhece os próprios riscos melhor do que ninguém.",
  },
  {
    titulo: "Avaliar perigo imediato",
    texto:
      "Se há risco agora — ameaça, arma, agressão em curso — a prioridade é segurança: ligue 190. Não confronte o agressor nem proponha que a pessoa o confronte.",
  },
  {
    titulo: "Apoiar com consentimento",
    texto:
      "Ajude a pessoa a montar o próprio plano, respeitando o tempo dela. Ofereça guardar cópias de documentos, ser um contato seguro, ou acompanhar até um serviço — sempre com a concordância dela.",
  },
  {
    titulo: "Cuidar de você também",
    texto:
      "Apoiar alguém em violência cansa e assusta. Você não precisa resolver tudo sozinho. O Ligue 180 orienta também quem ajuda, e serviços de assistência social podem apoiar a rede da pessoa.",
  },
];

/* -------- #11 Lista de documentos por serviço -------- */
/* obrig = "costuma ser pedido" | rec = "ajuda a agilizar" | opc = "se tiver" */
export const DOCUMENTOS = [
  {
    id: "delegacia",
    servico: "Delegacia / DEAM",
    intro: "Para registrar ocorrência ou pedir medida protetiva.",
    itens: [
      { doc: "Documento com foto (RG, CNH) ou qualquer identificação", nivel: "rec" },
      { doc: "CPF", nivel: "rec" },
      { doc: "Comprovante de residência", nivel: "opc" },
      { doc: "Provas que você tiver (mensagens, fotos, nomes de testemunhas)", nivel: "opc" },
    ],
  },
  {
    id: "defensoria",
    servico: "Defensoria Pública",
    intro: "Para apoio jurídico gratuito (medida protetiva, divórcio, guarda, pensão).",
    itens: [
      { doc: "Documento com foto e CPF", nivel: "rec" },
      { doc: "Comprovante de residência", nivel: "rec" },
      { doc: "Certidão de casamento ou união, se houver", nivel: "opc" },
      { doc: "Certidão de nascimento dos filhos, se houver", nivel: "opc" },
    ],
  },
  {
    id: "saude",
    servico: "Saúde (UPA, hospital, posto)",
    intro: "Para cuidado após violência física ou sexual.",
    itens: [
      { doc: "Cartão SUS, se tiver", nivel: "opc" },
      { doc: "Documento com foto, se tiver", nivel: "opc" },
    ],
  },
  {
    id: "assistencia",
    servico: "Assistência social (CRAS / CREAS)",
    intro: "Para acompanhamento, benefícios e encaminhamentos.",
    itens: [
      { doc: "Documento com foto e CPF", nivel: "rec" },
      { doc: "Comprovante de residência", nivel: "rec" },
      { doc: "Cartão do Bolsa Família / CadÚnico, se tiver", nivel: "opc" },
      { doc: "Documentos dos filhos, se houver", nivel: "opc" },
    ],
  },
];

export const NIVEL_ROTULO = {
  rec: { texto: "Ajuda a agilizar", cor: "#B06A00", fundo: "#FBEFD8" },
  opc: { texto: "Se você tiver", cor: "#5E5878", fundo: "#ECEAF2" },
};

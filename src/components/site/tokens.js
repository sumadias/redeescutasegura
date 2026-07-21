/* Tokens visuais do site institucional (roxo), extraídos do layout aprovado.
   A /emergencia mantém a paleta própria dela — não foi alterada. */

export const T = {
  roxo: "#6D3FD4",
  roxoEscuro: "#5327B0",
  roxoProfundo: "#4A1F9E",
  roxoSuave: "#EDE7FD",
  roxoTinta: "#3B1980",

  rosa: "#E8235C",
  rosaSuave: "#FCE7F3",
  rosaTinta: "#BE1249",

  verde: "#0D9488",
  verdeSuave: "#CCFBF1",
  ambar: "#EA580C",
  ambarSuave: "#FFEDD5",

  pagina: "#F8F7FC",
  cartao: "#FFFFFF",
  borda: "#E7E3F5",
  tinta: "#1F1B33",
  texto: "#4B4667",
  apagado: "#7C7898",
};

/* Navegação do site. "Como Ajudar" e "Contato" ficaram de fora a pedido. */
export const NAV = [
  { rotulo: "Sobre a Rede", href: "/sobre" },
  { rotulo: "Nossos Projetos", href: "/projetos" },
  { rotulo: "Emergência", href: "/emergencia" },
  { rotulo: "Notícias", href: "/noticias" },
  { rotulo: "Meu Espaço", href: "/app/meu-espaco" },
  { rotulo: "Jogos Educativos", href: "/jogos" },
];

/* Telefones públicos, os mesmos verificados que alimentam a /emergencia */
export const TELEFONES = [
  { numero: "180", nome: "Disque 180", sub: "Central de Atendimento à Mulher" },
  { numero: "190", nome: "190", sub: "Polícia Militar — Emergência" },
  { numero: "192", nome: "SAMU 192", sub: "Atendimento Móvel de Urgência" },
  { numero: "193", nome: "193", sub: "Corpo de Bombeiros Militar" },
  { numero: "100", nome: "Disque 100", sub: "Direitos Humanos (Anônimo)" },
];

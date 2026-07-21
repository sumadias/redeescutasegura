/* Projetos exibidos em /projetos.
 *
 * ATENÇÃO — os quatro primeiros foram transcritos do layout aprovado, não de
 * uma fonte da própria equipe. Antes de tratar isto como texto definitivo,
 * confirmar nome, descrição e situação de cada um. Alterar aqui basta: a
 * página se monta a partir desta lista.
 *
 * situacao: "andamento" | "concluido" | "parceria"
 */

export const PROJETOS = [
  {
    id: "escuta-que-acolhe",
    titulo: "Escuta que Acolhe",
    etiqueta: "Acolhimento",
    cor: "rosa",
    situacao: "andamento",
    resumo:
      "Acolhimento psicológico online e encaminhamento para serviços especializados da rede.",
  },
  {
    id: "informar-e-proteger",
    titulo: "Informar é Proteger",
    etiqueta: "Educação",
    cor: "roxo",
    situacao: "andamento",
    resumo:
      "Campanhas e conteúdos educativos sobre direitos e prevenção à violência, em linguagem simples.",
  },
  {
    id: "mulher-forte-mulher-livre",
    titulo: "Mulher Forte, Mulher Livre",
    etiqueta: "Empoderamento",
    cor: "rosa",
    situacao: "andamento",
    resumo:
      "Oficinas e grupos de apoio para fortalecimento da autoestima e da autonomia.",
  },
  {
    id: "rede-que-protege",
    titulo: "Rede que Protege",
    etiqueta: "Articulação",
    cor: "verde",
    situacao: "parceria",
    resumo:
      "Articulação com serviços públicos e organizações para ampliar a rede de proteção no estado.",
  },
  /* Este é real e já está no ar — serve de referência de como descrever os demais. */
  {
    id: "diretorio-223-municipios",
    titulo: "Diretório da rede nos 223 municípios",
    etiqueta: "Dados abertos",
    cor: "roxo",
    situacao: "andamento",
    resumo:
      "Levantamento e publicação da rede de atendimento de toda a Paraíba, a partir do CNES/Ministério da Saúde, do IBGE e do Observatório da Mulher contra a Violência do Senado Federal.",
    link: "/emergencia",
    linkRotulo: "Ver o diretório",
  },
  {
    id: "assistente-da-rede",
    titulo: "Assistente da Rede",
    etiqueta: "Tecnologia",
    cor: "verde",
    situacao: "andamento",
    resumo:
      "Assistente automático público, sem login e sem gravar conversa, que responde onde buscar ajuda na sua cidade usando apenas dados verificados.",
    link: "/assistente",
    linkRotulo: "Conversar",
  },
];

export const SITUACOES = [
  { id: "andamento", rotulo: "Em andamento" },
  { id: "concluido", rotulo: "Concluídos" },
  { id: "parceria", rotulo: "Parcerias" },
];

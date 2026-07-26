/* #3 Plano para filhos e dependentes.
 *
 * Checklists locais. Nada é gravado e NENHUM nome é pedido — a pessoa escolhe
 * apenas quem precisa incluir, e vê os itens que fazem sentido. Dados de
 * crianças e adolescentes seguem o princípio do melhor interesse: por isso não
 * coletamos identificação.
 *
 * Conteúdo educativo, a ser revisado por assistência social, psicologia,
 * educação e proteção animal.
 */
export const PERFIS = [
  { id: "filhos", rotulo: "Filhos" },
  { id: "idoso", rotulo: "Pessoa idosa" },
  { id: "deficiencia", rotulo: "Pessoa com deficiência" },
  { id: "animal", rotulo: "Animal de estimação" },
];

/* item.perfis ausente = vale para todos; presente = só se algum perfil casar */
export const CHECKLIST = [
  {
    categoria: "Documentos",
    itens: [
      { texto: "Seus documentos (RG, CPF)" },
      { texto: "Certidão de nascimento dos filhos", perfis: ["filhos"] },
      { texto: "Documentos da pessoa idosa", perfis: ["idoso"] },
      { texto: "Laudo ou relatório médico da pessoa com deficiência", perfis: ["deficiencia"] },
      { texto: "Carteira de vacinação do animal", perfis: ["animal"] },
    ],
  },
  {
    categoria: "Saúde e medicamentos",
    itens: [
      { texto: "Remédios de uso contínuo e as receitas" },
      { texto: "Equipamentos essenciais (óculos, aparelho auditivo, cadeira)", perfis: ["deficiencia", "idoso"] },
      { texto: "Ração e itens de saúde do animal", perfis: ["animal"] },
    ],
  },
  {
    categoria: "Rotina e escola",
    itens: [
      { texto: "Contato e endereço da escola ou creche", perfis: ["filhos"] },
      { texto: "Comprovante de matrícula", perfis: ["filhos"] },
    ],
  },
  {
    categoria: "Contatos seguros",
    itens: [
      { texto: "Telefone de uma pessoa de confiança" },
      { texto: "Telefones de emergência anotados (180 e 190)" },
    ],
  },
  {
    categoria: "Itens essenciais",
    itens: [
      { texto: "Roupas e higiene para alguns dias" },
      { texto: "Itens da criança (fralda, mamadeira, um brinquedo de apego)", perfis: ["filhos"] },
      { texto: "Coleira ou caixa de transporte do animal", perfis: ["animal"] },
    ],
  },
  {
    categoria: "Saída com segurança",
    itens: [
      { texto: "Uma bolsa discreta com o essencial, se for seguro guardar" },
      { texto: "Cópia de chaves e algum dinheiro" },
      { texto: "Um local seguro combinado para onde ir" },
    ],
  },
];

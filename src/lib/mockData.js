/**
 * ATENÇÃO: Dados mockados para desenvolvimento/prototipagem.
 * NUNCA usar em produção ou staging com dados reais.
 * IDs fixos (u1, p1, etc.) devem ser substituídos por dados reais das entidades Base44.
 */
// eslint-disable-next-line no-console
if (typeof window !== "undefined" && import.meta.env.PROD) {
  console.warn("[mockData] ATENÇÃO: dados mockados carregados em produção. Substitua por dados reais.");
}

// Mock data — development only

export const mockUsuarias = [
  { id: "u1", anonymous_id: "DEMO-0001", risk_level: "amarelo", status: "encaminhada", journey_stage: 3, courses_completed: 1 },
  { id: "u2", anonymous_id: "DEMO-0002", risk_level: "vermelho", status: "em_atendimento", journey_stage: 1, courses_completed: 0 },
  { id: "u3", anonymous_id: "DEMO-0003", risk_level: "verde", status: "autonoma", journey_stage: 5, courses_completed: 3 },
];

/** @deprecated — dados agora na entidade Servico (importados em 2026-07-02). Use base44.entities.Servico.list() */
export const mockServicos = [];

/** @deprecated — dados agora na entidade Profissional (importados em 2026-07-02). Use base44.entities.Profissional.list() */
export const mockProfissionais = [];

export const mockCursos = [
  { id: "c1", title: "Empreendedorismo para Mulheres", description: "Aprenda a criar e gerenciar seu próprio negócio", duration_hours: 40, modules_total: 8, category: "Negócios", progress: 75 },
  { id: "c2", title: "Informática Básica", description: "Domine as ferramentas essenciais do computador", duration_hours: 30, modules_total: 6, category: "Tecnologia", progress: 100 },
  { id: "c3", title: "Costura Criativa", description: "Técnicas de costura para gerar renda", duration_hours: 20, modules_total: 5, category: "Artesanato", progress: 40 },
  { id: "c4", title: "Artesanato Digital", description: "Crie e venda produtos artesanais pela internet", duration_hours: 25, modules_total: 5, category: "Digital", progress: 0 },
];

export const mockEncaminhamentos = [
  { id: "e1", anonymous_id: "DEMO-0001", service_name: "CRAM Esperança Viva", service_type: "cram", status: "em_atendimento", risk_level: "amarelo", date: "2024-11-15", notes: "Pessoa encaminhada para acompanhamento psicossocial" },
  { id: "e2", anonymous_id: "DEMO-0002", service_name: "Delegacia Especializada da Mulher", service_type: "delegacia", status: "pendente", risk_level: "vermelho", date: "2024-11-18", notes: "Risco imediato - encaminhamento prioritário" },
  { id: "e3", anonymous_id: "DEMO-0002", service_name: "Casa de Acolhimento Renascer", service_type: "casa_acolhimento", status: "pendente", risk_level: "vermelho", date: "2024-11-18", notes: "Necessita acolhimento institucional urgente" },
  { id: "e4", anonymous_id: "DEMO-0003", service_name: "UFCG - Núcleo de Extensão em Gênero", service_type: "universidade", status: "concluido", risk_level: "verde", date: "2024-10-01", notes: "Participou de oficina de capacitação" },
  { id: "e5", anonymous_id: "DEMO-0001", service_name: "Defensoria Pública Estadual", service_type: "defensoria", status: "concluido", risk_level: "amarelo", date: "2024-10-20", notes: "Orientação jurídica realizada" },
];

export const mockTriagens = [
  { id: "t1", anonymous_id: "DEMO-0001", risk_level: "amarelo", date: "2024-11-15", answers: [
    { question: "Como você está hoje?", answer: "Não estou bem" },
    { question: "O que aconteceu?", answer: "Discussão forte em casa" },
    { question: "Você está em segurança agora?", answer: "Sim, estou na casa de uma amiga" }
  ]},
  { id: "t2", anonymous_id: "DEMO-0002", risk_level: "vermelho", date: "2024-11-18", answers: [
    { question: "Como você está hoje?", answer: "Com muito medo" },
    { question: "O que aconteceu?", answer: "Fui agredida" },
    { question: "Você está em segurança agora?", answer: "Não sei" }
  ]},
  { id: "t3", anonymous_id: "DEMO-0003", risk_level: "verde", date: "2024-10-01", answers: [
    { question: "Como você está hoje?", answer: "Melhor, seguindo em frente" },
    { question: "O que aconteceu?", answer: "Já saí da situação" },
    { question: "Você está em segurança agora?", answer: "Sim" }
  ]},
];

export const mockIndicadores = {
  total_atendidas: 67,
  encaminhamentos_total: 43,
  encaminhamentos_pendentes: 8,
  encaminhamentos_concluidos: 31,
  certificadas: 12,
  tempo_medio: "2h",
  risco_verde: 28,
  risco_amarelo: 24,
  risco_vermelho: 15,
  cursos_andamento: 19,
};

export const mockJornada = [
  { date: "2024-10-01", event: "Primeiro acesso ao app", type: "acesso" },
  { date: "2024-10-01", event: "Triagem realizada - Risco Amarelo", type: "triagem" },
  { date: "2024-10-05", event: "Encaminhamento para CRAM Esperança Viva", type: "encaminhamento" },
  { date: "2024-10-10", event: "Atendimento psicológico iniciado", type: "atendimento" },
  { date: "2024-10-20", event: "Orientação jurídica na Defensoria", type: "encaminhamento" },
  { date: "2024-11-01", event: "Curso: Informática Básica - Concluído ✓", type: "curso" },
  { date: "2024-11-10", event: "Curso: Empreendedorismo - Módulo 6/8", type: "curso" },
  { date: "2024-11-15", event: "Nova triagem - Risco Amarelo", type: "triagem" },
];

export const monthlyData = [
  { month: "Jun", atendimentos: 32, encaminhamentos: 18 },
  { month: "Jul", atendimentos: 38, encaminhamentos: 22 },
  { month: "Ago", atendimentos: 45, encaminhamentos: 28 },
  { month: "Set", atendimentos: 52, encaminhamentos: 33 },
  { month: "Out", atendimentos: 58, encaminhamentos: 38 },
  { month: "Nov", atendimentos: 67, encaminhamentos: 43 },
];

export const serviceAccessData = [
  { name: "CRAM", value: 18 },
  { name: "Delegacia", value: 12 },
  { name: "CREAS", value: 8 },
  { name: "Defensoria", value: 6 },
  { name: "Casa Acolhimento", value: 4 },
  { name: "ONG", value: 3 },
  { name: "UPA", value: 2 },
];

export const heatmapData = [
  { bairro: "Centro", casos: 12 },
  { bairro: "Bodocongó", casos: 9 },
  { bairro: "Liberdade", casos: 7 },
  { bairro: "Prata", casos: 6 },
  { bairro: "Alto Branco", casos: 5 },
  { bairro: "Universitário", casos: 4 },
  { bairro: "José Pinheiro", casos: 8 },
  { bairro: "Palmeira", casos: 3 },
  { bairro: "Malvinas", casos: 6 },
  { bairro: "Catolé", casos: 4 },
];

export const artEscutaSteps = [
  { id: 1, title: "Reconhecer", description: "Reconheça o que você está sentindo. Não há sentimentos errados.", exercise: "Escreva 3 palavras que descrevem como você se sente agora.", icon: "Heart" },
  { id: 2, title: "Expressar", description: "Coloque para fora o que está guardado. Sua voz importa.", exercise: "Desenhe ou descreva um lugar onde você se sente segura.", icon: "Pen" },
  { id: 3, title: "Libertar", description: "Solte o peso que não é seu para carregar.", exercise: "Escreva uma carta para você mesma no futuro.", icon: "Wind" },
  { id: 4, title: "Ressignificar", description: "Transforme a dor em força e aprendizado.", exercise: "Liste 3 qualidades suas que ninguém pode tirar.", icon: "Flower2" },
  { id: 5, title: "Florescer", description: "Você é capaz de recomeçar. Uma nova história começa agora.", exercise: "Descreva o primeiro dia da sua nova vida.", icon: "Sun" },
];

export const faqData = [
  { question: "O que é a Lei Maria da Penha?", answer: "É uma lei brasileira (Lei nº 11.340/2006) que cria mecanismos para prevenir e coibir a violência doméstica e familiar contra a mulher. Ela garante proteção e direitos para mulheres em situação de violência." },
  { question: "Posso denunciar sem sair de casa?", answer: "Sim! Você pode ligar para o Ligue 180 (24 horas, gratuito e sigiloso), registrar boletim de ocorrência online em alguns estados, ou usar este aplicativo para ser encaminhada de forma segura." },
  { question: "Quais são meus direitos?", answer: "Você tem direito a: medida protetiva de urgência, atendimento policial especializado, assistência jurídica gratuita, acolhimento institucional, atendimento psicossocial, e afastamento do agressor do lar." },
  { question: "A denúncia é sigilosa?", answer: "Sim. Seu relato é protegido por sigilo e seus dados pessoais não são compartilhados sem sua autorização. No nosso app, usamos apenas IDs anônimos." },
  { question: "O que acontece após a denúncia?", answer: "Após a denúncia, você pode solicitar medidas protetivas ao juiz, que deve decidir em até 48 horas. A rede de proteção também é acionada para oferecer apoio completo." },
];
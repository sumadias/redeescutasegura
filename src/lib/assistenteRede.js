/* Motor de respostas do assistente da Rede Escuta Segura.
 *
 * DECISÃO DE PROJETO: isto é determinístico, não é um modelo de linguagem.
 * O assistente só devolve dado que existe nos arquivos verificados — ele não
 * consegue inventar um telefone nem "lembrar" um endereço. Num serviço de
 * emergência, um número alucinado é pior que nenhuma resposta: a pessoa liga,
 * ninguém atende, e ela perde tempo que pode não ter.
 *
 * Quando não sabemos, dizemos que não sabemos e mandamos para o 180.
 */

import { MUNICIPIOS, SERVICOS_ESTADUAIS } from "@/data/redePB";
import { SERVICOS_LOCAIS } from "@/data/redeSaudePB";
import { SERVICOS_ESPECIALIZADOS } from "@/data/redeEspecializadaPB";

export const TEXTO_SIGILO =
  "O endereço é sigiloso, por segurança. O acesso acontece por encaminhamento do CRAM, da DEAM ou da Justiça — ligue no número acima que elas fazem o encaminhamento.";

export function semAcento(t) {
  return String(t || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/* ---------- detecção de cidade ---------- */
/* Casa o maior nome possível, para "Santa Rita" não virar "Santa Cruz" e
   para "São José de Piranhas" não ser confundido com "São José". */
export function detectarCidade(texto) {
  const t = semAcento(texto);
  if (!t) return null;
  let achado = null;
  for (const m of MUNICIPIOS) {
    const n = semAcento(m.nome);
    if (n.length > 3 && t.includes(n)) {
      if (!achado || n.length > semAcento(achado.nome).length) achado = m;
    }
  }
  return achado;
}

/* ---------- detecção de intenção ---------- */
const INTENCOES = [
  { id: "perigo",     re: /\b(socorro|agora|urgente|urgencia|emergencia|correndo perigo|ele esta aqui|vai me matar|me bater|batendo|arma|faca)\b/ },
  { id: "delegacia",  re: /\b(delegacia|deam|policia|boletim|b\.?o\.?|ocorrencia|denuncia(r)?|queixa|registrar)\b/ },
  { id: "abrigo",     re: /\b(abrigo|acolhimento|casa abrigo|sair de casa|nao tenho onde|onde ficar|lugar seguro|me esconder)\b/ },
  { id: "cram",       re: /\b(cram|centro de referencia|psicolog|apoio emocional|acompanhamento|conversar)\b/ },
  { id: "juridico",   re: /\b(defensoria|advogad|medida protetiva|protetiva|divorcio|pensao|guarda|justica|juridic|processo)\b/ },
  { id: "creas",      re: /\b(creas|cras|assistencia social|beneficio|auxilio|bolsa)\b/ },
  { id: "saude",      re: /\b(saude|hospital|upa|posto|medic|ferida|machucad|exame|gravid|aborto legal|caps|remedio)\b/ },
  { id: "mp",         re: /\b(ministerio publico|promotoria|promotor)\b/ },
  { id: "anonimo",    re: /\b(anonim|sem me identificar|nao quero dar meu nome|sigilo|denuncia anonima)\b/ },
  { id: "listar",     re: /\b(quais|todos|tudo|lista|servicos|onde tem|o que tem|ajuda em)\b/ },
];

const CATS = {
  delegacia: ["Delegacia / DEAM", "Patrulha Maria da Penha"],
  abrigo: ["Abrigo"],
  cram: ["CRAM"],
  juridico: ["Defensoria"],
  creas: ["CREAS"],
  mp: ["Ministério Público"],
  saude: ["UPA / Saúde", "Hospital", "CAPS", "Saúde"],
};

export function detectarIntencao(texto) {
  const t = semAcento(texto);
  for (const i of INTENCOES) if (i.re.test(t)) return i.id;
  return null;
}

/* ---------- montagem da resposta ---------- */

/* cadastrados = registros vindos do Base44 já normalizados pelo componente */
export function servicosDaCidade(ibge, cadastrados = []) {
  return [
    ...(SERVICOS_ESPECIALIZADOS[ibge] || []),
    ...(SERVICOS_LOCAIS[ibge] || []),
    ...cadastrados.filter((s) => s.cidadeIbge === ibge),
  ];
}

const ESTADUAL = (tel) => SERVICOS_ESTADUAIS.find((s) => String(s.telefone) === tel);

function cartaoEstadual(tel, titulo, descricao) {
  const s = ESTADUAL(tel);
  return {
    servico: titulo,
    categoria: "Atendimento estadual",
    telefone: tel,
    horario: s?.horario || "24h, todos os dias",
    endereco: "",
    descricao,
    sigiloso: false,
    estadual: true,
  };
}

const D_180 = () =>
  cartaoEstadual("180", "Central de Atendimento à Mulher", "Gratuito, 24h, funciona de qualquer telefone. Orienta, acolhe e diz para onde ir na sua região.");
const D_190 = () =>
  cartaoEstadual("190", "Polícia Militar", "Para perigo imediato. Peça socorro e informe seu endereço.");

/* Resposta principal. Devolve { texto, cartoes, sugestoes } */
export function responder(pergunta, contexto = {}) {
  const { cidadeAtual = null, cadastrados = [] } = contexto;
  const cidadeDita = detectarCidade(pergunta);
  const cidade = cidadeDita || cidadeAtual;
  const intencao = detectarIntencao(pergunta);

  /* 1. perigo imediato vem antes de qualquer outra coisa */
  if (intencao === "perigo") {
    return {
      texto:
        "Se você está em perigo agora, ligue **190**. É a polícia, atende na hora e vai até onde você estiver.\n\nSe conseguir, saia para um lugar com outras pessoas — casa de vizinho, comércio, rua movimentada. Você não precisa explicar nada para ligar.",
      cartoes: [D_190(), D_180()],
      sugestoes: cidade ? ["Onde fica a delegacia da mulher?", "Preciso de um lugar seguro"] : ["Qual a sua cidade?"],
      urgente: true,
    };
  }

  /* 2. sem cidade não dá para responder rede local */
  if (!cidade) {
    return {
      texto:
        "Me diga a sua cidade que eu procuro os serviços mais perto de você. Pode escrever só o nome — por exemplo: *Campina Grande*, *João Pessoa*, *Patos*.\n\nSe preferir não dizer, o **180** atende todo o estado e faz o encaminhamento.",
      cartoes: [D_180()],
      sugestoes: ["Campina Grande", "João Pessoa", "Patos", "O que é medida protetiva?"],
    };
  }

  const todos = servicosDaCidade(cidade.ibge, cadastrados);

  /* 3. denúncia anônima */
  if (intencao === "anonimo") {
    return {
      texto:
        "Você pode denunciar sem se identificar. O **180** e o **100** aceitam denúncia anônima — ninguém precisa saber que foi você.\n\nA denúncia anônima serve para acionar a rede. Se depois você quiser medida protetiva, aí sim vai precisar registrar ocorrência, e a Defensoria te acompanha nisso de graça.",
      cartoes: [D_180(), cartaoEstadual("100", "Disque Direitos Humanos", "Aceita denúncia anônima, 24h.")],
      sugestoes: [`Defensoria em ${cidade.nome}`, "O que é medida protetiva?"],
    };
  }

  /* 4. busca por categoria */
  const cats = CATS[intencao];
  if (cats) {
    const achados = todos.filter((s) => cats.includes(s.categoria));

    if (achados.length) {
      const rotulo = {
        delegacia: "delegacia especializada",
        abrigo: "acolhimento",
        cram: "centro de referência",
        juridico: "atendimento jurídico gratuito",
        creas: "assistência social",
        mp: "Ministério Público",
        saude: "serviço de saúde",
      }[intencao];

      const extra =
        intencao === "abrigo"
          ? `\n\n${TEXTO_SIGILO}`
          : intencao === "juridico"
          ? "\n\nA Defensoria é gratuita. Você não precisa de advogado particular nem de dinheiro para pedir medida protetiva."
          : "";

      return {
        texto: `Em **${cidade.nome}** encontrei ${achados.length === 1 ? "este" : `estes ${achados.length}`} ${rotulo}:${extra}`,
        cartoes: achados.slice(0, 6),
        cidade,
        sugestoes: sugestoesPara(cidade, todos, intencao),
      };
    }

    /* categoria pedida não existe na cidade */
    return {
      texto: `**${cidade.nome}** não tem ${
        intencao === "delegacia" ? "delegacia da mulher própria"
        : intencao === "abrigo" ? "casa de acolhimento própria"
        : intencao === "cram" ? "CRAM próprio"
        : "esse serviço"
      } no nosso levantamento — e isso é comum: nem toda cidade da Paraíba tem.\n\nVocê tem direito a ser atendida na **unidade de referência da sua região**. Ligue **180** que a central identifica qual é e te orienta sobre como chegar. O **CRAS** da sua cidade também faz esse encaminhamento.`,
      cartoes: [D_180()],
      cidade,
      sugestoes: sugestoesPara(cidade, todos, intencao),
    };
  }

  /* 5. lista geral da cidade */
  if (todos.length) {
    const especializados = todos.filter((s) =>
      ["Delegacia / DEAM", "CRAM", "Abrigo", "Defensoria", "CREAS", "Ministério Público", "Patrulha Maria da Penha"].includes(s.categoria)
    );
    const mostrar = especializados.length ? especializados : todos;
    return {
      texto: `Em **${cidade.nome}** temos ${todos.length} serviço${todos.length > 1 ? "s" : ""} no levantamento${
        especializados.length ? `, sendo ${especializados.length} especializado${especializados.length > 1 ? "s" : ""} em violência contra a mulher` : ""
      }. Os principais:`,
      cartoes: mostrar.slice(0, 6),
      cidade,
      sugestoes: sugestoesPara(cidade, todos, null),
    };
  }

  return {
    texto: `Ainda não tenho serviços cadastrados em **${cidade.nome}**. Não quer dizer que não exista — quer dizer que ainda não confirmamos em fonte oficial, e eu não publico o que não confirmei.\n\nLigue **180**: a central cobre todo o estado e te diz qual é a unidade de referência da sua região.`,
    cartoes: [D_180()],
    cidade,
    sugestoes: ["O que é medida protetiva?", "Quero denunciar sem me identificar"],
  };
}

function sugestoesPara(cidade, todos, jaVisto) {
  const tem = (c) => todos.some((s) => s.categoria === c);
  const opcoes = [];
  if (jaVisto !== "delegacia" && tem("Delegacia / DEAM")) opcoes.push(`Delegacia da mulher em ${cidade.nome}`);
  if (jaVisto !== "juridico" && tem("Defensoria")) opcoes.push(`Defensoria em ${cidade.nome}`);
  if (jaVisto !== "cram" && tem("CRAM")) opcoes.push(`CRAM em ${cidade.nome}`);
  if (jaVisto !== "abrigo") opcoes.push("Preciso de um lugar seguro");
  if (jaVisto !== "saude" && tem("UPA / Saúde")) opcoes.push(`Saúde em ${cidade.nome}`);
  opcoes.push("O que é medida protetiva?");
  return opcoes.slice(0, 4);
}

/* ---------- respostas informativas (sem depender de cidade) ---------- */
export const INFORMATIVOS = [
  {
    re: /\b(medida protetiva|protetiva)\b/,
    texto:
      "**Medida protetiva** é uma ordem da Justiça para o agressor se afastar de você — sair de casa, não chegar perto, não te procurar.\n\nComo conseguir:\n• Registre a ocorrência na delegacia (a DEAM, se a sua cidade tiver) e **peça a medida protetiva na hora**;\n• O juiz tem até **48 horas** para decidir;\n• É **gratuito** e você **não precisa de advogado**;\n• Se o agressor descumprir, ligue **190** — descumprir é crime.\n\nA Defensoria Pública acompanha você nisso sem cobrar nada.",
  },
  {
    re: /\b(lei maria da penha|meus direitos|que direito)\b/,
    texto:
      "A **Lei Maria da Penha** (Lei 11.340/2006) protege contra cinco tipos de violência: **física, psicológica, sexual, patrimonial e moral**.\n\nAlguns direitos seus:\n• Atendimento por policial mulher, quando você pedir;\n• Medida protetiva de urgência, sem custo e sem advogado;\n• Não ser obrigada a se encontrar com o agressor na delegacia ou na audiência;\n• Ser informada sobre a soltura ou prisão dele;\n• Manter o emprego se precisar se afastar por decisão judicial.",
  },
  {
    re: /\b(tipos de violencia|o que e violencia|isso e violencia)\b/,
    texto:
      "Violência não é só bater. A lei reconhece cinco formas:\n\n• **Física** — bater, empurrar, apertar, impedir de sair;\n• **Psicológica** — humilhar, ameaçar, controlar, isolar de família e amigos, fazer você duvidar da própria cabeça;\n• **Sexual** — forçar ato sexual, impedir contracepção, forçar gravidez ou aborto;\n• **Patrimonial** — destruir suas coisas, tomar seu dinheiro, seus documentos;\n• **Moral** — caluniar, difamar, expor sua intimidade.\n\nSe você se reconheceu em alguma, isso já é motivo suficiente para procurar ajuda.",
  },
  {
    re: /\b(quem (e )?voce|voce e (uma )?pessoa|robo|bot|humano)\b/,
    texto:
      "Sou um assistente automático da Rede Escuta Segura. Não sou uma pessoa e não guardo nada do que você escreve — esta conversa fica só no seu aparelho e some quando você fecha a página.\n\nEu só repasso informação que já foi conferida em fonte oficial. Se você quiser falar com **gente de verdade**, ligue **180** (24h) ou use o atendimento com profissional dentro do app.",
  },
  {
    re: /\b(esta conversa|voce grava|salva|guarda|seguro (falar|usar))\b/,
    texto:
      "Esta conversa **não é gravada** e **não sai do seu aparelho**. Não pedimos seu nome, não pedimos cadastro e não registramos o que você digita.\n\nSe alguém puder ver sua tela, use o botão **Sair rápido** no canto — ele troca a página na hora.",
  },
];

export function responderInformativo(pergunta) {
  const t = semAcento(pergunta);
  const achado = INFORMATIVOS.find((i) => i.re.test(t));
  if (!achado) return null;
  return { texto: achado.texto, cartoes: [], sugestoes: ["Serviços na minha cidade", "Quero denunciar sem me identificar"] };
}

export const SAUDACAO = {
  texto:
    "Oi. Eu ajudo a encontrar onde buscar apoio na Paraíba — delegacia da mulher, centro de referência, defensoria, saúde.\n\nMe diga **sua cidade** e o que você precisa. Se estiver em perigo agora, ligue **190**.\n\nEsta conversa não é gravada e não pede login.",
  cartoes: [],
  sugestoes: ["Serviços em Campina Grande", "Preciso de um lugar seguro", "O que é medida protetiva?", "Quero denunciar sem me identificar"],
};

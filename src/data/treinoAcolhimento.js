/* #16 Treino de acolhimento — para profissionais.
 *
 * IMPORTANTE sobre "com IA": esta versão NÃO usa um modelo de linguagem avaliando
 * texto livre. O documento de melhorias exige, para isso, rubrica criada por
 * especialistas, testes de viés (racial, territorial, etário, de deficiência,
 * de gênero) e avaliação humana — nada disso pode ser feito com segurança sem
 * validação profissional. Então aqui o treino é por ESCOLHA de resposta, com
 * retorno baseado numa rubrica (acolhimento, não-culpabilização, pergunta
 * aberta, respeito à autonomia, encaminhamento). Cenários totalmente fictícios.
 *
 * Não serve para certificar nem avaliar o desempenho de ninguém. Conteúdo
 * educativo, a ser validado por especialistas antes de uso formal.
 */
export const CENARIOS_PROF = [
  {
    id: "exagerando",
    persona:
      "Uma mulher chega ao atendimento e diz, baixinho: “Acho que estou exagerando. No fundo ele é um bom pai.”",
    pergunta: "Como você responde?",
    opcoes: [
      {
        texto: "“Você tem certeza de que foi violência mesmo?”",
        seguro: false,
        retorno:
          "Pedir “certeza” pode soar como dúvida sobre o relato e reforçar a insegurança dela. O acolhimento não exige que a pessoa comprove nada.",
      },
      {
        texto: "“O que você fez para ele reagir assim?”",
        seguro: false,
        retorno:
          "Isso culpabiliza. A responsabilidade é sempre de quem agride, nunca de quem sofre — a pergunta transfere a culpa para ela.",
      },
      {
        texto: "“Obrigada por confiar isso a mim. Você não precisa ter certeza agora. Quer me contar como tem se sentido?”",
        seguro: true,
        retorno:
          "Acolhe, não julga, usa pergunta aberta e respeita o tempo dela. É o caminho que sustenta o vínculo e a autonomia.",
      },
    ],
  },
  {
    id: "namoro",
    persona:
      "Uma adolescente conta que o namorado lê as mensagens dela e fica bravo quando ela sai com as amigas.",
    pergunta: "Qual resposta acolhe melhor?",
    opcoes: [
      {
        texto: "“Isso é normal no começo de namoro, vai passar.”",
        seguro: false,
        retorno:
          "Minimizar naturaliza o controle. Ler mensagens e controlar as amizades não é fase — é um sinal de alerta.",
      },
      {
        texto: "“Ciúme assim costuma ser controle, não amor. Você percebe como isso te afeta?”",
        seguro: true,
        retorno:
          "Nomeia o comportamento sem julgar a adolescente e devolve a ela a reflexão, com pergunta aberta.",
      },
      {
        texto: "“Por que você não termina logo com ele?”",
        seguro: false,
        retorno:
          "Pressionar por uma decisão tira a autonomia e pode afastá-la. O ritmo é dela.",
      },
    ],
  },
  {
    id: "idosa",
    persona:
      "Uma senhora relata que o filho grita, controla o dinheiro dela e a ameaça — mas diz que não quer que ele seja preso.",
    pergunta: "Como conduzir o acolhimento?",
    opcoes: [
      {
        texto: "“A senhora precisa denunciar, é a única saída.”",
        seguro: false,
        retorno:
          "Impor um único caminho tira a autonomia dela. Existem apoios além da denúncia, e a decisão é da própria pessoa.",
      },
      {
        texto: "“Entendo que a senhora queira proteger seu filho. Há apoios além da denúncia — quer conhecer as opções?”",
        seguro: true,
        retorno:
          "Valida o sentimento, respeita a autonomia e abre caminhos (assistência social, medida protetiva, acompanhamento) sem forçar.",
      },
      {
        texto: "“Na sua idade, a senhora devia ser cuidada, não maltratada.”",
        seguro: false,
        retorno:
          "Mesmo bem-intencionada, a frase infantiliza e desvia do que ela precisa: ser ouvida e ter opções.",
      },
    ],
  },
];

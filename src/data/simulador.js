/* #7 Simulador de situações reais.
 *
 * Cenários totalmente FICTÍCIOS, escritos a partir de framing público sobre
 * violência doméstica. Regras seguidas à risca:
 *  - nunca existe "resposta errada": toda escolha recebe um retorno que acolhe
 *    e oferece uma alternativa mais segura;
 *  - não há pontuação, nota nem classificação da pessoa como vítima;
 *  - não há previsão de risco individual;
 *  - sempre há a opção de sair e procurar ajuda.
 *
 * Conteúdo educativo, sujeito a revisão por psicologia, assistência social e
 * área jurídica antes de ser tratado como definitivo.
 */
export const CENARIOS = [
  {
    id: "controle",
    tema: "Controle disfarçado de cuidado",
    situacao:
      "Seu parceiro pede sua localização o tempo todo e quer as senhas do seu celular. Diz que é “porque se preocupa” e que, se você não mostrar, é porque tem algo a esconder.",
    pergunta: "O que você pensa em fazer?",
    opcoes: [
      {
        texto: "Dar as senhas para mostrar que confio nele.",
        seguro: false,
        retorno:
          "É compreensível querer evitar o conflito. Mas confiança não se prova entregando privacidade — e o controle costuma aumentar quando cede. Você tem direito à sua intimidade.",
      },
      {
        texto: "Conversar e combinar limites, quando for seguro.",
        seguro: true,
        retorno:
          "Colocar limites é legítimo. Faça isso apenas se for seguro — se a reação dele te assusta, buscar orientação antes (Ligue 180 ou um CRAM) pode proteger você.",
      },
      {
        texto: "Perceber que exigir senha e localização pode ser violência.",
        seguro: true,
        retorno:
          "Exatamente. Vigilância constante, exigir senhas e controlar aonde você vai são formas de violência psicológica e digital — mesmo quando vêm com a palavra “amor”.",
      },
    ],
  },
  {
    id: "perseguicao",
    tema: "Perseguição depois do término",
    situacao:
      "Vocês terminaram, mas ele aparece nos lugares que você frequenta, manda muitas mensagens e usa outros perfis quando você bloqueia.",
    pergunta: "Qual caminho parece mais seguro?",
    opcoes: [
      {
        texto: "Responder pedindo que ele pare.",
        seguro: false,
        retorno:
          "Faz sentido querer resolver conversando. Mas responder costuma alimentar a perseguição. Guardar as mensagens sem responder tende a proteger melhor você.",
      },
      {
        texto: "Guardar as mensagens e procurar orientação.",
        seguro: true,
        retorno:
          "Bom caminho. Perseguição (stalking) é crime. Guarde prints com data, não apague, e procure a delegacia ou a Defensoria — dá para pedir medida protetiva.",
      },
      {
        texto: "Achar que não é grave o suficiente para buscar ajuda.",
        seguro: false,
        retorno:
          "Você não precisa esperar a situação piorar. Sentir medo ou desconforto já é motivo suficiente para procurar orientação. O 180 ajuda a entender as opções.",
      },
    ],
  },
  {
    id: "imagens",
    tema: "Ameaça de expor imagens íntimas",
    situacao:
      "Alguém ameaça divulgar fotos íntimas suas se você não fizer o que ele quer.",
    pergunta: "O que fazer diante da chantagem?",
    opcoes: [
      {
        texto: "Ceder para evitar que ele divulgue.",
        seguro: false,
        retorno:
          "O medo é totalmente compreensível. Mas ceder à chantagem costuma não fazer a ameaça parar. Isso é um crime, e existe caminho de proteção que não depende de obedecer.",
      },
      {
        texto: "Apagar tudo e não contar para ninguém.",
        seguro: false,
        retorno:
          "O impulso de sumir com tudo é natural. Só que as provas (mensagens da ameaça) ajudam a te proteger. Guarde-as e busque apoio — a culpa nunca é de quem foi ameaçada.",
      },
      {
        texto: "Guardar as provas da ameaça e procurar ajuda.",
        seguro: true,
        retorno:
          "Esse é o caminho mais seguro. Ameaçar divulgar imagens íntimas é crime. Guarde as provas da chantagem, denuncie no 180 ou na delegacia, e procure a Defensoria.",
      },
    ],
  },
];

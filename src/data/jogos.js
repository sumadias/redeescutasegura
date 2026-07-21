/* Conteudo educativo dos jogos, extraido do prototipo entregue pela equipe
   (jogos_rede_escuta_segura_prototipos.zip, 20/07/2026). Texto preservado
   integralmente; so os nomes dos campos foram traduzidos.

   FICOU DE FORA: os blocos "community" de cada jogo. Eram numeros e rankings
   ficticios ("18.420 sementes", "Escola que Acolhe - 4.850 elos"). Num site no
   ar isso e lido como dado real de participacao. Quando houver numero de
   verdade, ele entra aqui. */

export const JOGOS = {
  "sementes": {
    "id": "sementes",
    "titulo": "Sementes de Recomeço",
    "publico": "Mulheres adultas",
    "resumo": "Reconhecer sinais, conhecer direitos e fortalecer caminhos de proteção e autonomia.",
    "icone": "🌱",
    "rotuloPontos": "Sementes",
    "avatares": [
      "🌷",
      "🌻",
      "🌺",
      "🌼",
      "🪻",
      "🌸"
    ],
    "niveis": [
      "Perceber",
      "Compreender",
      "Proteger",
      "Conectar",
      "Florescer"
    ],
    "conquistas": [
      {
        "icone": "👁️",
        "nome": "Olhar Atento",
        "descricao": "Reconhecimento de sinais"
      },
      {
        "icone": "📖",
        "nome": "Guardiã dos Direitos",
        "descricao": "Conhecimento de direitos"
      },
      {
        "icone": "🎒",
        "nome": "Plano Seguro",
        "descricao": "Planejamento educativo"
      },
      {
        "icone": "🤝",
        "nome": "Rede de Confiança",
        "descricao": "Construção de apoio"
      },
      {
        "icone": "🌳",
        "nome": "Semente do Recomeço",
        "descricao": "Conclusão da jornada"
      }
    ],
    "missoes": [
      {
        "capitulo": "Capítulo 1 • Perceber",
        "titulo": "Carinho ou controle?",
        "intro": "Observe as mensagens fictícias e identifique o comportamento que merece atenção.",
        "cena": "“Quero saber onde você está. Mande sua localização agora. Se não mostrar seu celular, é porque está escondendo algo.”",
        "pergunta": "Qual interpretação é mais segura?",
        "pontos": 20,
        "opcoes": [
          {
            "texto": "É uma demonstração normal de carinho.",
            "correta": false,
            "retorno": "Cobrança constante, vigilância e exigência de senhas não são requisitos de um relacionamento saudável."
          },
          {
            "texto": "Pode ser controle e violência psicológica ou digital.",
            "correta": true,
            "retorno": "Exigir localização, senhas ou acesso constante ao celular pode representar controle. Confiança não exige vigilância."
          },
          {
            "texto": "Compartilhar o celular é obrigação em qualquer relacionamento.",
            "correta": false,
            "retorno": "Cada pessoa tem direito à privacidade e à autonomia. Compartilhar senhas não é obrigação."
          }
        ]
      },
      {
        "capitulo": "Capítulo 2 • Compreender",
        "titulo": "O mapa dos direitos",
        "intro": "As formas de violência podem aparecer de maneiras diferentes. Analise a situação.",
        "cena": "Uma pessoa destrói os documentos, cartões e objetos de trabalho da companheira para impedir que ela saia de casa.",
        "pergunta": "Qual classificação educativa melhor descreve a situação?",
        "pontos": 30,
        "opcoes": [
          {
            "texto": "Violência patrimonial.",
            "correta": true,
            "retorno": "Destruir ou reter documentos, dinheiro e bens pode configurar violência patrimonial."
          },
          {
            "texto": "Somente um desentendimento financeiro.",
            "correta": false,
            "retorno": "Quando há destruição, retenção ou controle de bens para limitar a autonomia, a situação ultrapassa um desacordo comum."
          },
          {
            "texto": "Não é violência porque não houve agressão física.",
            "correta": false,
            "retorno": "A violência não se limita a agressões físicas. Também pode ser psicológica, sexual, patrimonial e moral."
          }
        ]
      },
      {
        "capitulo": "Capítulo 3 • Proteger",
        "titulo": "Bolsa de segurança fictícia",
        "intro": "Esta missão é educativa. Um plano real deve considerar a situação individual e orientação profissional.",
        "cena": "A personagem deseja organizar, com discrição, itens essenciais para uma eventual saída segura.",
        "pergunta": "Qual conjunto é mais adequado para a simulação?",
        "pontos": 50,
        "opcoes": [
          {
            "texto": "Documentos, medicamentos, chaves, contatos importantes e itens essenciais das crianças.",
            "correta": true,
            "retorno": "Esses itens podem ser importantes em um planejamento. O plano não garante ausência de risco e não deve envolver confronto."
          },
          {
            "texto": "Objetos grandes e difíceis de transportar.",
            "correta": false,
            "retorno": "Em uma simulação de emergência, priorizam-se itens essenciais e de fácil transporte."
          },
          {
            "texto": "Publicar o plano em redes sociais para pedir opiniões.",
            "correta": false,
            "retorno": "Compartilhar publicamente um plano pode aumentar riscos. Informações sensíveis devem ser protegidas."
          }
        ]
      },
      {
        "capitulo": "Capítulo 4 • Conectar",
        "titulo": "Minha rede de confiança",
        "intro": "Uma rede pode reunir pessoas de confiança, serviços profissionais e contatos de emergência.",
        "cena": "A personagem mora em uma comunidade rural e precisa escolher quem pode compor uma rede segura.",
        "pergunta": "Qual opção reúne apoios adequados?",
        "pontos": 40,
        "opcoes": [
          {
            "texto": "Pessoa de confiança, agente de saúde, assistência social e serviços de emergência.",
            "correta": true,
            "retorno": "Uma rede diversificada pode facilitar acolhimento, orientação e acesso a serviços, inclusive em áreas rurais."
          },
          {
            "texto": "Apenas pessoas desconhecidas de redes sociais.",
            "correta": false,
            "retorno": "Contatos desconhecidos podem não oferecer segurança. Prefira pessoas e serviços confiáveis."
          },
          {
            "texto": "Somente enfrentar a situação sem contar a ninguém.",
            "correta": false,
            "retorno": "Buscar apoio não é sinal de fraqueza. Uma rede de confiança pode ampliar as opções de proteção."
          }
        ]
      },
      {
        "capitulo": "Capítulo 5 • Florescer",
        "titulo": "Caminhos do recomeço",
        "intro": "Não existe um único caminho correto. Diferentes escolhas podem fortalecer autonomia e bem-estar.",
        "cena": "A personagem deseja escolher três prioridades para seu novo projeto de vida.",
        "pergunta": "Qual conjunto respeita o ritmo e a autonomia da personagem?",
        "pontos": 150,
        "opcoes": [
          {
            "texto": "Saúde, estudo ou qualificação e fortalecimento da rede comunitária.",
            "correta": true,
            "retorno": "Esses caminhos podem ser combinados conforme as necessidades e decisões da própria pessoa."
          },
          {
            "texto": "Cumprir metas definidas por outras pessoas, mesmo sem concordar.",
            "correta": false,
            "retorno": "O recomeço deve respeitar as escolhas, o tempo e as necessidades da pessoa."
          },
          {
            "texto": "Evitar todo apoio para provar independência.",
            "correta": false,
            "retorno": "Autonomia não significa isolamento. Receber apoio pode fazer parte de um projeto de vida."
          }
        ]
      }
    ]
  },
  "rede": {
    "id": "rede",
    "titulo": "Rede que Protege",
    "publico": "Comunidade e profissionais",
    "resumo": "Aprender a ouvir sem julgamento, orientar com segurança e realizar encaminhamentos adequados.",
    "icone": "🤝",
    "rotuloPontos": "Elos",
    "avatares": [
      "👩‍🏫",
      "🧑‍⚕️",
      "🧑‍🌾",
      "👩‍💼",
      "🧑‍🎓",
      "🧑‍🤝‍🧑"
    ],
    "niveis": [
      "Escutar",
      "Orientar",
      "Encaminhar",
      "Proteger",
      "Mobilizar"
    ],
    "conquistas": [
      {
        "icone": "👂",
        "nome": "Escuta sem Julgamento",
        "descricao": "Acolhimento respeitoso"
      },
      {
        "icone": "🧭",
        "nome": "Orientação Segura",
        "descricao": "Apresentação de opções"
      },
      {
        "icone": "🌉",
        "nome": "Ponte para a Rede",
        "descricao": "Encaminhamento adequado"
      },
      {
        "icone": "🛡️",
        "nome": "Proteção Responsável",
        "descricao": "Reconhecimento de risco"
      },
      {
        "icone": "🏘️",
        "nome": "Comunidade Protetora",
        "descricao": "Mobilização educativa"
      }
    ],
    "missoes": [
      {
        "capitulo": "Nível 1 • Escutar",
        "titulo": "Uma conversa de confiança",
        "intro": "A personagem diz que está com medo, mas ainda não sabe o que fazer.",
        "cena": "“Estou com medo, mas ainda não sei o que fazer.”",
        "pergunta": "Qual resposta oferece acolhimento sem pressão?",
        "pontos": 20,
        "opcoes": [
          {
            "texto": "Você precisa terminar hoje.",
            "correta": false,
            "retorno": "Mesmo com boa intenção, pressionar pode afastar a pessoa e desconsiderar riscos e decisões individuais."
          },
          {
            "texto": "Por que você deixou isso acontecer?",
            "correta": false,
            "retorno": "Essa pergunta pode culpabilizar. A responsabilidade pela violência é de quem a pratica."
          },
          {
            "texto": "Eu acredito em você. Posso ouvir e ajudar a encontrar opções, respeitando sua decisão.",
            "correta": true,
            "retorno": "Acolher significa acreditar, ouvir sem julgamento e respeitar o tempo e as decisões da pessoa."
          }
        ]
      },
      {
        "capitulo": "Nível 2 • Orientar",
        "titulo": "Escutar, informar ou acionar?",
        "intro": "Cada ação tem uma função diferente dentro da rede de apoio.",
        "cena": "A pessoa pede informação sobre serviços, mas não relata risco imediato.",
        "pergunta": "Qual resposta é mais adequada?",
        "pontos": 20,
        "opcoes": [
          {
            "texto": "Apresentar opções de serviços e perguntar se ela deseja acompanhamento.",
            "correta": true,
            "retorno": "Orientar é oferecer informações e apoio sem impor uma decisão."
          },
          {
            "texto": "Acionar a polícia sem conversar com ela, em qualquer situação.",
            "correta": false,
            "retorno": "Em risco imediato, a emergência pode ser necessária. Fora disso, o apoio deve considerar segurança, contexto e vontade da pessoa."
          },
          {
            "texto": "Investigar pessoalmente o que aconteceu.",
            "correta": false,
            "retorno": "Apoiar não significa investigar. A atuação deve respeitar limites e encaminhar para profissionais competentes."
          }
        ]
      },
      {
        "capitulo": "Nível 3 • Encaminhar",
        "titulo": "A porta de entrada correta",
        "intro": "Os serviços têm funções diferentes e podem variar conforme o município.",
        "cena": "Uma mulher relata que está em risco policial imediato e o agressor está próximo.",
        "pergunta": "Qual contato deve ser priorizado?",
        "pontos": 30,
        "opcoes": [
          {
            "texto": "190 — Polícia Militar.",
            "correta": true,
            "retorno": "Em risco policial imediato, o 190 é o contato de emergência. Sempre considere a segurança para realizar a ligação."
          },
          {
            "texto": "Apenas aguardar o CRAS abrir.",
            "correta": false,
            "retorno": "O CRAS tem função importante na assistência social, mas não substitui uma resposta policial imediata."
          },
          {
            "texto": "Publicar o caso em redes sociais.",
            "correta": false,
            "retorno": "A exposição pública pode aumentar riscos e divulgar informações sensíveis."
          }
        ]
      },
      {
        "capitulo": "Nível 4 • Proteger",
        "titulo": "Risco elevado",
        "intro": "O objetivo não é enfrentar o agressor, mas reconhecer o perigo e acionar a rede adequada.",
        "cena": "A personagem informa que o agressor está próximo e possui uma arma.",
        "pergunta": "Qual conduta educativa é mais segura?",
        "pontos": 40,
        "opcoes": [
          {
            "texto": "Evitar confronto, buscar local seguro quando possível e acionar a emergência.",
            "correta": true,
            "retorno": "A situação indica risco elevado. Não confrontar, proteger a localização e acionar a emergência são prioridades."
          },
          {
            "texto": "Ir pessoalmente conversar com o agressor.",
            "correta": false,
            "retorno": "Confrontar pode aumentar o risco para todos. A situação deve ser encaminhada aos serviços competentes."
          },
          {
            "texto": "Enviar a localização da vítima para um grupo público.",
            "correta": false,
            "retorno": "A localização não deve ser divulgada publicamente, pois isso pode aumentar o perigo."
          }
        ]
      },
      {
        "capitulo": "Nível 5 • Mobilizar",
        "titulo": "Ação comunitária responsável",
        "intro": "Campanhas devem informar sem expor pessoas ou casos reais.",
        "cena": "Uma escola deseja realizar uma ação educativa sobre relacionamentos saudáveis.",
        "pergunta": "Qual proposta é mais adequada?",
        "pontos": 100,
        "opcoes": [
          {
            "texto": "Oficina com casos fictícios, serviços de apoio e materiais revisados por especialistas.",
            "correta": true,
            "retorno": "Casos fictícios, linguagem acolhedora e revisão profissional ajudam a proteger participantes e melhorar o aprendizado."
          },
          {
            "texto": "Pedir que estudantes relatem publicamente experiências pessoais.",
            "correta": false,
            "retorno": "A atividade não deve pressionar ninguém a compartilhar experiências pessoais."
          },
          {
            "texto": "Criar um ranking de quem conhece mais vítimas.",
            "correta": false,
            "retorno": "A competição nunca deve usar histórias reais, denúncias ou exposição de vítimas."
          }
        ]
      }
    ]
  },
  "missao": {
    "id": "missao",
    "titulo": "Missão Rede Segura",
    "publico": "Jovens e adolescentes",
    "resumo": "Relacionamentos saudáveis, consentimento, privacidade e proteção no ambiente digital.",
    "icone": "🛡️",
    "rotuloPontos": "Luzes",
    "avatares": [
      "🧑‍🚀",
      "🧑‍🎨",
      "🧑‍💻",
      "🦸",
      "🧙",
      "🤖"
    ],
    "niveis": [
      "Carinho ou controle?",
      "Vida digital",
      "Consentimento",
      "Imagens e exposição",
      "Rede de apoio",
      "Protagonismo"
    ],
    "conquistas": [
      {
        "icone": "💬",
        "nome": "Respeito é a Regra",
        "descricao": "Relações saudáveis"
      },
      {
        "icone": "🔐",
        "nome": "Guardião da Privacidade",
        "descricao": "Segurança digital"
      },
      {
        "icone": "✅",
        "nome": "Consentimento Importa",
        "descricao": "Respeito aos limites"
      },
      {
        "icone": "🛡️",
        "nome": "Rede Digital Segura",
        "descricao": "Proteção contra exposição"
      },
      {
        "icone": "🤜🤛",
        "nome": "Amizade que Protege",
        "descricao": "Rede de confiança"
      },
      {
        "icone": "⭐",
        "nome": "Protagonista da Mudança",
        "descricao": "Campanha educativa"
      }
    ],
    "missoes": [
      {
        "capitulo": "Nível 1 • Carinho ou controle?",
        "titulo": "Escolhas e amizades",
        "intro": "Relacionamentos saudáveis respeitam amizades, limites e decisões pessoais.",
        "cena": "“Se você sair com suas amizades, nosso relacionamento acabou.”",
        "pergunta": "O que essa frase pode representar?",
        "pontos": 10,
        "opcoes": [
          {
            "texto": "Chantagem emocional e tentativa de isolamento.",
            "correta": true,
            "retorno": "Ameaçar o término para controlar amizades pode ser um sinal de relacionamento abusivo."
          },
          {
            "texto": "Um limite saudável.",
            "correta": false,
            "retorno": "Limites saudáveis são conversados e respeitam a autonomia de ambas as pessoas."
          },
          {
            "texto": "Uma prova de amor.",
            "correta": false,
            "retorno": "Amor não exige isolamento de amigos e familiares."
          }
        ]
      },
      {
        "capitulo": "Nível 2 • Minha vida digital",
        "titulo": "Proteja sua conta",
        "intro": "Senhas fortes e autenticação em duas etapas ajudam a proteger informações.",
        "cena": "Um colega pede sua senha para “provar confiança” e promete não mexer em nada.",
        "pergunta": "Qual escolha protege melhor sua privacidade?",
        "pontos": 50,
        "opcoes": [
          {
            "texto": "Não compartilhar a senha e ativar autenticação em duas etapas.",
            "correta": true,
            "retorno": "Cada pessoa tem direito à privacidade. Senhas devem ser pessoais e protegidas."
          },
          {
            "texto": "Compartilhar a senha e depois trocar.",
            "correta": false,
            "retorno": "Mesmo por pouco tempo, compartilhar senhas pode expor mensagens, fotos e outros dados."
          },
          {
            "texto": "Usar a mesma senha em todas as contas.",
            "correta": false,
            "retorno": "Repetir senhas aumenta o impacto de uma invasão. Use senhas diferentes e fortes."
          }
        ]
      },
      {
        "capitulo": "Nível 3 • Consentimento e respeito",
        "titulo": "É necessário perguntar",
        "intro": "Consentimento precisa ser livre, claro e pode ser retirado a qualquer momento.",
        "cena": "Durante um encontro, uma pessoa fica em silêncio e parece desconfortável.",
        "pergunta": "Qual atitude é adequada?",
        "pontos": 50,
        "opcoes": [
          {
            "texto": "Parar e perguntar de forma respeitosa se a pessoa deseja continuar.",
            "correta": true,
            "retorno": "Silêncio ou desconforto não significam consentimento. É necessário perguntar e respeitar a resposta."
          },
          {
            "texto": "Continuar porque ela não disse “não”.",
            "correta": false,
            "retorno": "A ausência de um “não” não equivale a consentimento."
          },
          {
            "texto": "Pressionar até receber uma resposta positiva.",
            "correta": false,
            "retorno": "Consentimento obtido por pressão não é livre."
          }
        ]
      },
      {
        "capitulo": "Nível 4 • Imagens e exposição",
        "titulo": "Não repasse",
        "intro": "Divulgar imagens sem autorização causa dano e pode ampliar a violência.",
        "cena": "Uma imagem íntima de uma colega começa a circular em um grupo.",
        "pergunta": "Qual atitude ajuda a proteger a pessoa exposta?",
        "pontos": 50,
        "opcoes": [
          {
            "texto": "Não repassar, guardar evidências quando seguro e buscar ajuda de um adulto ou serviço de confiança.",
            "correta": true,
            "retorno": "A responsabilidade não é da pessoa exposta. Não compartilhar e buscar apoio são atitudes importantes."
          },
          {
            "texto": "Repassar para alertar outras pessoas.",
            "correta": false,
            "retorno": "Repassar aumenta a exposição e o dano, mesmo quando a intenção é alertar."
          },
          {
            "texto": "Culpar a pessoa por ter produzido a imagem.",
            "correta": false,
            "retorno": "A culpa é de quem divulgou sem autorização, não da pessoa exposta."
          }
        ]
      },
      {
        "capitulo": "Nível 5 • Rede de apoio",
        "titulo": "Um adulto de confiança",
        "intro": "Pedir ajuda pode ser importante quando existe ameaça, perseguição ou exposição.",
        "cena": "Um jovem está recebendo ameaças de um perfil conhecido e teme encontrar a pessoa na escola.",
        "pergunta": "Qual caminho é mais seguro?",
        "pontos": 100,
        "opcoes": [
          {
            "texto": "Guardar evidências, bloquear quando seguro e procurar um adulto ou profissional de confiança.",
            "correta": true,
            "retorno": "Uma rede de apoio pode ajudar a avaliar riscos e buscar os serviços adequados."
          },
          {
            "texto": "Marcar um encontro para resolver sozinho.",
            "correta": false,
            "retorno": "Enfrentar a pessoa pode aumentar o risco. Procure apoio."
          },
          {
            "texto": "Responder com novas ameaças.",
            "correta": false,
            "retorno": "Responder com ameaças pode agravar a situação e dificultar a proteção."
          }
        ]
      },
      {
        "capitulo": "Nível 6 • Protagonista da mudança",
        "titulo": "Campanha digital responsável",
        "intro": "Uma campanha pode promover respeito sem usar histórias ou imagens reais de vítimas.",
        "cena": "Sua turma vai criar uma campanha sobre segurança digital e relacionamentos saudáveis.",
        "pergunta": "Qual proposta é mais adequada?",
        "pontos": 200,
        "opcoes": [
          {
            "texto": "Usar personagens fictícios, mensagens de respeito e canais de ajuda verificados.",
            "correta": true,
            "retorno": "Essa abordagem informa, protege a privacidade e facilita o acesso à rede de apoio."
          },
          {
            "texto": "Publicar prints reais sem autorização.",
            "correta": false,
            "retorno": "Prints podem expor pessoas e informações sensíveis. Use exemplos fictícios."
          },
          {
            "texto": "Fazer piadas com quem caiu em golpes ou teve imagens divulgadas.",
            "correta": false,
            "retorno": "Piadas culpabilizam e afastam pessoas que precisam de apoio."
          }
        ]
      }
    ]
  }
};

export const LISTA_JOGOS = Object.values(JOGOS);

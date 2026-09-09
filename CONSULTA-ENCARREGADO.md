# Consulta ao Encarregado — pendências de LGPD

**Para:** Victor Higo Alves de Souza — OAB/PB 27.292, encarregado (DPO)
**Controlador:** Nous Inovação & Tecnologia Inova Simples I.S. — CNPJ 65.276.411/0001-50
**Assunto:** definições que faltam para publicar o aplicativo na Google Play
**Data:** 09/09/2026

---

## Por que esta consulta existe

A ficha do app na Google Play exige uma declaração chamada **Segurança dos
Dados**, em que o desenvolvedor informa o que coleta, para quê e por quanto
tempo guarda. A declaração é vinculante e revisada pelo Google.

Dois campos não podem ser preenchidos sem definição jurídica: a **base legal
de cada finalidade** e o **prazo de retenção**. Hoje a página de privacidade
diz honestamente que estão "em definição" — preferimos admitir isso a publicar
um prazo inventado, porque declarar errado à Play é pior do que declarar
pendente.

Abaixo está o levantamento do que o sistema **de fato** faz, extraído do
código, e não do que se supõe que ele faça. Em seguida, quatro perguntas com
propostas para aprovação ou correção.

---

## 1. O que o sistema realmente coleta

Levantado a partir das entidades gravadas no código (`DiarioEmocao`,
`PlanoSeguranca`, `CartaPessoal`, `ItemSalvo`, `ChatSessao`, `ChatMensagem`,
`Consulta`).

### Conteúdo que só a titular acessa

| Dado | Onde | Observação |
|---|---|---|
| Diário de emoções | conta da titular | texto livre sobre estado emocional |
| Plano de segurança | conta da titular | inclui **nome e telefone de terceiros** (pessoas de confiança), lugar seguro e palavra-código |
| Cartas para si mesma | conta da titular | texto livre, com data de abertura futura |
| Itens salvos | conta da titular | conteúdos do site marcados pela titular |

Nem a equipe da Rede nem a administração do site têm acesso a esse conteúdo.

### Conteúdo que um profissional lê

| Dado | Observação |
|---|---|
| Conversa no chat | o profissional do outro lado lê o que foi escrito — é a finalidade do serviço |
| Agendamento de atendimento | dados do agendamento |

### No aparelho da titular (não enviado ao servidor)

Preferências de acessibilidade, endereço da saída rápida e um identificador
anônimo aleatório.

### O que **não** é coletado

Não há coleta de CPF, endereço ou localização. O servidor bloqueia por
cabeçalho o acesso a geolocalização, câmera e microfone — não é apenas ausência
de uso, é impedimento técnico.

### Natureza dos dados

O conteúdo do diário, do plano de segurança e das cartas revela situação de
violência e estado de saúde mental. Entendemos tratar-se de **dado pessoal
sensível** (art. 5º, II), o que atrai o art. 11 e não apenas o art. 7º.

O plano de segurança traz ainda **dados de terceiros** — nome e telefone das
pessoas de confiança —, informados pela titular sem que esses terceiros sejam
consultados.

---

## 2. As quatro perguntas

### 2.1 Base legal por finalidade

**Proposta:**

| Finalidade | Base legal proposta |
|---|---|
| Diário, plano de segurança, cartas e itens salvos | **Consentimento específico e destacado** — art. 11, I |
| Chat e agendamento com profissional | **Consentimento** (art. 11, I), com avaliação sobre a hipótese de tutela da saúde (art. 11, II, "f") se os profissionais forem da área |
| Autenticação e segurança do acesso | Art. 7º, II — cumprimento de obrigação legal — ou art. 7º, IX — legítimo interesse |

**Pergunta:** confirma essas bases? Em especial, o atendimento profissional
deve permanecer em consentimento ou migrar para tutela da saúde?

### 2.2 Prazo de retenção

Hoje **não há eliminação automática**. Os registros permanecem enquanto a
titular não os apagar, e ela pode apagar a qualquer momento — item a item ou
tudo de uma vez, na tela "Meus Dados".

**Proposta:** eliminação automática após período definido de inatividade da
conta, com aviso prévio por e-mail antes da exclusão.

**Pergunta:** qual prazo? E o aviso prévio é adequado, considerando que um
e-mail sobre "seus dados na Rede Escuta Segura" pode chegar a uma caixa que o
agressor acessa?

> Esta última questão não é retórica. O aviso protege a titular de perder
> registros, mas cria um risco de exposição. Pode ser preferível não avisar,
> ou avisar sem identificar o serviço no assunto.

### 2.3 Dados de terceiros no plano de segurança

A titular cadastra nome e telefone de pessoas de confiança, que não consentiram
e não sabem do cadastro.

**Pergunta:** isso exige tratamento próprio na política — base legal específica,
menção expressa, ou alguma limitação? Ou se resolve como decorrência do
legítimo interesse da titular em sua própria proteção?

### 2.4 Confirmação da categoria na Play

Classificamos o app como **"Todos os Outros Tipos de Aplicações"**, e não como
"Social ou Comunicação".

Fundamento: a definição do Google para a segunda é *"o objetivo principal desta
aplicação é conhecer ou comunicar com pessoas"* (exemplos: Facebook, Skype,
SMS). Aqui o chat é atendimento um-a-um com profissional de um serviço — não há
perfis, feed nem mensagem entre usuárias. A analogia é com telemedicina, que
não vira "Comunicação" por ter conversa com médico.

**Pergunta:** concorda com o enquadramento?

---

## 3. O que muda depois da resposta

Com as definições:

1. A página `/privacidade` deixa de exibir o aviso "em definição" e passa a
   trazer base legal e prazo.
2. A declaração de Segurança dos Dados da Play pode ser preenchida com prazo
   real.
3. Se houver eliminação automática, será preciso implementá-la — hoje não
   existe, e declarar prazo sem implementação seria declaração falsa.

Este último ponto merece atenção: **não basta definir o prazo no papel.** Se a
resposta indicar eliminação automática, isso vira trabalho de desenvolvimento
antes da publicação, não depois.

---

## 4. Observação sobre o parecer anterior

O parecer favorável já emitido tratou da concepção do serviço. Esta consulta é
mais específica: são os campos que a Google Play exige preencher, com efeito
declaratório perante o Google e, indiretamente, perante a ANPD.

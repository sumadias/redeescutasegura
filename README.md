# Rede Escuta Segura

[![Deploy](https://github.com/sumadias/redeescutasegura/actions/workflows/deploy.yml/badge.svg)](https://github.com/sumadias/redeescutasegura/actions/workflows/deploy.yml)
[![Site](https://img.shields.io/badge/site-redeescutasegura.com.br-7c3aed)](https://redeescutasegura.com.br)
[![PWA](https://img.shields.io/badge/PWA-instal%C3%A1vel-5a0fc8)](public/manifest.json)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)](LICENSE)

Plataforma de acolhimento, orientação e encaminhamento para **mulheres em situação de violência
na Paraíba** — e para a rede de profissionais que as atende. No ar em
**[redeescutasegura.com.br](https://redeescutasegura.com.br)**.

> ⚠️ **Software de apoio, não serviço de emergência.** Em risco imediato: **190** (Polícia
> Militar) ou **180** (Central de Atendimento à Mulher).

## Por que existe

Mulher que decide buscar ajuda enfrenta três barreiras antes de qualquer atendimento: não sabe
que o que vive tem nome, não sabe a qual serviço recorrer, e não tem onde consultar isso sem
deixar rastro no aparelho que o agressor pode revisar.

A plataforma ataca as três — e faz da segurança de uso um requisito de arquitetura, não um
detalhe de interface.

## Segurança de uso vem antes de funcionalidade

| Salvaguarda | Implementação |
| --- | --- |
| **Saída rápida** | Botão presente em toda tela sensível: abandona a sessão e troca a página na hora — [`src/components/QuickExitButton.jsx`](src/components/QuickExitButton.jsx) |
| **PIN de acesso** | O conteúdo pessoal só abre com PIN, não basta abrir o app |
| **Sem vazamento de domínio** | Sair da conta não devolve a pessoa para um domínio de terceiro que denuncie o que ela usou |
| **Cache que expira de verdade** | O service worker é versionado com o SHA do commit no build; sem isso o navegador nunca reinstalaria o worker e o cache antigo permaneceria no aparelho |
| **LGPD explícita** | Páginas de privacidade e de dados pessoais escritas para a usuária, não para o jurídico — [`src/pages/site/MeusDados.jsx`](src/pages/site/MeusDados.jsx) |
| **Leitura simples** | Versão do conteúdo em linguagem acessível — [`src/pages/site/LeituraSimples.jsx`](src/pages/site/LeituraSimples.jsx) |

## Os quatro produtos em um repositório

**Site público** — o que é violência, direitos, documentos necessários, plano para os filhos,
orientação para quem está ajudando alguém, jogos educativos e leitura simples.

**App da usuária** (`src/pages/app`) — acolhimento, plano de segurança, mapa da rede de
proteção, meus direitos, apoio jurídico, agendamento, assistente, diário de emoções com
gráfico de humor, trilha de recomeço, cartas para mim, momento de calma e emergência.

**Painel da rede** (`src/pages/painel`) — para profissionais dos serviços: agenda, chat,
encaminhamentos, serviços, relatórios e mapa de calor das ocorrências.

**Administração** (`src/pages/admin`) — dashboard, gestão de usuárias e configuração.

## Dados da rede de proteção

O mapa da rede usa **fontes oficiais** — cadastro do CNES cruzado com os equipamentos
especializados de atendimento à mulher. Levantamentos publicados de forma agregada estavam
desatualizados e incompletos para a Paraíba, e por isso não são usados como fonte primária.

## Stack

| Camada | Tecnologia |
| --- | --- |
| UI | React 18 + Vite |
| Estilo | Tailwind CSS + shadcn/ui (Radix) |
| App | PWA instalável, com service worker versionado |
| Backend | Base44 SDK (`@base44/sdk`) |
| CI/CD | GitHub Actions → branch `deploy` → cron pull no cPanel |

## Arquitetura de publicação

```
push na main  →  GitHub Actions (npm ci + vite build)
              →  versiona o service worker com o SHA do commit
              →  força push do dist/ na branch deploy
              →  cron no cPanel faz git pull da branch deploy
              →  redeescutasegura.com.br atualizado
```

## Rodando localmente

Pré-requisitos: Node.js 22+.

```bash
npm install
cp .env.example .env.local   # preencha as variáveis abaixo
npm run dev
```

| Variável | Descrição |
| --- | --- |
| `VITE_BASE44_APP_ID` | ID da aplicação no Base44 |
| `VITE_BASE44_APP_BASE_URL` | URL do backend Base44 |

```bash
npm run build     # build de produção em dist/
npm run preview   # serve o build local
npm run lint      # ESLint
```

## Contribuindo

Alterações passam primeiro por validação em ambiente de desenvolvimento antes de ir ao ar.
Recurso novo entra como **adição** ao fluxo existente — o caminho que a usuária já conhece
não é redesenhado sem necessidade, porque quem chega em crise não tem margem para reaprender
a interface.

## Licença

[MIT](LICENSE) © Suzana Marques Dias.

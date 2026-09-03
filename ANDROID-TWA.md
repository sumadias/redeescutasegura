# Publicar como app Android (TWA)

Como o Rede Escuta Segura vira um aplicativo na Google Play sem virar
outro código. O TWA (Trusted Web Activity) embrulha o PWA que já existe:
o app é uma casca de ~1 MB que abre este mesmo site em tela cheia, sem
barra de navegador. Consequência prática: **um `git push` na main atualiza
o app** — só se republica na Play quando muda a casca.

- Pacote: `br.com.redeescutasegura.app` (permanente, não pode ser trocado)
- Conta Play: Nous Inovação e Tecnologia (ID 7775570597341173124)

## Por que TWA e não Capacitor

O Capacitor embrulha o React numa WebView e abriria caminho para
biometria e PIN nativos (Onda 2). Ficou para depois: hoje o ganho é
publicar, e o TWA aproveita o `manifest.json` e o `sw.js` que já estão
prontos. Se a tranca biométrica virar prioridade, a migração é possível
— o pacote e a ficha da loja continuam os mesmos.

## A ordem importa

A verificação do TWA depende da impressão digital da chave que assina o
app, e essa impressão só existe **depois** do primeiro envio. Então não dá
para publicar o `assetlinks.json` antes. A ordem correta:

1. Criar a ficha do app na Play Console (nome, pacote, declarações).
2. Gerar a chave de upload (veja abaixo) e construir o AAB.
3. Enviar o AAB para o teste interno.
4. Pegar a impressão SHA-256 em **Configuração → Integridade do app**,
   na seção "Certificado de assinatura de apps".
   Use a do *app signing*, não a do *upload* — a Play reassina o pacote,
   e quem chega no aparelho é a chave dela.
5. Preencher `public/.well-known/assetlinks.json` com essa impressão,
   dar `git push` e esperar o cron da HostGator (até 5 min).
6. Instalar pelo teste interno e conferir que abre **sem a barra do
   navegador**. Se a barra aparecer, a verificação falhou — veja abaixo.

## A chave de assinatura é sua

O `bubblewrap init` pede uma senha para a keystore e cria
`android.keystore`. Essa senha e esse arquivo são seus:

- **Nunca** entram no Git (já cobertos pelo `.gitignore`).
- Se você perder a chave de upload, dá para pedir reset à Google.
  Se perder a keystore *e* não estiver no Play App Signing, o app não
  pode mais ser atualizado — nunca. Guarde uma cópia fora da máquina.
- Mantenha o **Play App Signing ligado** (padrão). É o que torna a perda
  da chave de upload recuperável.

## Comandos

```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://redeescutasegura.com.br/manifest.json
bubblewrap build
```

O `init` pergunta o pacote — responda `br.com.redeescutasegura.app`.
O `build` gera `app-release-bundle.aab`, que é o arquivo enviado à Play.

O Bubblewrap exige **JDK 17+**. A máquina tem o Java 8, então na primeira
execução ele baixa o próprio JDK e o Android SDK (~1,5 GB) e guarda em
`~/.bubblewrap`. É demorado só na primeira vez.

## A armadilha do `.htaccess`

O catch-all do React Router mandava **todo** caminho inexistente para o
`index.html`. Isso incluía `/.well-known/assetlinks.json`: o Android
buscava o arquivo, recebia HTML com `content-type: text/html` e a
verificação falhava **em silêncio** — o app abria com a barra do
navegador à mostra e nada explicava por quê.

Corrigido em `public/.htaccess` com duas regras que precisam continuar lá:

- `RewriteRule ^\.well-known/ - [L]` antes do catch-all, para o caminho
  não ser reescrito. Também protege o `acme-challenge` da renovação do
  certificado.
- `ForceType application/json` no `assetlinks.json`, porque o Digital
  Asset Links recusa qualquer outro content-type.

Para conferir depois de publicar:

```bash
curl -sS -o /dev/null -w "%{http_code} %{content_type}\n" https://redeescutasegura.com.br/.well-known/assetlinks.json
```

Tem que responder `200 application/json`. Se vier `text/html`, as regras
acima se perderam no deploy.

## Antes de enviar para revisão

A Play exige, e nada disso é automático:

- **Política de privacidade** num endereço que resolva de verdade.
  Ainda faltam os dados do parecer: controlador e CNPJ, encarregado (DPO)
  e contato, base legal por finalidade, prazo de retenção e canal de
  exercício de direitos.
- **Segurança dos dados**: declaração do que é coletado. Este app guarda
  diário, plano de segurança e cartas — conteúdo sensível. A declaração
  precisa bater com o que o código realmente faz.
- **Classificação de conteúdo**: o questionário toca violência doméstica.
  Responder pelo conteúdo real, não pelo que parece mais seguro.
- **Ficha da loja**: ícone 512×512 (existe: `public/logo-512.png`),
  gráfico de destaque 1024×500 (não existe) e no mínimo 2 capturas de
  tela de celular.

## Sobre o nome ser visível

O nome do app e o pacote aparecem na gaveta de aplicativos e em
Configurações → Apps, e o histórico de instalação fica na conta Google.
Para quem usa o app fugindo de alguém que divide o aparelho ou a conta,
isso é exposição real.

A resposta a isso **não** é disfarçar a ficha da loja: a Play proíbe apps
que deturpam a própria função, e um "calculadora" que na verdade é um app
de violência doméstica pode ser suspenso. A proteção fica dentro do app —
a saída rápida, que já existe, e o PIN e a biometria da Onda 2.

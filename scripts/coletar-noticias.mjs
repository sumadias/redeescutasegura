/* Coleta notícias sobre leis, decretos e avanços para as mulheres a partir de
 * fontes oficiais, e grava public/noticias.json.
 *
 * Roda no GitHub Actions (workflow noticias.yml), não no navegador: assim não
 * há problema de CORS, o site continua sendo só arquivos estáticos, e nada
 * depende de servidor no ar.
 *
 * O QUE PUBLICAMOS: título, fonte, data e link. Não copiamos o texto da
 * matéria — quem quiser ler vai à fonte. É o cuidado com direitos autorais
 * que a equipe pediu.
 *
 * FILTRO DE SEGURANÇA: esta é uma página lida por mulheres em situação de
 * violência. Manchete de feminicídio, estupro ou agressão não entra, mesmo
 * vindo de fonte oficial. A seção é sobre direitos conquistados e avanços.
 */

/* `dedicada` marca fonte que só publica sobre mulheres e gênero. Nessas, exigir
   a palavra "mulher" no título descarta matéria boa — "Sancionada lei que amplia
   licença-maternidade" já está no lugar certo por vir de onde vem. */
const FONTES = [
  { nome: "ONU Mulheres Brasil", url: "https://www.onumulheres.org.br/feed/", escopo: "Brasil", dedicada: true },
  { nome: "ONU Mulheres", url: "https://www.unwomen.org/en/rss-feeds/news", escopo: "Mundo", dedicada: true },
  { nome: "Agência Brasil", url: "https://agenciabrasil.ebc.com.br/rss/direitos-humanos/feed.xml", escopo: "Brasil" },
  { nome: "Agência Brasil", url: "https://agenciabrasil.ebc.com.br/rss/geral/feed.xml", escopo: "Brasil" },
  { nome: "Agência Senado", url: "https://www12.senado.leg.br/noticias/rss", escopo: "Brasil" },
];

/* precisa falar de mulheres/gênero */
const SOBRE_MULHERES = /\b(mulher|mulheres|feminin[ao]s?|feminismo|g[êe]nero|materni|maternidade|gestante|m[ãa]es?|meninas?|protetiva|protetivas|maria da penha|women|girls?|gender)\b/i;

/* e precisa ser sobre norma, política pública ou avanço */
const TEMA = /\b(lei|leis|decreto|sancion\w+|aprov\w+|projeto|pl\s?\d|pec\b|norma|portaria|medida provis[óo]ria|medidas? protetivas?|direitos?|pol[íi]tica p[úu]blica|pol[íi]ticas|programa|campanha|benef[íi]cio|licen[çc]a|conquist\w+|avan[çc]\w+|amplia\w*|garant\w+|igualdade|equidade|in[ée]dit\w+|recorde|nomead\w+|eleit\w+|premiad\w+|law|decree|rights?|policy|equality|milestone|campaign)\b/i;

/* nunca publicar: manchete pesada não pertence a esta seção */
const BLOQUEIO = /\b(feminic[íi]dio|assassin\w+|homic[íi]dio|mort[ae]s?|morrer|estupr\w+|abus\w+ sexual|espancad\w+|agress[ãa]o|agredid\w+|espancamento|cad[áa]ver|corpo encontrado|suic[íi]d\w+|femicide|murder|killed|rape|assault)\b/i;

const LIMITE = 24;

function texto(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!m) return "";
  return m[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function link(bloco) {
  const direto = texto(bloco, "link");
  if (direto) return direto;
  const href = bloco.match(/<link[^>]*href="([^"]+)"/i);
  return href ? href[1] : "";
}

function dataISO(bloco) {
  const bruta = texto(bloco, "pubDate") || texto(bloco, "updated") || texto(bloco, "published") || texto(bloco, "dc:date");
  const d = new Date(bruta);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

async function lerFonte(f) {
  try {
    const r = await fetch(f.url, {
      headers: { "User-Agent": "RedeEscutaSegura/1.0 (+https://redeescutasegura.com.br)" },
      signal: AbortSignal.timeout(25000),
    });
    if (!r.ok) { console.warn(`  ${f.nome}: HTTP ${r.status}`); return []; }
    const xml = await r.text();
    const blocos = xml.split(/<(?:item|entry)[\s>]/i).slice(1);
    return blocos.map((b) => {
      const titulo = texto(b, "title");
      return { titulo, link: link(b), data: dataISO(b), fonte: f.nome, escopo: f.escopo, dedicada: !!f.dedicada };
    }).filter((n) => n.titulo && n.link);
  } catch (e) {
    console.warn(`  ${f.nome}: ${e.message}`);
    return [];
  }
}

/* discurso e transcrição não são notícia de lei ou conquista */
const FORMATO_FORA = /^(speech|statement|op-ed|video|áudio|audio|vídeo|podcast|entrevista|artigo)\b[:\s]/i;

const DIAS_MAX = 180;
const recente = (iso) => {
  if (!iso) return false;
  const dias = (Date.now() - new Date(`${iso}T12:00:00Z`).getTime()) / 86400000;
  return dias >= 0 && dias <= DIAS_MAX;
};

const relevante = (n) => {
  if (BLOQUEIO.test(n.titulo)) return false;
  if (FORMATO_FORA.test(n.titulo)) return false;
  /* notícia velha numa seção chamada "últimas" engana quem lê */
  if (!recente(n.data)) return false;
  if (!TEMA.test(n.titulo)) return false;
  /* fonte geral precisa dizer no título que é sobre mulheres; fonte dedicada não */
  return n.dedicada || SOBRE_MULHERES.test(n.titulo);
};

const principal = async () => {
  const bruto = (await Promise.all(FONTES.map(lerFonte))).flat();
  console.log(`lidos: ${bruto.length} itens`);

  const vistos = new Set();
  const noticias = bruto
    .filter(relevante)
    .filter((n) => { const k = n.titulo.toLowerCase(); if (vistos.has(k)) return false; vistos.add(k); return true; })
    .sort((a, b) => String(b.data).localeCompare(String(a.data)))
    .slice(0, LIMITE)
    .map(({ dedicada, ...resto }) => resto);

  console.log(`aprovados pelo filtro: ${noticias.length}`);
  noticias.forEach((n) => console.log(`  [${n.data}] ${n.fonte} — ${n.titulo.slice(0, 80)}`));

  const saida = { atualizadoEm: new Date().toISOString(), noticias };
  const fs = await import("node:fs/promises");
  await fs.writeFile(new URL("../public/noticias.json", import.meta.url), JSON.stringify(saida, null, 2), "utf8");
  console.log("gravado em public/noticias.json");
};

principal();

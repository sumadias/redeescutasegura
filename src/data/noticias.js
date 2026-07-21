/* Notícias exibidas em /noticias.
 *
 * PROPOSITALMENTE VAZIO. O layout trazia três notícias de exemplo (campanha
 * Agosto Lilás, lançamento de projeto, parceria com municípios) com datas.
 * Não publicamos essas: num site institucional no ar, notícia de exemplo é
 * lida como notícia de verdade — vira registro falso sobre a organização.
 *
 * Para publicar, acrescentar objetos assim:
 *
 *   {
 *     id: "agosto-lilas-2025",
 *     titulo: "Campanha Agosto Lilás 2025",
 *     data: "2025-08-01",              // ISO, para ordenar e formatar
 *     categoria: "Campanha",           // Campanha | Evento | Informe | Parceria
 *     resumo: "Uma frase sobre o que aconteceu.",
 *     link: "https://…",               // opcional, matéria completa
 *   }
 *
 * A página ordena da mais recente para a mais antiga e monta os filtros
 * sozinha a partir das categorias presentes.
 */

export const NOTICIAS = [];

export const CATEGORIAS_PADRAO = ["Campanha", "Evento", "Informe", "Parceria"];

/* Rede especializada de atendimento à mulher — Paraíba.
 *
 * FONTE: Senado Federal — Observatório da Mulher contra a Violência (OMV),
 * documento oficial "Rede de atendimento à mulher — Paraíba" (rede-pb.pdf).
 * https://www12.senado.leg.br/institucional/omv/pdfs/rede/rede-pb.pdf
 *
 * REGRAS APLICADAS NESTE ARQUIVO:
 *
 * 1. Não duplicamos o que já está no cadastro verificado pela equipe
 *    (DEAM e CREAS de Campina Grande) — esses vêm do Base44.
 *
 * 2. Quando o endereço da fonte oficial DIVERGE de outra fonte, publicamos
 *    apenas o telefone e sinalizamos para a pessoa confirmar por ligação.
 *    Endereço errado em serviço de emergência é risco real.
 *
 * 3. O "Fórum Dr. Manoel Xavier de Carvalho" (Rodovia PB-73, Km 74) consta
 *    da fonte como "Belém do Brejo", sem definir se é Belém ou Belém do Brejo
 *    do Cruz. Fica FORA daqui até a confirmação — não dá para indicar cidade
 *    errada a quem procura ajuda.
 *
 * 4. Casa abrigo NUNCA entra aqui com endereço. Ver TIPOS_SIGILOSOS.
 */

export const FONTE_ESPECIALIZADA =
  "Senado Federal — Observatório da Mulher contra a Violência";

const F = `Fonte: ${FONTE_ESPECIALIZADA}.`;
const CONFIRMAR =
  "Confirme o endereço por telefone antes de se deslocar — há divergência entre as fontes oficiais consultadas.";

function s(id, categoria, servico, telefone, horario, endereco, descricao, orientacao) {
  return {
    id,
    categoria,
    servico,
    telefone,
    horario: horario || "Consultar por telefone",
    endereco: endereco || "",
    descricao: descricao || F,
    orientacao: orientacao || "",
    sigiloso: false,
    local: true,
  };
}

export const SERVICOS_ESPECIALIZADOS = {
  /* Cajazeiras */
  2503704: [
    s("esp-deam-cajazeiras", "Delegacia / DEAM", "Delegacia da Mulher de Cajazeiras",
      "(83) 3531-7005", "24 horas", "Rua Romualdo Rolim, 636 — Remédio"),
  ],

  /* Guarabira */
  2506301: [
    s("esp-deam-guarabira", "Delegacia / DEAM", "Delegacia da Mulher de Guarabira",
      "(83) 3271-2986", null, "Rua Manoel Francisco do Nascimento, s/n — Nordeste I",
      `${F} Telefone alternativo: (83) 3271-4199.`),
  ],

  /* João Pessoa */
  2507507: [
    s("esp-deam-jp", "Delegacia / DEAM", "Delegacia da Mulher — João Pessoa",
      "(83) 3218-5317", null, "",
      `${F} Fica na região central de João Pessoa, na Av. Dom Pedro II.`,
      CONFIRMAR),
    s("esp-dpe-jp", "Defensoria", "Defensoria Pública do Estado da Paraíba",
      "(83) 3221-6327", null, "Rua Deputado Barreto Sobrinho, 168 — Tambiá"),
    s("esp-creas-jp1", "CREAS", "CREAS João Pessoa — PAEFI I",
      "(83) 3214-7058", null, "Rua 13 de Maio — Centro"),
    s("esp-creas-jp2", "CREAS", "CREAS João Pessoa — PAEFI II",
      "(83) 3243-4005", null, "Rua Dep. José Resende da Costa Filho, 189 — Bairro dos Estados"),
    s("esp-creas-jp3", "CREAS", "CREAS João Pessoa — PAEFI III",
      "(83) 3214-1985", null, "Rua Renato Gomes de Oliveira, s/n"),
  ],

  /* Patos */
  2510808: [
    s("esp-deam-patos", "Delegacia / DEAM", "Delegacia da Mulher de Patos",
      "(83) 3423-2237", null, "Rua Elias Asfora, 803 — Jardim Guanabara"),
    s("esp-def-patos", "Defensoria", "Defensoria Pública — Fórum Miguel Sátyro",
      "(83) 3421-5205", null, "Av. Pedro Firmino, s/n — Centro"),
    s("esp-creas-patos", "CREAS", "CREAS Patos",
      "(83) 3421-1471", null, "Rua Bousset Wanderley, 519 — Centro"),
  ],

  /* Campina Grande fica de fora: DEAM, CREAS I/II e Defensoria (NUDEM/NUDAR)
     já estão no cadastro verificado pela equipe em 02/07/2026, que é mais
     específico que a fonte federal. Duplicar só confundiria. */

  /* Santa Rita */
  2513703: [
    s("esp-def-santarita", "Defensoria", "Defensoria Pública — Fórum Juiz João Navarro Filho",
      "(83) 3229-3391", null, "Rua Antenor Navarro, s/n — Centro"),
    s("esp-creas-santarita", "CREAS", "CREAS Santa Rita",
      "(83) 3032-0110", null, "Rua Horácio de Mendonça Furtado, 47 — Centro"),
  ],

  /* Bayeux */
  2501807: [
    s("esp-def-bayeux", "Defensoria", "Defensoria Pública — Fórum Juiz Inácio Machado de Souza",
      "(83) 3232-2498", null, "Av. Liberdade, 3463 — Centro"),
  ],
};

export const MUNICIPIOS_COM_ESPECIALIZADO = Object.keys(SERVICOS_ESPECIALIZADOS);

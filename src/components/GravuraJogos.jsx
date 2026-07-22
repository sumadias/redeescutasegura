/* Gravura da seção Jogos Educativos: um livro aberto (aprender) com peças de
 * jogo saindo dele — peça de quebra-cabeça, dado e o coração da marca —
 * ligados por uma trilha pontilhada, que é a ideia de jornada dos três jogos.
 *
 * Mesma linguagem do mapa da Paraíba: neon feito com traços empilhados (largo
 * e translúcido embaixo, fino e claro em cima) em vez de feGaussianBlur. Filtro
 * sobre área grande obriga o navegador a rasterizar tudo a cada repintura e já
 * travou o renderizador uma vez neste projeto.
 *
 * Decorativa — por isso aria-hidden.
 */
export default function GravuraJogos({ className = "" }) {
  return (
    <svg viewBox="0 0 620 440" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="jgAura" cx="50%" cy="52%" r="58%">
          <stop offset="0%" stopColor="#FF2D78" stopOpacity="0.30" />
          <stop offset="60%" stopColor="#C81E63" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#5327B0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="jgPagina" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id="jgCoracao" cx="42%" cy="34%" r="75%">
          <stop offset="0" stopColor="#FFE3EF" />
          <stop offset="45%" stopColor="#FF8FBC" />
          <stop offset="100%" stopColor="#FF3D8F" />
        </radialGradient>
      </defs>

      <ellipse cx="310" cy="230" rx="300" ry="200" fill="url(#jgAura)" />

      {/* trilha pontilhada: a jornada que liga as peças */}
      <path
        d="M120 196 C 175 96, 265 78, 310 128 C 356 178, 440 150, 496 92"
        fill="none" stroke="#FFB3D2" strokeOpacity="0.55" strokeWidth="2"
        strokeDasharray="2 12" strokeLinecap="round"
      />

      {/* ---------- livro aberto ---------- */}
      <g>
        {/* páginas */}
        <path d="M310 262 C 262 232, 190 226, 132 240 L 132 356 C 190 342, 262 348, 310 378 Z"
          fill="url(#jgPagina)" />
        <path d="M310 262 C 358 232, 430 226, 488 240 L 488 356 C 430 342, 358 348, 310 378 Z"
          fill="url(#jgPagina)" />

        {/* contorno neon, em camadas */}
        <g fill="none" strokeLinejoin="round" strokeLinecap="round">
          <path d="M310 262 C 262 232, 190 226, 132 240 L 132 356 C 190 342, 262 348, 310 378 C 358 348, 430 342, 488 356 L 488 240 C 430 226, 358 232, 310 262 Z"
            stroke="#FF2D78" strokeOpacity="0.12" strokeWidth="14" />
          <path d="M310 262 C 262 232, 190 226, 132 240 L 132 356 C 190 342, 262 348, 310 378 C 358 348, 430 342, 488 356 L 488 240 C 430 226, 358 232, 310 262 Z"
            stroke="#FF2D78" strokeOpacity="0.30" strokeWidth="7" />
          <path d="M310 262 C 262 232, 190 226, 132 240 L 132 356 C 190 342, 262 348, 310 378 C 358 348, 430 342, 488 356 L 488 240 C 430 226, 358 232, 310 262 Z"
            stroke="#FF3D8F" strokeOpacity="0.9" strokeWidth="2.6" />
          <path d="M310 262 C 262 232, 190 226, 132 240 L 132 356 C 190 342, 262 348, 310 378 C 358 348, 430 342, 488 356 L 488 240 C 430 226, 358 232, 310 262 Z"
            stroke="#FFD9EA" strokeOpacity="0.95" strokeWidth="0.9" />

          {/* lombada */}
          <path d="M310 262 L 310 378" stroke="#FF2D78" strokeOpacity="0.35" strokeWidth="6" />
          <path d="M310 262 L 310 378" stroke="#FFD9EA" strokeOpacity="0.9" strokeWidth="1.4" />

          {/* linhas de texto sugeridas */}
          <g stroke="#FFC2DC" strokeOpacity="0.42" strokeWidth="2.4">
            <path d="M172 274 C 214 270, 254 276, 284 288" />
            <path d="M172 300 C 214 296, 254 302, 284 314" />
            <path d="M172 326 C 208 322, 242 326, 268 334" />
            <path d="M336 288 C 366 276, 406 270, 448 274" />
            <path d="M336 314 C 366 302, 406 296, 448 300" />
            <path d="M352 334 C 378 326, 412 322, 448 326" />
          </g>
        </g>
      </g>

      {/* ---------- peça de quebra-cabeça ----------
           Desenhada com curvas cúbicas, não com arcos: a versão com <A> saía
           deformada, parecendo uma luva. Nas cúbicas, pontos de controle fora
           da aresta produzem o encaixe de forma previsível. */}
      <g transform="translate(62 150) rotate(-14) scale(0.82)">
        <path
          d="M8 26 L30 26 C30 10, 62 10, 62 26 L84 26 L84 48 C100 48, 100 80, 84 80 L84 102 L8 102 Z"
          fill="#FF2D78" fillOpacity="0.10" stroke="#FF3D8F" strokeOpacity="0.85" strokeWidth="2.9"
          strokeLinejoin="round"
        />
        <path
          d="M8 26 L30 26 C30 10, 62 10, 62 26 L84 26 L84 48 C100 48, 100 80, 84 80 L84 102 L8 102 Z"
          fill="none" stroke="#FFD9EA" strokeOpacity="0.85" strokeWidth="1.1" strokeLinejoin="round"
        />
      </g>

      {/* ---------- dado ---------- */}
      <g transform="translate(452 44) rotate(12)">
        <rect x="0" y="0" width="86" height="86" rx="20"
          fill="#FF2D78" fillOpacity="0.10" stroke="#FF3D8F" strokeOpacity="0.85" strokeWidth="2.4" />
        <rect x="0" y="0" width="86" height="86" rx="20"
          fill="none" stroke="#FFD9EA" strokeOpacity="0.8" strokeWidth="0.9" />
        <g fill="#FFD9EA" fillOpacity="0.92">
          <circle cx="24" cy="24" r="6.5" />
          <circle cx="62" cy="24" r="6.5" />
          <circle cx="43" cy="43" r="6.5" />
          <circle cx="24" cy="62" r="6.5" />
          <circle cx="62" cy="62" r="6.5" />
        </g>
      </g>

      {/* ---------- coração da marca ---------- */}
      <g transform="translate(268 62)">
        <circle cx="42" cy="42" r="54" fill="#FF2D78" opacity="0.10" />
        <circle cx="42" cy="42" r="34" fill="#FF4D8D" opacity="0.16" />
        <g transform="translate(0 0) scale(0.84)">
          <path
            d="M50,88 C22,66 8,50 8,32 C8,18 18,10 30,10 C40,10 47,17 50,24 C53,17 60,10 70,10 C82,10 92,18 92,32 C92,50 78,66 50,88 Z"
            fill="url(#jgCoracao)" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="2.4"
          />
          <ellipse cx="34" cy="28" rx="10" ry="7" fill="#FFFFFF" opacity="0.5" />
        </g>
      </g>

      {/* brilhos */}
      <g fill="#FFD9EA" fillOpacity="0.75">
        <circle cx="186" cy="106" r="3" />
        <circle cx="410" cy="176" r="2.4" />
        <circle cx="556" cy="182" r="3" />
        <circle cx="86" cy="288" r="2.4" />
        <circle cx="536" cy="316" r="2.6" />
      </g>
    </svg>
  );
}

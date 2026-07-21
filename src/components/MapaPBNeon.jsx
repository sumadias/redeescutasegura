import { PB_VIEWBOX, PB_CONTORNO, PB_MUNICIPIOS } from "@/data/malhaPB";

/* Silhueta da Paraíba em neon, com o coração da marca sobre o estado.
 *
 * O efeito neon é feito com traços empilhados (largo e translúcido embaixo,
 * fino e claro em cima) em vez de feGaussianBlur. A primeira versão usava
 * filtros SVG e travava o renderizador: um blur sobre a malha dos 223
 * municípios obriga o navegador a rasterizar a área inteira do viewBox a cada
 * repintura. Traço empilhado dá o mesmo resultado visual e é praticamente de
 * graça — o que importa num público que abre isto em celular simples e 3G.
 *
 * Só o coração usa filtro: a região dele é pequena, então o custo é pontual.
 *
 * Decorativo — a informação real de localização está no filtro por cidade.
 */
export default function MapaPBNeon({ className = "" }) {
  return (
    <svg viewBox={PB_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="pbAura" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FF2D78" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#C81E63" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1A1145" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pbHeart" cx="42%" cy="34%" r="75%">
          <stop offset="0%" stopColor="#FFE3EF" />
          <stop offset="45%" stopColor="#FF8FBC" />
          <stop offset="100%" stopColor="#FF3D8F" />
        </radialGradient>
        <filter id="pbHeartGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* brilho difuso atrás do estado */}
      <ellipse cx="500" cy="289" rx="470" ry="285" fill="url(#pbAura)" />

      {/* divisas municipais — as "linhas de energia" */}
      <g fill="none" strokeLinejoin="round">
        <path d={PB_MUNICIPIOS} stroke="#FF2D78" strokeOpacity="0.16" strokeWidth="3.2" />
        <path d={PB_MUNICIPIOS} stroke="#FF4D8D" strokeOpacity="0.38" strokeWidth="1.3" />
        <path d={PB_MUNICIPIOS} stroke="#FFC2DC" strokeOpacity="0.5" strokeWidth="0.45" />
      </g>

      {/* contorno do estado */}
      <g fill="none" strokeLinejoin="round">
        <path d={PB_CONTORNO} stroke="#FF2D78" strokeOpacity="0.10" strokeWidth="14" />
        <path d={PB_CONTORNO} stroke="#FF2D78" strokeOpacity="0.22" strokeWidth="7" />
        <path d={PB_CONTORNO} stroke="#FF3D8F" strokeOpacity="0.85" strokeWidth="2.6" />
        <path d={PB_CONTORNO} stroke="#FFD9EA" strokeOpacity="0.95" strokeWidth="0.9" />
      </g>

      {/* coração da marca, sobre Campina Grande (aprox. -7.22 / -35.88) */}
      <g transform="translate(727 337)">
        <circle r="96" fill="#FF2D78" opacity="0.10" />
        <circle r="62" fill="#FF2D78" opacity="0.16" />
        <circle r="38" fill="#FF4D8D" opacity="0.20" />
        <g filter="url(#pbHeartGlow)" transform="translate(-45 -42) scale(0.9)">
          <path
            d="M50,88 C22,66 8,50 8,32 C8,18 18,10 30,10 C40,10 47,17 50,24 C53,17 60,10 70,10 C82,10 92,18 92,32 C92,50 78,66 50,88 Z"
            fill="url(#pbHeart)" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="2.5"
          />
          <ellipse cx="34" cy="28" rx="10" ry="7" fill="#FFFFFF" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
}

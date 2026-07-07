// Gravuras SVG — inspiração xilogravura nordestina/cordel
// Traço estilo carimbo, uma cor por motivo, custo zero.
// Todos com fill="none", aria-hidden="true" e props size, color, opacity.

export const GravuraBroto = ({ size = 64, color = "#0F766E", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} aria-hidden="true">
    <path d="M40 68 V30"/>
    <path d="M40 44 C40 44 24 42 20 26 C36 26 40 40 40 44 Z"/>
    <path d="M40 36 C40 36 56 34 60 18 C44 18 40 32 40 36 Z"/>
    <path d="M40 30 C40 22 44 16 40 10 C36 16 40 22 40 30" strokeWidth="2.2"/>
    <path d="M20 68 H60" strokeWidth="3"/>
    <path d="M28 74 H52" strokeWidth="2" opacity=".5"/>
  </svg>
);

export const GravuraSol = ({ size = 64, color = "#9A3412", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} aria-hidden="true">
    <circle cx="40" cy="40" r="13"/>
    <circle cx="40" cy="40" r="5" fill={color} stroke="none"/>
    <g strokeWidth="2.4">
      <path d="M40 18 L40 8"/><path d="M40 62 L40 72"/><path d="M18 40 L8 40"/><path d="M62 40 L72 40"/>
      <path d="M55 25 L62 18"/><path d="M25 55 L18 62"/><path d="M55 55 L62 62"/><path d="M25 25 L18 18"/>
    </g>
  </svg>
);

export const GravuraAbrigo = ({ size = 64, color = "#0F766E", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} aria-hidden="true">
    <path d="M14 40 C14 26 26 18 40 18 C54 18 66 26 66 40"/>
    <path d="M8 40 H72"/>
    <path d="M40 18 V8"/>
    <circle cx="40" cy="8" r="2.4" fill={color} stroke="none"/>
    <path d="M22 40 V58 M40 40 V62 M58 40 V58" strokeWidth="2.2"/>
    <path d="M16 64 H64" strokeWidth="3"/>
  </svg>
);

export const GravuraCoracao = ({ size = 64, color = "#9F1239", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} aria-hidden="true">
    <path d="M24 30 C24 22 32 18 40 24 C48 18 56 22 56 30 C56 42 44 50 40 54 C36 50 24 42 24 30 Z"/>
    <path d="M40 24 V54" strokeWidth="1.8" opacity=".45"/>
    <path d="M12 62 C26 56 54 56 68 62" strokeWidth="2.2"/>
    <path d="M18 70 C30 65 50 65 62 70" strokeWidth="1.8" opacity=".5"/>
  </svg>
);

export const GravuraCaminho = ({ size = 64, color = "#15803D", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} aria-hidden="true">
    <path d="M40 70 C40 70 14 52 14 32 C14 20 24 12 34 16 C38 18 40 22 40 22 C40 22 42 18 46 16 C56 12 66 20 66 32 C66 38 63 44 59 49"/>
    <path d="M46 58 C52 54 58 54 64 58 M46 66 C52 62 58 62 64 66" strokeWidth="2.2"/>
  </svg>
);

export const GravuraGota = ({ size = 64, color = "#0F766E", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} aria-hidden="true">
    <path d="M40 14 C46 24 54 28 54 38 C54 46 48 52 40 52 C32 52 26 46 26 38 C26 28 34 24 40 14 Z"/>
    <path d="M40 52 V66"/>
    <path d="M40 60 C36 58 32 58 28 60 M40 64 C44 62 48 62 52 64" strokeWidth="2"/>
    <circle cx="40" cy="38" r="5" opacity=".5"/>
  </svg>
);

export const GravuraMaos = ({ size = 64, color = "#9A3412", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} aria-hidden="true">
    <path d="M22 50 C14 44 12 32 20 24 C22 34 28 38 34 40"/>
    <path d="M58 50 C66 44 68 32 60 24 C58 34 52 38 46 40"/>
    <path d="M22 50 C22 60 30 66 40 66 C50 66 58 60 58 50 C58 46 54 42 48 42 H32 C26 42 22 46 22 50 Z"/>
    <path d="M40 34 C40 28 36 24 40 18 C44 24 40 28 40 34" strokeWidth="2.2"/>
  </svg>
);

export const GravuraPassarinha = ({ size = 64, color = "#57534E", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} aria-hidden="true">
    <path d="M30 44 C18 44 12 36 14 26 C24 24 32 30 34 38"/>
    <path d="M34 38 C36 28 44 20 58 20 C60 34 50 44 38 44 Z"/>
    <path d="M34 44 C30 52 30 58 34 66" strokeWidth="2.2"/>
    <path d="M28 62 C32 60 38 60 42 62" strokeWidth="2"/>
  </svg>
);

export const DivisorCostura = ({ width = 180, color = "#D6D3D1" }) => (
  <svg width={width} height="12" viewBox="0 0 180 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 6 Q14 1 24 6 T44 6 T64 6 T84 6 T104 6 T124 6 T144 6 T164 6 L176 6"/>
  </svg>
);
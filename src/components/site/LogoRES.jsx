/* Marca da Rede Escuta Segura: anel roxo + coração. Mesmo desenho do favicon
   e do kit de logo, redesenhado como componente para o site institucional.
   `escuro` inverte o texto para uso sobre fundo roxo (rodapé). */
export default function LogoRES({ tamanho = 40, escuro = false, semTexto = false, id = "res" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        viewBox="0 0 512 512"
        style={{ width: tamanho, height: tamanho }}
        className="flex-shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={`${id}Anel`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={escuro ? "#C4B5FD" : "#5B4BB8"} />
            <stop offset="1" stopColor={escuro ? "#F5F3FF" : "#8360D6"} />
          </linearGradient>
          <radialGradient id={`${id}Cor`} cx="42%" cy="34%" r="75%">
            <stop offset="0" stopColor="#FDE7F0" />
            <stop offset="45%" stopColor="#F8AECB" />
            <stop offset="100%" stopColor="#EE7DA9" />
          </radialGradient>
        </defs>
        <circle cx="256" cy="256" r="150" fill="none" stroke={`url(#${id}Anel)`} strokeWidth="34" />
        <g transform="translate(171,179) scale(1.7)">
          <path
            d="M50,88 C22,66 8,50 8,32 C8,18 18,10 30,10 C40,10 47,17 50,24 C53,17 60,10 70,10 C82,10 92,18 92,32 C92,50 78,66 50,88 Z"
            fill={`url(#${id}Cor)`}
          />
        </g>
      </svg>
      {!semTexto && (
        <span
          className="font-bold text-[13px] leading-[1.15] tracking-tight"
          style={{ color: escuro ? "#FFFFFF" : "#1F1B33" }}
        >
          Rede<br />Escuta<br />Segura
        </span>
      )}
    </span>
  );
}

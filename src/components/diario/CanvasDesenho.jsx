import { useRef, useEffect, useState, useCallback } from "react";
import { Trash2, Eraser } from "lucide-react";

const CORES = [
  { label: "Grafite", value: "#292524" },
  { label: "Teal",    value: "#0F766E" },
  { label: "Verde",   value: "#15803D" },
  { label: "Vinho",   value: "#9F1239" },
];

const LINHAS = [
  { label: "Fino",  value: 2 },
  { label: "Médio", value: 5 },
];

export default function CanvasDesenho({ onGuardar, onCancelar }) {
  const canvasRef = useRef(null);
  const [cor, setCor] = useState("#292524");
  const [espessura, setEspessura] = useState(2);
  const [borracha, setBorracha] = useState(false);
  const desenhando = useRef(false);
  const ultimoPonto = useRef(null);

  // Desenha as linhas pautadas no fundo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = 280;
    ctx.fillStyle = "#FFFBF7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#F0EDE8";
    ctx.lineWidth = 1;
    for (let y = 28; y < canvas.height; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  function getPonto(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function iniciar(e) {
    e.preventDefault();
    desenhando.current = true;
    ultimoPonto.current = getPonto(e);
  }

  function mover(e) {
    e.preventDefault();
    if (!desenhando.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ponto = getPonto(e);
    ctx.beginPath();
    ctx.moveTo(ultimoPonto.current.x, ultimoPonto.current.y);
    ctx.lineTo(ponto.x, ponto.y);
    ctx.strokeStyle = borracha ? "#FFFBF7" : cor;
    ctx.lineWidth = borracha ? 20 : espessura;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ultimoPonto.current = ponto;
  }

  function parar(e) {
    e.preventDefault();
    desenhando.current = false;
    ultimoPonto.current = null;
  }

  function limpar() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFBF7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#F0EDE8";
    ctx.lineWidth = 1;
    for (let y = 28; y < canvas.height; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  function guardar() {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    onGuardar(dataUrl);
  }

  return (
    <div className="space-y-3">
      {/* Barra de ferramentas */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Cores */}
        <div className="flex gap-1.5" role="group" aria-label="Cores do pincel">
          {CORES.map(c => (
            <button
              key={c.value}
              onClick={() => { setCor(c.value); setBorracha(false); }}
              aria-label={`Cor ${c.label}`}
              aria-pressed={cor === c.value && !borracha}
              className="w-8 h-8 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                background: c.value,
                borderColor: cor === c.value && !borracha ? "#fff" : "transparent",
                boxShadow: cor === c.value && !borracha ? `0 0 0 3px ${c.value}` : "none",
              }}
            />
          ))}
        </div>

        {/* Espessura */}
        <div className="flex gap-1" role="group" aria-label="Espessura do traço">
          {LINHAS.map(l => (
            <button
              key={l.value}
              onClick={() => { setEspessura(l.value); setBorracha(false); }}
              aria-label={`Traço ${l.label}`}
              aria-pressed={espessura === l.value && !borracha}
              className="h-8 px-3 rounded-lg text-xs font-semibold border-2 transition-all focus:outline-none focus:ring-2"
              style={{
                borderColor: espessura === l.value && !borracha ? "#292524" : "#E7E5E4",
                background: espessura === l.value && !borracha ? "#292524" : "#fff",
                color: espessura === l.value && !borracha ? "#fff" : "#57534E",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Borracha */}
        <button
          onClick={() => setBorracha(!borracha)}
          aria-label="Borracha"
          aria-pressed={borracha}
          className="h-8 px-3 rounded-lg text-xs font-semibold border-2 flex items-center gap-1 transition-all focus:outline-none focus:ring-2"
          style={{
            borderColor: borracha ? "#9F1239" : "#E7E5E4",
            background: borracha ? "#FFF1F2" : "#fff",
            color: borracha ? "#9F1239" : "#57534E",
          }}
        >
          <Eraser className="w-3.5 h-3.5" /> Borracha
        </button>

        {/* Limpar */}
        <button
          onClick={limpar}
          aria-label="Limpar desenho"
          className="h-8 px-3 rounded-lg text-xs font-semibold border-2 flex items-center gap-1 transition-all focus:outline-none focus:ring-2"
          style={{ borderColor: "#E7E5E4", color: "#78716C", background: "#fff" }}
        >
          <Trash2 className="w-3.5 h-3.5" /> Limpar
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Área de desenho do diário"
        className="w-full rounded-lg touch-none cursor-crosshair"
        style={{ border: "1px dashed #D6D3D1", display: "block" }}
        onPointerDown={iniciar}
        onPointerMove={mover}
        onPointerUp={parar}
        onPointerLeave={parar}
      />

      {/* Botões finais */}
      <div className="flex gap-2">
        <button
          onClick={onCancelar}
          className="flex-1 h-10 rounded-lg border text-sm font-medium transition-colors focus:outline-none focus:ring-2"
          style={{ borderColor: "#D6D3D1", color: "#57534E", background: "#fff" }}
        >
          Cancelar
        </button>
        <button
          onClick={guardar}
          aria-label="Guardar desenho e anexar ao registro"
          className="flex-1 h-10 rounded-lg text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2"
          style={{ background: "#0F766E" }}
        >
          Guardar desenho
        </button>
      </div>
    </div>
  );
}
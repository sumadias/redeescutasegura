import { useState, useRef, useEffect } from "react";
import { Mic, Square, Trash2, Play, Pause } from "lucide-react";

const MAX_SEGUNDOS = 180; // 3 min

export default function GravadorAudio({ onGuardar, onCancelar }) {
  const [estado, setEstado] = useState("idle"); // idle | gravando | gravado
  const [segundos, setSegundos] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [tocando, setTocando] = useState(false);
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    if (mediaRef.current?.state === "recording") mediaRef.current.stop();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, []);

  async function iniciarGravacao() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = e => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        setEstado("gravado");
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.start();
      mediaRef.current = recorder;
      setSegundos(0);
      setEstado("gravando");
      timerRef.current = setInterval(() => {
        setSegundos(s => {
          if (s + 1 >= MAX_SEGUNDOS) { pararGravacao(); return s + 1; }
          return s + 1;
        });
      }, 1000);
    } catch {
      alert("Não foi possível acessar o microfone.");
    }
  }

  function pararGravacao() {
    clearInterval(timerRef.current);
    if (mediaRef.current?.state === "recording") mediaRef.current.stop();
  }

  function descartarAudio() {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setEstado("idle");
    setSegundos(0);
    setTocando(false);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (tocando) { audio.pause(); setTocando(false); }
    else { audio.play(); setTocando(true); }
  }

  function formatarTempo(s) {
    const m = Math.floor(s / 60);
    const seg = s % 60;
    return `${m}:${String(seg).padStart(2, "0")}`;
  }

  async function guardar() {
    if (!audioUrl) return;
    const resp = await fetch(audioUrl);
    const blob = await resp.blob();
    onGuardar(blob, audioUrl);
  }

  return (
    <div className="rounded-xl border p-4 space-y-3" style={{ background: "#fff", borderColor: "#E7E5E4" }}>
      {estado === "idle" && (
        <button
          onClick={iniciarGravacao}
          aria-label="Iniciar gravação de áudio"
          className="w-full h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 focus:outline-none focus:ring-2"
          style={{ background: "#FFF1F2", color: "#9F1239", border: "2px dashed #9F1239" }}
        >
          <Mic className="w-5 h-5" /> Iniciar gravação
        </button>
      )}

      {estado === "gravando" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
              <span className="text-sm font-semibold" style={{ color: "#B91C1C" }}>Gravando… {formatarTempo(segundos)}</span>
            </div>
            <span className="text-xs" style={{ color: "#A8A29E" }}>máx 3 min</span>
          </div>
          <button
            onClick={pararGravacao}
            aria-label="Parar gravação"
            className="w-full h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white focus:outline-none focus:ring-2"
            style={{ background: "#B91C1C" }}
          >
            <Square className="w-4 h-4" /> Parar
          </button>
        </div>
      )}

      {estado === "gravado" && audioUrl && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={tocando ? "Pausar áudio" : "Reproduzir áudio"}
              className="w-10 h-10 rounded-full flex items-center justify-center focus:outline-none focus:ring-2"
              style={{ background: "#F0FDFA" }}
            >
              {tocando ? <Pause className="w-5 h-5" style={{ color: "#0F766E" }} /> : <Play className="w-5 h-5" style={{ color: "#0F766E" }} />}
            </button>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: "#292524" }}>Áudio gravado</p>
              <p className="text-xs" style={{ color: "#78716C" }}>{formatarTempo(segundos)}</p>
            </div>
            <button onClick={descartarAudio} aria-label="Descartar áudio" className="p-1 focus:outline-none focus:ring-2 rounded">
              <Trash2 className="w-4 h-4" style={{ color: "#B91C1C" }} />
            </button>
          </div>
          <audio ref={audioRef} src={audioUrl} onEnded={() => setTocando(false)} className="hidden" />
          <div className="flex gap-2">
            <button
              onClick={onCancelar}
              className="flex-1 h-10 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2"
              style={{ borderColor: "#D6D3D1", color: "#57534E" }}
            >
              Cancelar
            </button>
            <button
              onClick={guardar}
              aria-label="Guardar áudio no diário"
              className="flex-1 h-10 rounded-xl text-sm font-semibold text-white focus:outline-none focus:ring-2"
              style={{ background: "#9F1239" }}
            >
              Guardar áudio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
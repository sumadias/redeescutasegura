import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";
import { base44 } from "@/api/base44Client";
import { getOrCreateAnonymousId } from "@/lib/anonymousId";

const EMOCAO_VALOR = {
  otima: 5,
  bem: 4,
  neutro: 3,
  triste: 2,
  muito_triste: 1,
};

const EMOCAO_LABEL = {
  otima: "Ótima",
  bem: "Bem",
  neutro: "Neutro",
  triste: "Triste",
  muito_triste: "Muito triste",
};

const EMOCAO_COR = {
  5: "#15803D",
  4: "#0F766E",
  3: "#B45309",
  2: "#9F1239",
  1: "#881337",
};

const EMOCAO_EMOJI = {
  otima: "😊",
  bem: "🙂",
  neutro: "😐",
  triste: "😔",
  muito_triste: "😢",
};

function formatarData(iso) {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function MiniGraficoSVG({ dados }) {
  if (!dados.length) return null;

  const W = 320;
  const H = 120;
  const padX = 24;
  const padY = 16;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;

  const pontos = dados.map((d, i) => {
    const x = padX + (i / Math.max(dados.length - 1, 1)) * innerW;
    const y = padY + (1 - (d.valor - 1) / 4) * innerH;
    return { x, y, ...d };
  });

  const pathD = pontos
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: W, display: "block" }}
      aria-label="Gráfico de humor dos últimos 30 dias"
      role="img"
    >
      {/* Grade horizontal */}
      {[1, 2, 3, 4, 5].map(v => {
        const y = padY + (1 - (v - 1) / 4) * innerH;
        return (
          <line key={v} x1={padX} y1={y} x2={W - padX} y2={y}
            stroke="#e5e7eb" strokeWidth="1" />
        );
      })}

      {/* Linha do humor */}
      <path d={pathD} fill="none" stroke="#0F766E" strokeWidth="2.5"
        strokeLinejoin="round" strokeLinecap="round" />

      {/* Pontos */}
      {pontos.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5}
          fill={EMOCAO_COR[p.valor]} stroke="#fff" strokeWidth="2" />
      ))}
    </svg>
  );
}

export default function GraficoHumor() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const anonId = getOrCreateAnonymousId();
    const trinta = new Date();
    trinta.setDate(trinta.getDate() - 30);
    const cutoff = trinta.toISOString().split("T")[0];

    base44.entities.DiarioEmocao.filter({ anonymous_id: anonId }, "data", 60)
      .then(registros => {
        const recentes = registros
          .filter(r => r.data >= cutoff)
          .sort((a, b) => a.data.localeCompare(b.data));
        setDados(recentes.map(r => ({
          data: r.data,
          emocao: r.emocao,
          valor: EMOCAO_VALOR[r.emocao] || 3,
        })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalDias = dados.length;
  const ultimo = dados[dados.length - 1];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAFAF9" }}>
      <QuickExitButton />

      <main className="flex-1 px-4 pt-14 pb-10 max-w-md mx-auto w-full space-y-6">
        {/* Header */}
        <div className="pt-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#57534E" }} />
          </button>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "#292524" }}>Como estou ao longo do tempo</h1>
            <p className="text-sm" style={{ color: "#57534E" }}>Seus registros do diário — últimos 30 dias</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : totalDias === 0 ? (
          <div className="rounded-2xl p-6 text-center space-y-3" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
            <p className="text-4xl">📓</p>
            <p className="font-semibold" style={{ color: "#292524" }}>Nenhum registro ainda</p>
            <p className="text-sm leading-relaxed" style={{ color: "#57534E" }}>
              Quando você registrar como está se sentindo no Diário de emoções, os dados aparecerão aqui.
            </p>
            <button
              onClick={() => navigate("/app/diario")}
              className="h-11 px-6 rounded-xl text-white text-sm font-medium transition-all active:scale-95 focus:outline-none focus:ring-2"
              style={{ background: "#0F766E" }}
            >
              Abrir o diário
            </button>
          </div>
        ) : (
          <>
            {/* Frase gentil */}
            <div className="rounded-2xl px-5 py-4" style={{ background: "#F0FDFA", border: "1px solid #0F766E22" }}>
              <p className="text-base font-medium" style={{ color: "#0F766E" }}>
                Você registrou <strong>{totalDias}</strong> {totalDias === 1 ? "dia" : "dias"} neste período.
              </p>
              {ultimo && (
                <p className="text-sm mt-1" style={{ color: "#57534E" }}>
                  Último registro: {EMOCAO_EMOJI[ultimo.emocao]} {EMOCAO_LABEL[ultimo.emocao]} em {formatarData(ultimo.data)}
                </p>
              )}
            </div>

            {/* Gráfico */}
            <div className="rounded-2xl p-4" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "#78716C" }}>HUMOR AO LONGO DO TEMPO</p>
              <MiniGraficoSVG dados={dados} />
              {/* Legenda eixo Y */}
              <div className="flex justify-between mt-3 text-xs" style={{ color: "#78716C" }}>
                <span>😢 Muito triste</span>
                <span>😊 Ótima</span>
              </div>
            </div>

            {/* Lista dos últimos registros */}
            <div className="space-y-2">
              <p className="text-sm font-semibold" style={{ color: "#57534E" }}>Registros recentes</p>
              {[...dados].reverse().slice(0, 7).map((d, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
                  <span className="text-xl">{EMOCAO_EMOJI[d.emocao]}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: "#292524" }}>{EMOCAO_LABEL[d.emocao]}</p>
                    <p className="text-xs" style={{ color: "#78716C" }}>{formatarData(d.data)}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ background: EMOCAO_COR[d.valor] }} />
                </div>
              ))}
            </div>

            <p className="text-xs text-center px-4 leading-relaxed" style={{ color: "#A8A29E" }}>
              Estes dados são visíveis apenas para você. Nenhum profissional ou administrador tem acesso.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
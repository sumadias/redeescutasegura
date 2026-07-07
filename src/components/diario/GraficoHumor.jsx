import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from "recharts";
import { EMOCOES } from "./SeletorEmocao";

const EMOCAO_SCORE = { otima: 5, bem: 4, neutro: 3, triste: 2, muito_triste: 1 };

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const emocao = EMOCOES.find(e => e.value === d.emocao);
  return (
    <div className="bg-white border border-border rounded-xl shadow-lg px-3 py-2 text-center">
      <span className="text-2xl">{emocao?.emoji}</span>
      <p className="text-xs font-bold mt-0.5">{d.diaSemana}</p>
      <p className="text-xs text-muted-foreground">{emocao?.label}</p>
      {d.nota && <p className="text-xs italic text-foreground mt-1 max-w-[120px]">"{d.nota}"</p>}
    </div>
  );
}

export default function GraficoHumor({ registros }) {
  if (!registros?.length) return (
    <div className="h-40 flex items-center justify-center text-sm text-muted-foreground text-center px-4">
      <p>Nenhum registro esta semana.<br />Comece registrando seu humor hoje! 💜</p>
    </div>
  );

  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const data = registros.map(r => ({
    ...r,
    score: EMOCAO_SCORE[r.emocao] ?? 3,
    diaSemana: dias[new Date(r.data + "T12:00:00").getDay()],
  }));

  const emojiTick = (score) => EMOCOES.find(e => EMOCAO_SCORE[e.value] === score)?.emoji || "";

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="diaSemana" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tickFormatter={emojiTick} tick={{ fontSize: 14 }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={3} stroke="#e5e7eb" strokeDasharray="4 2" />
        <Line
          type="monotoneX"
          dataKey="score"
          stroke="#8b5cf6"
          strokeWidth={2.5}
          dot={{ fill: "#8b5cf6", r: 5, strokeWidth: 2, stroke: "white" }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
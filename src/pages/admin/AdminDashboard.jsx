import { Users, ArrowLeftRight, Award, AlertTriangle, TrendingUp, TrendingDown, FlaskConical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatCard from "@/components/StatCard";
import { mockIndicadores, monthlyData } from "@/lib/mockData";

export default function AdminDashboard() {
  const redIncrease = 22; // mock >20%

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Visão Geral — Campina Grande/PB</h1>
        <p className="text-sm text-muted-foreground">Painel Administrativo Municipal</p>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg w-fit" style={{ background: "#FEF3C7" }}>
        <FlaskConical className="w-4 h-4 shrink-0" style={{ color: "#92400E" }} />
        <span className="text-xs font-semibold" style={{ color: "#92400E" }}>Dados de demonstração</span>
      </div>

      {redIncrease > 20 && (
        <Card className="p-4 bg-red-50 border-2 border-red-300 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
          <div>
            <p className="font-bold text-sm text-red-800">⚠️ Alerta: Risco vermelho aumentou {redIncrease}% nos últimos 7 dias</p>
            <p className="text-xs text-red-600">Recomenda-se revisão dos protocolos de atendimento emergencial</p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total de Casos" value={mockIndicadores.total_atendidas} icon={Users} trend={12} />
        <StatCard title="Encaminhamentos" value={mockIndicadores.encaminhamentos_total} icon={ArrowLeftRight} trend={8} />
        <StatCard title="Certificações" value={mockIndicadores.certificadas} icon={Award} trend={25} />
        <StatCard title="Risco Vermelho" value={mockIndicadores.risco_vermelho} icon={AlertTriangle} color="text-red-600" trend={-5} />
      </div>

      <Card className="p-5">
        <h3 className="font-bold text-sm mb-4">Evolução Municipal — Últimos 6 Meses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="atendimentos" stroke="#0F766E" strokeWidth={2} name="Atendimentos" />
            <Line type="monotone" dataKey="encaminhamentos" stroke="#9A3412" strokeWidth={2} name="Encaminhamentos" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-3xl font-extrabold text-green-600">+12%</p>
          <p className="text-xs text-muted-foreground mt-1">Atendimentos vs mês anterior</p>
        </Card>
        <Card className="p-5 text-center">
          <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-3xl font-extrabold text-primary">+25%</p>
          <p className="text-xs text-muted-foreground mt-1">Certificações vs mês anterior</p>
        </Card>
        <Card className="p-5 text-center">
          <TrendingDown className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <p className="text-3xl font-extrabold text-amber-600">{mockIndicadores.tempo_medio}</p>
          <p className="text-xs text-muted-foreground mt-1">Tempo médio de encaminhamento</p>
        </Card>
      </div>
    </div>
  );
}
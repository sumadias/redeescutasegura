import { Users, ArrowLeftRight, CheckCircle, Clock, GraduationCap, AlertTriangle, FlaskConical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import StatCard from "@/components/StatCard";
import { mockIndicadores, monthlyData, serviceAccessData } from "@/lib/mockData";

const riskData = [
  { name: "Verde", value: mockIndicadores.risco_verde, color: "#22c55e" },
  { name: "Amarelo", value: mockIndicadores.risco_amarelo, color: "#eab308" },
  { name: "Vermelho", value: mockIndicadores.risco_vermelho, color: "#ef4444" },
];

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão geral dos atendimentos</p>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg w-fit" style={{ background: "#FEF3C7" }}>
        <FlaskConical className="w-4 h-4 shrink-0" style={{ color: "#92400E" }} />
        <span className="text-xs font-semibold" style={{ color: "#92400E" }}>Dados de demonstração</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Atendidas" value={mockIndicadores.total_atendidas} icon={Users} trend={12} />
        <StatCard title="Encaminhamentos" value={mockIndicadores.encaminhamentos_total} icon={ArrowLeftRight} trend={8} />
        <StatCard title="Pendentes" value={mockIndicadores.encaminhamentos_pendentes} icon={Clock} color="text-amber-600" />
        <StatCard title="Certificadas" value={mockIndicadores.certificadas} icon={GraduationCap} trend={25} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-bold text-sm mb-4">Distribuição por Nível de Risco</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={riskData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {riskData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-bold text-sm mb-4">Evolução Mensal</h3>
          <ResponsiveContainer width="100%" height={250}>
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
      </div>

      <Card className="p-5">
        <h3 className="font-bold text-sm mb-4">Serviços Mais Acessados</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={serviceAccessData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
            <Tooltip />
            <Bar dataKey="value" fill="#0F766E" radius={[0, 6, 6, 0]} name="Acessos" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
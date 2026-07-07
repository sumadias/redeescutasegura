import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { mockIndicadores, monthlyData, serviceAccessData } from "@/lib/mockData";

const riskData = [
  { name: "Verde", value: mockIndicadores.risco_verde, color: "#22c55e" },
  { name: "Amarelo", value: mockIndicadores.risco_amarelo, color: "#eab308" },
  { name: "Vermelho", value: mockIndicadores.risco_vermelho, color: "#ef4444" },
];

export default function Relatorios() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Relatórios</h1>
          <p className="text-sm text-muted-foreground">Relatório mensal de impacto</p>
        </div>
        <Button className="gap-2 rounded-xl">
          <Download className="w-4 h-4" /> Exportar PDF
        </Button>
      </div>

      <Card className="p-6 border-2 border-primary/20 bg-accent/30">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="font-extrabold text-lg">Resumo — Novembro 2024</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-extrabold text-primary">{mockIndicadores.total_atendidas}</p>
            <p className="text-xs text-muted-foreground">Atendidas</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-primary">{mockIndicadores.encaminhamentos_total}</p>
            <p className="text-xs text-muted-foreground">Encaminhamentos</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-primary">{mockIndicadores.certificadas}</p>
            <p className="text-xs text-muted-foreground">Certificadas</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-primary">{mockIndicadores.tempo_medio}</p>
            <p className="text-xs text-muted-foreground">Tempo Médio</p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-bold text-sm mb-4">Distribuição de Risco</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={riskData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {riskData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-bold text-sm mb-4">Evolução Semestral</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="atendimentos" stroke="#6B3FA0" strokeWidth={2} name="Atendimentos" />
              <Line type="monotone" dataKey="encaminhamentos" stroke="#F4A7B9" strokeWidth={2} name="Encaminhamentos" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-bold text-sm mb-4">Serviços Mais Acessados</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={serviceAccessData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#6B3FA0" radius={[6, 6, 0, 0]} name="Acessos" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
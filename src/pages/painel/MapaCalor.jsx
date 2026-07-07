import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { heatmapData } from "@/lib/mockData";

export default function MapaCalor() {
  const [period, setPeriod] = useState("ultimo_mes");
  const [riskFilter, setRiskFilter] = useState("all");

  const sortedData = [...heatmapData].sort((a, b) => b.casos - a.casos);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Mapa de Calor</h1>
        <p className="text-sm text-muted-foreground">Concentração de casos por bairro (dados anonimizados)</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ultima_semana">Última semana</SelectItem>
            <SelectItem value="ultimo_mes">Último mês</SelectItem>
            <SelectItem value="ultimo_trimestre">Último trimestre</SelectItem>
          </SelectContent>
        </Select>
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os riscos</SelectItem>
            <SelectItem value="verde">Verde</SelectItem>
            <SelectItem value="amarelo">Amarelo</SelectItem>
            <SelectItem value="vermelho">Vermelho</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-5">
        <h3 className="font-bold text-sm mb-4">Casos por Bairro — Campina Grande/PB</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="bairro" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" height={80} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="casos" fill="#6B3FA0" radius={[6, 6, 0, 0]} name="Casos" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {sortedData.slice(0, 5).map((b, i) => (
          <Card key={b.bairro} className="p-4 text-center">
            <p className="text-2xl font-extrabold text-primary">{b.casos}</p>
            <p className="text-xs text-muted-foreground font-medium mt-1">{b.bairro}</p>
            <p className="text-xs text-muted-foreground">#{i + 1} em concentração</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
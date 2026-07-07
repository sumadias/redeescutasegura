import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, FlaskConical } from "lucide-react";
import RiskBadge from "@/components/RiskBadge";
import { mockUsuarias } from "@/lib/mockData";
import { useState } from "react";

const statusLabels = {
  triagem: { label: "Em Triagem", class: "bg-amber-100 text-amber-800" },
  encaminhada: { label: "Encaminhada", class: "bg-blue-100 text-blue-800" },
  em_atendimento: { label: "Em Atendimento", class: "bg-purple-100 text-purple-800" },
  autonoma: { label: "Autônoma", class: "bg-green-100 text-green-800" },
};

export default function AdminUsuarias() {
  const [filterStatus, setFilterStatus] = useState("all");
  const filtered = filterStatus === "all" ? mockUsuarias : mockUsuarias.filter(u => u.status === filterStatus);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Gestão de Pessoas Atendidas</h1>
          <p className="text-sm text-muted-foreground">Dados anonimizados por ID protegido</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#FEF3C7" }}>
          <FlaskConical className="w-4 h-4 shrink-0" style={{ color: "#92400E" }} />
          <span className="text-xs font-semibold" style={{ color: "#92400E" }}>Dados de demonstração</span>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue placeholder="Filtrar status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="triagem">Em Triagem</SelectItem>
            <SelectItem value="encaminhada">Encaminhada</SelectItem>
            <SelectItem value="em_atendimento">Em Atendimento</SelectItem>
            <SelectItem value="autonoma">Autônoma</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-4 bg-accent/50 flex items-center gap-3">
        <Shield className="w-5 h-5 text-primary shrink-0" />
        <p className="text-xs text-muted-foreground">Nenhum dado identificável é exibido. Apenas IDs anônimos são utilizados para preservar a segurança das pessoas atendidas.</p>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Anônimo</TableHead>
                <TableHead>Nível de Risco</TableHead>
                <TableHead>Status da Jornada</TableHead>
                <TableHead>Etapa</TableHead>
                <TableHead>Cursos Concluídos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-mono text-xs font-bold">{u.anonymous_id}</TableCell>
                  <TableCell><RiskBadge level={u.risk_level} /></TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${statusLabels[u.status]?.class}`}>
                      {statusLabels[u.status]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{u.journey_stage}/5</TableCell>
                  <TableCell className="text-sm">{u.courses_completed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
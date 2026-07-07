import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RiskBadge from "@/components/RiskBadge";
import { mockEncaminhamentos } from "@/lib/mockData";
import { FlaskConical } from "lucide-react";

const statusConfig = {
  pendente: { label: "Pendente", class: "bg-amber-100 text-amber-800 border-amber-300" },
  em_atendimento: { label: "Em Atendimento", class: "bg-blue-100 text-blue-800 border-blue-300" },
  concluido: { label: "Concluído", class: "bg-green-100 text-green-800 border-green-300" },
};

export default function Encaminhamentos() {
  const [encaminhamentos, setEncaminhamentos] = useState(mockEncaminhamentos);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedEnc, setSelectedEnc] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newNote, setNewNote] = useState("");

  const filtered = filterStatus === "all" ? encaminhamentos : encaminhamentos.filter(e => e.status === filterStatus);

  const handleUpdate = () => {
    setEncaminhamentos(prev => prev.map(e =>
      e.id === selectedEnc.id ? { ...e, status: newStatus || e.status, notes: newNote || e.notes } : e
    ));
    setSelectedEnc(null);
    setNewStatus("");
    setNewNote("");
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Encaminhamentos</h1>
          <p className="text-sm text-muted-foreground">Gestão de encaminhamentos da rede</p>
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
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pendente">Pendentes</SelectItem>
            <SelectItem value="em_atendimento">Em Atendimento</SelectItem>
            <SelectItem value="concluido">Concluídos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Anônimo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Risco</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((enc) => (
                <TableRow key={enc.id}>
                  <TableCell className="font-mono text-xs font-bold">{enc.anonymous_id}</TableCell>
                  <TableCell className="text-sm">{new Date(enc.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-sm">{enc.service_name}</TableCell>
                  <TableCell><RiskBadge level={enc.risk_level} /></TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[enc.status]?.class}>
                      {statusConfig[enc.status]?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="text-xs rounded-lg" onClick={() => { setSelectedEnc(enc); setNewStatus(enc.status); setNewNote(enc.notes); }}>
                      Atualizar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={!!selectedEnc} onOpenChange={() => setSelectedEnc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Encaminhamento</DialogTitle>
          </DialogHeader>
          {selectedEnc && (
            <div className="space-y-4">
              <div className="text-sm">
                <span className="text-muted-foreground">ID: </span>
                <span className="font-mono font-bold">{selectedEnc.anonymous_id}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Serviço: </span>
                <span className="font-medium">{selectedEnc.service_name}</span>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="em_atendimento">Em Atendimento</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Observações</label>
                <Textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} className="rounded-xl" placeholder="Adicionar observação..." />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEnc(null)}>Cancelar</Button>
            <Button onClick={handleUpdate}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, FileText, Plus, Shield } from "lucide-react";

const mockLogs = [
  { date: "2024-11-18 14:32", user: "gestor@campina.gov.br", action: "Atualizou encaminhamento ESC-2024-0042" },
  { date: "2024-11-18 10:15", user: "admin@campina.gov.br", action: "Cadastrou novo serviço" },
  { date: "2024-11-17 16:45", user: "gestor@campina.gov.br", action: "Exportou relatório mensal" },
  { date: "2024-11-17 09:00", user: "admin@campina.gov.br", action: "Adicionou profissional ao sistema" },
  { date: "2024-11-16 11:30", user: "gestor2@campina.gov.br", action: "Visualizou mapa de calor" },
];

const mockPanelUsers = [
  { email: "admin@campina.gov.br", role: "Administrador", active: true },
  { email: "gestor@campina.gov.br", role: "Gestor", active: true },
  { email: "gestor2@campina.gov.br", role: "Gestor", active: true },
  { email: "profissional@cram.gov.br", role: "Profissional", active: false },
];

export default function AdminConfig() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Configurações</h1>
        <p className="text-sm text-muted-foreground">Gestão do painel municipal</p>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="rounded-xl">
          <TabsTrigger value="users" className="rounded-lg gap-1">
            <Users className="w-4 h-4" /> Usuários
          </TabsTrigger>
          <TabsTrigger value="logs" className="rounded-lg gap-1">
            <FileText className="w-4 h-4" /> Auditoria
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg gap-1">
            <Settings className="w-4 h-4" /> Geral
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Usuários do Painel</h3>
            <Button size="sm" className="gap-1 rounded-xl">
              <Plus className="w-4 h-4" /> Adicionar
            </Button>
          </div>
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPanelUsers.map((u, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm font-medium">{u.email}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{u.role}</Badge></TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${u.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {u.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-4 space-y-4">
          <h3 className="font-bold">Logs de Auditoria</h3>
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLogs.map((log, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-mono">{log.date}</TableCell>
                    <TableCell className="text-xs">{log.user}</TableCell>
                    <TableCell className="text-sm">{log.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4 space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="font-bold">Configurações do Município</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Nome do Município</label>
                <Input defaultValue="Campina Grande - PB" className="mt-1 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium">Responsável</label>
                <Input defaultValue="Secretaria de Políticas para Mulheres" className="mt-1 rounded-xl" />
              </div>
              <Button className="rounded-xl">Salvar Alterações</Button>
            </div>
          </Card>

          <Card className="p-4 bg-accent/50 flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">
              Programa Centelha 3 Paraíba — Edital FAPESQ-PB nº 022/2026 — Nous Inovação e Tecnologia
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
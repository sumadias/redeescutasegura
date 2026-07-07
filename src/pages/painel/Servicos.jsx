import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MapPin, Phone, Clock } from "lucide-react";
import { mockServicos, mockProfissionais } from "@/lib/mockData";

const typeLabels = {
  delegacia: "Delegacia", creas: "CREAS", cram: "CRAM",
  casa_acolhimento: "Casa de Acolhimento", defensoria: "Defensoria",
  ong: "ONG", upa: "UPA", universidade: "Universidade",
};

export default function Servicos() {
  const [search, setSearch] = useState("");
  const filteredServices = mockServicos.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const filteredProfs = mockProfissionais.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Rede de Serviços</h1>
          <p className="text-sm text-muted-foreground">Gestão de instituições e profissionais</p>
        </div>
        <Button className="gap-2 rounded-xl">
          <Plus className="w-4 h-4" /> Cadastrar
        </Button>
      </div>

      <Input
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm rounded-xl"
      />

      <Tabs defaultValue="instituicoes">
        <TabsList className="rounded-xl">
          <TabsTrigger value="instituicoes" className="rounded-lg">Instituições ({filteredServices.length})</TabsTrigger>
          <TabsTrigger value="profissionais" className="rounded-lg">Profissionais ({filteredProfs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="instituicoes" className="mt-4">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Horário</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-semibold text-sm">{s.name}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{typeLabels[s.type]}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{s.address}</TableCell>
                      <TableCell className="text-xs">{s.phone}</TableCell>
                      <TableCell className="text-xs">{s.hours}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="profissionais" className="mt-4">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Especialidade</TableHead>
                    <TableHead>Instituição</TableHead>
                    <TableHead>Atendimento</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfs.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-semibold text-sm">{p.name}</TableCell>
                      <TableCell className="text-xs">{p.specialty}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{p.institution}</TableCell>
                      <TableCell className="text-xs">{p.attendance_type.replace(/_/g, ' ')}</TableCell>
                      <TableCell>
                        <Badge variant={p.available ? "default" : "secondary"} className="text-xs">
                          {p.available ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
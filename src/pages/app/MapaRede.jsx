import { useState, useEffect } from "react";
import AppFooter from "@/components/AppFooter";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Clock, Filter, AlertCircle, Navigation, ExternalLink } from "lucide-react";
import { GravuraCaminho } from "@/components/art/Gravuras";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import QuickExitButton from "@/components/QuickExitButton";
import { base44 } from "@/api/base44Client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const typeLabels = {
  delegacia: "Delegacia / Polícia",
  pericia: "Perícia / Sala Lilás",
  policiamento: "Policiamento",
  creas: "CREAS",
  orgao_gestao: "Órgão de Gestão",
  cram: "CRAM / Acolhimento",
  defensoria: "Defensoria Pública",
  judiciario: "Judiciário",
  ministerio_publico: "Ministério Público",
  casa_acolhimento: "Abrigo / Acolhimento",
  hospital: "Hospital / Maternidade",
  upa: "UPA 24h",
  universidade: "Universidade / Clínica Escola",
  ong: "ONG / Coletivo",
};

// Ordem das categorias nos filtros
const filterOrder = [
  "all",
  "delegacia", "pericia", "policiamento",
  "cram", "casa_acolhimento", "defensoria",
  "judiciario", "ministerio_publico", "creas", "orgao_gestao",
  "upa", "hospital",
  "universidade", "ong",
];

const is24h = (s) =>
  s.hours?.toLowerCase().includes("24h") || s.hours?.toLowerCase().includes("24 horas");

const isSigiloso = (s) =>
  s.type === "casa_acolhimento" &&
  (s.address?.toLowerCase().includes("sigiloso") || s.address?.toLowerCase().includes("rigorosa"));

const isEmergencia = (s) =>
  ["delegacia", "upa", "hospital", "policiamento"].includes(s.type);

const getMapsUrl = (s) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address + ", Campina Grande, PB")}`;

// Mapear query param "categoria" para tipos do filtro
const CATEGORIA_MAP = {
  saude: "upa", // abre filtro de saúde (UPA/Hospital) como ponto de entrada
};

export default function MapaRede() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ler query param para pré-selecionar filtro
  const initialFilter = (() => {
    try {
      const cat = new URLSearchParams(window.location.search).get("categoria");
      return CATEGORIA_MAP[cat] || "all";
    } catch { return "all"; }
  })();
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    base44.entities.Servico.filter({ active: true })
      .then(setServicos)
      .finally(() => setLoading(false));
  }, []);

  const withCoords = servicos.filter(s => s.latitude && s.longitude && !isSigiloso(s));
  const filtered = filter === "all" ? servicos : servicos.filter(s => s.type === filter);
  const filteredWithCoords = filter === "all" ? withCoords : withCoords.filter(s => s.type === filter);

  return (
    <div className="min-h-screen relative" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      <div className="px-4 py-6 space-y-4">
        <button onClick={() => navigate("/app/menu")} className="flex items-center gap-2 text-sm pt-6 focus:outline-none focus:ring-2 rounded" style={{ color: "#78716C" }}>
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <div className="relative overflow-hidden">
          <div className="absolute -top-4 -right-4 pointer-events-none" aria-hidden="true">
            <GravuraCaminho size={120} color="#15803D" opacity={0.10} />
          </div>
          <h1 className="text-xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Mapa da Rede de Proteção</h1>
        </div>

        {/* Seção fixa: Precisa de ajuda agora? */}
        <div className="rounded-xl p-4 space-y-2" style={{ background: "#fff5f5", border: "1px solid #B91C1C33" }}>
          <p className="text-sm font-semibold" style={{ color: "#B91C1C" }}>Precisa de ajuda agora?</p>
          <div className="grid grid-cols-3 gap-2">
            <a href="tel:190">
              <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold">
                190 — PM
              </Button>
            </a>
            <a href="tel:180">
              <Button size="sm" className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold">
                180 — Mulher
              </Button>
            </a>
            <a href="tel:197">
              <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold">
                197 — P. Civil
              </Button>
            </a>
          </div>
          <p className="text-xs text-red-700">
            Atendimento unificado da Coordenadoria da Mulher em Campina Grande:{" "}
            <a href="tel:8333300925" className="font-bold underline">(83) 3330-0925</a>
          </p>
          <p className="text-xs text-muted-foreground border-t border-red-200 pt-2 mt-1">
            ℹ️ A <strong>Casa da Mulher Brasileira de Campina Grande</strong> foi anunciada para reunir Delegacia da Mulher, Defensoria Pública, Ministério Público e assistência social. Até a inauguração, utilize os serviços deste mapa.
          </p>
        </div>

        {/* Filtro */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filter} onValueChange={(v) => { setFilter(v); setSelectedService(null); }}>
            <SelectTrigger className="w-full rounded-xl">
              <SelectValue placeholder="Filtrar serviços" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os serviços</SelectItem>
              {filterOrder.filter(k => k !== "all" && typeLabels[k]).map(k => (
                <SelectItem key={k} value={k}>{typeLabels[k]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mapa */}
      {loading ? (
        <div className="h-[280px] flex items-center justify-center text-muted-foreground text-sm">
          Carregando serviços...
        </div>
      ) : (
        <div className="h-[280px] w-full">
          <MapContainer center={[-7.2177, -35.8817]} zoom={13} className="h-full w-full z-0">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {filteredWithCoords.map((s) => (
              <Marker
                key={s.id}
                position={[s.latitude, s.longitude]}
                eventHandlers={{ click: () => setSelectedService(s) }}
              >
                <Popup>
                  <strong>{s.name}</strong><br />
                  {typeLabels[s.type] || s.type}
                  {is24h(s) && <><br /><span style={{color:"#16a34a",fontWeight:"bold"}}>⏰ 24h</span></>}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {/* Lista */}
      <div className="px-4 py-4 space-y-3 pb-24" aria-label="Lista de serviços da rede">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
          {filtered.length} serviço{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>

        {(selectedService ? [selectedService] : filtered).map((s, i) => {
          const sigiloso = isSigiloso(s);
          const vinte4h = is24h(s);
          const emergencia = isEmergencia(s);
          const phoneNumerico = s.phone?.match(/\(83\)\s*[\d\-\s]+/)?.[0]?.replace(/\D/g, "");

          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className={`p-4 space-y-3 ${emergencia ? "border-red-200" : ""}`}>

                {/* Header */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm leading-snug">{s.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <Badge variant="secondary" className="text-xs">{typeLabels[s.type] || s.type}</Badge>
                    {vinte4h && (
                      <Badge className="text-xs bg-green-100 text-green-700 border border-green-300">⏰ 24h</Badge>
                    )}
                    {sigiloso && (
                      <Badge className="text-xs bg-red-100 text-red-700 border border-red-300 gap-1">
                        <AlertCircle className="w-3 h-3" /> Local sigiloso
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Alerta abrigo sigiloso */}
                {sigiloso && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700 flex gap-2 items-start">
                    <span className="mt-0.5">🔒</span>
                    <span>Endereço sigiloso por segurança. Acesso somente mediante encaminhamento do CRAM, DEAM ou Justiça.</span>
                  </div>
                )}

                {/* Detalhes */}
                <div className="space-y-1 text-xs text-muted-foreground">
                  {!sigiloso && s.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>{s.address}</span>
                    </div>
                  )}
                  {s.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>{s.phone}</span>
                    </div>
                  )}
                  {s.hours && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span className={vinte4h ? "text-green-700 font-semibold" : ""}>{s.hours}</span>
                    </div>
                  )}
                  {s.inclusion_notes && (
                    <div className="flex items-start gap-2 pt-1 text-blue-700 bg-blue-50 rounded-lg px-2 py-1.5">
                      <span className="mt-0.5 flex-shrink-0">ℹ️</span>
                      <span>{s.inclusion_notes}</span>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="flex gap-2 flex-wrap">
                  {phoneNumerico && (
                    <a href={`tel:${phoneNumerico}`} className="flex-1 min-w-[120px]">
                      <Button size="sm" variant="outline" className="w-full rounded-xl text-xs gap-1">
                        <Phone className="w-3 h-3" /> Ligar agora
                      </Button>
                    </a>
                  )}
                  {sigiloso ? (
                    <a href="tel:8333300925" className="flex-1 min-w-[120px]">
                      <Button size="sm" className="w-full rounded-xl text-xs gap-1 bg-primary">
                        Solicitar encaminhamento
                      </Button>
                    </a>
                  ) : s.address && (
                    <a href={getMapsUrl(s)} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[120px]">
                      <Button size="sm" variant="outline" className="w-full rounded-xl text-xs gap-1">
                        <Navigation className="w-3 h-3" /> Como chegar
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}

        {selectedService && (
          <Button variant="ghost" className="w-full text-sm" onClick={() => setSelectedService(null)}>
            Ver todos os serviços
          </Button>
        )}
      </div>
      <AppFooter />
    </div>
  );
}
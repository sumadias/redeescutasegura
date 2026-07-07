import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import { Phone, Navigation, MapPin, Shield, Home, AlertTriangle, ArrowLeft, Locate, ChevronRight, Clock, X, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { base44 } from "@/api/base44Client";
import QuickExitButton from "@/components/QuickExitButton";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Ícones coloridos por tipo
function createColorIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="width:28px;height:28px;background:${color};border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-size:13px;"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function createUserIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="width:20px;height:20px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 6px rgba(59,130,246,0.25);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

const TIPO_ICONS = {
  delegacia: { color: "#ef4444", emoji: "🚔", label: "Delegacia da Mulher" },
  cram: { color: "#8b5cf6", emoji: "💜", label: "CRAM" },
  casa_acolhimento: { color: "#f97316", emoji: "🏠", label: "Casa de Acolhimento" },
  creas: { color: "#06b6d4", emoji: "🤝", label: "CREAS" },
  defensoria: { color: "#10b981", emoji: "⚖️", label: "Defensoria" },
  ong: { color: "#ec4899", emoji: "🫶", label: "ONG" },
  upa: { color: "#f59e0b", emoji: "🏥", label: "UPA" },
  universidade: { color: "#6366f1", emoji: "🎓", label: "Universidade" },
};

// Serviços prioritários para emergência
const EMERGENCY_TYPES = ["delegacia", "casa_acolhimento", "cram", "upa", "defensoria"];

function calcDist(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDist(km) {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
}

function isValidCoords(coords) {
  return Array.isArray(coords) && coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1]);
}

function FlyTo({ coords, onDone }) {
  const map = useMap();
  useEffect(() => {
    if (isValidCoords(coords) && !isNaN(coords[0]) && !isNaN(coords[1])) {
      map.flyTo(coords, 15, { duration: 1.2 });
      onDone?.();
    }
  }, [coords]);
  return null;
}

function RecenterOnUser({ coords, onDone }) {
  const map = useMap();
  useEffect(() => {
    if (isValidCoords(coords) && !isNaN(coords[0]) && !isNaN(coords[1])) {
      map.flyTo(coords, 14, { duration: 1 });
      onDone?.();
    }
  }, [coords]);
  return null;
}

export default function Emergencia() {
  const navigate = useNavigate();
  const [userPos, setUserPos] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [locating, setLocating] = useState(false);
  const [selected, setSelected] = useState(null);
  const [flyTo, setFlyTo] = useState(null);
  const [recenter, setRecenter] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [allServicos, setAllServicos] = useState([]);

  useEffect(() => {
    base44.entities.Servico.filter({ active: true }).then(setAllServicos);
  }, []);

  // Serviços com distância calculada
  const servicosComDist = allServicos
    .filter(s => EMERGENCY_TYPES.includes(s.type))
    .map(s => ({
      ...s,
      dist: userPos ? calcDist(userPos[0], userPos[1], s.latitude, s.longitude) : null,
    }))
    .sort((a, b) => (a.dist ?? 999) - (b.dist ?? 999));

  const filtered = filterType === "all" ? servicosComDist : servicosComDist.filter(s => s.type === filterType);

  function getLocation() {
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(coords);
        setRecenter(coords);
        setLocating(false);
      },
      () => {
        // fallback: usar centro de Campina Grande
        const fallback = [-7.2172, -35.8811];
        setUserPos(fallback);
        setRecenter(fallback);
        setGeoError("Localização aproximada (GPS indisponível)");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  useEffect(() => {
    getLocation();
  }, []);

  function openRoute(service) {
    const dest = `${service.latitude},${service.longitude}`;
    const label = encodeURIComponent(service.name);
    // Tenta abrir Google Maps com navegação
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dest}&destination_place_id=${label}&travelmode=driving`;
    window.open(url, "_blank");
  }

  function selectService(s) {
    setSelected(s);
    setFlyTo([s.latitude, s.longitude]);
  }

  const mapCenter = userPos || [-7.2172, -35.8811];

  return (
    <div className="fixed inset-0 bg-background flex flex-col z-10">
      <QuickExitButton />

      {/* Header de emergência */}
      <div className="bg-red-600 text-white px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/")} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 flex-1">
          <AlertTriangle className="w-5 h-5 animate-pulse" />
          <div>
            <h1 className="font-extrabold text-sm leading-tight">Emergência — Serviços próximos</h1>
            <p className="text-xs text-red-100">Sem cadastro. Sem coleta de dados.</p>
          </div>
        </div>
        <a href="tel:180">
          <Button size="sm" className="bg-white text-red-700 hover:bg-red-50 font-extrabold text-xs h-8 px-3">
            📞 180
          </Button>
        </a>
      </div>

      {/* Aviso de segurança */}
      <div className="bg-slate-800 text-white text-center text-xs px-4 py-2 flex-shrink-0" role="note">
        <Shield className="w-3 h-3 inline mr-1 text-teal-400" aria-hidden="true" />
        Esta página não requer cadastro. Seus dados não são coletados aqui.
      </div>

      {/* Botões de emergência rápida */}
      <div className="grid grid-cols-4 gap-0 flex-shrink-0 border-b border-border">
        {[
          { label: "190", sub: "Pol. Militar", href: "tel:190", color: "bg-blue-50 text-blue-700" },
          { label: "180", sub: "Mulher", href: "tel:180", color: "bg-red-50 text-red-700" },
          { label: "197", sub: "Pol. Civil", href: "tel:197", color: "bg-indigo-50 text-indigo-700" },
          { label: "192", sub: "SAMU", href: "tel:192", color: "bg-amber-50 text-amber-700" },
        ].map(b => (
          <a key={b.label} href={b.href} className={`flex flex-col items-center justify-center py-3 ${b.color} border-r last:border-r-0 border-border active:opacity-70 transition-opacity`}>
            <span className="font-extrabold text-sm">📞 {b.label}</span>
            <span className="text-[10px] opacity-70">{b.sub}</span>
          </a>
        ))}
      </div>

      {/* Mapa */}
      <div className="flex-1 relative min-h-0">
        <MapContainer center={mapCenter} zoom={14} className="h-full w-full z-0" zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Posição do usuário */}
          {userPos && (
            <>
              <Marker position={userPos} icon={createUserIcon()}>
                <Popup>📍 Você está aqui</Popup>
              </Marker>
              <Circle center={userPos} radius={300} pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.1, weight: 1 }} />
            </>
          )}

          {/* Serviços */}
          {filtered.filter(s => isValidCoords([s.latitude, s.longitude])).map(s => (
            <Marker
              key={s.id}
              position={[s.latitude, s.longitude]}
              icon={createColorIcon(TIPO_ICONS[s.type]?.color || "#666")}
              eventHandlers={{ click: () => selectService(s) }}
            >
              <Popup>
                <strong>{s.name}</strong><br />
                <span className="text-xs">{TIPO_ICONS[s.type]?.label}</span>
                {s.dist && <><br /><span className="text-xs text-blue-600">📍 {formatDist(s.dist)}</span></>}
              </Popup>
            </Marker>
          ))}

          {flyTo && <FlyTo coords={flyTo} onDone={() => setFlyTo(null)} />}
          {recenter && <RecenterOnUser coords={recenter} onDone={() => setRecenter(null)} />}
        </MapContainer>

        {/* Botão de relocalizar */}
        <button
          onClick={getLocation}
          className="absolute bottom-4 right-4 z-[1000] w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-border hover:bg-accent transition-colors"
        >
          {locating
            ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            : <Locate className="w-5 h-5 text-primary" />
          }
        </button>

        {/* Legenda GPS */}
        {geoError && (
          <div className="absolute top-2 left-2 right-2 z-[1000] bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="text-xs text-amber-700">{geoError}</span>
          </div>
        )}
      </div>

      {/* Filtros rápidos */}
      <div className="flex gap-2 px-3 py-2 overflow-x-auto flex-shrink-0 border-t border-border bg-background">
        {[
          { value: "all", label: "Todos" },
          { value: "delegacia", label: "🚔 Delegacia" },
          { value: "casa_acolhimento", label: "🏠 Abrigo" },
          { value: "cram", label: "💜 CRAM" },
          { value: "upa", label: "🏥 UPA" },
          { value: "defensoria", label: "⚖️ Defensoria" },
        ].map(f => (
          <button
            key={f.value}
            onClick={() => setFilterType(f.value)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border font-bold transition-all ${filterType === f.value ? "bg-primary text-white border-primary" : "bg-card border-border text-muted-foreground"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Atalho discreto — Momento de calma */}
      <div className="flex-shrink-0 border-t border-border bg-background px-4 py-2">
        <button
          onClick={() => navigate("/app/calma")}
          className="flex items-center gap-2 text-xs py-1 focus:outline-none focus:ring-2 rounded opacity-70 hover:opacity-100 transition-opacity"
          style={{ color: "#0F766E" }}
        >
          <Wind className="w-3.5 h-3.5" aria-hidden="true" />
          Preciso de um momento de calma
        </button>
      </div>

      {/* Lista de serviços próximos */}
      <div className="flex-shrink-0 max-h-[38vh] overflow-y-auto border-t border-border bg-background">
        {filtered.map((s, i) => {
          const info = TIPO_ICONS[s.type];
          const isSelected = selected?.id === s.id;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`border-b border-border last:border-b-0 transition-colors ${isSelected ? "bg-accent/40" : "bg-background hover:bg-muted/50"}`}
            >
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left" onClick={() => selectService(s)}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-lg" style={{ background: info?.color + "20" }}>
                  {info?.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs leading-tight truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{info?.label} · {s.hours}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {s.dist !== null && (
                    <span className="text-xs font-bold text-primary">{formatDist(s.dist)}</span>
                  )}
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                </div>
              </button>

              {/* Painel expandido */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{s.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{s.phone}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full text-xs h-8 gap-1">
                            <Phone className="w-3 h-3" /> Ligar
                          </Button>
                        </a>
                        <Button size="sm" className="flex-1 text-xs h-8 gap-1 bg-primary" onClick={() => openRoute(s)}>
                          <Navigation className="w-3 h-3" /> Rota GPS
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
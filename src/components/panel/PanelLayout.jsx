import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, ArrowLeftRight, Map, FileText, Building2, Settings, Shield, MessageCircle, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import PanelGuard from "@/components/panel/PanelGuard";
import { base44 } from "@/api/base44Client";

export default function PanelLayout({ type = "profissional" }) {
  const location = useLocation();
  const requiredRole = type === "admin" ? "admin" : "profissional";

  const profLinks = [
    { to: "/painel", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/painel/encaminhamentos", icon: ArrowLeftRight, label: "Encaminhamentos" },
    { to: "/painel/chat", icon: MessageCircle, label: "Chat ao Vivo" },
    { to: "/painel/agenda", icon: CalendarDays, label: "Agenda" },
    { to: "/painel/mapa-calor", icon: Map, label: "Mapa de Calor" },
    { to: "/painel/relatorios", icon: FileText, label: "Relatórios" },
    { to: "/painel/servicos", icon: Building2, label: "Rede de Serviços" },
  ];

  const adminLinks = [
    { to: "/admin", icon: LayoutDashboard, label: "Visão Geral" },
    { to: "/admin/usuarias", icon: Shield, label: "Pessoas atendidas" },
    { to: "/admin/config", icon: Settings, label: "Configurações" },
  ];

  const links = type === "admin" ? adminLinks : profLinks;
  const title = type === "admin" ? "Painel Municipal" : "Painel Gestor";

  return (
    <PanelGuard requiredRole={requiredRole}>
      <div className="h-screen bg-background flex overflow-hidden">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-sidebar-primary" />
              <div>
                <h2 className="font-extrabold text-sm">{title}</h2>
                <p className="text-xs text-sidebar-foreground/60">Rede Escuta Segura</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {links.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-sidebar-border">
            <Link to="/" className="text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
              ← Voltar ao início
            </Link>
          </div>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 px-2 py-1">
          <div className="flex justify-around">
            {links.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex flex-col items-center py-2 px-1 text-xs font-medium transition-colors min-w-0",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <link.icon className="w-5 h-5 mb-0.5" />
                  <span className="truncate max-w-[60px]">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-hidden flex flex-col pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>
    </PanelGuard>
  );
}
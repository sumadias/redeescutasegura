import React from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children, showEmergency = true }) {
  return (
    <div lang="pt-BR" className="min-h-screen flex flex-col bg-background">
      {/* Barra de emergência — sempre acessível, sem cadastro */}
      {showEmergency && (
        <div className="w-full bg-red-700 text-white text-center py-2 px-4 flex items-center justify-center gap-3 flex-shrink-0">
          <span className="text-xs font-semibold" aria-label="Precisa de ajuda agora sem cadastro?">
            Em perigo agora?
          </span>
          <Link
            to="/app/emergencia"
            className="text-xs font-bold underline underline-offset-2 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-red-700 rounded"
          >
            Acessar emergência sem cadastro →
          </Link>
          <span className="text-xs text-red-200 hidden sm:inline" aria-hidden="true">· Anônimo · Rápido</span>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
              <Icon className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
          </div>
          <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
            {children}
          </div>
          {footer && (
            <p className="text-center text-sm text-muted-foreground mt-6">{footer}</p>
          )}
        </div>
      </div>
    </div>
  );
}
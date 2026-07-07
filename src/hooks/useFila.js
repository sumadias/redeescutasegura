import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Hook para gerenciar a fila de espera:
 * - Polling da fila a cada 3s
 * - Retorna sessões aguardando e ativas
 */
export function useFila() {
  const [aguardando, setAguardando] = useState([]);
  const [ativas, setAtivas] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const fetchFila = async () => {
    const [aw, at] = await Promise.all([
      base44.entities.ChatSessao.filter({ status: "aguardando" }, "created_date", 50),
      base44.entities.ChatSessao.filter({ status: "ativa" }, "created_date", 50),
    ]);
    setAguardando(aw);
    setAtivas(at);
    setLoading(false);
  };

  useEffect(() => {
    fetchFila();
    intervalRef.current = setInterval(fetchFila, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return { aguardando, ativas, loading, refetch: fetchFila };
}
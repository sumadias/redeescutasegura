import { useState, useEffect, useRef, useCallback } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Hook que encapsula toda a lógica de uma sessão de chat:
 * - Carrega mensagens da sessão
 * - Subscreve a atualizações em tempo real (polling a cada 2s)
 * - Envia mensagens
 * - Atualiza status da sessão
 */
export function useChatSessao(sessaoId) {
  const [mensagens, setMensagens] = useState([]);
  const [sessao, setSessao] = useState(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const fetchMensagens = useCallback(async () => {
    if (!sessaoId) return;
    const msgs = await base44.entities.ChatMensagem.filter(
      { sessao_id: sessaoId },
      "created_date",
      200
    );
    setMensagens(msgs);
  }, [sessaoId]);

  const fetchSessao = useCallback(async () => {
    if (!sessaoId) return;
    const all = await base44.entities.ChatSessao.filter({ id: sessaoId });
    if (all.length > 0) setSessao(all[0]);
  }, [sessaoId]);

  useEffect(() => {
    if (!sessaoId) return;

    const init = async () => {
      setLoading(true);
      await Promise.all([fetchSessao(), fetchMensagens()]);
      setLoading(false);
    };
    init();

    // Polling em tempo real a cada 2 segundos
    intervalRef.current = setInterval(() => {
      fetchMensagens();
      fetchSessao();
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [sessaoId, fetchMensagens, fetchSessao]);

  const enviarMensagem = async (conteudo, remetente = "usuaria", tipo = "texto") => {
    if (!conteudo.trim() || !sessaoId) return;
    await base44.entities.ChatMensagem.create({
      sessao_id: sessaoId,
      remetente,
      conteudo,
      tipo,
      lida: false,
    });
    await fetchMensagens();
  };

  const atualizarSessao = async (dados) => {
    if (!sessaoId) return;
    await base44.entities.ChatSessao.update(sessaoId, dados);
    await fetchSessao();
  };

  return { mensagens, sessao, loading, enviarMensagem, atualizarSessao, refetch: fetchMensagens };
}
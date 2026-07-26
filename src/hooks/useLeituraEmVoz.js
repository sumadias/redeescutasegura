import { useState, useEffect, useCallback, useRef } from "react";

/* Leitura em voz alta usando a síntese de voz DO PRÓPRIO APARELHO
 * (Web Speech API). Nenhum texto é enviado para servidor externo — o documento
 * de melhorias pede exatamente isso: "síntese de voz do próprio aparelho sempre
 * que possível" e "não enviar texto sensível para serviço externo de voz".
 */
export function useLeituraEmVoz() {
  const disponivel = typeof window !== "undefined" && "speechSynthesis" in window;
  const [lendo, setLendo] = useState(false);
  const uttRef = useRef(null);

  const parar = useCallback(() => {
    if (!disponivel) return;
    window.speechSynthesis.cancel();
    setLendo(false);
  }, [disponivel]);

  /* para a leitura ao trocar de página ou desmontar */
  useEffect(() => () => { if (disponivel) window.speechSynthesis.cancel(); }, [disponivel]);

  const escolherVozPt = () => {
    const vozes = window.speechSynthesis.getVoices() || [];
    return (
      vozes.find((v) => /pt[-_]?BR/i.test(v.lang)) ||
      vozes.find((v) => /^pt/i.test(v.lang)) ||
      null
    );
  };

  const ler = useCallback(
    (texto) => {
      if (!disponivel) return;
      const limpo = String(texto || "").replace(/\s+/g, " ").trim();
      if (!limpo) return;
      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(limpo);
      u.lang = "pt-BR";
      const voz = escolherVozPt();
      if (voz) u.voice = voz;
      u.rate = 0.98;
      u.onend = () => setLendo(false);
      u.onerror = () => setLendo(false);
      uttRef.current = u;
      setLendo(true);
      window.speechSynthesis.speak(u);
    },
    [disponivel]
  );

  /* lê o conteúdo principal visível da página */
  const lerConteudo = useCallback(() => {
    const alvo =
      document.getElementById("conteudo") ||
      document.querySelector("main") ||
      document.body;
    ler(alvo?.innerText || "");
  }, [ler]);

  return { disponivel, lendo, ler, lerConteudo, parar };
}

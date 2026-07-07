import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function InputMensagem({ onEnviar, disabled = false, placeholder = "Digite sua mensagem..." }) {
  const [texto, setTexto] = useState("");

  const handleEnviar = () => {
    if (!texto.trim() || disabled) return;
    onEnviar(texto.trim());
    setTexto("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviar();
    }
  };

  return (
    <div className="flex items-end gap-2 p-3 bg-card border-t border-border">
      <Textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="resize-none rounded-xl flex-1 min-h-[42px] max-h-[120px] text-sm py-2.5"
      />
      <Button
        onClick={handleEnviar}
        disabled={!texto.trim() || disabled}
        size="icon"
        className="rounded-xl h-[42px] w-[42px] shrink-0"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
}
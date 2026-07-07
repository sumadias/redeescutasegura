import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Calculator, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import QuickExitButton from "@/components/QuickExitButton";

export default function AppLanding() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);
  const [pin, setPin] = useState("");
  const [step, setStep] = useState("mode"); // mode, pin

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setStep("pin");
  };

  const handlePinInput = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        setTimeout(() => navigate("/app/menu"), 500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative">
      <QuickExitButton />
      
      {step === "mode" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-8 text-center"
        >
          <div className="space-y-3">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground">Rede Escuta Segura</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Da proteção à autonomia: tecnologia que acolhe, orienta, capacita e conecta
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Como deseja acessar?</p>
            
            <Button
              onClick={() => handleModeSelect("normal")}
              className="w-full h-16 text-lg gap-3 bg-primary hover:bg-primary/90 rounded-2xl"
            >
              <Shield className="w-6 h-6" />
              Modo Normal
            </Button>

            <Button
              onClick={() => handleModeSelect("discreto")}
              variant="outline"
              className="w-full h-16 text-lg gap-3 rounded-2xl border-2"
            >
              <Calculator className="w-6 h-6" />
              Modo Discreto
            </Button>
            
            <p className="text-xs text-muted-foreground mt-2">
              {mode === "discreto" 
                ? "O app aparecerá como uma calculadora" 
                : "Escolha o modo discreto para ocultar a aparência do app"}
            </p>
          </div>
        </motion.div>
      )}

      {step === "pin" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-8 text-center"
        >
          <div className="space-y-2">
            {mode === "discreto" ? (
              <Calculator className="w-12 h-12 mx-auto text-muted-foreground" />
            ) : (
              <Shield className="w-12 h-12 mx-auto text-primary" />
            )}
            <h2 className="text-xl font-bold">
              {mode === "discreto" ? "Calculadora" : "Digite seu PIN"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === "discreto" ? "Digite o código" : "Insira seu PIN de 4 dígitos"}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  i < pin.length ? "bg-primary scale-110" : "bg-border"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((digit, i) => (
              <div key={i}>
                {digit === null ? <div /> : digit === "del" ? (
                  <button
                    onClick={() => setPin(pin.slice(0, -1))}
                    className="w-full h-16 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                  >
                    ←
                  </button>
                ) : (
                  <button
                    onClick={() => handlePinInput(String(digit))}
                    className="w-full h-16 rounded-2xl text-2xl font-bold bg-card hover:bg-muted border border-border transition-colors shadow-sm"
                  >
                    {digit}
                  </button>
                )}
              </div>
            ))}
          </div>

          <button 
            onClick={() => { setStep("mode"); setPin(""); }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Voltar
          </button>
        </motion.div>
      )}
    </div>
  );
}
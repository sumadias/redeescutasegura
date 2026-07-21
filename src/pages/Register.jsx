import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, Loader2, Info } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout from "@/components/AuthLayout";
import { toast } from "@/components/ui/use-toast";
import { destinoPosLogin } from "@/lib/destinoPosLogin";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 8) {
      setError("A senha precisa ter no mínimo 8 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setShowOtp(true);
    } catch (err) {
      setError(err.message || "Não foi possível criar sua conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) {
        base44.auth.setToken(result.access_token);
      }
      window.location.href = destinoPosLogin();
    } catch (err) {
      setError(err.message || "Código inválido. Verifique e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await base44.auth.resendOtp(email);
      toast({ title: "Código reenviado", description: "Verifique seu e-mail." });
    } catch (err) {
      setError(err.message || "Não foi possível reenviar o código.");
    }
  };

  if (showOtp) {
    return (
      <AuthLayout
        icon={Mail}
        title="Verifique seu e-mail"
        subtitle={`Enviamos um código para ${email}`}
      >
        {error && (
          <div role="alert" className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}
        <div className="flex justify-center mb-6">
          <InputOTP
            maxLength={6}
            value={otpCode}
            onChange={setOtpCode}
            autoFocus
            autoComplete="one-time-code"
            aria-label="Código de verificação de 6 dígitos"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          className="w-full h-12 font-medium"
          onClick={handleVerify}
          disabled={loading || otpCode.length < 6}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
              Verificando...
            </>
          ) : (
            "Verificar código"
          )}
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Não recebeu o código?{" "}
          <button onClick={handleResend} className="text-primary font-medium hover:underline">
            Reenviar
          </button>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={UserPlus}
      title="Criar o meu espaço"
      subtitle="Seus dados são usados apenas para proteger seu acesso."
      footer={
        <>
          Já tem conta?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      {/* Aviso de segurança — e-mails vigiados são risco real para o público atendido */}
      <div className="flex gap-2 p-3 rounded-lg mb-5" style={{ background: "#FEF3C7" }} role="note">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#92400E" }} aria-hidden="true" />
        <p className="text-xs leading-relaxed" style={{ color: "#92400E" }}>
          Use um e-mail que só você acessa. Evite contas compartilhadas ou que outra pessoa conheça a senha.
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12"
              required
              aria-required="true"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha <span className="text-xs text-muted-foreground font-normal">(mín. 8 caracteres)</span></Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-12"
              required
              minLength={8}
              aria-required="true"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirmar senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 h-12"
              required
              aria-required="true"
            />
          </div>
        </div>
        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
              Criando conta...
            </>
          ) : (
            "Criar conta"
          )}
        </Button>
      </form>

      <p className="mt-4 text-xs text-muted-foreground text-center">
        Seus dados são usados apenas para proteger seu acesso. Leia nossa{" "}
        <a href="/privacidade" className="text-primary hover:underline">política de privacidade</a>.
      </p>
    </AuthLayout>
  );
}
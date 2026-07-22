import { useNavigate, useLocation } from "react-router-dom";
import { ShieldAlert, Lock } from "lucide-react";
import { T } from "@/components/site/tokens";

/* Porta do Meu Espaço para quem não está logada.
   Paleta alinhada ao restante do site (roxo institucional) — antes usava o
   vinho/pedra do app antigo e destoava de tudo à volta. */
export default function MeuEspacoGuard() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const destino = encodeURIComponent(pathname);

  return (
    <div
      className="flex flex-col items-center justify-center px-5 py-16 min-h-[70vh]"
      style={{ background: T.pagina }}
    >
      <div className="max-w-sm w-full space-y-6 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
          style={{ background: T.roxoSuave }}>
          <Lock className="w-7 h-7" style={{ color: T.roxo }} aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold" style={{ color: T.tinta }}>Este espaço é privado</h1>
          <p className="text-sm leading-relaxed" style={{ color: T.texto }}>
            O diário, o plano de segurança e as cartas ficam guardados na sua conta — só você
            tem acesso. Para usar, entre ou crie o seu espaço.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate(`/login?next=${destino}`)}
            className="w-full h-12 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ background: T.roxo }}
          >
            Entrar com segurança
          </button>

          {/* Faltava o caminho do cadastro: quem ainda não tem conta chegava aqui
              e só tinha a opção de entrar, sem saber como criar a sua. */}
          <button
            onClick={() => navigate(`/register?next=${destino}`)}
            className="w-full h-12 rounded-xl text-sm font-semibold border-2 transition-colors"
            style={{ borderColor: T.roxo, color: T.roxo, background: T.cartao }}
          >
            Criar meu espaço
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full h-11 rounded-xl text-sm font-semibold border transition-colors"
            style={{ borderColor: T.borda, color: T.texto, background: T.cartao }}
          >
            Voltar para a Home
          </button>

          <button
            onClick={() => navigate("/emergencia")}
            className="w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            style={{ background: T.rosaSuave, color: T.rosaTinta, border: `1px solid ${T.rosa}44` }}
          >
            <ShieldAlert className="w-4 h-4" aria-hidden="true" />
            Preciso de ajuda agora
          </button>
        </div>

        <p className="text-xs" style={{ color: T.apagado }}>
          Nenhum dado pessoal é coletado antes do seu consentimento.
        </p>
      </div>
    </div>
  );
}

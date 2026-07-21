import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuardRoute from './components/panel/RoleGuardRoute';

// Pages
import Home from './pages/Home';
import AppLanding from './pages/app/AppLanding';
import AppMenu from './pages/app/AppMenu';
import Acolhimento from './pages/app/Acolhimento';
import MapaRede from './pages/app/MapaRede';
import ApoioJuridico from './pages/app/ApoioJuridico';
import ArteEscuta from './pages/app/ArteEscuta';
import TrilhaRecomeco from './pages/app/TrilhaRecomeco';
import MinhaJornada from './pages/app/MinhaJornada';

// Panel pages
import PanelLayout from './components/panel/PanelLayout';
import Dashboard from './pages/painel/Dashboard';
import Encaminhamentos from './pages/painel/Encaminhamentos';
import MapaCalor from './pages/painel/MapaCalor';
import Relatorios from './pages/painel/Relatorios';
import Servicos from './pages/painel/Servicos';
import ChatPainel from './pages/painel/ChatPainel';
import Agenda from './pages/painel/Agenda';
import ChatUsuaria from './pages/app/ChatUsuaria';
import Assistente from './pages/app/Assistente';
import Agendamento from './pages/app/Agendamento';
import PlanoSeguranca from './pages/app/PlanoSeguranca';
import CartasParaMim from './pages/app/CartasParaMim';
import Emergencia from './pages/app/Emergencia';
import DiarioEmocoes from './pages/app/DiarioEmocoes';
import MeuEspacoGuard from './components/MeuEspacoGuard';
import MeuEspaco from './pages/app/MeuEspaco';
import MomentoCalma from './pages/app/MomentoCalma';
import GraficoHumor from './pages/app/GraficoHumor';
import MeusSalvos from './pages/app/MeusSalvos';
import MeusDireitos from './pages/app/MeusDireitos';
import OQueEViolencia from './pages/app/OQueEViolencia';
import ViolenciaDomestica from './pages/app/ViolenciaDomestica';
import { FLAGS } from './lib/featureFlags';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsuarias from './pages/admin/AdminUsuarias';
import AdminConfig from './pages/admin/AdminConfig';

const AuthenticatedApp = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Rotas públicas — sem login */}
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<Navigate to="/app/menu" replace />} />
      <Route path="/app/menu" element={<AppMenu />} />
      <Route path="/app/emergencia" element={<Emergencia />} />
      <Route path="/emergencia" element={<Emergencia />} />
      {/* Assistente automático — público, sem login e sem gravar conversa */}
      <Route path="/assistente" element={<Assistente />} />
      <Route path="/app/assistente" element={<Assistente />} />
      <Route path="/app/mapa" element={<MapaRede />} />
      <Route path="/app/acolhimento" element={<Acolhimento />} />
      <Route path="/app/apoio" element={<ApoioJuridico />} />
      {/* Conteúdo informativo e serviços — acesso livre, sem login */}
      <Route path="/app/o-que-e-violencia" element={<OQueEViolencia />} />
      <Route path="/app/violencia-domestica" element={<ViolenciaDomestica />} />
      <Route path="/app/direitos" element={<MeusDireitos />} />
      {/* Rotas protegidas — apenas usuários autenticados (qualquer role) */}
      <Route element={<ProtectedRoute unauthenticatedElement={<MeuEspacoGuard />} />}>
        <Route path="/app/meu-espaco" element={<MeuEspaco />} />
        <Route path="/app/calma" element={<MomentoCalma />} />
        <Route path="/app/humor" element={<GraficoHumor />} />
        <Route path="/app/salvos" element={<MeusSalvos />} />
        <Route path="/app/arte" element={<ArteEscuta />} />
        <Route path="/app/diario" element={<DiarioEmocoes />} />
        <Route path="/app/trilha" element={FLAGS.ENABLE_TRILHA_RECOMECO ? <TrilhaRecomeco /> : <Navigate to="/app/menu" replace />} />
        <Route path="/app/jornada" element={FLAGS.ENABLE_MINHA_JORNADA ? <MinhaJornada /> : <Navigate to="/app/menu" replace />} />
        <Route path="/app/chat" element={<ChatUsuaria />} />
        <Route path="/app/agendamento" element={FLAGS.ENABLE_AGENDAMENTO ? <Agendamento /> : <Navigate to="/app/menu" replace />} />
        <Route path="/app/plano" element={<PlanoSeguranca />} />
        <Route path="/app/cartas" element={<CartasParaMim />} />
      </Route>

      {/* Painel Profissional — dupla camada: autenticação + role */}
      {/* RoleGuardRoute verifica role ANTES de renderizar qualquer dado */}
      <Route element={<RoleGuardRoute allowedRoles={["profissional", "admin"]} />}>
        <Route element={<PanelLayout type="profissional" />}>
          <Route path="/painel" element={<Dashboard />} />
          <Route path="/painel/encaminhamentos" element={<Encaminhamentos />} />
          <Route path="/painel/mapa-calor" element={<MapaCalor />} />
          <Route path="/painel/relatorios" element={<Relatorios />} />
          <Route path="/painel/servicos" element={<Servicos />} />
          <Route path="/painel/chat" element={<ChatPainel />} />
          <Route path="/painel/agenda" element={<Agenda />} />
        </Route>
      </Route>

      {/* Administração Municipal — apenas admin */}
      <Route element={<RoleGuardRoute allowedRoles={["admin"]} />}>
        <Route element={<PanelLayout type="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/usuarias" element={<AdminUsuarias />} />
          <Route path="/admin/config" element={<AdminConfig />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
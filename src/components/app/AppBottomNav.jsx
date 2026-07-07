import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageCircle, MapPin, BookHeart, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "Início", icon: Home, path: "/app/menu" },
  { label: "Chat", icon: MessageCircle, path: "/app/chat" },
  { label: "Mapa", icon: MapPin, path: "/app/mapa" },
  { label: "Diário", icon: BookHeart, path: "/app/diario" },
  { label: "Perfil", icon: User, path: "/app/jornada" },
];

export default function AppBottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#D6DBE3] flex items-stretch"
      aria-label="Navegação principal"
    >
      {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
        const active = pathname === path || pathname.startsWith(path + "/");
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#315C72]/40 ${
              active
                ? "text-[#315C72]"
                : "text-[#667085] hover:text-[#172033]"
            }`}
            aria-label={label}
            aria-current={active ? "page" : undefined}
          >
            <Icon
              className={`w-5 h-5 ${active ? "text-[#315C72]" : "text-[#667085]"}`}
              aria-hidden="true"
            />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
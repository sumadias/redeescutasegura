import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, BookmarkX, GraduationCap, Palette } from "lucide-react";
import QuickExitButton from "@/components/QuickExitButton";
import { base44 } from "@/api/base44Client";
import { getOrCreateAnonymousId } from "@/lib/anonymousId";
import { GravuraSol } from "@/components/art/Gravuras";

const TIPO_ICON = {
  curso: GraduationCap,
  conteudo_arte: Palette,
};

const TIPO_COR = {
  curso: "#15803D",
  conteudo_arte: "#9A3412",
};

const TIPO_LABEL = {
  curso: "Trilha Recomeço",
  conteudo_arte: "Arte & Escuta",
};

export default function MeusSalvos() {
  const navigate = useNavigate();
  const [salvos, setSalvos] = useState([]);
  const [loading, setLoading] = useState(true);
  const anonId = getOrCreateAnonymousId();

  useEffect(() => {
    base44.entities.ItemSalvo.filter({ anonymous_id: anonId }, "-created_date")
      .then(setSalvos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const remover = async (item) => {
    await base44.entities.ItemSalvo.delete(item.id);
    setSalvos(prev => prev.filter(s => s.id !== item.id));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      <main className="flex-1 px-4 pt-14 pb-10 max-w-md mx-auto w-full space-y-6">
        {/* Header */}
        <div className="pt-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "#57534E" }} />
          </button>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Meus salvos</h1>
            <p className="text-sm" style={{ color: "#57534E" }}>Cursos e conteúdos que você guardou</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#0F766E" }} />
          </div>
        ) : salvos.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="flex justify-center">
              <GravuraSol size={80} color="#9A3412" opacity={0.8} />
            </div>
            <p className="text-base font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Nenhum item salvo ainda</p>
            <p className="text-sm italic" style={{ color: "#9A3412", fontFamily: "var(--font-lora)" }}>O que você guardar aparece aqui.</p>
            <p className="text-sm leading-relaxed" style={{ color: "#57534E" }}>
              Use o ícone de marcador nos cursos da Trilha Recomeço e nos conteúdos de Arte & Escuta para salvar o que quiser acessar depois.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {salvos.map((item) => {
              const Icon = TIPO_ICON[item.tipo] || Bookmark;
              const cor = TIPO_COR[item.tipo] || "#0F766E";
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl px-4 py-4 border bg-white"
                  style={{ borderColor: cor + "22", minHeight: 64 }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cor + "18" }}>
                    <Icon className="w-5 h-5" style={{ color: cor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight" style={{ color: "#292524" }}>
                      {item.item_titulo || "Item salvo"}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#78716C" }}>
                      {TIPO_LABEL[item.tipo] || item.tipo}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {item.item_path && (
                      <button
                        onClick={() => navigate(item.item_path)}
                        className="h-9 px-3 rounded-xl text-xs font-medium border hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2"
                        style={{ borderColor: "#E7E5E4", color: "#57534E" }}
                      >
                        Abrir
                      </button>
                    )}
                    <button
                      onClick={() => remover(item)}
                      className="h-9 w-9 rounded-xl flex items-center justify-center border hover:bg-red-50 transition-colors focus:outline-none focus:ring-2"
                      style={{ borderColor: "#E7E5E4" }}
                      aria-label="Remover dos salvos"
                    >
                      <BookmarkX className="w-4 h-4" style={{ color: "#B91C1C" }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
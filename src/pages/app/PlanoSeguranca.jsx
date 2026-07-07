import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Trash2, Save, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import QuickExitButton from "@/components/QuickExitButton";
import { base44 } from "@/api/base44Client";
import { getOrCreateAnonymousId } from "@/lib/anonymousId";
import { GravuraAbrigo } from "@/components/art/Gravuras";

const ANONYMOUS_ID = getOrCreateAnonymousId();

const CHECKLIST_ITEMS = [
  { key: "documentos",    label: "Documentos (RG, CPF, certidões)" },
  { key: "remedios",      label: "Medicamentos e receitas" },
  { key: "chaves",        label: "Chaves da casa ou do carro" },
  { key: "dinheiro",      label: "Dinheiro ou cartão" },
  { key: "itens_criancas",label: "Itens das crianças (se houver)" },
];

const CONTATO_VAZIO = { nome: "", telefone: "" };

export default function PlanoSeguranca() {
  const navigate = useNavigate();
  const [planoId, setPlanoId] = useState(null);
  const [contatos, setContatos] = useState([{ ...CONTATO_VAZIO }]);
  const [lugarSeguro, setLugarSeguro] = useState("");
  const [checklist, setChecklist] = useState({ documentos: false, remedios: false, chaves: false, dinheiro: false, itens_criancas: false });
  const [palavraCodigo, setPalavraCodigo] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [apagando, setApagando] = useState(false);

  useEffect(() => {
    base44.entities.PlanoSeguranca.filter({ anonymous_id: ANONYMOUS_ID }).then(data => {
      if (data.length > 0) {
        const p = data[0];
        setPlanoId(p.id);
        setContatos(p.contatos?.length > 0 ? p.contatos : [{ ...CONTATO_VAZIO }]);
        setLugarSeguro(p.lugar_seguro || "");
        setChecklist(p.checklist || { documentos: false, remedios: false, chaves: false, dinheiro: false, itens_criancas: false });
        setPalavraCodigo(p.palavra_codigo || "");
        setSalvo(true);
      }
    }).catch(() => {});
  }, []);

  function alterarContato(idx, campo, valor) {
    setContatos(prev => prev.map((c, i) => i === idx ? { ...c, [campo]: valor } : c));
    setSalvo(false);
  }

  function adicionarContato() {
    if (contatos.length >= 3) return;
    setContatos(prev => [...prev, { ...CONTATO_VAZIO }]);
  }

  function removerContato(idx) {
    setContatos(prev => prev.filter((_, i) => i !== idx));
    setSalvo(false);
  }

  function alterarCheck(key) {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    setSalvo(false);
  }

  async function salvar() {
    setSalvando(true);
    const payload = {
      anonymous_id: ANONYMOUS_ID,
      contatos: contatos.filter(c => c.nome || c.telefone),
      lugar_seguro: lugarSeguro.trim(),
      checklist,
      palavra_codigo: palavraCodigo.trim(),
    };
    try {
      if (planoId) {
        await base44.entities.PlanoSeguranca.update(planoId, payload);
      } else {
        const novo = await base44.entities.PlanoSeguranca.create(payload);
        setPlanoId(novo.id);
      }
      setSalvo(true);
    } catch {}
    setSalvando(false);
  }

  async function apagarTudo() {
    if (!planoId) return;
    setApagando(true);
    try {
      await base44.entities.PlanoSeguranca.delete(planoId);
      setPlanoId(null);
      setContatos([{ ...CONTATO_VAZIO }]);
      setLugarSeguro("");
      setChecklist({ documentos: false, remedios: false, chaves: false, dinheiro: false, itens_criancas: false });
      setPalavraCodigo("");
      setSalvo(false);
    } catch {}
    setApagando(false);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF9F7" }}>
      <QuickExitButton />

      <div className="px-4 pt-14 pb-12 max-w-md mx-auto w-full space-y-6">
        <button onClick={() => navigate("/app/menu")} className="flex items-center gap-2 text-sm focus:outline-none focus:ring-2 rounded" style={{ color: "#78716C" }}>
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        {/* Header com marca-d'água */}
        <div className="flex items-center gap-3 relative overflow-hidden">
          <div className="absolute -top-2 -right-2 pointer-events-none" aria-hidden="true">
            <GravuraAbrigo size={140} color="#0F766E" opacity={0.10} />
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F0FDFA" }}>
            <GravuraAbrigo size={28} color="#0F766E" opacity={1} />
          </div>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "#292524", fontFamily: "var(--font-lora)" }}>Meu Plano de Segurança</h1>
            <p className="text-xs" style={{ color: "#78716C" }}>Privado · Somente você tem acesso</p>
          </div>
        </div>

        <p className="text-base leading-relaxed" style={{ color: "#57534E" }}>
          Prepare-se com calma. Tudo aqui é opcional, editável e só visível para você.
        </p>

        {/* Pessoas de confiança */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold" style={{ color: "#292524" }}>Pessoas de confiança</h2>
          {contatos.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border p-4 space-y-2 bg-white" style={{ borderColor: "#E7E5E4" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: "#78716C" }}>Contato {i + 1}</span>
                {contatos.length > 1 && (
                  <button onClick={() => removerContato(i)} aria-label="Remover contato" className="p-1 rounded focus:outline-none focus:ring-2">
                    <X className="w-3.5 h-3.5" style={{ color: "#B91C1C" }} />
                  </button>
                )}
              </div>
              <input
                value={c.nome}
                onChange={e => alterarContato(i, "nome", e.target.value)}
                placeholder="Nome"
                className="w-full rounded-xl px-3 py-2 text-base border focus:outline-none focus:ring-2"
                style={{ borderColor: "#E7E5E4" }}
              />
              <div className="flex gap-2">
                <input
                  value={c.telefone}
                  onChange={e => alterarContato(i, "telefone", e.target.value)}
                  placeholder="Telefone"
                  type="tel"
                  className="flex-1 rounded-xl px-3 py-2 text-base border focus:outline-none focus:ring-2"
                  style={{ borderColor: "#E7E5E4" }}
                />
                {c.telefone && (
                  <a href={`tel:${c.telefone.replace(/\D/g, "")}`} aria-label={`Ligar para ${c.nome || "contato"}`}>
                    <button className="h-11 w-11 rounded-xl flex items-center justify-center focus:outline-none focus:ring-2" style={{ background: "#F0FDFA" }}>
                      <Phone className="w-4 h-4" style={{ color: "#0F766E" }} />
                    </button>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
          {contatos.length < 3 && (
            <button onClick={adicionarContato} className="flex items-center gap-2 text-sm font-medium focus:outline-none focus:ring-2 rounded" style={{ color: "#0F766E" }}>
              <Plus className="w-4 h-4" /> Adicionar contato
            </button>
          )}
        </section>

        {/* Para onde posso ir */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold" style={{ color: "#292524" }}>Para onde posso ir</h2>
          <textarea
            value={lugarSeguro}
            onChange={e => { setLugarSeguro(e.target.value); setSalvo(false); }}
            placeholder="Endereço ou nome do serviço seguro (ex.: Casa de Acolhimento, casa de familiar...)"
            rows={3}
            className="w-full rounded-xl px-3 py-2.5 text-base border resize-none focus:outline-none focus:ring-2"
            style={{ borderColor: "#E7E5E4" }}
          />
        </section>

        {/* O que levar */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold" style={{ color: "#292524" }}>O que levar</h2>
          <div className="rounded-xl border overflow-hidden bg-white" style={{ borderColor: "#E7E5E4" }}>
            {CHECKLIST_ITEMS.map((item, i) => (
              <label key={item.key} className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${i < CHECKLIST_ITEMS.length - 1 ? "border-b" : ""}`} style={{ borderColor: "#F0EDE8" }}>
                <input
                  type="checkbox"
                  checked={checklist[item.key] || false}
                  onChange={() => alterarCheck(item.key)}
                  className="w-5 h-5 rounded focus:ring-2"
                  style={{ accentColor: "#0F766E" }}
                />
                <span className="text-base" style={{ color: checklist[item.key] ? "#78716C" : "#292524", textDecoration: checklist[item.key] ? "line-through" : "none" }}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Palavra-código */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold" style={{ color: "#292524" }}>Palavra-código</h2>
          <p className="text-sm" style={{ color: "#78716C" }}>Uma palavra combinada com pessoas de confiança para pedir ajuda discretamente.</p>
          <input
            value={palavraCodigo}
            onChange={e => { setPalavraCodigo(e.target.value); setSalvo(false); }}
            placeholder="Ex.: azul, borboleta..."
            className="w-full rounded-xl px-3 py-2.5 text-base border focus:outline-none focus:ring-2"
            style={{ borderColor: "#E7E5E4" }}
          />
        </section>

        {/* Ações */}
        <div className="space-y-3 pt-2">
          <button
            onClick={salvar}
            disabled={salvando}
            className="w-full h-12 rounded-xl text-base font-semibold text-white transition-colors disabled:opacity-40 focus:outline-none focus:ring-2 flex items-center justify-center gap-2"
            style={{ background: "#0F766E" }}
          >
            {salvando ? "Salvando..." : salvo ? "Plano salvo" : <><Save className="w-4 h-4" />Salvar plano</>}
          </button>

          {planoId && (
            <button
              onClick={apagarTudo}
              disabled={apagando}
              className="w-full h-11 rounded-xl text-sm font-semibold border transition-colors disabled:opacity-40 flex items-center justify-center gap-2 focus:outline-none focus:ring-2"
              style={{ borderColor: "#B91C1C33", color: "#B91C1C", background: "#fff" }}
            >
              <Trash2 className="w-4 h-4" /> {apagando ? "Apagando..." : "Apagar meu plano"}
            </button>
          )}

          <p className="text-xs text-center" style={{ color: "#A8A29E" }}>
            Seus registros ficam com ID anônimo. Profissionais não têm acesso.
          </p>
        </div>
      </div>
    </div>
  );
}
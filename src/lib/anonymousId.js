/**
 * Gera e persiste um ID anônimo único por dispositivo.
 * Nunca usa IDs fixos ou sequenciais.
 */
const STORAGE_KEY = "esc_anon_id";

export function getOrCreateAnonymousId() {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    // Gerar ID aleatório com Web Crypto API (disponível em todos os browsers modernos)
    const array = new Uint8Array(12);
    crypto.getRandomValues(array);
    const hex = Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    const id = `ESC-${hex.substring(0, 12)}`;

    localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // Fallback se localStorage não estiver disponível (modo privado restrito)
    const array = new Uint8Array(12);
    crypto.getRandomValues(array);
    const hex = Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    return `ESC-${hex.substring(0, 12)}`;
  }
}

export function clearAnonymousId() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
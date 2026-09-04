import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useAutoLogout } from "./useAutoLogout";

const DOIS_MIN = 2 * 60 * 1000;

/* jsdom expõe visibilityState como somente-leitura; para simular a aba sendo
   ocultada é preciso redefinir a propriedade e disparar o evento à mão. */
function definirVisibilidade(estado) {
  Object.defineProperty(document, "visibilityState", {
    value: estado,
    configurable: true,
  });
  document.dispatchEvent(new Event("visibilitychange"));
}

/* Simula o que o navegador do celular faz em segundo plano: o relógio do mundo
   avança, mas os timers agendados NÃO disparam — ficam congelados. É a
   diferença entre advanceTimersByTime (avança e dispara) e setSystemTime
   (só avança o relógio). */
function tempoPassaComTimersCongelados(ms) {
  act(() => {
    vi.setSystemTime(new Date(Date.now() + ms));
  });
}

describe("useAutoLogout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-04T10:00:00Z"));
    definirVisibilidade("visible");
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("tranca depois do tempo de inatividade", () => {
    const trancou = vi.fn();
    renderHook(() => useAutoLogout({ timeoutMs: DOIS_MIN, onLogout: trancou }));

    act(() => vi.advanceTimersByTime(DOIS_MIN - 1000));
    expect(trancou).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1000));
    expect(trancou).toHaveBeenCalledTimes(1);
  });

  it("adia a tranca quando há atividade", () => {
    const trancou = vi.fn();
    renderHook(() => useAutoLogout({ timeoutMs: DOIS_MIN, onLogout: trancou }));

    // Um minuto parada, depois mexe: a contagem recomeça do zero.
    act(() => vi.advanceTimersByTime(60 * 1000));
    act(() => window.dispatchEvent(new Event("keydown")));

    // Mais 90s — passaria dos 2 min desde a montagem, mas não desde a atividade.
    act(() => vi.advanceTimersByTime(90 * 1000));
    expect(trancou).not.toHaveBeenCalled();

    // Completa 2 min desde a última atividade.
    act(() => vi.advanceTimersByTime(30 * 1000));
    expect(trancou).toHaveBeenCalledTimes(1);
  });

  /* Regressão do defeito 2. Antes, onLogout entrava no array de dependências do
     efeito; como quem chama passa uma arrow function nova a cada render (e o
     value do AuthContext não é memoizado, então todo consumidor re-renderiza),
     o efeito remontava e ZERAVA a contagem. Com re-render a cada 90s a sessão
     nunca trancaria. */
  it("não reinicia a contagem quando o componente re-renderiza", () => {
    const trancou = vi.fn();
    const { rerender } = renderHook(
      ({ cb }) => useAutoLogout({ timeoutMs: DOIS_MIN, onLogout: cb }),
      { initialProps: { cb: () => trancou() } }
    );

    act(() => vi.advanceTimersByTime(90 * 1000));

    // Re-render com uma referência NOVA de callback, como acontece de verdade.
    rerender({ cb: () => trancou() });

    // Faltavam 30s para os 2 min. Se o re-render tivesse zerado o relógio,
    // aqui teriam se passado só 40s da "nova" contagem e nada aconteceria.
    act(() => vi.advanceTimersByTime(40 * 1000));
    expect(trancou).toHaveBeenCalledTimes(1);
  });

  /* Regressão do defeito 1, o mais grave: aparelho com a tela bloqueada.
     O navegador suspende o timer, ele não dispara, e ao voltar a sessão
     continuava aberta. */
  it("tranca ao voltar, mesmo com o timer congelado em segundo plano", () => {
    const trancou = vi.fn();
    renderHook(() => useAutoLogout({ timeoutMs: DOIS_MIN, onLogout: trancou }));

    act(() => vi.advanceTimersByTime(10 * 1000));
    definirVisibilidade("hidden");

    // Uma hora de tela bloqueada, sem nenhum timer disparar.
    tempoPassaComTimersCongelados(60 * 60 * 1000);
    expect(trancou).not.toHaveBeenCalled(); // nada rodou enquanto oculta

    act(() => definirVisibilidade("visible"));
    expect(trancou).toHaveBeenCalledTimes(1);
  });

  it("não tranca numa troca rápida de aba (carência de 30s)", () => {
    const trancou = vi.fn();
    renderHook(() => useAutoLogout({ timeoutMs: DOIS_MIN, onLogout: trancou }));

    act(() => vi.advanceTimersByTime(10 * 1000));
    definirVisibilidade("hidden");

    tempoPassaComTimersCongelados(5 * 1000); // consulta rápida
    act(() => definirVisibilidade("visible"));

    expect(trancou).not.toHaveBeenCalled();
  });

  it("apaga rascunhos e chaves sensíveis ao trancar", () => {
    localStorage.setItem("diary_draft", "texto que estava sendo escrito");
    localStorage.setItem("diary_master_key", "chave");
    localStorage.setItem("acessibilidade", "manter"); // não é sensível
    sessionStorage.setItem("qualquer", "some");

    renderHook(() => useAutoLogout({ timeoutMs: DOIS_MIN, onLogout: () => {} }));
    act(() => vi.advanceTimersByTime(DOIS_MIN));

    expect(localStorage.getItem("diary_draft")).toBeNull();
    expect(localStorage.getItem("diary_master_key")).toBeNull();
    expect(sessionStorage.getItem("qualquer")).toBeNull();
    expect(localStorage.getItem("acessibilidade")).toBe("manter");
  });

  it("para de contar depois de desmontado", () => {
    const trancou = vi.fn();
    const { unmount } = renderHook(() =>
      useAutoLogout({ timeoutMs: DOIS_MIN, onLogout: trancou })
    );

    unmount();
    act(() => vi.advanceTimersByTime(DOIS_MIN * 2));
    expect(trancou).not.toHaveBeenCalled();
  });
});

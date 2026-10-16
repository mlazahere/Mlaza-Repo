"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getProduct, type Product } from "@/lib/catalogue";
import { MAX_QTY } from "@/lib/pricing";

type Line = { slug: string; quantity: number };
export type BagLine = { product: Product; quantity: number; lineTotal: number };
type Panel = "bag" | "menu" | "search" | null;

type Store = {
  lines: BagLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  panel: Panel;
  openPanel: (p: Panel) => void;
  closePanel: () => void;
  lastAdded: { slug: string; at: number } | null;
};

const StoreContext = createContext<Store | null>(null);
const KEY = "mlaza-bag-v1";

function readStored(): Line[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l) => l && typeof l.slug === "string" && getProduct(l.slug))
      .map((l) => ({ slug: l.slug, quantity: Math.min(MAX_QTY, Math.max(1, Math.floor(Number(l.quantity)) || 1)) }));
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [lastAdded, setLastAdded] = useState<Store["lastAdded"]>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    setRaw(readStored());
    setReady(true);
    hydrated.current = true;
    // keep bags in sync across tabs
    const onStorage = (e: StorageEvent) => e.key === KEY && setRaw(readStored());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(raw));
    } catch {
      /* storage unavailable (private mode) — bag still works for this visit */
    }
  }, [raw]);

  const add = useCallback((slug: string, quantity = 1) => {
    const product = getProduct(slug);
    if (!product || product.availability === "sold_out") return;
    setRaw((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) => (l.slug === slug ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l));
      }
      return [...prev, { slug, quantity: Math.min(MAX_QTY, quantity) }];
    });
    setLastAdded({ slug, at: Date.now() });
    setPanel("bag");
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setRaw((prev) =>
      quantity < 1
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => setRaw((prev) => prev.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setRaw([]), []);
  const openPanel = useCallback((p: Panel) => setPanel(p), []);
  const closePanel = useCallback(() => setPanel(null), []);

  const value = useMemo<Store>(() => {
    const lines = raw
      .map((l) => {
        const product = getProduct(l.slug);
        return product ? { product, quantity: l.quantity, lineTotal: product.price * l.quantity } : null;
      })
      .filter((l): l is BagLine => l !== null);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      ready,
      add,
      setQuantity,
      remove,
      clear,
      panel,
      openPanel,
      closePanel,
      lastAdded,
    };
  }, [raw, ready, add, setQuantity, remove, clear, panel, openPanel, closePanel, lastAdded]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

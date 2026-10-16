"use client";

import { useEffect } from "react";
import { useStore } from "./StoreProvider";

export function ClearBag() {
  const { clear, ready } = useStore();
  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);
  return null;
}

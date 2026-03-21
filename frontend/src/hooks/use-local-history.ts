"use client";

import { useEffect, useState } from "react";

export interface HistoryItem {
  id: string;
  type: "data" | "document";
  question: string;
  createdAt: string;
}

const STORAGE_KEY = "business-query-history";

export function useLocalHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      setHistory(JSON.parse(raw));
    }
  }, []);

  const persist = (items: HistoryItem[]) => {
    setHistory(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const addHistory = (item: Omit<HistoryItem, "id" | "createdAt">) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    persist([newItem, ...history].slice(0, 10));
  };

  const clearHistory = () => {
    persist([]);
  };

  return { history, addHistory, clearHistory };
}
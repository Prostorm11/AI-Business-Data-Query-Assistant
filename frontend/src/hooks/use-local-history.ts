import { useEffect, useState } from "react";
import type { RecentQuery, SavedPrompt, QueryTabType } from "../lib/types/common";

const RECENT_QUERIES_KEY = "bqa_recent_queries";
const SAVED_PROMPTS_KEY = "bqa_saved_prompts";

function readFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeToStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalHistory() {
  const [recentQueries, setRecentQueries] = useState<RecentQuery[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);

  useEffect(() => {
    setRecentQueries(readFromStorage<RecentQuery[]>(RECENT_QUERIES_KEY, []));
    setSavedPrompts(readFromStorage<SavedPrompt[]>(SAVED_PROMPTS_KEY, []));
  }, []);

  const addRecentQuery = (query: string, type: QueryTabType) => {
    const newItem: RecentQuery = {
      id: crypto.randomUUID(),
      query,
      type,
      timestamp: new Date().toISOString(),
    };

    setRecentQueries((prev) => {
      const deduped = prev.filter(
        (item) => !(item.query === query && item.type === type)
      );
      const next = [newItem, ...deduped].slice(0, 10);
      writeToStorage(RECENT_QUERIES_KEY, next);
      return next;
    });
  };

  const clearRecentQueries = () => {
    setRecentQueries([]);
    writeToStorage(RECENT_QUERIES_KEY, []);
  };

  const savePrompt = (label: string, query: string, type: QueryTabType) => {
    const newPrompt: SavedPrompt = {
      id: crypto.randomUUID(),
      label: label.trim() || query.slice(0, 40),
      query,
      type,
      createdAt: new Date().toISOString(),
    };

    setSavedPrompts((prev) => {
      const next = [newPrompt, ...prev].slice(0, 20);
      writeToStorage(SAVED_PROMPTS_KEY, next);
      return next;
    });
  };

  const removeSavedPrompt = (id: string) => {
    setSavedPrompts((prev) => {
      const next = prev.filter((item) => item.id !== id);
      writeToStorage(SAVED_PROMPTS_KEY, next);
      return next;
    });
  };

  return {
    recentQueries,
    savedPrompts,
    addRecentQuery,
    clearRecentQueries,
    savePrompt,
    removeSavedPrompt,
  };
}
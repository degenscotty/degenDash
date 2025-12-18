import { useState, useEffect } from "react";
import type { TradeRecord } from "@/types";

const HISTORY_STORAGE_KEY = "degenDash_tradeHistory";

/**
 * Hook to manage trade history with localStorage persistence
 */
export function useTradeHistory() {
  const [history, setHistory] = useState<TradeRecord[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Sort by timestamp descending (newest first)
        const sorted = parsed.sort(
          (a: TradeRecord, b: TradeRecord) => b.timestamp - a.timestamp
        );
        setHistory(sorted);
      }
    } catch (error) {
      console.error("Error loading trade history:", error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Error saving trade history:", error);
    }
  }, [history]);

  const addTradeRecord = (record: Omit<TradeRecord, "id" | "timestamp">) => {
    const newRecord: TradeRecord = {
      ...record,
      id: `trade-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    setHistory([newRecord, ...history]);
  };

  const updateTradeRecord = (id: string, updates: Partial<TradeRecord>) => {
    setHistory(
      history.map((record) =>
        record.id === id ? { ...record, ...updates } : record
      )
    );
  };

  const deleteTradeRecord = (id: string) => {
    setHistory(history.filter((record) => record.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getRecentTrades = (limit: number = 10): TradeRecord[] => {
    return history.slice(0, limit);
  };

  const getTradesByToken = (tokenAddress: string): TradeRecord[] => {
    return history.filter(
      (record) =>
        record.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
    );
  };

  return {
    history,
    addTradeRecord,
    updateTradeRecord,
    deleteTradeRecord,
    clearHistory,
    getRecentTrades,
    getTradesByToken,
  };
}

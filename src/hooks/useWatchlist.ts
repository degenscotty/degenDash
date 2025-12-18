import { useState, useEffect } from "react";
import type { WatchlistItem } from "@/types";

const WATCHLIST_STORAGE_KEY = "degenDash_watchlist";

/**
 * Hook to manage watchlist with localStorage persistence
 */
export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading watchlist:", error);
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error("Error saving watchlist:", error);
    }
  }, [watchlist]);

  const addToWatchlist = (item: Omit<WatchlistItem, "addedAt">) => {
    const exists = watchlist.some(
      (w) => w.tokenAddress.toLowerCase() === item.tokenAddress.toLowerCase()
    );

    if (!exists) {
      setWatchlist([
        ...watchlist,
        {
          ...item,
          addedAt: Date.now(),
        },
      ]);
    }
  };

  const removeFromWatchlist = (tokenAddress: string) => {
    setWatchlist(
      watchlist.filter(
        (item) => item.tokenAddress.toLowerCase() !== tokenAddress.toLowerCase()
      )
    );
  };

  const updateWatchlistItem = (
    tokenAddress: string,
    updates: Partial<WatchlistItem>
  ) => {
    setWatchlist(
      watchlist.map((item) =>
        item.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
          ? { ...item, ...updates }
          : item
      )
    );
  };

  const isInWatchlist = (tokenAddress: string): boolean => {
    return watchlist.some(
      (item) => item.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
    );
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    updateWatchlistItem,
    isInWatchlist,
    clearWatchlist,
  };
}

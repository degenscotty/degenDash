import { useState, useEffect } from "react";
import type { InfluencerItem } from "@/types";
import { mockInfluencers } from "@/mocks/data";

const INFLUENCERS_STORAGE_KEY = "degenDash_influencers";

/**
 * Hook to manage influencer/channel watchlist with localStorage persistence
 */
export function useInfluencers() {
  const [influencers, setInfluencers] = useState<InfluencerItem[]>(() => {
    try {
      const stored = localStorage.getItem(INFLUENCERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return mockInfluencers;
    } catch (error) {
      console.error("Error loading influencers:", error);
      return mockInfluencers;
    }
  });

  // Initialize localStorage with mock data if empty
  useEffect(() => {
    const stored = localStorage.getItem(INFLUENCERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(INFLUENCERS_STORAGE_KEY, JSON.stringify(mockInfluencers));
    }
  }, []);

  // Save influencers to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(INFLUENCERS_STORAGE_KEY, JSON.stringify(influencers));
    } catch (error) {
      console.error("Error saving influencers:", error);
    }
  }, [influencers]);

  const addInfluencer = (item: Omit<InfluencerItem, "id" | "addedAt">) => {
    const exists = influencers.some(
      (i) => i.handle.toLowerCase() === item.handle.toLowerCase() && i.platform === item.platform
    );

    if (!exists) {
      setInfluencers([
        ...influencers,
        {
          ...item,
          id: `${item.platform}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          addedAt: Date.now(),
        },
      ]);
    }
  };

  const removeInfluencer = (id: string) => {
    setInfluencers(influencers.filter((item) => item.id !== id));
  };

  const updateInfluencer = (id: string, updates: Partial<InfluencerItem>) => {
    setInfluencers(
      influencers.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const getInfluencersByPlatform = (platform: "twitter" | "telegram") => {
    return influencers.filter((i) => i.platform === platform);
  };

  const clearInfluencers = () => {
    setInfluencers([]);
  };

  return {
    influencers,
    addInfluencer,
    removeInfluencer,
    updateInfluencer,
    getInfluencersByPlatform,
    clearInfluencers,
  };
}


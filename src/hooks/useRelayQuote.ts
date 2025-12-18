import { useState } from "react";
import type { TradeQuote, RelayQuoteRequest } from "@/types";
import { getRelayQuote } from "@/services/api";

interface UseRelayQuoteResult {
  quote: TradeQuote | null;
  loading: boolean;
  error: string | null;
  getQuote: (request: RelayQuoteRequest) => Promise<void>;
  clear: () => void;
}

/**
 * Hook to get trade quotes from Relay Protocol
 */
export function useRelayQuote(agentUrl?: string): UseRelayQuoteResult {
  const [quote, setQuote] = useState<TradeQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getQuote = async (request: RelayQuoteRequest) => {
    const url = agentUrl || "http://localhost:8080"; // Default mock URL

    setLoading(true);
    setError(null);

    try {
      const response = await getRelayQuote(url, request);

      if (response.success && response.data) {
        setQuote(response.data);
      } else {
        setError(response.error || "Failed to get quote");
        setQuote(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Quote request failed");
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setQuote(null);
    setError(null);
  };

  return {
    quote,
    loading,
    error,
    getQuote,
    clear,
  };
}

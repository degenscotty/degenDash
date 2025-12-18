import { useState, useEffect } from "react";
import type { TokenData } from "@/types";
import { fetchTokenData, searchTokens } from "@/services/api";

interface UseTokenDataResult {
  data: TokenData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch token data by address
 */
export function useTokenData(
  tokenAddress: string | undefined
): UseTokenDataResult {
  const [data, setData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!tokenAddress) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchTokenData(tokenAddress);
      if (result) {
        setData(result);
      } else {
        setError("Token not found");
        setData(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch token data"
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tokenAddress]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

interface UseTokenSearchResult {
  results: TokenData[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  clear: () => void;
}

/**
 * Hook to search for tokens
 */
export function useTokenSearch(): UseTokenSearchResult {
  const [results, setResults] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchTokens(query);
      setResults(searchResults);

      if (searchResults.length === 0) {
        setError("No tokens found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    loading,
    error,
    search,
    clear,
  };
}

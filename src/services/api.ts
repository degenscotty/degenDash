import type {
  TokenData,
  DexScreenerPair,
  TradeQuote,
  AgentResponse,
  RelayQuoteRequest,
  ScraperRequest,
  ScraperResponse,
} from "@/types";
import { generateMockQuote } from "@/mocks/data";

// DexScreener API base URL
const DEXSCREENER_API = "https://api.dexscreener.com/latest/dex";

/**
 * Transform DexScreener pair data to our TokenData format
 */
function transformDexScreenerData(pair: DexScreenerPair): TokenData {
  return {
    address: pair.baseToken.address,
    symbol: pair.baseToken.symbol,
    name: pair.baseToken.name,
    price: parseFloat(pair.priceUsd) || 0,
    priceChange24h: pair.priceChange.h24 || 0,
    volume24h: pair.volume.h24 || 0,
    liquidity: pair.liquidity?.usd || 0,
    marketCap: pair.marketCap || 0,
    fdv: pair.fdv || 0,
    chainId: pair.chainId,
    dexId: pair.dexId,
    pairAddress: pair.pairAddress,
    url: pair.url,
    txns24h: {
      buys: pair.txns.h24?.buys || 0,
      sells: pair.txns.h24?.sells || 0,
    },
  };
}

/**
 * Fetch token data from DexScreener by address
 * @param tokenAddress - Token contract address
 * @returns TokenData or null if not found
 */
export async function fetchTokenData(
  tokenAddress: string
): Promise<TokenData | null> {
  try {
    const response = await fetch(`${DEXSCREENER_API}/tokens/${tokenAddress}`);

    if (!response.ok) {
      console.error("DexScreener API error:", response.statusText);
      return null;
    }

    const data = await response.json();

    // DexScreener returns an array of pairs for the token
    if (data.pairs && data.pairs.length > 0) {
      // Get the pair with highest liquidity
      const bestPair = data.pairs.reduce((best: DexScreenerPair, current: DexScreenerPair) => {
        const bestLiq = best.liquidity?.usd || 0;
        const currentLiq = current.liquidity?.usd || 0;
        return currentLiq > bestLiq ? current : best;
      });

      return transformDexScreenerData(bestPair);
    }

    return null;
  } catch (error) {
    console.error("Error fetching token data:", error);
    return null;
  }
}

/**
 * Search for tokens on DexScreener
 * @param query - Search query (token name, symbol, or address)
 * @returns Array of matching tokens
 */
export async function searchTokens(query: string): Promise<TokenData[]> {
  try {
    const response = await fetch(
      `${DEXSCREENER_API}/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      console.error("DexScreener search error:", response.statusText);
      return [];
    }

    const data = await response.json();

    if (data.pairs && data.pairs.length > 0) {
      return data.pairs.map((pair: DexScreenerPair) =>
        transformDexScreenerData(pair)
      );
    }

    return [];
  } catch (error) {
    console.error("Error searching tokens:", error);
    return [];
  }
}

/**
 * Generic OpenServ agent caller
 * @param agentUrl - Base URL of the OpenServ agent
 * @param capability - The capability/tool name to call
 * @param args - Arguments to pass to the agent
 * @returns Agent response
 */
export async function callOpenServAgent<T>(
  agentUrl: string,
  capability: string,
  args: Record<string, unknown>
): Promise<AgentResponse<T>> {
  try {
    console.log(`🤖 Calling OpenServ agent: ${agentUrl}/tools/${capability}`);
    console.log("📤 Request args:", args);

    const response = await fetch(`${agentUrl}/tools/${capability}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ args }),
    });

    if (!response.ok) {
      console.error("Agent call failed:", response.statusText);
      return {
        success: false,
        error: `Agent returned ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log("📥 Agent response:", data);

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    console.error("Error calling OpenServ agent:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get a trade quote from Relay Protocol via OpenServ agent
 * For now, this returns mock data with a simulated delay
 * @param agentUrl - URL of the Relay Protocol agent
 * @param request - Quote request parameters
 * @returns Trade quote
 */
export async function getRelayQuote(
  agentUrl: string,
  request: RelayQuoteRequest
): Promise<AgentResponse<TradeQuote>> {
  // Simulate agent call with delay
  console.log("🤖 [MOCK] Calling Relay Protocol agent:", agentUrl);
  console.log("📤 [MOCK] Quote request:", request);

  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockQuote = generateMockQuote(
    request.fromToken,
    request.toToken,
    request.amount
  );

  console.log("📥 [MOCK] Quote response:", mockQuote);

  return {
    success: true,
    data: mockQuote,
    message: "Mock quote generated (agent not yet connected)",
  };

  // When the real agent is ready, uncomment this:
  // return callOpenServAgent<TradeQuote>(agentUrl, 'quote', request);
}

/**
 * Call scraper agent to get posts from Twitter/Telegram
 * For now, this returns mock data with a simulated delay
 * @param agentUrl - URL of the scraper agent
 * @param request - Scraper request parameters
 * @returns Scraped posts and extracted tokens
 */
export async function callScraperAgent(
  agentUrl: string,
  request: ScraperRequest
): Promise<AgentResponse<ScraperResponse>> {
  // Simulate agent call with delay
  console.log("🤖 [MOCK] Calling scraper agent:", agentUrl);
  console.log("📤 [MOCK] Scraper request:", request);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockResponse: ScraperResponse = {
    posts: [
      {
        id: "1",
        content: `Check out $PEPE and $WIF - looking bullish! 🚀`,
        timestamp: Date.now() - 3600000,
        mentions: ["@cryptotrader"],
        cryptoProjects: ["PEPE", "WIF"],
      },
      {
        id: "2",
        content: `$BONK is trending hard today. New ATH incoming?`,
        timestamp: Date.now() - 7200000,
        mentions: [],
        cryptoProjects: ["BONK"],
      },
    ],
    extractedTokens: ["PEPE", "WIF", "BONK"],
  };

  console.log("📥 [MOCK] Scraper response:", mockResponse);

  return {
    success: true,
    data: mockResponse,
    message: "Mock scraper data (agent not yet connected)",
  };

  // When the real agent is ready, uncomment this:
  // return callOpenServAgent<ScraperResponse>(agentUrl, 'scrape', request);
}

/**
 * Execute a trade via OpenServ trading agent
 * This is not yet implemented - placeholder for future
 * @param agentUrl - URL of the trading agent
 * @param tradeParams - Trade execution parameters
 */
export async function executeTrade(
  agentUrl: string,
  tradeParams: Record<string, unknown>
): Promise<AgentResponse<{ txHash: string }>> {
  console.log("🚫 Trade execution not yet available");
  console.log("Would call:", agentUrl, "with:", tradeParams);

  return {
    success: false,
    error: "Trade execution agent not yet connected",
  };
}


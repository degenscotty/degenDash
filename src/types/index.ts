// DexScreener API response types
export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
}

// Simplified token data for our app
export interface TokenData {
  address: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
  chainId: string;
  dexId: string;
  pairAddress: string;
  url: string;
  txns24h: {
    buys: number;
    sells: number;
  };
}

// Relay Protocol quote
export interface TradeQuote {
  id: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  estimatedOutput: string;
  priceImpact: number;
  fee: string;
  route: string[];
  estimatedGas: string;
  timestamp: number;
}

// Trade history record
export interface TradeRecord {
  id: string;
  timestamp: number;
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  type: "buy" | "sell";
  amount: string;
  price: number;
  totalValue: number;
  status: "pending" | "completed" | "failed";
  txHash?: string;
}

// Watchlist item (for tokens)
export interface WatchlistItem {
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  addedAt: number;
  notes?: string;
}

// Influencer/Channel item (for social scraping)
export interface InfluencerItem {
  id: string;
  platform: "twitter" | "telegram";
  handle: string;
  displayName: string;
  addedAt: number;
  lastScraped?: number;
  notes?: string;
}

// Scraped post from influencer
export interface ScrapedPost {
  id: string;
  influencerId: string;
  influencerHandle: string;
  platform: "twitter" | "telegram";
  content: string;
  timestamp: number;
  mentionedTokens: string[];
  url?: string;
}

// OpenServ agent response structure
export interface AgentResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Settings configuration
export interface AppSettings {
  relayAgentUrl: string;
  scraperAgentUrl: string;
  defaultSlippage: number;
  autoRefresh: boolean;
  refreshInterval: number;
}

// Agent request types
export interface RelayQuoteRequest {
  fromToken: string;
  toToken: string;
  amount: string;
  slippage?: number;
}

export interface ScraperRequest {
  platform: "twitter" | "telegram";
  handle: string;
  limit?: number;
}

export interface ScraperResponse {
  posts: Array<{
    id: string;
    content: string;
    timestamp: number;
    mentions: string[];
    cryptoProjects: string[];
  }>;
  extractedTokens: string[];
}


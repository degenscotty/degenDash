import type {
  TokenData,
  TradeQuote,
  TradeRecord,
  WatchlistItem,
  InfluencerItem,
  ScrapedPost,
} from "@/types";

// Sample token data
export const mockTokens: TokenData[] = [
  {
    address: "0x1234567890123456789012345678901234567890",
    symbol: "PEPE",
    name: "Pepe",
    price: 0.00000123,
    priceChange24h: 15.5,
    volume24h: 15420000,
    liquidity: 8500000,
    marketCap: 520000000,
    fdv: 520000000,
    chainId: "ethereum",
    dexId: "uniswap",
    pairAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    url: "https://dexscreener.com/ethereum/0xabcdef1234567890abcdef1234567890abcdef12",
    txns24h: {
      buys: 4521,
      sells: 3890,
    },
  },
  {
    address: "0x2345678901234567890123456789012345678901",
    symbol: "WIF",
    name: "dogwifhat",
    price: 2.45,
    priceChange24h: -5.2,
    volume24h: 28500000,
    liquidity: 12000000,
    marketCap: 2450000000,
    fdv: 2450000000,
    chainId: "solana",
    dexId: "raydium",
    pairAddress: "0xbcdef12345678901bcdef12345678901bcdef123",
    url: "https://dexscreener.com/solana/0xbcdef12345678901bcdef12345678901bcdef123",
    txns24h: {
      buys: 8921,
      sells: 7234,
    },
  },
  {
    address: "0x3456789012345678901234567890123456789012",
    symbol: "BONK",
    name: "Bonk",
    price: 0.000025,
    priceChange24h: 8.7,
    volume24h: 19200000,
    liquidity: 6800000,
    marketCap: 1650000000,
    fdv: 1650000000,
    chainId: "solana",
    dexId: "raydium",
    pairAddress: "0xcdef123456789012cdef123456789012cdef1234",
    url: "https://dexscreener.com/solana/0xcdef123456789012cdef123456789012cdef1234",
    txns24h: {
      buys: 6754,
      sells: 5432,
    },
  },
];

// Sample trade quotes
export const mockQuotes: TradeQuote[] = [
  {
    id: "quote-1",
    fromToken: "USDC",
    toToken: "PEPE",
    fromAmount: "100",
    toAmount: "81300813",
    estimatedOutput: "81300813",
    priceImpact: 0.12,
    fee: "0.30",
    route: ["USDC", "WETH", "PEPE"],
    estimatedGas: "0.0023",
    timestamp: Date.now(),
  },
  {
    id: "quote-2",
    fromToken: "USDC",
    toToken: "WIF",
    fromAmount: "100",
    toAmount: "40.82",
    estimatedOutput: "40.82",
    priceImpact: 0.08,
    fee: "0.30",
    route: ["USDC", "SOL", "WIF"],
    estimatedGas: "0.00015",
    timestamp: Date.now(),
  },
];

// Sample trade history
export const mockTradeHistory: TradeRecord[] = [
  {
    id: "trade-1",
    timestamp: Date.now() - 3600000 * 2, // 2 hours ago
    tokenAddress: "0x1234567890123456789012345678901234567890",
    tokenSymbol: "PEPE",
    tokenName: "Pepe",
    type: "buy",
    amount: "50000000",
    price: 0.0000012,
    totalValue: 60,
    status: "completed",
    txHash:
      "0xabc123def456789abc123def456789abc123def456789abc123def456789abc123",
  },
  {
    id: "trade-2",
    timestamp: Date.now() - 3600000 * 5, // 5 hours ago
    tokenAddress: "0x2345678901234567890123456789012345678901",
    tokenSymbol: "WIF",
    tokenName: "dogwifhat",
    type: "buy",
    amount: "25",
    price: 2.38,
    totalValue: 59.5,
    status: "completed",
    txHash:
      "0xdef456789abc123def456789abc123def456789abc123def456789abc123def456",
  },
  {
    id: "trade-3",
    timestamp: Date.now() - 3600000 * 24, // 1 day ago
    tokenAddress: "0x1234567890123456789012345678901234567890",
    tokenSymbol: "PEPE",
    tokenName: "Pepe",
    type: "sell",
    amount: "30000000",
    price: 0.00000125,
    totalValue: 37.5,
    status: "completed",
    txHash:
      "0x789abc123def456789abc123def456789abc123def456789abc123def456789abc",
  },
  {
    id: "trade-4",
    timestamp: Date.now() - 3600000 * 48, // 2 days ago
    tokenAddress: "0x3456789012345678901234567890123456789012",
    tokenSymbol: "BONK",
    tokenName: "Bonk",
    type: "buy",
    amount: "2000000",
    price: 0.000024,
    totalValue: 48,
    status: "completed",
    txHash:
      "0x123def456789abc123def456789abc123def456789abc123def456789abc123def",
  },
];

// Sample watchlist
export const mockWatchlist: WatchlistItem[] = [
  {
    tokenAddress: "0x1234567890123456789012345678901234567890",
    tokenSymbol: "PEPE",
    tokenName: "Pepe",
    addedAt: Date.now() - 3600000 * 24 * 3, // 3 days ago
    notes: "Strong community, watch for breakout",
  },
  {
    tokenAddress: "0x2345678901234567890123456789012345678901",
    tokenSymbol: "WIF",
    tokenName: "dogwifhat",
    addedAt: Date.now() - 3600000 * 24 * 7, // 7 days ago
    notes: "Trending on social media",
  },
  {
    tokenAddress: "0x3456789012345678901234567890123456789012",
    tokenSymbol: "BONK",
    tokenName: "Bonk",
    addedAt: Date.now() - 3600000 * 24 * 14, // 14 days ago
  },
];

// Helper function to get mock token by address
export function getMockTokenByAddress(address: string): TokenData | undefined {
  return mockTokens.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
}

// Sample influencers/channels
export const mockInfluencers: InfluencerItem[] = [
  {
    id: "twitter-1",
    platform: "twitter",
    handle: "@kaduna",
    displayName: "Kaduna | Crypto Degen",
    addedAt: Date.now() - 3600000 * 24 * 7, // 7 days ago
    lastScraped: Date.now() - 3600000 * 2, // 2 hours ago
    notes: "Great alpha, early calls",
  },
  {
    id: "twitter-2",
    platform: "twitter",
    handle: "@cryptowhale",
    displayName: "Crypto Whale 🐋",
    addedAt: Date.now() - 3600000 * 24 * 14, // 14 days ago
    lastScraped: Date.now() - 3600000 * 8, // 8 hours ago
    notes: "Big moves only",
  },
  {
    id: "twitter-3",
    platform: "twitter",
    handle: "@degen_trader",
    displayName: "Degen Trader",
    addedAt: Date.now() - 3600000 * 24 * 3, // 3 days ago
    notes: "High risk, high reward",
  },
  {
    id: "telegram-1",
    platform: "telegram",
    handle: "degen_calls",
    displayName: "Degen Calls Official",
    addedAt: Date.now() - 3600000 * 24 * 5, // 5 days ago
    lastScraped: Date.now() - 3600000 * 1, // 1 hour ago
  },
  {
    id: "telegram-2",
    platform: "telegram",
    handle: "alpha_signals",
    displayName: "Alpha Signals 📡",
    addedAt: Date.now() - 3600000 * 24 * 10, // 10 days ago
    lastScraped: Date.now() - 3600000 * 3, // 3 hours ago
    notes: "Premium calls",
  },
];

// Sample scraped posts
export const mockScrapedPosts: ScrapedPost[] = [
  {
    id: "post-1",
    influencerId: "twitter-1",
    influencerHandle: "@kaduna",
    platform: "twitter",
    content:
      "Just aped into $AVICI 🚀 This one's gonna moon! Team is doxxed, liquidity locked. Don't fade this.",
    timestamp: Date.now() - 3600000 * 2, // 2 hours ago
    mentionedTokens: ["AVICI"],
    url: "https://twitter.com/kaduna/status/123456789",
  },
  {
    id: "post-2",
    influencerId: "twitter-1",
    influencerHandle: "@kaduna",
    platform: "twitter",
    content:
      "$BANANA looking juicy right now 🍌 Chart is perfect, volume coming in. This could be the next 100x",
    timestamp: Date.now() - 3600000 * 5, // 5 hours ago
    mentionedTokens: ["BANANA"],
    url: "https://twitter.com/kaduna/status/123456788",
  },
  {
    id: "post-3",
    influencerId: "twitter-2",
    influencerHandle: "@cryptowhale",
    platform: "twitter",
    content: "Watching $AVICI closely. Big accumulation happening. 👀",
    timestamp: Date.now() - 3600000 * 8, // 8 hours ago
    mentionedTokens: ["AVICI"],
    url: "https://twitter.com/cryptowhale/status/123456787",
  },
  {
    id: "post-4",
    influencerId: "telegram-1",
    influencerHandle: "degen_calls",
    platform: "telegram",
    content:
      "🔥 NEW CALL 🔥\n\n$BANANA on Base\n\nMC: 500k\nLiquidity: Locked\nContract: Renounced\n\nThis is not financial advice. DYOR!",
    timestamp: Date.now() - 3600000 * 1, // 1 hour ago
    mentionedTokens: ["BANANA"],
  },
];

// Helper function to generate a random mock quote
export function generateMockQuote(
  fromToken: string,
  toToken: string,
  amount: string
): TradeQuote {
  const amountNum = parseFloat(amount);
  const mockPrice = Math.random() * 10 + 0.5;
  const estimatedOutput = (amountNum / mockPrice).toFixed(6);

  return {
    id: `quote-${Date.now()}`,
    fromToken,
    toToken,
    fromAmount: amount,
    toAmount: estimatedOutput,
    estimatedOutput,
    priceImpact: Math.random() * 2,
    fee: (amountNum * 0.003).toFixed(2),
    route: [fromToken, "Bridge", toToken],
    estimatedGas: (Math.random() * 0.01).toFixed(6),
    timestamp: Date.now(),
  };
}

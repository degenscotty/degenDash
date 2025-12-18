# DegenDash 🚀

A modern crypto trading dashboard powered by OpenServ AI agents, DexScreener API, and Relay Protocol.

![DegenDash](https://img.shields.io/badge/status-beta-blue)
![React](https://img.shields.io/badge/react-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue)

## Features

✨ **Token Search & Analysis**
- Search tokens by address or symbol using DexScreener API
- Real-time price data, volume, liquidity, and market cap
- 24-hour price changes and transaction metrics
- Interactive charts and visualizations

🤖 **OpenServ Agent Integration**
- Relay Protocol agent for trade quotes (mock implementation ready)
- Scraper agent support (Twitter/Telegram - coming soon)
- Generic agent communication framework

💎 **Watchlist Management**
- Save favorite tokens for quick access
- Track multiple tokens with notes
- LocalStorage persistence

📊 **Trade History**
- View past trades and transactions
- Filter by token and status
- Export and analysis tools

⚙️ **Settings & Configuration**
- Configure OpenServ agent URLs
- Customize slippage tolerance
- Auto-refresh options
- Dark/Light/System themes

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **Charts**: Recharts
- **State Management**: React Hooks + LocalStorage
- **API Integration**: DexScreener (live), OpenServ Agents (mock)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd degenDash
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── App.tsx                    # Route definitions
├── main.tsx                   # Entry point
├── pages/                     # Page components
│   ├── Dashboard.tsx          # Home page with stats
│   ├── TokenSearch.tsx        # Token search interface
│   ├── Analysis.tsx           # Token analysis & data
│   ├── Trade.tsx              # Trade quotes & execution
│   ├── Watchlist.tsx          # Saved tokens
│   ├── History.tsx            # Trade history
│   └── Settings.tsx           # App configuration
├── components/
│   ├── AppLayout.tsx          # Main layout with sidebar
│   ├── Logo.tsx               # App logo
│   ├── ThemeToggle.tsx        # Dark/light mode
│   ├── ThemeProvider.tsx      # Theme context
│   ├── features/              # Feature-specific components
│   │   ├── token/             # Token components
│   │   │   ├── TokenSearchForm.tsx
│   │   │   ├── TokenCard.tsx
│   │   │   ├── TokenMetrics.tsx
│   │   │   └── TokenChart.tsx
│   │   ├── trade/             # Trade components
│   │   │   ├── TradeForm.tsx
│   │   │   ├── QuoteDisplay.tsx
│   │   │   └── TradePreview.tsx
│   │   └── watchlist/         # Watchlist components
│   │       ├── WatchlistTable.tsx
│   │       └── AddToWatchlistButton.tsx
│   └── ui/                    # shadcn/ui components
├── services/
│   └── api.ts                 # API calls & agent communication
├── hooks/                     # Custom React hooks
│   ├── useTokenData.ts        # Token data fetching
│   ├── useRelayQuote.ts       # Quote management
│   ├── useWatchlist.ts        # Watchlist state
│   └── useTradeHistory.ts     # History state
├── types/
│   └── index.ts              # TypeScript definitions
├── mocks/
│   └── data.ts               # Mock data for development
└── lib/
    ├── utils.ts              # Utility functions
    └── initMockData.ts       # Mock data initialization
```

## Usage

### Searching for Tokens

1. Navigate to **Token Search** from the sidebar
2. Enter a token address (e.g., `0x1234...`) or symbol (e.g., `PEPE`)
3. Click **Search** to find tokens on DexScreener
4. Select a token to view detailed analysis

### Analyzing Tokens

The Analysis page shows:
- Current price and 24h change
- Market cap, volume, and liquidity
- Buy/sell transaction counts
- Volume distribution chart
- DEX and chain information

### Getting Trade Quotes

1. From the Analysis page, click **Get Quote**
2. Enter trade details:
   - From token (USDC, USDT, ETH, SOL)
   - Amount to trade
   - Slippage tolerance
3. Click **Get Quote** to see the estimated trade
4. Review quote details including:
   - Estimated output
   - Price impact
   - Fees and gas costs
   - Trading route

**Note**: Trade execution is not yet available. This currently shows mock quotes for demonstration.

### Managing Watchlist

- Click the **Star** button on any Analysis page to add to watchlist
- View all watched tokens from the **Watchlist** page
- Quick actions: Analyze, Get Quote, or Remove

### Viewing History

- Navigate to **History** to see all recorded trades
- Each entry shows timestamp, token, type, amount, and status
- Click transaction hash to view on blockchain explorer

### Configuration

In **Settings**, you can:
- Set OpenServ agent URLs (Relay Protocol, Scraper)
- Configure default slippage tolerance
- Enable/disable auto-refresh
- Set refresh interval

## API Integration

### DexScreener (Live)

The app uses DexScreener's public API to fetch real-time token data:

```typescript
// Fetch token by address
const tokenData = await fetchTokenData("0x...");

// Search tokens
const results = await searchTokens("PEPE");
```

**Endpoints used:**
- `GET /latest/dex/tokens/{address}`
- `GET /latest/dex/search?q={query}`

### OpenServ Agents (Mock)

The app is designed to work with OpenServ agents but currently uses mock data:

```typescript
// Generic agent call pattern
const response = await callOpenServAgent(
  "http://agent-url:port",
  "capability-name",
  { /* args */ }
);
```

**Supported agent types:**
- **Relay Protocol Agent**: Get trade quotes (mock)
- **Scraper Agent**: Twitter/Telegram scraping (coming soon)
- **Trading Agent**: Execute trades (coming soon)

To connect real agents, update the URLs in Settings.

## Mock Data

For demonstration purposes, the app includes:
- Sample token data (PEPE, WIF, BONK)
- Mock trade quotes from "Relay Protocol"
- Pre-populated trade history
- Example watchlist items

Mock data is initialized on first load and persists in localStorage.

## Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Adding New Components

The app uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add [component-name]
```

Available components: button, card, input, table, dialog, etc.

### Code Style

- Use TypeScript for all new files
- Follow existing component patterns
- Use shadcn/ui components only
- Keep components small and focused
- Use custom hooks for state logic

## Future Enhancements

🔮 **Planned Features:**
- [ ] Real OpenServ agent integration
- [ ] Twitter/Telegram scraper implementation
- [ ] Actual trade execution
- [ ] Portfolio tracking
- [ ] Price alerts and notifications
- [ ] Advanced charting (TradingView)
- [ ] Multi-wallet support
- [ ] Transaction signing with wallet connect
- [ ] Historical price data
- [ ] Token comparison tools
- [ ] Social sentiment analysis

## OpenServ Agent Communication

This app follows the OpenServ agent communication pattern:

```typescript
// Agent request format
POST http://agent-url:port/tools/{capability}
Content-Type: application/json

{
  "args": {
    "param1": "value1",
    "param2": "value2"
  }
}

// Agent response format
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional message"
}
```

See [OpenServ Basic Agent Example](https://github.com/issa-me-sush/basic-agent) for reference implementation.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT

## Acknowledgments

- [DexScreener](https://dexscreener.com) for token data API
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [OpenServ](https://openserv.ai) for agent framework
- [Relay Protocol](https://relay.link) for bridging infrastructure

---

Built with ❤️ for the degen community

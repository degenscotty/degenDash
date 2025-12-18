# DegenDash Quick Start Guide

## 🚀 Launch the App

The app is already running at: **http://localhost:5173**

## 📖 Quick Tour

### 1. Dashboard (Home)
- Overview of your activity
- Recent trades display
- Watchlist summary
- Quick navigation buttons

**Try this**: Click "Search Tokens" or "View Watchlist"

### 2. Token Search
Navigate to **Token Search** from the sidebar

**Search Examples:**
- Symbol: `PEPE`, `WIF`, `BONK`
- Address: `0x1234567890123456789012345678901234567890`

**What happens:**
- Real DexScreener API call
- Shows matching tokens
- Click any result to analyze

**Pro tip**: If you have a full address, use "Analyze Address Directly"

### 3. Token Analysis
After selecting a token, you'll see:
- ✅ Current price (live from DexScreener)
- ✅ 24h price change
- ✅ Market cap, volume, liquidity
- ✅ Transaction counts (buys/sells)
- ✅ Volume chart
- ✅ Contract details

**Actions Available:**
- 🌟 Add to Watchlist
- 💰 Get Quote (for trading)
- 🔗 View on DexScreener

### 4. Trade (Get Quotes)
From Analysis page, click "Get Quote"

**Steps:**
1. Select "From" token (USDC, USDT, ETH, SOL)
2. Enter amount to trade
3. Choose slippage tolerance
4. Click "Get Quote"

**What you'll see:**
- Estimated output amount
- Price impact percentage
- Trading fees
- Gas costs
- Route taken

**Note**: This currently shows **mock quotes** from a simulated Relay Protocol agent. Real execution is not yet available.

### 5. Watchlist
View all your saved tokens

**Features:**
- ⭐ Pre-populated with sample tokens (PEPE, WIF, BONK)
- 📊 Quick access to Analysis
- 💹 Quick access to Trade
- 🗑️ Remove tokens
- 💾 Persists in browser storage

**Try this**: 
1. Go to Token Search
2. Find a token
3. Analyze it
4. Click "Add to Watchlist"
5. Return to Watchlist to see it

### 6. Trade History
View past trading activity

**What's included:**
- Sample trade records (demo data)
- Date/time of trades
- Token information
- Buy/sell type
- Amounts and prices
- Status badges
- Transaction hashes (links to explorer)

**Try this**: Click "Clear History" then refresh to reset demo data

### 7. Settings
Configure the application

**Configuration Options:**
- **Relay Protocol Agent URL**: Where to get trade quotes
- **Scraper Agent URL**: For Twitter/Telegram (future)
- **Default Slippage**: Trading slippage tolerance
- **Auto Refresh**: Enable/disable automatic updates
- **Refresh Interval**: How often to refresh data

**Current Defaults:**
- Relay Agent: `http://localhost:8080`
- Scraper Agent: `http://localhost:8081`
- Slippage: 1.0%
- Auto Refresh: Enabled
- Interval: 30 seconds

## 🎮 Try These Workflows

### Workflow 1: Search and Analyze
1. Go to **Token Search**
2. Search for `PEPE`
3. Click on a result
4. View all the metrics and data
5. Add to watchlist
6. Get a quote

### Workflow 2: Quick Watchlist Access
1. Go to **Watchlist**
2. Click 📊 icon next to any token
3. Instant analysis
4. Click 💹 icon for quote

### Workflow 3: Check History
1. Go to **History**
2. Review past trades
3. Click external link icon to "view" transaction
4. Filter by status/type

## 🔍 What's Real vs. Mock

### ✅ Real (Live Data)
- **DexScreener Integration**: All token data is real-time
- **Token Search**: Actual API calls to DexScreener
- **Price Data**: Live prices, volume, liquidity
- **Market Metrics**: Real market cap, FDV, etc.

### 🎭 Mock (Simulated)
- **Trade Quotes**: Simulated Relay Protocol responses
- **Trade Execution**: Not yet available
- **Scraper Agent**: Not yet implemented
- **Historical Charts**: Generated from current data
- **Trade History**: Demo records for illustration

## 🤖 OpenServ Agent Integration

### How It Works
The app is designed to communicate with OpenServ agents using this pattern:

```
POST http://agent-url:port/tools/capability
{
  "args": {
    "param1": "value1",
    "param2": "value2"
  }
}
```

### Current Status
- ✅ Framework implemented
- ✅ Mock responses working
- ✅ Console logging active
- ⏳ Real agents (when you deploy them)

### Connecting Real Agents

**When your OpenServ agents are ready:**

1. Deploy your Relay Protocol agent
2. Note the URL (e.g., `http://your-agent:7380`)
3. Go to **Settings** in the app
4. Update "Relay Protocol Agent" URL
5. Click "Save Settings"
6. Return to Trade page and get quotes

The app will automatically use the real agent instead of mock data!

### View Agent Calls
Open browser console (F12) to see:
- 🤖 Agent call logs
- 📤 Request data sent
- 📥 Response data received
- ⏱️ Timing information

Look for messages like:
```
🤖 [MOCK] Calling Relay Protocol agent: http://localhost:8080
📤 [MOCK] Quote request: {...}
📥 [MOCK] Quote response: {...}
```

## 💡 Tips & Tricks

### Navigation
- Use the **sidebar** for main navigation
- Click **DegenDash logo** to return home
- Press **Cmd/Ctrl + B** to toggle sidebar

### Theme
- Click the **sun/moon icon** in sidebar footer
- Choose Light, Dark, or System theme
- Preference is saved

### Data Persistence
All data is stored in browser localStorage:
- Watchlist survives page refresh
- History is preserved
- Settings are saved
- Clear browser data to reset

### Mock Data Reset
To reset demo data:
1. Open browser console (F12)
2. Run: `localStorage.clear()`
3. Refresh the page
4. Demo data will be reinitialized

## 🐛 Troubleshooting

### Token Not Found
- Verify the address is correct
- Make sure it's traded on supported DEXs
- Try searching by symbol instead

### No Search Results
- Check your internet connection
- DexScreener API might be rate-limited
- Try again in a moment

### Quotes Not Loading
- This is expected (mock mode)
- Console will show simulated delay
- Real agents will fix this

### Charts Not Showing
- Data might be missing for that token
- Check browser console for errors
- Try a different token

## 📚 Learn More

- **DexScreener API**: https://docs.dexscreener.com
- **OpenServ Agents**: https://github.com/issa-me-sush/basic-agent
- **Relay Protocol**: https://relay.link
- **shadcn/ui**: https://ui.shadcn.com

## 🎯 Next Steps

1. ✅ **Explore the App**: Try all the features
2. ✅ **Search Real Tokens**: Use DexScreener integration
3. ✅ **Test Workflows**: Search → Analyze → Quote
4. ⏳ **Deploy Agents**: Set up your OpenServ agents
5. ⏳ **Connect Real Agents**: Update URLs in Settings
6. ⏳ **Execute Trades**: Once agents are ready

## 🚀 You're Ready!

The app is fully functional with:
- ✅ Real token data from DexScreener
- ✅ Beautiful, responsive UI
- ✅ Complete navigation flow
- ✅ Mock agent simulation
- ✅ Ready for real agent integration

**Start exploring and building your degen dashboard!**

---

Questions? Check the main README.md for detailed documentation.


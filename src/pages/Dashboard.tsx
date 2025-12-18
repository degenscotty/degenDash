import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();
  const { getRecentTrades } = useTradeHistory();
  
  const recentTrades = getRecentTrades(5);
  
  // Calculate some stats
  const totalTrades = recentTrades.length;
  const completedTrades = recentTrades.filter(t => t.status === "completed").length;
  const winRate = completedTrades > 0 ? ((completedTrades / totalTrades) * 100).toFixed(1) : "0";

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Welcome to DegenDash</CardTitle>
              <CardDescription className="mt-1">
                Your crypto trading dashboard powered by AI agents
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20"
            >
              LIVE
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Search for tokens, analyze data from DexScreener, get quotes from Relay Protocol,
            and manage your watchlist all in one place.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/search")}>
              Search Tokens
            </Button>
            <Button variant="outline" onClick={() => navigate("/watchlist")}>
              View Watchlist
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watchlist</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{watchlist.length}</div>
            <p className="text-xs text-muted-foreground">
              tokens being tracked
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Trades
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{totalTrades}</div>
            <p className="text-xs text-muted-foreground">in history</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate}%</div>
            <p className="text-xs text-muted-foreground">completed trades</p>
          </CardContent>
        </Card>
      </div>

      {recentTrades.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={trade.type === "buy" ? "default" : "secondary"}>
                      {trade.type.toUpperCase()}
                    </Badge>
                    <div>
                      <p className="font-medium">{trade.tokenSymbol}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(trade.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${trade.totalValue.toFixed(2)}</p>
                    <Badge variant="outline" className="text-xs">
                      {trade.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate("/history")}
            >
              View All History
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


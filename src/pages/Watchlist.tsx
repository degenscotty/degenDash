import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "@/hooks/useWatchlist";
import { WatchlistTable } from "@/components/features/watchlist/WatchlistTable";
import { Search } from "lucide-react";

export function Watchlist() {
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="grid gap-4 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Token Watchlist</CardTitle>
            <CardDescription>
              Track your favorite tokens for quick access (not influencers)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No tokens in watchlist</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Search for tokens and add them to your watchlist to track them here
            </p>
            <Button onClick={() => navigate("/search")}>
              Search Tokens
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Token Watchlist</CardTitle>
              <CardDescription>
                {watchlist.length} {watchlist.length === 1 ? "token" : "tokens"} being tracked (not influencers)
              </CardDescription>
            </div>
            <Button onClick={() => navigate("/search")}>
              Add More Tokens
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <WatchlistTable />
        </CardContent>
      </Card>
    </div>
  );
}


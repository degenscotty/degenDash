import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTokenSearch } from "@/hooks/useTokenData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

export function TokenSearchForm() {
  const [searchInput, setSearchInput] = useState("");
  const { results, loading, error, search } = useTokenSearch();
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      await search(searchInput.trim());
    }
  };

  const handleTokenSelect = (tokenAddress: string) => {
    navigate(`/analysis/${tokenAddress}`);
  };

  // Check if input looks like an address (starts with 0x and is long enough)
  const isAddress = searchInput.startsWith("0x") && searchInput.length > 20;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="token-search">Token Address or Symbol</Label>
          <div className="flex gap-2">
            <Input
              id="token-search"
              placeholder="0x... or PEPE, WIF, BONK"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !searchInput.trim()}>
              {loading ? <Spinner className="size-4" /> : <Search className="size-4" />}
              <span className="ml-2">Search</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter a token contract address or search by symbol (e.g., PEPE, WIF)
          </p>
        </div>

        {isAddress && searchInput.length >= 40 && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate(`/analysis/${searchInput}`)}
          >
            Analyze Address Directly
          </Button>
        )}
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Found {results.length} result{results.length !== 1 ? "s" : ""}
          </p>
          <div className="grid gap-2 max-h-96 overflow-y-auto">
            {results.slice(0, 10).map((token) => (
              <Card
                key={`${token.address}-${token.chainId}`}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleTokenSelect(token.address)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{token.symbol}</h4>
                        <Badge variant="outline" className="text-xs">
                          {token.chainId}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{token.name}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        {token.address.slice(0, 10)}...{token.address.slice(-8)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${token.price.toFixed(8)}</p>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        {token.priceChange24h >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span
                          className={`text-xs ${
                            token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {token.priceChange24h >= 0 ? "+" : ""}
                          {token.priceChange24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


import { useParams, useNavigate } from "react-router-dom";
import { useTokenData } from "@/hooks/useTokenData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, ExternalLink } from "lucide-react";
import { TokenCard } from "@/components/features/token/TokenCard";
import { TokenMetrics } from "@/components/features/token/TokenMetrics";
import { AddToWatchlistButton } from "@/components/features/watchlist/AddToWatchlistButton";

export function Analysis() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { data: tokenData, loading, error, refetch } = useTokenData(token);

  if (loading) {
    return (
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/search")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (error || !tokenData) {
    return (
      <div className="grid gap-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/search")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">Token Analysis</h2>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || "Token not found. Please check the address and try again."}
          </AlertDescription>
        </Alert>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
          <Button variant="outline" onClick={refetch}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/search")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{tokenData.name}</h2>
            <p className="text-sm text-muted-foreground">{tokenData.symbol}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <AddToWatchlistButton token={tokenData} />
          <Button onClick={() => navigate(`/trade/${tokenData.address}`)}>
            Get Quote
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TokenCard token={tokenData} />
        <TokenMetrics token={tokenData} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Token Information</CardTitle>
          <CardDescription>Contract and trading details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Contract Address</span>
            <span className="text-sm font-mono">{tokenData.address.slice(0, 10)}...{tokenData.address.slice(-8)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Chain</span>
            <span className="text-sm capitalize">{tokenData.chainId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">DEX</span>
            <span className="text-sm capitalize">{tokenData.dexId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Pair Address</span>
            <span className="text-sm font-mono">{tokenData.pairAddress.slice(0, 10)}...{tokenData.pairAddress.slice(-8)}</span>
          </div>
          <div className="pt-2">
            <Button variant="outline" className="w-full" asChild>
              <a href={tokenData.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on DexScreener
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


import { useParams, useNavigate } from "react-router-dom";
import { useTokenData } from "@/hooks/useTokenData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Info } from "lucide-react";
import { TradeForm } from "@/components/features/trade/TradeForm";
import { QuoteDisplay } from "@/components/features/trade/QuoteDisplay";
import { Badge } from "@/components/ui/badge";

export function Trade() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { data: tokenData, loading, error } = useTokenData(token);

  if (loading) {
    return (
      <div className="grid gap-4 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96" />
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
          <h2 className="text-lg font-semibold">Trade</h2>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Token not found. Please select a token from the search page.
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate("/search")}>Back to Search</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/analysis/${tokenData.address}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Trade {tokenData.symbol}</h2>
            <p className="text-sm text-muted-foreground">{tokenData.name}</p>
          </div>
        </div>
        <Badge variant="secondary">Quote Only</Badge>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Get quotes from Relay Protocol to see estimated trade prices. Actual trade execution is not yet available.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request Quote</CardTitle>
            <CardDescription>
              Enter trade details to get a quote from Relay Protocol
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TradeForm token={tokenData} />
          </CardContent>
        </Card>

        <QuoteDisplay token={tokenData} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Token Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${tokenData.price.toFixed(8)}</span>
            <Badge variant={tokenData.priceChange24h >= 0 ? "default" : "destructive"}>
              {tokenData.priceChange24h >= 0 ? "+" : ""}
              {tokenData.priceChange24h.toFixed(2)}%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            24h Volume: ${tokenData.volume24h.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { TokenData } from "@/types";
import { useRelayQuote } from "@/hooks/useRelayQuote";
import { ArrowRight, AlertCircle, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QuoteDisplayProps {
  token: TokenData;
}

export function QuoteDisplay({ token }: QuoteDisplayProps) {
  const { quote, loading } = useRelayQuote();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quote Details</CardTitle>
          <CardDescription>Fetching quote from Relay Protocol...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-6 bg-muted animate-pulse rounded" />
            <div className="h-6 bg-muted animate-pulse rounded" />
            <div className="h-6 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!quote) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quote Details</CardTitle>
          <CardDescription>Request a quote to see details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Zap className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Fill in the form and click "Get Quote" to see trade details
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Quote Details</CardTitle>
            <CardDescription>
              From {quote.fromToken} to {quote.toToken}
            </CardDescription>
          </div>
          <Badge variant="secondary">Mock Quote</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">You Pay</p>
            <p className="text-2xl font-bold">{quote.fromAmount}</p>
            <p className="text-sm font-medium">{quote.fromToken}</p>
          </div>
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <div className="text-right">
            <p className="text-sm text-muted-foreground">You Receive</p>
            <p className="text-2xl font-bold">{parseFloat(quote.estimatedOutput).toLocaleString()}</p>
            <p className="text-sm font-medium">{quote.toToken}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price Impact</span>
            <span className={quote.priceImpact > 5 ? "text-red-500 font-medium" : ""}>
              {quote.priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee</span>
            <span>${quote.fee}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Gas</span>
            <span>{quote.estimatedGas} ETH</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Route</span>
            <span className="font-mono text-xs">{quote.route.join(" → ")}</span>
          </div>
        </div>

        {quote.priceImpact > 5 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              High price impact! Consider reducing trade size.
            </AlertDescription>
          </Alert>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Trade execution is not yet available. This is a quote only.
          </AlertDescription>
        </Alert>

        <Button className="w-full" disabled>
          Execute Trade (Coming Soon)
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Quote ID: {quote.id}
        </p>
      </CardContent>
    </Card>
  );
}


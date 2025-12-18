import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { TradeQuote } from "@/types";
import { ArrowRight } from "lucide-react";

interface TradePreviewProps {
  quote: TradeQuote;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function TradePreview({ quote }: TradePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Preview</CardTitle>
        <CardDescription>Review your trade before executing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">From</p>
            <p className="text-xl font-bold">{quote.fromAmount}</p>
            <Badge variant="outline">{quote.fromToken}</Badge>
          </div>
          <ArrowRight className="h-6 w-6 text-primary" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">To</p>
            <p className="text-xl font-bold">{parseFloat(quote.estimatedOutput).toFixed(4)}</p>
            <Badge variant="outline">{quote.toToken}</Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Transaction Details</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price Impact</span>
              <span className={quote.priceImpact > 5 ? "text-red-500" : ""}>
                {quote.priceImpact.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Trading Fee</span>
              <span>${quote.fee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network Fee (est.)</span>
              <span>{quote.estimatedGas} ETH</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Route</h4>
          <div className="flex items-center gap-2 flex-wrap">
            {quote.route.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="secondary">{step}</Badge>
                {index < quote.route.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          This is a preview based on current market conditions. Actual execution may vary.
        </p>
      </CardContent>
    </Card>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TokenData } from "@/types";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TokenCardProps {
  token: TokenData;
}

export function TokenCard({ token }: TokenCardProps) {
  const priceChangeColor = token.priceChange24h >= 0 ? "text-green-500" : "text-red-500";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Current Price</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${token.price.toFixed(8)}</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">24h Change</p>
          <div className="flex items-center gap-2">
            {token.priceChange24h >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
            <span className={`text-2xl font-semibold ${priceChangeColor}`}>
              {token.priceChange24h >= 0 ? "+" : ""}
              {token.priceChange24h.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className="capitalize">
            {token.chainId}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {token.dexId}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}


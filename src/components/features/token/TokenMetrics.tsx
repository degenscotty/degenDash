import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TokenData } from "@/types";
import { DollarSign, Activity, Droplets, TrendingUp } from "lucide-react";

interface TokenMetricsProps {
  token: TokenData;
}

export function TokenMetrics({ token }: TokenMetricsProps) {
  const formatLargeNumber = (num: number): string => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const metrics = [
    {
      label: "Market Cap",
      value: formatLargeNumber(token.marketCap),
      icon: DollarSign,
      color: "text-blue-500",
    },
    {
      label: "24h Volume",
      value: formatLargeNumber(token.volume24h),
      icon: Activity,
      color: "text-purple-500",
    },
    {
      label: "Liquidity",
      value: formatLargeNumber(token.liquidity),
      icon: Droplets,
      color: "text-cyan-500",
    },
    {
      label: "FDV",
      value: formatLargeNumber(token.fdv),
      icon: TrendingUp,
      color: "text-green-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${metric.color}`} />
                <span className="text-sm text-muted-foreground">{metric.label}</span>
              </div>
              <span className="font-semibold">{metric.value}</span>
            </div>
          );
        })}

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">24h Transactions</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-500">Buys: {token.txns24h.buys.toLocaleString()}</span>
            <span className="text-red-500">Sells: {token.txns24h.sells.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


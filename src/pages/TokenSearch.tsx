import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TokenSearchForm } from "@/components/features/token/TokenSearchForm";

export function TokenSearch() {
  return (
    <div className="grid gap-4 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Search for Tokens</CardTitle>
          <CardDescription>
            Enter a token address or symbol to find and analyze tokens from DexScreener
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TokenSearchForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              1
            </div>
            <div>
              <p className="font-medium">Enter Token Info</p>
              <p className="text-sm text-muted-foreground">
                Provide a token address or search by symbol
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              2
            </div>
            <div>
              <p className="font-medium">View Analysis</p>
              <p className="text-sm text-muted-foreground">
                See real-time data from DexScreener including price, volume, and liquidity
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              3
            </div>
            <div>
              <p className="font-medium">Get Trade Quote</p>
              <p className="text-sm text-muted-foreground">
                Request quotes from Relay Protocol to see trading options
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


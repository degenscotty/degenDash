import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { History as HistoryIcon, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export function History() {
  const navigate = useNavigate();
  const { history, clearHistory } = useTradeHistory();

  if (history.length === 0) {
    return (
      <div className="grid gap-4 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Trade History</CardTitle>
            <CardDescription>
              View your past trades and transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-6 mb-4">
              <HistoryIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No trade history</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Your completed trades will appear here
            </p>
            <Button onClick={() => navigate("/search")}>
              Start Trading
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
              <CardTitle>Trade History</CardTitle>
              <CardDescription>
                {history.length} {history.length === 1 ? "trade" : "trades"} recorded
              </CardDescription>
            </div>
            <Button variant="outline" onClick={clearHistory}>
              Clear History
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tx</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className="text-sm">
                    {format(new Date(trade.timestamp), "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{trade.tokenSymbol}</p>
                      <p className="text-xs text-muted-foreground">{trade.tokenName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={trade.type === "buy" ? "default" : "secondary"}>
                      {trade.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {parseFloat(trade.amount).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    ${trade.price.toFixed(8)}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${trade.totalValue.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        trade.status === "completed"
                          ? "default"
                          : trade.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {trade.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {trade.txHash ? (
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={`https://etherscan.io/tx/${trade.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


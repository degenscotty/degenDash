import { Button } from "@/components/ui/button";
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
import { useWatchlist } from "@/hooks/useWatchlist";
import { Trash2, TrendingUp, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export function WatchlistTable() {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useWatchlist();

  const handleRemove = (tokenAddress: string, tokenSymbol: string) => {
    removeFromWatchlist(tokenAddress);
    toast.success(`${tokenSymbol} removed from watchlist`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Added</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {watchlist.map((item) => (
          <TableRow key={item.tokenAddress}>
            <TableCell>
              <div>
                <p className="font-semibold">{item.tokenSymbol}</p>
                <p className="text-sm text-muted-foreground">{item.tokenName}</p>
              </div>
            </TableCell>
            <TableCell className="font-mono text-sm">
              {item.tokenAddress.slice(0, 10)}...{item.tokenAddress.slice(-8)}
            </TableCell>
            <TableCell className="text-sm">
              {format(new Date(item.addedAt), "MMM d, yyyy")}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
              {item.notes || "-"}
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/analysis/${item.tokenAddress}`)}
                  title="View Analysis"
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/trade/${item.tokenAddress}`)}
                  title="Get Quote"
                >
                  <TrendingUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(item.tokenAddress, item.tokenSymbol)}
                  title="Remove from Watchlist"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


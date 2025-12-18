import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import type { TokenData } from "@/types";
import { toast } from "sonner";

interface AddToWatchlistButtonProps {
  token: TokenData;
}

export function AddToWatchlistButton({ token }: AddToWatchlistButtonProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(token.address);

  const handleToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(token.address);
      toast.success(`${token.symbol} removed from watchlist`);
    } else {
      addToWatchlist({
        tokenAddress: token.address,
        tokenSymbol: token.symbol,
        tokenName: token.name,
      });
      toast.success(`${token.symbol} added to watchlist`);
    }
  };

  return (
    <Button
      variant={inWatchlist ? "default" : "outline"}
      size="default"
      onClick={handleToggle}
    >
      <Star
        className={`h-4 w-4 ${inWatchlist ? "fill-current" : ""}`}
      />
      <span className="ml-2">
        {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </span>
    </Button>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import type { TokenData } from "@/types";
import { useRelayQuote } from "@/hooks/useRelayQuote";
import { toast } from "sonner";

interface TradeFormProps {
  token: TokenData;
}

export function TradeForm({ token }: TradeFormProps) {
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState("USDC");
  const [slippage, setSlippage] = useState("1.0");
  
  const { getQuote, loading } = useRelayQuote();

  const handleGetQuote = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      await getQuote({
        fromToken,
        toToken: token.symbol,
        amount,
        slippage: parseFloat(slippage),
      });
      toast.success("Quote received!");
    } catch (error) {
      toast.error("Failed to get quote");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="from-token">From Token</Label>
        <Select value={fromToken} onValueChange={setFromToken}>
          <SelectTrigger id="from-token">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USDC">USDC</SelectItem>
            <SelectItem value="USDT">USDT</SelectItem>
            <SelectItem value="ETH">ETH</SelectItem>
            <SelectItem value="SOL">SOL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground">
          Amount of {fromToken} to trade
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="to-token">To Token</Label>
        <Input
          id="to-token"
          value={token.symbol}
          disabled
          className="bg-muted"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slippage">Slippage Tolerance (%)</Label>
        <Select value={slippage} onValueChange={setSlippage}>
          <SelectTrigger id="slippage">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0.5">0.5%</SelectItem>
            <SelectItem value="1.0">1.0% (Recommended)</SelectItem>
            <SelectItem value="2.0">2.0%</SelectItem>
            <SelectItem value="5.0">5.0%</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full"
        onClick={handleGetQuote}
        disabled={loading || !amount}
      >
        {loading ? (
          <>
            <Spinner className="size-4 mr-2" />
            Getting Quote...
          </>
        ) : (
          "Get Quote"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        This will request a quote from Relay Protocol via OpenServ agent
      </p>
    </div>
  );
}


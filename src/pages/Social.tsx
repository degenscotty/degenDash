import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInfluencers } from "@/hooks/useInfluencers";
import { Twitter, MessageCircle, Trash2, Plus, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";

// Mock scraped posts (will be from localStorage later)
const mockPosts = [
  {
    id: "post-1",
    influencerHandle: "@kaduna",
    platform: "twitter" as const,
    content:
      "Just aped into $AVICI 🚀 This one's gonna moon! Team is doxxed, liquidity locked. Don't fade this.",
    timestamp: Date.now() - 3600000 * 2,
    mentionedTokens: ["AVICI"],
  },
  {
    id: "post-2",
    influencerHandle: "@kaduna",
    platform: "twitter" as const,
    content:
      "$BANANA looking juicy right now 🍌 Chart is perfect, volume coming in. This could be the next 100x",
    timestamp: Date.now() - 3600000 * 5,
    mentionedTokens: ["BANANA"],
  },
  {
    id: "post-3",
    influencerHandle: "@cryptowhale",
    platform: "twitter" as const,
    content: "Watching $AVICI closely. Big accumulation happening. 👀",
    timestamp: Date.now() - 3600000 * 8,
    mentionedTokens: ["AVICI"],
  },
  {
    id: "post-4",
    influencerHandle: "degen_calls",
    platform: "telegram" as const,
    content:
      "🔥 NEW CALL 🔥\n\n$BANANA on Base\n\nMC: 500k\nLiquidity: Locked\nContract: Renounced\n\nThis is not financial advice. DYOR!",
    timestamp: Date.now() - 3600000 * 1,
    mentionedTokens: ["BANANA"],
  },
];

export function Social() {
  const { influencers, removeInfluencer, getInfluencersByPlatform } =
    useInfluencers();
  const [selectedPlatform, setSelectedPlatform] = useState<
    "all" | "twitter" | "telegram"
  >("all");

  const twitterInfluencers = getInfluencersByPlatform("twitter");
  const telegramChannels = getInfluencersByPlatform("telegram");

  const handleRemove = (id: string, handle: string) => {
    removeInfluencer(id);
    toast.success(`${handle} removed from tracking`);
  };

  const handleScrape = (handle: string) => {
    toast.info(`Scraping ${handle}... (Coming soon)`);
  };

  const filteredPosts =
    selectedPlatform === "all"
      ? mockPosts
      : mockPosts.filter((post) => post.platform === selectedPlatform);

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scraping</CardTitle>
              <CardDescription>
                Track influencers and channels for alpha calls
              </CardDescription>
            </div>
            <Badge variant="secondary">{influencers.length} tracked</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="twitter" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="twitter">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter ({twitterInfluencers.length})
              </TabsTrigger>
              <TabsTrigger value="telegram">
                <MessageCircle className="h-4 w-4 mr-2" />
                Telegram ({telegramChannels.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="twitter" className="space-y-4">
              <Button className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Twitter Influencer
              </Button>

              {twitterInfluencers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No Twitter influencers tracked yet
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Handle</TableHead>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Last Scraped</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {twitterInfluencers.map((influencer) => (
                      <TableRow key={influencer.id}>
                        <TableCell className="font-mono text-sm">
                          {influencer.handle}
                        </TableCell>
                        <TableCell>{influencer.displayName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {influencer.lastScraped
                            ? format(
                                new Date(influencer.lastScraped),
                                "MMM d, HH:mm"
                              )
                            : "Never"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleScrape(influencer.handle)}
                              title="Scrape Now"
                            >
                              <TrendingUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleRemove(influencer.id, influencer.handle)
                              }
                              title="Remove"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="telegram" className="space-y-4">
              <Button className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Telegram Channel
              </Button>

              {telegramChannels.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No Telegram channels tracked yet
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Channel</TableHead>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Last Scraped</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {telegramChannels.map((channel) => (
                      <TableRow key={channel.id}>
                        <TableCell className="font-mono text-sm">
                          {channel.handle}
                        </TableCell>
                        <TableCell>{channel.displayName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {channel.lastScraped
                            ? format(
                                new Date(channel.lastScraped),
                                "MMM d, HH:mm"
                              )
                            : "Never"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleScrape(channel.handle)}
                              title="Scrape Now"
                            >
                              <TrendingUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleRemove(channel.id, channel.handle)
                              }
                              title="Remove"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alpha Calls</CardTitle>
          <CardDescription>
            Latest mentions from tracked sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={selectedPlatform}
            onValueChange={(v: any) => setSelectedPlatform(v)}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="twitter">
                <Twitter className="h-4 w-4 mr-1" />
                Twitter
              </TabsTrigger>
              <TabsTrigger value="telegram">
                <MessageCircle className="h-4 w-4 mr-1" />
                Telegram
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 space-y-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {post.platform === "twitter" ? (
                        <Twitter className="h-5 w-5 text-blue-500" />
                      ) : (
                        <MessageCircle className="h-5 w-5 text-cyan-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {post.influencerHandle}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(post.timestamp), "MMM d, HH:mm")}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {post.content}
                      </p>
                      <div className="flex gap-2">
                        {post.mentionedTokens.map((token) => (
                          <Badge
                            key={token}
                            variant="secondary"
                            className="font-mono"
                          >
                            ${token}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

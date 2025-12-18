import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { AppSettings } from "@/types";

const DEFAULT_SETTINGS: AppSettings = {
  relayAgentUrl: "http://localhost:8080",
  scraperAgentUrl: "http://localhost:8081",
  defaultSlippage: 1.0,
  autoRefresh: true,
  refreshInterval: 30,
};

export function Settings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const stored = localStorage.getItem("degenDash_settings");
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  });

  const handleSave = () => {
    localStorage.setItem("degenDash_settings", JSON.stringify(settings));
    toast.success("Settings saved successfully");
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem("degenDash_settings", JSON.stringify(DEFAULT_SETTINGS));
    toast.success("Settings reset to defaults");
  };

  return (
    <div className="grid gap-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>
            Configure OpenServ agents and trading preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">OpenServ Agent URLs</h3>
            <div className="space-y-2">
              <Label htmlFor="relayAgent">Relay Protocol Agent</Label>
              <Input
                id="relayAgent"
                placeholder="http://localhost:8080"
                value={settings.relayAgentUrl}
                onChange={(e) =>
                  setSettings({ ...settings, relayAgentUrl: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                URL of the Relay Protocol agent for getting trade quotes
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scraperAgent">Scraper Agent (Future)</Label>
              <Input
                id="scraperAgent"
                placeholder="http://localhost:8081"
                value={settings.scraperAgentUrl}
                onChange={(e) =>
                  setSettings({ ...settings, scraperAgentUrl: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                URL of the Twitter/Telegram scraper agent (not yet available)
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trading Preferences</h3>
            <div className="space-y-2">
              <Label htmlFor="slippage">Default Slippage (%)</Label>
              <Input
                id="slippage"
                type="number"
                step="0.1"
                min="0.1"
                max="50"
                value={settings.defaultSlippage}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultSlippage: parseFloat(e.target.value),
                  })
                }
              />
              <p className="text-xs text-muted-foreground">
                Default slippage tolerance for trades
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Display Options</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoRefresh">Auto Refresh</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically refresh token data
                </p>
              </div>
              <Switch
                id="autoRefresh"
                checked={settings.autoRefresh}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoRefresh: checked })
                }
              />
            </div>
            {settings.autoRefresh && (
              <div className="space-y-2">
                <Label htmlFor="refreshInterval">Refresh Interval (seconds)</Label>
                <Input
                  id="refreshInterval"
                  type="number"
                  min="10"
                  max="300"
                  value={settings.refreshInterval}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      refreshInterval: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            )}
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button onClick={handleSave}>Save Settings</Button>
            <Button variant="outline" onClick={handleReset}>
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About DegenDash</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Version:</strong> 1.0.0
          </p>
          <p>
            <strong>Status:</strong> Beta
          </p>
          <p className="text-muted-foreground">
            DegenDash is a crypto trading dashboard powered by OpenServ AI agents.
            Search tokens, analyze data from DexScreener, and get quotes from Relay Protocol.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


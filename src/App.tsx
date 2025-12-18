import { Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Dashboard } from "@/pages/Dashboard";
import { TokenSearch } from "@/pages/TokenSearch";
import { Social } from "@/pages/Social";
import { Analysis } from "@/pages/Analysis";
import { Trade } from "@/pages/Trade";
import { Watchlist } from "@/pages/Watchlist";
import { History } from "@/pages/History";
import { Settings } from "@/pages/Settings";

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<TokenSearch />} />
          <Route path="/social" element={<Social />} />
          <Route path="/analysis/:token" element={<Analysis />} />
          <Route path="/trade/:token" element={<Trade />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppLayout>
    </div>
  );
}

export default App;

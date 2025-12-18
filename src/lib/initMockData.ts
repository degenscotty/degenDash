import {
  mockTradeHistory,
  mockWatchlist,
  mockInfluencers,
  mockScrapedPosts,
} from "@/mocks/data";

/**
 * Initialize localStorage with mock data if it doesn't exist
 * This provides a better demo experience
 */
export function initMockData() {
  const hasInitialized = localStorage.getItem("degenDash_initialized");
  const version = localStorage.getItem("degenDash_version");
  const currentVersion = "1.1"; // Update this to force re-initialization

  if (!hasInitialized || version !== currentVersion) {
    // Initialize trade history
    if (!localStorage.getItem("degenDash_tradeHistory")) {
      localStorage.setItem(
        "degenDash_tradeHistory",
        JSON.stringify(mockTradeHistory)
      );
    }

    // Initialize watchlist
    if (!localStorage.getItem("degenDash_watchlist")) {
      localStorage.setItem(
        "degenDash_watchlist",
        JSON.stringify(mockWatchlist)
      );
    }

    // Initialize/update influencers
    localStorage.setItem(
      "degenDash_influencers",
      JSON.stringify(mockInfluencers)
    );

    // Initialize scraped posts
    if (!localStorage.getItem("degenDash_scrapedPosts")) {
      localStorage.setItem(
        "degenDash_scrapedPosts",
        JSON.stringify(mockScrapedPosts)
      );
    }

    // Mark as initialized with version
    localStorage.setItem("degenDash_initialized", "true");
    localStorage.setItem("degenDash_version", currentVersion);
  }
}

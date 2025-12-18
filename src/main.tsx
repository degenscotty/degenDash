import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import { initMockData } from "@/lib/initMockData";

// Initialize mock data for demo purposes
initMockData();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <App />
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

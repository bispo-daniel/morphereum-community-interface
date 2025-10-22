import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebFont from "webfontloader";

import App from "./App.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/theme";

WebFont.load({
  google: {
    families: [
      "Inter:300,400italic,600,700",
      "Roboto Slab:300,400,600,700,900",
      "Chathura:100,200,300,400,600,700",
      "Sour Gummy:700,900",
      "sans-serif",
    ],
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);

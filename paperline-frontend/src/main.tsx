import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import Fallback from "./components/loader/fallbackloader.tsx";
import { queryClient } from "./shared/constants/api.ts";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Fallback />}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Suspense>
);

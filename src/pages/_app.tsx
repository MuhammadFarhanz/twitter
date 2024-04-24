"use client";
import { queryClient } from "@/lib/react-query";
// import ThemeProvider from "@/lib/theme-provider";
import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

// Fixes: Hydration failed because the initial UI does not match what was rendered on the server.
const ThemeProvider = dynamic(
  () => import("@/lib/theme-provider").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

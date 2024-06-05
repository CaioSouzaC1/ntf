"use client";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Fira_Sans } from "next/font/google";
import { Toaster } from "sonner";

const fira = Fira_Sans({
  subsets: ["greek-ext"],
  variable: "--fira-sans",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fira.className} dark`}>
        <Toaster position="top-center" />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}

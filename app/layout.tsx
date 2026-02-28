// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Julius Dorfman",
  description: "Support Engineer · Building and healing customer relationships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <div className="hud-bg" aria-hidden="true" />
        <div className="page-content">
          {children}
        </div>
      </body>
    </html>
  );
}

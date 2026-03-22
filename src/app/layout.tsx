import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StellarVault — Passive Yield, Active Strategy",
  description:
    "A decentralized, non-custodial yield aggregator built on Soroban. Deposit USDC, earn automated yield across Stellar's top protocols.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-void text-text-primary antialiased">{children}</body>
    </html>
  );
}

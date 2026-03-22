import type {
  VaultStats,
  UserPosition,
  Allocation,
  HarvestEvent,
  ApyDataPoint,
} from "@/types";

export const SHARE_PRICE = 1.0821;
export const WALLET_ADDRESS = "GABCD…7XYZ";
export const WALLET_BALANCE_USDC = 10_000;

export const VAULT_STATS: VaultStats = {
  tvl: 4_218_440,
  apy: 14.82,
  apyDelta: 0.34,
  depositors: 841,
  totalHarvested: 128_330,
  sharePrice: SHARE_PRICE,
  lastHarvest: "2h ago",
};

export const USER_POSITION: UserPosition = {
  shares: 2_624.11,
  usdValue: 2_841.3,
  initialDeposit: 2_600,
  yieldEarned: 241.3,
  returnPct: 9.28,
};

export const ALLOCATIONS: Allocation[] = [
  { protocol: "Blend Lending", pct: 62, apy: 12.4, color: "#5EB8FF" },
  { protocol: "Soroswap LP", pct: 38, apy: 19.6, color: "#00E5C3" },
];

export const HARVEST_EVENTS: HarvestEvent[] = [
  {
    id: "1",
    type: "harvest",
    title: "Harvest & Compound",
    time: "2 hours ago",
    ledger: "Ledger #1,284,330",
    amount: 842.1,
    amountLabel: "+$842.10",
  },
  {
    id: "2",
    type: "deposit",
    title: "New Deposit",
    time: "5 hours ago",
    ledger: "GABCD…7XYZ",
    amount: 5000,
    amountLabel: "+$5,000 USDC",
  },
  {
    id: "3",
    type: "harvest",
    title: "Harvest & Compound",
    time: "14 hours ago",
    ledger: "Ledger #1,283,891",
    amount: 1220.45,
    amountLabel: "+$1,220.45",
  },
  {
    id: "4",
    type: "rebalance",
    title: "Strategy Rebalance — Soroswap +4%",
    time: "1 day ago",
    ledger: "Ledger #1,281,004",
  },
];

export const APY_DATA_30D: ApyDataPoint[] = [
  { date: "Apr 1", apy: 10.2 },
  { date: "Apr 3", apy: 11.0 },
  { date: "Apr 5", apy: 10.8 },
  { date: "Apr 7", apy: 12.1 },
  { date: "Apr 9", apy: 13.4 },
  { date: "Apr 11", apy: 12.9 },
  { date: "Apr 13", apy: 14.0 },
  { date: "Apr 15", apy: 13.7 },
  { date: "Apr 17", apy: 15.1 },
  { date: "Apr 19", apy: 14.8 },
  { date: "Apr 21", apy: 16.2 },
  { date: "Apr 23", apy: 15.6 },
  { date: "Apr 25", apy: 18.2 },
  { date: "Apr 27", apy: 16.4 },
  { date: "Apr 29", apy: 14.82 },
];

export const APY_DATA_7D: ApyDataPoint[] = APY_DATA_30D.slice(-7);
export const APY_DATA_90D: ApyDataPoint[] = [
  { date: "Feb 1", apy: 9.1 },
  { date: "Feb 8", apy: 10.4 },
  { date: "Feb 15", apy: 11.2 },
  { date: "Feb 22", apy: 10.8 },
  { date: "Mar 1", apy: 12.0 },
  { date: "Mar 8", apy: 13.5 },
  { date: "Mar 15", apy: 12.8 },
  { date: "Mar 22", apy: 14.1 },
  { date: "Mar 29", apy: 13.9 },
  ...APY_DATA_30D,
];

export function fmt(n: number, decimals = 2): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtUSD(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${fmt(n)}`;
}

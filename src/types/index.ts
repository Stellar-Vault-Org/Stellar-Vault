export interface VaultStats {
  tvl: number;
  apy: number;
  apyDelta: number;
  depositors: number;
  totalHarvested: number;
  sharePrice: number;
  lastHarvest: string;
}

export interface UserPosition {
  shares: number;
  usdValue: number;
  initialDeposit: number;
  yieldEarned: number;
  returnPct: number;
}

export interface Allocation {
  protocol: string;
  pct: number;
  apy: number;
  color: string;
}

export interface HarvestEvent {
  id: string;
  type: "harvest" | "deposit" | "withdraw" | "rebalance";
  title: string;
  time: string;
  ledger: string;
  amount?: number;
  amountLabel?: string;
}

export interface ApyDataPoint {
  date: string;
  apy: number;
}

export type TxStatus = "idle" | "signing" | "confirming" | "success" | "error";

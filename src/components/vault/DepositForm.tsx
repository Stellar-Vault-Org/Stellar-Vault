"use client";

import { useState, useCallback } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronDown,
  X,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { SHARE_PRICE, WALLET_BALANCE_USDC, USER_POSITION, VAULT_STATS, fmt, ALLOCATIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { TxStatus } from "@/types";

type Tab = "deposit" | "withdraw";

const QUICK_AMOUNTS = [100, 500, 1000, 5000];

// ── Info sidebar cards ──────────────────────────────────────────────────────

function SharePriceCard() {
  return (
    <Card>
      <CardBody className="space-y-1">
        <p className="font-mono text-[10px] text-text-sub tracking-[1.5px] uppercase">
          Share Price
        </p>
        <p className="font-display text-[42px] leading-none text-sky tracking-wide">
          ${SHARE_PRICE}
        </p>
        <p className="text-[12px] text-text-sub font-light">
          per Vault Share ·{" "}
          <span className="font-mono text-[11px] text-mint">
            +8.21% since genesis
          </span>
        </p>
      </CardBody>
    </Card>
  );
}

function ApySummaryCard() {
  const stats = [
    { label: "7D Avg", value: "14.2%" },
    { label: "30D Avg", value: "13.4%" },
    { label: "Peak", value: "18.2%" },
  ];
  return (
    <Card>
      <CardBody>
        <p className="font-mono text-[10px] text-text-sub tracking-[1.5px] uppercase mb-3">
          Current APY
        </p>
        <div className="flex items-center gap-4">
          <p className="font-display text-[48px] leading-none text-mint tracking-wide">
            {VAULT_STATS.apy}%
          </p>
          <div className="space-y-1.5">
            {stats.map((s) => (
              <div key={s.label} className="flex justify-between gap-6">
                <span className="font-mono text-[10px] text-text-faint">
                  {s.label}
                </span>
                <span className="font-mono text-[10px] text-text-sub">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function AllocationCard() {
  return (
    <Card>
      <CardBody>
        <p className="font-mono text-[10px] text-text-sub tracking-[1.5px] uppercase mb-4">
          Capital Allocation
        </p>
        <div className="space-y-3">
          {ALLOCATIONS.map((a) => (
            <div key={a.protocol} className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[12px] text-text-primary">
                  {a.protocol}
                </span>
                <span className="font-mono text-[11px] text-text-sub">
                  {a.pct}% · {a.apy}% APY
                </span>
              </div>
              <div className="h-[3px] bg-rim rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${a.pct}%`, background: a.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

function MyPositionCard() {
  const p = USER_POSITION;
  const rows = [
    { label: "Shares Held", value: fmt(p.shares) },
    { label: "USD Value", value: `$${fmt(p.usdValue)}` },
    { label: "Initial Deposit", value: `$${fmt(p.initialDeposit)}` },
    {
      label: "Yield Earned",
      value: `+$${fmt(p.yieldEarned)}`,
      accent: true,
    },
    { label: "% Return", value: `+${p.returnPct}%`, accent: true },
  ];
  return (
    <Card>
      <CardBody>
        <p className="font-mono text-[10px] text-text-sub tracking-[1.5px] uppercase mb-3">
          My Position
        </p>
        <div className="space-y-0">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex justify-between items-center py-2.5 border-b border-rim last:border-none"
            >
              <span className="text-[13px] text-text-sub font-light">
                {r.label}
              </span>
              <span
                className={cn(
                  "font-mono text-[13px]",
                  r.accent ? "text-mint" : "text-text-primary"
                )}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

// ── TX Overlay ──────────────────────────────────────────────────────────────

function TxOverlay({
  status,
  shares,
  onClose,
}: {
  status: TxStatus;
  shares: number;
  onClose: () => void;
}) {
  if (status === "idle") return null;

  return (
    <div className="fixed inset-0 bg-void/90 backdrop-blur-xl z-50 flex items-center justify-center">
      <div className="bg-panel border border-rim2 rounded-xl p-12 text-center max-w-sm w-full mx-4">
        {status === "signing" && (
          <>
            <Loader2
              size={48}
              className="text-sky animate-spin mx-auto mb-6"
            />
            <h2 className="font-display text-[28px] tracking-widest mb-2">
              AWAITING SIGNATURE
            </h2>
            <p className="text-text-sub text-[14px] font-light leading-relaxed mb-6">
              Confirm this transaction in your Freighter wallet.
            </p>
            <span className="font-mono text-[11px] text-sky bg-sky/10 border border-sky/20 px-3 py-1.5 rounded">
              TX: 0xab3f…9e21
            </span>
          </>
        )}
        {status === "confirming" && (
          <>
            <Loader2
              size={48}
              className="text-mint animate-spin mx-auto mb-6"
            />
            <h2 className="font-display text-[28px] tracking-widest text-mint mb-2">
              CONFIRMING
            </h2>
            <p className="text-text-sub text-[14px] font-light leading-relaxed mb-6">
              Transaction submitted. Waiting for ledger confirmation.
            </p>
            <span className="font-mono text-[11px] text-text-sub bg-rim border border-rim2 px-3 py-1.5 rounded">
              Ledger #1,284,331
            </span>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle
              size={48}
              className="text-mint mx-auto mb-6"
            />
            <h2 className="font-display text-[28px] tracking-widest text-mint mb-2">
              CONFIRMED
            </h2>
            <p className="text-text-sub text-[14px] font-light leading-relaxed mb-6">
              You received{" "}
              <span className="text-sky font-mono">
                {fmt(shares)} Vault Shares
              </span>
              . Now earning yield automatically.
            </p>
            <button
              onClick={onClose}
              className="flex items-center gap-2 border border-rim2 text-text-sub hover:border-text-primary hover:text-text-primary px-6 py-2.5 rounded transition-all text-[13px] mx-auto"
            >
              <X size={14} />
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Form ───────────────────────────────────────────────────────────────

export default function DepositForm() {
  const [tab, setTab] = useState<Tab>("deposit");
  const [depositAmt, setDepositAmt] = useState<string>("");
  const [withdrawShares, setWithdrawShares] = useState<string>("");
  const [txStatus, setTxStatus] = useState<TxStatus>("idle");
  const [txShares, setTxShares] = useState(0);

  const depositNum = parseFloat(depositAmt) || 0;
  const sharesOut = depositNum / SHARE_PRICE;

  const withdrawNum = parseFloat(withdrawShares) || 0;
  const usdcOut = withdrawNum * SHARE_PRICE;
  const minOut = usdcOut * 0.995;

  const simulateTx = useCallback((shares: number) => {
    setTxShares(shares);
    setTxStatus("signing");
    setTimeout(() => setTxStatus("confirming"), 2200);
    setTimeout(() => setTxStatus("success"), 4800);
  }, []);

  function handleDeposit() {
    if (depositNum <= 0) return;
    simulateTx(sharesOut);
  }

  function handleWithdraw() {
    if (withdrawNum <= 0) return;
    simulateTx(withdrawNum);
  }

  return (
    <>
      <TxOverlay
        status={txStatus}
        shares={txShares}
        onClose={() => setTxStatus("idle")}
      />

      <div className="grid grid-cols-[1fr_320px] gap-6 p-8 items-start">
        {/* Form card */}
        <Card>
          {/* Tab bar */}
          <div className="grid grid-cols-2 border-b border-rim">
            {(["deposit", "withdraw"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex items-center justify-center gap-2 py-4 text-[14px] font-medium transition-all duration-200 relative",
                  tab === t
                    ? "text-text-primary bg-sky/[0.04]"
                    : "text-text-sub hover:text-text-primary hover:bg-white/[0.02]"
                )}
              >
                {/* Active underline */}
                {tab === t && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky" />
                )}
                {t === "deposit" ? (
                  <ArrowDownToLine size={14} />
                ) : (
                  <ArrowUpFromLine size={14} />
                )}
                {t === "deposit" ? "Deposit USDC" : "Withdraw Shares"}
              </button>
            ))}
          </div>

          <CardBody className="space-y-5">
            {/* Balance row */}
            <div className="flex items-center justify-between bg-panel2 border border-rim rounded-lg px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2775CA]/20 border border-[#2775CA]/30 flex items-center justify-center">
                  <span className="font-mono text-[11px] font-medium text-[#5B9BD5]">$</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium">
                    {tab === "deposit" ? "USDC" : "Vault Shares"}
                  </p>
                  <p className="font-mono text-[10px] text-text-sub">
                    {tab === "deposit" ? "Wallet Balance" : "Your Position"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-[14px] font-medium">
                  {tab === "deposit"
                    ? `${fmt(WALLET_BALANCE_USDC)} USDC`
                    : `${fmt(USER_POSITION.shares)} Shares`}
                </p>
                <p className="font-mono text-[10px] text-text-sub">
                  {tab === "deposit"
                    ? `≈ $${fmt(WALLET_BALANCE_USDC)}`
                    : `≈ $${fmt(USER_POSITION.usdValue)}`}
                </p>
              </div>
            </div>

            {/* Amount input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-[10px] text-text-sub tracking-[1.5px] uppercase">
                  {tab === "deposit" ? "Amount to Deposit" : "Shares to Redeem"}
                </label>
                <button
                  onClick={() =>
                    tab === "deposit"
                      ? setDepositAmt(String(WALLET_BALANCE_USDC))
                      : setWithdrawShares(String(USER_POSITION.shares))
                  }
                  className="font-mono text-[10px] text-sky tracking-[1.5px] uppercase hover:text-sky/70 transition-colors"
                >
                  {tab === "deposit" ? "Max" : "All"}
                </button>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  value={tab === "deposit" ? depositAmt : withdrawShares}
                  onChange={(e) =>
                    tab === "deposit"
                      ? setDepositAmt(e.target.value)
                      : setWithdrawShares(e.target.value)
                  }
                  className="w-full bg-deep border border-rim2 rounded-lg pl-5 pr-28 py-4 font-display text-[36px] tracking-wide text-text-primary placeholder-rim2 outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-panel2 border border-rim2 rounded px-3 py-1.5 cursor-default">
                  <ChevronDown size={12} className="text-text-sub" />
                  <span className="font-mono text-[12px] font-medium">
                    {tab === "deposit" ? "USDC" : "SVLT"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick amounts (deposit only) */}
            {tab === "deposit" && (
              <div className="flex gap-2 flex-wrap">
                {QUICK_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setDepositAmt(String(amt))}
                    className="bg-panel2 border border-rim text-text-sub font-mono text-[11px] px-3.5 py-1.5 rounded hover:border-sky hover:text-sky hover:bg-sky/5 transition-all duration-150"
                  >
                    ${amt.toLocaleString()}
                  </button>
                ))}
              </div>
            )}

            {/* Withdraw percentage shortcuts */}
            {tab === "withdraw" && (
              <div className="flex gap-2">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    onClick={() =>
                      setWithdrawShares(
                        String(((USER_POSITION.shares * pct) / 100).toFixed(4))
                      )
                    }
                    className="flex-1 bg-panel2 border border-rim text-text-sub font-mono text-[11px] py-1.5 rounded hover:border-sky hover:text-sky hover:bg-sky/5 transition-all duration-150"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            )}

            {/* Preview panel */}
            <div className="bg-panel2 border border-rim rounded-lg p-4 space-y-0">
              {tab === "deposit" ? (
                <>
                  <PreviewRow
                    label="You Deposit"
                    value={depositNum > 0 ? `$${fmt(depositNum)} USDC` : "—"}
                  />
                  <PreviewRow
                    label="You Receive"
                    value={
                      depositNum > 0 ? `${fmt(sharesOut, 4)} Vault Shares` : "—"
                    }
                    accent
                  />
                  <PreviewRow
                    label="Share Price"
                    value={`1 Share = $${SHARE_PRICE}`}
                  />
                  <PreviewRow
                    label="Current APY"
                    value={`${VAULT_STATS.apy}%`}
                    accent
                  />
                  <PreviewRow label="Slippage Tolerance" value="0.5%" muted />
                  <PreviewRow
                    label="Network Fee"
                    value="~0.00001 XLM"
                    muted
                    last
                  />
                </>
              ) : (
                <>
                  <PreviewRow
                    label="Shares Burned"
                    value={
                      withdrawNum > 0
                        ? `${fmt(withdrawNum, 4)} Vault Shares`
                        : "—"
                    }
                  />
                  <PreviewRow
                    label="You Receive"
                    value={withdrawNum > 0 ? `$${fmt(usdcOut)} USDC` : "—"}
                    accent
                  />
                  <PreviewRow
                    label="Share Price"
                    value={`1 Share = $${SHARE_PRICE}`}
                  />
                  <PreviewRow
                    label="Min. Amount Out"
                    value={
                      withdrawNum > 0
                        ? `$${fmt(minOut)} USDC (0.5%)`
                        : "—"
                    }
                    muted
                  />
                  <PreviewRow
                    label="Network Fee"
                    value="~0.00001 XLM"
                    muted
                    last
                  />
                </>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={tab === "deposit" ? handleDeposit : handleWithdraw}
              disabled={
                tab === "deposit" ? depositNum <= 0 : withdrawNum <= 0
              }
              className={cn(
                "w-full py-4 rounded-lg text-[15px] font-medium transition-all duration-200 relative overflow-hidden",
                tab === "deposit"
                  ? "bg-sky text-void hover:shadow-[0_0_28px_rgba(94,184,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
                  : "bg-transparent text-text-primary border border-rim2 hover:border-text-primary disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              {tab === "deposit" ? "Confirm Deposit →" : "Confirm Withdrawal →"}
            </button>

            <p className="text-center text-[11px] text-text-faint leading-relaxed">
              {tab === "deposit"
                ? "Funds are deployed into non-custodial Soroban smart contracts."
                : "No lock-up period or exit fees. Withdrawals are processed immediately."}
            </p>
          </CardBody>
        </Card>

        {/* Info sidebar */}
        <div className="space-y-4">
          <SharePriceCard />
          <ApySummaryCard />
          <AllocationCard />
          <MyPositionCard />
        </div>
      </div>
    </>
  );
}

function PreviewRow({
  label,
  value,
  accent,
  muted,
  last,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex justify-between items-center py-2",
        !last && "border-b border-rim"
      )}
    >
      <span className="font-mono text-[11px] text-text-sub">{label}</span>
      <span
        className={cn(
          "font-mono text-[11px] font-medium",
          accent && "text-mint",
          muted && "text-text-sub",
          !accent && !muted && "text-text-primary"
        )}
      >
        {value}
      </span>
    </div>
  );
}

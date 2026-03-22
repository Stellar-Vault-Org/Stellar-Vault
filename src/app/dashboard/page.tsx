import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/ui/StatCard";
import ApyChart from "@/components/charts/ApyChart";
import AllocationChart from "@/components/charts/AllocationChart";
import PositionsTable from "@/components/vault/PositionsTable";
import HarvestLog from "@/components/vault/HarvestLog";
import { VAULT_STATS, USER_POSITION, fmt } from "@/lib/data";
import { ArrowDownToLine } from "lucide-react";

export default function DashboardPage() {
  const { apy, apyDelta, sharePrice } = VAULT_STATS;
  const { usdValue, shares, yieldEarned } = USER_POSITION;

  return (
    <AppShell
      title="DASHBOARD"
      actions={
        <Link
          href="/deposit"
          className="flex items-center gap-2 bg-sky text-void font-medium text-[13px] px-4 py-2 rounded hover:shadow-[0_0_20px_rgba(94,184,255,0.35)] transition-all duration-200"
        >
          <ArrowDownToLine size={14} />
          Deposit USDC
        </Link>
      }
    >
      <div className="p-8 space-y-5">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            label="Your Position"
            value={
              <span>
                <span className="text-sky">${fmt(Math.floor(usdValue))}</span>
                .{String(usdValue.toFixed(2)).split(".")[1]}
              </span>
            }
            delta={`+$${fmt(yieldEarned)} earned`}
            deltaType="up"
            glowColor="#5EB8FF"
          />
          <StatCard
            label="Vault Shares"
            value={
              <span>
                <span className="text-sky">{fmt(Math.floor(shares), 0)}</span>
                .{String(shares.toFixed(2)).split(".")[1]}
              </span>
            }
            delta={`@ $${sharePrice} per share`}
            deltaType="neutral"
            glowColor="#00E5C3"
          />
          <StatCard
            label="Current APY"
            value={
              <span>
                <span className="text-sky">{Math.floor(apy)}</span>.
                {String(apy.toFixed(2)).split(".")[1]}%
              </span>
            }
            delta={`+${apyDelta}% vs yesterday`}
            deltaType="up"
            glowColor="#F5A623"
          />
          <StatCard
            label="Total TVL"
            value={
              <span>
                <span className="text-sky">$4.2</span>M
              </span>
            }
            delta="+$320K this week"
            deltaType="up"
            glowColor="#5EB8FF"
          />
        </div>

        {/* Chart row */}
        <div className="grid grid-cols-[1fr_320px] gap-4">
          <ApyChart />
          <AllocationChart />
        </div>

        {/* Positions */}
        <PositionsTable />

        {/* Harvest log */}
        <HarvestLog />
      </div>
    </AppShell>
  );
}

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Droplets, Waves } from "lucide-react";

const POSITIONS = [
  {
    id: "blend",
    icon: Droplets,
    asset: "USDC",
    protocol: "Blend Lending",
    deployed: "$2,615,432",
    apy: "12.4%",
    pct: "62.0%",
  },
  {
    id: "soroswap",
    icon: Waves,
    asset: "USDC/XLM LP",
    protocol: "Soroswap AMM",
    deployed: "$1,603,008",
    apy: "19.6%",
    pct: "38.0%",
  },
];

export default function PositionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Positions</CardTitle>
        <button className="font-mono text-[11px] text-sky hover:text-sky/70 transition-colors">
          View All →
        </button>
      </CardHeader>

      {/* Header row */}
      <div className="grid grid-cols-4 gap-3 px-5 py-3 border-b border-rim">
        {["Asset / Protocol", "Deployed Value", "Current APY", "% of Pool"].map((h) => (
          <span
            key={h}
            className="font-mono text-[10px] text-text-faint uppercase tracking-[1px]"
          >
            {h}
          </span>
        ))}
      </div>

      {POSITIONS.map((pos) => (
        <div
          key={pos.id}
          className="grid grid-cols-4 gap-3 px-5 py-4 border-b border-rim last:border-none hover:bg-panel2 transition-colors duration-150 items-center"
        >
          {/* Asset */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rim2 flex items-center justify-center shrink-0">
              <pos.icon size={14} className="text-text-sub" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-text-primary">
                {pos.asset}
              </p>
              <p className="font-mono text-[10px] text-text-sub mt-0.5">
                {pos.protocol}
              </p>
            </div>
          </div>

          <span className="font-mono text-[13px] text-text-primary">
            {pos.deployed}
          </span>
          <span className="font-mono text-[13px] text-mint">{pos.apy}</span>
          <span className="font-mono text-[13px] text-text-sub">{pos.pct}</span>
        </div>
      ))}
    </Card>
  );
}

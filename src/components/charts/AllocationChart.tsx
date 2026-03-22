"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { ALLOCATIONS } from "@/lib/data";

interface TooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: { apy: number } }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-panel2 border border-rim2 rounded px-3 py-2">
      <p className="font-mono text-[11px] text-text-primary">{d.name}</p>
      <p className="font-mono text-[11px] text-sky">{d.value}% allocation</p>
      <p className="font-mono text-[11px] text-mint">{d.payload.apy}% APY</p>
    </div>
  );
}

export default function AllocationChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Capital Allocation</CardTitle>
        <span className="font-mono text-[11px] text-mint flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-mint animate-blink" />
          Live
        </span>
      </CardHeader>
      <CardBody>
        <div className="flex items-center gap-6">
          <div className="w-[120px] h-[120px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ALLOCATIONS}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={56}
                  dataKey="pct"
                  nameKey="protocol"
                  strokeWidth={0}
                  paddingAngle={2}
                >
                  {ALLOCATIONS.map((entry, i) => (
                    <Cell key={i} fill={entry.color} opacity={0.85} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-3">
            {ALLOCATIONS.map((a) => (
              <div key={a.protocol} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: a.color }}
                    />
                    <span className="text-[12px] text-text-sub">{a.protocol}</span>
                  </div>
                  <span className="font-mono text-[12px] text-text-primary">
                    {a.pct}%
                  </span>
                </div>
                <div className="h-[3px] rounded-full bg-rim overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${a.pct}%`, background: a.color }}
                  />
                </div>
                <p className="font-mono text-[10px] text-text-faint">
                  {a.apy}% APY
                </p>
              </div>
            ))}

            <div className="pt-2 mt-2 border-t border-rim">
              <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-1">
                Last Rebalance
              </p>
              <p className="font-mono text-[12px] text-text-primary">2h 14m ago</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

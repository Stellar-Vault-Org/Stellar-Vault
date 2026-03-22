"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { APY_DATA_7D, APY_DATA_30D, APY_DATA_90D } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { ApyDataPoint } from "@/types";

const RANGES: { label: string; data: ApyDataPoint[] }[] = [
  { label: "7D", data: APY_DATA_7D },
  { label: "30D", data: APY_DATA_30D },
  { label: "90D", data: APY_DATA_90D },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-panel2 border border-rim2 rounded px-3 py-2">
      <p className="font-mono text-[10px] text-text-sub mb-0.5">{label}</p>
      <p className="font-mono text-[14px] text-sky font-medium">
        {payload[0].value.toFixed(2)}% APY
      </p>
    </div>
  );
}

export default function ApyChart() {
  const [rangeIdx, setRangeIdx] = useState(1);
  const data = RANGES[rangeIdx].data;

  const current = data[data.length - 1].apy;
  const avg = data.reduce((s, d) => s + d.apy, 0) / data.length;
  const peak = Math.max(...data.map((d) => d.apy));
  const floor = Math.min(...data.map((d) => d.apy));

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>APY History</CardTitle>
        <div className="flex gap-1">
          {RANGES.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setRangeIdx(i)}
              className={cn(
                "font-mono text-[11px] px-2.5 py-1 rounded transition-all duration-150",
                i === rangeIdx
                  ? "bg-sky/10 text-sky border border-sky/20"
                  : "text-text-sub hover:text-text-primary hover:bg-rim"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardBody className="flex-1">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="apyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5EB8FF" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#5EB8FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#162035"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fill: "#2a3d5a", fontSize: 10, fontFamily: "DM Mono" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "#2a3d5a", fontSize: 10, fontFamily: "DM Mono" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                domain={["auto", "auto"]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#1c2d47", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="apy"
                stroke="#5EB8FF"
                strokeWidth={2}
                fill="url(#apyGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#5EB8FF", stroke: "#04070f", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 pt-4 mt-4 border-t border-rim">
          {[
            { label: "Current", value: `${current.toFixed(2)}%`, color: "text-sky" },
            { label: "Avg", value: `${avg.toFixed(1)}%`, color: "text-text-primary" },
            { label: "Peak", value: `${peak.toFixed(1)}%`, color: "text-mint" },
            { label: "Floor", value: `${floor.toFixed(1)}%`, color: "text-text-sub" },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-1">
                {label}
              </p>
              <p className={cn("font-mono text-[15px] font-medium", color)}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

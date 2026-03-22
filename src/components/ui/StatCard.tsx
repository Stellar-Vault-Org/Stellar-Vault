import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  delta?: string;
  deltaType?: "up" | "down" | "neutral";
  glowColor?: string;
  className?: string;
}

export default function StatCard({
  label,
  value,
  delta,
  deltaType = "neutral",
  glowColor = "#5EB8FF",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative bg-panel border border-rim rounded-lg p-5 overflow-hidden transition-all duration-200 hover:bg-panel2 hover:border-rim2 group",
        className
      )}
    >
      {/* Glow blob */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 transition-opacity duration-300 group-hover:opacity-15 pointer-events-none"
        style={{ background: glowColor }}
      />

      {/* Top accent on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: `linear-gradient(90deg, ${glowColor}, transparent)`,
        }}
      />

      <p className="font-mono text-[10px] text-text-sub tracking-[1.5px] uppercase mb-2.5">
        {label}
      </p>

      <div className="font-display text-[38px] leading-none tracking-wide text-text-primary mb-1.5">
        {value}
      </div>

      {delta && (
        <div
          className={cn(
            "flex items-center gap-1 font-mono text-[11px]",
            deltaType === "up" && "text-mint",
            deltaType === "down" && "text-danger",
            deltaType === "neutral" && "text-text-sub"
          )}
        >
          {deltaType === "up" && <TrendingUp size={11} />}
          {deltaType === "down" && <TrendingDown size={11} />}
          {deltaType === "neutral" && <Minus size={11} />}
          {delta}
        </div>
      )}
    </div>
  );
}

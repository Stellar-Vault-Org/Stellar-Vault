import { RefreshCw, ArrowDownToLine, ArrowUpFromLine, Shuffle } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { HARVEST_EVENTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { HarvestEvent } from "@/types";

const EVENT_CONFIG = {
  harvest: {
    icon: RefreshCw,
    dotColor: "bg-mint shadow-[0_0_6px_#00E5C3]",
    amountColor: "text-mint",
  },
  deposit: {
    icon: ArrowDownToLine,
    dotColor: "bg-sky shadow-[0_0_6px_#5EB8FF]",
    amountColor: "text-sky",
  },
  withdraw: {
    icon: ArrowUpFromLine,
    dotColor: "bg-amber shadow-[0_0_6px_#F5A623]",
    amountColor: "text-amber",
  },
  rebalance: {
    icon: Shuffle,
    dotColor: "bg-rim2",
    amountColor: "text-text-sub",
  },
};

function EventRow({ event }: { event: HarvestEvent }) {
  const config = EVENT_CONFIG[event.type];

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-rim last:border-none hover:bg-panel2 transition-colors duration-150">
      <span
        className={cn("w-2 h-2 rounded-full shrink-0", config.dotColor)}
      />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-text-primary">{event.title}</p>
        <p className="font-mono text-[10px] text-text-faint mt-0.5">
          {event.time} · {event.ledger}
        </p>
      </div>
      {event.amountLabel && (
        <span
          className={cn(
            "font-mono text-[13px] font-medium shrink-0",
            config.amountColor
          )}
        >
          {event.amountLabel}
        </span>
      )}
    </div>
  );
}

export default function HarvestLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <button className="font-mono text-[11px] text-sky hover:text-sky/70 transition-colors">
          Full Log →
        </button>
      </CardHeader>
      <div>
        {HARVEST_EVENTS.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </div>
    </Card>
  );
}

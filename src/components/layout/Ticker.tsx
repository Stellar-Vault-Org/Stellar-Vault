const ITEMS = [
  { label: "USDC / VAULT SHARES", value: "1 : 1.0821", positive: true },
  { label: "7D APY", value: "14.82%", positive: true },
  { label: "TVL", value: "$4,218,440", positive: true },
  { label: "BLEND ALLOCATION", value: "62%", positive: null },
  { label: "SOROSWAP ALLOCATION", value: "38%", positive: null },
  { label: "TOTAL HARVESTED", value: "$128,330", positive: true },
  { label: "LAST HARVEST", value: "2h ago", positive: null },
  { label: "DEPOSITORS", value: "841", positive: null },
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]; // seamless loop
  return (
    <div className="border-t border-b border-rim bg-panel/40 overflow-hidden h-11 flex items-center">
      <div className="flex gap-0 animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 border-r border-rim font-mono text-[11px]"
          >
            <span className="text-text-faint tracking-wide">{item.label}</span>
            <span
              className={
                item.positive === true
                  ? "text-mint"
                  : item.positive === false
                  ? "text-danger"
                  : "text-text-sub"
              }
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

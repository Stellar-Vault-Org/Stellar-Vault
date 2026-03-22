"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  RefreshCw,
  PieChart,
  BookOpen,
  Settings,
  Hexagon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WALLET_ADDRESS } from "@/lib/data";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/deposit", label: "Deposit", icon: ArrowDownToLine },
      { href: "/withdraw", label: "Withdraw", icon: ArrowUpFromLine },
    ],
  },
  {
    label: "Analytics",
    items: [
      { href: "/analytics/apy", label: "APY History", icon: TrendingUp },
      { href: "/analytics/harvest", label: "Harvest Log", icon: RefreshCw },
      { href: "/analytics/allocations", label: "Allocations", icon: PieChart },
    ],
  },
  {
    label: "Info",
    items: [
      { href: "/docs", label: "Docs", icon: BookOpen },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] shrink-0 border-r border-rim bg-deep flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-rim">
        <div className="relative w-7 h-7 shrink-0">
          <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
            <polygon
              points="14,2 26,8 26,20 14,26 2,20 2,8"
              stroke="#5EB8FF"
              strokeWidth="1.5"
              fill="none"
              opacity="0.8"
            />
            <polygon
              points="14,7 22,11 22,17 14,21 6,17 6,11"
              stroke="#00E5C3"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            <circle cx="14" cy="14" r="2.5" fill="#5EB8FF" />
          </svg>
        </div>
        <span className="font-display text-lg tracking-widest text-text-primary">
          STELLAR<span className="text-sky">VAULT</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-2">
            <p className="font-mono text-[10px] text-text-faint tracking-[2px] uppercase px-2 mb-2 mt-4 first:mt-0">
              {section.label}
            </p>
            {section.items.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-2.5 rounded-md text-[13.5px] transition-all duration-150 mb-0.5",
                    active
                      ? "bg-sky/10 text-sky border border-sky/15"
                      : "text-text-sub hover:bg-rim hover:text-text-primary border border-transparent"
                  )}
                >
                  <Icon
                    size={15}
                    className={cn(active ? "text-sky" : "text-text-faint")}
                  />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Wallet chip */}
      <div className="p-3 border-t border-rim">
        <div className="flex items-center gap-2.5 bg-panel border border-rim2 rounded-lg px-3 py-3 cursor-pointer hover:border-sky/40 transition-colors">
          <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_8px_#00E5C3] shrink-0 animate-blink" />
          <span className="font-mono text-[11px] text-text-sub truncate">
            {WALLET_ADDRESS}
          </span>
        </div>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#protocol", label: "Protocol" },
  { href: "#strategies", label: "Strategies" },
  { href: "#analytics", label: "Analytics" },
  { href: "/docs", label: "Docs" },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-12 transition-all duration-300",
        scrolled
          ? "bg-void/80 backdrop-blur-xl border-b border-rim"
          : "bg-transparent"
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 no-underline">
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
          <polygon
            points="16,2 30,9 30,23 16,30 2,23 2,9"
            stroke="#5EB8FF"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />
          <polygon
            points="16,8 25,13 25,19 16,24 7,19 7,13"
            stroke="#00E5C3"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <circle cx="16" cy="16" r="3" fill="#5EB8FF" />
        </svg>
        <span className="font-display text-xl tracking-widest text-text-primary">
          STELLAR<span className="text-sky">VAULT</span>
        </span>
      </Link>

      {/* Links */}
      <ul className="flex items-center gap-8 list-none">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-text-sub text-[13px] font-medium tracking-wide hover:text-text-primary transition-colors duration-150 no-underline"
            >
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/dashboard"
            className="border border-sky text-sky text-[13px] font-medium px-5 py-2 rounded hover:bg-sky hover:text-void transition-all duration-200 no-underline"
          >
            Launch App →
          </Link>
        </li>
      </ul>
    </nav>
  );
}

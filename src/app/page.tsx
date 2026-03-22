import Link from "next/link";
import {
  Shield,
  Zap,
  TrendingUp,
  Lock,
  Layers,
  Users,
  ArrowRight,
  ArrowDownToLine,
} from "lucide-react";
import LandingNav from "@/components/layout/LandingNav";
import Ticker from "@/components/layout/Ticker";
import VaultVisual from "@/components/vault/VaultVisual";

// ── Section: Metrics ────────────────────────────────────────────────────────

function MetricCell({
  value,
  accent,
  suffix,
  label,
  sub,
}: {
  value: string;
  accent: string;
  suffix?: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="bg-panel border-r border-rim last:border-none p-8 hover:bg-panel2 transition-colors duration-200 group relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="font-display text-[52px] leading-none tracking-wide mb-2">
        <span className="text-sky">{accent}</span>
        {value}
        {suffix && <span className="text-sky">{suffix}</span>}
      </div>
      <p className="text-[13px] text-text-sub font-light mb-1">{label}</p>
      <p className="font-mono text-[11px] text-mint">{sub}</p>
    </div>
  );
}

const METRICS = [
  { accent: "$4.2", value: "M", label: "Total Value Locked", sub: "↑ +$320K this week" },
  { accent: "14", value: ".82%", label: "Current APY", sub: "30-day avg: 13.4%" },
  { accent: "841", value: "", label: "Active Depositors", sub: "↑ +47 this month" },
  { accent: "$128", value: "K", label: "Total Yield Harvested", sub: "Auto-compounded" },
];

// ── Section: Steps ──────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    icon: ArrowDownToLine,
    title: "Deposit USDC",
    desc: "Connect your Freighter wallet and deposit any amount of USDC into the Vault.",
  },
  {
    num: "02",
    icon: Layers,
    title: "Receive Shares",
    desc: "You receive Vault Shares representing proportional ownership of the pool.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Strategy Deploys",
    desc: "The Strategy Contract allocates capital across Blend and Soroswap for optimal yield.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Auto-Compound",
    desc: "Harvested rewards are swapped back to USDC and reinvested continuously.",
  },
  {
    num: "05",
    icon: ArrowRight,
    title: "Shares Grow",
    desc: "Share value increases over time. Withdraw anytime at the current rate.",
  },
];

// ── Section: Features ───────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Shield,
    title: "Non-Custodial",
    desc: "You hold Vault Shares at all times. The protocol never takes custody of your funds — all logic runs on-chain via Soroban smart contracts.",
    badge: "On-chain",
  },
  {
    icon: Layers,
    title: "SEP-0056 Standard",
    desc: "Fully compliant with the Stellar Vault Standard, modeled after the battle-tested ERC-4626 architecture. Compatible with any SEP-0056 dashboard.",
    badge: "Interoperable",
  },
  {
    icon: Lock,
    title: "Emergency Shutdown",
    desc: "Built-in panic button halts new deposits while keeping withdrawals permanently open. Your exit is always guaranteed.",
    badge: "Protected",
  },
  {
    icon: TrendingUp,
    title: "Slippage Protection",
    desc: "Every withdrawal includes a configurable minimum amount parameter. Transactions revert automatically if market conditions move against you.",
    badge: "Safe",
  },
  {
    icon: Zap,
    title: "Socialized Gas",
    desc: "Harvest operations are pooled across all depositors. The cost of high-frequency compounding is shared across the pool.",
    badge: "Efficient",
  },
  {
    icon: Users,
    title: "Multi-Protocol",
    desc: "Capital flows dynamically between Blend lending and Soroswap liquidity, always targeting optimal risk-adjusted returns.",
    badge: "Diversified",
  },
];

// ── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="bg-void min-h-screen overflow-x-hidden">
      <LandingNav />

      {/* ── HERO ── */}
      <section className="min-h-screen pt-[68px] flex items-center">
        <div className="max-w-[1280px] mx-auto px-12 w-full py-16">
          <div className="grid grid-cols-2 gap-20 items-center">
            {/* Left */}
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 font-mono text-[11px] text-mint tracking-[2px] uppercase mb-8 bg-mint/5 border border-mint/15 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-mint animate-blink" />
                Soroban · SEP-0056 · Non-custodial
              </div>

              {/* Headline */}
              <h1 className="font-display leading-[0.92] tracking-wider mb-8">
                <span className="block text-[clamp(72px,8vw,120px)] text-text-primary">
                  PASSIVE
                </span>
                <span
                  className="block text-[clamp(72px,8vw,120px)]"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(94,184,255,0.45)",
                  }}
                >
                  YIELD
                </span>
                <span
                  className="block text-[clamp(72px,8vw,120px)] text-sky"
                  style={{ textShadow: "0 0 60px rgba(94,184,255,0.35)" }}
                >
                  ACTIVE.
                </span>
              </h1>

              <p className="text-[16px] text-text-sub font-light leading-relaxed max-w-[440px] mb-10">
                Deposit once. StellarVault continuously moves your capital across
                Stellar&apos;s top protocols — Blend, Soroswap — harvesting and
                compounding returns automatically.
              </p>

              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 bg-sky text-void font-medium text-[14px] px-8 py-3.5 rounded hover:shadow-[0_0_30px_rgba(94,184,255,0.4)] transition-all duration-200 no-underline"
                >
                  Start Earning
                  <ArrowRight size={15} />
                </Link>
                <a
                  href="#how-it-works"
                  className="flex items-center gap-2 text-text-sub text-[14px] border border-rim2 px-6 py-3.5 rounded hover:border-text-sub hover:text-text-primary transition-all duration-200 no-underline"
                >
                  How it works
                </a>
              </div>
            </div>

            {/* Right: Vault visual */}
            <div className="flex justify-center">
              <VaultVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── METRICS ── */}
      <section className="max-w-[1280px] mx-auto px-12 py-24">
        <div className="font-mono text-[11px] text-sky tracking-[3px] uppercase flex items-center gap-3 mb-4">
          Protocol Metrics
          <span className="h-px w-12 bg-sky/40" />
        </div>
        <h2 className="font-display text-[clamp(40px,5vw,68px)] leading-none tracking-wide mb-14">
          NUMBERS
          <br />
          DON&apos;T LIE.
        </h2>

        <div className="grid grid-cols-4 border border-rim rounded-lg overflow-hidden divide-x divide-rim">
          {METRICS.map((m, i) => (
            <MetricCell key={i} {...m} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="max-w-[1280px] mx-auto px-12 py-24 border-t border-rim"
      >
        <div className="font-mono text-[11px] text-sky tracking-[3px] uppercase flex items-center gap-3 mb-4">
          How It Works
          <span className="h-px w-12 bg-sky/40" />
        </div>
        <h2 className="font-display text-[clamp(40px,5vw,68px)] leading-none tracking-wide mb-16">
          FIVE STEPS
          <br />
          TO YIELD.
        </h2>

        <div className="grid grid-cols-5 gap-0">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative px-6 first:pl-0 last:pr-0">
              {/* connector */}
              {i < STEPS.length - 1 && (
                <div className="absolute top-[26px] right-0 w-6 h-px bg-gradient-to-r from-rim2 to-transparent" />
              )}
              <p className="font-display text-[56px] leading-none text-sky/8 mb-[-12px]">
                {step.num}
              </p>
              <div className="w-10 h-10 border border-rim2 rounded-md flex items-center justify-center bg-panel mb-4">
                <step.icon size={16} className="text-text-sub" />
              </div>
              <p className="text-[14px] font-medium text-text-primary mb-2">
                {step.title}
              </p>
              <p className="text-[12.5px] text-text-sub font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        id="protocol"
        className="max-w-[1280px] mx-auto px-12 py-24 border-t border-rim"
      >
        <div className="font-mono text-[11px] text-sky tracking-[3px] uppercase flex items-center gap-3 mb-4">
          Protocol Design
          <span className="h-px w-12 bg-sky/40" />
        </div>
        <h2 className="font-display text-[clamp(40px,5vw,68px)] leading-none tracking-wide mb-14">
          BUILT FOR
          <br />
          SECURITY.
        </h2>

        <div className="grid grid-cols-3 border border-rim rounded-lg overflow-hidden divide-x divide-y divide-rim">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-8 bg-panel hover:bg-panel2 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 border border-rim2 rounded-md flex items-center justify-center mb-5 group-hover:border-sky/30 transition-colors">
                <f.icon size={18} className="text-text-sub group-hover:text-sky/70 transition-colors" />
              </div>
              <h3 className="text-[15px] font-medium text-text-primary mb-2.5">
                {f.title}
              </h3>
              <p className="text-[13px] text-text-sub font-light leading-relaxed mb-4">
                {f.desc}
              </p>
              <span className="font-mono text-[10px] text-sky bg-sky/8 border border-sky/15 px-2.5 py-1 rounded-full tracking-wide">
                {f.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-[1280px] mx-auto px-12 pb-24">
        <div className="bg-panel border border-rim2 rounded-xl p-20 grid grid-cols-[1fr_auto] gap-16 items-center relative overflow-hidden">
          {/* BG glow */}
          <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full bg-sky/5 blur-3xl pointer-events-none" />

          <div>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-wide mb-4">
              READY TO PUT
              <br />
              YOUR USDC TO
              <br />
              <span className="text-sky">WORK?</span>
            </h2>
            <p className="text-[15px] text-text-sub font-light leading-relaxed max-w-[420px]">
              Join 841 depositors already earning automated yield on Stellar. No
              manual management. No missed compounding windows.
            </p>
          </div>

          <div className="flex flex-col gap-3 min-w-[200px]">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 bg-sky text-void font-medium text-[14px] px-8 py-3.5 rounded hover:shadow-[0_0_28px_rgba(94,184,255,0.35)] transition-all duration-200 no-underline"
            >
              Connect Wallet
              <ArrowRight size={15} />
            </Link>
            <a
              href="/docs"
              className="flex items-center justify-center gap-2 text-text-sub text-[13px] border border-rim2 px-8 py-3.5 rounded hover:border-text-sub hover:text-text-primary transition-all duration-200 no-underline"
            >
              Read the Docs
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-rim px-12 py-8 flex items-center justify-between">
        <span className="font-display text-lg tracking-widest text-text-sub">
          STELLARVAULT
        </span>
        <ul className="flex gap-7 list-none">
          {["GitHub", "Docs", "Audit", "Twitter", "Discord"].map((l) => (
            <li key={l}>
              <a
                href="#"
                className="text-text-faint text-[12px] hover:text-text-sub transition-colors no-underline"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <span className="font-mono text-[11px] text-text-faint">
          MIT License · Built on Soroban
        </span>
      </footer>
    </div>
  );
}

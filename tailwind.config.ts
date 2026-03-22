import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        void: "#04070f",
        deep: "#070d1a",
        panel: "#0a1220",
        panel2: "#0e1828",
        panel3: "#111e30",
        rim: "#162035",
        rim2: "#1c2d47",
        sky: "#5EB8FF",
        mint: "#00E5C3",
        amber: "#F5A623",
        danger: "#FF5A5A",
        "text-primary": "#D8E8FF",
        "text-sub": "#6B8BB0",
        "text-faint": "#2a3d5a",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.04)", opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-12px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(130px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(130px) rotate(-360deg)" },
        },
        orbitReverse: {
          from: { transform: "rotate(0deg) translateX(95px) rotate(0deg)" },
          to: {
            transform: "rotate(-360deg) translateX(95px) rotate(360deg)",
          },
        },
        shimmer: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(100%)" },
        },
      },
      animation: {
        blink: "blink 2s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease forwards",
        slideIn: "slideIn 0.4s ease forwards",
        spin: "spin 0.9s linear infinite",
        ticker: "ticker 30s linear infinite",
        orbit: "orbit 6s linear infinite",
        orbitReverse: "orbitReverse 4s linear infinite",
        shimmer: "shimmer 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;

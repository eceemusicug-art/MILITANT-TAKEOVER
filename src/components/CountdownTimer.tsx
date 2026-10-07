import { motion } from "framer-motion";
import { Clock, ShieldAlert } from "lucide-react";
import { EVENT } from "../lib/event";
import { useCountdown } from "../hooks/useCountdown";
import { cn } from "../utils/cn";

interface CountdownTimerProps {
  className?: string;
  variant?: "hero" | "card" | "compact";
  showTitle?: boolean;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CountdownTimer({
  className,
  variant = "hero",
  showTitle = true,
}: CountdownTimerProps) {
  const t = useCountdown(EVENT.dateISO);

  const units = [
    { label: "DAYS", value: pad(t.days), sub: "DD" },
    { label: "HOURS", value: pad(t.hours), sub: "HR" },
    { label: "MINS", value: pad(t.minutes), sub: "MIN" },
    { label: "SECS", value: pad(t.seconds), sub: "SEC", active: true },
  ];

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-xl border border-flare-500/35 bg-ink-950/80 px-3.5 py-2 font-mono text-xs backdrop-blur-md",
          className
        )}
      >
        <span className="size-2 rounded-full bg-flare-500 animate-pulse-dot" />
        <span className="text-[10px] tracking-[0.2em] text-camo-300 uppercase">T-Minus:</span>
        <span className="font-bold tabular-nums text-sand-50">
          {pad(t.days)}d : {pad(t.hours)}h : {pad(t.minutes)}m : {pad(t.seconds)}s
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "reticle reticle-green relative overflow-hidden rounded-2xl border border-camo-500/40 bg-ink-900/90 p-4 sm:p-5",
        "shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl",
        className
      )}
    >
      {/* Tactical background textures */}
      <div className="dot-matrix absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="camo-soft absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Header bar */}
      {showTitle && (
        <div className="relative mb-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5 font-mono text-[9px] tracking-[0.26em] text-camo-300 uppercase sm:text-[10px]">
          <span className="flex items-center gap-2 text-flare-400">
            <span className="size-2 rounded-full bg-flare-500 animate-pulse-dot" />
            <Clock className="size-3.5 text-flare-500" />
            <span>T-Minus // Mission Countdown</span>
          </span>
          <span className="flex items-center gap-1.5 text-camo-400">
            <ShieldAlert className="size-3 text-camo-300" />
            <span className="hidden sm:inline">ZERO HOUR:</span> 30.12.2026 // 18:00 EAT
          </span>
        </div>
      )}

      {/* 4-unit grid */}
      <div className="relative grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className={cn(
              "group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border p-2 text-center sm:p-3.5",
              u.active
                ? "border-flare-500/50 bg-flare-500/[0.08] shadow-[inset_0_0_20px_rgba(var(--army-accent-rgb),0.15)]"
                : "border-white/10 bg-white/[0.02] hover:border-camo-500/40"
            )}
          >
            {/* corner tick */}
            <span className="absolute right-1.5 top-1 font-mono text-[8px] text-camo-600 sm:text-[9px]">
              [{u.sub}]
            </span>

            {/* Digit */}
            <motion.span
              key={u.value}
              initial={{ scale: 1.08, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "font-display text-2xl font-bold tabular-nums tracking-tight sm:text-3xl sm:tracking-normal lg:text-4xl",
                u.active
                  ? "text-flare-400 drop-shadow-[0_0_12px_rgba(var(--army-accent-rgb),0.5)]"
                  : "text-sand-50"
              )}
            >
              {u.value}
            </motion.span>

            {/* Label */}
            <span
              className={cn(
                "mt-1 font-mono text-[8px] font-semibold tracking-[0.24em] uppercase sm:text-[10px]",
                u.active ? "text-flare-400/90" : "text-camo-300"
              )}
            >
              {u.label}
            </span>
          </div>
        ))}
      </div>

      {/* Sub-strip with live target confirmation */}
      <div className="relative mt-3 flex items-center justify-between border-t border-white/5 pt-2 font-mono text-[8px] tracking-[0.22em] text-sand-400 uppercase sm:text-[9px]">
        <span>Deploy: K Home Apartments, Kitgum</span>
        <span className="text-flare-400 font-semibold">Dec 30, 2026</span>
      </div>
    </div>
  );
}

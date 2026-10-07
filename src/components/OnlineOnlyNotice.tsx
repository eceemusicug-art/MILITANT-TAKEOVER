import { Ban, Smartphone } from "lucide-react";
import { SALES_POLICY } from "../lib/event";
import { cn } from "../utils/cn";

interface Props {
  variant?: "card" | "inline";
  className?: string;
}

/** "Online only — no gate sales" notice. */
export function OnlineOnlyNotice({ variant = "card", className }: Props) {
  if (variant === "inline") {
    return (
      <p
        className={cn(
          "flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-flare-300 uppercase sm:text-[11px]",
          className
        )}
      >
        <Ban className="size-3.5 shrink-0 text-flare-500" strokeWidth={2.4} />
        {SALES_POLICY.short}
      </p>
    );
  }

  return (
    <div
      role="note"
      className={cn(
        "relative flex items-start gap-4 overflow-hidden rounded-2xl border border-flare-500/45 bg-flare-500/[0.08] p-5 sm:items-center sm:p-6",
        className
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-flare-500 text-ink-950 shadow-[0_8px_24px_-8px_rgba(var(--army-accent-rgb),0.8)]">
        <Smartphone className="size-5" strokeWidth={2.2} />
      </span>
      <div>
        <p className="font-display text-lg uppercase leading-tight tracking-wide text-sand-50 sm:text-xl">
          Online Only — <span className="text-flare-400">No Gate Sales</span>
        </p>
        <p className="mt-1 text-sm leading-relaxed text-sand-300">{SALES_POLICY.long}</p>
      </div>
    </div>
  );
}

import { Star } from "lucide-react";
import { TICKETS, formatUGX } from "../lib/event";

const ITEMS = [
  "ECEE LIVE",
  "30.12.26",
  "KITGUM",
  "K HOME APARTMENTS",
  `GENERAL ${formatUGX(TICKETS.general.price)}`,
  `VIP ${formatUGX(TICKETS.vip.price)} + ECEE T-SHIRT`,
  "GATES 6 PM · DJ 7 PM · ECEE 9 PM",
  "ONLINE ONLY — NO GATE SALES",
  "ONE NIGHT ONLY",
  "NO RETREAT",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-camo-700/60" aria-hidden="true">
      {/* hazard edges */}
      <div className="hazard h-2 w-full opacity-90" />
      <div className="relative bg-camo-900/70">
        <div className="camo-soft absolute inset-0 opacity-80" />
        <div className="tactical-grid absolute inset-0 opacity-60" />
        <div className="relative flex w-max animate-marquee py-4">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {ITEMS.map((it, i) => (
                <span
                  key={i}
                  className="flex items-center gap-7 px-7 font-mono text-xs tracking-[0.26em] whitespace-nowrap text-camo-200 sm:text-sm"
                >
                  {it}
                  <Star className="size-3.5 fill-flare-500 text-flare-500" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-950 to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-950 to-transparent sm:w-28" />
      </div>
      <div className="hazard-camo h-2 w-full opacity-90" />
    </div>
  );
}

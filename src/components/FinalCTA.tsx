import { motion, useReducedMotion } from "framer-motion";
import { Flame, Ticket } from "lucide-react";
import { type TicketType } from "../lib/event";
import { Reveal } from "./Reveal";
import { CountdownTimer } from "./CountdownTimer";

export function FinalCTA({ onBuy }: { onBuy: (type: TicketType) => void }) {
  const reduce = useReducedMotion();

  return (
    <section className="noise relative overflow-hidden py-24 sm:py-36" aria-label="Final call to action">
      {/* background */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/gallery-crowd.jpg"
          alt=""
          loading="lazy"
          className={`size-full object-cover object-[center_35%] ${reduce ? "" : "animate-kenburns"}`}
        />
        <div className="absolute inset-0 bg-ink-950/82" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />
        <div className="camo-veil absolute inset-0" />
      </div>

      <div className="tactical-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="camo-soft absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="hazard relative h-2 w-full opacity-90" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pt-14 text-center sm:px-8">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-flare-500/40 bg-ink-950/70 px-5 py-2 font-mono text-[10px] sm:text-xs tracking-[0.3em] text-flare-400 uppercase backdrop-blur-md">
            <Flame className="size-4" />
            Last edition sold out in 9 days
          </p>
          <p className="mt-5 inline-block -rotate-[4deg] border-2 border-flare-500/55 px-4 py-1.5 font-mono text-[10px] tracking-[0.42em] text-flare-400/95 uppercase shadow-[inset_0_0_0_1px_rgba(var(--army-accent-rgb),0.18)]">
            All Systems Go
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display uppercase leading-[0.92] text-[clamp(2.8rem,9vw,6.5rem)] text-sand-50">
            Report For <span className="text-outline">Duty</span>
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-sand-300 sm:text-lg">
            Kitgum. 30.12.26. Gates 6 PM, DJs at 7, Ecee at 9, vibes till morning. No retreat.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-8 w-full max-w-lg">
            <CountdownTimer variant="card" />
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <motion.button
            onClick={() => onBuy("general")}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flare-btn group mt-10 inline-flex items-center gap-3 rounded-full px-9 py-5 font-mono text-sm font-bold tracking-[0.12em] text-ink-950 uppercase sm:px-12 sm:text-base"
          >
            <Ticket
              className="size-5 transition-transform duration-300 group-hover:-rotate-12"
              strokeWidth={2.4}
            />
            Buy Your Ticket Now — Mobile Money
          </motion.button>
        </Reveal>

        <Reveal delay={0.42}>
          <p className="mt-6 font-mono text-[10px] sm:text-xs tracking-[0.26em] text-sand-400 uppercase">
            MTN MoMo & Airtel Money accepted — number revealed on click
          </p>
          <p className="mt-3 font-mono text-[10px] font-bold tracking-[0.26em] text-flare-400 uppercase sm:text-xs">
            Online sales only — no tickets at the gate
          </p>
        </Reveal>
      </div>
    </section>
  );
}

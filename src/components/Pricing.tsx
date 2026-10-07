import { motion } from "framer-motion";
import { Ban, BadgeCheck, Check, Crown, ShieldCheck, Shirt, Ticket, Zap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { OnlineOnlyNotice } from "./OnlineOnlyNotice";
import { TICKETS, formatUGX, type TicketType } from "../lib/event";
import { cn } from "../utils/cn";

const GUARANTEES = [
  { icon: ShieldCheck, label: "Secure MoMo checkout" },
  { icon: Zap, label: "Instant SMS confirmation" },
  { icon: BadgeCheck, label: "Official Mobi ticket" },
  { icon: Ban, label: "No gate sales" },
];

function ScarcityBar({ claimed, capacity }: { claimed: number; capacity: number }) {
  const pct = Math.round((claimed / capacity) * 100);
  return (
      <div className="relative mt-6">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-camo-300">
        <span>
          {claimed.toLocaleString("en-UG")} / {capacity.toLocaleString("en-UG")} CLAIMED
        </span>
        <span className="text-flare-400">{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="h-full rounded-full bg-gradient-to-r from-camo-500 via-flare-500 to-flare-400"
        />
      </div>
    </div>
  );
}

export function Pricing({ onBuy }: { onBuy: (type: TicketType) => void }) {
  return (
    <section id="tickets" className="army-fill noise relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="Ticket Ranks"
          title={
            <>
              Choose Your <span className="text-flare-500">Rank</span>
            </>
          }
          copy="Two ways into the compound. One unforgettable night. Pay in seconds with MTN MoMo or Airtel Money — your ticket lands on your phone."
        />

        <Reveal delay={0.1}>
          <OnlineOnlyNotice className="mx-auto mt-10 max-w-3xl sm:mt-12" />
        </Reveal>

        <div className="mt-10 grid items-stretch gap-6 sm:mt-12 lg:grid-cols-2 lg:gap-8">
          {/* GENERAL */}
          <Reveal className="h-full">
              <article className="glass card-lift reticle reticle-green relative flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-9 hover:border-camo-400/50">
                <div className="dot-matrix absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-camo-300 uppercase">
                      Rank — Recruit // Access: General
                    </p>
                  <h3 className="mt-2.5 font-display text-3xl uppercase text-sand-50 sm:text-4xl">
                    General Pass
                  </h3>
                </div>
                <span className="grid size-13 place-items-center rounded-2xl border border-camo-600/60 bg-camo-800/70">
                  <Ticket className="size-6 text-camo-300" strokeWidth={1.8} />
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-sand-400">
                {TICKETS.general.tagline}
              </p>

              <p className="relative mt-7 flex items-baseline gap-2">
                <span className="font-display text-5xl tabular-nums text-sand-50 sm:text-6xl">
                  {TICKETS.general.price.toLocaleString("en-UG")}
                </span>
                <span className="font-mono text-sm tracking-[0.2em] text-flare-400">UGX</span>
              </p>
              <p className="relative mt-1.5 font-mono text-[10px] tracking-[0.2em] text-sand-500 uppercase">
                Per person — one night only
              </p>

              <ScarcityBar claimed={TICKETS.general.claimed} capacity={TICKETS.general.capacity} />

              <ul className="relative mt-7 flex-1 space-y-3.5 border-t border-white/10 pt-7">
                {TICKETS.general.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-sand-300">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-camo-800/80">
                      <Check className="size-3 text-camo-300" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onBuy("general")}
                className="relative mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full border border-camo-400/50 bg-camo-800/60 px-6 py-4 font-mono text-sm font-semibold tracking-[0.12em] text-sand-50 uppercase transition-all duration-300 hover:border-flare-500/60 hover:bg-flare-500/10 hover:text-flare-300 active:scale-[0.98]"
              >
                <Ticket className="size-5 transition-transform duration-300 group-hover:-rotate-12" />
                Buy General — Mobile Money
              </button>
            </article>
          </Reveal>

          {/* VIP */}
          <Reveal delay={0.12} className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-flare-500/50 bg-gradient-to-b from-flare-500/[0.1] via-ink-900/90 to-ink-900/95 p-7 shadow-[0_30px_90px_-30px_rgba(var(--army-accent-rgb),0.45)] sm:p-9 lg:-translate-y-2">
              <div className="camo-fill absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="hazard absolute inset-x-0 top-0 h-2" aria-hidden="true" />
              <div
                className="absolute -right-16 -top-16 size-48 rounded-full bg-flare-500/20 blur-[70px]"
                aria-hidden="true"
              />
              <div className="absolute right-5 top-5 z-10 rounded-full bg-flare-500 px-3.5 py-1.5 font-mono text-[9px] font-bold tracking-[0.24em] text-ink-950 uppercase">
                Most Popular
              </div>

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-flare-400 uppercase">
                    <Crown className="size-3.5" />
                    Rank — Commander // VIP
                  </p>
                  <h3 className="mt-2.5 font-display text-3xl uppercase text-sand-50 sm:text-4xl">
                    VIP Pass
                  </h3>
                </div>
                <span className="grid size-13 place-items-center rounded-2xl border border-flare-500/50 bg-flare-500/15">
                  <Crown className="size-6 text-flare-400" strokeWidth={1.8} />
                </span>
              </div>
              <p className="relative mt-3 text-sm leading-relaxed text-sand-400">{TICKETS.vip.tagline}</p>
              <p className="relative mt-2 font-mono text-[9px] tracking-[0.26em] text-camo-300 uppercase">
                Serial: VIP-30.12.26-KIT
              </p>

              <p className="mt-7 flex items-baseline gap-2">
                <span className="font-display text-5xl tabular-nums text-sand-50 sm:text-6xl">
                  {TICKETS.vip.price.toLocaleString("en-UG")}
                </span>
                <span className="font-mono text-sm tracking-[0.2em] text-flare-400">UGX</span>
              </p>
              <p className="relative mt-1.5 font-mono text-[10px] tracking-[0.2em] text-sand-500 uppercase">
                Limited to {TICKETS.vip.capacity} commanders
              </p>

              <ScarcityBar claimed={TICKETS.vip.claimed} capacity={TICKETS.vip.capacity} />

              {/* Merch perk */}
              <div className="group/perk relative mt-7 flex items-center gap-4 overflow-hidden rounded-2xl border border-flare-500/40 bg-ink-950/70 p-4 transition-colors duration-500 hover:border-flare-500/70">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-[0.12] transition-opacity duration-500 group-hover/perk:opacity-20"
                  style={{ backgroundImage: "url(/images/camo-texture.jpg)" }}
                  aria-hidden="true"
                />
                <span className="relative grid size-12 shrink-0 place-items-center rounded-xl bg-flare-500 text-ink-950 shadow-[0_8px_24px_-8px_rgba(var(--army-accent-rgb),0.8)] transition-transform duration-500 group-hover/perk:-rotate-6">
                  <Shirt className="size-6" strokeWidth={2} />
                </span>
                <div className="relative">
                  <p className="font-mono text-[9px] tracking-[0.28em] text-flare-400 uppercase">
                    Included with VIP
                  </p>
                  <p className="mt-1 font-display text-xl uppercase leading-tight text-sand-50">
                    {TICKETS.vip.perk}
                  </p>
                  <p className="mt-0.5 text-xs text-sand-400">
                    Exclusive merch — collect it at the VIP desk.
                  </p>
                </div>
              </div>

              <ul className="relative mt-7 flex-1 space-y-3.5 border-t border-flare-500/20 pt-7">
                {TICKETS.vip.features.map((f, i) => (
                  <li
                    key={f}
                    className={cn(
                      "flex items-start gap-3 text-sm",
                      i === 0 && "font-medium text-sand-200",
                      i === 1 && "font-semibold text-flare-300",
                      i > 1 && "text-sand-300"
                    )}
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-flare-500/20">
                      <Check className="size-3 text-flare-400" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onBuy("vip")}
                className="flare-btn relative z-10 mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 font-mono text-sm font-bold tracking-[0.12em] text-ink-950 uppercase transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Crown className="size-5 transition-transform duration-300 group-hover:rotate-12" />
                Claim VIP — Mobile Money
              </button>
            </article>
          </Reveal>
        </div>

        {/* guarantees */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {GUARANTEES.map((g) => (
              <span
                key={g.label}
                className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-camo-200 uppercase"
              >
                <g.icon className="size-4 text-flare-500" />
                {g.label}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-sand-500">
            {formatUGX(TICKETS.general.price)} General • {formatUGX(TICKETS.vip.price)} VIP
            (includes an official Ecee T-shirt) — prices are per person.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

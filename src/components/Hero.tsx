import { motion, type Variants } from "framer-motion";
import { ArrowDown, Crown, Shirt, Ticket } from "lucide-react";
import { EVENT, TICKETS, formatUGX, type TicketType } from "../lib/event";
import { OnlineOnlyNotice } from "./OnlineOnlyNotice";
import { StreamLinks } from "./StreamLinks";
import { CountdownTimer } from "./CountdownTimer";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero({ onBuy }: { onBuy: (type: TicketType) => void }) {
  return (
    <section
      id="top"
      className="noise relative isolate flex min-h-svh flex-col overflow-hidden bg-[#030403]"
    >
      {/* Cover portrait — black backdrop, figure on the right, face clear of the text */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.img
          src="/images/ecee-cover.svg"
          alt=""
          fetchPriority="high"
          className="hero-env-cover hero-env-drift"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.04 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* soft army-green grade to marry it to the theme */}
        <div className="hero-art-grade absolute inset-0" />
        {/* fade into text: heavy left scrim, bottom melt, top shade for navbar */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030403] via-[#030403]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030403] via-[#030403]/20 to-[#030403]/65" />
        <div className="tactical-grid absolute inset-0 opacity-30" />
        <div className="camo-soft absolute inset-x-0 bottom-0 h-1/2 opacity-25" />
      </div>

      {/* military furniture: reticle frame, edge code, stamps, figure plate */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <span className="absolute left-6 top-28 h-24 w-px bg-gradient-to-b from-transparent via-camo-500/70 to-transparent" />
        <span className="absolute left-6 top-28 size-1.5 -translate-x-[3px] rounded-full bg-flare-500" />
        <span className="absolute left-[46px] top-[152px] font-mono text-[10px] tracking-[0.42em] text-camo-400/80 uppercase [writing-mode:vertical-rl]">
          Op. Take Over // Kitgum // UG
        </span>
        <span className="absolute bottom-28 right-[14%] rotate-[-9deg] border-2 border-flare-500/50 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.4em] text-flare-400/90 uppercase shadow-[inset_0_0_0_1px_rgba(var(--army-accent-rgb),0.18)]">
          Classified
        </span>
        <span className="absolute bottom-28 right-[34%] hidden items-center gap-2 xl:flex">
          <span className="size-2 rounded-full bg-camo-400" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-camo-300/80 uppercase">
            Fig. 01 — Ecee / Headline Commandant
          </span>
        </span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:min-h-[760px] lg:pb-24 lg:pt-28 xl:min-h-[min(900px,100svh)]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-[660px] drop-shadow-[0_2px_24px_rgba(3,4,3,0.92)] lg:max-w-[620px] xl:max-w-[680px]"
        >
          <motion.p
            variants={item}
            className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-camo-200 uppercase sm:text-xs"
          >
            <span className="h-px w-8 bg-flare-500" />
            Kitgum, Uganda / 30.12.26
            <span className="stamp-green rounded px-2.5 py-1 text-[9px] tracking-[0.34em]">
              100 Seats
            </span>
          </motion.p>

          <motion.h1 variants={item} className="mt-5 font-display uppercase text-sand-50">
            <span className="block text-[clamp(5.75rem,15vw,10rem)] leading-[0.85] tracking-[-0.015em] text-flare-500 lg:text-[clamp(7.5rem,12.5vw,12rem)]">
              ECEE<span className="text-sand-50">.</span>
            </span>
            <span className="mt-5 block text-[clamp(2.35rem,8vw,4.5rem)] leading-[0.96] tracking-[0.01em] lg:text-[clamp(3.5rem,5.3vw,5.6rem)]">
              The Militant
              <br />
              <span className="text-outline">Take Over</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 font-mono text-[11px] tracking-[0.28em] text-flare-400 uppercase sm:text-xs"
          >
            House Party / One Night Only
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-[500px] text-sm leading-relaxed text-sand-200 sm:text-base"
          >
            An intimate night of games, music, fashion and live performance. Join {EVENT.artist}{" "}
            at {EVENT.venue}, Kitgum, on 30 December 2026 — only {EVENT.capacity} spots.
          </motion.p>

          {/* DATE COUNTDOWN — Tactical Mission Clock to 30.12.2026 */}
          <motion.div variants={item} className="mt-7 max-w-[540px]">
            <CountdownTimer variant="hero" />
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5"
          >
            <button
              type="button"
              onClick={() => onBuy("general")}
              className="flare-btn group inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 font-mono text-xs font-bold tracking-[0.11em] text-ink-950 uppercase transition-transform duration-300 hover:scale-[1.04] active:scale-95 sm:w-auto sm:text-sm"
            >
              <Ticket
                className="size-5 transition-transform duration-300 group-hover:-rotate-12"
                strokeWidth={2.4}
              />
              Buy Your Ticket Now
            </button>
            <a
              href="#party"
              className="group inline-flex items-center gap-2 px-1 py-3 font-mono text-xs tracking-[0.12em] text-sand-200 uppercase transition-colors hover:text-flare-400 sm:text-sm"
            >
              Explore the party
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </motion.div>

          {/* Price chips — jump straight into checkout with the right ticket */}
          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onBuy("general")}
              className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-camo-400/60"
              aria-label={`Buy General ticket, ${formatUGX(TICKETS.general.price)}`}
            >
              <span className="font-mono text-[10px] tracking-[0.22em] text-camo-300 uppercase">
                General
              </span>
              <span className="font-mono text-xs font-bold text-sand-50">
                {formatUGX(TICKETS.general.price)}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onBuy("vip")}
              className="inline-flex items-center gap-2.5 rounded-full border border-flare-500/45 bg-flare-500/10 px-4 py-2.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-flare-500/80 hover:bg-flare-500/15"
              aria-label={`Buy VIP ticket, ${formatUGX(TICKETS.vip.price)}, includes an Ecee T-shirt`}
            >
              <Crown className="size-3.5 text-flare-400" />
              <span className="font-mono text-[10px] tracking-[0.22em] text-flare-300 uppercase">
                VIP
              </span>
              <span className="font-mono text-xs font-bold text-sand-50">
                {formatUGX(TICKETS.vip.price)}
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] tracking-[0.1em] text-camo-200 uppercase">
                <Shirt className="size-3" />+ Tee
              </span>
            </button>
          </motion.div>

          <motion.div variants={item}>
            <OnlineOnlyNotice variant="inline" className="mt-5" />
          </motion.div>

          <motion.div variants={item} className="mt-6">
            <StreamLinks variant="icons" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

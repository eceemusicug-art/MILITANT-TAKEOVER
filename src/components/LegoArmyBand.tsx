import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { TICKETS } from "../lib/event";

/** Full-width Lego army squadron band on the landing page. */
export function LegoArmyBand() {
  return (
    <section
      aria-label="Lego army squadron"
      className="noise relative overflow-hidden border-y border-camo-700/40 bg-[#030403]"
    >
      <div className="hazard-camo h-2 w-full opacity-80" aria-hidden="true" />

      <motion.img
        src="/images/lego-army.svg"
        alt="Squadron of African frontline commanders in military camo gear, braided hair and combat helmets deployed in formation"
        loading="lazy"
        className="h-[clamp(280px,42vw,520px)] w-full object-cover object-[center_30%]"
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030403] via-[#030403]/25 to-[#030403]/45" />
      <div className="tactical-grid pointer-events-none absolute inset-0 opacity-30" />

      {/* Overlay caption */}
      <div className="pointer-events-none absolute inset-0 flex items-end">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 pb-10 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-14">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-camo-200 uppercase sm:text-xs">
              <span className="h-px w-8 bg-flare-500" />
              The Frontline // Assembled
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.95] text-sand-50">
              100 Seats. <span className="text-flare-500">One Unit.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-xs font-mono text-[10px] leading-relaxed tracking-[0.2em] text-sand-300 uppercase sm:text-right sm:text-[11px]">
              {TICKETS.general.claimed} of {TICKETS.general.capacity} general passes ·{" "}
              {TICKETS.vip.claimed} of {TICKETS.vip.capacity} VIP claimed
            </p>
          </Reveal>
        </div>
      </div>

      <div className="hazard-camo h-2 w-full opacity-80" aria-hidden="true" />
    </section>
  );
}

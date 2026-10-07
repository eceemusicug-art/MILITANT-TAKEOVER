import { Crown, Mic, ShieldCheck, Speaker } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const FEATURES = [
  {
    icon: Mic,
    title: "Ecee Live & Direct",
    copy: "The headline commandant touches the stage at 9 PM sharp. Every hit, every anthem — one full-militancy set you will never forget.",
    tag: "HEADLINE SET",
  },
  {
    icon: Crown,
    title: "The VIP War Room",
    copy: "A private lounge with dedicated bar, bottle service and the best sight-line in the compound — plus an official Ecee T-shirt to rep the takeover.",
    tag: "VIP ONLY",
    vipOnly: true,
  },
  {
    icon: Speaker,
    title: "Sound Barracks",
    copy: "A tour-grade sound system and a full laser-and-lights arsenal shipped in for one night. Feel the bass in your chest — that's the point.",
    tag: "PRODUCTION",
  },
  {
    icon: ShieldCheck,
    title: "Fortified Grounds",
    copy: "K Home Apartments turns into a secured fortress — professional security, medical team on site and lit, guarded parking all night.",
    tag: "SAFETY",
  },
];

export function Features() {
  return (
    <section id="party" className="army-fill noise relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="The Arsenal"
          title={
            <>
              Built For <span className="text-flare-500">One Night</span>
              <br />
              Of Total Domination
            </>
          }
          copy="Everything is engineered for maximum impact — the sound, the lights, the venue, the energy. This is not a party. It's an operation."
        />

        <div className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1} className="h-full">
              <article className="glass card-lift reticle reticle-green group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 hover:border-flare-500/40 hover:shadow-[0_20px_60px_-20px_rgba(var(--army-accent-rgb),0.25)]">
                <div className="camo-soft absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="dot-matrix absolute inset-0 opacity-30" />
                <div className="relative flex items-start justify-between">
                  <span className="grid size-13 place-items-center rounded-xl border border-camo-600/60 bg-camo-800/70 text-camo-300 transition-all duration-500 group-hover:border-flare-500/50 group-hover:text-flare-400 group-hover:shadow-[0_0_24px_-6px_rgba(var(--army-accent-rgb),0.5)]">
                    <f.icon className="size-6" strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-4xl text-white/8 transition-colors duration-500 group-hover:text-flare-500/25">
                    0{i + 1}
                  </span>
                </div>
                <p className="relative mt-7 font-mono text-[9px] tracking-[0.3em] text-flare-500/90">
                  {f.tag}
                </p>
                <h3 className="relative mt-2.5 font-display text-2xl uppercase leading-tight text-sand-50">
                  {f.title}
                </h3>
                <p className="relative mt-3.5 flex-1 text-sm leading-relaxed text-sand-400">{f.copy}</p>
                <span className="relative mt-6 block h-px w-full bg-gradient-to-r from-camo-600/70 via-white/10 to-transparent" />
                <span className="relative mt-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-camo-300 transition-colors duration-300 group-hover:text-sand-200">
                  <span className="size-1 rounded-full bg-flare-500" />
                  {"vipOnly" in f && f.vipOnly ? "VIP PASS ONLY — INCLUDES ECEE TEE" : "INCLUDED WITH EVERY TICKET"}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

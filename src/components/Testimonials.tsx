import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "I've partied in Kampala and Gulu, but nothing touched Ecee's last Kitgum show. The energy? Insane. My whole crew is reporting for duty again — in full camo.",
    name: "Brenda A.",
    meta: "Gulu • Last edition",
    initials: "BA",
    file: "REPORT 01",
  },
  {
    quote:
      "VIP was worth every shilling. Express entry, the War Room lounge, meeting Ecee after the set — for one night, we felt like commanders.",
    name: "Okot M.",
    meta: "Kitgum • VIP, last edition",
    initials: "OM",
    file: "REPORT 02",
  },
  {
    quote:
      "From the first beat to the last, the sound and lights were next level. 30th December is marked in ink. No retreat, no surrender.",
    name: "Sharon K.",
    meta: "Kampala • Last edition",
    initials: "SK",
    file: "REPORT 03",
  },
];

export function Testimonials() {
  return (
    <section className="army-fill relative py-20 sm:py-28" aria-label="Testimonials">
      <div
        className="pointer-events-none absolute left-[-12%] top-1/3 size-[30rem] rounded-full bg-flare-600/8 blur-[120px]"
        aria-hidden="true"
      />
      <div className="tactical-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Field Reports"
          title={
            <>
              Words From <span className="text-outline-camo">The Frontline</span>
            </>
          }
          copy="Survivors of the last edition report back. The verdict is unanimous — you had to be there."
        />

        <div className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12} className="h-full">
              <figure className="glass card-lift reticle reticle-green flex h-full flex-col rounded-2xl p-7 hover:border-camo-400/50">
                <div className="flex items-center justify-between">
                  <Quote className="size-8 fill-flare-500/20 text-flare-500" />
                  <span className="stamp-green rounded px-2.5 py-1 text-[9px] tracking-[0.34em]">
                    {t.file}
                  </span>
                </div>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-sand-200">
                  "{t.quote}"
                </blockquote>
                <div className="mt-6 flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-flare-500 text-flare-500" />
                  ))}
                </div>
                <figcaption className="mt-4 flex items-center gap-4 border-t border-white/10 pt-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-camo-500/60 bg-camo-800/80 font-display text-sm text-camo-200">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-sand-50">{t.name}</p>
                    <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-camo-300 uppercase">
                      {t.meta}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const STATS = [
  { value: 10, suffix: "", label: "SPOTS CLAIMED OF 100", code: "SECTOR A" },
  { value: 100, suffix: "", label: "TOTAL INTIMATE CAPACITY", code: "SECTOR B" },
  { value: 8, suffix: "HRS", label: "NONSTOP MUSIC & MAYHEM", code: "SECTOR C" },
  { value: 4.9, suffix: "/5", label: "RATED — LAST EDITION", code: "SECTOR D", decimals: 1 },
];

const PRESS = ["KITGUM FM 104.3", "NORTHERN BUZZ", "GULU NIGHTLIFE", "ACHOLI VIBES MAG", "PA MONI TV"];

export function SocialProof() {
  return (
    <section className="relative py-16 sm:py-24" aria-label="Event statistics">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.32em] text-camo-300 uppercase">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-flare-500 animate-pulse-dot" />
              Operation status: active
            </span>
            <span className="stencil text-sand-300">Militant Take Over // Field Intel</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="group relative overflow-hidden bg-ink-900/90 p-6 text-center transition-colors duration-500 hover:bg-ink-800 sm:p-10"
              >
                <div className="camo-soft absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="dot-matrix absolute inset-0 opacity-40" />
                <span className="absolute left-4 top-4 font-mono text-[10px] text-camo-600 transition-colors group-hover:text-flare-500">
                  {s.code}
                </span>
                <p className="relative font-display text-4xl tabular-nums text-sand-50 sm:text-5xl lg:text-6xl">
                  <CountUp to={s.value} decimals={s.decimals ?? 0} />
                  <span className="text-flare-500">{s.suffix}</span>
                </p>
                <p className="relative mt-3 font-mono text-[10px] tracking-[0.22em] text-camo-300 sm:text-[11px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center gap-5 sm:mt-16">
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.34em] text-sand-500 uppercase">
              Amplified by
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {PRESS.map((p) => (
                <span
                  key={p}
                  className="font-mono text-xs tracking-[0.18em] text-sand-400/70 transition-colors duration-300 hover:text-sand-200 sm:text-sm"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

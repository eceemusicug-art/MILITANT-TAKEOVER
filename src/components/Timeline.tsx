import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

const RUNDOWN = [
  {
    time: "18:00",
    title: "Gates Open — Deployment",
    copy: "The house party starts at K Home Apartments. Ticket holders only — no tickets sold at the gate. SMS code check, ID check, first drinks ice-cold. Arrive early, beat the line.",
    tag: "6 PM — GATES",
  },
  {
    time: "19:00",
    title: "DJ Set — The Warm-Up",
    copy: "One full hour of back-to-back mixes from 7 to 8 PM. Smoke, lasers and the first surge of the night on the frontline.",
    tag: "7–8 PM — DJS",
  },
  {
    time: "21:00",
    title: "Ecee Live — The Takeover Set",
    copy: "At 9 PM the headline commandant hits the stage. Every hit, every anthem, full militancy. This is the moment you came for.",
    tag: "9 PM — HEADLINE",
    highlight: true,
  },
  {
    time: "LATE",
    title: "Vibes Till Morning",
    copy: "After the set, the takeover keeps rolling — DJ sets, dancing and pure energy until the sun comes up over Kitgum.",
    tag: "TILL SUNRISE",
  },
];

export function Timeline() {
  return (
    <section id="rundown" className="noise relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading
          kicker="Night Rundown"
          title={
            <>
              The Mission <span className="text-flare-500">Timeline</span>
            </>
          }
          copy="Every operation runs on a schedule. This one runs on bass. Here's how the night unfolds."
        />

        <div className="relative mt-14 sm:mt-20">
          {/* the line */}
          <div
            className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-flare-500/70 via-camo-600/70 to-camo-700/40 sm:left-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10 sm:space-y-14">
            {RUNDOWN.map((r, i) => {
              const leftSide = i % 2 === 0;
              return (
                <li key={r.time} className="relative">
                  {/* node */}
                  <span
                    className={cn(
                      "absolute left-[19px] top-2 z-10 grid size-4 -translate-x-1/2 place-items-center sm:left-1/2",
                      r.highlight && "top-3"
                    )}
                    aria-hidden="true"
                  >
                    <span
                      className={cn(
                        "size-3.5 rotate-45 rounded-[3px] border-2",
                        r.highlight
                          ? "border-flare-500 bg-flare-500 shadow-[0_0_18px_rgba(var(--army-accent-rgb),0.8)]"
                          : "border-camo-400 bg-ink-950"
                      )}
                    />
                  </span>

                  <Reveal
                    delay={0.1}
                    className={cn(
                      "pl-14 sm:w-1/2 sm:pl-0",
                      leftSide ? "sm:pr-14 sm:text-right" : "sm:ml-auto sm:pl-14"
                    )}
                  >
                    <div
                      className={cn(
                        "glass card-lift reticle reticle-green group relative overflow-hidden rounded-2xl p-6 sm:p-7",
                        r.highlight && "border-flare-500/40 bg-flare-500/[0.06]"
                      )}
                    >
                      <div className="camo-soft absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className={cn("absolute inset-x-0 top-0 h-1 hazard", r.highlight ? "opacity-100" : "opacity-0 transition-opacity duration-500 group-hover:opacity-80")} />
                      {r.highlight && (
                        <span className="stamp absolute right-4 top-4 rotate-[-9deg] px-2.5 py-1 text-[9px] tracking-[0.34em]">
                          Priority
                        </span>
                      )}
                      <div
                        className={cn(
                          "relative flex items-center gap-3",
                          leftSide && "sm:flex-row-reverse"
                        )}
                      >
                        <span
                          className={cn(
                            "font-display text-3xl tabular-nums sm:text-4xl",
                            r.highlight ? "text-flare-500" : "text-camo-300"
                          )}
                        >
                          {r.time}
                        </span>
                        <span
                          className={cn(
                            "rounded-full border border-camo-600/60 bg-camo-900/60 px-3 py-1 font-mono text-[9px] tracking-[0.26em] text-camo-300",
                            r.highlight && "border-flare-500/50 text-flare-400"
                          )}
                        >
                          {r.tag}
                        </span>
                      </div>
                      <h3 className="relative mt-3.5 font-display text-xl uppercase tracking-wide text-sand-50 sm:text-2xl">
                        {r.title}
                      </h3>
                      <p className="relative mt-2.5 text-sm leading-relaxed text-sand-400">{r.copy}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

import { Mic2, Music4, Shirt } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Ps5Pad } from "./BrandMarks";
import { fallbackTo } from "../utils/imgFallback";
import { EVENT } from "../lib/event";

/** Local replacements if an external photo CDN is unreachable. */
const FALLBACKS: Record<string, string> = {
  Games: "/images/hero-party.jpg",
  Performance: "/images/gallery-dj.jpg",
};

interface Activity {
  name: string;
  detail: string;
  caption: string;
  img: string;
  alt: string;
  icon: "pad" | typeof Music4;
  coords: string;
  imagePosition?: string;
}

const ACTIVITIES: Activity[] = [
  {
    name: "Games",
    detail: "Party Games + PS5",
    caption: "Party-game rounds and PS5 challenges all night — take your shot and claim the bragging rights.",
    img: "https://i.pinimg.com/736x/b1/6e/01/b16e011b79d3a62fd65b336586889b9f.jpg",
    alt: "Friends gathered around a busy house-party games table with red cups",
    icon: "pad",
    coords: "ZONE A // THE ARCADE",
    imagePosition: "center 42%",
  },
  {
    name: "Music",
    detail: "Live & DJs",
    caption: "Ecee's takeover set plus DJ heat from 7 PM — money in the air, frontline never stops moving.",
    img: "/images/activity-music.jpg",
    alt: "Packed party crowd dancing as dollar bills rain down in a dark club",
    icon: Music4,
    coords: "ZONE B // MAIN FLOOR",
    imagePosition: "center 35%",
  },
  {
    name: "Fashion",
    detail: "Camo Runway",
    caption: "Fly-fit contest and streetwear runway — the best-dressed commander gets crowned.",
    img: "/images/activity-fashion.jpg",
    alt: "Four young men in black tees around a streetwear clothing rack and a pile of sneaker boxes on the grass",
    icon: Shirt,
    coords: "ZONE C // THE RUNWAY",
    imagePosition: "center 45%",
  },
  {
    name: "Performance",
    detail: "Live Stage Shows",
    caption: "Dancers, stunts and surprise acts between sets — the stage never goes dark.",
    img: "https://images.pexels.com/photos/10063141/pexels-photo-10063141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Rapper performing live on stage with a microphone under vibrant spotlights and smoke",
    icon: Mic2,
    coords: "ZONE D // THE STAGE",
  },
];

export function Activities() {
  return (
    <section className="army-fill relative py-16 sm:py-20" aria-label="Activities">
      <div
        className="pointer-events-none absolute right-[-8%] top-1/4 size-[30rem] rounded-full bg-camo-600/12 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="The Mission Brief"
          title={
            <>
              Four Ways To <span className="text-flare-500">Take Over</span>
            </>
          }
          copy="One compound. One night. Four fronts of pure energy — jump in on any of them."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2">
          {ACTIVITIES.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.09}>
              <article className="reticle group relative min-h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-ink-900 sm:min-h-[380px]">
                {/* photo */}
                <img
                  src={a.img}
                  alt={a.alt}
                  loading="lazy"
                  onError={fallbackTo(FALLBACKS[a.name] ?? "/images/hero-party.jpg")}
                  style={{ objectPosition: a.imagePosition }}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                />
                {/* overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />
                <div className="tactical-grid absolute inset-0 opacity-30" />
                <div className="camo-soft absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-80" />
                <div className="hazard absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* top row */}
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                  <span className="grid size-12 place-items-center rounded-xl border border-white/20 bg-ink-950/70 text-camo-200 backdrop-blur-md transition-all duration-500 group-hover:border-flare-500/60 group-hover:text-flare-400">
                    {a.icon === "pad" ? (
                      <Ps5Pad className="w-8" />
                    ) : (
                      <a.icon className="size-5" strokeWidth={1.8} />
                    )}
                  </span>
                  <span className="rounded-full border border-camo-500/50 bg-ink-950/70 px-3 py-1.5 font-mono text-[9px] tracking-[0.26em] text-camo-200 uppercase backdrop-blur-md">
                    0{i + 1} • Front
                  </span>
                </div>

                {/* bottom copy */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="font-mono text-[9px] tracking-[0.3em] text-flare-400/90 uppercase">
                    {a.coords}
                  </p>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-3xl uppercase leading-none text-sand-50 sm:text-4xl">
                      {a.name}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.22em] text-camo-300 uppercase">
                      {a.detail}
                    </span>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-sand-300 opacity-85 transition-opacity duration-500 group-hover:opacity-100">
                    {a.caption}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center font-mono text-[10px] tracking-[0.26em] text-camo-300 uppercase">
            {EVENT.activities.join(" · ")} — all included with your ticket
          </p>
        </Reveal>
      </div>
    </section>
  );
}

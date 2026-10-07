import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { EVENT } from "../lib/event";
import { cn } from "../utils/cn";
import { fallbackTo } from "../utils/imgFallback";

/** Local replacements if an external photo CDN is unreachable. */
const TILE_FALLBACKS: Record<string, string> = {
  "The VIP War Room": "/images/gallery-vip.jpg",
  "The Frontline": "/images/gallery-crowd.jpg",
};

interface Tile {
  src?: string;
  alt?: string;
  title: string;
  sub: string;
  badge: string;
  className: string;
  imgClassName?: string;
}

const TILES: Tile[] = [
  {
    src: "/images/stage-mic.svg",
    alt: "Empty concert stage with a vintage microphone on a stand under dramatic spotlights",
    title: "Ecee",
    sub: "Headline Commandant — the mic is waiting. The voice of the North, live at 9 PM.",
    badge: "HEADLINER",
    className: "md:row-span-2 min-h-[420px] md:min-h-0",
    imgClassName: "object-center",
  },
  {
    src: "/images/gallery-crowd-selfie.jpg",
    alt: "Crowd packed together laughing and taking selfies as the music peaks",
    title: "Sound Barracks",
    sub: "When the drop lands, the frontline loses it. Tour-grade decks, zero mercy.",
    badge: "LIVE MIX",
    className: "min-h-[240px]",
    imgClassName: "object-[center_28%]",
  },
  {
    src: "https://images.pexels.com/photos/18408870/pexels-photo-18408870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Green velvet VIP lounge with golden lamps and moody ambient lighting",
    title: "The VIP War Room",
    sub: "Private lounge, front-line views + your official Ecee T-shirt.",
    badge: "VIP",
    className: "min-h-[240px]",
    imgClassName: "object-[center_40%]",
  },
  {
    src: "https://images.pexels.com/photos/34766236/pexels-photo-34766236.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Friends cheering together at an outdoor nighttime music event",
    title: "The Frontline",
    sub: "Bring your crew. One rhythm. No retreat.",
    badge: "GENERAL",
    className: "h-[360px] sm:h-[420px] md:col-span-2",
    imgClassName: "object-[center_38%]",
  },
];

export function Showcase() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute right-[-10%] top-1/4 size-[34rem] rounded-full bg-camo-600/15 blur-[130px]"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Visual Intel"
          title={
            <>
              Inside The <span className="text-outline-camo">Take Over</span>
            </>
          }
          copy="Recon footage from the last edition. On 30th December, the compound gets louder, tighter and way more militant."
        />

        <div className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-2">
          {TILES.map((tile, i) => (
            <Reveal key={tile.title} delay={i * 0.09} className={cn(tile.className)}>
              <motion.figure
                whileHover="hover"
                className="group reticle reticle-green relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#030403]"
              >
                <div className="dot-matrix absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                {tile.src && (
                  <>
                    <motion.img
                      src={tile.src}
                      alt={tile.alt}
                      loading="lazy"
                      variants={{ hover: { scale: 1.07 } }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      onError={fallbackTo(TILE_FALLBACKS[tile.title] ?? "/images/gallery-crowd.jpg")}
                      className={cn("size-full object-cover", tile.imgClassName)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/25 to-transparent" />
                    <div className="absolute inset-0 bg-flare-600/0 mix-blend-multiply transition-colors duration-700 group-hover:bg-flare-600/15" />
                  </>
                )}

                <span className="absolute left-5 top-5 rounded-full border border-flare-500/50 bg-ink-950/70 px-3.5 py-1.5 font-mono text-[9px] tracking-[0.28em] text-flare-400 backdrop-blur-md">
                  {tile.badge} // FILE 0{i + 1}
                </span>

                <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="translate-y-1 font-mono text-[10px] tracking-[0.3em] text-camo-300 transition-all duration-500 group-hover:translate-y-0 group-hover:text-flare-400">
                    {EVENT.coordinates}
                  </p>
                  <h3 className="mt-2 font-display text-3xl uppercase text-sand-50 sm:text-4xl">
                    {tile.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-sand-300 opacity-80 transition-all duration-500 group-hover:opacity-100">
                    {tile.sub}
                  </p>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

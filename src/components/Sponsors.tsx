import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { FootPlugLogo, MicioLogo } from "./BrandMarks";
import { EVENT } from "../lib/event";

/** Prefer a real logo file if it exists in the project; otherwise the drawn mark. */
const MICIO_LOGO_CANDIDATES = [
  "/images/micio-logo.png",
  "/images/micio-logo.jpg",
  "/images/micio.png",
  "/images/micio.jpg",
];

const FOOTPLUG_LOGO_CANDIDATES = [
  "/images/footplug-logo.png",
  "/images/footplug-logo.jpg",
  "/images/footplug.png",
  "/images/footplug.jpg",
  "/images/foot-plug.png",
];

function useLogoSrc(candidates: string[]): string | null {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const probe = (candidate: string): Promise<string | null> =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img.naturalWidth > 0 ? candidate : null);
        img.onerror = () => resolve(null);
        img.src = candidate;
      });

    (async () => {
      for (const candidate of candidates) {
        const found = await probe(candidate);
        if (active && found) {
          setSrc(found);
          return;
        }
      }
      if (active) setSrc(null);
    })();

    return () => {
      active = false;
    };
  }, [candidates.join("|")]);

  return src;
}

export function Sponsors() {
  const micioSrc = useLogoSrc(MICIO_LOGO_CANDIDATES);
  const footplugSrc = useLogoSrc(FOOTPLUG_LOGO_CANDIDATES);

  return (
    <section className="relative py-16 sm:py-20" aria-label="Event sponsors">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="glass overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-14">
            <div className="hazard-camo absolute inset-x-0 top-0 h-1.5 opacity-90" aria-hidden="true" />
            <div className="flex flex-col items-center gap-3 pt-2 text-center">
              <p className="flex items-center gap-3 font-mono text-[10px] tracking-[0.32em] text-camo-300 uppercase sm:text-xs">
                <span className="h-px w-8 bg-flare-500/70" />
                Logistics // Powered &amp; Backed By
                <span className="h-px w-8 bg-flare-500/70" />
              </p>
              <h2 className="mt-1 font-display text-2xl uppercase tracking-wide text-sand-50 sm:text-3xl">
                The Supply Line
              </h2>
              <span className="stamp-green rounded px-3 py-1 text-[9px] tracking-[0.36em]">
                Cleared Partners
              </span>
            </div>

            <div className="dot-matrix mt-6 rounded-2xl border border-white/10 bg-white/10 sm:mt-9">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-5">
              {EVENT.sponsors.map((s, i) => {
                const isMicio = s === "MICIO";
                const isFootplug = s === "FOOTPLUG";
                const hasLogo = isMicio || isFootplug;
                return (
                  <Reveal key={s} delay={i * 0.07} className="h-full">
                    <div className="group flex h-full min-h-[7.5rem] flex-col items-center justify-center gap-3 bg-ink-900/90 px-4 text-center transition-colors duration-500 hover:bg-ink-800 sm:min-h-36">
                      <span className="font-mono text-[9px] tracking-[0.28em] text-camo-600 transition-colors duration-500 group-hover:text-flare-500/70">
                        0{i + 1}
                      </span>

                      {isMicio ? (
                        micioSrc ? (
                          <img
                            src={micioSrc}
                            alt="Micio"
                            loading="lazy"
                            className="size-14 rounded-xl object-cover shadow-[0_10px_30px_-10px_rgba(255,16,42,0.7)] transition-transform duration-500 group-hover:scale-105 sm:size-16"
                          />
                        ) : (
                          <MicioLogo className="size-14 rounded-xl shadow-[0_10px_30px_-10px_rgba(255,16,42,0.7)] transition-transform duration-500 group-hover:scale-105 sm:size-16" />
                        )
                      ) : isFootplug ? (
                        footplugSrc ? (
                          <img
                            src={footplugSrc}
                            alt="FootPlug — The Foot Plug"
                            loading="lazy"
                            className="h-14 w-20 rounded-xl bg-white object-contain p-1 shadow-[0_10px_30px_-10px_rgba(214,30,42,0.7)] transition-transform duration-500 group-hover:scale-105 sm:h-16 sm:w-24"
                          />
                        ) : (
                          <FootPlugLogo className="h-14 w-20 rounded-xl shadow-[0_10px_30px_-10px_rgba(214,30,42,0.7)] transition-transform duration-500 group-hover:scale-105 sm:h-16 sm:w-24" />
                        )
                      ) : (
                        <span className="h-16 w-full transition-opacity duration-500 group-hover:opacity-100 sm:h-20" />
                      )}

                      <span
                        className={
                          hasLogo
                            ? "font-display text-base uppercase leading-tight tracking-wide text-flare-400 sm:text-lg"
                            : "font-display text-base uppercase leading-tight tracking-wide text-sand-300 transition-colors duration-500 group-hover:text-flare-400 sm:text-lg"
                        }
                      >
                        {s}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
              </div>
            </div>

            <p className="mt-7 text-center font-mono text-[10px] tracking-[0.26em] text-camo-300 uppercase">
              Want your brand on the barricades? — WhatsApp {EVENT.whatsapp}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

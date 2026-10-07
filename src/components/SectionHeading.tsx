import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
}

export function SectionHeading({ kicker, title, copy, align = "center" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "max-w-3xl",
        centered ? "mx-auto text-center" : "text-left"
      )}
    >
      <Reveal>
        <p className="inline-flex items-center gap-2.5 font-mono text-[11px] sm:text-xs tracking-[0.3em] text-camo-300 uppercase">
          <span className="inline-block h-px w-8 bg-flare-500/80" />
          {kicker}
          {centered && <span className="inline-block h-px w-8 bg-flare-500/80" />}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display uppercase leading-[0.95] text-4xl sm:text-5xl lg:text-6xl text-sand-50">
          {title}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-sand-400">{copy}</p>
        </Reveal>
      )}
    </div>
  );
}

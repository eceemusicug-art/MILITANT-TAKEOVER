import type { SyntheticEvent } from "react";

/**
 * Swap a failed remote image for a bundled local one exactly once.
 * Keeps the page complete even when image CDNs are blocked or slow.
 */
export function fallbackTo(fallbackSrc: string) {
  return (event: SyntheticEvent<HTMLImageElement>) => {
    const el = event.currentTarget;
    if (el.dataset.fb) return;
    el.dataset.fb = "1";
    el.src = fallbackSrc;
  };
}

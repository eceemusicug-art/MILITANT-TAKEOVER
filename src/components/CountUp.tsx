import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface CountUpProps {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

/** Counts up from zero when scrolled into view. */
export function CountUp({ to, decimals = 0, duration = 2.2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = v.toLocaleString("en-UG", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

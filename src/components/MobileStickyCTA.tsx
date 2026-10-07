import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, Ticket } from "lucide-react";
import { TICKETS, formatUGX, type TicketType } from "../lib/event";

/**
 * Mobile-only sticky purchase bar. Appears after the hero so the primary
 * conversion path is always one tap away while browsing on a phone.
 */
export function MobileStickyCTA({ onBuy }: { onBuy: (type: TicketType) => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520 && window.innerWidth < 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Buy tickets"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-flare-500/40 bg-ink-950/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg sm:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[9px] tracking-[0.2em] text-camo-300 uppercase">
                General from
              </p>
              <p className="truncate font-display text-lg leading-tight text-sand-50">
                {formatUGX(TICKETS.general.price)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onBuy("general")}
              className="flare-btn inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 font-mono text-xs font-bold tracking-[0.1em] text-ink-950 uppercase active:scale-95"
            >
              <Ticket className="size-4" strokeWidth={2.4} />
              Buy now
            </button>
            <button
              type="button"
              onClick={() => onBuy("vip")}
              aria-label={`Buy VIP ticket, ${formatUGX(TICKETS.vip.price)}, includes an Ecee T-shirt`}
              className="grid size-12 shrink-0 place-items-center rounded-full border border-flare-500/50 bg-flare-500/10 text-flare-400 active:scale-95"
            >
              <Crown className="size-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

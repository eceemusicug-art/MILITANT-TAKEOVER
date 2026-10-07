import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, ShieldCheck, Ticket, X } from "lucide-react";
import { EVENT, TICKETS, formatUGX, type TicketType } from "../lib/event";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "The Party", href: "#party" },
  { label: "Experience", href: "#experience" },
  { label: "Rundown", href: "#rundown" },
  { label: "Tickets", href: "#tickets" },
  { label: "Vote", href: "#music" },
];

export function Navbar({ onBuy }: { onBuy: (type: TicketType) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "camo-soft border-b border-white/10 bg-ink-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* scroll progress */}
        {/* announcement strip */}
        <button
          type="button"
          onClick={() => onBuy("general")}
          className="flex w-full items-center justify-center gap-2 bg-flare-500 px-4 py-1.5 font-mono text-[9px] font-bold tracking-[0.16em] text-ink-950 uppercase transition-colors hover:bg-flare-400 sm:text-[10px] sm:tracking-[0.22em]"
        >
          <span className="size-1.5 shrink-0 rounded-full bg-ink-950" aria-hidden="true" />
          Online sales only · No tickets at the gate
          <span className="hidden underline underline-offset-2 sm:inline">— Buy now</span>
        </button>
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-camo-500 via-flare-500 to-flare-300"
          aria-hidden="true"
        />
        <nav className="mx-auto flex h-16 sm:h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Brand */}
          <a href="#top" className="group flex items-center gap-3" aria-label="Ecee — back to top">
            <span className="reticle reticle-green relative grid size-10 place-items-center overflow-hidden rounded-lg border border-camo-600/70 bg-camo-800/70 transition-colors group-hover:border-camo-400/70 sm:size-11">
              <span className="font-display text-xl sm:text-2xl text-flare-500">E</span>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-flare-500" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg sm:text-xl tracking-wide text-sand-50">
                ECEE
              </span>
              <span className="mt-1 block font-mono text-[9px] sm:text-[10px] tracking-[0.28em] text-camo-300">
                TAKE OVER • 30.12.26
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative font-mono text-xs tracking-[0.18em] text-sand-300 uppercase transition-colors hover:text-sand-50"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-flare-500 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onBuy("general")}
              className="flare-btn hidden items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.14em] text-ink-950 uppercase transition-all duration-300 hover:scale-[1.03] active:scale-95 sm:inline-flex"
            >
              <Ticket className="size-4" strokeWidth={2.4} />
              Get Tickets
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-sand-50 transition-colors hover:border-flare-500/50 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink-950/97 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-display text-lg tracking-wide text-sand-50">ECEE</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-sand-50"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-2">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 py-3"
                    >
                      <span className="font-mono text-xs text-flare-500">
                        0{i + 1}
                      </span>
                      <span className="font-display text-4xl uppercase text-sand-50 transition-colors group-hover:text-flare-400">
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="px-8 pb-10"
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onBuy("general");
                }}
                className="flare-btn flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-mono text-sm font-semibold tracking-[0.14em] text-ink-950 uppercase"
              >
                <Ticket className="size-4" strokeWidth={2.4} />
                Get Tickets — From {formatUGX(TICKETS.general.price)}
              </button>
              <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.2em] text-camo-300">
                <ShieldCheck className="size-3.5" />
                {EVENT.venue.toUpperCase()} • {EVENT.dateLabel.toUpperCase()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

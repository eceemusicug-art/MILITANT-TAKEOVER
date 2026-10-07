import { ArrowUp, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { EVENT, MOMO, whatsappLink } from "../lib/event";
import { StreamLinks } from "./StreamLinks";

const NAV = [
  { label: "The Party", href: "#party" },
  { label: "Experience", href: "#experience" },
  { label: "Rundown", href: "#rundown" },
  { label: "Tickets", href: "#tickets" },
  { label: "Music & Vote", href: "#music" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 bg-ink-900/50">
      <div className="hazard-camo h-2 w-full opacity-90" aria-hidden="true" />
      <div className="camo-veil pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
              <span className="relative grid size-11 place-items-center overflow-hidden rounded-lg border border-camo-600/70 bg-camo-800/70">
                <span className="font-display text-2xl text-flare-500">E</span>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-flare-500" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-xl tracking-wide text-sand-50">ECEE</span>
                <span className="mt-1 block font-mono text-[10px] tracking-[0.28em] text-camo-300">
                  TAKE OVER • 30.12.26
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand-400">
              {EVENT.name} — {EVENT.sub}. {EVENT.artist} live at {EVENT.venue}, {EVENT.city}. One
              night. No retreat.
            </p>
            <p className="mt-6 font-mono text-[10px] tracking-[0.24em] text-camo-300">
              {EVENT.coordinates}
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.3em] text-camo-600 uppercase">
              Unit File: MTO-30.12.26-KIT // Sector: Northern
            </p>
            <StreamLinks variant="icons" className="mt-7" />
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <p className="font-mono text-[10px] tracking-[0.3em] text-camo-300 uppercase">
              Navigate
            </p>
            <ul className="mt-5 space-y-3.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-sand-400 transition-colors hover:text-flare-400"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-camo-300 uppercase">
              Comms Channel
            </p>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-sand-400">
                <MapPin className="mt-0.5 size-4 shrink-0 text-flare-500" />
                {EVENT.venue}, {EVENT.city}
              </li>
              <li className="flex items-start gap-3 text-sm text-sand-400">
                <Phone className="mt-0.5 size-4 shrink-0 text-flare-500" />
                <span>
                  {MOMO.local} — MoMo payments
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-sand-400">
                <MessageSquare className="mt-0.5 size-4 shrink-0 text-flare-500" />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-flare-400"
                >
                  WhatsApp {EVENT.whatsapp} — tickets & bookings
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-sand-400">
                <Mail className="mt-0.5 size-4 shrink-0 text-flare-500" />
                <a
                  href={`mailto:${EVENT.email}`}
                  className="break-all transition-colors hover:text-flare-400"
                >
                  {EVENT.email}
                </a>
              </li>
            </ul>
            <a
              href="#top"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] text-sand-300 uppercase transition-all hover:border-flare-500/60 hover:text-flare-400"
            >
              <ArrowUp className="size-3.5" />
              Back to top
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-sand-500">
            © 2026 {EVENT.artist} — {EVENT.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] tracking-[0.22em] text-camo-300 uppercase">
            Tickets powered by <span className="text-flare-400">Mobi</span> Ticketing
          </p>
        </div>
      </div>
    </footer>
  );
}

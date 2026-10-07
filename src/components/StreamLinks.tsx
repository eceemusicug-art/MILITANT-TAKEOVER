import type { ComponentType } from "react";
import { EVENT } from "../lib/event";
import { cn } from "../utils/cn";

const ARTIST_LINKS = EVENT.artistLinks;

type IconProps = { className?: string };

function SpotifyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleMusicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
      <path fill="#050705" d="M9.6 15.6 15.8 12 9.6 8.4v7.2Z" />
    </svg>
  );
}

interface StreamLink {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
}

export const STREAM_LINKS: StreamLink[] = [
  { id: "spotify", label: "Spotify", href: ARTIST_LINKS.spotify, icon: SpotifyIcon },
  { id: "apple", label: "Apple Music", href: ARTIST_LINKS.appleMusic, icon: AppleMusicIcon },
  { id: "instagram", label: "Instagram", href: ARTIST_LINKS.instagram, icon: InstagramIcon },
  { id: "youtube", label: "YouTube", href: ARTIST_LINKS.youtube, icon: YoutubeIcon },
];

interface StreamLinksProps {
  variant?: "icons" | "chips";
  className?: string;
}

/** Ecee's streaming + social channels — pills or icon buttons. */
export function StreamLinks({ variant = "icons", className }: StreamLinksProps) {
  if (variant === "chips") {
    return (
      <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
        <span className="mr-1 font-mono text-[9px] tracking-[0.3em] text-camo-400 uppercase">
          Stream //
        </span>
        {STREAM_LINKS.map((l) => (
          <a
            key={l.id}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 font-mono text-[10px] tracking-[0.16em] text-sand-300 uppercase backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-flare-500/60 hover:text-flare-300"
          >
            <l.icon className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
            {l.label}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex gap-3", className)}>
      {STREAM_LINKS.map((l) => (
        <a
          key={l.id}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ecee on ${l.label}`}
          className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-sand-300 transition-all duration-300 hover:-translate-y-1 hover:border-flare-500/60 hover:text-flare-400"
        >
          <l.icon className="size-4.5" />
        </a>
      ))}
    </div>
  );
}

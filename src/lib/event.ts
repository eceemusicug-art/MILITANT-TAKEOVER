export type TicketType = "general" | "vip";
export type Network = "mtn" | "airtel";

export const EVENT = {
  artist: "Ecee",
  name: "The Militant Take Over",
  sub: "House Party",
  city: "Kitgum, Uganda",
  venue: "K Home Apartments",
  dateLabel: "Wed, 30 Dec 2026",
  dateISO: "2026-12-30T18:00:00+03:00",
  gates: "6:00 PM EAT",
  coordinates: "03.2797° N, 32.8769° E",
  capacity: 100,
  claimed: 10,
  vipCapacity: 20,
  vipClaimed: 2,
  whatsapp: "0784 368 199",
  /** International format (no + or leading 0) — required by wa.me links */
  whatsappIntl: "256784368199",
  email: "eceemusicug@gmail.com",
  /** Ecee's official streaming + social channels */
  artistLinks: {
    spotify: "https://open.spotify.com/artist/4Fjy32nOkX6jFJlDjSjabL",
    appleMusic: "https://music.apple.com/ug/artist/ecee/496045825",
    instagram: "https://www.instagram.com/eceeug_/",
    youtube: "https://www.youtube.com/@Eceeug",
  },
  sponsors: [
    "BUSS A WHINE",
    "L + P + P",
    "MICIO",
    "FOOTPLUG",
    "K HOME APARTMENTS",
  ],
  activities: ["Games", "Music", "Fashion", "Performance"],
};

/**
 * Permanent cover artwork — Ecee's portrait on black.
 * Same shoot as the supplied photo: big smile, fist by the temple,
 * camo puffer vest, white tee, gold chain. Face sits right of the copy.
 * Drop the exact file as `public/images/ecee-cover.*` to override it.
 */
export const ARTIST_PHOTO = {
  candidates: [
    "/images/ecee-cover.webp",
    "/images/ecee-cover.png",
    "/images/ecee-cover.jpg",
    "/images/ecee-cover.jpeg",
    "/images/ecee-cover.avif",
    "/images/ecee-cover.svg",
    "/images/hero-ecee-black.jpg",
  ],
  fallback: "/images/ecee-cover.svg",
};

/** Ecee's YouTube channel + featured videos (IDs from the official channel feed). */
export const YOUTUBE = {
  channelUrl: "https://www.youtube.com/@Eceeug",
  videos: [
    { id: "Fi30IjVFrRw", title: "Win", label: "Official Music Video", from: "From the EP Concysson" },
    { id: "hHxaE6Q-9iA", title: "Rather Be", label: "Official Lyric Video", from: "Latest single" },
  ],
};

/**
 * Songs fans can vote for. `seed` = starting vote count shown before live votes.
 * Set every seed to 0 to show only real votes.
 */
export const SETLIST_VOTE = {
  storageKey: "ecee-setlist-vote-2026",
  clientKey: "ecee-setlist-client-2026",
  songs: [
    { id: "win", title: "Win", note: "Concysson EP", seed: 0 },
    { id: "rather-be", title: "Rather Be", note: "Latest single", seed: 0 },
    { id: "more", title: "More", note: "UG Hip Hop Awards winner", seed: 0 },
    { id: "lean", title: "Lean", note: "Collab of the Year", seed: 0 },
    { id: "kitgum", title: "Kitgum", note: "Hometown anthem", seed: 0 },
    { id: "game-over", title: "Game Over", note: "Single", seed: 0 },
    { id: "broke-boyz", title: "Broke Boyz", note: "2023 single", seed: 0 },
    { id: "militia", title: "Militia", note: "Fits the takeover", seed: 0 },
  ],
};

/**
 * Live vote tracker — Google Sheet
 * https://docs.google.com/spreadsheets/d/1bmuLWDGUB8Bj1isX46eh3EomRwcaD1dI
 *
 * Results are read live from the public sheet.
 * New votes are written through the Apps Script web app bound to that sheet
 * (see scripts/vote-tracker.gs). Paste the /exec URL below after deploying.
 */
export const VOTE_SHEET = {
  id: "1bmuLWDGUB8Bj1isX46eh3EomRwcaD1dI",
  viewUrl:
    "https://docs.google.com/spreadsheets/d/1bmuLWDGUB8Bj1isX46eh3EomRwcaD1dI/edit?usp=sharing",
  /** Deployed Apps Script web app URL. Empty until the script in scripts/vote-tracker.gs is deployed. */
  appsScriptUrl: "",
};

/** Ticket sales policy — shown across the page. */
export const SALES_POLICY = {
  short: "Online sales only — no tickets at the gate",
  long: "All tickets are sold online via Mobile Money. No tickets will be sold at the gate — buy yours before the night.",
};

export interface TicketInfo {
  id: TicketType;
  rank: string;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  /** Short perk shown as a badge (e.g. merch) */
  perk?: string;
  claimed: number;
  capacity: number;
}

export const TICKETS: Record<TicketType, TicketInfo> = {
  general: {
    id: "general",
    rank: "RECRUIT",
    name: "General Pass",
    price: 25000,
    tagline: "Full access to the frontline. All the militancy, none of the frills.",
    features: [
      "Entry to the main floor & live Ecee performance",
      "DJ set from 7 PM + vibes rolling till morning",
      "Games, music, fashion & live performances",
      "Food courts & fully stocked bars on sale",
      "Secure, well-lit compound with parking",
      "Instant Mobile Money ticket — SMS code",
    ],
    claimed: 8,
    capacity: 80,
  },
  vip: {
    id: "vip",
    rank: "COMMANDER",
    name: "VIP Pass",
    price: 50000,
    tagline: "Command the night from the War Room — and take home the official Ecee tee.",
    perk: "Official Ecee T-shirt",
    features: [
      "Everything in the General Pass",
      "Official Ecee T-shirt — exclusive VIP merch, yours to keep",
      "The VIP War Room lounge — private & exclusive",
      "Priority express entry — skip the line",
      "Welcome drink on arrival",
      "Meet & greet + photo with Ecee",
      "Dedicated VIP bar, restrooms & premium sound zone",
    ],
    claimed: 2,
    capacity: 20,
  },
};

export const MOMO = {
  display: "0782 602 283",
  local: "0782 602 283",
  raw: "0782602283",
  merchant: "ECEE — MILITANT TAKE OVER",
  mtnUssd: "*165*3#",
  airtelUssd: "*185*2*1#",
};

export function refCode(type: TicketType): string {
  return type === "vip" ? "ECEE VIP" : "ECEE GEN";
}

export function formatUGX(n: number): string {
  return `UGX ${n.toLocaleString("en-UG")}`;
}

/** Builds a WhatsApp chat link to the ticket line, optionally with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${EVENT.whatsappIntl}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

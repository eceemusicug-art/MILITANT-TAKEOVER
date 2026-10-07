import { SETLIST_VOTE, VOTE_SHEET } from "./event";

export type LiveTally = Record<string, number>;

interface GvizCell {
  v?: string | number | null;
  f?: string;
}
interface GvizResponse {
  table?: {
    rows?: { c?: Array<GvizCell | null> }[];
  };
}

function jsonp<T>(src: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const name = `__ecee_cb_${Math.random().toString(36).slice(2, 10)}`;
    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("Vote tracker timed out"));
    }, 9000);

    const cleanup = () => {
      window.clearTimeout(timer);
      script.remove();
      delete (window as unknown as Record<string, unknown>)[name];
    };

    (window as unknown as Record<string, unknown>)[name] = (data: T) => {
      cleanup();
      resolve(data);
    };

    script.src = src.includes("CALLBACK")
      ? src.replace("CALLBACK", name)
      : `${src}${src.includes("?") ? "&" : "?"}callback=${name}`;
    script.onerror = () => {
      cleanup();
      reject(new Error("Vote tracker blocked"));
    };
    document.body.appendChild(script);
  });
}

function sheetTitle(id: string): string {
  const song = SETLIST_VOTE.songs.find((s) => s.id === id);
  return (song?.title ?? id).toUpperCase();
}

function idFromTitle(title: string): string | null {
  const needle = title.trim().toUpperCase();
  const hit = SETLIST_VOTE.songs.find((s) => s.title.toUpperCase() === needle);
  return hit?.id ?? null;
}

/** Pull live vote counts from the public Google Sheet dashboard. */
export async function fetchLiveTally(): Promise<LiveTally> {
  const url =
    `https://docs.google.com/spreadsheets/d/${VOTE_SHEET.id}/gviz/tq` +
    `?tqx=${encodeURIComponent("out:json;responseHandler=CALLBACK")}`;
  const data = await jsonp<GvizResponse>(url);
  const tally: LiveTally = {};
  for (const song of SETLIST_VOTE.songs) tally[song.id] = 0;

  for (const row of data.table?.rows ?? []) {
    const cells = row.c ?? [];
    const title = String(cells[1]?.v ?? "").trim();
    const id = idFromTitle(title);
    if (!id) continue;
    const votes = Number(cells[3]?.v ?? 0);
    tally[id] = Number.isFinite(votes) ? votes : 0;
  }
  return tally;
}

export interface CastVotePayload {
  songId: string;
  previousId?: string | null;
  clientId: string;
}

/** Append a vote to the Google Sheet via the Apps Script web app (JSONP, no CORS). */
export async function sendVoteToSheet(payload: CastVotePayload): Promise<boolean> {
  const endpoint = VOTE_SHEET.appsScriptUrl.trim();
  if (!endpoint) return false;

  const params = new URLSearchParams({
    song: sheetTitle(payload.songId),
    songId: payload.songId,
    previous: payload.previousId ? sheetTitle(payload.previousId) : "",
    previousId: payload.previousId ?? "",
    clientId: payload.clientId,
    source: "website",
    callback: "CALLBACK",
  });

  try {
    await jsonp(`${endpoint}?${params.toString()}`);
    return true;
  } catch {
    return false;
  }
}

export function getClientId(): string {
  try {
    const existing = localStorage.getItem(SETLIST_VOTE.clientKey);
    if (existing) return existing;
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `ecee-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(SETLIST_VOTE.clientKey, id);
    return id;
  } catch {
    return `ecee-${Date.now()}`;
  }
}

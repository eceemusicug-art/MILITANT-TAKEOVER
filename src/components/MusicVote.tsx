import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ExternalLink, Mic2, Music4, Play, Radio, Send } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { StreamLinks } from "./StreamLinks";
import { SETLIST_VOTE, VOTE_SHEET, YOUTUBE, whatsappLink } from "../lib/event";
import { cn } from "../utils/cn";
import {
  fetchLiveTally,
  getClientId,
  sendVoteToSheet,
  type LiveTally,
} from "../lib/sheets";


type Video = (typeof YOUTUBE.videos)[number];

/* ---------------- YouTube preview ---------------- */

/** Lightweight player: shows the thumbnail and only loads YouTube when tapped. */
function VideoPlayer({ video, index }: { video: Video; index: number }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`);

  useEffect(() => {
    setPlaying(false);
    setThumb(`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`);
  }, [video.id]);

  return (
    <div className="reticle reticle-green relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
          title={`Ecee — ${video.title} (${video.label})`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full"
          aria-label={`Play Ecee — ${video.title}`}
        >
          <img
            src={thumb}
            alt=""
            loading="lazy"
            onLoad={(e) => {
              // YouTube returns a 120px grey placeholder when maxres doesn't exist
              if (e.currentTarget.naturalWidth <= 120) {
                setThumb(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`);
              }
            }}
            onError={() => setThumb(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`)}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-ink-950/30" />
          <span className="absolute left-1/2 top-1/2 grid size-18 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-flare-500 text-ink-950 shadow-[0_0_0_10px_rgba(var(--army-accent-rgb),0.18)] transition-transform duration-300 group-hover:scale-110 sm:size-22">
            <Play className="ml-1 size-8 fill-ink-950 sm:size-9" />
          </span>
          <span className="absolute left-4 top-4 z-10 rounded border border-camo-500/60 bg-ink-950/70 px-2.5 py-1 font-mono text-[9px] tracking-[0.32em] text-camo-300 uppercase backdrop-blur-sm">
            Briefing // Reel {index + 1}
          </span>
          <span className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-7">
            <span className="block font-mono text-[10px] tracking-[0.28em] text-flare-400 uppercase">
              {video.label}
            </span>
            <span className="mt-1 block font-display text-3xl uppercase text-sand-50 sm:text-5xl">
              Ecee — {video.title}
            </span>
            <span className="mt-1 block text-sm text-sand-300">{video.from}</span>
          </span>
        </button>
      )}
    </div>
  );
}

/* ---------------- Setlist vote ---------------- */

function readVote(): string | null {
  try {
    return localStorage.getItem(SETLIST_VOTE.storageKey);
  } catch {
    return null;
  }
}

function SetlistVote() {
  const [selected, setSelected] = useState<string | null>(null);
  const [voted, setVoted] = useState<string | null>(null);
  const [live, setLive] = useState<LiveTally | null>(null);
  const [sending, setSending] = useState(false);
  const [logged, setLogged] = useState<boolean | null>(null);

  const refreshTally = () => {
    fetchLiveTally()
      .then(setLive)
      .catch(() => {
        /* keep last known tally */
      });
  };

  useEffect(() => {
    const saved = readVote();
    if (saved) {
      setVoted(saved);
      setSelected(saved);
    }
    refreshTally();
    const id = window.setInterval(refreshTally, 20000);
    return () => window.clearInterval(id);
  }, []);

  const tally = useMemo(() => {
    const counts = SETLIST_VOTE.songs.map((s) => live?.[s.id] ?? s.seed);
    const total = counts.reduce((a, b) => a + b, 0);
    return SETLIST_VOTE.songs.map((s, i) => ({
      ...s,
      count: counts[i],
      pct: total ? Math.round((counts[i] / total) * 100) : 0,
    }));
  }, [live]);

  const totalVotes = tally.reduce((sum, s) => sum + s.count, 0);
  const leading = [...tally].sort((a, b) => b.count - a.count)[0];
  const showTally = live !== null;
  const votedSong = SETLIST_VOTE.songs.find((s) => s.id === voted);

  const castVote = async () => {
    if (!selected || sending) return;
    const previous = voted && voted !== selected ? voted : null;
    setVoted(selected);
    setSending(true);
    try {
      localStorage.setItem(SETLIST_VOTE.storageKey, selected);
    } catch {
      /* storage unavailable — vote still shown for this visit */
    }
    const ok = await sendVoteToSheet({
      songId: selected,
      previousId: previous,
      clientId: getClientId(),
    });
    setLogged(ok);
    setSending(false);
    window.setTimeout(refreshTally, 1400);
  };

  return (
    <div className="glass camo-soft reticle reticle-green relative overflow-hidden rounded-3xl p-6 sm:p-9">
      <div className="dot-matrix absolute inset-0 opacity-30" aria-hidden="true" />
      <span className="stamp absolute right-5 top-5 hidden rotate-[-9deg] px-2.5 py-1 text-[9px] tracking-[0.34em] sm:inline-block">
        Live Vote
      </span>
      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-flare-400 uppercase">
            <Mic2 className="size-3.5" />
            Fan Vote — The Setlist
          </p>
          <h3 className="mt-2 font-display text-3xl uppercase leading-tight text-sand-50 sm:text-4xl">
            What Should Ecee Perform?
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-sand-400">
            Pick the one song you need to hear live on 30 December. Every vote is logged to HQ's
            Google Sheet so the setlist is decided in the open.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-camo-500/50 bg-camo-900/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-camo-200 uppercase">
              <Radio className="size-3 text-flare-400" />
              {showTally ? `${totalVotes} live votes` : "Linking HQ sheet…"}
            </span>
            {showTally && totalVotes > 0 && leading && (
              <span className="inline-flex items-center gap-2 rounded-full border border-flare-500/40 bg-flare-500/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-flare-300 uppercase">
                Leading: {leading.title} · {leading.pct}%
              </span>
            )}
            <a
              href={VOTE_SHEET.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-sand-400 uppercase transition-colors hover:text-flare-400"
            >
              Open live tracker
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label="Choose a song for Ecee to perform"
        className="relative mt-7 grid gap-3 sm:grid-cols-2"
      >
        {tally.map((song, i) => {
          const isSelected = selected === song.id;
          const isVoted = voted === song.id;
          return (
            <button
              key={song.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelected(song.id)}
              className={cn(
                "group relative overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-all duration-300",
                isSelected
                  ? "border-flare-500/70 bg-flare-500/10 shadow-[0_0_30px_-12px_rgba(var(--army-accent-rgb),0.6)]"
                  : "border-white/10 bg-white/[0.03] hover:border-camo-400/50 hover:bg-white/[0.05]"
              )}
            >
              {/* result bar */}
              {showTally && (
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${song.pct}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                  className={cn(
                    "absolute inset-y-0 left-0",
                    isVoted ? "bg-flare-500/20" : "bg-camo-600/20"
                  )}
                  aria-hidden="true"
                />
              )}
              <span className="relative flex items-center gap-3.5">
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg border font-mono text-[11px] transition-colors",
                    isSelected
                      ? "border-flare-500 bg-flare-500 text-ink-950"
                      : "border-camo-600/60 bg-camo-800/60 text-camo-200"
                  )}
                >
                  {isSelected ? <Check className="size-4" strokeWidth={3} /> : `0${i + 1}`}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-lg uppercase tracking-wide text-sand-50">
                    {song.title}
                  </span>
                  <span className="block truncate font-mono text-[10px] tracking-[0.14em] text-camo-300 uppercase">
                    {song.note}
                  </span>
                </span>
                {showTally && (
                  <span className="font-mono text-sm font-bold tabular-nums text-sand-50">
                    {song.count}
                    <span className="ml-1 text-[10px] font-normal text-camo-300">{song.pct}%</span>
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <AnimatePresence mode="wait">
          {votedSong && voted === selected ? (
            <motion.p
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 text-sm text-sand-200"
            >
              <span className="grid size-6 place-items-center rounded-full bg-camo-500/40">
                <Check className="size-3.5 text-camo-100" strokeWidth={3} />
              </span>
              Your vote: <span className="font-semibold text-flare-400">{votedSong.title}</span>
              {logged === true && (
                <span className="font-mono text-[10px] tracking-[0.14em] text-camo-300 uppercase">
                  · logged to HQ sheet
                </span>
              )}
            </motion.p>
          ) : (
            <motion.p
              key="todo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-sm text-sand-400"
            >
              {selected ? "Lock it in 👇" : "Tap a song to choose it."}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={castVote}
            disabled={!selected || voted === selected || sending}
            className="flare-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-mono text-xs font-bold tracking-[0.12em] text-ink-950 uppercase transition-transform duration-300 enabled:hover:scale-[1.03] enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            <Music4 className="size-4" />
            {sending
              ? "Sending to HQ…"
              : voted && voted !== selected
                ? "Change My Vote"
                : "Cast My Vote"}
          </button>
          {votedSong && (
            <a
              href={whatsappLink(
                `🎤 Setlist vote for The Militant Take Over: I want Ecee to perform "${votedSong.title}"!`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-camo-400/50 bg-camo-800/50 px-6 py-3.5 font-mono text-xs tracking-[0.12em] text-sand-50 uppercase transition-colors hover:border-flare-500/60 hover:text-flare-300"
            >
              <Send className="size-4" />
              Send Vote on WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */

export function MusicVote() {
  const [active, setActive] = useState(0);
  const video = YOUTUBE.videos[active];

  return (
    <section id="music" className="noise relative scroll-mt-24 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-24 size-[38rem] -translate-x-1/2 rounded-full bg-flare-600/8 blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading
          kicker="Press Play"
          title={
            <>
              Hear The <span className="text-flare-500">Commander</span>
            </>
          }
          copy="Get warmed up for the takeover. Watch Ecee's latest videos, then vote for the song you want him to perform live."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 sm:mt-16">
            <VideoPlayer video={video} index={active} />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a video">
                {YOUTUBE.videos.map((v, i) => (
                  <button
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className={cn(
                      "rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-all duration-300",
                      active === i
                        ? "border-flare-500/70 bg-flare-500/15 text-sand-50"
                        : "border-white/10 bg-white/[0.03] text-sand-300 hover:border-camo-400/50"
                    )}
                  >
                    {v.title} <span className="text-camo-300">· {v.label}</span>
                  </button>
                ))}
              </div>
              <StreamLinks variant="chips" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 sm:mt-14">
            <SetlistVote />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

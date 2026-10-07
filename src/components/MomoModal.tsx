import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  BadgeCheck,
  Check,
  Copy,
  MessageCircle,
  Phone,
  ShieldCheck,
  Shirt,
  Smartphone,
  Ticket,
  X,
  Zap,
} from "lucide-react";
import {
  EVENT,
  MOMO,
  TICKETS,
  formatUGX,
  refCode,
  whatsappLink,
  type Network,
  type TicketType,
} from "../lib/event";
import { cn } from "../utils/cn";
import { OnlineOnlyNotice } from "./OnlineOnlyNotice";

const SCRAMBLE = "0123456789ABCDEFGHJKMNPQRSTUVWXYZ";

const NETWORKS: { id: Network; label: string; dot: string }[] = [
  { id: "mtn", label: "MTN MoMo", dot: "#FFCC00" },
  { id: "airtel", label: "Airtel Money", dot: "#E40000" },
];

const stepsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const stepItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

interface MomoModalProps {
  open: boolean;
  type: TicketType;
  onClose: () => void;
}

export function MomoModal({ open, type, onClose }: MomoModalProps) {
  const [ticket, setTicket] = useState<TicketType>(type);
  const [network, setNetwork] = useState<Network>("mtn");
  const [copied, setCopied] = useState(false);
  const [scrambled, setScrambled] = useState(MOMO.display);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Sync ticket type whenever the modal is opened
  useEffect(() => {
    if (open) {
      setTicket(type);
      setCopied(false);
    }
  }, [open, type]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Decode animation for the number
  useEffect(() => {
    if (!open) return;
    const target = MOMO.display;
    let frame = 0;
    const totalFrames = 22;
    const id = setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / totalFrames) * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (target[i] === " ") out += " ";
        else if (i < revealed) out += target[i];
        else out += SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
      }
      setScrambled(out);
      if (frame >= totalFrames) {
        setScrambled(target);
        clearInterval(id);
      }
    }, 38);
    return () => clearInterval(id);
  }, [open]);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(MOMO.raw);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = MOMO.raw;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const t = TICKETS[ticket];
  const networkLabel = network === "mtn" ? "MTN MoMo" : "Airtel Money";

  const dialSteps =
    network === "mtn"
      ? [
          `Dial ${MOMO.mtnUssd} on your MTN line`,
          'Choose "Send Money", then enter the number above',
          `Enter exactly ${formatUGX(t.price)}`,
          `Use reference "${refCode(ticket)}" and confirm with your PIN`,
        ]
      : [
          `Dial ${MOMO.airtelUssd} on your Airtel line`,
          'Choose "Send Money", then enter the number above',
          `Enter exactly ${formatUGX(t.price)}`,
          `Use reference "${refCode(ticket)}" and confirm with your PIN`,
        ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink-950/85 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Buy your ticket with Mobile Money"
            className="relative max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-white/12 bg-ink-900/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:rounded-3xl"
          >
            {/* camo top stripe */}
            <div
              className="h-1.5 w-full bg-cover bg-center"
              style={{ backgroundImage: "url(/images/camo-texture.jpg)" }}
              aria-hidden="true"
            />
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-flare-500 uppercase">
                  <Smartphone className="size-3.5" />
                  Mobi Pay — Secure Checkout
                </p>
                <h3 className="mt-2 font-display text-2xl uppercase text-sand-50 sm:text-3xl">
                  Reveal Payment Number
                </h3>
                <OnlineOnlyNotice variant="inline" className="mt-2.5" />
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-sand-300 transition-all hover:border-flare-500/50 hover:text-sand-50"
                aria-label="Close checkout"
              >
                <X className="size-5" />
              </button>
            </div>

            <motion.div
              variants={stepsContainer}
              initial="hidden"
              animate="show"
              className="space-y-7 px-6 py-7 sm:px-8"
            >
              {/* STEP 01 — ticket */}
              <motion.section variants={stepItem}>
                <p className="font-mono text-[10px] tracking-[0.28em] text-camo-300 uppercase">
                  <span className="text-flare-500">01 /</span> Select your ticket
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {(Object.keys(TICKETS) as TicketType[]).map((id) => {
                    const tk = TICKETS[id];
                    const active = ticket === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setTicket(id)}
                        aria-pressed={active}
                        className={cn(
                          "group rounded-xl border p-4 text-left transition-all duration-300",
                          active
                            ? "border-flare-500/70 bg-flare-500/10 shadow-[0_0_30px_-10px_rgba(var(--army-accent-rgb),0.5)]"
                            : "border-white/10 bg-white/[0.03] hover:border-camo-400/50"
                        )}
                      >
                        <span className="flex items-center justify-between">
                          <span className="font-mono text-[9px] tracking-[0.24em] text-camo-300">
                            {tk.rank}
                          </span>
                          <Ticket
                            className={cn(
                              "size-4 transition-colors",
                              active ? "text-flare-400" : "text-sand-500"
                            )}
                          />
                        </span>
                        <span className="mt-2 block font-display text-lg uppercase text-sand-50">
                          {tk.name}
                        </span>
                        <span className="mt-1 block font-mono text-sm font-bold text-flare-400">
                          {formatUGX(tk.price)}
                        </span>
                        {tk.perk && (
                          <span className="mt-2 flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-camo-200 uppercase">
                            <Shirt className="size-3 shrink-0 text-flare-400" />+ Ecee T-shirt
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.section>

              {/* STEP 02 — network */}
              <motion.section variants={stepItem}>
                <p className="font-mono text-[10px] tracking-[0.28em] text-camo-300 uppercase">
                  <span className="text-flare-500">02 /</span> Choose your network
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {NETWORKS.map((n) => {
                    const active = network === n.id;
                    return (
                      <button
                        key={n.id}
                        onClick={() => setNetwork(n.id)}
                        aria-pressed={active}
                        className={cn(
                          "flex items-center justify-center gap-2.5 rounded-xl border px-4 py-3.5 font-mono text-xs tracking-[0.12em] transition-all duration-300",
                          active
                            ? "border-flare-500/70 bg-flare-500/10 text-sand-50"
                            : "border-white/10 bg-white/[0.03] text-sand-300 hover:border-camo-400/50"
                        )}
                      >
                        <span
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: n.dot }}
                          aria-hidden="true"
                        />
                        {n.label}
                        {active && <Check className="size-4 text-flare-400" />}
                      </button>
                    );
                  })}
                </div>
              </motion.section>

              {/* STEP 03 — the number */}
              <motion.section
                variants={stepItem}
                className="overflow-hidden rounded-2xl border border-flare-500/30 bg-gradient-to-b from-flare-500/[0.08] to-transparent"
              >
                <div className="p-5 sm:p-6">
                <p className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.28em] text-camo-300 uppercase">
                  <span>
                    <span className="text-flare-500">03 /</span> Send payment via {networkLabel}
                  </span>
                  <span className="stamp-green rounded px-2 py-0.5 text-[9px] tracking-[0.34em]">
                    Authorised Line
                  </span>
                </p>
                  <p className="mt-3 text-sm text-sand-300">
                    Send exactly{" "}
                    <span className="font-bold text-sand-50">{formatUGX(t.price)}</span> to:
                  </p>

                  <button
                    onClick={copyNumber}
                    className="group mt-4 flex w-full items-center justify-between gap-3 rounded-xl border-2 border-dashed border-flare-500/50 bg-ink-950/80 px-5 py-4 transition-all duration-300 hover:border-flare-500/80 hover:shadow-[0_0_36px_-8px_rgba(var(--army-accent-rgb),0.55)]"
                    aria-label={`Copy phone number ${MOMO.display}`}
                  >
                    <span className="flex items-center gap-3 font-mono text-xl font-bold tracking-wider text-sand-50 sm:text-2xl">
                      <Phone className="size-5 shrink-0 text-flare-400" />
                      {scrambled}
                    </span>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-all",
                        copied
                          ? "bg-camo-500/30 text-camo-200"
                          : "bg-flare-500 text-ink-950 group-hover:bg-flare-400"
                      )}
                    >
                      {copied ? (
                        <>
                          <Check className="size-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" /> Copy
                        </>
                      )}
                    </span>
                  </button>

                  <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.14em] text-camo-300">
                    <span>
                      REF: <span className="text-flare-400">{refCode(ticket)}</span>
                    </span>
                    <span>
                      MERCHANT: <span className="text-sand-300">{MOMO.merchant}</span>
                    </span>
                    <span>
                      TXN: <span className="text-sand-300">MTO-301226-KIT</span>
                    </span>
                  </p>

                  {/* Close the loop: buyer confirms payment so HQ can release the ticket code */}
                  <a
                    href={whatsappLink(
                      `PAYMENT SENT ✅\nTicket: ${t.name}\nAmount: ${formatUGX(t.price)}\nNetwork: ${networkLabel}\nPaid to: ${MOMO.display}\nRef: ${refCode(ticket)}\nMy name: ___\nMy phone: ___`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flare-btn mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 font-mono text-[11px] font-bold tracking-[0.1em] text-ink-950 uppercase transition-transform duration-300 hover:scale-[1.01]"
                  >
                    <MessageCircle className="size-4" />
                    I've sent the money — confirm my ticket
                  </a>
                  <p className="mt-2 text-center text-[11px] leading-relaxed text-sand-400">
                    Your confirmation goes straight to the ticket line so your ticket code gets
                    released fast.
                  </p>
                </div>

                {/* dial steps */}
                <div className="border-t border-flare-500/20 bg-ink-950/50 px-5 py-5 sm:px-6">
                  <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-camo-300 uppercase">
                    <Zap className="size-3.5 text-flare-500" />
                    On your phone — {networkLabel}
                  </p>
                  <ol className="mt-3 space-y-2.5">
                    {dialSteps.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-sand-300">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-camo-500/60 bg-camo-800/70 font-mono text-[9px] text-camo-200">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-4 flex items-start gap-2 rounded-lg border border-camo-600/40 bg-camo-900/40 px-3.5 py-3 text-xs leading-relaxed text-camo-200">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-flare-400" />
                    Your ticket code arrives by SMS within minutes. Show it at the entrance — no
                    printing, no hassle. Tickets are not sold at the gate.
                  </p>
                  {ticket === "vip" && (
                    <div className="mt-3 flex items-start gap-3 rounded-lg border border-flare-500/35 bg-flare-500/[0.07] px-3.5 py-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-flare-500 text-ink-950">
                        <Shirt className="size-4" strokeWidth={2.2} />
                      </span>
                      <p className="text-xs leading-relaxed text-sand-200">
                        <span className="font-semibold text-sand-50">
                          Your VIP pass includes an official Ecee T-shirt.
                        </span>{" "}
                        After paying, WhatsApp your name and T-shirt size (S, M, L, XL or XXL).
                        Pick up your tee at the VIP desk on the night.
                      </p>
                    </div>
                  )}
                  <a
                    href={
                      ticket === "vip"
                        ? whatsappLink(
                            `Hi Ecee team! I've paid ${formatUGX(TICKETS.vip.price)} for a VIP ticket (ref: ${refCode("vip")}). Name: ___ . T-shirt size (S/M/L/XL/XXL): ___`
                          )
                        : whatsappLink(
                            `Hi Ecee team! I need help with my ${formatUGX(TICKETS.general.price)} General ticket for The Militant Take Over.`
                          )
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-camo-500/50 bg-camo-800/40 px-4 py-3 text-center font-mono text-[11px] tracking-[0.12em] text-sand-200 uppercase transition-colors hover:border-flare-500/60 hover:text-flare-300"
                  >
                    <MessageCircle className="size-4 shrink-0" />
                    {ticket === "vip"
                      ? `WhatsApp your T-shirt size — ${EVENT.whatsapp}`
                      : `Need help? WhatsApp ${EVENT.whatsapp}`}
                  </a>
                </div>
              </motion.section>

              {/* security */}
              <motion.p
                variants={stepItem}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-sand-500"
              >
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-camo-400" />
                Never share your Mobile Money PIN with anyone. Mobi staff will never call or SMS
                asking for your PIN. Payments go directly to the official event merchant line.
              </motion.p>
            </motion.div>

            <div className="border-t border-white/10 px-6 py-4 sm:px-8">
              <p className="text-center font-mono text-[9px] tracking-[0.3em] text-sand-500 uppercase">
                Powered by <span className="text-camo-300">Mobi Ticketing</span> — East Africa's
                trusted mobile money checkout
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { SocialProof } from "./components/SocialProof";
import { Features } from "./components/Features";
import { Showcase } from "./components/Showcase";
import { Activities } from "./components/Activities";
import { Timeline } from "./components/Timeline";
import { Testimonials } from "./components/Testimonials";
import { Sponsors } from "./components/Sponsors";
import { Pricing } from "./components/Pricing";
import { MomoModal } from "./components/MomoModal";
import { MusicVote } from "./components/MusicVote";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { LegoArmyBand } from "./components/LegoArmyBand";
import { MobileStickyCTA } from "./components/MobileStickyCTA";
import type { TicketType } from "./lib/event";

export default function App() {
  const [momo, setMomo] = useState<{ open: boolean; type: TicketType }>({
    open: false,
    type: "general",
  });

  const openMomo = (type: TicketType = "general") => setMomo({ open: true, type });
  const closeMomo = () => setMomo((m) => ({ ...m, open: false }));

  return (
    <div className="army-pattern-bg min-h-screen overflow-x-clip text-sand-50">
      <a
        href="#main"
        className="sr-only rounded-b-lg bg-flare-500 px-5 py-3 font-mono text-xs font-bold tracking-[0.1em] text-ink-950 uppercase focus:not-sr-only focus:fixed focus:left-0 focus:top-0 focus:z-[70]"
      >
        Skip to content
      </a>
      <Navbar onBuy={openMomo} />
      <main id="main">
        <Hero onBuy={openMomo} />
        <Marquee />
        <SocialProof />
        <Features />
        <LegoArmyBand />
        <Showcase />
        <Activities />
        <Timeline />
        <Testimonials />
        <Sponsors />
        <Pricing onBuy={openMomo} />
        <MusicVote />
        <FinalCTA onBuy={openMomo} />
      </main>
      <Footer />
      <MobileStickyCTA onBuy={openMomo} />
      <MomoModal open={momo.open} type={momo.type} onClose={closeMomo} />
    </div>
  );
}

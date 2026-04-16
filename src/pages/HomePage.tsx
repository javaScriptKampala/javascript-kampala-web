/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import {
  Calendar,
  Users,
  Code2,
  Twitter,
  ArrowUpRight,
  Mic2,
  Archive,
  Ticket,
  ArrowLeft,
  Linkedin,
  Youtube,
  Heart,
  X,
  Github,
  User,
  PartyPopper,
  Sparkles,
  Mail,
} from "lucide-react";
import { SiteChrome } from "../components/SiteChrome";
import { CONTACT_EMAIL, SOCIAL_URLS, TICKETDADDY_URL } from "../constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const GALLERY_BASE_URL = "https://cdn.javascriptkampala.org";
const GALLERY_THUMB_BASE_URL = "https://cdn.javascriptkampala.org/thumbnails";
const GALLERY_FILENAMES = [
  "PXL_20250315_121328645.jpg",
  "PXL_20250315_121333334.jpg",
  "PXL_20250315_121337778.jpg",
  "PXL_20250315_121345215.jpg",
  "PXL_20250315_121400082.jpg",
  "PXL_20250315_122111966.jpg",
  "PXL_20250315_125433440.MP.jpg",
  "PXL_20250315_125437579.MP.jpg",
  "PXL_20250315_130259007.MP.jpg",
  "PXL_20250315_130300061.jpg",
  "PXL_20250315_130404929.PORTRAIT.jpg",
  "PXL_20250315_130406901.PORTRAIT.jpg",
  "PXL_20250315_131755041.jpg",
  "PXL_20250315_131813028.jpg",
  "PXL_20250315_131815842.jpg",
  "PXL_20250315_131818305.MP.jpg",
  "PXL_20250315_131849949.MP.jpg",
  "PXL_20250315_132007879.PORTRAIT.jpg",
  "PXL_20250315_132024474.PORTRAIT.jpg",
  "PXL_20250315_133355845.MP.jpg",
  "PXL_20250315_133359289.MP.jpg",
  "PXL_20250315_133409847.MP.jpg",
  "PXL_20250315_133612357.jpg",
  "PXL_20250315_133642522.MP.jpg",
  "PXL_20250315_133643345.jpg",
  "PXL_20250315_133644160.jpg",
  "PXL_20250315_133702699.jpg",
  "PXL_20250315_133708395.jpg",
  "PXL_20250315_133715760.jpg",
  "PXL_20250315_133725668.MP.jpg",
  "PXL_20250315_133733063.jpg",
  "PXL_20250315_133737132.jpg",
  "PXL_20250315_133739612.MP.jpg",
  "PXL_20250315_133820965.jpg",
  "PXL_20250315_133830652.jpg",
  "PXL_20250315_133836002.MP.jpg",
  "PXL_20250315_133851281.jpg",
  "PXL_20250315_133912525.MP.jpg",
  "PXL_20250315_134547637.MP.jpg",
  "PXL_20250315_134549366.jpg",
  "PXL_20250315_134557020.jpg",
  "PXL_20250315_134602070.jpg",
  "PXL_20250315_134700444.MP.jpg",
  "PXL_20250315_134726484.jpg",
  "PXL_20250315_134726877.jpg",
  "PXL_20250315_134742576.MP.jpg",
  "PXL_20250315_134823550.jpg",
  "PXL_20250315_134929247.jpg",
  "PXL_20250503_125441159.jpg",
  "PXL_20250503_125452620.MP.jpg",
  "PXL_20250503_125454140.jpg",
  "PXL_20250503_125740854.MP.jpg",
  "PXL_20250503_125746101.MP.jpg",
  "PXL_20250503_125804024.MP.jpg",
  "PXL_20250503_133316015.MP.jpg",
  "PXL_20250503_133317562.jpg",
  "PXL_20250503_134731914.jpg",
  "PXL_20250503_134744078.MP.jpg",
  "PXL_20250503_134746584.MP.jpg",
  "PXL_20250503_134748528.jpg",
  "PXL_20250503_134749085.jpg",
  "PXL_20250503_134753716.MP.jpg",
  "PXL_20250503_134754622.jpg",
  "PXL_20250503_135051419.MP.jpg",
  "PXL_20250503_135108624.MP.jpg",
];

const GALLERY_IMAGES = GALLERY_FILENAMES.map((filename, i) => ({
  fullUrl: `${GALLERY_BASE_URL}/${filename}`,
  thumbnailUrl: `${GALLERY_THUMB_BASE_URL}/${filename}`,
  caption: `Event Photo ${i + 1}`,
}));

const SPONSORS: { name: string; href: string }[] = [
  { name: "Africa's Talking", href: "https://africastalking.com/" },
  { name: "TicketDaddy", href: "https://www.ticketdaddy.io/" },
  { name: "Chainlink", href: "https://chain.link/" },
  { name: "Celo", href: "https://celo.org/" },
  { name: "Crane Cloud", href: "https://cranecloud.io/" },
  { name: "Mateza", href: "https://mateza.rw/" },
];

type SpeakerProfile = {
  kind: "profile";
  /** Shown as the main line; refine anytime if you prefer display names from X. */
  name: string;
  username: string;
  profileUrl: string;
};

type SpeakerCta = { kind: "cta" };

const SPEAKERS: (SpeakerProfile | SpeakerCta)[] = [
  {
    kind: "profile",
    name: "Hussein Kizz",
    username: "hussein_kizz",
    profileUrl: "https://x.com/hussein_kizz",
  },
  {
    kind: "profile",
    name: "Swabra",
    username: "swabra20",
    profileUrl: "https://x.com/swabra20",
  },
  {
    kind: "profile",
    name: "Baliks Josay",
    username: "baliksjosay",
    profileUrl: "https://x.com/baliksjosay",
  },
  { kind: "cta" },
];

function speakerAvatarUrl(username: string) {
  return `https://unavatar.io/x/${username}`;
}

export default function HomePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  useEffect(() => {
    triggerConfetti();
  }, []);

  const Lightbox = ({ images, index, onClose }: { images: string[], index: number, onClose: () => void }) => {
    const [currentIndex, setCurrentIndex] = useState(index);
    
    const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-js-black/98 backdrop-blur-xl pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 md:top-10 md:right-10 text-white/40 hover:text-js-yellow z-50 p-1"
          aria-label="Close gallery"
        >
          <X size={32} />
        </button>
        
        <button
          type="button"
          onClick={prev}
          className="hidden md:flex absolute left-6 lg:left-10 w-12 h-12 rounded-full border border-white/10 items-center justify-center hover:bg-js-yellow hover:text-js-black transition-all z-50"
          aria-label="Previous image"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="relative w-full max-w-5xl aspect-video px-4 max-h-[min(70vh,calc(100vh-8rem))] md:max-h-none pb-28 md:pb-0">
          <motion.img 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            src={images[currentIndex]} 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-[-40px] text-[10px] font-bold uppercase tracking-[0.5em] opacity-40 pointer-events-none">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          className="hidden md:flex absolute right-6 lg:right-10 w-12 h-12 rounded-full border border-white/10 items-center justify-center hover:bg-js-yellow hover:text-js-black transition-all z-50"
          aria-label="Next image"
        >
          <ArrowUpRight size={24} className="rotate-45" />
        </button>

        <div className="fixed bottom-0 left-0 right-0 flex md:hidden items-center justify-center gap-10 border-t border-white/10 bg-js-black/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-[201]">
          <button
            type="button"
            onClick={prev}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-js-yellow hover:text-js-black transition-all"
            aria-label="Previous image"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            type="button"
            onClick={next}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-js-yellow hover:text-js-black transition-all"
            aria-label="Next image"
          >
            <ArrowUpRight size={24} className="rotate-45" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <SiteChrome>
        <motion.main 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-4 gap-[15px] auto-rows-min md:auto-rows-[200px]"
        >
          {/* Hero Tile */}
          <motion.div 
            variants={item}
            className="md:col-span-2 md:row-span-2 metro-tile metro-tile-yellow p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden min-h-0"
          >
            <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <PartyPopper size={200} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-[18px] font-bold uppercase tracking-[1px] opacity-80">Established 2019</h3>
                <span className="bg-js-black text-js-yellow text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">5TH ANNIVERSARY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-[56px] font-extrabold leading-[0.95] tracking-tight sm:tracking-[-2px] uppercase">
                5 YEARS OF BUILDING THE ECOSYSTEM.
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium max-w-xs opacity-90 leading-relaxed">
                From a small gathering in a cafe to Uganda's premier tech community. We write the future, one line of JavaScript at a time.
              </p>
              <button 
                onClick={triggerConfetti}
                className="w-fit bg-js-black text-js-yellow px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-js-black transition-all"
              >
                Celebrate with us <PartyPopper size={14} />
              </button>
            </div>
          </motion.div>

          {/* TicketDaddy Integration Tile */}
          <motion.a 
            href={TICKETDADDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            className="md:col-span-2 metro-tile bg-js-yellow/10 border-2 border-js-yellow/30 p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between group hover:bg-js-yellow/20 transition-all"
          >
            <div className="w-full sm:max-w-[70%] min-w-0">
              <h3 className="text-js-yellow font-black text-xl sm:text-2xl uppercase tracking-tighter mb-2">Get Your Tickets</h3>
              <p className="text-sm opacity-70">All JavaScript Kampala events are officially published on TicketDaddy. Secure your spot now.</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-js-yellow flex items-center justify-center text-js-black group-hover:scale-110 transition-transform shrink-0 self-start sm:self-center">
              <Ticket size={32} />
            </div>
          </motion.a>

          {/* Next Meetup Tile */}
          <motion.div 
            variants={item}
            className="metro-tile metro-tile-black p-6 flex flex-col justify-between"
          >
            <h3 className="text-[14px] font-bold uppercase tracking-[1px] opacity-60">Next Meetup</h3>
            <div>
              <p className="bg-js-yellow text-js-black font-bold text-sm uppercase px-2 py-1 w-fit">
                Coming Soon
              </p>
            </div>
          </motion.div>

          {/* Community Stats Tile */}
          <motion.div 
            variants={item}
            className="metro-tile metro-tile-yellow-outline p-6 flex flex-col justify-between overflow-hidden"
          >
            <h3 className="text-[14px] font-bold uppercase tracking-[1px] opacity-60">Community</h3>
            <div className="overflow-hidden">
              <span className="stat-number text-js-yellow block truncate">5.7K+</span>
              <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-60 mt-1">Developers & Designers</p>
            </div>
          </motion.div>

          {/* Mission Tile */}
          <motion.div 
            variants={item}
            className="md:col-span-2 metro-tile metro-tile-black p-8 flex flex-col justify-between"
          >
            <h3 className="text-[14px] font-bold uppercase tracking-[1px] opacity-60">Mission</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              To foster a vibrant, inclusive environment where developers in Kampala can learn, share, and collaborate on cutting-edge web technologies. We are the home for JavaScript enthusiasts.
            </p>
          </motion.div>

          {/* Events Tile */}
          <motion.a 
            href={TICKETDADDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            className="metro-tile metro-tile-black p-6 flex flex-col justify-between group cursor-pointer"
          >
            <Calendar className="text-js-yellow group-hover:scale-110 transition-transform" size={24} />
            <div>
              <h3 className="text-[14px] font-bold uppercase tracking-[1px]">Events</h3>
              <p className="text-[10px] opacity-40 uppercase tracking-tighter mt-1">Tickets via TicketDaddy</p>
            </div>
          </motion.a>

          {/* Code Tile */}
          <motion.div 
            variants={item}
            className="metro-tile metro-tile-black p-6 flex flex-col justify-between group cursor-pointer"
          >
            <Code2 className="text-js-yellow group-hover:scale-110 transition-transform" size={24} />
            <div>
              <h3 className="text-[14px] font-bold uppercase tracking-[1px]">Open Source</h3>
              <p className="text-[10px] opacity-40 uppercase tracking-tighter mt-1">Community Projects</p>
            </div>
          </motion.div>
        </motion.main>

        {/* Sponsors Section - Moving Marquee */}
        <section id="sponsors" className="mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter">Sponsors</h2>
            <div className="h-[2px] flex-grow bg-white/10 min-w-0 order-2 sm:order-none" />
            <Heart className="text-js-yellow w-7 h-7 md:w-8 md:h-8 shrink-0 order-3 sm:order-none" strokeWidth={2} />
          </div>
          
          <div className="marquee-container bg-js-dark border-y border-white/5">
            <div className="marquee-content">
              {SPONSORS.concat(SPONSORS).map((sponsor, i) => (
                <a
                  key={`${sponsor.name}-${i}`}
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100 cursor-pointer"
                >
                  <span className="font-black text-2xl tracking-tighter whitespace-nowrap">{sponsor.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/sponsor"
              className="group inline-flex items-center gap-2 mx-auto text-js-yellow font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all"
            >
              Become a Sponsor <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter">Community</h2>
            <div className="h-[2px] flex-grow bg-white/10 min-w-0 order-2 sm:order-none" />
            <Users className="text-js-yellow w-9 h-9 md:w-10 md:h-12 shrink-0 order-3 sm:order-none" strokeWidth={2} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-js-dark border border-white/5">
              <h4 className="text-js-yellow font-bold uppercase mb-4 tracking-widest">Mentorship</h4>
              <p className="text-sm opacity-60 leading-relaxed">Connect with senior developers who can guide you through your career journey in the tech ecosystem.</p>
            </div>
            <div className="p-8 bg-js-dark border border-white/5">
              <h4 className="text-js-yellow font-bold uppercase mb-4 tracking-widest">Networking</h4>
              <p className="text-sm opacity-60 leading-relaxed">Regular meetups designed to help you meet peers, find co-founders, or discover your next job opportunity.</p>
            </div>
            <div className="p-8 bg-js-dark border border-white/5">
              <h4 className="text-js-yellow font-bold uppercase mb-4 tracking-widest">Workshops</h4>
              <p className="text-sm opacity-60 leading-relaxed">Hands-on sessions covering everything from React and Node.js to Web3 and AI integration.</p>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section id="speakers" className="mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-12">
            <Mic2 className="text-js-yellow w-9 h-9 md:w-10 md:h-12 shrink-0 order-3 sm:order-none" strokeWidth={2} />
            <div className="h-[2px] flex-grow bg-white/10 min-w-0 order-2 sm:order-none" />
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter order-1 sm:order-none">Speakers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPEAKERS.map((speaker) =>
              speaker.kind === "cta" ? (
                <Link
                  key="speaker-cta"
                  to="/speaker"
                  className="metro-tile bg-js-yellow text-js-black p-6 aspect-square flex flex-col justify-end group overflow-hidden relative text-left border-2 border-js-yellow hover:bg-[#ffe94a] transition-all"
                >
                  <div className="relative z-10">
                    <User className="text-js-black mb-3" size={28} strokeWidth={2} />
                    <h4 className="font-bold uppercase tracking-tighter text-lg">This could be you</h4>
                    <p className="text-xs text-js-black/80 uppercase tracking-widest mt-1">
                      Tap to pitch a talk
                    </p>
                  </div>
                </Link>
              ) : (
                <a
                  key={speaker.username}
                  href={speaker.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="metro-tile metro-tile-black p-6 aspect-square flex flex-col justify-end group overflow-hidden relative border border-white/5 hover:border-js-yellow/30 transition-colors"
                >
                  <img
                    src={speakerAvatarUrl(speaker.username)}
                    alt={speaker.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity scale-105 group-hover:scale-110 duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-js-black via-js-black/85 to-transparent" />
                  <div className="relative z-10">
                    <Twitter className="text-js-yellow mb-2 opacity-90" size={18} />
                    <h4 className="font-bold uppercase tracking-tighter text-lg">{speaker.name}</h4>
                    <p className="text-xs text-js-yellow/90 font-bold tracking-widest">
                      @{speaker.username}
                    </p>
                  </div>
                </a>
              )
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter">Gallery</h2>
            <div className="h-[2px] flex-grow bg-white/10 min-w-0 order-2 sm:order-none" />
            <Archive className="text-js-yellow w-9 h-9 md:w-10 md:h-12 shrink-0 order-3 sm:order-none" strokeWidth={2} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedImageIndex(i)}
                className="aspect-square overflow-hidden group relative cursor-pointer border border-white/10 bg-white/5 hover:border-js-yellow/60 transition-colors"
              >
                <img 
                  src={img.thumbnailUrl}
                  alt={img.caption} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(event) => {
                    event.currentTarget.src = img.fullUrl;
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-[#333] flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-js-gray pb-12 text-center md:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4 md:items-start">
            <span className="badge">BUILDING SINCE 2019</span>
            <span className="uppercase tracking-widest opacity-60 text-balance max-w-[min(100%,28rem)]">
              KAMPALA, UGANDA // [0.3476° N, 32.5825° E]
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href={SOCIAL_URLS.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-js-yellow transition-colors" aria-label="Twitter"><Twitter size={16} /></a>
            <a href={SOCIAL_URLS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-js-yellow transition-colors" aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href={SOCIAL_URLS.github} target="_blank" rel="noopener noreferrer" className="hover:text-js-yellow transition-colors" aria-label="GitHub"><Github size={16} /></a>
            <a href={SOCIAL_URLS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-js-yellow transition-colors" aria-label="YouTube"><Youtube size={16} /></a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-js-yellow transition-colors" aria-label="Email"><Mail size={16} /></a>
          </div>
          <div className="italic opacity-60">
            v5.0.0-stable &copy; {new Date().getFullYear()} JavaScript Kampala
          </div>
        </footer>
      </SiteChrome>

      {selectedImageIndex !== null && (
        <Lightbox 
          images={GALLERY_IMAGES.map((img) => img.fullUrl)}
          index={selectedImageIndex} 
          onClose={() => setSelectedImageIndex(null)} 
        />
      )}
    </>
  );
}

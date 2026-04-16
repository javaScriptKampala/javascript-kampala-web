/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Link} from 'react-router-dom';
import {
  Github,
  Linkedin,
  PartyPopper,
  Sparkles,
  Ticket,
  Twitter,
  Youtube,
} from 'lucide-react';
import type {ReactNode} from 'react';
import {TICKETDADDY_URL} from '../constants';

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({children}: SiteChromeProps) {
  return (
    <div className="min-h-screen bg-js-black text-white selection:bg-js-yellow selection:text-js-black overflow-x-hidden flex flex-col">
      {/* Celebration Banner */}
      <div className="bg-js-yellow text-js-black py-2 overflow-hidden relative shrink-0">
        <div className="marquee-container !py-0">
          <div className="marquee-content !gap-12">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 font-black uppercase text-[10px] tracking-[0.3em] whitespace-nowrap"
              >
                <PartyPopper size={14} /> Celebrating 5 Years of JavaScript
                Kampala <Sparkles size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Social Bar */}
      <div className="border-b border-white/5 py-2 px-6 md:px-10 shrink-0">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
            Kampala, Uganda // [0.3476° N, 32.5825° E]
          </div>
          <div className="flex gap-6">
            <a href="#" className="social-link-top">
              <Twitter size={12} /> Twitter
            </a>
            <a href="#" className="social-link-top">
              <Linkedin size={12} /> LinkedIn
            </a>
            <a href="#" className="social-link-top">
              <Github size={12} /> GitHub
            </a>
            <a href="#" className="social-link-top">
              <Youtube size={12} /> YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-6 md:py-10 md:px-0 flex flex-col flex-1 w-full">
        {/* Header / Navigation */}
        <header className="flex justify-between items-center mb-10 sticky top-0 bg-js-black/80 backdrop-blur-md z-50 py-4 border-b border-white/5">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="bg-js-yellow text-js-black px-3 py-1 font-black text-2xl tracking-tighter uppercase"
            >
              JS KAMPALA
            </Link>
            <div className="hidden lg:block w-[1px] h-8 bg-white/10" />
            <div className="hidden lg:block text-[10px] font-bold uppercase tracking-widest opacity-30">
              Community // <br /> Since 2019
            </div>
          </div>
          <nav className="hidden md:flex gap-10 items-center">
            <a
              href={TICKETDADDY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center gap-1"
            >
              events <Ticket size={14} />
            </a>
            <Link to="/#community" className="nav-link">
              community
            </Link>
            <Link to="/#sponsors" className="nav-link">
              sponsors
            </Link>
            <Link to="/#speakers" className="nav-link">
              speakers
            </Link>
            <Link to="/#gallery" className="nav-link">
              gallery
            </Link>
          </nav>
        </header>

        {children}
      </div>
    </div>
  );
}

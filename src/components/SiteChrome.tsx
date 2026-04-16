/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Link, useLocation} from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  PartyPopper,
  Sparkles,
  Ticket,
  Twitter,
  X,
  Youtube,
} from 'lucide-react';
import {useEffect, useId, useRef, useState, type ReactNode} from 'react';
import {CONTACT_EMAIL, SOCIAL_URLS, TICKETDADDY_URL} from '../constants';

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({children}: SiteChromeProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevMobileNavOpen = useRef(false);
  const location = useLocation();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (mobileNavOpen) {
      closeButtonRef.current?.focus();
    } else if (prevMobileNavOpen.current) {
      menuButtonRef.current?.focus();
    }
    prevMobileNavOpen.current = mobileNavOpen;
  }, [mobileNavOpen]);

  const closeMobileNav = () => setMobileNavOpen(false);

  const mobileNavLinkClass =
    'flex items-center gap-2 py-4 text-lg font-bold lowercase border-b border-white/10 opacity-90 hover:opacity-100 hover:text-js-yellow transition-colors';

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
        <div className="max-w-[1200px] mx-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 min-w-0">
            <span className="sm:hidden truncate block">
              Kampala, Uganda
            </span>
            <span className="hidden sm:inline">
              Kampala, Uganda // [0.3476° N, 32.5825° E]
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
            <a
              href={SOCIAL_URLS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-top"
            >
              <Twitter size={12} /> Twitter
            </a>
            <a
              href={SOCIAL_URLS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-top"
            >
              <Linkedin size={12} /> LinkedIn
            </a>
            <a
              href={SOCIAL_URLS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-top"
            >
              <Github size={12} /> GitHub
            </a>
            <a
              href={SOCIAL_URLS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-top"
            >
              <Youtube size={12} /> YouTube
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="social-link-top"
            >
              <Mail size={12} /> Email
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-6 md:py-10 md:px-0 flex flex-col flex-1 w-full min-w-0">
        {/* Header / Navigation */}
        <header className="flex justify-between items-center gap-4 mb-10 sticky top-0 bg-js-black/80 backdrop-blur-md z-50 py-4 border-b border-white/5">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              to="/"
              className="bg-js-yellow text-js-black px-3 py-1 font-black text-xl sm:text-2xl tracking-tighter uppercase shrink-0"
              onClick={closeMobileNav}
            >
              JS KAMPALA
            </Link>
            <div className="hidden lg:block w-[1px] h-8 bg-white/10 shrink-0" />
            <div className="hidden lg:block text-[10px] font-bold uppercase tracking-widest opacity-30">
              Community // <br /> Since 2019
            </div>
          </div>
          <nav className="hidden md:flex gap-10 items-center" aria-label="Main">
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
          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded border border-white/15 p-2 text-white hover:border-js-yellow hover:text-js-yellow transition-colors"
            aria-expanded={mobileNavOpen}
            aria-controls={mobileNavId}
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileNavOpen((o) => !o)}
          >
            {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        {children}
      </div>

      {mobileNavOpen ? (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="presentation"
          aria-hidden={!mobileNavOpen}
        >
          <button
            type="button"
            className="absolute inset-0 bg-js-black/85 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={closeMobileNav}
          />
          <div
            id={mobileNavId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-white/10 bg-js-black shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                Menu
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className="rounded p-2 text-white/70 hover:bg-white/10 hover:text-js-yellow"
                aria-label="Close navigation"
                onClick={closeMobileNav}
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col overflow-y-auto px-4 pb-8 pt-2" aria-label="Mobile main">
              <a
                href={TICKETDADDY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={mobileNavLinkClass}
                onClick={closeMobileNav}
              >
                events <Ticket size={18} />
              </a>
              <Link
                to="/#community"
                className={mobileNavLinkClass}
                onClick={closeMobileNav}
              >
                community
              </Link>
              <Link
                to="/#sponsors"
                className={mobileNavLinkClass}
                onClick={closeMobileNav}
              >
                sponsors
              </Link>
              <Link
                to="/#speakers"
                className={mobileNavLinkClass}
                onClick={closeMobileNav}
              >
                speakers
              </Link>
              <Link
                to="/#gallery"
                className={mobileNavLinkClass}
                onClick={closeMobileNav}
              >
                gallery
              </Link>
            </nav>
          </div>
        </div>
      ) : null}

    </div>
  );
}

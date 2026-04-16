/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mic2, Send, Zap } from 'lucide-react';
import { SiteChrome } from '../components/SiteChrome';
import { useContactForm } from '../hooks/useContactForm';

export default function SpeakerPage() {
  const {submitContact, submitStatus, isSubmitting} = useContactForm();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitContact('speaker', new FormData(e.currentTarget));
  };

  return (
    <SiteChrome>
      <div className="flex flex-col gap-10 pb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-js-yellow transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="metro-tile metro-tile-black p-8 md:p-12 border border-js-yellow/30 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 opacity-[0.07] pointer-events-none">
            <Mic2 size={180} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-js-yellow mb-4 relative z-10">
            Share your craft
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 relative z-10">
            Pitch a Talk
          </h1>
          <p className="text-sm md:text-base opacity-80 max-w-2xl leading-relaxed relative z-10">
            JavaScript Kampala is built on real stories from builders like you. Tell us
            what you want to teach, demo, or debate — we&apos;ll help you shape it for our
            audience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2 p-6 md:p-8 bg-js-yellow/5 border-l-4 border-js-yellow">
            <h2 className="text-js-yellow font-bold uppercase text-xs tracking-widest mb-4">
              Speaker benefits
            </h2>
            <ul className="space-y-3 text-[11px] md:text-xs uppercase font-bold opacity-70">
              <li className="flex items-center gap-2">
                <Zap size={12} /> Professional exposure
              </li>
              <li className="flex items-center gap-2">
                <Zap size={12} /> Networking with peers
              </li>
              <li className="flex items-center gap-2">
                <Zap size={12} /> Skill validation
              </li>
              <li className="flex items-center gap-2">
                <Zap size={12} /> Community impact
              </li>
            </ul>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="lg:col-span-3 space-y-4 bg-js-dark border border-white/10 p-6 md:p-10"
            onSubmit={onSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                className="form-input"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="form-input"
                required
              />
            </div>
            <input
              name="topicTitle"
              type="text"
              placeholder="Topic Title"
              className="form-input"
              required
            />
            <textarea
              name="message"
              placeholder="Briefly describe your talk..."
              className="form-input min-h-[140px]"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-js-yellow text-js-black py-4 font-black uppercase tracking-tighter flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Submit proposal <Send size={18} />
            </button>
            {submitStatus && (
              <p className="text-[11px] uppercase tracking-wider opacity-80">
                {submitStatus}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </SiteChrome>
  );
}

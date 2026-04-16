/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Send } from 'lucide-react';
import { SiteChrome } from '../components/SiteChrome';
import { useContactForm } from '../hooks/useContactForm';

export default function SponsorPage() {
  const {submitContact, submitStatus, isSubmitting} = useContactForm();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitContact('sponsor', new FormData(e.currentTarget));
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
          className="metro-tile metro-tile-yellow-outline p-8 md:p-12 border-2 border-js-yellow/40"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-js-yellow mb-4">
            Partner with us
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Become a Sponsor
          </h1>
          <p className="text-sm md:text-base opacity-80 max-w-2xl leading-relaxed">
            Put your brand in front of Kampala&apos;s most engaged JavaScript and web
            community. We&apos;ll work with you to craft visibility, hiring, and CSR
            moments that feel authentic — not spammy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2 p-6 md:p-8 bg-js-yellow/5 border-l-4 border-js-yellow">
            <h2 className="text-js-yellow font-bold uppercase text-xs tracking-widest mb-4">
              Sponsor benefits
            </h2>
            <ul className="space-y-3 text-[11px] md:text-xs uppercase font-bold opacity-70">
              <li className="flex items-center gap-2">
                <Heart size={12} /> Brand visibility across events & channels
              </li>
              <li className="flex items-center gap-2">
                <Heart size={12} /> Talent recruitment & pipeline access
              </li>
              <li className="flex items-center gap-2">
                <Heart size={12} /> CSR & community engagement
              </li>
              <li className="flex items-center gap-2">
                <Heart size={12} /> Product showcase & demos
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
                name="companyName"
                type="text"
                placeholder="Company Name"
                className="form-input"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Work Email"
                className="form-input"
                required
              />
            </div>
            <select
              name="tier"
              className="form-input appearance-none"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Sponsorship Tier
              </option>
              <option>Gold Sponsor</option>
              <option>Silver Sponsor</option>
              <option>Community Partner</option>
            </select>
            <textarea
              name="message"
              placeholder="How would you like to support us?"
              className="form-input min-h-[140px]"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-js-yellow text-js-black py-4 font-black uppercase tracking-tighter flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Send inquiry <Send size={18} />
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

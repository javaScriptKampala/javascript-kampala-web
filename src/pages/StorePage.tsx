/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  Search,
  Filter,
  Sparkles,
  Heart,
  Truck,
  ShieldCheck,
  Zap,
  HelpCircle,
  Gift,
} from 'lucide-react';
import { SiteChrome } from '../components/SiteChrome';
import { useCart } from '../context/CartContext';
import { STORE_PRODUCTS } from '../data/storeProducts';
import { ProductCategory } from '../types/store';
import { ProductCard } from '../components/store/ProductCard';
import { ProductDetailModal } from '../components/store/ProductDetailModal';
import { CartDrawer } from '../components/store/CartDrawer';
import { CheckoutModal } from '../components/store/CheckoutModal';

export default function StorePage() {
  const {
    totalItemCount,
    setIsCartOpen,
    currency,
    setCurrency,
    qualifiesForFreeGift,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'stickers', label: 'Stickers' },
    { id: 'drinkware', label: 'Drinkware' },
  ];

  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <SiteChrome>
      <div className="flex flex-col gap-10 pb-16">
        {/* Top bar with back link & floating cart summary */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-js-yellow transition-colors w-fit"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex items-center gap-3">
            {/* Currency switch */}
            <div className="inline-flex rounded border border-white/15 p-0.5 bg-black">
              <button
                type="button"
                onClick={() => setCurrency('UGX')}
                className={`px-2.5 py-1 text-xs font-mono font-bold transition-colors ${
                  currency === 'UGX'
                    ? 'bg-js-yellow text-js-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                UGX (USh)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 text-xs font-mono font-bold transition-colors ${
                  currency === 'USD'
                    ? 'bg-js-yellow text-js-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* Cart trigger button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="bg-js-yellow hover:bg-yellow-400 text-js-black px-4 py-1.5 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-yellow-500/10"
            >
              <ShoppingBag size={15} />
              <span>Bag ({totalItemCount})</span>
            </button>
          </div>
        </div>

        {/* Hero Section Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="metro-tile metro-tile-yellow-outline p-8 md:p-12 border-2 border-js-yellow/40 relative overflow-hidden"
        >
          <div className="absolute -right-8 -bottom-8 opacity-[0.05] pointer-events-none text-white">
            <ShoppingBag size={280} />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-js-yellow bg-black/40 px-2.5 py-1 border border-js-yellow/30">
                Official Community Store // 5 Years
              </span>
              {qualifiesForFreeGift && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 flex items-center gap-1">
                  <Gift size={11} /> Free Sticker Pack Qualified
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white leading-tight">
              Wear Your Code. Support Kampala.
            </h1>

            <p className="text-sm md:text-base text-white/80 max-w-2xl leading-relaxed mb-6 font-normal">
              100% of all merchandise proceeds fund free developer meetups, student tickets, speaker kits, and open-source maker grants across Uganda. High quality, locally printed, and built to last.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] font-mono uppercase tracking-wider text-white/70 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-js-yellow" /> MTN &amp; Airtel MoMo Accepted
              </div>
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-js-yellow" /> Kampala Boda or Meetup Pickup
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <ShieldCheck size={14} className="text-js-yellow" /> Official 5th Year Edition
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search, Filter & Categories Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-js-dark border border-white/10 p-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-2 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-js-yellow text-js-black font-black'
                    : 'bg-black/40 text-white/70 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3 top-3 text-white/40" />
            <input
              type="text"
              placeholder="SEARCH SWAG..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/15 pl-9 pr-3 py-2 text-xs font-mono uppercase text-white placeholder:text-white/30 focus:border-js-yellow outline-none transition-colors"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white/50">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </h2>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-mono text-js-yellow hover:underline"
              >
                Clear search
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-js-dark border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-white/40">
                <Filter size={20} />
              </div>
              <h3 className="text-base font-bold uppercase text-white">No products found</h3>
              <p className="text-xs text-white/50 max-w-sm mx-auto">
                No items match your filter criteria. Try searching for &quot;hoodie&quot;, &quot;tee&quot;, or reset your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase px-4 py-2 mt-2 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Community Perks & Delivery Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-js-dark border border-white/10 space-y-2">
            <div className="text-js-yellow">
              <Heart size={22} />
            </div>
            <h3 className="text-sm font-black uppercase text-white tracking-wide">
              100% Non-Profit Proceeds
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Every shilling goes into venue rentals, snacks, live-streaming equipment, and scholarships for Ugandan developers.
            </p>
          </div>

          <div className="p-6 bg-js-dark border border-white/10 space-y-2">
            <div className="text-js-yellow">
              <Truck size={22} />
            </div>
            <h3 className="text-sm font-black uppercase text-white tracking-wide">
              Kampala Fast Delivery
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Choose free pickup at the next community meetup, collect from The Innovation Village / MoTIV, or get door-to-door Boda delivery.
            </p>
          </div>

          <div className="p-6 bg-js-dark border border-white/10 space-y-2">
            <div className="text-js-yellow">
              <Sparkles size={22} />
            </div>
            <h3 className="text-sm font-black uppercase text-white tracking-wide">
              Custom Kampala Designs
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Designed in collaboration with local visual artists, combining technical humor with Kampala streetwear aesthetics.
            </p>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-6 p-8 bg-black border border-white/10 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle size={18} className="text-js-yellow" />
            <h3 className="text-lg font-black uppercase tracking-tight text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="space-y-1">
              <h4 className="font-bold text-white uppercase font-mono">
                How do I pay with MTN or Airtel Mobile Money?
              </h4>
              <p className="text-white/60">
                During checkout, select your network (MTN or Airtel) and enter your mobile number. You will receive a prompt directly on your handset to confirm with your secret MoMo PIN.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-white uppercase font-mono">
                Can I pick up my order in person?
              </h4>
              <p className="text-white/60">
                Yes! Select &quot;Free Meetup Pickup&quot; during checkout. We will have your package packaged with your name and order ID at the welcome registration desk of the next JS Kampala meetup.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-white uppercase font-mono">
                What if a size doesn&apos;t fit me?
              </h4>
              <p className="text-white/60">
                We offer free size exchanges at our meetups as long as the garment has not been worn or washed and tags remain intact.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-white uppercase font-mono">
                Do you ship outside Uganda?
              </h4>
              <p className="text-white/60">
                Yes, we support international orders via DHL express upon request. Contact <span className="text-js-yellow">team@javascriptkampala.org</span> for diaspora shipping quotes.
              </p>
            </div>
          </div>
        </div>

        {/* Modals & Slide-overs */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </SiteChrome>
  );
}

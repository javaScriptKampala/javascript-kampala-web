/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, AlertCircle } from 'lucide-react';
import { Product, ProductVariant } from '../../types/store';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, formatPrice, setSelectedProductForModal } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(() => {
    if (product.variants && product.variants.length > 0) {
      return product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0];
    }
    return undefined;
  });
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleCardClick = () => {
    setSelectedProductForModal(product);
  };

  const isOutOfStock = product.stockCount <= 0;

  return (
    <div
      onClick={handleCardClick}
      className="metro-tile metro-tile-black border border-white/10 hover:border-js-yellow/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
    >
      {/* Top badges bar */}
      <div className="p-4 flex items-center justify-between z-10">
        {product.badge ? (
          <span className="badge bg-js-yellow text-js-black font-black text-[9px] tracking-[0.2em]">
            {product.badge}
          </span>
        ) : (
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
            {product.category}
          </span>
        )}

        {product.stockCount <= 5 ? (
          <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
            <AlertCircle size={10} /> {product.stockCount} left
          </span>
        ) : (
          <span className="text-[10px] font-mono text-emerald-400">In Stock</span>
        )}
      </div>

      {/* Image Artwork Showcase */}
      <div className="relative aspect-square w-full px-6 py-2 flex items-center justify-center overflow-hidden bg-black/40">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForModal(product);
            }}
            className="bg-white/10 hover:bg-js-yellow hover:text-js-black text-white text-xs font-black uppercase tracking-wider px-3 py-2 transition-colors flex items-center gap-1.5 border border-white/20"
          >
            <Eye size={14} /> Quick View
          </button>
        </div>
      </div>

      {/* Details & Action */}
      <div className="p-5 flex flex-col gap-3 bg-js-dark/60 border-t border-white/5 flex-grow justify-between">
        <div>
          <h3 className="font-black text-base sm:text-lg uppercase tracking-tight text-white group-hover:text-js-yellow transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-white/60 line-clamp-2 mt-1 font-normal leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Inline Size / Variant Selection if available */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
            <span className="text-[9px] font-mono text-white/40 uppercase mr-1">Size:</span>
            {product.variants.map((variant) => {
              const isSelected = selectedVariant?.id === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  disabled={!variant.inStock}
                  onClick={() => setSelectedVariant(variant)}
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border transition-all ${
                    !variant.inStock
                      ? 'border-white/5 text-white/20 line-through cursor-not-allowed'
                      : isSelected
                      ? 'border-js-yellow bg-js-yellow text-js-black font-black'
                      : 'border-white/20 text-white/70 hover:border-white/60'
                  }`}
                >
                  {variant.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Price & Add to Bag */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-black text-white tracking-tight">
              {formatPrice(product.priceUGX, product.priceUSD)}
            </div>
            <div className="text-[9px] font-mono text-white/40 uppercase">
              Free gift eligible
            </div>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`px-3 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              justAdded
                ? 'bg-emerald-500 text-black'
                : 'bg-js-yellow hover:bg-yellow-400 text-js-black active:scale-95'
            } ${isOutOfStock ? 'opacity-40 cursor-not-allowed bg-white/20 text-white' : ''}`}
          >
            {justAdded ? (
              <>
                <Check size={14} /> Added
              </>
            ) : isOutOfStock ? (
              'Sold Out'
            ) : (
              <>
                <ShoppingBag size={14} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

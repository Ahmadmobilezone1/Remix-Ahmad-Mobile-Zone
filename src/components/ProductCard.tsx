import React from 'react';
import { ShoppingCart, MessageCircle, Eye, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, createSingleProductWhatsAppUrl } from '../utils/whatsapp';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart } = useShop();

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = createSingleProductWhatsAppUrl(product, 1);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const isOutOfStock = product.stock === 'out_of_stock';
  const isLimited = product.stock === 'limited_stock';

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col bg-[#12131a] rounded-2xl border border-amber-500/20 hover:border-amber-400/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.25)]"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.discount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
              -{product.discount}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles className="w-2.5 h-2.5 fill-black" />
              HOT DEAL
            </span>
          )}
        </div>

        {/* Demo indicator tag */}
        {product.isDemo && (
          <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm border border-amber-500/40 text-[9px] text-amber-300 font-medium">
            Verified Demo Model
          </span>
        )}
      </div>

      {/* Product Image Showcase */}
      <div className="relative w-full h-56 bg-gradient-to-b from-[#181924] to-[#0f1015] p-6 flex items-center justify-center overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Fallback placeholder image
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Quick view button overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
          <span className="px-3 py-1.5 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            View Specifications
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span className="font-semibold text-amber-400/90 uppercase tracking-wider">{product.brand}</span>
            <span className="text-[11px] text-gray-400">{product.category}</span>
          </div>

          {/* Title */}
          <h3 className="font-sans font-bold text-base text-gray-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Key Specs Pills (RAM / Storage / Color) */}
          <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
            {product.ram && product.ram !== 'N/A' && (
              <span className="px-2 py-0.5 rounded bg-[#1c1d29] border border-gray-700/60 text-gray-300">
                {product.ram} RAM
              </span>
            )}
            {product.storage && product.storage !== 'N/A' && (
              <span className="px-2 py-0.5 rounded bg-[#1c1d29] border border-gray-700/60 text-gray-300">
                {product.storage}
              </span>
            )}
            {product.ptaStatus && (
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-medium flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" />
                {product.ptaStatus}
              </span>
            )}
          </div>
        </div>

        {/* Price & Stock */}
        <div className="pt-3 border-t border-gray-800/80">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <div className="font-brand font-bold text-lg gold-gradient-text">
                {formatPKR(product.price)}
              </div>
              {product.originalPrice > product.price && (
                <div className="text-xs text-gray-500 line-through">
                  {formatPKR(product.originalPrice)}
                </div>
              )}
            </div>

            {/* Stock status indicator */}
            <div className="text-right">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400">
                  <AlertTriangle className="w-3 h-3" />
                  Out of Stock
                </span>
              ) : isLimited ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                  <AlertTriangle className="w-3 h-3" />
                  Limited Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  In Stock
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons: Add to Cart + WhatsApp Order */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                isOutOfStock
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-[#1e1f2b] hover:bg-amber-500 hover:text-black text-amber-400 border border-amber-500/30 active:scale-95'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md active:scale-95 transition"
              title="Instant WhatsApp Order"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

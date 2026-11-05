import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  Gift, 
  Tag, 
  MessageCircle, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { WHATSAPP_DISPLAY, formatPKR } from '../utils/whatsapp';

interface OffersViewProps {
  onOpenProductDetails: (p: Product) => void;
  onNavigateToShop: () => void;
}

export const OffersView: React.FC<OffersViewProps> = ({
  onOpenProductDetails,
  onNavigateToShop,
}) => {
  const { products } = useShop();

  const discountedProducts = products.filter((p) => p.discount > 0 || p.isSpecialOffer);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn space-y-12">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950/40 via-[#181926] to-[#10111a] border border-amber-500/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>Exclusive Ramadan & Season Deals</span>
          </div>

          <h1 className="font-brand font-black text-3xl sm:text-5xl text-white leading-tight">
            Special Discounts &{' '}
            <span className="gold-gradient-text">Limited-Time Mobile Offers</span>
          </h1>

          <p className="text-sm text-gray-300 leading-relaxed">
            Upgrade your smartphone with guaranteed genuine stock directly from Ahmad Mobile Zone, Budhni, Peshawar. Take advantage of bundled accessories, reduced PTA margin prices, and free tempered glass installation at our shop!
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://wa.me/923139172091"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Inquire for Shop Owner Direct Discount</span>
            </a>
          </div>
        </div>
      </div>

      {/* Featured Deals Grid */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-brand font-bold text-2xl text-white">Current Discounted Mobiles</h2>
            <p className="text-xs text-gray-400 mt-1">Special prices available until current Budhni showroom batch lasts</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
            {discountedProducts.length} Active Deals
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenProductDetails}
            />
          ))}
        </div>
      </div>

      {/* Special Bundle Banner */}
      <div className="p-8 rounded-3xl bg-[#141520] border border-gray-800 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
            <Gift className="w-4 h-4" />
            <span>Store Customer Perk</span>
          </div>
          <h3 className="font-brand font-bold text-xl text-white">
            Free 9D UV Screen Guard with Any Smartphone Purchase in Budhni
          </h3>
          <p className="text-xs text-gray-400">
            Buy any iPhone, Samsung, Xiaomi, or Infinix phone at our showroom, and our technicians will professionally apply edge-to-edge protective glass free of charge.
          </p>
        </div>

        <div className="text-center lg:text-right">
          <a
            href="https://wa.me/923139172091?text=Assalam-o-Alaikum%20Ahmad%20Mobile%20Zone!%20I%20am%20interested%20in%20your%20Free%20Screen%20Guard%20bundle%20deal."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Claim on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

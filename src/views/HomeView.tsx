import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  Clock, 
  Award, 
  CheckCircle2, 
  Star,
  Smartphone,
  ChevronRight,
  MapPin,
  Flame,
  Zap,
  Store,
  Phone
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_LIST } from '../data/initialData';
import { formatPKR, WHATSAPP_DISPLAY, createInquiryWhatsAppUrl } from '../utils/whatsapp';
import { Product } from '../types';

interface HomeViewProps {
  onNavigateToShop: (category?: string) => void;
  onOpenProductDetails: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateToShop,
  onOpenProductDetails,
}) => {
  const { products } = useShop();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const specialOffers = products.filter((p) => p.isSpecialOffer || p.discount > 0).slice(0, 4);
  const latestMobiles = products.filter((p) => p.category.includes('iPhone') || p.category.includes('Samsung') || p.category.includes('Xiaomi')).slice(0, 8);

  return (
    <div className="space-y-16 pb-12 animate-fadeIn">
      {/* 1. Large Hero Banner featuring Ahmad Mobile Zone */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#101118] via-[#0b0c10] to-[#08080a] border-b border-amber-500/20">
        {/* Ambient golden lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
                <img
                  src="/assets/aistudio/IMG_20261104_083633_714_b57662bc.png"
                  alt="Ahmad Mobile Zone Official Emblem"
                  className="w-5 h-5 object-contain rounded-full drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                />
                <span>Premier Mobile Store in Budhni, Peshawar</span>
              </div>

              {/* Headline */}
              <h1 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                Experience Luxury Mobile Technology at{' '}
                <span className="gold-gradient-text drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)]">
                  Ahmad Mobile Zone
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl font-normal leading-relaxed">
                Your trusted home for genuine, 100% box-packed Apple iPhones, Samsung Galaxy, Xiaomi, and high-end tech accessories in Peshawar. Official brand warranties, PTA verified, with instant WhatsApp order dispatch.
              </p>

              {/* Key Value Points */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-300 pt-2">
                <span className="flex items-center gap-1.5 text-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  PTA Approved & Pin Pack
                </span>
                <span className="flex items-center gap-1.5 text-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Budhni Physical Shop Pickup
                </span>
                <span className="flex items-center gap-1.5 text-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Cash on Delivery KPK & Pakistan
                </span>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
                <button
                  onClick={() => onNavigateToShop()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <span>Explore All Mobiles</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/923139172091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp ({WHATSAPP_DISPLAY})</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-amber-500/30 bg-[#12131d] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
                <img
                  src="/src/assets/images/hero_flagship_mobiles_1793803894006.jpg"
                  alt="Ahmad Mobile Zone Flagship Showcase"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Hot Offer Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0e0f16]/90 backdrop-blur-md border border-amber-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      Featured Stock
                    </span>
                    <span className="text-sm font-bold text-white">
                      iPhone 16 Pro Max & S24 Ultra
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigateToShop('Apple iPhone')}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition"
                  >
                    View Prices
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Top Brands & Categories Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-brand font-bold text-2xl text-white">Popular Brands & Categories</h2>
            <p className="text-xs text-gray-400 mt-1">Select a brand to filter genuine phones and accessories</p>
          </div>
          <button
            onClick={() => onNavigateToShop()}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CATEGORIES_LIST.slice(0, 6).map((cat) => (
            <div
              key={cat.name}
              onClick={() => onNavigateToShop(cat.name)}
              className="p-4 rounded-2xl bg-[#12131c] border border-gray-800 hover:border-amber-500/50 hover:bg-[#181926] cursor-pointer transition-all duration-300 group hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-amber-500/20 transition">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-gray-500 mt-0.5 block">{cat.count}+ Models</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Flagship Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Peshawar's Top Picks</span>
            </div>
            <h2 className="font-brand font-bold text-2xl sm:text-3xl text-white">
              Featured Flagship Mobiles
            </h2>
          </div>
          <button
            onClick={() => onNavigateToShop()}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#181924] border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500 hover:text-black transition"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenProductDetails}
            />
          ))}
        </div>
      </section>

      {/* 4. Special Offers & Discounts Promo Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 bg-gradient-to-r from-[#1b1c28] via-[#141520] to-[#0c0d14] p-8 lg:p-12 shadow-2xl">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>Special Promotion • Budhni Exclusive</span>
              </div>
              <h2 className="font-brand font-black text-3xl sm:text-4xl text-white leading-tight">
                Discounted Deals on{' '}
                <span className="gold-gradient-text">iPhone, Samsung & Flagship Audio</span>
              </h2>
              <p className="text-sm text-gray-300 max-w-xl">
                Get up to 15% instant discount on box-packed smartphones, GaN fast chargers, and original AirPods at Ahmad Mobile Zone. Every unit is guaranteed 100% authentic with shop guarantee.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onNavigateToShop()}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg transition active:scale-95"
                >
                  View Discounted Mobiles
                </button>
                <a
                  href="https://wa.me/923139172091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Claim Deal via WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0d0e14]/90 border border-amber-500/30 rounded-2xl p-5 text-center space-y-3">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                Shop Location
              </span>
              <div className="text-sm font-semibold text-white flex items-center justify-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Budhni, Peshawar, Pakistan
              </div>
              <div className="text-xs text-gray-400">
                Main Bazar Budhni, Charsadda Road
              </div>
              <div className="pt-2 border-t border-gray-800 text-xs font-mono text-emerald-400 font-bold">
                WhatsApp: 0313-9172091
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Latest Mobiles & Best Prices Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Genuine Box Packs</span>
            </div>
            <h2 className="font-brand font-bold text-2xl sm:text-3xl text-white">
              Latest Mobiles & Best Prices
            </h2>
          </div>
          <button
            onClick={() => onNavigateToShop()}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestMobiles.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenProductDetails}
            />
          ))}
        </div>
      </section>

      {/* 6. Customer Trust & Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 lg:p-12 rounded-3xl bg-[#0f1016] border border-amber-500/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-brand font-bold text-2xl sm:text-3xl text-white">
              Why Peshawar Trusts Ahmad Mobile Zone
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              We uphold the highest standard of customer care, genuine device guarantees, and transparent pricing in Khyber Pakhtunkhwa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#141520] border border-gray-800 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-white mb-2">100% Genuine & PTA Approved</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every smartphone is authentic with official PTA verification and genuine brand serials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141520] border border-gray-800 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-white mb-2">Budhni Physical Showroom</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Visit our physical store in Budhni, Peshawar to inspect devices in person with transparent unboxing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141520] border border-gray-800 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-white mb-2">Fast Cash on Delivery</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Express same-day delivery across Peshawar and reliable courier dispatch to all districts of KPK and Pakistan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141520] border border-gray-800 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-white mb-2">Direct Owner WhatsApp</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Instant quotes, price negotiation, and order tracking on WhatsApp with shop owner (+92 313 9172091).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Showroom Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111219] rounded-3xl p-6 sm:p-10 border border-amber-500/20">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
              In-Person Shopping Experience
            </span>
            <h2 className="font-brand font-bold text-2xl sm:text-3xl text-white">
              Visit Our Shop in Budhni, Peshawar
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Prefer testing a phone before buying? Drop by Ahmad Mobile Zone located at Main Bazar Budhni, Charsadda Road, Peshawar. We assist with data transfer, UV tempered glass installation, and official warranty registration.
            </p>
            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Mon-Sat: 9:00 AM - 10:30 PM | Sun: 2:00 PM - 9:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Hotline: 0313-9172091</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-black/60 flex items-center justify-center p-2 sm:p-3">
            <img
              src="/assets/aistudio/IMG_20261104_203114_315_13c6ecd4.png"
              alt="Ahmad Mobile Zone Physical Storefront in Budhni, Peshawar"
              className="w-full h-auto max-h-[580px] object-contain rounded-xl hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

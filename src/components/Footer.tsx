import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  Heart
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WHATSAPP_DISPLAY, createInquiryWhatsAppUrl } from '../utils/whatsapp';
import { CATEGORIES_LIST } from '../data/initialData';

interface FooterProps {
  onNavigate: (tabId: string, category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#070709] border-t border-amber-500/20 text-gray-400 text-xs mt-20">
      {/* Upper Footer: Value Highlights */}
      <div className="border-b border-gray-800/80 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-xs block">100% Genuine Box-Pack</span>
              <span className="text-[11px] text-gray-500">PTA approved & official warranty</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-xs block">Physical Shop in Budhni</span>
              <span className="text-[11px] text-gray-500">Inspect & unbox before paying</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-xs block">WhatsApp Quick Dispatch</span>
              <span className="text-[11px] text-gray-500">{WHATSAPP_DISPLAY}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-xs block">7 Days Working</span>
              <span className="text-[11px] text-gray-500">Mon-Sat 9am-10:30pm | Sun 2pm-9:30pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" onClick={() => onNavigate('home')} />
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Ahmad Mobile Zone is Budhni, Peshawar’s premier smartphone retailer. Providing genuine pin-pack Apple iPhones, Samsung Galaxy, Xiaomi, and high-performance mobile accessories with official Pakistani warranty.
            </p>
            <div className="pt-2 text-xs space-y-2">
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Main Bazar Budhni, Charsadda Road, Peshawar, KPK, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="font-brand font-bold text-white text-sm uppercase tracking-wider mb-3">
              Mobiles & Brands
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_LIST.slice(0, 6).map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => onNavigate('shop', cat.name)}
                    className="hover:text-amber-300 transition text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Accessories & Tech */}
          <div>
            <h4 className="font-brand font-bold text-white text-sm uppercase tracking-wider mb-3">
              Accessories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_LIST.slice(6).map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => onNavigate('shop', cat.name)}
                    className="hover:text-amber-300 transition text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Quick Links & Admin */}
          <div>
            <h4 className="font-brand font-bold text-white text-sm uppercase tracking-wider mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-300 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-amber-300 transition">
                  Shop All Mobiles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-amber-300 transition">
                  Special Offers & Deals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-300 transition">
                  About Ahmad Mobile Zone
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-300 transition">
                  Contact & Budhni Location
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('admin')}
                  className="px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-black font-semibold transition"
                >
                  Admin Portal Login
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} Ahmad Mobile Zone. All Rights Reserved. Budhni, Peshawar, Pakistan.
          </div>
          <div className="flex items-center gap-4">
            <span>PTA Cleared Devices</span>
            <span>•</span>
            <span>Official Brand Warranties</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

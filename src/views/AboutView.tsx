import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Award, 
  HeartHandshake, 
  CheckCircle2,
  Users
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { WHATSAPP_DISPLAY, createInquiryWhatsAppUrl } from '../utils/whatsapp';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn space-y-16">
      
      {/* Brand Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <BrandLogo size="lg" className="mx-auto justify-center" />
        
        <h1 className="font-brand font-black text-3xl sm:text-5xl text-white pt-4">
          Peshawar’s Trusted Flagship Mobile Destination
        </h1>
        
        <p className="text-base text-gray-300 leading-relaxed font-normal">
          Located in Budhni, Peshawar, <strong>Ahmad Mobile Zone</strong> has established a gold standard for authenticity, premium customer experience, and verified brand-warranty mobile phones across Khyber Pakhtunkhwa.
        </p>
      </div>

      {/* Showroom Image + Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#101117] border border-amber-500/20 rounded-3xl p-6 sm:p-10">
        <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
          <img
            src="/assets/aistudio/IMG_20261104_203114_315_13c6ecd4.png"
            alt="Ahmad Mobile Zone Official Storefront & Showroom in Budhni, Peshawar"
            className="w-full max-h-[480px] object-cover object-top hover:scale-105 transition-transform duration-500 rounded-xl"
          />
        </div>

        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Our Founding Commitment</span>
          </div>

          <h2 className="font-brand font-bold text-2xl sm:text-3xl text-white">
            Genuine Technology, Transparent Advice, Lifetime Trust
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            In an era of counterfeit parts and unverified smartphone imports, Ahmad Mobile Zone was established in Budhni with a singular mission: to provide the local community and Peshawar tech enthusiasts with 100% genuine, PTA-approved, box-packed smartphones backed by legitimate manufacturer warranties.
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            Whether you are upgrading to the latest Apple iPhone Pro Max, securing a Samsung Galaxy Ultra for business, or finding the most capable budget device from Infinix or Xiaomi, our team provides honest advice and complete unboxing transparency.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2 text-amber-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Counterfeits Policy</span>
            </div>
            <div className="flex items-center gap-2 text-amber-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official PTA & Tax Cleared</span>
            </div>
            <div className="flex items-center gap-2 text-amber-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp Owner Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-[#141520] border border-gray-800 hover:border-amber-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-brand font-bold text-lg text-white mb-2">Authentic Warranty</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            We partner with official distributors across Pakistan (Airlink, Muller & Phipps, Core, Carlcare) so your warranty is valid anywhere in the country.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#141520] border border-gray-800 hover:border-amber-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-brand font-bold text-lg text-white mb-2">Personalized Service</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Every customer receives individualized attention. We assist with phone setup, Apple ID configuration, Android data transfer, and glass protection.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#141520] border border-gray-800 hover:border-amber-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-brand font-bold text-lg text-white mb-2">Instant Communication</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            No endless queues. Chat directly with the shop owner on WhatsApp at +92 313 9172091 for stock availability, live photos, and fastest order processing.
          </p>
        </div>
      </div>

      {/* Shop Address & Visit Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#171824] to-[#0e0f16] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
            Visit Our Budhni Store
          </span>
          <h3 className="font-brand font-bold text-2xl text-white">
            Ready to Upgrade Your Phone?
          </h3>
          <p className="text-xs text-gray-400">
            Main Bazar Budhni, Charsadda Road, Peshawar, KPK • Open Monday to Saturday
          </p>
        </div>

        <a
          href={createInquiryWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl flex items-center gap-2 active:scale-95 transition"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

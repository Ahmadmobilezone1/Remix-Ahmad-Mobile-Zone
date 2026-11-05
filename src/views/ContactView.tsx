import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Mail, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Store,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { WHATSAPP_DISPLAY, WHATSAPP_INTL, createInquiryWhatsAppUrl } from '../utils/whatsapp';

export const ContactView: React.FC = () => {
  const { settings } = useShop();

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryDevice, setInquiryDevice] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const handleSendWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      'Assalam-o-Alaikum Ahmad Mobile Zone!',
      '',
      'I am reaching out via your website contact page.',
      `Name: ${inquiryName || 'Customer'}`,
      `Phone: ${inquiryPhone || 'Not provided'}`,
      inquiryDevice ? `Inquiring about: ${inquiryDevice}` : '',
      '',
      `Message: ${inquiryMessage || 'Hello, I would like to know more about current stock and pricing in your Budhni store.'}`,
      '',
      'Thank you!'
    ].filter(Boolean);

    const url = `https://wa.me/923139172091?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Store className="w-3.5 h-3.5" />
          <span>Budhni, Peshawar, Pakistan</span>
        </div>
        <h1 className="font-brand font-bold text-3xl sm:text-4xl text-white">
          Contact Ahmad Mobile Zone
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Reach out for mobile pricing inquiries, wholesale deals, or visit our physical showroom on Charsadda Road, Peshawar.
        </p>
      </div>

      {/* 3 Contact Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* WhatsApp Card */}
        <div className="p-6 rounded-3xl bg-[#12131d] border border-emerald-500/30 hover:border-emerald-400 transition flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 fill-emerald-400" />
            </div>
            <div>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Official WhatsApp</span>
              <span className="font-bold text-white text-lg">{WHATSAPP_DISPLAY}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Instant mobile phone availability, price quotations, and order confirmation directly from the shop owner.
          </p>
          <a
            href="https://wa.me/923139172091"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Phone Call Card */}
        <div className="p-6 rounded-3xl bg-[#12131d] border border-amber-500/30 hover:border-amber-400 transition flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Phone Contact</span>
              <span className="font-bold text-white text-lg">{WHATSAPP_INTL}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Direct telephonic inquiries for urgent store pickup arrangements and PTA verification inquiries.
          </p>
          <a
            href="tel:+923139172091"
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
          >
            <Phone className="w-4 h-4" />
            <span>Call Shop Now</span>
          </a>
        </div>

        {/* Location Card */}
        <div className="p-6 rounded-3xl bg-[#12131d] border border-gray-800 hover:border-amber-500/40 transition flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block">Showroom Location</span>
              <span className="font-bold text-white text-base">Budhni, Peshawar</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            {settings.address || 'Main Bazar Budhni, Charsadda Road, Peshawar, Khyber Pakhtunkhwa, Pakistan'}
          </p>
          <a
            href={settings.googleMapsUrl || 'https://maps.google.com/?q=Budhni+Peshawar+Pakistan'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-[#1c1d29] hover:bg-[#252738] text-white font-bold text-xs flex items-center justify-center gap-2 border border-gray-700 transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open in Google Maps</span>
          </a>
        </div>

      </div>

      {/* Main Grid: Contact Form + Business Hours & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#101117] border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-brand font-bold text-2xl text-white">Send Direct Inquiry</h2>
            <p className="text-xs text-gray-400 mt-1">
              Fill in your details and message to generate a tailored WhatsApp inquiry to Ahmad Mobile Zone.
            </p>
          </div>

          <form onSubmit={handleSendWhatsAppInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zubair Khan"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161722] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="03XX-XXXXXXX"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161722] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Model of Interest (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. iPhone 16 Pro Max 256GB / Samsung S24 Ultra"
                value={inquiryDevice}
                onChange={(e) => setInquiryDevice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161722] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Your Inquiry / Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Write your question regarding price, color availability, or pickup timing..."
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161722] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send Message via WhatsApp</span>
            </button>
          </form>
        </div>

        {/* Business Hours & Map Section */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Business Hours Box (Owner-editable in admin!) */}
          <div className="bg-[#101117] border border-amber-500/20 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-brand font-bold text-base">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Shop Business Hours</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-800">
                <span className="text-gray-400">Monday – Thursday:</span>
                <span className="text-white font-semibold">9:00 AM – 10:30 PM</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800">
                <span className="text-gray-400">Friday:</span>
                <span className="text-white font-semibold">9:00 AM – 12:30 PM & 2:30 PM – 11:00 PM</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800">
                <span className="text-gray-400">Saturday:</span>
                <span className="text-white font-semibold">9:00 AM – 10:30 PM</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-400">Sunday:</span>
                <span className="text-amber-400 font-semibold">2:00 PM – 9:30 PM</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 italic pt-1">
              * Shop hours can be updated by the store owner anytime through the Admin Dashboard.
            </p>
          </div>

          {/* Interactive Google Maps Section */}
          <div className="bg-[#101117] border border-amber-500/20 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-brand font-bold text-base">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Google Maps Location</span>
              </div>
              <a
                href={settings.googleMapsUrl || 'https://maps.google.com/?q=Budhni+Peshawar+Pakistan'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Maps iFrame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border border-gray-800 relative bg-[#181924]">
              <iframe
                title="Ahmad Mobile Zone Location Map"
                src="https://maps.google.com/maps?q=Budhni,Peshawar,Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter contrast-125 brightness-90"
              />
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <div className="text-white font-semibold">Ahmad Mobile Zone</div>
              <div>Main Bazar Budhni, Charsadda Road, Peshawar, KPK</div>
              <div className="text-emerald-400 text-[11px]">Free customer parking available in bazar</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

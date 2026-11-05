import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_DISPLAY, createInquiryWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 select-none">
      {/* Floating Prompt Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 p-3 bg-[#111219] border border-amber-500/40 rounded-2xl shadow-2xl text-xs text-white max-w-xs animate-fadeIn">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <div className="flex-1">
            <span className="font-bold text-amber-300 block">Ahmad Mobile Zone</span>
            <span className="text-gray-300 text-[11px]">Chat on WhatsApp: {WHATSAPP_DISPLAY}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="p-1 text-gray-400 hover:text-white"
            aria-label="Dismiss chat prompt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={createInquiryWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_8px_25px_rgba(16,185,129,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-emerald-400/40"
        aria-label="Chat with Ahmad Mobile Zone on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-black" />
        <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
      </a>
    </div>
  );
};

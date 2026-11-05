import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  User,
  MapPin,
  Clock
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useShop } from '../context/ShopContext';
import { WHATSAPP_DISPLAY, createInquiryWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
}) => {
  const { cartCount, setCartOpen, isAdmin, currentUser } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Mobiles' },
    { id: 'categories', label: 'Categories' },
    { id: 'offers', label: 'Special Offers' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080a]/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl transition-all">
      {/* Top Golden Micro-Banner */}
      <div className="bg-gradient-to-r from-black via-[#1c180e] to-black border-b border-amber-500/20 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-gray-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Budhni, Peshawar, Pakistan
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:flex items-center gap-1 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Mon-Sat: 9 AM - 10:30 PM
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:flex items-center gap-1.5 text-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              100% Genuine PTA Approved & Pin-Pack Mobiles
            </span>
            
            <a
              href={createInquiryWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 font-medium transition"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp: <strong>{WHATSAPP_DISPLAY}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="shrink-0">
            <BrandLogo
              size="md"
              onClick={() => handleNavClick('home')}
            />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4 relative">
            <div className={`w-full flex items-center bg-[#12131a] rounded-full border px-4 py-2 transition-all ${
              searchFocused ? 'border-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.25)]' : 'border-gray-800 hover:border-amber-500/40'
            }`}>
              <Search className="w-4 h-4 text-amber-400/80 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Search iPhone, Samsung, Xiaomi, Accessories..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentTab !== 'shop') setCurrentTab('shop');
                }}
                className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-gray-400 hover:text-white ml-2 p-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentTab === item.id
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                    : 'text-gray-300 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions: Admin Button, WhatsApp Order, Cart */}
          <div className="flex items-center gap-2.5">
            {/* Admin Dashboard shortcut button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                currentTab === 'admin'
                  ? 'bg-amber-500 text-black border-amber-400'
                  : isAdmin
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25'
                  : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-gray-200 hover:border-gray-700'
              }`}
              title="Admin Portal"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAdmin ? 'Admin Panel' : 'Admin'}</span>
            </button>

            {/* Direct WhatsApp Call/Chat Button */}
            <a
              href="https://wa.me/923139172091"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-emerald-600/30 transition transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order WhatsApp</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#161720] border border-amber-500/30 hover:border-amber-400 text-amber-400 transition hover:scale-105 active:scale-95"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center text-[10px] font-black bg-gradient-to-r from-amber-500 to-yellow-400 text-black rounded-full shadow-lg border border-black animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="lg:hidden pb-3">
          <div className="w-full flex items-center bg-[#12131a] rounded-full border border-gray-800 px-3.5 py-2">
            <Search className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search mobiles, iPhone, accessories..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentTab !== 'shop') setCurrentTab('shop');
              }}
              className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0d0e14] border-b border-amber-500/30 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  currentTab === item.id
                    ? 'text-amber-400 bg-amber-500/15 border border-amber-500/30 font-bold'
                    : 'text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-800 flex flex-col gap-2">
            <a
              href="https://wa.me/923139172091"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Chat on WhatsApp (+92 313 9172091)
            </a>

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#1a1b24] text-amber-300 border border-amber-500/30 text-xs font-semibold"
            >
              <User className="w-4 h-4 text-amber-400" />
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

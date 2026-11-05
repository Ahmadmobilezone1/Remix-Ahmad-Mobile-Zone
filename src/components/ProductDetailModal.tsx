import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Sparkles,
  Phone
} from 'lucide-react';
import { Product } from '../types';
import { formatPKR, createSingleProductWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';
import { useShop } from '../context/ShopContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product ? (product.colorsAvailable?.[0] || product.color) : ''
  );
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(
    product ? (product.storageAvailable?.[0] || (product.storage !== 'N/A' ? product.storage : undefined)) : undefined
  );
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [showDirectFields, setShowDirectFields] = useState(false);

  React.useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedColor(product.colorsAvailable?.[0] || product.color || '');
      setSelectedStorage(product.storageAvailable?.[0] || (product.storage !== 'N/A' ? product.storage : undefined));
    }
  }, [product]);

  if (!product) return null;

  const totalPrice = product.price * quantity;

  const handleWhatsAppOrder = () => {
    const url = createSingleProductWhatsAppUrl(
      product,
      quantity,
      selectedColor,
      selectedStorage,
      customerName.trim() || undefined,
      customerAddress.trim() || undefined
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#101117] border border-amber-500/40 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden my-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-gray-700 text-gray-300 hover:text-white hover:border-amber-400 transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Product Image & Badges */}
          <div className="p-8 bg-gradient-to-b from-[#181924] to-[#0d0e14] flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-gray-800">
            <div className="w-full flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                {product.brand} Official
              </span>
              {product.discount > 0 && (
                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Main Image */}
            <div className="py-8 w-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-amber-400/10 blur-2xl rounded-full" />
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-72 w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative z-10"
              />
            </div>

            {/* Trust Assurance */}
            <div className="w-full grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-black/40 border border-gray-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-gray-300 text-[11px] text-left">100% Genuine Box Pack</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-gray-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-gray-300 text-[11px] text-left">Pickup at Budhni Shop</span>
              </div>
            </div>
          </div>

          {/* Right Column: Spec Configurator & Order Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Product Title */}
              <div className="text-xs text-amber-400 font-semibold tracking-wider uppercase mb-1">
                {product.category}
              </div>
              <h2 className="font-sans font-extrabold text-2xl text-white mb-2">
                {product.name}
              </h2>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 mb-4 p-3 rounded-2xl bg-[#171822] border border-amber-500/20">
                <div className="font-brand font-black text-2xl gold-gradient-text">
                  {formatPKR(product.price)}
                </div>
                {product.originalPrice > product.price && (
                  <div className="text-sm text-gray-500 line-through">
                    {formatPKR(product.originalPrice)}
                  </div>
                )}
                {product.ptaStatus && (
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
                    {product.ptaStatus}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colorsAvailable && product.colorsAvailable.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Select Color: <span className="text-amber-400 font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colorsAvailable.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                          selectedColor === color
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                            : 'bg-[#181924] border-gray-700 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Selection */}
              {product.storageAvailable && product.storageAvailable.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Select Storage: <span className="text-amber-400 font-normal">{selectedStorage}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.storageAvailable.map((storage) => (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(storage)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                          selectedStorage === storage
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                            : 'bg-[#181924] border-gray-700 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#14151f] border border-gray-800 text-xs mb-5">
                {product.ram && product.ram !== 'N/A' && (
                  <div>
                    <span className="text-gray-500 block">RAM</span>
                    <span className="text-gray-200 font-semibold">{product.ram}</span>
                  </div>
                )}
                {product.storage && product.storage !== 'N/A' && (
                  <div>
                    <span className="text-gray-500 block">Default Storage</span>
                    <span className="text-gray-200 font-semibold">{product.storage}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500 block">Warranty</span>
                  <span className="text-gray-200 font-semibold">{product.warranty || 'Official Brand Warranty'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Stock Status</span>
                  <span className="text-emerald-400 font-semibold capitalize">{product.stock.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Optional Quick Name & Address for WhatsApp */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setShowDirectFields(!showDirectFields)}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-medium flex items-center gap-1"
                >
                  {showDirectFields ? 'Hide delivery details' : '+ Add your name and delivery address to WhatsApp order message'}
                </button>

                {showDirectFields && (
                  <div className="mt-2.5 space-y-2 p-3 rounded-xl bg-black/40 border border-gray-800 animate-fadeIn">
                    <input
                      type="text"
                      placeholder="Your Full Name (e.g., Zubair Khan)"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#1a1b24] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="text"
                      placeholder="Delivery Address or Peshawar Pickup (optional)"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#1a1b24] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-4 border-t border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-300">Quantity:</span>
                  <div className="flex items-center bg-[#181924] border border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-sm font-bold text-white min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Total Price:</span>
                  <span className="font-brand font-bold text-xl gold-gradient-text">
                    {formatPKR(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-[#1b1c28] hover:bg-amber-500 hover:text-black text-amber-300 border border-amber-500/40 transition active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Shopping Cart</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-700/30 transition active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5 pt-1">
                <span>Direct WhatsApp Hotline: <strong>{WHATSAPP_DISPLAY}</strong></span>
                <span>• Orders verified by shop owner before dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

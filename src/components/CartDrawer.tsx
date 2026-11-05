import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPKR, createCartWhatsAppUrl } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    cartOpen, 
    setCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    cartSubtotal, 
    cartCount,
    setCheckoutModalOpen
  } = useShop();

  if (!cartOpen) return null;

  const deliveryFee = cartSubtotal > 50000 || cartSubtotal === 0 ? 0 : 500;
  const totalAmount = cartSubtotal + deliveryFee;

  const handleProceedToCheckout = () => {
    setCartOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleInstantWhatsAppCart = () => {
    const url = createCartWhatsAppUrl(
      cart,
      cartSubtotal,
      deliveryFee,
      totalAmount,
      'Customer (Website Cart)',
      'Via WhatsApp',
      'Peshawar',
      'Budhni Shop / Delivery',
      'Cash on Delivery / Pickup'
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="absolute inset-0" 
        onClick={() => setCartOpen(false)}
        aria-hidden="true" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f1016] border-l border-amber-500/30 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-800 bg-[#14151f] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-brand font-bold text-lg text-white">Your Shopping Cart</h2>
                <span className="text-xs text-amber-400">{cartCount} items selected</span>
              </div>
            </div>

            <button
              onClick={() => setCartOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400/60">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-brand font-bold text-lg text-white mb-1">Your Cart is Empty</h3>
                <p className="text-sm text-gray-400 max-w-xs mb-6">
                  Browse our genuine smartphones and luxury accessories with official warranty in Budhni, Peshawar.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-lg transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-gray-800/80">
                  <span>Selected Products</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium transition"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear All
                  </button>
                </div>

                {cart.map((item, index) => {
                  const itemKey = `${item.product.id}-${item.selectedColor}-${item.selectedStorage}-${index}`;
                  return (
                    <div
                      key={itemKey}
                      className="p-3.5 rounded-2xl bg-[#14151e] border border-gray-800/80 hover:border-amber-500/30 flex gap-3 transition"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain bg-[#1c1d29] rounded-xl p-1.5 shrink-0 border border-gray-800"
                      />

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <h4 className="text-xs font-bold text-white truncate max-w-[170px]">
                              {item.product.name}
                            </h4>
                            <div className="flex flex-wrap gap-1 mt-0.5 text-[10px] text-gray-400">
                              {item.selectedColor && (
                                <span className="text-amber-400/90">{item.selectedColor}</span>
                              )}
                              {item.selectedStorage && (
                                <span>• {item.selectedStorage}</span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedStorage)}
                            className="text-gray-500 hover:text-rose-400 p-1"
                            title="Remove product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-brand font-bold text-xs gold-gradient-text">
                            {formatPKR(item.product.price * item.quantity)}
                          </span>

                          <div className="flex items-center bg-[#1c1d29] border border-gray-700 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateCartQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedColor,
                                item.selectedStorage
                              )}
                              className="px-2 py-1 text-gray-400 hover:text-white transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-white min-w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedStorage
                              )}
                              className="px-2 py-1 text-gray-400 hover:text-white transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-800 bg-[#12131b] space-y-3">
              {/* Pricing breakdown */}
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="font-semibold text-white">{formatPKR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Peshawar Delivery / Pickup:</span>
                  <span className="font-semibold text-emerald-400">
                    {deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-800 font-bold text-sm text-white">
                  <span>Estimated Total:</span>
                  <span className="font-brand font-bold gold-gradient-text text-base">
                    {formatPKR(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95 transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleInstantWhatsAppCart}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Send Cart Directly to WhatsApp</span>
                </button>
              </div>

              <div className="text-center text-[10px] text-gray-500 pt-1">
                Ahmad Mobile Zone • Budhni, Peshawar • Cash on Delivery / Shop Pickup
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MessageCircle, 
  Truck, 
  Store, 
  ShieldCheck, 
  MapPin, 
  Phone,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPKR, createCartWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartSubtotal, clearCart, placeOrder } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Peshawar');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'Store Pickup (Budhni, Peshawar)' | 'Peshawar Express Delivery' | 'Nationwide Delivery (Cash on Delivery)'>('Store Pickup (Budhni, Peshawar)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const deliveryFee = deliveryMethod === 'Store Pickup (Budhni, Peshawar)' ? 0 : 500;
  const totalAmount = cartSubtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        storage: item.selectedStorage,
        imageUrl: item.product.imageUrl,
      }));

      // Place order in system / Firestore
      const savedOrder = await placeOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerCity: customerCity.trim(),
        customerAddress: customerAddress.trim() || 'Store Pickup (Budhni, Peshawar)',
        deliveryMethod,
        items: orderItems,
        subtotal: cartSubtotal,
        deliveryFee,
        totalAmount,
        status: 'pending',
        notes: notes.trim(),
        whatsappSent: true,
      });

      // Prepare WhatsApp message URL
      const whatsappUrl = createCartWhatsAppUrl(
        cart,
        cartSubtotal,
        deliveryFee,
        totalAmount,
        customerName.trim(),
        customerPhone.trim(),
        customerCity.trim(),
        customerAddress.trim() || 'Budhni Shop Pickup',
        deliveryMethod
      );

      // Open WhatsApp
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Clear cart
      clearCart();
      setCompletedOrder(savedOrder);
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#111219] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800 bg-[#161722] flex items-center justify-between">
          <div>
            <h2 className="font-brand font-bold text-xl text-white">
              {completedOrder ? 'Order Request Placed!' : 'Complete Your Mobile Order'}
            </h2>
            <p className="text-xs text-amber-400 mt-0.5">
              Ahmad Mobile Zone • Budhni, Peshawar
            </p>
          </div>

          <button
            onClick={handleCloseAndReset}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                Order ID: #{completedOrder.id}
              </span>
              <h3 className="font-brand font-bold text-2xl text-white mt-3">
                Assalam-o-Alaikum, {completedOrder.customerName}!
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto mt-2 leading-relaxed">
                Your order details have been prepared for Ahmad Mobile Zone. 
                <span className="block text-amber-400 font-semibold mt-1">
                  Note: An order is confirmed once verified by the shop owner at Budhni, Peshawar.
                </span>
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-[#171824] border border-gray-800 rounded-2xl p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between text-gray-400">
                <span>Total Amount:</span>
                <span className="font-brand font-bold text-sm gold-gradient-text">{formatPKR(completedOrder.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Contact Phone:</span>
                <span className="text-white font-medium">{completedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Method:</span>
                <span className="text-white font-medium">{completedOrder.deliveryMethod}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Status:</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase text-[10px]">
                  Pending Owner Confirmation
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={createCartWhatsAppUrl(
                  completedOrder.items.map(item => ({
                    product: { id: item.productId, name: item.name, price: item.price } as any,
                    quantity: item.quantity,
                    selectedColor: item.color,
                    selectedStorage: item.storage
                  })),
                  completedOrder.subtotal,
                  completedOrder.deliveryFee,
                  completedOrder.totalAmount,
                  completedOrder.customerName,
                  completedOrder.customerPhone,
                  completedOrder.customerCity,
                  completedOrder.customerAddress,
                  completedOrder.deliveryMethod
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Reopen WhatsApp Chat</span>
              </a>

              <button
                onClick={handleCloseAndReset}
                className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-sm transition"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            {/* Cart Mini Summary */}
            <div className="p-4 rounded-2xl bg-[#171824] border border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block">Total Items in Cart:</span>
                <span className="text-sm font-bold text-white">{cart.length} item(s)</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 block">Payable Amount:</span>
                <span className="font-brand font-bold text-lg gold-gradient-text">{formatPKR(totalAmount)}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5" />
                Customer & Delivery Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Your Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zubair Khan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#191a26] border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    WhatsApp / Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0313-9172091"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#191a26] border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Peshawar, Mardan, Charsadda, etc."
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#191a26] border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Delivery Method
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#191a26] border border-gray-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Store Pickup (Budhni, Peshawar)">Store Pickup (Budhni, Peshawar) - FREE</option>
                    <option value="Peshawar Express Delivery">Peshawar Express Delivery</option>
                    <option value="Nationwide Delivery (Cash on Delivery)">Cash on Delivery (KPK & Pakistan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Complete Address (or Landmark in Budhni/Peshawar)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Near Main Bazar Budhni, Charsadda Road, Peshawar"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#191a26] border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Special Instructions or Timing
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please check box seal before dispatch"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#191a26] border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Notice */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block">WhatsApp Order Dispatch Protocol:</span>
                Clicking the button below records your order securely and forwards the formatted list directly to Ahmad Mobile Zone WhatsApp (<strong>{WHATSAPP_DISPLAY}</strong>) for instant owner verification.
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 px-6 rounded-2xl font-bold text-base bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white shadow-xl shadow-emerald-700/30 flex items-center justify-center gap-3 transition transform active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>
                  {isSubmitting ? 'Preparing WhatsApp Order...' : 'Confirm & Send Order via WhatsApp'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import { CartItem, Product } from '../types';

export const WHATSAPP_PHONE_RAW = '923139172091';
export const WHATSAPP_DISPLAY = '0313-9172091';
export const WHATSAPP_INTL = '+92 313 9172091';

export function formatPKR(amount: number): string {
  return 'PKR ' + Number(amount || 0).toLocaleString('en-PK');
}

/**
 * Creates WhatsApp URL for ordering a single product directly
 */
export function createSingleProductWhatsAppUrl(
  product: Product,
  quantity = 1,
  selectedColor?: string,
  selectedStorage?: string,
  customerName?: string,
  customerAddress?: string
): string {
  const itemTotal = product.price * quantity;
  const specDetails = [
    selectedColor || product.color,
    selectedStorage || (product.storage !== 'N/A' ? product.storage : ''),
  ].filter(Boolean).join(' / ');

  const textLines = [
    'Assalam-o-Alaikum Ahmad Mobile Zone!',
    '',
    'I want to place an order.',
    '',
    `Product: ${product.name}${specDetails ? ` (${specDetails})` : ''}`,
    `Quantity: ${quantity}`,
    `Price: ${formatPKR(product.price)}`,
    '',
    `Total: ${formatPKR(itemTotal)}`,
  ];

  if (customerName) {
    textLines.push(`Customer Name: ${customerName}`);
  }
  if (customerAddress) {
    textLines.push(`Delivery Address: ${customerAddress}`);
  }

  textLines.push(
    '',
    'Please confirm availability and delivery details.',
    '',
    'Thank you!'
  );

  const message = encodeURIComponent(textLines.join('\n'));
  return `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${message}`;
}

/**
 * Creates WhatsApp URL for entire shopping cart checkout
 */
export function createCartWhatsAppUrl(
  items: CartItem[],
  subtotal: number,
  deliveryFee: number,
  total: number,
  customerName: string,
  customerPhone: string,
  customerCity: string,
  customerAddress: string,
  deliveryMethod: string
): string {
  const itemsText = items.map((item, idx) => {
    const specs = [item.selectedColor, item.selectedStorage].filter(Boolean).join(', ');
    return `${idx + 1}. Product: ${item.product.name}${specs ? ` [${specs}]` : ''}\n   Quantity: ${item.quantity}\n   Price: ${formatPKR(item.product.price)} each (Sub: ${formatPKR(item.product.price * item.quantity)})`;
  }).join('\n\n');

  const textLines = [
    'Assalam-o-Alaikum Ahmad Mobile Zone!',
    '',
    'I want to place an order from your website.',
    '',
    '--- ORDER DETAILS ---',
    itemsText,
    '',
    '--- SUMMARY ---',
    `Subtotal: ${formatPKR(subtotal)}`,
    deliveryFee > 0 ? `Delivery Fee: ${formatPKR(deliveryFee)}` : 'Delivery: FREE / Store Pickup',
    `TOTAL AMOUNT: ${formatPKR(total)}`,
    '',
    '--- CUSTOMER DETAILS ---',
    `Customer Name: ${customerName}`,
    `Phone Number: ${customerPhone}`,
    `City: ${customerCity || 'Peshawar'}`,
    `Delivery Address: ${customerAddress || 'Budhni Shop Pickup'}`,
    `Delivery Method: ${deliveryMethod}`,
    '',
    'Please confirm availability, timing, and dispatch details.',
    '',
    'Thank you!'
  ];

  const message = encodeURIComponent(textLines.join('\n'));
  return `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${message}`;
}

/**
 * Creates generic WhatsApp inquiry link
 */
export function createInquiryWhatsAppUrl(query = ''): string {
  const text = query || 'Assalam-o-Alaikum Ahmad Mobile Zone! I am visiting your website and have an inquiry regarding mobile phones & deals at your Budhni, Peshawar shop.';
  return `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(text)}`;
}

/**
 * For admin: reply to customer directly on WhatsApp
 */
export function createAdminCustomerReplyWhatsAppUrl(
  customerPhone: string,
  orderId: string,
  customerName: string,
  status: string
): string {
  // Normalize phone number for Pakistani numbers (0313... -> 92313...)
  let cleanPhone = customerPhone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '92' + cleanPhone.substring(1);
  } else if (!cleanPhone.startsWith('92') && cleanPhone.length === 10) {
    cleanPhone = '92' + cleanPhone;
  }

  const message = encodeURIComponent(
    `Assalam-o-Alaikum ${customerName}! This is Ahmad Mobile Zone (Budhni, Peshawar). Regarding your Order #${orderId.substring(0, 8).toUpperCase()}, status is now: [${status.toUpperCase()}]. Thank you for choosing us!`
  );

  return `https://wa.me/${cleanPhone}?text=${message}`;
}

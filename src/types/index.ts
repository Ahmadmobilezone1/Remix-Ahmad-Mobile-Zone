export type ProductCategory = 
  | 'Apple iPhone'
  | 'Samsung'
  | 'Infinix'
  | 'Tecno'
  | 'Vivo'
  | 'Oppo'
  | 'Xiaomi'
  | 'Mobile Accessories'
  | 'Chargers'
  | 'Headphones'
  | 'Smart Watches';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory | string;
  price: number; // In PKR
  originalPrice: number; // In PKR
  discount: number; // Percentage
  ram: string; // e.g., '12GB', '8GB', 'N/A'
  storage: string; // e.g., '256GB', '512GB', 'N/A'
  color: string; // e.g., 'Natural Titanium', 'Gold'
  colorsAvailable?: string[];
  storageAvailable?: string[];
  description: string;
  stock: 'in_stock' | 'out_of_stock' | 'limited_stock';
  isStock: boolean;
  isFeatured: boolean;
  isSpecialOffer: boolean;
  imageUrl: string;
  ptaStatus?: 'PTA Approved' | 'Non-PTA' | 'Official Warranty';
  warranty?: string;
  isDemo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  storage?: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  deliveryMethod: 'Store Pickup (Budhni, Peshawar)' | 'Peshawar Express Delivery' | 'Nationwide Delivery (Cash on Delivery)';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  whatsappSent?: boolean;
}

export interface WebsiteSettings {
  shopName: string;
  tagline: string;
  location: string;
  address: string;
  whatsappNumber: string;
  displayPhone: string;
  businessHours: string;
  announcement: string;
  deliveryNotice: string;
  googleMapsUrl: string;
}

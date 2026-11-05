import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, WebsiteSettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/initialData';
import { 
  db, 
  auth, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  handleFirestoreError, 
  OperationType 
} from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signOut, 
  User 
} from 'firebase/auth';

interface ShopContextType {
  products: Product[];
  loadingProducts: boolean;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, storage?: string) => void;
  removeFromCart: (productId: string, color?: string, storage?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, color?: string, storage?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  checkoutModalOpen: boolean;
  setCheckoutModalOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => Promise<void>;
  
  // Product management
  addProduct: (product: Omit<Product, 'id'>) => Promise<string>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  resetCatalogToDemo: () => Promise<void>;
  
  // Orders
  orders: Order[];
  loadingOrders: boolean;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  
  // Admin Auth
  currentUser: User | null;
  isAdmin: boolean;
  isDemoAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  logoutAdmin: () => Promise<void>;
  enableDemoAdmin: () => void;
  disableDemoAdmin: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ahmad_mobile_zone_cart';
const LOCAL_PRODUCTS_KEY = 'ahmad_mobile_zone_products';
const LOCAL_ORDERS_KEY = 'ahmad_mobile_zone_orders';
const LOCAL_SETTINGS_KEY = 'ahmad_mobile_zone_settings';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cached products:', e);
    }
    return INITIAL_PRODUCTS;
  });
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cart from localStorage:', e);
    }
    return [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Settings state
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_SETTINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read settings from localStorage:', e);
    }
    return INITIAL_SETTINGS;
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cached orders:', e);
    }
    return [];
  });
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    return localStorage.getItem('ahmad_mobile_demo_admin') === 'true';
  });

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore products or fallback to local storage
  useEffect(() => {
    let isSubscribed = true;
    const productsCollectionRef = collection(db, 'products');

    const unsubscribe = onSnapshot(
      productsCollectionRef,
      (snapshot) => {
        if (!isSubscribed) return;
        if (!snapshot.empty) {
          const fetched: Product[] = [];
          snapshot.forEach((docSnap) => {
            fetched.push({ id: docSnap.id, ...docSnap.data() } as Product);
          });
          setProducts(fetched);
          localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(fetched));
        } else {
          // If Firestore is empty, use initial products
          setProducts((prev) => (prev.length > 0 ? prev : INITIAL_PRODUCTS));
        }
        setLoadingProducts(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'products');
        // Offline / fallback to cached/initial
        setLoadingProducts(false);
      }
    );

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  // Listen to Firestore orders when admin is logged in
  const isSuperAdminEmail = currentUser?.email === 'zubairkhan920859@gmail.com';
  const isAdmin = Boolean(currentUser || isDemoAdmin || isSuperAdminEmail);

  useEffect(() => {
    if (!isAdmin) return;
    setLoadingOrders(true);
    const ordersCol = collection(db, 'orders');

    const unsubscribe = onSnapshot(
      ordersCol,
      (snapshot) => {
        const fetched: Order[] = [];
        snapshot.forEach((docSnap) => {
          fetched.push({ id: docSnap.id, ...docSnap.data() } as Order);
        });
        // Sort newest first
        fetched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(fetched);
        localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(fetched));
        setLoadingOrders(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'orders');
        setLoadingOrders(false);
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string, storage?: string) => {
    const chosenColor = color || product.color;
    const chosenStorage = storage || (product.storage !== 'N/A' ? product.storage : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === chosenColor &&
          item.selectedStorage === chosenStorage
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedColor: chosenColor,
            selectedStorage: chosenStorage,
          },
        ];
      }
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string, color?: string, storage?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedStorage === storage
          )
      )
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, color?: string, storage?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, storage);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === color &&
          item.selectedStorage === storage
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Product management actions
  const addProduct = async (prodData: Omit<Product, 'id'>): Promise<string> => {
    const newId = 'prod-' + Date.now();
    const productWithId: Product = {
      ...prodData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Optimistically update local
    setProducts((prev) => [productWithId, ...prev]);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify([productWithId, ...products]));

    try {
      const docRef = await addDoc(collection(db, 'products'), productWithId);
      return docRef.id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'products');
      return newId;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );

    try {
      await updateDoc(doc(db, 'products', id), {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `products/${id}`);
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
    }
  };

  const resetCatalogToDemo = async (): Promise<void> => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  };

  // Orders
  const placeOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    const newId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      ...orderData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    // Update local state and cache
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updatedOrders));

    try {
      await addDoc(collection(db, 'orders'), newOrder);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'orders');
    }

    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const deleteOrder = async (orderId: string): Promise<void> => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `orders/${orderId}`);
    }
  };

  // Settings
  const updateSettings = async (newSettings: Partial<WebsiteSettings>): Promise<void> => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(updated));
    try {
      await updateDoc(doc(db, 'websiteSettings', 'general'), updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'websiteSettings/general');
    }
  };

  // Admin Auth functions
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const logoutAdmin = async () => {
    await signOut(auth);
    setIsDemoAdmin(false);
    localStorage.removeItem('ahmad_mobile_demo_admin');
  };

  const enableDemoAdmin = () => {
    setIsDemoAdmin(true);
    localStorage.setItem('ahmad_mobile_demo_admin', 'true');
  };

  const disableDemoAdmin = () => {
    setIsDemoAdmin(false);
    localStorage.removeItem('ahmad_mobile_demo_admin');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        loadingProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartOpen,
        setCartOpen,
        checkoutModalOpen,
        setCheckoutModalOpen,
        selectedProduct,
        setSelectedProduct,
        settings,
        updateSettings,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalogToDemo,
        orders,
        loadingOrders,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        currentUser,
        isAdmin,
        isDemoAdmin,
        loginWithGoogle,
        loginWithEmail,
        logoutAdmin,
        enableDemoAdmin,
        disableDemoAdmin,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

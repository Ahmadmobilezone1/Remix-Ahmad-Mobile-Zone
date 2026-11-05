import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Eye, 
  AlertTriangle,
  Lock,
  Mail,
  Key,
  RotateCcw,
  Check,
  UserCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, Order, ProductCategory } from '../types';
import { formatPKR, createAdminCustomerReplyWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';
import { CATEGORIES_LIST } from '../data/initialData';
import { BrandLogo } from '../components/BrandLogo';

export const AdminView: React.FC = () => {
  const { 
    isAdmin, 
    currentUser, 
    isDemoAdmin, 
    loginWithGoogle, 
    loginWithEmail, 
    logoutAdmin, 
    enableDemoAdmin, 
    disableDemoAdmin,
    products, 
    orders, 
    loadingOrders,
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetCatalogToDemo,
    updateOrderStatus, 
    deleteOrder,
    settings, 
    updateSettings 
  } = useShop();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'categories' | 'settings'>('overview');

  // Auth form state
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Product management modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    brand: 'Apple',
    category: 'Apple iPhone',
    price: 100000,
    originalPrice: 110000,
    discount: 0,
    ram: '8GB',
    storage: '256GB',
    color: 'Black',
    colorsAvailable: ['Black'],
    storageAvailable: ['256GB'],
    description: '',
    stock: 'in_stock',
    isStock: true,
    isFeatured: false,
    isSpecialOffer: false,
    imageUrl: '',
    ptaStatus: 'PTA Approved',
    warranty: '1 Year Official Warranty',
    isDemo: false,
  });

  // Search & filter in admin
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [selectedOrderForView, setSelectedOrderForView] = useState<Order | null>(null);

  // Settings form
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // Auth submission handlers
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      await loginWithEmail(authEmail.trim(), authPassword);
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Verify credentials or use Google Sign-in.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setAuthError('Google popup was closed or blocked. You can also use Demo Admin mode for immediate review.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      brand: 'Apple',
      category: 'Apple iPhone',
      price: 150000,
      originalPrice: 160000,
      discount: 6,
      ram: '8GB',
      storage: '256GB',
      color: 'Titanium Black',
      colorsAvailable: ['Titanium Black', 'Silver', 'Gold'],
      storageAvailable: ['128GB', '256GB'],
      description: 'Brand new box-packed smartphone with official PTA approval and warranty.',
      stock: 'in_stock',
      isStock: true,
      isFeatured: false,
      isSpecialOffer: false,
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      ptaStatus: 'PTA Approved',
      warranty: '1 Year Official Warranty',
      isDemo: false,
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({ ...prod });
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert('Please enter product name and price.');
      return;
    }

    const payload = {
      name: productForm.name,
      brand: productForm.brand || 'Other',
      category: productForm.category || 'Apple iPhone',
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice || productForm.price),
      discount: Number(productForm.discount || 0),
      ram: productForm.ram || 'N/A',
      storage: productForm.storage || 'N/A',
      color: productForm.color || 'Standard',
      colorsAvailable: productForm.colorsAvailable || [productForm.color || 'Standard'],
      storageAvailable: productForm.storageAvailable || [productForm.storage || 'Standard'],
      description: productForm.description || '',
      stock: (productForm.stock as any) || 'in_stock',
      isStock: productForm.stock !== 'out_of_stock',
      isFeatured: Boolean(productForm.isFeatured),
      isSpecialOffer: Boolean(productForm.isSpecialOffer),
      imageUrl: productForm.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      ptaStatus: productForm.ptaStatus || 'PTA Approved',
      warranty: productForm.warranty || 'Official Warranty',
      isDemo: false, // Owner items are real shop items!
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
    } else {
      await addProduct(payload);
    }

    setProductModalOpen(false);
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from Ahmad Mobile Zone catalog?`)) {
      await deleteProduct(id);
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(settingsForm);
    setSettingsSavedNotice(true);
    setTimeout(() => setSettingsSavedNotice(false), 3000);
  };

  // KPIs
  const totalProducts = products.length;
  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const confirmedOrders = orders.filter((o) => o.status === 'confirmed').length;
  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled').length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // If NOT authenticated as admin, render Login Gate
  if (!isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 py-12 animate-fadeIn">
        <div className="w-full max-w-md bg-[#111219] border border-amber-500/40 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <BrandLogo size="lg" variant="icon" />
            </div>
            <div>
              <h1 className="font-brand font-bold text-2xl text-white">
                Administrator Login
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Ahmad Mobile Zone • Budhni, Peshawar Management
              </p>
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Sign In (Primary OAuth) */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={authLoading}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs flex items-center justify-center gap-2.5 shadow-lg transition active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Sign in with Google Admin Account</span>
            </button>

            <div className="flex items-center gap-3 my-2 text-xs text-gray-500">
              <span className="flex-1 h-px bg-gray-800" />
              <span>or email & password</span>
              <span className="flex-1 h-px bg-gray-800" />
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="zubairkhan920859@gmail.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md transition active:scale-95"
              >
                {authLoading ? 'Verifying...' : 'Login with Credentials'}
              </button>
            </form>
          </div>

          {/* Safe Demo Admin Bypass */}
          <div className="pt-4 border-t border-gray-800 text-center space-y-2">
            <span className="text-[11px] text-gray-400 block">
              Testing or previewing in sandboxed iframe?
            </span>
            <button
              onClick={enableDemoAdmin}
              className="w-full py-2 rounded-xl bg-[#1c1d29] hover:bg-[#252737] text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Enter Demo Admin Mode</span>
            </button>
          </div>

          <div className="text-center text-[10px] text-gray-500">
            Authorized administrator: zubairkhan920859@gmail.com
          </div>
        </div>
      </div>
    );
  }

  // Filtered products in admin
  const adminFilteredProducts = products.filter((p) => {
    if (productCategoryFilter !== 'All' && p.category !== productCategoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered orders in admin
  const adminFilteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#12131d] border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-3.5">
          <BrandLogo variant="icon" size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-brand font-bold text-xl text-white">
                Ahmad Mobile Zone Admin Portal
              </h1>
              {isDemoAdmin && (
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase border border-amber-500/40">
                  Demo Mode
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">
              Logged in as: <strong className="text-amber-300">{currentUser?.email || 'Authorized Administrator'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetCatalogToDemo}
            className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Reset to default demo phones"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Catalog</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3.5 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'overview'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-[#151622] text-gray-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'products'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-[#151622] text-gray-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({totalProducts})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'orders'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-[#151622] text-gray-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({totalOrdersCount})</span>
          {pendingOrders > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-black">
              {pendingOrders}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'categories'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-[#151622] text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Categories ({CATEGORIES_LIST.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shrink-0 ${
            activeTab === 'settings'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-[#151622] text-gray-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Shop & Contact Settings</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            <div className="p-4 rounded-2xl bg-[#12131d] border border-amber-500/20">
              <span className="text-xs text-gray-400 block mb-1">Total Products</span>
              <span className="font-brand font-bold text-2xl text-white">{totalProducts}</span>
              <span className="text-[10px] text-amber-400 block mt-1">In Catalog</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#12131d] border border-amber-500/20">
              <span className="text-xs text-gray-400 block mb-1">Total Orders</span>
              <span className="font-brand font-bold text-2xl text-white">{totalOrdersCount}</span>
              <span className="text-[10px] text-gray-400 block mt-1">From Website</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#12131d] border border-amber-500/30">
              <span className="text-xs text-amber-400 block mb-1 font-semibold">Pending Orders</span>
              <span className="font-brand font-bold text-2xl text-amber-400">{pendingOrders}</span>
              <span className="text-[10px] text-amber-300/80 block mt-1">Awaiting confirmation</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#12131d] border border-blue-500/20">
              <span className="text-xs text-blue-400 block mb-1 font-semibold">Confirmed</span>
              <span className="font-brand font-bold text-2xl text-blue-400">{confirmedOrders}</span>
              <span className="text-[10px] text-blue-300/80 block mt-1">Ready for pickup/dispatch</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#12131d] border border-emerald-500/20">
              <span className="text-xs text-emerald-400 block mb-1 font-semibold">Completed</span>
              <span className="font-brand font-bold text-2xl text-emerald-400">{completedOrders}</span>
              <span className="text-[10px] text-emerald-300/80 block mt-1">Delivered to customer</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#12131d] border border-gray-800">
              <span className="text-xs text-rose-400 block mb-1 font-semibold">Cancelled</span>
              <span className="font-brand font-bold text-2xl text-rose-400">{cancelledOrders}</span>
              <span className="text-[10px] text-gray-500 block mt-1">Cancelled by user/owner</span>
            </div>

          </div>

          {/* Revenue Highlight & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 p-6 rounded-3xl bg-gradient-to-r from-[#171825] to-[#10111a] border border-amber-500/30 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  Gross Order Volume
                </span>
                <div className="font-brand font-black text-3xl sm:text-4xl gold-gradient-text">
                  {formatPKR(totalRevenue)}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Cumulative value of website and WhatsApp order requests received at Ahmad Mobile Zone.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-2 shadow-md transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Mobile / Accessory</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className="px-4 py-2.5 rounded-xl bg-[#1c1d29] hover:bg-[#252737] text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Pending Orders ({pendingOrders})</span>
                </button>
              </div>
            </div>

            {/* Shop Owner Quick Contact Reference */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-[#12131d] border border-gray-800 space-y-3">
              <span className="text-xs text-gray-400 font-semibold block">Store Identity</span>
              <h3 className="font-brand font-bold text-lg text-white">Ahmad Mobile Zone</h3>
              <p className="text-xs text-gray-300">
                Budhni, Charsadda Road, Peshawar, Pakistan
              </p>
              <div className="pt-2 border-t border-gray-800 text-xs space-y-1">
                <div className="text-emerald-400 font-bold">WhatsApp: 0313-9172091</div>
                <div className="text-gray-400">Database: Firebase Firestore (Active)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="w-full flex items-center bg-[#141520] border border-gray-800 rounded-xl px-3 py-2 text-xs">
                <Search className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search products by name or brand..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-transparent text-white focus:outline-none"
                />
              </div>

              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="bg-[#141520] border border-gray-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="All">All Categories</option>
                {CATEGORIES_LIST.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#111219] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#171824] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price (PKR)</th>
                    <th className="p-3.5">Specs (RAM/ROM)</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">PTA / Warranty</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {adminFilteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#161723] transition">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded-lg bg-[#1d1e2b] p-1 border border-gray-800 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-white block max-w-xs truncate">{p.name}</span>
                          <span className="text-[10px] text-amber-400">{p.brand}</span>
                          {p.isDemo && (
                            <span className="ml-1 text-[9px] px-1 rounded bg-gray-800 text-gray-400">Demo</span>
                          )}
                        </div>
                      </td>

                      <td className="p-3.5 text-gray-300 whitespace-nowrap">
                        {p.category}
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-brand font-bold text-amber-400">{formatPKR(p.price)}</span>
                        {p.discount > 0 && (
                          <span className="ml-1.5 text-[10px] text-rose-400">-{p.discount}%</span>
                        )}
                      </td>

                      <td className="p-3.5 whitespace-nowrap text-gray-400">
                        {p.ram !== 'N/A' ? `${p.ram} / ${p.storage}` : p.storage !== 'N/A' ? p.storage : 'Standard'}
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.stock === 'in_stock'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : p.stock === 'limited_stock'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {p.stock.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap text-[11px] text-gray-400">
                        {p.ptaStatus || 'PTA Approved'}
                      </td>

                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 rounded-lg bg-[#1e1f2b] text-amber-400 hover:bg-amber-500 hover:text-black transition"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 rounded-lg bg-[#1e1f2b] text-rose-400 hover:bg-rose-600 hover:text-white transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                    orderStatusFilter === status
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'bg-[#141520] text-gray-400 hover:text-white'
                  }`}
                >
                  {status} ({status === 'all' ? orders.length : orders.filter(o => o.status === status).length})
                </button>
              ))}
            </div>

            <span className="text-xs text-gray-400">
              {adminFilteredOrders.length} order requests found
            </span>
          </div>

          {/* Orders Table */}
          <div className="bg-[#111219] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            {adminFilteredOrders.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-xs">
                No orders found under this status.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-[#171824] text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Phone & WhatsApp</th>
                      <th className="p-3.5">Delivery Method</th>
                      <th className="p-3.5">Amount (PKR)</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {adminFilteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#161723] transition">
                        <td className="p-3.5 font-mono text-amber-300 font-bold">
                          #{order.id}
                          <span className="text-[10px] text-gray-500 block font-sans">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <span className="font-bold text-white block">{order.customerName}</span>
                          <span className="text-[10px] text-gray-400">{order.customerCity || 'Peshawar'}</span>
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <span className="text-gray-200 block">{order.customerPhone}</span>
                          <a
                            href={createAdminCustomerReplyWhatsAppUrl(
                              order.customerPhone,
                              order.id,
                              order.customerName,
                              order.status
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:underline"
                          >
                            <MessageCircle className="w-3 h-3 fill-emerald-400" />
                            WhatsApp Customer
                          </a>
                        </td>

                        <td className="p-3.5 text-[11px] text-gray-400 max-w-xs truncate">
                          {order.deliveryMethod}
                        </td>

                        <td className="p-3.5 whitespace-nowrap font-brand font-bold gold-gradient-text text-sm">
                          {formatPKR(order.totalAmount)}
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase focus:outline-none cursor-pointer ${
                              order.status === 'confirmed'
                                ? 'bg-blue-900/60 text-blue-300 border border-blue-500/40'
                                : order.status === 'completed'
                                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                                : order.status === 'cancelled'
                                ? 'bg-rose-900/60 text-rose-300 border border-rose-500/40'
                                : 'bg-amber-900/60 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            <option value="pending" className="bg-[#12131d]">Pending</option>
                            <option value="confirmed" className="bg-[#12131d]">Confirmed</option>
                            <option value="completed" className="bg-[#12131d]">Completed</option>
                            <option value="cancelled" className="bg-[#12131d]">Cancelled</option>
                          </select>
                        </td>

                        <td className="p-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelectedOrderForView(order)}
                            className="px-2.5 py-1 rounded-lg bg-[#1e1f2b] text-amber-400 hover:bg-amber-500 hover:text-black font-semibold text-xs transition"
                          >
                            View Items
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CATEGORIES MANAGEMENT */}
      {activeTab === 'categories' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-[#12131d] border border-amber-500/20">
            <h3 className="font-brand font-bold text-lg text-white mb-1">
              Active Store Categories
            </h3>
            <p className="text-xs text-gray-400">
              Ahmad Mobile Zone features 11 specialized categories with dedicated filtering
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES_LIST.map((c) => {
              const count = products.filter((p) => p.category === c.name).length;
              return (
                <div key={c.name} className="p-4 rounded-2xl bg-[#13141f] border border-gray-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{c.name}</h4>
                    <span className="text-xs text-gray-400">{c.description}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: WEBSITE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl bg-[#111219] border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-brand font-bold text-xl text-white">
              Shop Details & Content Settings
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Update shop business hours, WhatsApp hotline, banner announcement, and store address.
            </p>
          </div>

          {settingsSavedNotice && (
            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Shop settings saved and updated across the website!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  value={settingsForm.shopName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, shopName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#171824] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Official WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#171824] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Showroom Address (Budhni, Peshawar)
              </label>
              <input
                type="text"
                value={settingsForm.address}
                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#171824] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Business Working Hours
              </label>
              <input
                type="text"
                value={settingsForm.businessHours}
                onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#171824] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Top Announcement Marquee Bar
              </label>
              <textarea
                rows={2}
                value={settingsForm.announcement}
                onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#171824] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md transition"
            >
              Save Website Settings
            </button>
          </form>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#101118] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="font-brand font-bold text-xl text-white">
                {editingProduct ? 'Edit Mobile Phone / Accessory' : 'Add New Product to Catalog'}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samsung Galaxy S24 Ultra"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Brand *</label>
                  <select
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Infinix">Infinix</option>
                    <option value="Tecno">Tecno</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Anker">Anker</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Original Price (PKR)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">RAM</label>
                  <input
                    type="text"
                    placeholder="e.g. 12GB or N/A"
                    value={productForm.ram}
                    onChange={(e) => setProductForm({ ...productForm, ram: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Storage</label>
                  <input
                    type="text"
                    placeholder="e.g. 256GB"
                    value={productForm.storage}
                    onChange={(e) => setProductForm({ ...productForm, storage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Color</label>
                  <input
                    type="text"
                    placeholder="e.g. Titanium Gray"
                    value={productForm.color}
                    onChange={(e) => setProductForm({ ...productForm, color: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Stock Status</label>
                  <select
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="limited_stock">Limited Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">PTA Approval Status</label>
                  <select
                    value={productForm.ptaStatus}
                    onChange={(e) => setProductForm({ ...productForm, ptaStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="PTA Approved">PTA Approved</option>
                    <option value="Non-PTA">Non-PTA</option>
                    <option value="Official Warranty">Official Brand Warranty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#181924] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="accent-amber-400 rounded"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={productForm.isSpecialOffer}
                    onChange={(e) => setProductForm({ ...productForm, isSpecialOffer: e.target.checked })}
                    className="accent-amber-400 rounded"
                  />
                  <span>Mark as Special Offer</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Item Details Modal */}
      {selectedOrderForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xl bg-[#111219] border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div>
                <h3 className="font-brand font-bold text-lg text-white">Order #{selectedOrderForView.id}</h3>
                <span className="text-xs text-gray-400">Customer: {selectedOrderForView.customerName} ({selectedOrderForView.customerPhone})</span>
              </div>
              <button
                onClick={() => setSelectedOrderForView(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {selectedOrderForView.items.map((item, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#171824] border border-gray-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{item.name}</span>
                    <span className="text-gray-400 text-[10px]">
                      Qty: {item.quantity} {item.color ? `• Color: ${item.color}` : ''} {item.storage ? `• ${item.storage}` : ''}
                    </span>
                  </div>
                  <span className="font-brand font-bold text-amber-400">
                    {formatPKR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-[#171824] border border-gray-800 text-xs space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span className="text-white">{formatPKR(selectedOrderForView.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery:</span>
                <span className="text-white">{formatPKR(selectedOrderForView.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-1 border-t border-gray-800">
                <span>Total Amount:</span>
                <span className="gold-gradient-text text-sm">{formatPKR(selectedOrderForView.totalAmount)}</span>
              </div>
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <div><strong>Delivery Address:</strong> {selectedOrderForView.customerAddress || 'Budhni Shop Pickup'}</div>
              <div><strong>Method:</strong> {selectedOrderForView.deliveryMethod}</div>
              {selectedOrderForView.notes && <div><strong>Customer Notes:</strong> {selectedOrderForView.notes}</div>}
            </div>

            <div className="pt-2 flex justify-between">
              <a
                href={createAdminCustomerReplyWhatsAppUrl(
                  selectedOrderForView.customerPhone,
                  selectedOrderForView.id,
                  selectedOrderForView.customerName,
                  selectedOrderForView.status
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Message on WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedOrderForView(null)}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

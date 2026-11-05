import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { CategoriesView } from './views/CategoriesView';
import { OffersView } from './views/OffersView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';
import { Product } from './types';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const { 
    checkoutModalOpen, 
    setCheckoutModalOpen, 
    selectedProduct, 
    setSelectedProduct 
  } = useShop();

  const handleNavigateToShop = (category = 'All') => {
    setSelectedCategory(category);
    setCurrentTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterNavigate = (tabId: string, category?: string) => {
    if (category) {
      setSelectedCategory(category);
      setCurrentTab('shop');
    } else {
      setCurrentTab(tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08080a] text-gray-100">
      {/* Navbar with brand identity, search, navigation & cart icon */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onNavigateToShop={handleNavigateToShop}
            onOpenProductDetails={(prod: Product) => setSelectedProduct(prod)}
          />
        )}

        {currentTab === 'shop' && (
          <ShopView
            initialCategory={selectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenProductDetails={(prod: Product) => setSelectedProduct(prod)}
          />
        )}

        {currentTab === 'categories' && (
          <CategoriesView onSelectCategory={handleSelectCategory} />
        )}

        {currentTab === 'offers' && (
          <OffersView
            onOpenProductDetails={(prod: Product) => setSelectedProduct(prod)}
            onNavigateToShop={() => handleNavigateToShop()}
          />
        )}

        {currentTab === 'about' && (
          <AboutView />
        )}

        {currentTab === 'contact' && (
          <ContactView />
        )}

        {currentTab === 'admin' && (
          <AdminView />
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer />

      {/* Complete Order & Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />

      {/* Floating Instant WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Website Footer */}
      <Footer onNavigate={handleFooterNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

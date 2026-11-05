import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  X, 
  Sparkles, 
  Check, 
  Smartphone,
  ChevronDown
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_LIST } from '../data/initialData';
import { Product, ProductCategory } from '../types';
import { formatPKR } from '../utils/whatsapp';

interface ShopViewProps {
  initialCategory?: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenProductDetails: (p: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  initialCategory = 'All',
  searchQuery,
  setSearchQuery,
  onOpenProductDetails,
}) => {
  const { products, loadingProducts } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(600000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
    return ['All', ...list];
  }, [products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Brand filter
        if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
          return false;
        }
        // Stock filter
        if (inStockOnly && p.stock === 'out_of_stock') {
          return false;
        }
        // Price filter
        if (p.price > maxPrice) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchColor = p.color?.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCat && !matchDesc && !matchColor) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'discount') return b.discount - a.discount;
        if (sortBy === 'newest') return (b.createdAt || '').localeCompare(a.createdAt || '');
        // default featured
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [products, selectedCategory, selectedBrand, inStockOnly, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setInStockOnly(false);
    setMaxPrice(600000);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Ahmad Mobile Zone Catalog</span>
          </div>
          <h1 className="font-brand font-bold text-3xl text-white">
            {selectedCategory === 'All' ? 'All Mobile Phones & Accessories' : selectedCategory}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Showing {filteredProducts.length} verified products available for Budhni pickup & nationwide delivery
          </p>
        </div>

        {/* Sorting & Filter Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#181924] border border-amber-500/30 text-amber-300 text-xs font-bold"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 bg-[#12131b] border border-gray-800 rounded-xl px-3 py-2 text-xs">
            <span className="text-gray-400 hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#12131b]">Featured / Recommended</option>
              <option value="price-asc" className="bg-[#12131b]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#12131b]">Price: High to Low</option>
              <option value="discount" className="bg-[#12131b]">Highest Discount</option>
              <option value="newest" className="bg-[#12131b]">Latest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Search & Filter Badges */}
      {(searchQuery || selectedCategory !== 'All' || selectedBrand !== 'All' || inStockOnly) && (
        <div className="flex flex-wrap items-center gap-2 py-3">
          <span className="text-xs text-gray-400">Active filters:</span>
          {searchQuery && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 flex items-center gap-1.5">
              Query: "{searchQuery}"
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
            </span>
          )}
          {selectedCategory !== 'All' && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 flex items-center gap-1.5">
              Category: {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
            </span>
          )}
          {selectedBrand !== 'All' && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 flex items-center gap-1.5">
              Brand: {selectedBrand}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBrand('All')} />
            </span>
          )}
          {inStockOnly && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-1.5">
              In Stock Only
              <X className="w-3 h-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs text-gray-400 hover:text-white underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Desktop Sidebar Filters */}
        <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-[#101117] border border-amber-500/20 rounded-2xl p-5 space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <span className="font-brand font-bold text-sm text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                Filter Catalog
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-amber-400 hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                Categories
              </label>
              <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                    selectedCategory === 'All'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {CATEGORIES_LIST.map((cat) => {
                  const count = products.filter((p) => p.category === cat.name).length;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                        selectedCategory === cat.name
                          ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] text-gray-500">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brands */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                Brand
              </label>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                      selectedBrand === brand
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-[#161722] border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="text-xs font-brand font-bold gold-gradient-text">
                  {formatPKR(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="600000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>PKR 5,000</span>
                <span>PKR 600,000</span>
              </div>
            </div>

            {/* Stock Toggle */}
            <div className="pt-2 border-t border-gray-800">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded accent-amber-400 w-4 h-4"
                />
                <span className="text-xs text-gray-300 font-medium">In Stock Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-9">
          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-[#14151e] border border-gray-800 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-[#12131c] border border-gray-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-brand font-bold text-xl text-white">No Products Found</h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
                No mobile phones or accessories matched your current filter selection. Try adjusting your search query or price limit.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-md transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={onOpenProductDetails}
                />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

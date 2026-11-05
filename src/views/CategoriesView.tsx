import React from 'react';
import { 
  Smartphone, 
  Watch, 
  Headphones, 
  Zap, 
  Shield, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/initialData';
import { useShop } from '../context/ShopContext';

interface CategoriesViewProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  const { products } = useShop();

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Smart Watches':
        return <Watch className="w-8 h-8 text-amber-400" />;
      case 'Headphones':
        return <Headphones className="w-8 h-8 text-amber-400" />;
      case 'Chargers':
        return <Zap className="w-8 h-8 text-amber-400" />;
      case 'Mobile Accessories':
        return <Shield className="w-8 h-8 text-amber-400" />;
      default:
        return <Smartphone className="w-8 h-8 text-amber-400" />;
    }
  };

  const getCategoryImage = (name: string) => {
    switch (name) {
      case 'Apple iPhone':
        return 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80';
      case 'Samsung':
        return 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80';
      case 'Xiaomi':
        return 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80';
      case 'Infinix':
        return 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=600&q=80';
      case 'Tecno':
        return 'https://images.unsplash.com/photo-1533228896884-6a8f97cf27d0?auto=format&fit=crop&w=600&q=80';
      case 'Vivo':
        return 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80';
      case 'Oppo':
        return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80';
      case 'Smart Watches':
        return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
      case 'Headphones':
        return 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80';
      case 'Chargers':
        return 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80';
      case 'Mobile Accessories':
        return 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80';
      default:
        return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Tech Collections</span>
        </div>
        <h1 className="font-brand font-bold text-3xl sm:text-4xl text-white">
          Shop by Category
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Explore genuine pin-pack mobiles and premium accessories with verified brand warranties at Ahmad Mobile Zone, Budhni, Peshawar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES_LIST.map((cat) => {
          const count = products.filter((p) => p.category === cat.name).length;
          return (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative rounded-3xl overflow-hidden bg-[#12131c] border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] flex flex-col justify-between"
            >
              {/* Background preview image */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-[#1a1b26] to-[#0e0f15]">
                <img
                  src={getCategoryImage(cat.name)}
                  alt={cat.name}
                  className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12131c] via-[#12131c]/50 to-transparent" />
                
                {/* Floating Icon */}
                <div className="absolute bottom-4 left-5 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-amber-500/40 shadow-lg group-hover:bg-amber-500 group-hover:text-black transition">
                  {getCategoryIcon(cat.name)}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-brand font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1c1d29] border border-gray-700 text-amber-400">
                    {count} Models
                  </span>
                </div>
                
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {cat.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 group-hover:text-amber-300">
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

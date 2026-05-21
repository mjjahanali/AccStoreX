import React, { useState, useEffect } from 'react';
import { 
  Filter, Search, Star, Heart, ShoppingCart, CheckCircle, 
  RefreshCw, SlidersHorizontal, ArrowUpDown, HelpCircle, Eye
} from 'lucide-react';
import { Product, Category } from '../types';
import { CATEGORIES, PRODUCTS } from '../data';
import DynamicIcon from '../components/DynamicIcon';

interface ShopProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  initialSearchQuery: string;
}

export default function Shop({ 
  onQuickView, 
  onAddToCart, 
  onToggleWishlist, 
  wishlist,
  initialSearchQuery
}: ShopProps) {
  // Filters local states
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Synchronize initial query from header search
  useEffect(() => {
    if (initialSearchQuery) {
      if (initialSearchQuery.startsWith('cat:')) {
        setSelectedCategory(initialSearchQuery.replace('cat:', ''));
        setSearchQuery('');
        setWishlistOnly(false);
      } else if (initialSearchQuery === 'filter:wishlist') {
        setWishlistOnly(true);
        setSelectedCategory('all');
        setSearchQuery('');
      } else {
        setSearchQuery(initialSearchQuery);
        setSelectedCategory('all');
        setWishlistOnly(false);
      }
    } else {
      setWishlistOnly(false);
    }
  }, [initialSearchQuery]);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1200);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('default');
    setInStockOnly(false);
    setWishlistOnly(false);
    setMaxPrice(350);
  };

  // Filter & Sort math
  const filteredProducts = PRODUCTS.filter((prod) => {
    // Search query lookup
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prod.title.toLowerCase().includes(q);
      const matchDesc = prod.description.toLowerCase().includes(q);
      const matchBrief = prod.featuresBrief.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchBrief) return false;
    }

    // Category filter mockup
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
      return false;
    }

    // Stock availability
    if (inStockOnly && prod.stockStatus === 'Out of Stock') {
      return false;
    }

    // Wishlist only filter
    if (wishlistOnly && !wishlist.includes(prod.id)) {
      return false;
    }

    // Max Price constraint
    const currentPrice = prod.salePrice || prod.price;
    if (currentPrice > maxPrice) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    const pA = a.salePrice || a.price;
    const pB = b.salePrice || b.price;

    if (sortBy === 'price-asc') return pA - pB;
    if (sortBy === 'price-desc') return pB - pA;
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    if (sortBy === 'reviews-desc') return b.reviewsCount - a.reviewsCount;
    return 0; // Default sort order
  });

  return (
    <div className="bg-[#F9FAFB] text-gray-900 min-h-screen py-10 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Breadcrumbs & Description */}
        <div className="border-b border-gray-200 pb-8 mb-10">
          <span className="text-[10px] tracking-widest font-mono text-blue-600 uppercase font-black">
            ACCSTOREX CATALOG
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 tracking-tight mt-2">
            Secure Digital Accounts Marketplace
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-2xl leading-relaxed font-semibold">
            Browse our catalog of aged advertising profiles, verified Stripe/PayPal merchant modules, high limit crypto plus pools, and stable SMTP bulk mail systems. Filter manually below.
          </p>
        </div>

        {/* Filters and Grid layout container */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT COLUMN: FILTER CONTROLS BAR (Smaller 1/5 width) */}
          <aside className="w-full lg:w-1/5 bg-white border border-gray-200 p-6 rounded-2xl space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-800 flex items-center gap-2">
                <Filter className="w-4.5 h-4.5 text-blue-600" />
                Advanced Filters
              </h3>
              <button 
                id="reset-filters-btn"
                onClick={handleResetFilters}
                className="text-[10px] text-gray-400 hover:text-blue-600 font-black tracking-wider uppercase cursor-pointer transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Keyword Search Input */}
            <div className="space-y-2">
              <label htmlFor="shop-search" className="block text-[11px] font-black text-gray-500 uppercase tracking-wider">Search Keywords</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  id="shop-search"
                  type="text"
                  placeholder="Enterprise wise, Gmail pack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-9.5 pr-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors"
                />
              </div>
            </div>

            {/* Category Filter dropdown/list */}
            <div className="space-y-2">
              <label className="block text-[11px] font-black text-gray-500 uppercase tracking-wider">Storage Category</label>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => { setSelectedCategory('all'); setWishlistOnly(false); }}
                  className={`w-full text-left text-xs px-3 py-2 rounded-xl border flex items-center justify-between font-semibold cursor-pointer transition-colors ${
                    selectedCategory === 'all' && !wishlistOnly
                      ? 'bg-blue-50 border-blue-200 text-blue-600 font-bold'
                      : 'bg-white border-gray-200 text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] bg-gray-50 px-2 rounded-md font-mono text-gray-500 border border-gray-200 font-bold">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id && !wishlistOnly;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setWishlistOnly(false); }}
                      className={`w-full text-left text-xs px-3 py-2 rounded-xl border flex items-center justify-between font-semibold cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50 border-blue-200 text-blue-600 font-bold'
                          : 'bg-white border-gray-200 text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] bg-gray-50 px-2 rounded-md font-mono text-gray-500 border border-gray-200 font-bold">{cat.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Slider filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-black text-gray-500 uppercase tracking-wider">
                <span>Maximum Budget</span>
                <span className="text-blue-600 font-mono text-sm font-black">${maxPrice}</span>
              </div>
              <input
                id="price-range-slider"
                type="range"
                min="5"
                max="350"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono font-bold">
                <span>$5</span>
                <span>$180</span>
                <span>$350</span>
              </div>
            </div>

            {/* In Stock & Wishlist quick checks */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <label className="flex items-center gap-2.5 text-xs text-gray-700 font-bold cursor-pointer select-none">
                <input
                  id="in-stock-only-checkbox"
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 bg-white border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0 rounded"
                />
                In Stock Only
              </label>

              <label className="flex items-center gap-2.5 text-xs text-gray-700 font-bold cursor-pointer select-none">
                <input
                  id="wishlist-only-checkbox"
                  type="checkbox"
                  checked={wishlistOnly}
                  onChange={(e) => setWishlistOnly(e.target.checked)}
                  className="w-4 h-4 bg-white border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0 rounded"
                />
                My Saved Wishlist Only ({wishlist.length})
              </label>
            </div>

            {/* Help Support indicator bottom of filter */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <h5 className="text-[11px] font-black text-gray-900 uppercase">Need custom specifications?</h5>
              <p className="text-[10px] text-gray-500 mt-1 pb-2 font-semibold">Looking for aged accounts from specific nations or custom limits?</p>
              <a 
                href="https://t.me/EgSupport24" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="text-[10px] text-blue-600 hover:text-blue-700 font-black flex items-center gap-1 uppercase transition-colors"
              >
                Telegram Operator <DynamicIcon name="ExternalLink" className="w-3" />
              </a>
            </div>

          </aside>

          {/* RIGHT COLUMN: PRODUCTS MATRIX & GRID (Larger 4/5 width) */}
          <main className="w-full lg:w-4/5">
            
            {/* Catalog Sorting Actions controls bar */}
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 shadow-sm">
              <div className="text-xs text-gray-500 font-bold font-sans">
                Showing <strong className="text-gray-950 font-black">{filteredProducts.length}</strong> verified items matching
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-xl w-full sm:w-auto">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  <select
                    id="shop-sort-selector"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-xs text-gray-750 focus:outline-none focus:ring-0 cursor-pointer font-bold font-sans border-none outline-none"
                  >
                    <option value="default" className="bg-white text-gray-800 font-bold">Default Sorting</option>
                    <option value="price-asc" className="bg-white text-gray-800 font-bold">Price: Low to High</option>
                    <option value="price-desc" className="bg-white text-gray-800 font-bold">Price: High to Low</option>
                    <option value="rating-desc" className="bg-white text-gray-800 font-bold">Highest Rated</option>
                    <option value="reviews-desc" className="bg-white text-gray-800 font-bold">Reviews & Popularity</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actual Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => {
                  const isSaved = wishlist.includes(prod.id);
                  const currentPrice = prod.salePrice || prod.price;

                  return (
                    <div
                      key={prod.id}
                      className="bg-white border border-gray-200 hover:border-gray-250 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md flex flex-col justify-between relative group overflow-hidden"
                    >
                      {/* Heart wishlist toggle */}
                      <button
                        id={`shop-wishlist-toggle-${prod.id}`}
                        onClick={() => onToggleWishlist(prod.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-400 hover:text-pink-500 hover:bg-pink-50 hover:border-pink-205 transition-colors cursor-pointer z-10"
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500 text-pink-500' : ''}`} />
                      </button>

                      {/* Header metadata */}
                      <div>
                        {prod.imgUrl && (
                          <div 
                            onClick={() => {
                              window.location.hash = `product/${prod.id}`;
                            }}
                            className="w-full h-24 mb-4 rounded-xl overflow-hidden border border-gray-150 cursor-pointer relative"
                          >
                            <img 
                              src={prod.imgUrl} 
                              alt={prod.title} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            <div className="absolute top-2 left-2">
                              <span className="text-[8px] tracking-wider font-mono bg-blue-600 text-white px-1.5 py-0.5 rounded-md font-bold uppercase shadow-sm">
                                SECURE ASSET
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                            <DynamicIcon name={prod.icon} className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-[9px] font-mono tracking-wider text-gray-400 uppercase font-bold">{prod.category.replace('-', ' ')}</span>
                            <span className={`block text-[9.5px] font-mono font-bold ${
                              prod.stockStatus === 'In Stock' 
                                ? 'text-emerald-600' 
                                : prod.stockStatus === 'Low Stock' 
                                ? 'text-amber-600' 
                                : 'text-rose-600'
                            }`}>
                              • {prod.stockStatus.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Product title */}
                        <h3 
                          onClick={() => {
                            window.location.hash = `product/${prod.id}`;
                          }}
                          className="text-xs md:text-sm font-extrabold text-gray-900 tracking-tight hover:text-blue-600 cursor-pointer h-10 line-clamp-2 leading-tight transition-colors pr-6"
                        >
                          {prod.title}
                        </h3>

                        {/* Brief descriptor line */}
                        <p className="text-[11px] text-gray-500 leading-relaxed mt-2 line-clamp-2 h-8 font-semibold">
                          {prod.featuresBrief}
                        </p>

                        {/* Feature mini list */}
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5">
                          {prod.features.slice(0, 3).map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[10px] text-gray-655 font-semibold">
                              <span className="w-1 h-1 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lower Price, Stars, and CTA Buttons */}
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2.5">
                        <div className="text-left">
                          <div className="flex items-baseline gap-1">
                            <span className="text-base font-black text-gray-900">${currentPrice.toFixed(2)}</span>
                            {prod.salePrice && (
                              <span className="text-[10px] text-gray-400 line-through">${prod.price.toFixed(2)}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-yellow-500 mt-0.5 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
                            <span>{prod.rating}</span>
                            <span className="text-gray-400 font-normal">({prod.reviewsCount})</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Quick view button icon */}
                          <button
                            id={`shop-view-btn-${prod.id}`}
                            onClick={() => onQuickView(prod)}
                            className="p-2 py-1 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 text-gray-500 hover:text-blue-600 rounded-xl border border-gray-200 cursor-pointer transition-colors"
                            title="Inspect Item Spec Sheet"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>

                          {/* Add to cart bubble button */}
                          <button
                            id={`shop-add-btn-${prod.id}`}
                            onClick={() => handleAddToCart(prod)}
                            disabled={prod.stockStatus === 'Out of Stock'}
                            className={`p-2 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                              addedProductId === prod.id
                                ? 'bg-emerald-500 text-white scale-95 px-3'
                                : prod.stockStatus === 'Out of Stock'
                                ? 'bg-gray-100 text-gray-405 border border-gray-200 pointer-events-none'
                                : 'bg-blue-600 hover:bg-blue-500 text-white px-3 shadow-md shadow-blue-500/10'
                            }`}
                          >
                            {addedProductId === prod.id ? (
                              <CheckCircle className="w-4 h-4 text-white stroke-[3]" />
                            ) : (
                              <span className="flex items-center gap-1 text-[11px] font-sans">
                                <ShoppingCart className="w-3.5 h-3.5" />
                                Buy
                              </span>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-800 shadow-sm">
                <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-sm font-bold text-gray-950">No matching products found!</h4>
                <p className="text-xs text-gray-550 mt-2 max-w-sm mx-auto font-semibold">
                  We currently do not have items in active listings matching your query. Try searching for "Wise", "PayPal", "Telegram" or click clean.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-transform cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Secure delivery assurance footer */}
            <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-105 flex items-center justify-center text-blue-600">
                  <DynamicIcon name="ShieldCheck" className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900">Instant Automated Key Delivery</h4>
                  <p className="text-[11px] text-gray-500 font-semibold">Every electronic store item is checked under residential proxy nets daily.</p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-250 px-3 py-1 rounded-full shadow-sm">
                ✓ SSL CODES INTACT
              </span>
            </div>

          </main>

        </div>

      </div>
    </div>
  );
}

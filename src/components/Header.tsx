import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, User, Heart, Menu, X, ChevronDown, 
  TrendingUp, CreditCard, Coins, Mail, Phone, ExternalLink, ShieldAlert
} from 'lucide-react';
import { PageType, Category, Product, CartItem } from '../types';
import { CATEGORIES, PRODUCTS } from '../data';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  cart: CartItem[];
  wishlist: string[];
  onSearchChange: (searchTerm: string) => void;
  currentUser: { email: string; name: string } | null;
  onLogout?: () => void;
}

export default function Header({ 
  currentPage, 
  onNavigate, 
  cart, 
  wishlist, 
  onSearchChange,
  currentUser,
  onLogout
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart quantity count
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Search input change handler
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchChange(searchInput);
      onNavigate('shop');
      setShowSearchSuggestions(false);
    }
  };

  const handleSuggestionClick = (query: string) => {
    setSearchInput(query);
    onSearchChange(query);
    onNavigate('shop');
    setShowSearchSuggestions(false);
  };

  const filteredSuggestions = searchInput.trim()
    ? PRODUCTS.filter(p => p.title.toLowerCase().includes(searchInput.toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/85 font-sans shadow-sm">
      {/* Top Banner Contact Details */}
      <div className="bg-[#F9FAFB] border-b border-gray-200/50 text-gray-500 text-xs px-4 md:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Support badging */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              24/7 CUSTOMER SUPPORT ACTIVE
            </span>
            <span className="text-gray-300 hidden sm:inline">|</span>
            {/* Telegram and WhatsApp contacts */}
            <a href="https://t.me/EgSupport24" target="_blank" referrerPolicy="no-referrer" className="hover:text-blue-600 text-[11px] flex items-center gap-1 transition-colors font-medium">
              <span className="text-[#1E96C8] font-bold">TG:</span> @EgSupport24
            </a>
            <a href="https://wa.me/13073939979" target="_blank" referrerPolicy="no-referrer" className="hover:text-emerald-650 text-[11px] flex items-center gap-1 transition-colors font-medium">
              <span className="text-[#25D366] font-bold">WA:</span> +1 (307) 393-9979
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <button 
              onClick={() => onNavigate('order-tracking')}
              className="text-gray-600 hover:text-blue-650 flex items-center gap-1 transition-colors cursor-pointer text-[11px] font-bold"
            >
              🚀 TRACK MY DIGITAL ORDER
            </button>
            <span className="text-gray-200 hidden sm:inline">•</span>
            <span className="text-gray-450 font-medium">SECURE SSL AES-256</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo Text */}
        <div 
          onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] to-[#06B6D4] bg-gradient-to-br flex items-center justify-center text-white font-black text-xl tracking-wider shadow-lg shadow-blue-500/10">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#111827] to-[#2563EB] tracking-tight leading-none">AccStoreX</span>
            <span className="text-[10px] text-blue-600/90 font-mono tracking-widest font-black leading-none mt-1">MARKETPLACE</span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-600">
          <button 
            id="nav-to-home"
            onClick={() => onNavigate('home')}
            className={`cursor-pointer hover:text-blue-600 transition-colors relative py-1 ${currentPage === 'home' ? 'text-blue-600 font-bold' : ''}`}
          >
            Home
            {currentPage === 'home' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />}
          </button>

          {/* Categories Mega Dropdown trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button 
              id="nav-to-categories-dropdown"
              onClick={() => onNavigate('shop')}
              className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors py-1 text-gray-600 text-xs font-semibold"
            >
              Categories <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
            </button>

            {/* Mega menu box */}
            {isMegaMenuOpen && (
              <div className="absolute top-100% left-1/2 -translate-x-1/2 w-80 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl z-50 grid grid-cols-1 gap-2.5">
                <div className="border-b border-gray-100 pb-2 mb-1.5">
                  <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Fast Categories Selection</h4>
                </div>
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSearchChange(`cat:${cat.id}`);
                      onNavigate('shop');
                      setIsMegaMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 text-xs transition-colors cursor-pointer group"
                  >
                    <span className="text-gray-750 group-hover:text-blue-600 font-semibold">{cat.name}</span>
                    <span className="text-[10px] bg-gray-100 border border-gray-150 px-2 py-0.5 rounded text-gray-500 font-mono">{cat.count} listings</span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    onSearchChange('');
                    onNavigate('shop');
                    setIsMegaMenuOpen(false);
                  }}
                  className="mt-1 pb-1 text-center text-[10px] text-blue-600 hover:text-blue-700 font-black tracking-wider flex items-center justify-center gap-1 uppercase cursor-pointer animate-pulse"
                >
                  Explore All Categories <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <button 
            id="nav-to-shop"
            onClick={() => { onSearchChange(''); onNavigate('shop'); }}
            className={`cursor-pointer hover:text-blue-600 transition-colors relative py-1 ${currentPage === 'shop' ? 'text-blue-600 font-bold' : ''}`}
          >
            Shop Marketplace
            {currentPage === 'shop' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />}
          </button>

          <button 
            id="nav-to-blog"
            onClick={() => onNavigate('blog')}
            className={`cursor-pointer hover:text-blue-600 transition-colors relative py-1 ${currentPage === 'blog' ? 'text-blue-600 font-bold' : ''}`}
          >
            Insights & Guides
            {currentPage === 'blog' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />}
          </button>

          <button 
            id="nav-to-about"
            onClick={() => onNavigate('about-us')}
            className={`cursor-pointer hover:text-blue-600 transition-colors relative py-1 ${currentPage === 'about-us' ? 'text-blue-600 font-bold' : ''}`}
          >
            About
          </button>

          <button 
            id="nav-to-faq"
            onClick={() => onNavigate('faq')}
            className={`cursor-pointer hover:text-blue-600 transition-colors relative py-1 ${currentPage === 'faq' ? 'text-blue-600 font-bold' : ''}`}
          >
            FAQ
          </button>

          <button 
            id="nav-to-contact"
            onClick={() => onNavigate('contact-us')}
            className={`cursor-pointer hover:text-blue-600 transition-colors relative py-1 ${currentPage === 'contact-us' ? 'text-blue-600 font-bold' : ''}`}
          >
            Contact
          </button>
        </nav>

        {/* Action icons right (Cart, Wishlist, User Dashboard, Menu Mobile) */}
        <div className="flex items-center gap-3">
          {/* Toggleable compact search icon */}
          <div className="relative">
            <button
              id="header-search-toggle"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-xl transition-all cursor-pointer relative bg-white border ${
                isSearchOpen ? 'text-blue-600 bg-blue-50 border-blue-200 shadow-inner' : 'text-gray-500 hover:text-blue-600 border-gray-200 hover:bg-gray-50'
              }`}
              title="Search Assets"
            >
              <Search className="w-4 h-4" />
            </button>
            {isSearchOpen && (
              <div className="absolute right-0 top-[115%] w-72 bg-white border border-gray-200 rounded-2xl p-2.5 shadow-2xl z-50 text-gray-750 animate-in fade-in slide-in-from-top-2 duration-120">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input
                    id="header-search-input"
                    type="text"
                    autoFocus
                    placeholder="Search accounts, SMTPs, services..."
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setShowSearchSuggestions(true);
                    }}
                    onKeyPress={handleSearchKeyPress}
                    onFocus={() => setShowSearchSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 250)}
                    className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 rounded-xl pl-8.5 pr-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                {/* Search suggestion drop inside */}
                {showSearchSuggestions && searchInput.trim() && (
                  <div className="mt-2 space-y-1 max-h-48 overflow-y-auto pt-1.5 border-t border-gray-100">
                    <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-1">Matches [Press Enter]</h5>
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((prod) => (
                        <button
                          key={prod.id}
                          onClick={() => {
                            handleSuggestionClick(prod.title);
                            setIsSearchOpen(false);
                          }}
                          className="w-full text-left flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-50 text-[11px] transition-colors cursor-pointer group"
                        >
                          <span className="truncate text-gray-750 group-hover:text-blue-600 font-semibold">{prod.title}</span>
                          <span className="text-gray-900 font-mono text-[10px] font-bold">${prod.price.toFixed(2)}</span>
                        </button>
                      ))
                    ) : (
                      <p className="text-[10px] text-gray-400 p-1 italic">No clear product matches.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Heart Count */}
          <button
            id="header-wishlist-indicator"
            onClick={() => {
              onSearchChange('filter:wishlist');
              onNavigate('shop');
            }}
            className="p-2 rounded-xl hover:bg-gray-50 border border-gray-200 text-gray-500 hover:text-pink-500 transition-all cursor-pointer relative bg-white"
            title="My Wishlist"
          >
            <Heart className={`w-4.5 h-4.5 ${wishlist.length > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white font-bold font-mono text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon Count */}
          <button
            id="header-cart-indicator"
            onClick={() => onNavigate('cart')}
            className="p-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 hover:text-blue-700 transition-all cursor-pointer relative rounded-xl"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-4.5 h-4.5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-extrabold font-mono text-[9.5px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Vertical divider */}
          <span className="h-6 w-[1px] bg-gray-200 hidden sm:inline" />

          {/* Dashboard / User Button */}
          <button
            id="header-user-dashboard-btn"
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold cursor-pointer transition-colors ${
              currentPage === 'dashboard' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'text-gray-700 bg-white'
            }`}
          >
            <User className="w-4 h-4 text-blue-500" />
            <span className="hidden sm:inline">
              {currentUser ? currentUser.name : 'Account Panel'}
            </span>
          </button>

          {currentUser && onLogout && (
            <button
              id="header-logout-btn"
              onClick={() => {
                onLogout();
                onNavigate('home');
              }}
              className="px-2.5 py-1.5 rounded-xl border border-rose-250 bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors text-[10px] font-black uppercase cursor-pointer"
              title="Sign Out Session"
            >
              Logout ↩
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            id="toggle-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 cursor-pointer"
            aria-label="Toggle mobile drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white p-4 space-y-4 shadow-xl text-gray-700 text-xs animate-in slide-in-from-top duration-200">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              id="mobile-search-bar"
              type="text"
              placeholder="Search store items catalog..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-955 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Links stack */}
          <div className="flex flex-col gap-3 font-semibold pb-2 border-b border-gray-100">
            <button 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="text-left py-1 hover:text-blue-600 transition-colors"
            >
              🏠 Home Marketplace
            </button>
            <button 
              onClick={() => { onSearchChange(''); onNavigate('shop'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-blue-600 hover:text-blue-700 font-bold transition-colors"
            >
              🏷️ Shop All Products
            </button>
            <button 
              onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }}
              className="text-left py-1 hover:text-blue-600 transition-colors"
            >
              📄 Insight Articles & Guides
            </button>
            <button 
              onClick={() => { onNavigate('about-us'); setMobileMenuOpen(false); }}
              className="text-left py-1 hover:text-blue-600 transition-colors"
            >
              ℹ️ About AccStoreX
            </button>
            <button 
              onClick={() => { onNavigate('faq'); setMobileMenuOpen(false); }}
              className="text-left py-1 hover:text-blue-600 transition-colors"
            >
              ❓ Frequently Asked FAQs
            </button>
            <button 
              onClick={() => { onNavigate('contact-us'); setMobileMenuOpen(false); }}
              className="text-left py-1 hover:text-blue-600 transition-colors"
            >
              📞 Contact Support Operators
            </button>
          </div>

          {/* Fast categories selections */}
          <div>
            <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Shop Fast Categories</h5>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSearchChange(`cat:${c.id}`);
                    onNavigate('shop');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-left bg-gray-50 hover:bg-gray-100 rounded-xl text-[11px] border border-gray-200 transition-colors cursor-pointer font-medium text-gray-650 hover:text-blue-600"
                >
                  • {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

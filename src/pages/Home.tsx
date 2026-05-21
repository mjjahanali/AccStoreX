import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Heart, ShoppingCart, MessageSquare, ShieldCheck, 
  ChevronDown, Star, Globe, Clock, Zap, CheckCircle, Mail, ChevronRight, ChevronLeft, TicketPercent
} from 'lucide-react';
import { PageType, Product, Category } from '../types';
import { CATEGORIES, PRODUCTS, TESTIMONIALS, FAQS, BLOGS, STATISTICS } from '../data';
import DynamicIcon from '../components/DynamicIcon';

interface HomeProps {
  onNavigate: (page: PageType) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onSearchChange: (searchTerm: string) => void;
}

export default function Home({ 
  onNavigate, 
  onQuickView, 
  onAddToCart, 
  onToggleWishlist, 
  wishlist,
  onSearchChange
}: HomeProps) {
  // Local states
  const [activeTab, setActiveTab] = useState<string>('all');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Filter premium catalog for popular products display
  const popularProducts = PRODUCTS.filter(prod => {
    if (activeTab === 'all') return true;
    return prod.category === activeTab;
  }).slice(0, 6);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 4000);
    }
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1200);
  };

  return (
    <div className="bg-[#F9FAFB] text-[#111827] font-sans selection:bg-blue-600/10 selection:text-blue-600 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center py-16 md:py-24 border-b border-gray-200 overflow-hidden bg-white">
        {/* Glow ambient backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-gradient-to-br from-cyan-500/5 to-blue-550/5 rounded-full blur-3xl -z-10" />
        
        {/* Micro grids styling background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20 opacity-70" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-150 text-xs text-blue-600 mb-6 font-semibold shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
              Aged Accounts, Professional KYC Gateways & SMTP Servers
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-gray-900 mb-6">
              Buy Verified <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Digital Accounts</span> <br />
              & Marketing Services
            </h1>

            {/* Subheadline */}
            <p className="text-sm md:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              Premium verified accounts, business solutions, ads accounts, crypto accounts, and marketing services with secure delivery. Perfect for global scale, media buying, and B2B SaaS.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                id="hero-browse-products-btn"
                onClick={() => { onSearchChange(''); onNavigate('shop'); }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-500/10 active:scale-95 transition-all text-sm cursor-pointer"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="hero-dashboard-action-btn"
                onClick={() => onNavigate('order-tracking')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-50 text-gray-700 font-bold border border-gray-200 flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all text-sm cursor-pointer"
              >
                Track My Order 🚀
              </button>
            </div>

            {/* Contact Support directly in Hero section as requested */}
            <div className="border-t border-gray-150 pt-8 mt-4 max-w-2xl mx-auto">
              <p className="text-xs uppercase font-mono tracking-widest text-gray-400 mb-4 font-bold">OR TALK TO OUR 24/7 SUPPORT DEPT FOR SAMPLES:</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Telegram CTA */}
                <a
                  id="hero-tg-contact-link"
                  href="https://t.me/EgSupport24"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200/60 max-w-[240px] text-xs text-[#2563EB] font-bold transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.07-.19-.04-.27-.03-.12.02-1.95 1.24-5.51 3.64-.52.36-.99.54-1.41.52-.47-.01-1.37-.27-2.03-.49-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.75 3.87-1.69 6.45-2.8 7.74-3.33 3.69-1.5 4.45-1.76 4.96-1.77.11 0 .37.03.53.16.14.12.18.28.2.45-.02.07-.02.13-.02.2z" />
                  </svg>
                  Telegram: @EgSupport24
                </a>

                {/* WhatsApp CTA */}
                <a
                  id="hero-wa-contact-link"
                  href="https://wa.me/13073939979"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 max-w-[240px] text-xs text-[#16A34A] font-bold transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.335 4.963L2 22l5.233-1.373a9.957 9.957 0 004.773 1.215h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.669-1.037-5.176-2.922-7.062A9.913 9.913 0 0012.012 2zm5.727 14.06c-.25.703-1.455 1.285-1.996 1.365-.5.074-1.15.138-3.346-.774-2.808-1.167-4.622-4.025-4.762-4.21-.14-.187-1.144-1.522-1.144-2.906 0-1.385.723-2.066 1.002-2.347.279-.279.613-.349.818-.349.204 0 .408.001.585.009.183.008.43.003.674.593.25.602.853 2.08.927 2.228.074.148.123.32.025.516-.098.196-.148.318-.295.49-.148.173-.31.387-.443.52-.148.148-.303.31-.131.606.172.296.764 1.26 1.636 2.037.112.1.21.2.3.26.11.08.2.14.37.16.173.02.433-.141.528-.318.094-.177.16-.316.29-.441.13-.125.26-.06.45-.008.19.052 1.2.569 1.408.673.208.104.347.155.397.242.05.086.05.51-.2.1.z" />
                  </svg>
                  WhatsApp: +1 (307) 393-9979
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES GRID */}
      <section className="py-20 md:py-24 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-950">
              Browse Trusted Account Categories
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-3 max-w-xl mx-auto font-semibold">
              Fully verified profiles filtered by operational channels. Hand-curated to withstand automated proxy checkpoints.
            </p>
          </div>

          {/* Categories Grid (10 items as requested) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                id={`cat-card-${cat.id}`}
                key={cat.id}
                onClick={() => {
                  onSearchChange(`cat:${cat.id}`);
                  onNavigate('shop');
                }}
                className="group cursor-pointer bg-[#F9FAFB] hover:bg-white border border-gray-200/95 hover:border-blue-400 p-5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Decorative background glow */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${cat.color} opacity-5 group-hover:opacity-10 rounded-full blur-xl transition-opacity`} />
                
                {/* Dynamic Category Icon */}
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-blue-600 group-hover:text-blue-700 group-hover:border-blue-300 transition-colors mb-4 shadow-sm">
                  <DynamicIcon name={cat.icon} className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-bold text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                
                {cat.description && (
                  <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between text-[10px] font-mono font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                  <span>{cat.count} VERIFIED ITEMS</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. POPULAR PRODUCTS SECTION */}
      <section className="py-20 md:py-24 border-b border-gray-250 bg-[#F9FAFB] relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[10px] tracking-widest font-mono text-blue-600 uppercase bg-blue-50 border border-blue-200/80 px-2 rounded-full py-0.5 font-bold">
                ON SALE ACCSTOREX
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-3 text-gray-900">
                Popular Verified Listings
              </h2>
            </div>

            {/* Quick Filter Tabs list */}
            <div className="flex flex-wrap gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
              {['all', 'ads-accounts', 'payment-accounts', 'crypto-accounts', 'email-accounts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-blue-600 text-white shadow font-bold' 
                      : 'text-gray-500 hover:text-gray-900 font-bold'
                  }`}
                >
                  {tab === 'all' ? 'All' : tab.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Products Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {popularProducts.map((prod) => {
                const isSaved = wishlist.includes(prod.id);
                const currentPrice = prod.salePrice || prod.price;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={prod.id}
                    className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-250 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Badge Sale */}
                    {prod.salePrice && (
                      <div className="absolute top-4 left-4 bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold font-mono px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <TicketPercent className="w-3 h-3" />
                        SAVE ${(prod.price - prod.salePrice).toFixed(0)}
                      </div>
                    )}

                    {/* Wishlist toggle top right */}
                    <button
                      id={`wishlist-toggle-${prod.id}`}
                      onClick={() => onToggleWishlist(prod.id)}
                      className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-400 hover:text-pink-500 hover:bg-pink-50 hover:border-pink-200 transition-colors cursor-pointer"
                      aria-label="Toggle wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500 text-pink-500' : ''}`} />
                    </button>

                    <div>
                      {/* Icon & Category label */}
                      <div className="pt-6 pb-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                          <DynamicIcon name={prod.icon} className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-[9px] font-mono tracking-wider text-gray-400 uppercase font-semibold">{prod.category.replace('-', ' ')}</span>
                          <span className={`block text-[9px] font-mono font-bold ${
                            prod.stockStatus === 'In Stock' ? 'text-emerald-600' : 'text-amber-600'
                          }`}>{prod.stockStatus === 'In Stock' ? '• INSTANT DELIVERY' : '• INCOMING STOCK'}</span>
                        </div>
                      </div>

                      {/* Main parameters */}
                      <h3 
                        onClick={() => {
                          window.location.hash = `product/${prod.id}`;
                        }}
                        className="text-sm font-extrabold text-gray-900 tracking-tight hover:text-blue-600 cursor-pointer transition-colors"
                      >
                        {prod.title}
                      </h3>
                      
                      <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 leading-relaxed h-8 font-semibold">
                        {prod.featuresBrief}
                      </p>

                      {/* Features mini bullets */}
                      <div className="my-4 pt-4 border-t border-gray-100 space-y-1.5">
                        {prod.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-655 font-bold">
                            <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lower Price & CTA Block */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                      <div className="text-left">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-gray-900">${currentPrice.toFixed(2)}</span>
                          {prod.salePrice && (
                            <span className="text-[10px] text-gray-400 line-through">${prod.price.toFixed(2)}</span>
                          )}
                        </div>
                        {/* Rating stars line */}
                        <div className="flex items-center gap-1 text-[10px] text-yellow-500 mt-0.5">
                          <Star className="w-3 h-3 fill-current text-yellow-500" />
                          <span className="font-bold">{prod.rating}</span>
                          <span className="text-gray-400">({prod.reviewsCount})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          id={`quickview-btn-${prod.id}`}
                          onClick={() => onQuickView(prod)}
                          className="px-2.5 py-2 text-[10px] font-bold text-gray-650 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all cursor-pointer"
                        >
                          Quick View
                        </button>
                        
                        <button
                          id={`add-to-cart-${prod.id}`}
                          onClick={() => handleAddToCart(prod)}
                          disabled={prod.stockStatus === 'Out of Stock'}
                          className={`p-2.5 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                            addedProductId === prod.id
                              ? 'bg-emerald-500 text-white scale-95'
                              : prod.stockStatus === 'Out of Stock'
                              ? 'bg-gray-100 text-gray-405 cursor-not-allowed border border-gray-200'
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/10'
                          }`}
                        >
                          {addedProductId === prod.id ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <ShoppingCart className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => { onSearchChange(''); onNavigate('shop'); }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 hover:text-blue-600 border border-gray-200 text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              See All Verified Products Marketplace
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase block mb-2 font-black">BUILT FOR TRUST</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-950">Why Digital Agencies & Media Buyers Trust Us</h2>
            <p className="text-xs md:text-sm text-gray-500 mt-3 leading-relaxed font-semibold">
              We stand apart from cheap automated Resellers by delivering hand-warmed accounts matching residential ISP networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Value 1 */}
            <div className="p-6 rounded-2xl bg-[#F9FAFB] hover:bg-white border border-gray-200/90 hover:border-blue-400 flex gap-4 transition-all hover:shadow-xl duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Instant Auto-Delivery</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-semibold">
                  Login codes, cookie files (.JSON API formats), and private recovery emails are exposed in your client dashboard seconds after payment clearance.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="p-6 rounded-2xl bg-[#F9FAFB] hover:bg-white border border-gray-200/90 hover:border-blue-400 flex gap-4 transition-all hover:shadow-xl duration-300">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">KYC Verified Accounts</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-semibold">
                  Real people passport submissions and address validations already verified. We supply high-resolution utility documents in premium bundles.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="p-6 rounded-2xl bg-[#F9FAFB] hover:bg-white border border-gray-200/90 hover:border-blue-400 flex gap-4 transition-all hover:shadow-xl duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">24/7 Dedicated Care</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-semibold">
                  Speak immediately with digital security specialists who can resolve browser cookie imports or temporary verification holds.
                </p>
              </div>
            </div>
            
            {/* Value 4 */}
            <div className="p-6 rounded-2xl bg-[#F9FAFB] hover:bg-white border border-gray-200/90 hover:border-blue-400 flex gap-4 transition-all hover:shadow-xl duration-300">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">High Quality Service</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-semibold">
                  Never flagged by mass bots. We use dynamic fresh residential IP pools to warm and nurture social parameters organic style.
                </p>
              </div>
            </div>

            {/* Value 5 */}
            <div className="p-6 rounded-2xl bg-[#F9FAFB] hover:bg-white border border-gray-200/90 hover:border-blue-400 flex gap-4 transition-all hover:shadow-xl duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Secure Payments</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-semibold">
                  Supports anonymous smart contracts USDT, BTC, ETH alongside standard credit-card checkouts with secure payment gateways.
                </p>
              </div>
            </div>

            {/* Value 6 */}
            <div className="p-6 rounded-2xl bg-[#F9FAFB] hover:bg-white border border-gray-200/90 hover:border-blue-400 flex gap-4 transition-all hover:shadow-xl duration-300">
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-600 flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">No-Drop Reviews Services</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-semibold">
                  Boost your local rankings safely. Genuine reviews scheduled smoothly over realistic schedules so they never get filtered.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. STATISTICS SECTION */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATISTICS.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-[#F9FAFB] border border-gray-200 rounded-2xl relative shadow-sm hover:border-blue-300 transition-colors">
                {/* Visual back glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
                <span className="block text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                  {stat.value}{stat.suffix}
                </span>
                <span className="block text-xs uppercase font-mono tracking-widest text-gray-400 mt-2 font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-bold">SATISFIED CLIENTS</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2">AccStoreX Customer Success Stories</h2>
          </div>

          <div className="relative bg-[#F9FAFB] border border-gray-200 p-8 md:p-12 rounded-3xl overflow-hidden shadow-sm">
            {/* Quotation mark giant decoration */}
            <span className="absolute bottom-6 right-8 text-8xl text-gray-200 opacity-80 font-serif leading-none select-none">“</span>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonialIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: TESTIMONIALS[currentTestimonialIndex].stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-base md:text-lg text-gray-700 leading-relaxed font-sans italic font-semibold">
                  "{TESTIMONIALS[currentTestimonialIndex].comment}"
                </p>

                {/* Client Profile */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200/90">
                  <img
                    referrerPolicy="no-referrer"
                    src={TESTIMONIALS[currentTestimonialIndex].avatar}
                    alt={TESTIMONIALS[currentTestimonialIndex].author}
                    className="w-12 h-12 rounded-full border border-gray-255 object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{TESTIMONIALS[currentTestimonialIndex].author}</h4>
                    <span className="block text-[11px] text-gray-500 font-semibold">Verified Buyer • Bought <strong className="text-blue-600 font-bold">{TESTIMONIALS[currentTestimonialIndex].productTitle}</strong></span>
                    <span className="block text-[9px] text-gray-400 font-mono tracking-widest mt-1 font-bold">{TESTIMONIALS[currentTestimonialIndex].date}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel navigation controls */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <button
                id="prev-testimonial-btn"
                onClick={handlePrevTestimonial}
                className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-805 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="next-testimonial-btn"
                onClick={handleNextTestimonial}
                className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-805 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-20 md:py-24 bg-[#F9FAFB] border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full font-bold">
              KNOWLEDGE DESK
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#111827] mt-4">Frequently Asked FAQs</h2>
            <p className="text-xs text-gray-500 mt-2 font-semibold">Everything you need to know about setup guidelines, proxies, and safety checkpoints.</p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-colors shadow-sm"
                >
                  <button
                    id={`faq-expand-${idx}`}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between text-xs md:text-sm font-bold text-gray-800 hover:bg-gray-50/50 select-none cursor-pointer gap-4"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="px-5 pb-5 text-xs text-gray-550 leading-relaxed border-t border-gray-100 pt-3 font-semibold">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('faq')}
              className="text-xs text-[#2563EB] hover:text-blue-700 font-bold uppercase tracking-wider hover:underline"
            >
              See All FAQs & Troubleshooting Tips
            </button>
          </div>

        </div>
      </section>

      {/* 8. SEO BLOG PREVIEW SECTION */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase block font-black">GUIDANCE INSIGHTS</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#111827] mt-2">Latest Marketplace & Anti-Ban Articles</h2>
            </div>
            <button
              onClick={() => onNavigate('blog')}
              className="text-xs text-[#2563EB] hover:text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              Go to all blog guides <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOGS.map((blog) => (
              <article
                id={`blog-card-${blog.id}`}
                key={blog.id}
                onClick={() => onNavigate('blog')}
                className="group cursor-pointer bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-405 rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    referrerPolicy="no-referrer"
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold font-mono px-2.5 py-1 rounded-md">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-mono tracking-widest font-bold">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="text-xs md:text-sm font-extrabold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 h-10 leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 font-semibold">
                    {blog.brief}
                  </p>

                  <div className="pt-3 border-t border-gray-100 text-[11px] font-bold text-[#2563EB] flex items-center gap-1">
                    <span>Read Article Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 9. NEWSLETTER SECTION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative bg-[#F9FAFB] border border-gray-200 rounded-3xl p-8 md:p-12 overflow-hidden shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl -z-10" />

            <div className="lg:w-1/2">
              <span className="text-[10px] font-mono text-blue-600 tracking-wider font-extrabold block">VIP NOTIFICATIONS</span>
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight mt-1.5 leading-snug">
                Get Fresh Restock Alerts & Specialized Discount Coupons
              </h3>
              <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-semibold">
                Join our private newsletter loop. We broadcast aged profile restocks, high-volume payment methods updates, and SMTP clearance notices. No spam ever.
              </p>
            </div>

            <div className="lg:w-5/12 w-full">
              {newsletterSubscribed ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-600 bounce-in">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold font-sans">You are Subscribed!</h4>
                    <p className="text-[10px] text-emerald-600">We will mail clean discount coupons to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email to save 10%..."
                    className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors"
                  />
                  <button
                    id="newsletter-subscribe-submit"
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    Join Queue
                  </button>
                </form>
              )}
              <span className="block text-[9px] text-gray-400 text-center lg:text-left mt-2.5 font-mono font-bold">
                🔒 Privacy Secured. Unsubscribe automatically at any time.
              </span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

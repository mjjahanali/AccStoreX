import React, { useState, useEffect } from 'react';
import { 
  Star, Check, ShoppingCart, ShieldCheck, ListChecks, Send, 
  MessageSquare, ArrowLeft, Heart, CheckCircle, Info 
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import DynamicIcon from '../components/DynamicIcon';

interface ProductDetailsProps {
  productId: string;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onNavigate: (target: any) => void;
}

export default function ProductDetails({ 
  productId, 
  onAddToCart, 
  onToggleWishlist, 
  wishlist,
  onNavigate 
}: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'faq' | 'reviews'>('desc');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Load product dynamically
  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === productId);
    if (found) {
      setProduct(found);
      setQuantity(1);
      setActiveTab('desc');
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="bg-white text-gray-900 min-h-screen py-24 px-8 flex flex-col items-center justify-center font-sans">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 mx-auto">
            <Info className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Product Not Found</h2>
          <p className="text-sm text-gray-500">The product you are trying to view does not exist or has been archived from our secure listings.</p>
          <button
            onClick={() => {
              window.location.hash = 'shop';
              onNavigate('shop');
            }}
            className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Back to Shop Directory
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart(product, quantity);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const handleRelatedAddToCart = (relatedProd: Product) => {
    onAddToCart(relatedProd, 1);
    setAddedProductId(relatedProd.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  const currentPrice = product.salePrice || product.price;
  const isSaved = wishlist.includes(product.id);

  // Get related products from the same category
  const relatedProducts = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white text-gray-900 min-h-screen py-10 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb Navigation Block */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-5">
          <button
            onClick={() => {
              window.location.hash = 'shop';
              onNavigate('shop');
            }}
            className="flex items-center gap-2 text-xs font-black text-gray-550 hover:text-blue-600 transition-colors uppercase tracking-wider cursor-pointer font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </button>

          <div className="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider">
            Home / Shop / <span className="text-gray-600">{product.category.replace('-', ' ')}</span> / <span className="text-blue-605">{product.title.slice(0, 20)}...</span>
          </div>
        </div>

        {/* WooCommerce Main Section Split (White background style) */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
          
          {/* Left Visual Column */}
          <div className="w-full lg:w-5/12 bg-gray-50 p-6 md:p-10 rounded-3xl border border-gray-150 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/55 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl -z-10" />

            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-widest font-mono text-blue-600 uppercase bg-blue-100/50 border border-blue-200/60 px-3.5 py-1 rounded-full font-bold shadow-sm">
                Category: {product.category.replace('-', ' ')}
              </span>

              {/* Wishlist toggle */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-pink-500 hover:bg-pink-50 hover:border-pink-200 transition-colors cursor-pointer shadow-sm"
                title="Save product to wishlist"
              >
                <Heart className={`w-4.5 h-4.5 ${isSaved ? 'fill-pink-500 text-pink-500' : ''}`} />
              </button>
            </div>

            {/* Product Image Panel */}
            <div className="my-8 flex flex-col items-center justify-center">
              {product.imgUrl ? (
                <div className="relative group w-full max-w-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-1000"></div>
                  <img 
                    src={product.imgUrl} 
                    alt={product.title} 
                    referrerPolicy="no-referrer"
                    className="relative w-full aspect-[4/3] object-cover rounded-2xl border border-gray-200 shadow-md transition-transform duration-500 hover:scale-[1.01]" 
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-blue-100 to-indigo-100 border border-blue-200 flex items-center justify-center text-blue-600 shadow-inner">
                  <ShoppingCart className="w-12 h-12" />
                </div>
              )}
              
              <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-4 font-bold">★ SECURE BLOCKCHAIN-ENCRYPTED ASSET ★</p>

              {/* Product SEO Quick Info Panel (WooCommerce style E-E-A-T Index) */}
              <div className="mt-8 p-6 bg-white border border-gray-200 rounded-2xl space-y-2.5 w-full text-left shadow-sm">
                <span className="text-[9.5px] font-mono tracking-widest text-blue-600 uppercase font-black block">
                  🛡️ GOOGLE E-E-A-T SEARCH STATUS
                </span>
                <span className="text-sm text-black font-black block leading-tight">
                  {product.seoTitle || product.title}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {product.metaDescription || product.description}
                </p>
              </div>
            </div>

            {/* Premium Guarantee protection Badge */}
            <div className="bg-emerald-50/70 border border-emerald-250 p-5 rounded-2xl flex items-center gap-4 text-left">
              <ShieldCheck className="w-10 h-10 text-emerald-600 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-black text-emerald-950 uppercase tracking-wide">AccStoreX Active Buyer Protection</h5>
                <p className="text-[11.5px] text-emerald-800 leading-normal font-semibold">
                  Every order includes authentic cookies backup files, profile safety guides, live help setup sessions & free 48 hours active replacements.
                </p>
              </div>
            </div>
          </div>

          {/* Right Ordering Column */}
          <div className="w-full lg:w-7/12 text-left space-y-6">
            
            {/* Title Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price section & ratings with larger weights */}
            <div className="flex flex-wrap items-center gap-6 border-y border-gray-100 py-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-blue-600">${currentPrice.toFixed(2)}</span>
                {product.salePrice && product.price > product.salePrice && (
                  <span className="text-base text-gray-400 line-through font-medium">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <div className="hidden sm:block text-gray-300">|</div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4.5 h-4.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-base font-extrabold text-gray-850">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-500 font-bold">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            {/* Stock details */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className={`px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider ${
                product.stockStatus === 'In Stock' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : product.stockStatus === 'Low Stock'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-205'
              }`}>
                • {product.stockStatus}
              </span>
              <span className="text-gray-500 font-bold">• {product.featuresBrief}</span>
            </div>

            {/* Primary short text */}
            <p className="text-sm md:text-base text-gray-650 leading-relaxed font-sans">
              {product.description}
            </p>

            {/* DIRECT CHANNELS BEFORE ADD TO CART (TELEGRAM & WHATSAPP) */}
            <div className="p-6 bg-gray-50 border border-gray-250 rounded-2xl space-y-4 font-sans max-w-2xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-black block">
                  ⚡ DIRECT CHECKOUT OPERATORS
                </span>
                <span className="text-[9px] bg-red-105 text-red-600 border border-red-200 px-2 py-0.5 rounded font-black uppercase">
                  SKIP SHOPPING CART
                </span>
              </div>
              
              <p className="text-xs text-gray-500 leading-relaxed">
                Order this verified digital asset directly with our Wyoming office agents on Telegram or WhatsApp. We provide instant manuals, bulk pricing discounts, and quick manual checkouts:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={`https://t.me/EgSupport24?text=${encodeURIComponent(`Hello, I want to order "${product.title}" ($${currentPrice.toFixed(2)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-5 bg-[#229ED9] hover:bg-[#1C88BD] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-blue-400/15 text-center cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Telegram Operator
                </a>
                <a
                  href={`https://wa.me/13073939979?text=${encodeURIComponent(`Hello, I want to order "${product.title}" ($${currentPrice.toFixed(2)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-5 bg-[#25D366] hover:bg-[#20BE59] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-green-400/15 text-center cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Support
                </a>
              </div>
            </div>

            {/* WooCommerce Quantity Form + Standard Checkout CTA Button */}
            <div className="flex items-center gap-4 max-w-2xl pt-2 pb-6 border-b border-gray-105">
              <div className="flex items-center bg-gray-100 border border-gray-200 px-3 py-2 rounded-xl">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-0.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg text-lg font-bold transition-colors cursor-pointer"
                  disabled={product.stockStatus === 'Out of Stock'}
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-gray-800 min-w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-0.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg text-lg font-bold transition-colors cursor-pointer"
                  disabled={product.stockStatus === 'Out of Stock'}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stockStatus === 'Out of Stock' || isAdded}
                className={`flex-1 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 text-xs uppercase tracking-wider ${
                  isAdded 
                    ? 'bg-emerald-600 text-white scale-[0.97] shadow-lg shadow-emerald-600/20' 
                    : product.stockStatus === 'Out of Stock'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#111827] hover:bg-black text-white shadow-lg shadow-gray-900/15'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4.5 h-4.5 text-white stroke-[3]" />
                    Successfully Added to Cart
                  </>
                ) : product.stockStatus === 'Out of Stock' ? (
                  'Out of Stock'
                ) : (
                  <>
                    <ShoppingCart className="w-4.5 h-4.5" />
                    Add Product to Cart • ${(currentPrice * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>

            {/* WooCommerce Tab Info Switchers */}
            <div className="pt-6">
              <div className="border-b border-gray-200 flex gap-2 overflow-x-auto scroller-none mb-6">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`py-3 px-4 text-xs font-black tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'desc' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-400 hover:text-gray-800'
                  }`}
                >
                  Overview & E-E-A-T
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`py-3 px-4 text-xs font-black tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'specs' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-400 hover:text-gray-800'
                  }`}
                >
                  Specifications / Features
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`py-3 px-4 text-xs font-black tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'faq' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-400 hover:text-gray-800'
                  }`}
                >
                  Buyer FAQs
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-3 px-4 text-xs font-black tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'reviews' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-400 hover:text-gray-800'
                  }`}
                >
                  Client Testimonials ({product.reviewsList?.length || 0})
                </button>
              </div>

              {/* Dynamic WooCommerce tab body */}
              <div className="bg-white min-h-[160px] pb-8 pr-4">
                {activeTab === 'desc' && (
                  <div className="space-y-4">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                    <div 
                      className="text-gray-700 text-sm md:text-base space-y-4 leading-relaxed font-sans product-main-desc prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.mainDescription || '' }} 
                    />
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-black uppercase tracking-widest flex items-center gap-2">
                      <ListChecks className="w-5 h-5 text-blue-600" />
                      Digital Asset Checklist
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700 font-semibold">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-black uppercase tracking-widest">
                      Marketplace FAQ Index
                    </h3>
                    {product.faqs && product.faqs.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.faqs.map((faq, idx) => (
                          <div key={idx} className="bg-gray-50 border border-gray-150 p-4 rounded-2xl space-y-2">
                            <h5 className="text-xs md:text-sm font-black text-black flex items-start gap-1.5 leading-snug">
                              <span className="text-blue-600 font-mono font-bold">Q:</span>
                              {faq.question}
                            </h5>
                            <p className="text-xs text-gray-600 leading-relaxed pl-3.5 border-l border-gray-300">
                              {faq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">No custom Q&A items cataloged for this product.</p>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-black uppercase tracking-widest">
                      Verified Purchase Reviews & Status
                    </h3>
                    {product.reviewsList && product.reviewsList.length > 0 ? (
                      <div className="space-y-4">
                        {product.reviewsList.map((rev, idx) => (
                          <div key={idx} className="bg-gray-50 border border-gray-150 p-5 rounded-3xl space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={rev.avatar} 
                                  alt={rev.author} 
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                                />
                                <div>
                                  <p className="text-xs md:text-sm font-black text-black leading-none">{rev.author}</p>
                                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider font-mono">Verified Account Buyer • {product.category.replace('-', ' ')}</span>
                                </div>
                              </div>
                              <span className="text-xs text-gray-400 font-mono">{rev.date}</span>
                            </div>
                            
                            <div className="flex items-center gap-0.5 text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < rev.stars ? 'fill-current' : 'text-gray-200'}`} />
                              ))}
                            </div>

                            <p className="text-xs md:text-sm text-gray-600 italic leading-relaxed pl-1">
                              "{rev.comment}"
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">No client reviews reported for this digital listing yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-150 pt-16">
            <h3 className="text-xl md:text-2xl font-black text-black tracking-tight text-left mb-8">
              Related Digital Listings
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {relatedProducts.map((p) => {
                const isRelSaved = wishlist.includes(p.id);
                const relPrice = p.salePrice || p.price;

                return (
                  <div 
                    key={p.id}
                    className="bg-[#F9FAFB] border border-gray-200 hover:border-blue-300 rounded-2xl p-5 hover:shadow-lg transition-all flex flex-col justify-between relative group"
                  >
                    {/* Visual image or placeholder */}
                    <div>
                      {p.imgUrl && (
                        <div 
                          onClick={() => {
                            window.location.hash = `product/${p.id}`;
                            window.scrollTo(0, 0);
                          }}
                          className="w-full h-24 mb-4 rounded-xl overflow-hidden border border-gray-200 cursor-pointer relative"
                        >
                          <img 
                            src={p.imgUrl} 
                            alt={p.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2 mb-3">
                        <DynamicIcon name={p.icon} className="w-4 h-4 text-blue-600" />
                        <span className="text-[9px] font-mono tracking-wider text-gray-400 uppercase font-bold truncate">
                          {p.category.replace('-', ' ')}
                        </span>
                      </div>

                      <h4 
                        onClick={() => {
                          window.location.hash = `product/${p.id}`;
                          window.scrollTo(0, 0);
                        }}
                        className="text-xs font-extrabold text-black tracking-tight hover:text-blue-600 cursor-pointer line-clamp-2 leading-tight transition-colors mb-2"
                      >
                        {p.title}
                      </h4>
                      
                      <p className="text-[10px] text-gray-400 line-clamp-2 h-7 mb-4">
                        {p.featuresBrief}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-200">
                      <div>
                        <span className="text-sm font-black text-gray-950">${relPrice.toFixed(2)}</span>
                        <div className="flex items-center gap-0.5 text-yellow-400 mt-0.5">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[9.5px] font-bold text-gray-700">{p.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleRelatedAddToCart(p)}
                          disabled={p.stockStatus === 'Out of Stock'}
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
                            addedProductId === p.id 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                          }`}
                        >
                          {addedProductId === p.id ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <ShoppingCart className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

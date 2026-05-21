import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Check, ShoppingCart, ShieldCheck, ListChecks, Send, MessageSquare } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'faq' | 'reviews'>('desc');

  if (!product) return null;

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart(product, quantity);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const currentPrice = product.salePrice || product.price;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glass blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal body container - Redesigned to look like a WooCommerce Single Product page with a clean white background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white text-gray-900 border border-gray-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 font-sans max-h-[92vh]"
        >
          {/* Close button top right */}
          <button
            id="close-quickview-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: WooCommerce Visual Gallery Column */}
          <div className="md:w-5/12 bg-gray-50 p-8 flex flex-col justify-between border-r border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/55 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-105/40 rounded-full blur-3xl -z-10" />

            {/* Category Tag */}
            <div>
              <span className="text-[11px] tracking-widest font-mono text-blue-600 uppercase bg-blue-100/50 border border-blue-200/60 px-3 py-1 rounded-full font-bold">
                {product.category.replace('-', ' ')}
              </span>
            </div>

            {/* Centered visual matching keyword */}
            <div className="my-6 flex flex-col items-center justify-center">
              {product.imgUrl ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-35 transition duration-1000"></div>
                  <img 
                    src={product.imgUrl} 
                    alt={product.title} 
                    referrerPolicy="no-referrer"
                    className="relative w-full aspect-[4/3] max-w-64 object-cover rounded-2xl border border-gray-200 shadow-md mb-3" 
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-100 to-indigo-100 border border-blue-200 flex items-center justify-center text-blue-600 shadow-inner mb-4">
                  <ShoppingCart className="w-10 h-10" />
                </div>
              )}
              <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-2">SECURE DIGITAL FILE</p>
              
              {/* Product SEO Quick Info Panel (WooCommerce style E-E-A-T Index) */}
              <div className="mt-5 p-4 bg-white border border-gray-200 rounded-xl space-y-1.5 w-full text-left shadow-sm">
                <span className="text-[9px] font-mono tracking-widest text-blue-600 uppercase font-black block">
                  🛡️ GOOGLE E-E-A-T INDEXED
                </span>
                <span className="text-xs text-gray-800 font-bold block leading-tight">
                  {product.seoTitle || product.title}
                </span>
                <p className="text-[10.5px] text-gray-500 leading-normal">
                  {product.metaDescription || product.description}
                </p>
              </div>
            </div>

            {/* Guarantee badge */}
            <div className="bg-emerald-50/75 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-emerald-950">AccStoreX Protection</h5>
                <p className="text-[11px] text-emerald-800 leading-normal font-medium">Verified KYC + 48h active replacement warranty. Fast, zero-friction delivery.</p>
              </div>
            </div>
          </div>

          {/* Right Side: WooCommerce Buying Console & Action Forms */}
          <div className="md:w-7/12 p-8 flex flex-col justify-between max-h-[92vh] overflow-y-auto bg-white">
            <div>
              {/* WooCommerce Breadcrumbs */}
              <div className="text-[11.5px] font-mono text-gray-400 font-bold mb-1 uppercase tracking-wider">
                Home / Shop / {product.category.replace('-', ' ')}
              </div>

              {/* Product Title (larger font) */}
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-2 pr-6">
                {product.title}
              </h3>

              {/* Price & Star Rating */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl font-black text-blue-600">${currentPrice.toFixed(2)}</span>
                  {product.salePrice && product.price > product.salePrice && (
                    <span className="text-sm text-gray-405 line-through font-medium">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5 py-0.5 rounded-lg">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-extrabold text-gray-800">{product.rating}</span>
                  <span className="text-[11px] text-gray-500 font-medium">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Stock Status Tag */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider ${
                  product.stockStatus === 'In Stock' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : product.stockStatus === 'Low Stock'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  • {product.stockStatus}
                </span>
                <span className="text-[11.5px] text-gray-550 font-bold">{product.featuresBrief}</span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-gray-650 leading-relaxed my-4 font-sans">
                {product.description}
              </p>

              {/* DIRECT CHANNELS BEFORE ADD TO CART (TELEGRAM & WHATSAPP) */}
              <div className="my-5 p-4 bg-gray-50 border border-gray-250 rounded-2xl space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-black block">
                    ⚡ DIRECT CHECKOUT OPERATORS
                  </span>
                  <span className="text-[9px] bg-red-100 text-red-600 px-2 py-0.5 rounded font-black uppercase">
                    SKIP CART
                  </span>
                </div>
                
                <p className="text-[11px] text-gray-500 leading-normal">
                  Order this asset instantly with our Sheridan administrative coordinators via live workspace operators:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`https://t.me/EgSupport24?text=${encodeURIComponent(`Hello, I want to order "${product.title}" ($${currentPrice.toFixed(2)})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-[#229ED9] hover:bg-[#1C88BD] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-blue-400/15 text-center"
                  >
                    <Send className="w-4 h-4" />
                    Support on Telegram
                  </a>
                  <a
                    href={`https://wa.me/13073939979?text=${encodeURIComponent(`Hello, I want to order "${product.title}" ($${currentPrice.toFixed(2)})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20BE59] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-green-400/15 text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* WooCommerce Tab Section Selection */}
              <div className="border-b border-gray-200 mb-5 flex gap-1 overflow-x-auto scroller-none">
                <button
                  id="tab-desc-btn"
                  onClick={() => setActiveTab('desc')}
                  className={`py-2 px-3 text-[10.5px] font-black tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'desc' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-400 hover:text-gray-800'
                  }`}
                >
                  Overview & E-E-A-T
                </button>
                <button
                  id="tab-specs-btn"
                  onClick={() => setActiveTab('specs')}
                  className={`py-2 px-3 text-[10.5px] font-black tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'specs' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-400 hover:text-gray-800'
                  }`}
                >
                  Specifications
                </button>
                <button
                  id="tab-faq-btn"
                  onClick={() => setActiveTab('faq')}
                  className={`py-2 px-3 text-[10.5px] font-black tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'faq' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-400 hover:text-gray-800'
                  }`}
                >
                  FAQs
                </button>
                <button
                  id="tab-reviews-btn"
                  onClick={() => setActiveTab('reviews')}
                  className={`py-2 px-3 text-[10.5px] font-black tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'reviews' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-400 hover:text-gray-800'
                  }`}
                >
                  Client Reviews ({product.reviewsList?.length || 0})
                </button>
              </div>

              {/* Dynamic Content Columns */}
              <div className="min-h-[220px]">
                {activeTab === 'desc' && (
                  <div className="mb-8 p-1">
                    {/* Primary Short Text */}
                    <p className="text-xs text-gray-600 leading-relaxed font-sans mb-4">
                      {product.description}
                    </p>
                    {/* Raw Structured HTML styled nicely for white WooCommerce-tier layout */}
                    <div 
                      className="text-gray-705 text-xs md:text-sm space-y-3 leading-relaxed product-main-desc"
                      dangerouslySetInnerHTML={{ __html: product.mainDescription || '' }} 
                    />
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="mb-8 space-y-4 font-sans text-left">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <ListChecks className="w-4 h-4 text-blue-600" />
                      Detailed Technical Specifications
                    </h4>
                    <ul className="space-y-2.5 pl-1">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-750">
                          <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="mb-8 space-y-4 font-sans text-left">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Frequently Asked Questions
                    </h4>
                    {product.faqs && product.faqs.length > 0 ? (
                      product.faqs.map((faq, idx) => (
                        <div key={idx} className="space-y-1.5 bg-gray-50 p-4 rounded-2xl border border-gray-150">
                          <h5 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 leading-snug">
                            <span className="text-blue-600 font-mono">Q:</span>
                            {faq.question}
                          </h5>
                          <p className="text-[11.5px] text-gray-650 leading-relaxed pl-3 border-l border-gray-300">
                            {faq.answer}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">No specific FAQs compiled for this item.</p>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="mb-8 space-y-4 font-sans text-left">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Verified Client Testimonials ({product.reviewsList?.length || 0})
                    </h4>
                    {product.reviewsList && product.reviewsList.length > 0 ? (
                      product.reviewsList.map((rev, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 border border-gray-150 rounded-2xl space-y-2 text-left">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img 
                                src={rev.avatar} 
                                alt={rev.author} 
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                              />
                              <div>
                                <p className="text-xs font-bold text-gray-850 leading-none">{rev.author}</p>
                                <span className="text-[9px] font-mono text-emerald-600 font-bold">Verified Marketplace Client</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < rev.stars ? 'fill-current' : 'text-gray-200'}`} />
                            ))}
                          </div>
                          <p className="text-xs text-gray-600 italic pl-1 leading-normal">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">No client reviews collected yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Frame: WooCommerce Traditional Quantity Form + Add To Cart CTA */}
            <div className="border-t border-gray-200 pt-5 mt-4 flex items-center justify-between gap-4 font-sans">
              <div className="flex items-center bg-gray-100 border border-gray-200 px-2 py-1.5 rounded-xl">
                <button
                  id="dec-qty-btn"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-2.5 py-0.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg text-lg font-bold transition-colors cursor-pointer"
                  disabled={product.stockStatus === 'Out of Stock'}
                >
                  -
                </button>
                <span className="px-3.5 text-sm font-bold text-gray-800 min-w-8 text-center">{quantity}</span>
                <button
                  id="inc-qty-btn"
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-2.5 py-0.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg text-lg font-bold transition-colors cursor-pointer"
                  disabled={product.stockStatus === 'Out of Stock'}
                >
                  +
                </button>
              </div>

              <button
                id="add-to-cart-quickview-btn"
                onClick={handleAddToCart}
                disabled={product.stockStatus === 'Out of Stock' || isAdded}
                className={`flex-1 py-3.5 px-5 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 text-xs uppercase tracking-wider ${
                  isAdded 
                    ? 'bg-emerald-600 text-white scale-[0.97] shadow-lg shadow-emerald-600/20' 
                    : product.stockStatus === 'Out of Stock'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#111827] hover:bg-black text-white shadow-lg shadow-gray-900/10'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                    Added to cart!
                  </>
                ) : product.stockStatus === 'Out of Stock' ? (
                  'Out of Stock'
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart • ${(currentPrice * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

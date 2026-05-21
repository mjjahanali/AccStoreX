import React from 'react';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { CartItem, PageType } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (page: PageType) => void;
}

export default function Cart({ cart, onUpdateQuantity, onRemoveItem, onNavigate }: CartProps) {
  // Calculated totals
  const subTotal = cart.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="bg-[#F9FAFB] text-gray-900 min-h-screen py-10 md:py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Title details */}
        <div className="border-b border-gray-200 pb-6 mb-10">
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#111827] flex items-center gap-3 tracking-tight">
            <ShoppingCart className="w-8 h-8 text-blue-600 animate-pulse" />
            Shopping Cart ({cart.length} unique items)
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-semibold">Review your digital items list below before proceeding to encrypted checkout.</p>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side list columns (8/12) */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => {
                const currentPrice = item.product.salePrice || item.product.price;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-gray-250 hover:bg-gray-50/10 shadow-sm"
                  >
                    {/* Visual icon metadata info */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-105 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
                        <ShoppingCart className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 text-left">
                        <span className="block text-[10px] text-blue-650 font-mono font-bold capitalize tracking-wider">{item.product.category.replace('-', ' ')}</span>
                        <h4 className="text-xs md:text-sm font-extrabold text-gray-900 truncate pr-4">{item.product.title}</h4>
                        <span className="block text-[11px] text-[#2563EB] font-mono font-bold mt-1">${currentPrice.toFixed(2)} / unit</span>
                      </div>
                    </div>

                    {/* Quantity controls + Removal */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="flex items-center bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-xl shadow-inner">
                        <button
                          id={`dec-cart-qty-${item.product.id}`}
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-blue-650 px-2 py-0.5 text-base font-black transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-black font-mono text-gray-800 min-w-6 text-center">{item.quantity}</span>
                        <button
                          id={`inc-cart-qty-${item.product.id}`}
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-blue-650 px-2 py-0.5 text-base font-black transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="text-xs font-black text-gray-950 min-w-16 text-right font-mono">
                        ${(currentPrice * item.quantity).toFixed(2)}
                      </span>

                      {/* Remove item trigger */}
                      <button
                        id={`remove-item-${item.product.id}`}
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-rose-100"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}

              {/* Back to marketplace */}
              <button
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider cursor-pointer transition-colors pt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Add More Items
              </button>
            </div>

            {/* Right side summary panel columns (4/12) */}
            <div className="lg:col-span-4 bg-white border border-gray-200 p-6 rounded-2xl space-y-6 shadow-sm">
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-800">Order Summary</h3>
              </div>

              {/* Subtotal metrics */}
              <div className="space-y-3.5">
                <div className="flex justify-between text-xs text-gray-500 font-semibold">
                  <span>Subtotal</span>
                  <span className="font-mono font-extrabold text-gray-900">${subTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-500 font-semibold">
                  <span>Delivery Dispatch</span>
                  <span className="text-emerald-600 font-mono font-extrabold">FREE (INSTANT)</span>
                </div>

                <div className="flex justify-between text-xs text-gray-500 font-semibold">
                  <span>SSL Security Protection</span>
                  <span className="text-blue-600 font-mono font-extrabold">ACTIVE</span>
                </div>

                <div className="border-t border-gray-200 pt-3.5 flex justify-between items-baseline">
                  <span className="text-xs font-black text-gray-700">Total Price</span>
                  <span className="text-xl font-black text-gray-950 font-mono">${subTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to checkout button */}
              <button
                id="cart-checkout-cta"
                onClick={() => onNavigate('checkout')}
                className="w-full py-4 px-4 bg-blue-600 hover:bg-blue-700 text-xs font-black text-white rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 transition-colors cursor-pointer"
              >
                Proceed to Secure Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secure parameters label */}
              <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl flex gap-3 text-[10px] text-gray-500 leading-normal font-semibold">
                <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <p>Digital products keys are checked dynamically. Backups are delivered via AES 256 SSL encryption. 48 hour replace guarantee active.</p>
              </div>

            </div>

          </div>
        ) : (
          /* Empty state view */
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center text-gray-500 shadow-sm">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-bounce" />
            <h4 className="text-sm font-black text-gray-900">Your shopping cart is empty!</h4>
            <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto font-semibold">
              You haven't added any digital products, ads accounts, or SMTP databases yet. Explore our verified listings.
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="mt-6 px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs font-black transition-all shadow cursor-pointer"
            >
              Go to Sandbox Shop
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

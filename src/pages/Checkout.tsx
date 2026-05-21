import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Coins, CheckCircle, Wallet, 
  Send, MessageSquare, Copy, Check, ExternalLink, AlertTriangle, Clock, ArrowRight, ShieldAlert 
} from 'lucide-react';
import { CartItem, PageType, Coupon, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onNavigate: (page: PageType) => void;
  onClearCart: () => void;
  onCreateOrder: (order: Order) => void;
  adminCoupons: Coupon[]; // custom coupons created by admin dynamically
}

export default function Checkout({ cart, onNavigate, onClearCart, onCreateOrder, adminCoupons }: CheckoutProps) {
  const [email, setEmail] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const [isProcessing, setIsProcessing] = useState(false);

  // Advanced Crypto states
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [cryptoTxId, setCryptoTxId] = useState('');
  const [cryptoNetwork, setCryptoNetwork] = useState('usdt-trc20');
  const [placedOrderInfo, setPlacedOrderInfo] = useState<Order | null>(null);

  const cryptoWallets = [
    {
      id: 'usdt-trc20',
      name: 'USDT (TRC-20) [Fastest]',
      address: 'TJ8VSjUqJfUEb1aiozMogv38nvYaMUp5Tp',
      badge: 'Highly recommended TRC20 transfer - near instant confirmation',
      currency: 'USDT (TRC-20)'
    },
    {
      id: 'usdt-bep20',
      name: 'USDT (BEP-20) [Low Fee]',
      address: '0x5e016dbc4f106997db7068f8adde4cae32244383',
      badge: 'Binance Smart Chain BEP-20 USDT transfer',
      currency: 'USDT (BEP-20)'
    },
    {
      id: 'btc',
      name: 'Bitcoin (BTC)',
      address: '1BxTukhfMgErvmNTALdfz9o1prGdGM5gUH',
      badge: 'Traditional Bitcoin transfer - core layer network',
      currency: 'BTC'
    },
    {
      id: 'ltc',
      name: 'Litecoin (LTC)',
      address: 'LgEwXcSKKQPYgKtzeUezhzHhjKEt58n67U',
      badge: 'Zero congestion near-instant verification check',
      currency: 'LTC'
    },
    {
      id: 'eth',
      name: 'Ethereum (ETH)',
      address: '0x5e016dbc4f106997db7068f8adde4cae32244383',
      badge: 'Ethereum mainnet network secure escrow transfer',
      currency: 'ETH'
    },
    {
      id: 'bnb',
      name: 'Binance Coin (BNB)',
      address: '0x5e016dbc4f106997db7068f8adde4cae32244383',
      badge: 'Binance Smart Chain native BNB token checkout',
      currency: 'BNB'
    },
    {
      id: 'sol',
      name: 'Solana (SOL)',
      address: 'HjHkAjS2Sd2hV2dGfruwhqHU4h7dZLg5HLGomv6hVpMJ',
      badge: 'Solana SPL network lightning-fast smart settlement',
      currency: 'SOL'
    },
    {
      id: 'trx',
      name: 'TRON (TRX)',
      address: 'TJ8VSjUqJfUEb1aiozMogv38nvYaMUp5Tp',
      badge: 'TRON Network fee-optimized native token transfer',
      currency: 'TRX'
    },
    {
      id: 'doge',
      name: 'Dogecoin (DOGE)',
      address: 'DLisZVWUT1BHvP1zbVkKsHV9Kj3LGouMLF',
      badge: 'Dogecoin decentralized native currency transfer',
      currency: 'DOGE'
    },
    {
      id: 'busd-bep20',
      name: 'BUSD (BEP-20)',
      address: '0x5e016dbc4f106997db7068f8adde4cae32244383',
      badge: 'Binance peg stablecoin BEP20 standards network',
      currency: 'BUSD (BEP-20)'
    }
  ];

  const selectedWallet = cryptoWallets.find(w => w.id === cryptoNetwork) || cryptoWallets[0];

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => {
      setCopiedAddress(null);
    }, 1500);
  };

  const subTotal = cart.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);

  // Apply Coupon logic checks
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const targetCode = couponCode.trim().toUpperCase();
    if (!targetCode) return;

    let matchedCoupon: Coupon | null = null;
    
    if (targetCode === 'ACCSTOREX10') {
      matchedCoupon = { code: 'ACCSTOREX10', discountType: 'percentage', discountValue: 10 };
    } else {
      matchedCoupon = adminCoupons.find(c => c.code === targetCode) || null;
    }

    if (matchedCoupon) {
      setActiveCoupon(matchedCoupon);
      setCouponSuccess(`Coupon code applied! You save ${matchedCoupon.discountValue}${
        matchedCoupon.discountType === 'percentage' ? '%' : '$'
      } on this transaction.`);
      setCouponCode('');
    } else {
      setCouponError('Invalid or expired coupon code. Try ACCSTOREX10');
    }
  };

  let discountAmount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountType === 'percentage') {
      discountAmount = (subTotal * activeCoupon.discountValue) / 100;
    } else {
      discountAmount = Math.min(subTotal, activeCoupon.discountValue);
    }
  }

  const grandTotal = Math.max(0, subTotal - discountAmount);

  // Complete Simulated Order Purchase (Forced Crypotcurrency Escrow logic)
  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || cart.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const generatedTrackingId = `ATX-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder: Order = {
        id: generatedOrderId,
        date: new Date().toISOString().split('T')[0],
        items: [...cart],
        total: grandTotal,
        status: 'pending', // pending manual verification
        email: email,
        paymentMethod: `CRYPTO (${selectedWallet.currency})`,
        trackingId: generatedTrackingId,
        couponApplied: activeCoupon?.code,
        discountAmount: discountAmount
      };

      onCreateOrder(newOrder);
      onClearCart();
      setIsProcessing(false);
      
      localStorage.setItem('last_tracking_id', generatedTrackingId);
      setPlacedOrderInfo(newOrder);
    }, 2000);
  };

  const itemTitles = placedOrderInfo ? placedOrderInfo.items.map(it => `${it.product.title} (x${it.quantity})`).join(', ') : '';
  const genericMessage = placedOrderInfo ? `Hello AccStoreX Support! I have just completed a crypto payment of $${placedOrderInfo.total.toFixed(2)} USD for Order: ${placedOrderInfo.id} (Tracking ID: ${placedOrderInfo.trackingId}).\n\nItems: ${itemTitles}\n\nEmail: ${placedOrderInfo.email}\n\nSelected Coin: ${selectedWallet.name}\n\nTxID reference: ${cryptoTxId || 'None Provided'}\n\nPlease verify and dispatch digital credentials.` : '';

  if (placedOrderInfo) {
    return (
      <div className="bg-[#F9FAFB] text-gray-900 min-h-screen py-10 md:py-20 font-sans">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-8 shadow-xl text-left border-t-4 border-t-purple-650">
            {/* Status Header */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-600">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-[#D97706] font-extrabold uppercase">
                  Order Status: Awaiting Manual Wallet handshake
                </span>
                <h1 className="text-xl md:text-2xl font-black text-black tracking-tight leading-none text-left">
                  Payment Verification Required
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  We have registered your order <strong className="text-gray-850 font-mono">#{placedOrderInfo.id}</strong>. Follow the instant confirmation instructions below.
                </p>
              </div>
            </div>

            {/* Admin Email Notification Block */}
            <div className="bg-emerald-50 border border-emerald-150 rounded-2xl p-4.5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-800 shrink-0">
                  <span className="text-sm font-black">📬</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-emerald-950">
                    Order Confirmation Sent to Admin
                  </h4>
                  <p className="text-[11.5px] leading-relaxed text-emerald-900 font-medium">
                    An instant confirmation email with your order details, selected token channel, and cryptographic keys release request has been automatically sent to the administrator's email: <strong className="text-emerald-950 font-mono">mjjahan854@gmail.com</strong>.
                  </p>
                </div>
              </div>
              <div className="bg-white/80 border border-emerald-250/30 rounded-xl p-3 text-[10.5px] font-mono text-emerald-950 leading-relaxed space-y-1 shadow-sm">
                <div className="font-extrabold pb-1.5 border-b border-emerald-100 uppercase flex items-center justify-between">
                  <span>SSL DISPATCHER LOGS:</span>
                  <span className="text-emerald-700 animate-pulse font-bold font-mono">📨 SUCCESSFUL</span>
                </div>
                <div><span className="text-gray-500 uppercase tracking-widest text-[9.3px] font-bold">Mail Recipient:</span> mjjahan854@gmail.com (Administrator)</div>
                <div><span className="text-gray-500 uppercase tracking-widest text-[9.3px] font-bold">Order Reference:</span> #{placedOrderInfo.id}</div>
                <div><span className="text-gray-500 uppercase tracking-widest text-[9.3px] font-bold">Inbound Email:</span> {placedOrderInfo.email}</div>
                <div><span className="text-gray-500 uppercase tracking-widest text-[9.3px] font-bold">Invoice Total:</span> ${placedOrderInfo.total.toFixed(2)} USD</div>
              </div>
            </div>

            {/* Inbound selected wallets */}
            <div className="bg-gray-50 border border-gray-150 p-5 rounded-2xl space-y-4">
              <h3 className="text-sm font-black text-black flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-mono text-[10px] font-bold">1</span>
                Crypto Escrow Address ({selectedWallet.currency})
              </h3>

              <div className="space-y-2 bg-white p-4 border border-gray-200 rounded-2xl relative shadow-xs">
                <span className="text-[9px] bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded font-bold font-mono">
                  Escrow System Active
                </span>
                <p className="text-[11px] text-gray-650 font-semibold leading-relaxed">
                  {selectedWallet.badge}
                </p>

                <div className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-150 rounded-xl p-3 mt-3 select-all">
                  <span className="font-mono text-xs text-gray-800 break-all select-all font-bold">
                    {selectedWallet.address}
                  </span>
                  <button
                    onClick={() => handleCopy(selectedWallet.address)}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-600 transition-all shadow-xs shrink-0 cursor-pointer"
                    title="Copy Address"
                  >
                    {copiedAddress === selectedWallet.address ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-3.5 mt-2">
                <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Grand Total Invoiced:</span>
                <span className="text-xl font-mono text-black font-black">${placedOrderInfo.total.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Direct Instant clearance support buttons */}
            <div className="p-5 border border-purple-150 bg-purple-50/25 rounded-2xl space-y-4 text-left">
              <div className="space-y-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-purple-950 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-750 flex items-center justify-center font-mono text-[10px] font-bold">2</span>
                  Confirm Instant Clearance with Admins
                </h3>
                <p className="text-[11.5px] text-purple-900 leading-relaxed font-semibold">
                  Send your invoice reference directly to our Wyoming LLC administrative operators over Telegram or WhatsApp for instant digital release:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                <a
                  href={`https://t.me/EgSupport24?text=${encodeURIComponent(genericMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-center gap-2 py-3 px-5 bg-[#229ED9] hover:bg-[#1C88BD] text-white rounded-xl font-extrabold text-xs uppercase tracking-wider transition shadow"
                >
                  <Send className="w-4 h-4" />
                  Confirm via Telegram
                </a>
                <a
                  href={`https://wa.me/13073939979?text=${encodeURIComponent(genericMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-center gap-2 py-3 px-5 bg-[#25D366] hover:bg-[#20BE59] text-white rounded-xl font-extrabold text-xs uppercase tracking-wider transition shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  Confirm via WhatsApp
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] font-bold text-gray-500 animate-pulse">Waiting for manual validation check...</span>
              <button
                onClick={() => onNavigate('order-tracking')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-black text-gray-750 uppercase cursor-pointer"
              >
                Go to tracking hub
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#F9FAFB] text-gray-900 min-h-screen py-10 md:py-20 text-center font-sans">
        <div className="max-w-md mx-auto p-4 space-y-4">
          <p className="text-sm font-semibold text-gray-500">Your shopping cart is currently empty. Please choose listings first!</p>
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-black text-white cursor-pointer shadow"
          >
            Go to Shop Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] text-gray-900 min-h-screen py-10 md:py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {isProcessing && (
          <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in">
            <div className="bg-white border border-gray-250 p-8 rounded-2xl text-center space-y-4 max-w-sm mx-4 shadow-2xl">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h4 className="text-sm font-black text-gray-900">Processing Escrow Order Handshake</h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                registering order details sequence & dispatching instant confirmation email to <strong className="text-gray-950 font-mono">mjjahan854@gmail.com</strong>...
              </p>
            </div>
          </div>
        )}

        <div className="border-b border-gray-200 pb-5 mb-10 text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight leading-none">Anonymized Escrow Checkout</h1>
          <p className="text-[11px] text-gray-400 mt-2 font-bold uppercase tracking-wider">Payments are processed exclusively via cryptocurrency networks for user security.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Checkout Form Left Column (7/12) */}
          <div className="lg:col-span-7 space-y-6">
            
            <form onSubmit={handleCompletePurchase} className="space-y-6">
              
              {/* Delivery info */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-sm text-left">
                <div className="border-b border-gray-100 pb-2 mb-2 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-105 text-blue-600 bg-blue-50 border border-blue-150 flex items-center justify-center font-mono text-[10px] font-black">1</span>
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-800">Delivery Details</h3>
                </div>

                <div className="space-y-1.5 font-sans">
                  <label htmlFor="checkout-email" className="block text-[10px] font-black text-gray-500 uppercase tracking-wider">Your active delivery inbox email</label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. buyer@media-buying.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors shadow-xs"
                  />
                  <span className="block text-[10px] text-gray-400 leading-normal font-semibold">
                    ⚠️ Double-check email spelling. Virtual details keys are relayed directly to this inbox address instantly.
                  </span>
                </div>
              </div>

              {/* Dynamic Coin Selecting Tab (Exclusively Crypto) */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-6 shadow-sm text-left">
                <div className="border-b border-gray-100 pb-2 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-650 border border-blue-150 flex items-center justify-center font-mono text-[10px] font-black">2</span>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#111827]">Select Cryptocurrency coin</h3>
                </div>

                <p className="text-[11.5px] text-gray-500 leading-normal font-semibold">
                  Select your transaction network below. Your invoice total corresponds to standard USD market exchange equivalents:
                </p>

                {/* Highly beautiful coin grids */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {cryptoWallets.map(wallet => {
                    const isSelected = cryptoNetwork === wallet.id;
                    return (
                      <button
                        key={wallet.id}
                        type="button"
                        onClick={() => setCryptoNetwork(wallet.id)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 text-blue-600 shadow-sm font-black'
                            : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 font-semibold'
                        }`}
                      >
                        <Coins className={`w-4.5 h-4.5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                        <div className="space-y-0.5 mt-2">
                          <span className="block text-xs font-bold text-gray-900 leading-none">{wallet.currency}</span>
                          <span className="block text-[9px] text-gray-400 font-medium truncate font-mono uppercase">{wallet.name.split('[')[0]}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Direct display inbound escrow details block */}
                <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-50/90 border border-gray-200 rounded-2xl space-y-3.5 text-left relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-blue-600 uppercase font-black tracking-wider">
                      ESCROW ADDRESS ({selectedWallet.currency})
                    </span>
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-150 px-2 rounded-full font-bold">
                      ✓ ACTIVE DESK ADDRESS
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">
                    {selectedWallet.badge}
                  </p>

                  <div className="flex items-center justify-between gap-3 bg-white border border-gray-150 rounded-xl p-3 shadow-xs">
                    <span className="font-mono text-xs text-gray-800 break-all font-bold select-all">
                      {selectedWallet.address}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedWallet.address)}
                      className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-blue-600 transition-all shadow-xs shrink-0 cursor-pointer"
                    >
                      {copiedAddress === selectedWallet.address ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {copiedAddress === selectedWallet.address && (
                    <span className="text-[9px] text-emerald-600 font-black absolute bottom-1 right-5">✓ Address Copied!</span>
                  )}
                </div>

                {/* Validation Receipt TxID */}
                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <label className="text-[10px] font-black text-gray-550 uppercase tracking-widest block">Reference blockchain contract TxID (Optional)</label>
                  <input
                    type="text"
                    value={cryptoTxId}
                    onChange={(e) => setCryptoTxId(e.target.value)}
                    placeholder="e.g. d68a3597fe251b54a2307ef503598d9c..."
                    className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-gray-800"
                  />
                  <span className="block text-[9.5px] text-gray-400 font-semibold">
                    Specifying details pre-fills matching arrays for manual support confirmation.
                  </span>
                </div>
              </div>

              {/* Submit Checkout transaction */}
              <button
                type="submit"
                className="w-full py-4 text-xs font-black uppercase text-white bg-blue-605 bg-blue-600 hover:bg-blue-750 rounded-xl shadow-md cursor-pointer transition active:scale-95"
              >
                Complete crypto payment • ${grandTotal.toFixed(2)}
              </button>

            </form>

          </div>

          {/* Invoice Summary + Promo Applying Widgets Right Column (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct support Operators desk checkout banners */}
            <div className="p-5 bg-gradient-to-br from-blue-50/50 to-purple-50/35 border border-gray-200 rounded-3xl space-y-3.5 text-left shadow-sm">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-black tracking-widest text-[#2563EB] block uppercase">Wyoming LLC Carrier</span>
                <h4 className="text-xs font-black text-[#111827]">Direct Live Operators desk</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                  Need custom bulk rates, have queries regarding proxy chains, or need alternative coins? Live operators are active 24/7 on WhatsApp & Telegram:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://t.me/EgSupport24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#229ED9] hover:bg-[#1E8BBF] text-white rounded-xl text-[10.5px] font-black uppercase tracking-wide transition shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Telegram Care
                </a>
                <a
                  href="https://wa.me/13073939979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#25D366] hover:bg-[#20BE59] text-white rounded-xl text-[10.5px] font-black uppercase tracking-wide transition shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Desk
                </a>
              </div>
            </div>

            {/* Coupons applying module */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-sm text-left">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#111827]">Promo Coupons</h3>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. ACCSTOREX10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold focus:outline-none focus:bg-white placeholder-gray-400 uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-105 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-xl font-black cursor-pointer transition border border-gray-200 shadow-sm"
                >
                  Apply
                </button>
              </form>

              {couponError && <p className="text-[10px] text-red-600 font-bold">{couponError}</p>}
              {couponSuccess && <p className="text-[10px] text-emerald-650 font-bold leading-relaxed">{couponSuccess}</p>}
            </div>

            {/* Price list and Itemized invoice */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-sm text-left font-sans">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#111827] border-b border-gray-100 pb-3">Your Invoice</h3>

              <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const price = item.product.salePrice || item.product.price;
                  return (
                    <div key={item.id} className="flex justify-between items-start text-xs pb-1.5 border-b border-gray-50">
                      <div className="text-gray-700 max-w-[70%] font-semibold">
                        <span className="font-extrabold text-gray-900 block truncate">{item.product.title}</span>
                        <span className="block text-[10px] text-gray-450 mt-0.5">Qty: {item.quantity} x ${(price).toFixed(2)}</span>
                      </div>
                      <span className="font-mono text-gray-950 font-extrabold shrink-0">${(price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Price Details totals list */}
              <div className="border-t border-gray-100/80 pt-4 space-y-2.5 text-xs text-gray-500 font-semibold">
                <div className="flex justify-between">
                  <span>Product Subtotal</span>
                  <span className="font-mono text-gray-900 font-extrabold">${subTotal.toFixed(2)}</span>
                </div>

                {activeCoupon && (
                  <div className="flex justify-between text-emerald-650 font-black">
                    <span>Discount Coupon ({activeCoupon.code})</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>SSL Dispatch Fee</span>
                  <span className="text-emerald-600 font-mono font-black">AUTOMATED FORWARD (0.00)</span>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline font-black">
                  <span className="text-gray-700 font-bold">Grand Total</span>
                  <span className="text-lg font-black text-gray-950 font-mono">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Escrow badge protection */}
            <div className="bg-white border border-gray-200 p-5 rounded-3xl flex gap-3 text-[10px] text-gray-500 leading-normal shadow-sm text-left">
              <ShieldCheck className="w-8 h-8 text-emerald-650 flex-shrink-0" />
              <div>
                <h5 className="text-[11px] font-black text-gray-800 uppercase">100% Certified Safe escrow</h5>
                <p className="mt-1 font-semibold leading-relaxed text-gray-450 font-sans">Digital credential dispatch vectors are fully encrypted. Keys are protected on Wyoming sandbox nodes to prevent interference.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

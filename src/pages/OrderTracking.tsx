import React, { useState, useEffect } from 'react';
import { Search, Loader2, ArrowRight, ClipboardCopy, CheckCircle, Key, ShieldCheck } from 'lucide-react';
import { Order, PageType } from '../types';

interface OrderTrackingProps {
  ordersList: Order[]; // Global orders list to query
  onNavigate: (page: PageType) => void;
}

export default function OrderTracking({ ordersList, onNavigate }: OrderTrackingProps) {
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Auto query last order placed on mount
  useEffect(() => {
    const lastId = localStorage.getItem('last_tracking_id');
    if (lastId) {
      setTrackingIdInput(lastId);
      handleSearchQueryId(lastId);
      // Clean after lookup to keep it fresh
      localStorage.removeItem('last_tracking_id');
    }
  }, [ordersList]);

  const handleSearchQueryId = (id: string) => {
    if (!id.trim()) return;

    setIsSearching(true);
    setSearchedId(id);

    // Simulated short database search
    setTimeout(() => {
      const found = ordersList.find(o => o.trackingId.trim().toUpperCase() === id.trim().toUpperCase());
      setMatchedOrder(found || null);
      setIsSearching(false);
    }, 800);
  };

  const handleCopyClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-[#F9FAFB] text-gray-900 min-h-screen py-10 md:py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Title Details */}
        <div className="text-center border-b border-gray-200 pb-10 mb-12">
          <span className="text-[10px] tracking-widest font-mono text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full uppercase font-black">
            SECURE RECOLLECTION GATEWAY
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] mt-4 tracking-tight">
            Track Digital Account Dispatch
          </h1>
          <p className="text-xs md:text-sm text-gray-550 mt-2 max-w-xl mx-auto leading-relaxed font-semibold">
            Enter your transaction SOCKS tracking ID to review direct verification logs and copy credential backup files instantly.
          </p>
        </div>

        {/* Search Bar query */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl max-w-xl mx-auto mb-10 shadow-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchQueryId(trackingIdInput);
            }}
            className="flex gap-2"
          >
            <input
              id="tracking-id-input-field"
              type="text"
              required
              placeholder="e.g. ATX-195420"
              value={trackingIdInput}
              onChange={(e) => setTrackingIdInput(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-950 font-bold uppercase focus:outline-none focus:border-blue-505 focus:bg-white transition-colors shadow-sm"
            />
            <button
              id="submit-tracking-search"
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-xs font-black text-white rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-blue-500/10"
            >
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch Keys'}
            </button>
          </form>
          <span className="block text-[9.5px] text-gray-400 text-center mt-3 font-mono font-bold">
            ℹ️ SOCKS IDs are formatted like "ATX-XXXXXX" (contained in payment receipts)
          </span>
        </div>

        {/* Dynamic tracking output panel */}
        {isSearching ? (
          <div className="text-center py-12">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-xs text-gray-500 font-semibold">Inspecting escrow databases and decrypting key folders...</p>
          </div>
        ) : matchedOrder ? (
          /* Found Order Panel details */
          <div className="space-y-8 animate-slide-in">
            
            {/* Standard Timeline tracker */}
            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 pb-4 mb-6">
                <div>
                  <span className="text-[10px] text-gray-400 font-mono font-bold">SOCKS TRACKING ID:</span>
                  <h3 className="text-sm font-black text-gray-950 tracking-tight font-mono">{matchedOrder.trackingId}</h3>
                </div>
                <div className="text-right sm:text-right">
                  <span className="block text-[10px] text-gray-400 font-mono font-bold">PAYMENT METHOD:</span>
                  <span className="text-xs font-black text-blue-605 font-mono">{matchedOrder.paymentMethod}</span>
                </div>
              </div>

              {/* Graphical nodes timeline */}
              <div className="relative pt-6 pb-2">
                {/* Horizontal line */}
                <div className="absolute top-[37px] left-8 right-8 h-1 bg-gray-100 -z-10 animate-pulse" />
                <div className="absolute top-[37px] left-8 right-1/2 h-1 bg-blue-600 -z-10" />
                
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-sans">
                  {/* Step 1: Placed */}
                  <div className="space-y-2 flex flex-col items-center">
                    <span className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white text-white flex items-center justify-center text-[10px] font-black font-mono shadow-sm">1</span>
                    <span className="font-extrabold text-gray-900">Ordered</span>
                    <span className="text-[9px] text-gray-400 font-mono font-bold">{matchedOrder.date}</span>
                  </div>

                  {/* Step 2: Pay checked */}
                  <div className="space-y-2 flex flex-col items-center">
                    <span className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white text-white flex items-center justify-center text-[10px] font-black font-mono shadow-sm">2</span>
                    <span className="font-extrabold text-gray-900">Paid Checked</span>
                    <span className="text-[9px] text-gray-400 font-mono font-bold">Cleared ✓</span>
                  </div>

                  {/* Step 3: Sandboxed */}
                  <div className="space-y-2 flex flex-col items-center">
                    <span className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white text-white flex items-center justify-center text-[10px] font-black font-mono text-center shadow-sm font-bold">3</span>
                    <span className="font-extrabold text-gray-900">KYC check</span>
                    <span className="text-[9px] text-emerald-600 font-mono font-bold">Secured</span>
                  </div>

                  {/* Step 4: Dispatched */}
                  <div className="space-y-2 flex flex-col items-center">
                    <span className={`w-6 h-6 rounded-full border-4 border-white text-white flex items-center justify-center text-[10px] font-black font-mono shadow-sm ${
                      matchedOrder.status === 'delivered' ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}>4</span>
                    <span className="font-extrabold text-gray-900">Delivered</span>
                    <span className="text-[9px] text-emerald-600 font-mono font-black">IN DASHBOARD</span>
                  </div>
                </div>
              </div>

            </div>

            {/* DELIVERED DIGITAL KEYS LIST - Absolute centerpiece */}
            <div className="bg-white border border-emerald-500/10 p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-emerald-600 animate-pulse" />
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">SECURE ACCOUNT DISPATCH TABLE</h4>
                </div>
                {/* Copied alert bubbles */}
                {isCopied && (
                  <span className="text-[10px] bg-emerald-50 border border-emerald-250 text-emerald-700 px-3 py-1 rounded-full font-black animate-slide-in">
                    KEYS COPIED TO CLIPBOARD
                  </span>
                )}
              </div>

              {/* Dynamic Delivery Account credentials mapping */}
              <div className="space-y-5">
                {matchedOrder.items.map((cartItem) => {
                  // Fallback simulation keys if none pre-written
                  const dynamicKeys = cartItem.product.keys || [
                    `${cartItem.product.id}_verify_pro: PasswordSec_9941: recovery_gmail@accstorex.com`,
                    'RESIDENTIAL_SOCKS5_PROXY: 185.110.12.92:9910:proxyusr_22:proxypass_99'
                  ];

                  const rawKeyText = dynamicKeys.join('\n');

                  return (
                    <div key={cartItem.id} className="bg-gray-50 border border-gray-150 rounded-xl p-4 md:p-5 space-y-3.5 shadow-inner">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-black text-blue-650 font-sans truncate">{cartItem.product.title}</span>
                        <button
                          id={`copy-keys-${cartItem.id}`}
                          onClick={() => handleCopyClipboard(rawKeyText)}
                          className="px-2.5 py-1.5 bg-white hover:bg-gray-105 text-gray-700 hover:text-blue-600 rounded-lg text-[10px] font-extrabold font-mono border border-gray-200 flex items-center gap-1 cursor-pointer transition shadow-sm"
                        >
                          <ClipboardCopy className="w-3.5 h-3.5" /> Copy Credentials
                        </button>
                      </div>

                      {/* Display Box with JetBrains Mono code */}
                      <pre className="p-3.5 bg-white border border-gray-200 rounded-lg text-[10.5px] font-mono text-gray-800 leading-relaxed overflow-x-auto whitespace-pre-wrap select-text shadow-sm">
                        {rawKeyText}
                      </pre>

                      <div className="flex items-center gap-2 text-[10px] text-gray-500 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Include original proxy settings. Login using SOCKS residential proxy connection only.</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Troubleshooting action block */}
              <div className="p-4 bg-red-50/40 border border-red-100 rounded-xl text-center">
                <span className="block text-[10px] text-red-700 font-mono font-black">WARRANTY EXPIRES IN 48 HOURS</span>
                <p className="text-[10px] text-gray-500 mt-1 pb-2 font-semibold">If you encounter login authentication blocks, contact support channels immediately for replacement keys.</p>
                <a 
                  href="https://t.me/EgSupport24" 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="text-[10px] text-blue-600 font-black tracking-wider hover:underline inline-flex items-center gap-1 uppercase transition-all"
                >
                  Contact Telegram @EgSupport24 Support Dept <ArrowRight className="w-3 h-3" />
                </a>
              </div>

            </div>

          </div>
        ) : searchedId ? (
          /* Not Found State */
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 max-w-xl mx-auto shadow-sm">
            <h4 className="text-sm font-black text-gray-900">Tracking SOCKS ID not found!</h4>
            <p className="text-xs text-gray-550 leading-relaxed mt-2 font-semibold">
              We couldn't locate any electronic items sheet matching tracking ID <strong>"{searchedId.toUpperCase()}"</strong> in our databases.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed mt-2 font-medium">
              If you verified checking out using Cryptocurrency under 5 mins ago, wait for 1-2 block network confirmations and reload.
            </p>
            <button
              id="clear-tracking-btn"
              onClick={() => { setTrackingIdInput(''); setSearchedId(''); }}
              className="mt-6 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 text-xs font-bold text-gray-700 cursor-pointer shadow-sm transition"
            >
              Reset search input
            </button>
          </div>
        ) : (
          /* Empty Search Prompt state */
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 max-w-xl mx-auto shadow-sm">
            <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest">Active Order Tracking Console</h4>
            <p className="text-[11px] text-gray-500 mt-2.5 max-w-xs mx-auto leading-relaxed font-semibold">
              Retrieve transaction credentials securely. Type your tracking code to read live proxy files and backup documents instantly.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

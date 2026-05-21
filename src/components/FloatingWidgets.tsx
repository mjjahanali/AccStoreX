import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Phone, X, Check, Send } from 'lucide-react';

export default function FloatingWidgets() {
  const [isOpen, setIsOpen] = useState(false);

  const telegramLink = "https://t.me/EgSupport24";
  const whatsappLink = "https://wa.me/13073939979";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      
      {/* 24/7 Support Badge - Always visible on desktop */}
      <div className="hidden md:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-full shadow-lg shadow-emerald-950/20 text-xs text-emerald-400 font-medium tracking-wide">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        24/7 Customer Support
      </div>

      {/* Main Expandable Support Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-2xl shadow-blue-950/20 text-slate-100"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-semibold">
                    AX
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950"></span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-slate-100">AccStoreX Support</h4>
                  <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                    <span>•</span> Live support online
                  </p>
                </div>
              </div>
              <button 
                id="close-floating-support"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="Close widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Hello! Choose a support channel below to speak directly with an expert. We reply instantly to assist you with purchases, custom specs, or account setups.
            </p>

            <div className="flex flex-col gap-2">
              {/* Telegram Button */}
              <a
                id="tg-support-floating-btn"
                href={telegramLink}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-between gap-3 bg-[#1E96C8]/10 hover:bg-[#1E96C8]/20 border border-[#1E96C8]/20 hover:border-[#1E96C8]/40 p-3 rounded-xl text-slate-100 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1E96C8] flex items-center justify-center text-white">
                    {/* Telegram custom SVG (reliable) */}
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.07-.19-.04-.27-.03-.12.02-1.95 1.24-5.51 3.64-.52.36-.99.54-1.41.52-.47-.01-1.37-.27-2.03-.49-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.75 3.87-1.69 6.45-2.8 7.74-3.33 3.69-1.5 4.45-1.76 4.96-1.77.11 0 .37.03.53.16.14.12.18.28.2.45-.02.07-.02.13-.02.2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-semibold text-slate-100">Telegram Instant Care</span>
                    <span className="block text-[10px] text-slate-400">@EgSupport24</span>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-900 border border-[#1E96C8]/30 text-[#1E96C8] px-2 py-0.5 rounded-full font-semibold group-hover:bg-[#1E96C8] group-hover:text-white transition-colors duration-200">
                  REPLIES INSTANTLY
                </span>
              </a>

              {/* WhatsApp Button */}
              <a
                id="wa-support-floating-btn"
                href={whatsappLink}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-between gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 hover:border-[#25D366]/40 p-3 rounded-xl text-slate-100 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center text-white">
                    {/* WhatsApp custom SVG (reliable) */}
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.335 4.963L2 22l5.233-1.373a9.957 9.957 0 004.773 1.215h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.669-1.037-5.176-2.922-7.062A9.913 9.913 0 0012.012 2zm5.727 14.06c-.25.703-1.455 1.285-1.996 1.365-.5.074-1.15.138-3.346-.774-2.808-1.167-4.622-4.025-4.762-4.21-.14-.187-1.144-1.522-1.144-2.906 0-1.385.723-2.066 1.002-2.347.279-.279.613-.349.818-.349.204 0 .408.001.585.009.183.008.43.003.674.593.25.602.853 2.08.927 2.228.074.148.123.32.025.516-.098.196-.148.318-.295.49-.148.173-.31.387-.443.52-.148.148-.303.31-.131.606.172.296.764 1.26 1.636 2.037.112.1.21.2.3.26.11.08.2.14.37.16.173.02.433-.141.528-.318.094-.177.16-.316.29-.441.13-.125.26-.06.45-.008.19.052 1.2.569 1.408.673.208.104.347.155.397.242.05.086.05.51-.2.1.z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-semibold text-slate-100">WhatsApp Hotline</span>
                    <span className="block text-[10px] text-slate-400">+1 (307) 393-9979</span>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-900 border border-[#25D366]/30 text-[#25D366] px-2 py-0.5 rounded-full font-semibold group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-200">
                  ONLINE NOW
                </span>
              </a>
            </div>

            <div className="mt-3 text-center border-t border-slate-900 pt-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                SECURE SECRECY ACCSTOREX
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        id="toggle-floating-support"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 border border-blue-400/20 hover:scale-105 active:scale-95 transition-all outline-none group cursor-pointer"
        aria-label="Open support options"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -95, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 95, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message-icon"
              initial={{ rotate: 95, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6 group-hover:hidden" />
              <div className="hidden group-hover:flex items-center justify-center gap-1">
                {/* Visual indicator show custom paperplane */}
                <Send className="w-5 h-5 animate-pulse" />
              </div>
              <span className="absolute -top-1.5 -right-1.5 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-950 animate-bounce"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

    </div>
  );
}

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle, Smartphone, Key, Settings, CreditCard, RefreshCw } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Additional technical troubleshooter guides
  const troubleshooterGuides = [
    {
      title: 'Importing Cookies (.JSON) into anti-detect profiles',
      icon: 'Settings',
      desc: 'All profile formats contain cookie text strings. Load them into custom browsers (AdsPower, Dolphin, Multilogin) using standard cookie injectors to assume instantaneous localized authentication states without triggering captcha prompts.'
    },
    {
      title: 'Managing 2FA codes during startup setups',
      icon: 'Key',
      desc: 'If an account prompts multi-factor checks, we enclose the raw BASE32 seed string in your delivery sheet. Input this key into standard GAuth tools or 2fa.live to fetch instant, valid 6-digit numeric login tokens.'
    },
    {
      title: 'Bypassing instant PayPal/Stripe holding restrictions',
      icon: 'CreditCard',
      desc: 'Process micro transactions ($5-$10) from separate genuine localized IPs initially. Avoid direct automated webhook bulk calls during the initial 48 hours to let the profile settle on your device caches comfortably.'
    },
    {
      title: 'Using temporary virtual numbers for OTP actions',
      icon: 'Smartphone',
      desc: 'If an emergency security check prompts an SMS check code, reach our custom support telegram operator @EgSupport24. We link the original virtual sim card to relay verification texts instantly.'
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 md:py-20 font-sans relative">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Title */}
        <div className="text-center border-b border-slate-900 pb-10 mb-16">
          <span className="text-[10px] tracking-widest font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded-full uppercase">
            KNOWLEDGE BASE
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100 mt-3 tracking-tight">
            Knowledge Desk & Help Guides
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
            Troubleshoot profile logins, load session credentials, map residential socks5 proxy lists, and find official guarantee details instantly.
          </p>
        </div>

        {/* 1. Main Accordion FAQ list */}
        <div className="space-y-6 mb-16">
          <h2 className="text-lg font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2 border-b border-slate-900 pb-3">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            General Questions & Marketplace Answers
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    id={`faq-page-trigger-${idx}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between text-xs md:text-sm font-bold text-slate-200 hover:bg-slate-900 transition-colors select-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <p className="p-5 pt-3 text-xs text-slate-400 leading-relaxed border-t border-slate-900 bg-slate-950/40 animate-slide-in">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Technical Guide sections cards */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2 border-b border-slate-900 pb-3">
            <Settings className="w-5 h-5 text-blue-500" />
            Advanced Account Startup Guides
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {troubleshooterGuides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl relative shadow-md"
              >
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    {guide.icon === 'Settings' && <Settings className="w-4.5 h-4.5" />}
                    {guide.icon === 'Key' && <Key className="w-4.5 h-4.5" />}
                    {guide.icon === 'CreditCard' && <CreditCard className="w-4.5 h-4.5" />}
                    {guide.icon === 'Smartphone' && <Smartphone className="w-4.5 h-4.5" />}
                  </div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-200 tracking-tight leading-snug">
                    {guide.title}
                  </h4>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {guide.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical operator guarantee details */}
        <div className="mt-12 p-6 bg-slate-900/50 border border-slate-850/80 rounded-2xl text-center">
          <p className="text-xs text-slate-400">
            For step-by-step video manuals or personalized installation pings on your own proxy tunnels, message our 24/7 operators directly.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-bold">
            <a href="https://t.me/EgSupport24" target="_blank" referrerPolicy="no-referrer" className="text-[#1E96C8] hover:underline flex items-center gap-1">Telegram: @EgSupport24</a>
            <span className="text-slate-800">•</span>
            <a href="https://wa.me/13073939979" target="_blank" referrerPolicy="no-referrer" className="text-[#25D366] hover:underline flex items-center gap-1">WhatsApp Hotline Assistance</a>
          </div>
        </div>

      </div>
    </div>
  );
}

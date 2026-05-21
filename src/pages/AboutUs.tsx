import React from 'react';
import { ShieldCheck, Award, MessageCircle, HelpCircle, Users, CheckCircle } from 'lucide-react';
import { PageType } from '../types';

interface AboutUsProps {
  onNavigate: (page: PageType) => void;
}

export default function AboutUs({ onNavigate }: AboutUsProps) {
  return (
    <div className="bg-[#F9FAFB] text-gray-900 min-h-screen py-10 md:py-20 font-sans relative">
      {/* Decorative gradient backdrops */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-24 right-10 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Title details */}
        <div className="text-center border-b border-gray-200 pb-12 mb-16">
          <span className="text-[10px] tracking-widest font-mono text-[#2563EB] uppercase font-black">
            WHO WE ARE
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 tracking-tight mt-3">
            High-Tier Digital Infrastructure Brokers
          </h1>
          <p className="text-xs md:text-sm text-gray-550 mt-3 max-w-xl mx-auto leading-relaxed font-semibold">
            AccStoreX is the trustworthy partner of multi-million dollar e-commerce dropshippers, Facebook and Google media buyers, affiliate marketers, and high-frequency traders.
          </p>
        </div>

        {/* Narrative columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 animate-fade-in">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 tracking-tight leading-snug">
              Bypassing reselling bots with premium human proxy nurturing processes.
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-4 font-semibold">
              Reselling digital products has historically been dominated by automatic script generators that register thousands of email addresses from dirty, blacklisted data centers. These profiles trigger automatic identification blocks within minutes of a customer checking out.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 font-semibold">
              At AccStoreX, we revolutionized the asset pipeline. Every single account (ads managers, payment gateways, e-mails, crypto wallets) is manually warmed by dedicated server operators who browse premium localized ISP residential networks. We replicate genuine human engagement patterns by simulating localized navigation matrices.
            </p>

            <div className="space-y-3">
              {[
                'Full documentation packages (Passport scans, physical selfies)',
                'Clean, non-drop, residential IP pools setup',
                'Comprehensive browser backup cookie formats included (.JSON)',
                'Dedicated 48h active replacement warranty'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Visual Glassmorphic card portraying statistics */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl" />
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">ACCSTOREX RATIOS</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                    <span>Account Acceptance Rate</span>
                    <span className="text-blue-600 font-mono">99.2%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '99.2%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                    <span>Dispute Mitigation Ratio</span>
                    <span className="text-emerald-600 font-mono">0.4%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                    <span>Instant automated delivery dispatchs</span>
                    <span className="text-blue-600 font-mono">100%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-150 text-center">
                <span className="block text-2xl font-black text-gray-900">184,300+</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold">Completed digital transactions worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core pillars columns */}
        <div className="bg-[#F9FAFB] border border-gray-200 p-8 rounded-3xl mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Absolute Discretion</h4>
            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed font-semibold">
              We never maintain permanent records of delivered keys on servers. Once downloaded or verified, backups are cleared dynamically to maintain secrecy.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
              <Award className="w-5.5 h-5.5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">Strict Vetting Checks</h4>
            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed font-semibold">
              Before accounts register in our inventory catalogs, they must successfully pass a 7-day rigorous automated sandbox pinging sequence.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <Users className="w-5.5 h-5.5" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">24/7 Human Dispatchers</h4>
            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed font-semibold">
              No generic automated bot emails. Speak directly with skilled network managers who can bypass security configurations in real time.
            </p>
          </div>
        </div>

        {/* Bottom CTA block */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-gray-900">Ready to scale your digital agency parameters?</h4>
            <p className="text-xs text-gray-500 mt-1 font-semibold">Unlock reliable ad profiles and verified KYC gateway checkout slots now.</p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow transition-all cursor-pointer hover:shadow-lg"
          >
            Explore Marketplace Catalog
          </button>
        </div>

      </div>
    </div>
  );
}

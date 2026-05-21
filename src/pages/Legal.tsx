import React from 'react';
import { FileText, Shield, AlertTriangle } from 'lucide-react';

export default function Legal() {
  return (
    <div className="bg-[#F9FAFB] text-gray-900 min-h-screen py-10 md:py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center border-b border-gray-200 pb-10">
          <span className="text-[10px] tracking-widest font-mono text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full uppercase font-black">
            POLICIES AND COMPLIANCE
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] mt-3 tracking-tight">
            Terms & Conditions & Privacy
          </h1>
          <p className="text-xs md:text-sm text-gray-440 mt-2 font-semibold">Effective: May 2026 • Valid worldwide for all AccStoreX digital transactions.</p>
        </div>

        {/* Section 1: Privacy policy */}
        <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <Shield className="w-5.5 h-5.5 text-blue-600" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-901">1. Privacy and Security Disclaimers</h2>
          </div>

          <div className="text-xs text-gray-600 space-y-3 leading-relaxed font-semibold">
            <p>
              At AccStoreX (accstorex.com), we implement extreme technical structures to secure user anonymity. We enforce a strict Zero Logs protocol on our secure server clusters. All billing entries and digital token transactions (including cryptocurrency payment logs and API tracking IDs) are destroyed dynamically 7 days after the delivery is finalized.
            </p>
            <p>
              We do not maintain credit card listings, permanent IP navigation records, or customer identification profiles on any cloud infrastructure. All private credentials exchanged via support channels are shielded using AES-256 secure encryption wrappers.
            </p>
          </div>
        </div>

        {/* Section 2: Account Terms & conditions */}
        <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <FileText className="w-5.5 h-5.5 text-blue-600" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-901">2. Account Usage Terms & Replacement Warranties</h2>
          </div>

          <div className="text-xs text-gray-600 space-y-3.5 leading-relaxed font-semibold">
            <p>
              By executing transactions on AccStoreX, you recognize that you are acquiring verified digital credentials. These credentials must only be operated utilizing compliant proxy connections and appropriate anti-detect tracking browser matrices as described in our startup manuals.
            </p>
            <h4 className="text-xs font-black text-gray-900">A. The 48-Hour Guarantee Rule</h4>
            <p className="text-gray-550">
              All item keys have an active 48-hour replacement warranty starting from the precise timestamp of payment verification. If an account is suspended or prompts invalid authentication errors upon initial setup, we replace it instantly.
            </p>
            <h4 className="text-xs font-black text-gray-900">B. Prohibited Activities</h4>
            <p className="text-gray-550">
              Reselling purchased credentials, operating accounts from blacklisted public data-center VPN proxies, or processing unauthorized chargebacks triggers automatic system flags. Users flagged for fraudulent administrative disputes lose login credentials and lifetime dashboard support permissions.
            </p>
          </div>
        </div>

        {/* Section 3: Liability constraints */}
        <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <AlertTriangle className="w-5.5 h-5.5 text-amber-500" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-901">3. Liability Limitations</h2>
          </div>

          <p className="text-xs text-gray-650 leading-relaxed font-semibold">
            AccStoreX serves strictly as a digital broker. We do not assume responsibility for advertising campaign performance outputs, Stripe holding reserves, Google Ads spending drops, or financial transaction holds imposed by external institutional platforms (Wise, Binance, PayPal). It is the user's sole responsibility to maintain proper proxy safety.
          </p>
        </div>

      </div>
    </div>
  );
}

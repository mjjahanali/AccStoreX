import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export default function ContactUs() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'purchase',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setIsSent(true);
      setFormState({ name: '', email: '', topic: 'purchase', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }
  };

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen py-10 md:py-20 font-sans relative">
      
      {/* Decorative gradient blur highlights */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Page Title */}
        <div className="text-center border-b border-gray-200 pb-10 mb-16">
          <span className="text-[10px] tracking-widest font-mono text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase font-black">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] mt-3 tracking-tight">
            Speak to a Support Advisor
          </h1>
          <p className="text-xs md:text-sm text-gray-550 mt-2 max-w-xl mx-auto leading-relaxed font-semibold">
            Need high-volume pricing quotes, specialized target regions for ad accounts, or fast proxy setup guidance? Our human dispatchers are active 24/7/365.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct channels (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-gray-200 p-6 rounded-2xl relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -z-10" />
              
              <span className="text-[9px] uppercase font-mono tracking-widest text-gray-450 font-black block mb-4">DIRECT DIGITAL DESKS</span>

              <div className="space-y-4">
                
                {/* Telegram Item */}
                <a
                  href="https://t.me/EgSupport24"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-4 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 p-4 rounded-xl transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1E96C8] text-white flex items-center justify-center font-black text-sm">
                    TG
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <span className="block text-xs font-bold text-gray-900">Telegram Instant Care</span>
                    <span className="block text-[11px] text-gray-500 font-semibold truncate hover:underline">@EgSupport24</span>
                  </div>
                  <span className="text-[9px] bg-white text-[#1E96C8] border border-blue-100 px-2 py-1 rounded-md font-mono font-black">ACTIVE</span>
                </a>

                {/* WhatsApp Item */}
                <a
                  href="https://wa.me/13073939979"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-4 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 p-4 rounded-xl transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center font-black text-sm">
                    WA
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <span className="block text-xs font-bold text-gray-900">WhatsApp Hotline</span>
                    <span className="block text-[11px] text-gray-500 font-semibold truncate hover:underline">+1 (307) 393-9979</span>
                  </div>
                  <span className="text-[9px] bg-white text-[#25D366] border border-emerald-100 px-2 py-1 rounded-md font-mono font-black">24/7 LIVE</span>
                </a>

              </div>
            </div>

            {/* General parameters */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-sm">
              <h5 className="text-[10px] font-black text-gray-400 uppercase font-mono tracking-widest mb-2">Corporate Office Coordinates</h5>
              
              <div className="flex items-start gap-3.5 text-xs text-gray-600">
                <MapPin className="w-4.5 h-4.5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h6 className="font-extrabold text-gray-900 text-xs">Registered Office Location</h6>
                  <p className="mt-1 leading-relaxed text-gray-550 font-semibold">AccStoreX LLC, 30 N Gould St, Suite R, Sheridan, WY 82801, USA</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-gray-600">
                <Phone className="w-4.5 h-4.5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h6 className="font-extrabold text-gray-900 text-xs">Voice Carrier Hotline</h6>
                  <p className="mt-0.5 font-semibold text-gray-550">+1 (307) 393-9979</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-gray-600">
                <Mail className="w-4.5 h-4.5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h6 className="font-extrabold text-gray-900 text-xs">Technical Mailbox</h6>
                  <p className="mt-0.5 font-semibold text-gray-555">ops@accstorex.com • admin@accstorex.com</p>
                </div>
              </div>
            </div>

            {/* SSL Safe Verification Badge */}
            <div className="bg-white border border-gray-200 p-4 rounded-xl flex items-center gap-3 shadow-sm">
              <CheckCircle className="w-8 h-8 text-emerald-650 flex-shrink-0" />
              <div>
                <h5 className="text-[10px] font-black text-gray-800 uppercase tracking-widest">SSL secure portal</h5>
                <p className="text-[10px] text-gray-500 font-semibold leading-normal">Every communication handle and token key is shielded with custom AES 256. Zero logs stored.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Feedback form (7/12) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm">
            
            <span className="text-[9px] uppercase font-mono tracking-widest text-gray-400 font-black block mb-4">IN-APP SUPPORT DESK</span>
            <h4 className="text-xl font-extrabold text-gray-900 mb-6">Send an Encrypted Support Ticket</h4>

            {isSent ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex items-center gap-4 text-emerald-800">
                <CheckCircle className="w-8 h-8 flex-shrink-0 text-emerald-600" />
                <div>
                  <h5 className="text-sm font-extrabold">Ticket Submitted Successfully!</h5>
                  <p className="text-xs text-emerald-700 leading-normal mt-1 font-semibold">
                    An operator is processing your request. Standard response time is under 15 minutes. Check your registered mailbox or reload this page in a moment.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name-input" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Your Full Name</label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-950 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                    />
                  </div>

                  {/* Mailbox */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email-input" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Your Email Address</label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. buyer@agency.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-950 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                    />
                  </div>
                </div>

                {/* Subject Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-topic-input" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Support Department</label>
                  <select
                    id="contact-topic-input"
                    value={formState.topic}
                    onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer font-sans shadow-sm font-semibold"
                  >
                    <option value="purchase">Pre-Purchase Questions / Custom Orders</option>
                    <option value="verify">Account Verification Holds / Recovery Sim</option>
                    <option value="bulk">Media Agency Bulk Purchase Pricing</option>
                    <option value="other">Administrative General Inquiries</option>
                  </select>
                </div>

                {/* Message text area */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message-input" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Detailed Message</label>
                  <textarea
                    id="contact-message-input"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe what specs or replacement details you need help with..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-950 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-md shadow-blue-500/10"
                >
                  <Send className="w-4 h-4" />
                  Dispatch Secure Support Message
                </button>

              </form>
            )}

            <div className="mt-6 text-center text-[10px] text-gray-400 font-mono flex items-center justify-center gap-1 font-extrabold">
              <span>🔒 SECURED END-TO-END MESSAGE TRANSMISSION</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

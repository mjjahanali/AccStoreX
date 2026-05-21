import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, ShieldAlert, Cpu, Heart, Circle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: 'Welcome to AccStoreX Live Assistance! I am Alex. How can I help you regarding our premium verified accounts or marketing services today?',
      timestamp: '18:04'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulated customized AI automated responses based on keywords
    setTimeout(() => {
      let replyText = "I see. For specialized help with this request, please message our primary live operator on Telegram at @EgSupport24 or WhatsApp +1 (307) 393-9979 for instant manual dispatch.";
      const cleanText = text.toLowerCase();

      if (cleanText.includes('stripe') || cleanText.includes('payment')) {
        replyText = "All our Stripe & PayPal accounts are KYC fully verified using passport details, virtual card inputs, and attached bank routines. Standard delivery takes under 5 minutes after payment confirm.";
      } else if (cleanText.includes('warranty') || cleanText.includes('refund') || cleanText.includes('replace')) {
        replyText = "We offer a blanket 48-hour active replacement warranty on all accounts. If anything triggers verification blocks on login, we supply a new active asset immediately.";
      } else if (cleanText.includes('delivery') || cleanText.includes('receive')) {
        replyText = "Digital account keys and backup proxies are delivered instantly! You can retrieve them under the 'Dashboard' or standard 'Order Tracking' panel instantly.";
      } else if (cleanText.includes('discount') || cleanText.includes('coupon') || cleanText.includes('bulk')) {
        replyText = "Use the discount code 'ACCSTOREX10' on the checkout page to save 10% on your initial transaction! For extreme bulk commands, reach us on Telegram @EgSupport24.";
      } else if (cleanText.includes('crypto') || cleanText.includes('binance') || cleanText.includes('coinbase')) {
        replyText = "Our crypto profiles (Binance, Coinbase, etc) are Plus level KYC approved with high P2P volume parameters and complete proxy logins supplied.";
      } else if (cleanText.includes('social') || cleanText.includes('instagram') || cleanText.includes('youtube')) {
        replyText = "Yes, we sell high trust social media pages! Our YouTube channels are monetize approved with 4k watchhours finished so you can generate revenue instantly.";
      }

      const agentMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const questionChips = [
    'How does delivery work?',
    'What is the refund policy?',
    'Stripe verified setup?',
    'Any discount coupons?'
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans">
      
      {/* Floating Chat Toggle Circle */}
      {!isOpen && (
        <button
          id="open-livechat-bubble"
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-blue-400 shadow-xl shadow-slate-950/40 hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer group"
          title="Instant Chat Desk"
        >
          <MessageCircle className="w-5.5 h-5.5 group-hover:rotate-6 transition-transform" />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-slate-950"></span>
        </button>
      )}

      {/* Actual Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            className="w-80 h-[430px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-slate-950 border-b border-slate-850 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                    AL
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-slate-950"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1">
                    Alex • Support Desk
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider">SECURE AES ENCRYPTED</span>
                </div>
              </div>
              <button
                id="close-livechat-btn"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-950/40"
            >
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-750 rounded-bl-none'
                  }`}>
                    <p className="leading-relaxed">{m.text}</p>
                    <span className="block text-[8px] text-right mt-1 opacity-60 font-mono">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-400 border border-slate-750 rounded-xl rounded-bl-none px-3 py-2 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Question Chips (Only shown when few messages exist) */}
            {messages.length < 5 && (
              <div className="p-2 border-t border-slate-850/60 bg-slate-900/50 flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                {questionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="text-[10px] bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-300 rounded-lg px-2 py-1 transition-colors cursor-pointer whitespace-nowrap text-left"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="border-t border-slate-855 px-2 py-2 bg-slate-950 flex items-center gap-1"
            >
              <input
                id="livechat-input-field"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                id="livechat-submit-btn"
                type="submit"
                className="p-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-slate-100 transition-transform active:scale-90 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

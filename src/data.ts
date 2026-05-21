import { Category, Product, BlogPost, Review } from './types';
import { DYNAMIC_PRODUCTS } from './products_data';

export const CATEGORIES: Category[] = [
  {
    id: 'ads-accounts',
    name: 'Ads Accounts',
    icon: 'TrendingUp',
    count: 18,
    color: 'from-blue-500 to-indigo-600',
    description: 'Pre-warmed advertising accounts for stable scaling with built-in spending limits.'
  },
  {
    id: 'payment-accounts',
    name: 'Payment Accounts',
    icon: 'CreditCard',
    count: 42,
    color: 'from-emerald-500 to-teal-600',
    description: 'Verified payment gateways ready to process worldwide customer payments.'
  },
  {
    id: 'marketplace-ecommerce',
    name: 'Marketplace Accounts',
    icon: 'ShoppingBag',
    count: 5,
    color: 'from-amber-400 to-yellow-600',
    description: 'Vetted storefronts and active buyer profiles on Shopify, Amazon, Craigslist.'
  },
  {
    id: 'bank-accounts',
    name: 'Bank Accounts',
    icon: 'Wallet',
    count: 20,
    color: 'from-sky-500 to-blue-700',
    description: 'Verified online business and virtual banking accounts for seamless wires.'
  },
  {
    id: 'crypto-accounts',
    name: 'Crypto Accounts',
    icon: 'Coins',
    count: 65,
    color: 'from-amber-500 to-orange-600',
    description: 'KYC-verified exchange accounts with elevated deposit and withdrawal volumes.'
  },
  {
    id: 'email-accounts',
    name: 'Email Accounts',
    icon: 'Mail',
    count: 11,
    color: 'from-cyan-500 to-blue-605',
    description: 'Aged PVA Gmail and Outlook email accounts with secure backup options.'
  },
  {
    id: 'virtual-numbers',
    name: 'Virtual Numbers',
    icon: 'Phone',
    count: 16,
    color: 'from-emerald-400 to-green-600',
    description: 'Permanent or temporary virtual numbers for OTP verification systems.'
  },
  {
    id: 'aged-review',
    name: 'Aged & Review Accounts',
    icon: 'UserCheck',
    count: 6,
    color: 'from-blue-400 to-indigo-600',
    description: 'Established high trust reviewer credentials on Yelp, TripAdvisor, Trustpilot.'
  },
  {
    id: 'smtp-accounts',
    name: 'SMTP Accounts',
    icon: 'Send',
    count: 11,
    color: 'from-purple-500 to-indigo-600',
    description: 'High deliverability bulk sending SMTP servers and validated APIs.'
  },
  {
    id: 'social-accounts',
    name: 'Social Media Accounts',
    icon: 'MessageCircle',
    count: 15,
    color: 'from-pink-500 to-rose-600',
    description: 'Aged profiles and monetized channels with active organic engagement.'
  },
  {
    id: 'marketing-services',
    name: 'Marketing Services',
    icon: 'Award',
    count: 18,
    color: 'from-violet-500 to-fuchsia-600',
    description: 'Organic promotion, high quality views, real followers, and play boosts.'
  },
  {
    id: 'backlink-services',
    name: 'OFF Page SEO / backlinks',
    icon: 'Link',
    count: 8,
    color: 'from-violet-500 to-indigo-750',
    description: 'High DA authority backlinks to skyrocket your search rankings.'
  },
  {
    id: 'social-media-marketing',
    name: 'Social Media Growth',
    icon: 'Share2',
    count: 20,
    color: 'from-pink-505 to-rose-605',
    description: 'Social signals (subscribers, page likes, views, comments) for organic boost.'
  },
  {
    id: 'reviews-services',
    name: 'Reviews Services',
    icon: 'Star',
    count: 24,
    color: 'from-yellow-500 to-amber-600',
    description: 'Verified positive reviews for Google business, Yelp, and App Stores.'
  }
];

export const PRODUCTS: Product[] = DYNAMIC_PRODUCTS;

export const STATISTICS = [
  { label: 'Verified Customers', value: '42,850+', suffix: '' },
  { label: 'Completed Orders', value: '184,300+', suffix: '' },
  { label: 'Premium Products', value: '120+', suffix: '' },
  { label: 'Retention Rate', value: '98.7', suffix: '%' },
];

export const TESTIMONIALS: Review[] = [
  {
    id: 't1',
    author: 'Ivan K.',
    stars: 5,
    comment: 'AccStoreX is absolute tier-1. I bought 5 verified PayPal and Stripe accounts for my affiliate agencies. Immediate delivery, and the proxy documentation details are super easy to load. Highly recommended!',
    date: '2026-04-12',
    verified: true,
    productTitle: 'Verified Stripe Account',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't2',
    author: 'Sarah M.',
    stars: 5,
    comment: 'Running Ads campaigns is sensitive work, but their pre-warmed Facebook and Google Ads accounts saved us from random bans. Customer support helped me set up the browser cookies step by step.',
    date: '2026-05-18',
    verified: true,
    productTitle: 'Facebook Ads Account',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't3',
    author: 'Rajesh P.',
    stars: 4,
    comment: 'Buying YouTube Monetized Channel changed my business. Transition took exactly 7 days to get registered as full owner. Safe, secure, and accurate listings!',
    date: '2026-05-02',
    verified: true,
    productTitle: 'YouTube Channel (Monetized)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 't4',
    author: 'Alejandro G.',
    stars: 5,
    comment: 'The delivery speed is fascinating. Within 2 minutes of checking out with crypto, I had my bulk Gmail accounts ready in my dashboard order tracker. Excellent marketplace!',
    date: '2026-05-20',
    verified: true,
    productTitle: 'Gmail Accounts Bulk Pack',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

export const FAQS = [
  {
    question: 'How do I receive my purchased accounts?',
    answer: 'Accounts are delivered instantly! Once your order payment is verified, the login credentials, browser proxy cookies (.JSON), recovery emails, and guide files appear directly in your Account Dashboard and in the Order Tracking page.'
  },
  {
    question: 'What is your replacement warranty or refund policy?',
    answer: 'We provide a 48-hour clear replacement warranty on all accounts. If you encounter any authentication or configuration issues during login, simply contact us via our 24/7 Telegram/WhatsApp support for an instant replacement or fix.'
  },
  {
    question: 'How do you bypass security checkpoints (KYC and SMS verification)?',
    answer: 'All premium payment and crypto accounts (Binance, Stripe, PayPal) are pre-verified with authentic identity documents (KYC). When you purchase an account, we provide the full documentary package (passport scans, utility bills metadata, selfie matching guidelines, and temporary virtual phone access numbers) to guarantee lifetime access.'
  },
  {
    question: 'Are payments secure and private?',
    answer: 'Absolutely. We support highly secure payment gateways including Ethereum, Bitcoin, USDT (TRC-20, ERC-20), Credit Cards, Wise Transfers, and Payoneer. Crypto payments offer 100% user anonymity and immediate automatic invoice processing.'
  },
  {
    question: 'Do you offer bulk purchase discounts?',
    answer: 'Yes! We support active marketing agencies and enterprises with discount tiered pricing. Reach out to our customer support telegram @EgSupport24 for custom bulk pricing on Gmail, Facebook, and verified payment accounts.'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Ultimate Guide to Scaling Facebook Ads with Aged Profiles',
    brief: 'How to bypass instant account bans and leverage pre-warmed Business Managers to scale custom audience campaigns.',
    content: 'Scaling advertising on Facebook in 2026 demands aged assets with high initial consumer trust indicators. Freshly registered profiles undergo automated verification blocks within minutes of inserting corporate cards. In this tutorial, we outline the exact step-by-step pipeline to load aged profile backup cookies using anti-detect browsers like AdsPower or Multilogin, map resident proxy chains, and successfully bypass identity checkpoints with our certified account packages.',
    author: 'Alex Carter (Media Buyer Pro)',
    date: '2026-05-10',
    category: 'Ads Accounts',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b2',
    title: 'How to Set Up a Bulletproof International Payment Gateway with Verified IDs',
    brief: 'Learn how e-commerce drop-shippers configure Stripe and PayPal using physical KYC packs for zero holdback limits.',
    content: 'Payment gateway bans are the absolute bottleneck of fast scaling. If your business entity is based outside tier-1 nations, obtaining verified merchant status is a painful process. Buying verified Stripe and PayPal accounts gives developers access to reliable payment systems. This article explains how to configure high-trust routing profiles, connect Wise virtual bank accounts safely, and balance dispute/refund volumes to secure permanent continuous payout schedules.',
    author: 'Marcus Vance',
    date: '2026-05-14',
    category: 'Payment Accounts',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b3',
    title: 'Why Aged Google Guide Reviews Drive Massive Walk-In Sales on Google Maps',
    brief: 'A simple comparison of standard bot-generated ratings versus high-value localized local guide opinions.',
    content: 'Local search engine algorithms heavily discount reviews posted from sudden, suspicious device locations or freshly registered email accounts. In contrast, Google My Business ranks accounts higher when they receive ratings from local guides who have long histories of reviews. We compare the exact organic reach and SEO parameters of high-quality verified reviews and show you how to acquire safe, progressive 5-star ratings without triggering Google policy filters.',
    author: 'Elena Rostova',
    date: '2026-05-19',
    category: 'Reviews Services',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=600'
  }
];

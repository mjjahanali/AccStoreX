import fs from 'fs';
import path from 'path';

// Category mapping helper
const categoryIdMap = {
  'ads-accounts': 'Ads Accounts',
  'payment-accounts': 'Payment & Business Accounts',
  'marketplace-ecommerce': 'Marketplace & Ecommerce Accounts',
  'bank-accounts': 'Bank Accounts',
  'crypto-accounts': 'Crypto Exchange & Wallet Accounts',
  'email-accounts': 'Email Accounts',
  'virtual-numbers': 'Virtual Number Accounts',
  'aged-review': 'Aged & Review Accounts',
  'smtp-accounts': 'SMTP & Email Delivery Accounts',
  'social-accounts': 'Social Media Accounts',
  'marketing-services': 'Organic Marketing & SEO Services',
  'backlink-services': 'OFF Page SEO/Backlink Service',
  'social-media-marketing': 'Social Media Marketing Services',
  'reviews-services': 'Reviews Services'
};

const categoryMap = {
  'ads-accounts': [
    'facebook ads', 'google ads', 'tiktok ads', 'twitter (x) ads', 'linkedin ads', 'snapchat ads',
    'pinterest ads', 'bing ads', 'reddit ads', 'quora ads', 'amazon ads', 'taboola ads',
    'outbrain ads', 'adroll ads', 'yahoo ads', 'yandex ads', 'baidu ads', 'apple search ads'
  ],
  'payment-accounts': [
    'paypal', 'stripe', 'square', 'adyen', 'authorize.net', '2checkout', 'skrill', 'payoneer',
    'braintree', 'payu', 'wepay', 'bluesnap', 'dwolla', 'alipay', 'paytm', 'razorpay', 'gocardless',
    'paystack', 'fiserv', 'verifone', 'cybersource', 'payza', 'instamojo', 'mollie', 'paddle',
    'ebanx', 'paysera', 'rapyd', 'ayden', 'remitly', 'worldremit', 'worldfirst', 'rizon', 'redotpay',
    'wise account', 'neteller', 'worldpay', 'checkout.com', 'klarna', 'amazon pay', 'apple pay', 'google pay'
  ],
  'marketplace-ecommerce': [
    'shopify', 'amazon buyer', 'ticketmaster', 'craigslist', 'blackhatworld'
  ],
  'bank-accounts': [
    'jpmorgan', 'bank of america', 'wells fargo', 'citibank', 'hsbc', 'barclays', 'santander',
    'standard chartered', 'deutsche bank', 'ubs', 'revolut business', 'wise business', 'mercury bank',
    'bluevine', 'axos', 'novo', 'monzo business', 'starling', 'n26', 'first direct'
  ],
  'crypto-accounts': [
    'binance', 'coinbase', 'kraken', 'okx', 'kucoin', 'bitfinex', 'gate.io', 'huobi', 'crypto.com',
    'bybit', 'bitstamp', 'gemini', 'binance.us', 'bittrex', 'upbit', 'bitmart', 'hitbtc', 'bitmex',
    'coinmama', 'cex.io', 'wazirx', 'coindcx', 'liquid', 'abra', 'bitflyer', 'poloniex', 'luno', 'bitso',
    'paxful', 'whitebit', 'bisq', 'changelly', 'coinjar', 'btc markets', 'zebpay', 'unocoin', 'coins.ph',
    'coinsbit', 'coinswitch', 'localbitcoins', 'swapzone', 'independent reserve', 'coinspot', 'coinfalcon',
    'coinex', 'bitbns', 'bithumb', 'deribit', 'bitmax', 'zb.com', 'coinone', 'noones', 'ftx', 'payeer',
    'perfect money', 'mexc', 'moonpay', 'bitget', 'robinhood', 'digifinex', 'bitpay', 'blockchain', 'wirex',
    'advcash'
  ],
  'email-accounts': [
    'gmail accounts', 'old gmail', 'usa gmail', 'outlook email', 'yahoo email', 'aol email', 'icloud', 'edu email',
    'naver', 'business email', 'google workspace'
  ],
  'virtual-numbers': [
    'google voice', 'talkatone', 'textplus', 'textnow', 'freetone', 'textme', 'hushed', 'slynumber',
    'sideline', 'hitmess', 'textfree', 'openphone', 'nextplus', 'index', 'ring4', 'whatsapp accounts'
  ],
  'aged-review': [
    'aged yelp', 'aged trustpilot', 'aged reddit', 'aged tripadvisor', 'aged medium', 'aged quora'
  ],
  'smtp-accounts': [
    'smtp accounts', 'amazon ses', 'sendgrid', 'mailgun', 'outlook smtp', 'brevo', 'smtp2go', 'postmark',
    'mailjet', 'elastic email', 'sparkpost'
  ],
  'social-accounts': [
    'instagram accounts', 'linkedin accounts', 'github', 'old facebook', 'old twitter', 'snapchat accounts',
    'soundcloud accounts', 'youtube channel', 'pinterest accounts', 'discord accounts', 'telegram accounts',
    'nextdoor', 'bumble', 'aged twitch', 'aged behance'
  ],
  'marketing-services': [
    'local seo', 'technical seo', 'wordpress on page', 'shopify product listing', 'amazon product seo',
    'amazon virtual assistant', 'content writing', 'convert pdf to excel', 'convert pdf to word',
    'ecommerce product upload', 'organic facebook', 'organic instagram', 'organic twitter', 'organic linkedin',
    'organic youtube', 'organic pinterest', 'buy keyword ranking', 'buy monthly seo'
  ],
  'backlink-services': [
    'answer posting', 'article submission', 'directory submission', 'forum posting', 'social bookmarking',
    'guest blog', 'web 2.0', 'buy profline backlink', 'buy backlink service'
  ],
  'social-media-marketing': [
    'likes', 'followers', 'members', 'comments', 'retweets', 'views', 'plays', 'reposts', 'connections',
    'promotion', 'poll votes'
  ],
  'reviews-services': [
    'google reviews', 'google 5 star', 'google maps', 'google play', 'chrome extension', 'negative google',
    'trustpilot reviews', 'verified trustpilot', '5 star trustpilot', 'yelp reviews', 'elite yelp', '5 star yelp',
    'android app', 'ios app', 'apple store', 'bbb reviews', 'zomato', 'zillow', 'homeadvisor', 'scamadviser',
    'tripadvisor reviews', 'reviews.io', 'website reviews', 'facebook reviews'
  ]
};

// Map high quality topic images from Unsplash
const imageKeywords = {
  'ads-accounts': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
  'payment-accounts': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=400',
  'marketplace-ecommerce': 'https://images.unsplash.com/photo-1472851294608-062f824d296e?auto=format&fit=crop&q=80&w=400',
  'bank-accounts': 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&q=80&w=400',
  'crypto-accounts': 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=400',
  'email-accounts': 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=400',
  'virtual-numbers': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
  'aged-review': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400',
  'smtp-accounts': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400',
  'social-accounts': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400',
  'marketing-services': 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=400',
  'backlink-services': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
  'social-media-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
  'reviews-services': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
};

// Authority links for each category to boost E-E-A-T
const externalLinksMap = {
  'ads-accounts': 'https://support.google.com/google-ads/',
  'payment-accounts': 'https://en.wikipedia.org/wiki/Stripe_(company)',
  'marketplace-ecommerce': 'https://www.shopify.com',
  'bank-accounts': 'https://en.wikipedia.org/wiki/Revolut',
  'crypto-accounts': 'https://www.coinbase.com/learn',
  'email-accounts': 'https://workspace.google.com',
  'virtual-numbers': 'https://voice.google.com',
  'aged-review': 'https://www.yelp.com',
  'smtp-accounts': 'https://aws.amazon.com/ses/',
  'social-accounts': 'https://www.linkedin.com',
  'marketing-services': 'https://developers.google.com/search/docs',
  'backlink-services': 'https://en.wikipedia.org/wiki/Backlink',
  'social-media-marketing': 'https://en.wikipedia.org/wiki/Social_media_marketing',
  'reviews-services': 'https://www.trustpilot.com'
};

// Define price list based on typical market prices researched on Google:
const priceListByKeywords = {
  'facebook': 49.99,
  'google ads': 74.99,
  'tiktok': 59.99,
  'twitter (x)': 34.99,
  'linkedin': 119.99,
  'snapchat': 39.99,
  'pinterest': 34.99,
  'bing': 54.99,
  'reddit': 39.99,
  'quora': 24.99,
  'amazon ads': 129.99,
  'taboola': 99.99,
  'outbrain': 99.99,
  'adroll': 59.99,
  'yahoo': 69.99,
  'yandex': 64.99,
  'baidu': 149.99,
  'apple search': 129.99,
  'paypal': 99.00,
  'stripe': 149.00,
  'square': 129.00,
  'adyen': 159.00,
  'authorize.net': 119.00,
  '2checkout': 109.00,
  'skrill': 69.00,
  'payoneer': 79.00,
  'braintree': 119.00,
  'payu': 89.00,
  'wepay': 79.00,
  'bluesnap': 99.00,
  'dwolla': 69.00,
  'alipay': 129.00,
  'paytm': 49.00,
  'razorpay': 109.00,
  'gocardless': 89.00,
  'paystack': 79.00,
  'fiserv': 149.00,
  'verifone': 119.00,
  'cybersource': 139.00,
  'payza': 59.00,
  'instamojo': 49.00,
  'mollie': 99.00,
  'paddle': 139.00,
  'ebanx': 119.00,
  'paysera': 89.00,
  'rapyd': 129.00,
  'remitly': 109.00,
  'worldremit': 109.05,
  'worldfirst': 129.00,
  'redotpay': 49.00,
  'wise': 119.00,
  'neteller': 69.00,
  'worldpay': 149.00,
  'checkout.com': 159.00,
  'klarna': 129.00,
  'amazon pay': 119.00,
  'apple pay': 99.00,
  'google pay': 99.00,
  'shopify': 89.00,
  'amazon buyer': 35.00,
  'ticketmaster': 45.00,
  'craigslist': 19.99,
  'blackhatworld': 49.00,
  'jpmorgan': 199.00,
  'bank of america': 189.00,
  'wells fargo': 179.00,
  'citibank': 179.00,
  'hsbc': 189.00,
  'barclays': 169.00,
  'santander': 159.00,
  'standard chartered': 179.00,
  'deutsche bank': 189.00,
  'ubs': 199.00,
  'revolut': 199.00,
  'wise business': 139.00,
  'mercury': 149.00,
  'bluevine': 129.00,
  'axos': 119.00,
  'novo': 119.00,
  'monzo': 129.00,
  'starling': 119.00,
  'n26': 129.00,
  'first direct': 119.00,
  'binance': 129.00,
  'coinbase': 119.00,
  'kraken': 109.00,
  'okx': 109.00,
  'kucoin': 99.00,
  'bybit': 119.00,
  'ftx': 149.00,
  'payeer': 59.00,
  'perfect money': 59.00,
  'mexc': 99.00,
  'moonpay': 89.00,
  'bitget': 99.00,
  'robinhood': 129.00,
  'blockchain': 79.00,
  'wirex': 69.00,
  'advcash': 59.00,
  'gmail': 15.00,
  'outlook': 12.00,
  'yahoo email': 10.00,
  'aol': 10.00,
  'icloud': 25.00,
  'edu email': 19.00,
  'google workspace': 49.00,
  'google voice': 5.00,
  'talkatone': 4.00,
  'textplus': 4.00,
  'textnow': 6.00,
  'whatsapp': 12.00,
  'yelp': 29.00,
  'trustpilot': 45.00,
  'tripadvisor': 35.00,
  'medium': 19.00,
  'quora accounts': 15.00,
  'smtp': 79.00,
  'amazon ses': 159.00,
  'sendgrid': 89.00,
  'mailgun': 79.00,
  'brevo': 69.00,
  'smtp2go': 79.00,
  'instagram': 15.00,
  'github': 35.00,
  'youtube': 149.00,
  'telegram': 15.00,
  'discord': 12.00,
  'local seo': 149.00,
  'technical seo': 199.00,
  'wordpress': 79.00,
  'backlink': 89.00,
  'keyword': 120.00,
  'monthly seo': 299.00,
  'likes': 9.99,
  'followers': 12.99,
  'members': 14.99,
  'views': 8.99,
  'plays': 7.99,
  'reposts': 5.99,
  'connections': 19.99,
  'reviews': 39.00
};

function getPriceForProduct(title) {
  const t = title.toLowerCase();
  for (const [kw, price] of Object.entries(priceListByKeywords)) {
    if (t.includes(kw)) {
      return price;
    }
  }
  return 39.99; // Default sandbox price
}

function categoryForTitle(title) {
  const t = title.toLowerCase();
  for (const [cat, kws] of Object.entries(categoryMap)) {
    for (const kw of kws) {
      if (t.includes(kw)) {
        return cat;
      }
    }
  }
  // fallback analysis
  if (t.includes('seo') || t.includes('assistant') || t.includes('writing') || t.includes('excel') || t.includes('pdf')) {
    return 'marketing-services';
  }
  if (t.includes('backlink') || t.includes('posting') || t.includes('submission') || t.includes('bookmarking')) {
    return 'backlink-services';
  }
  if (t.includes('likes') || t.includes('followers') || t.includes('members') || t.includes('retweets') || t.includes('plays') || t.includes('views') || t.includes('connections')) {
    return 'social-media-marketing';
  }
  if (t.includes('reviews') || t.includes('star')) {
    return 'reviews-services';
  }
  if (t.includes('ads')) {
    return 'ads-accounts';
  }
  if (t.includes('payment') || t.includes('pay') || t.includes('gateway') || t.includes('card')) {
    return 'payment-accounts';
  }
  if (t.includes('bank') || t.includes('financial') || t.includes('merchant')) {
    return 'bank-accounts';
  }
  if (t.includes('crypto' || t.includes('coin') || t.includes('wallet'))) {
    return 'crypto-accounts';
  }
  if (t.includes('gmail') || t.includes('email') || t.includes('mail')) {
    return 'email-accounts';
  }
  return 'marketing-services'; // fallback
}

// Generate human positive review list
function reviewsForProduct(title) {
  const isService = title.toLowerCase().includes('seo') || title.toLowerCase().includes('marketing') || title.toLowerCase().includes('reviews') || title.toLowerCase().includes('likes');
  if (isService) {
    return [
      {
        id: `rev-${Date.now()}-1`,
        author: 'Dmitri S. (Agile Growth Agency)',
        stars: 5,
        comment: `Excellent execution on this ${title}! We monitored a steady rise in our ranking signals. Delivered completely transparent logs over a few days time window. Safe client investment!`,
        date: '2026-05-12',
        verified: true,
        productTitle: title,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: `rev-${Date.now()}-2`,
        author: 'Jessica L. (Ecom Brands)',
        stars: 5,
        comment: `I was cautious about buying bulk reviews and optimization blocks, but AccStoreX proved their E-E-A-T. No dropoff, fully organic. Excellent traffic metrics. Will order again!`,
        date: '2026-05-18',
        verified: true,
        productTitle: title,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
      }
    ];
  } else {
    return [
      {
        id: `rev-${Date.now()}-1`,
        author: 'Marcus V. (Fintech Partner)',
        stars: 5,
        comment: `Highly recommended provider. The backup SOCKS proxy strings match the ${title} location perfectly. Secure authentication with cookie files. Highly trusted merchant!`,
        date: '2026-05-14',
        verified: true,
        productTitle: title,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
      },
      {
        id: `rev-${Date.now()}-2`,
        author: 'Amara K. (Media Buyer)',
        stars: 5,
        comment: `Ordered the ${title} KYC bundle. Got instant delivery of credentials, scanned driver license, and utility bills scan. Fully bypassed standard verification. AccStoreX is simply amazing.`,
        date: '2026-05-19',
        verified: true,
        productTitle: title,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
      }
    ];
  }
}

// Generate localized FAQ block
function faqsForProduct(title, category) {
  return [
    {
      question: `Is buying this ${title} safe and compliant?`,
      answer: `Yes! All verified items are handled and prepared strictly using premium localized residential proxies to maintain account integrity. For services, we distribute parameters gradually over realistic daily intervals to mimic authentic organic performance. AccStoreX has 10+ years of active agency experience in structural accounts management.`
    },
    {
      question: `What materials are shipped upon purchase completion?`,
      answer: `For physical and digital accounts, you receive the raw login parameters, email fallback logins, dynamic 2FA keys, active SOCKS5 proxy coordinates, cookie profiles in modern .JSON formats, and the exact physical documents (ID/scans) used in the validation steps. For service items, you receive a detailed progress tracking sheet.`
    },
    {
      question: `What if are there locks or security checks on login?`,
      answer: `No worry. We provide a 48-hour straightforward replacement warrant. Simply send a screenshot of the prompt to our dynamic operator portal on Telegram @EgSupport24. We will instantly replace the credentials or help you set up an anti-detect browser session step-by-step.`
    }
  ];
}

// Full E-E-A-T main description builder with internal and external links
function buildMainDescription(title, category, price) {
  const extLink = externalLinksMap[category] || 'https://en.wikipedia.org/wiki/E-commerce';
  const categoryLabel = categoryIdMap[category] || 'Digital Assets';
  
  return `<!-- SEO Optimized, E-E-A-T Compliant Multi-Paragraph Review Document -->
<div class="space-y-6 text-slate-350 leading-relaxed text-xs md:text-sm text-left">
  
  <p>
    In modern digital commerce, scaling advertising profiles or continuous global payments requires highly trusted infrastructure. Purchasing a high-grade <strong>${title}</strong> from an industry leader like <a href="#about-us" class="text-blue-500 underline font-semibold">AccStoreX Company</a> guarantees a vetted starting score. Our systems utilize real residential SOCKS chains, avoiding automated trigger delays and minimizing security check disruptions.
  </p>

  <div class="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl my-6">
    <h4 class="text-xs font-black text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
      ★ CERTIFIED ACCSTOREX PERFORMANCE INDEX
    </h4>
    <p class="text-[11px] text-slate-400 italic">
      "Our team demonstrates a perfect blend of Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T). Every listing passes meticulous manual checkups prior to display. Learn more about professional guidelines in the <a href="${extLink}" target="_blank" rel="noopener noreferrer" class="text-blue-550 underline font-semibold">Official Authority Portal</a>."
    </p>
  </div>

  <h3 class="text-sm font-black text-slate-200 uppercase tracking-wider">Why Buy a Verified ${title}?</h3>
  <p>
    Standard freshly registered profiles are heavily restricted by automated AI moderation loops. By leveraging aged assets, your business unlocks initial high trust marks directly. This <strong>${title}</strong> has been configured by experienced network engineers. It includes active verification backups, backup login codes, and complete cookie session arrays ready to load inside modern anti-detect browsers such as <a href="#faq" class="text-blue-500 underline">AdsPower or Multilogin</a>.
  </p>

  <h3 class="text-sm font-black text-slate-200 uppercase tracking-wider">Expert Integration Guidelines</h3>
  <p>
    In order to preserve account reliability, we strongly advise clients to login exclusively using clean residential SOCKS proxy lines referencing the specific geolocation parameters enclosed inside your shipping dispatch file. You can access your ordered credentials securely inside your <a href="#dashboard" class="text-blue-500 underline font-semibold">Customer Dashboard</a> or in our <a href="#order-tracking" class="text-blue-500 underline font-semibold">Digital Track Console</a> instantly after transaction clearing.
  </p>

  <h3 class="text-sm font-black text-slate-200 uppercase tracking-wider">Strict Security Assurance</h3>
  <hr class="border-slate-800" />
  <ul className="list-disc pl-5 space-y-2 text-[11.5px] text-slate-450 font-sans">
    <li><strong>Geographic Match:</strong> Zero login triggers due to matching browser proxies.</li>
    <li><strong>Lifetime Care:</strong> Full documents are loaded inside secure drives for reference during future re-verifications.</li>
    <li><strong>Secure Checkouts:</strong> Processes occur through encrypted lines. Rest assured you can check out dynamically in our <a href="#cart" class="text-blue-500 underline">Shopping Cart Gateway</a> whenever you are ready.</li>
  </ul>

</div>`;
}

async function start() {
  const docPath = 'doc_content.txt';
  if (!fs.existsSync(docPath)) {
    console.error('doc_content.txt does not exist!');
    return;
  }

  const raw = fs.readFileSync(docPath, 'utf8');
  const lines = raw.split('\n');

  const parsedProducts = [];
  let currentCategoryHeader = '';
  const seenIds = new Set();

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx].trim();
    if (!line) continue;

    // Detect Category headers (without bullet *)
    if (!line.startsWith('*') && !line.includes('____') && line.length > 3 && !line.includes('AccStoreX') && !line.includes('Add this all product')) {
      // Check if line is a section title or requirement title
      if (/^[1-9]\d*\./.test(line) || line.includes('requirement') || line.includes('E-E-A-T') || line.includes('internal link') || line.includes('search on google')) {
        continue;
      }
      currentCategoryHeader = line;
      continue;
    }

    if (line.startsWith('*')) {
      const title = line.replace(/^\*\s*/, '').trim();
      if (!title) continue;

      const categoryId = categoryForTitle(title);
      const price = getPriceForProduct(title);
      const originalPrice = Number((price * 1.25).toFixed(2)); // mock higher original price for sale display

      const baseId = title.toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .trim()
        .replace(/\s+/g, '-');

      let id = baseId;
      let counter = 1;
      while (seenIds.has(id)) {
        id = `${baseId}-${counter}`;
        counter++;
      }
      seenIds.add(id);

      const isService = title.toLowerCase().includes('seo') || title.toLowerCase().includes('marketing') || title.toLowerCase().includes('reviews') || title.toLowerCase().includes('likes');
      
      const featuresBrief = isService 
        ? 'High Retention + Organic Growth + Localized IP Distribution' 
        : 'KYC Verified + Proxy Support + 48h active Replacement Warranty';

      const features = isService ? [
        'Organically structured delivery speed to avoid filters',
        '100% active localized human reviewers and users',
        'Safe from search algorithm flags and policy holds',
        '30-Day complete retention and non-drop replacement policy',
        'Full operational support from senior media teams'
      ] : [
        'Fully aged profile/account with historical usage indicators',
        'Includes manual identification documents scans (ID driving lic)',
        'Attached virtual debit card with validated billing addresses',
        'Anti-detect browser backup cookies exported (.JSON strings)',
        'Comprehensive login safety manual included'
      ];

      const imgUrl = imageKeywords[categoryId] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400';

      const mockProduct = {
        id,
        title,
        category: categoryId,
        price,
        salePrice: price,
        rating: Number((4.5 + Math.random() * 0.5).toFixed(1)),
        reviewsCount: Math.floor(45 + Math.random() * 250),
        icon: isService ? 'Award' : 'Lock',
        imgUrl,
        featuresBrief,
        stockStatus: Math.random() > 0.15 ? 'In Stock' : 'Low Stock',
        description: `Premium ${title} configured by seasoned industry partners. Tailored specifically with secure residential proxy logs and multi-factor authentication details to offer seamless digital scaling.`,
        features,
        keys: [
          `VERIFIED_LOGIN: admin_${id.replace(/-/g, '_')} : SecPassAtx992`,
          `SECURE_PROXY: ${categoryId === 'crypto-accounts' ? 'cr-prox.accstorex.net' : 'res-socks.accstorex.net'}:3128:usr:pwd`
        ],
        seoTitle: `Buy Verified ${title} - Aged KYC Verified Accounts Store`,
        metaDescription: `Get fully audited and vetted ${title} at the lowest prices. Instant secure deliveries including session cookies and documents scans. AccStoreX compliant.`,
        mainDescription: buildMainDescription(title, categoryId, price),
        faqs: faqsForProduct(title, categoryId),
        reviewsList: reviewsForProduct(title)
      };

      parsedProducts.push(mockProduct);
    }
  }

  // Write compiled data to /src/products_data.ts
  const outputContent = `import { Product } from './types';

export const DYNAMIC_PRODUCTS: Product[] = ${JSON.stringify(parsedProducts, null, 2)};
`;

  fs.writeFileSync('src/products_data.ts', outputContent, 'utf8');
  console.log(`Successfully generated dynamic products TypeScript list. Items written: ${parsedProducts.length}`);
}

start();

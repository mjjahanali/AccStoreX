export type PageType = 
  | 'home'
  | 'shop'
  | 'about-us'
  | 'contact-us'
  | 'blog'
  | 'faq'
  | 'dashboard'
  | 'cart'
  | 'checkout'
  | 'order-tracking'
  | 'privacy-policy'
  | 'terms'
  | 'product-details'
  | 'admin-login';

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  icon: string; // Lucide icon name or image url
  imgUrl?: string; // Product name related high quality stock image
  description: string;
  features: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  featuresBrief: string;
  keys?: string[]; // Account details returned on delivery, e.g. ["user123:pass456:secretKey"]
  seoTitle?: string;
  metaDescription?: string;
  mainDescription?: string;
  faqs?: { question: string; answer: string; }[];
  reviewsList?: Review[]; // Custom reviews list specifically for this product
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  count: number;
  color: string; // tailwind text/bg accent color
  description?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
}

export type OrderStatus = 'pending' | 'processing' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  email: string;
  paymentMethod: string;
  trackingId: string;
  couponApplied?: string;
  discountAmount?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  brief: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  stars: number;
  comment: string;
  date: string;
  verified: boolean;
  productTitle?: string;
  avatar: string;
}

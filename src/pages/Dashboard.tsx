import React, { useState } from 'react';
import { 
  User, LayoutDashboard, Key, ShieldAlert, ShoppingBag, 
  Settings, CheckCircle, TicketPercent, Plus, ArrowRight, KeyRound,
  Coins, Newspaper, Trash2, Edit, Save, Globe, Receipt, RefreshCw, Send, Check
} from 'lucide-react';
import { Product, Category, Order, Coupon, OrderStatus, PageType, BlogPost } from '../types';
import { CATEGORIES } from '../data';

interface DashboardProps {
  ordersList: Order[];
  onNavigate: (page: PageType) => void;
  onAdminCreateProduct: (product: Product) => void;
  onAdminUpdateProduct: (product: Product) => void;
  onAdminCreateCoupon: (coupon: Coupon) => void;
  onAdminUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  adminCoupons: Coupon[];
  currentUserEmail: string;
  activeCatalog: Product[];
  blogsList: BlogPost[];
  onAdminCreateBlog: (blog: BlogPost) => void;
  onAdminUpdateBlog: (blog: BlogPost) => void;
  onAdminDeleteBlog: (blogId: string) => void;
}

export default function Dashboard({
  ordersList,
  onNavigate,
  onAdminCreateProduct,
  onAdminUpdateProduct,
  onAdminCreateCoupon,
  onAdminUpdateOrderStatus,
  adminCoupons,
  currentUserEmail,
  activeCatalog,
  blogsList,
  onAdminCreateBlog,
  onAdminUpdateBlog,
  onAdminDeleteBlog
}: DashboardProps) {
  // Navigation tabs in panel
  const [panelTab, setPanelTab] = useState<'client' | 'admin'>('client');
  const [adminSubTab, setAdminSubTab] = useState<'orders' | 'products' | 'blogs' | 'crypto'>('orders');
  
  // Checking admin state
  const isAdmin = currentUserEmail.toLowerCase() === 'mjjahan854@gmail.com';

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Admin: Create Product states
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('ads-accounts');
  const [newProdPrice, setNewProdPrice] = useState(49);
  const [newProdBrief, setNewProdBrief] = useState('');
  const [newProdStock, setNewProdStock] = useState<'In Stock' | 'Low Stock' | 'Out of Stock'>('In Stock');
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdKeys, setNewProdKeys] = useState('');
  const [productCreatedMsg, setProductCreatedMsg] = useState('');

  // Admin: Edit Product states
  const [selectedProductId, setSelectedProductId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState(49);
  const [editCategory, setEditCategory] = useState('ads-accounts');
  const [editBrief, setEditBrief] = useState('');
  const [editStock, setEditStock] = useState<'In Stock' | 'Low Stock' | 'Out of Stock'>('In Stock');
  const [editDesc, setEditDesc] = useState('');
  const [editKeys, setEditKeys] = useState('');
  const [productEditedMsg, setProductEditedMsg] = useState('');

  // Admin: Create Blog states
  const [blogTitle, setBlogTitle] = useState('');
  const [blogBrief, setBlogBrief] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('Alex Carter');
  const [blogCategory, setBlogCategory] = useState('Ads Accounts');
  const [blogReadTime, setBlogReadTime] = useState('5 min read');
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600');
  const [blogMsg, setBlogMsg] = useState('');
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Admin: Crypto Currency ordering simulation console
  const [cryptoCoin, setCryptoCoin] = useState('USDT-TRC20');
  const [cryptoOrderAmount, setCryptoOrderAmount] = useState(150);
  const [cryptoWalletAddress, setCryptoWalletAddress] = useState('TJ8VSjUqJfUEb1aiozMogv38nvYaMUp5Tp');
  const [cryptoEscrowState, setCryptoEscrowState] = useState('Immediate Confirmed Nodes');
  const [cryptoMsg, setCryptoMsg] = useState('');
  const [lastDispatchedKeys, setLastDispatchedKeys] = useState<string[]>([]);

  // Admin: Create Coupon states
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState(10);
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [couponCreatedMsg, setCouponCreatedMsg] = useState('');

  // Client simulated values
  const walletBalance = 350.00;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (oldPassword && newPassword) {
      setPasswordSuccess('Password modified securely (simulated). New session hash validated.');
      setOldPassword('');
      setNewPassword('');
      setTimeout(() => setPasswordSuccess(''), 4000);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitle || !newProdPrice) return;

    const parsedKeys = newProdKeys.trim() 
      ? newProdKeys.split('\n') 
      : [`NEW_LOGIN: ${newProdTitle.toLowerCase().replace(/ /g, '_')}_user : PassNewSecure11` ];

    const createdProduct: Product = {
      id: `custom-prod-${Date.now()}`,
      title: newProdTitle,
      category: newProdCategory,
      price: Number(newProdPrice),
      rating: 5.0,
      reviewsCount: 1,
      icon: 'HelpCircle',
      description: newProdDescription || `Aged custom ${newProdTitle} account. Verified residential SOCKS configuration included.`,
      featuresBrief: newProdBrief || 'Aged Account + KYC Verification + proxy strings',
      stockStatus: newProdStock,
      features: [
        'KYC verified credentials completed',
        'SOCKS5 proxy backup cookies included',
        '48-hour replace warranty enabled'
      ],
      keys: parsedKeys
    };

    onAdminCreateProduct(createdProduct);
    setProductCreatedMsg(`Successfully Created: "${newProdTitle}"! Live in active shop grid.`);
    
    setNewProdTitle('');
    setNewProdPrice(49);
    setNewProdBrief('');
    setNewProdDescription('');
    setNewProdKeys('');

    setTimeout(() => setProductCreatedMsg(''), 5000);
  };

  // Edit product handler loading
  const handleLoadProductToEdit = (prodId: string) => {
    const prod = activeCatalog.find(p => p.id === prodId);
    if (!prod) return;
    setSelectedProductId(prodId);
    setEditTitle(prod.title);
    setEditPrice(prod.price);
    setEditCategory(prod.category);
    setEditBrief(prod.featuresBrief);
    setEditStock(prod.stockStatus);
    setEditDesc(prod.description);
    setEditKeys(prod.keys ? prod.keys.join('\n') : '');
  };

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) return;

    const currentProd = activeCatalog.find(p => p.id === selectedProductId);
    if (!currentProd) return;

    const updatedProduct: Product = {
      ...currentProd,
      title: editTitle,
      price: Number(editPrice),
      category: editCategory,
      featuresBrief: editBrief,
      stockStatus: editStock,
      description: editDesc,
      keys: editKeys.trim() ? editKeys.split('\n') : currentProd.keys
    };

    onAdminUpdateProduct(updatedProduct);
    setProductEditedMsg(`Successfully Saved changes for: "${editTitle}"! Check the details in shop list.`);
    setTimeout(() => {
      setProductEditedMsg('');
    }, 4500);
  };

  // Blog management handler
  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogContent.trim()) return;

    if (editingBlogId) {
      // Edit mode
      const updatedBlog: BlogPost = {
        id: editingBlogId,
        title: blogTitle,
        brief: blogBrief || blogContent.slice(0, 100) + '...',
        content: blogContent,
        author: blogAuthor,
        category: blogCategory,
        date: new Date().toISOString().split('T')[0],
        readTime: blogReadTime,
        image: blogImage
      };
      onAdminUpdateBlog(updatedBlog);
      setBlogMsg(`Successfully Updated Blog: "${blogTitle}"!`);
      setEditingBlogId(null);
    } else {
      // Create mode
      const newBlog: BlogPost = {
        id: `blog-custom-${Date.now()}`,
        title: blogTitle,
        brief: blogBrief || blogContent.slice(0, 100) + '...',
        content: blogContent,
        author: blogAuthor,
        category: blogCategory,
        date: new Date().toISOString().split('T')[0],
        readTime: blogReadTime,
        image: blogImage
      };
      onAdminCreateBlog(newBlog);
      setBlogMsg(`Successfully Created Blog: "${blogTitle}"!`);
    }

    setBlogTitle('');
    setBlogBrief('');
    setBlogContent('');
    setBlogAuthor('Alex Carter');
    setBlogReadTime('5 min read');
    setTimeout(() => setBlogMsg(''), 5000);
  };

  const handleEditBlogInline = (b: BlogPost) => {
    setEditingBlogId(b.id);
    setBlogTitle(b.title);
    setBlogBrief(b.brief || '');
    setBlogContent(b.content);
    setBlogAuthor(b.author || 'Alex Carter');
    setBlogCategory(b.category);
    setBlogReadTime(b.readTime || '5 min read');
    setBlogImage(b.image);
  };

  // Order Cryptocurrency dispatch simulation script
  const handleCryptoOrderSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cryptoWalletAddress.trim() || cryptoOrderAmount <= 0) return;

    const generatedTxId = `TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const keysDispatch = [
      `LEDGER_RECORD_ID: ${generatedTxId}`,
      `CRYPTO_NETWORK_TARGET: ${cryptoCoin}`,
      `BLOCKED_AMOUNT: ${cryptoOrderAmount} USD token equivalents`,
      `MOCK_PRIVATE_SEED_KEY: ${Math.random().toString(36).substring(2, 12)}fd25${Math.random().toString(36).substring(2, 10)}`,
      `TRANSACTION_STATUS: VERIFIED ESCROW CONFIRMED ON MEMPOOL`
    ];

    setLastDispatchedKeys(keysDispatch);
    setCryptoMsg(`✓ Successful Dispatched: Simulated order of $${cryptoOrderAmount} via ${cryptoCoin} to ${cryptoWalletAddress.slice(0,6)}...${cryptoWalletAddress.slice(-4)}. Keys generated!`);

    // Let's also register this order automatically inside our general order list for tracking!
    const generatedTrackingId = `ATX-${Math.floor(100000 + Math.random() * 900000)}`;
    const generatedOrderId = `ORD-CRYP-${Math.floor(10000 + Math.random() * 90000)}`;

    const customCryptoOrder: Order = {
      id: generatedOrderId,
      date: new Date().toISOString().split('T')[0],
      items: [
        {
          id: `crypto-item-${Date.now()}`,
          product: {
            id: 'mock-crypto-purchased',
            title: `Dynamic Order Cryptocurrency (${cryptoCoin})`,
            category: 'crypto-accounts',
            price: cryptoOrderAmount,
            rating: 5,
            reviewsCount: 1,
            icon: 'Coins',
            description: `Cryptocurrency escrow purchase for standard LLC operations. Sent to address: ${cryptoWalletAddress}`,
            featuresBrief: `Escrow transfer node verified - target network: ${cryptoCoin}`,
            stockStatus: 'In Stock',
            features: ['Blockchain verified log', 'Direct seed private dispatched key'],
            keys: keysDispatch
          },
          quantity: 1
        }
      ],
      total: cryptoOrderAmount,
      status: 'delivered',
      email: currentUserEmail,
      paymentMethod: `CRYPTO-${cryptoCoin.toUpperCase()}`,
      trackingId: generatedTrackingId
    };

    onAdminCreateProduct(customCryptoOrder.items[0].product);
    onAdminUpdateOrderStatus(generatedOrderId, 'delivered');
    setLastDispatchedKeys(keysDispatch);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = newCouponCode.trim().toUpperCase();
    if (!cleanCode) return;

    const createdCoupon: Coupon = {
      code: cleanCode,
      discountType: newCouponType,
      discountValue: Number(newCouponVal)
    };

    onAdminCreateCoupon(createdCoupon);
    setCouponCreatedMsg(`Promo code "${cleanCode}" successfully registered! Enter on checkout to test. `);
    setNewCouponCode('');
    setNewCouponVal(15);
    
    setTimeout(() => setCouponCreatedMsg(''), 5000);
  };

  return (
    <div className="bg-[#F9FAFB] text-gray-900 min-h-screen py-10 md:py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header summary section */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6 mb-10 gap-4">
          <div className="text-left">
            <span className="text-[10px] tracking-widest font-mono text-blue-600 block font-bold uppercase">SECURE CREDENTIALS AREA</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#111827] mt-1 tracking-tight">AccStoreX Dashboard</h1>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl border border-gray-220">
            <button
              id="set-client-tab-btn"
              onClick={() => setPanelTab('client')}
              className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                panelTab === 'client' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-950 font-bold'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Client View
            </button>

            {/* ONLY reveal Admin sandbox tab option if logged user is exactly the requested admin email */}
            {isAdmin ? (
              <button
                id="set-admin-tab-btn"
                onClick={() => setPanelTab('admin')}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  panelTab === 'admin' 
                    ? 'bg-violet-600 text-white shadow-sm' 
                    : 'text-purple-600 hover:text-purple-900 border border-purple-200/50 hover:bg-purple-100/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 animate-pulse" /> Admin Control 👑
              </button>
            ) : (
              <span className="text-[10px] text-gray-400 font-bold px-2 py-1 bg-gray-200 rounded-lg">
                🔒 Client Level Account
              </span>
            )}
          </div>
        </div>

        {/* ======================= CLIENT ACCOUNT VIEW ======================= */}
        {panelTab === 'client' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in duration-200">
            
            {/* Profile summary context column */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white border border-gray-200 p-6 rounded-2xl relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl -z-10" />
                
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Core Profile</h3>

                <div className="space-y-4 font-sans text-left">
                  <div>
                    <span className="block text-[10px] text-gray-450 font-mono font-bold uppercase">IDENTIFIED EMAIL</span>
                    <strong className="block text-xs text-gray-900 font-extrabold tracking-tight truncate mt-0.5">{currentUserEmail}</strong>
                  </div>
                  
                  <div>
                    <span className="block text-[10px] text-gray-455 font-mono font-bold uppercase">SIMULATED BALANCE</span>
                    <div className="flex items-center gap-1 text-gray-900 font-black text-xl mt-0.5">
                      <span className="text-emerald-600 font-black">$</span>
                      <span>{walletBalance.toFixed(2)}</span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[10px] text-gray-455 font-mono font-bold uppercase">ACCOUNT STATE</span>
                    <span className={`inline-flex items-center gap-1.5 text-[9px] font-black px-2.5 py-1 rounded-full border mt-1.5 uppercase ${
                      isAdmin ? 'text-purple-705 bg-purple-50 border-purple-200 text-purple-700' : 'text-blue-700 bg-blue-50 border-blue-150'
                    }`}>
                      {isAdmin ? '✓ Certified Administrator Key' : '✓ Verified Standard Client'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Password simulation setup */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm text-left">
                <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-blue-600 animate-bounce" /> Change Security Pass
                </h3>

                {passwordSuccess ? (
                  <p className="text-xs bg-emerald-50 border border-emerald-150 text-emerald-700 p-3 rounded-xl font-bold">{passwordSuccess}</p>
                ) : (
                  <form onSubmit={handlePasswordSubmit} className="space-y-3 font-sans">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider block">Current PIN Code</label>
                      <input
                        type="password"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-500 transition shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider block">New Secret Code</label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter secure password..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-500 transition shadow-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-xs font-black rounded-xl text-gray-800 transition-colors shadow-sm cursor-pointer"
                    >
                      Update Access Keys
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Historic client orders mapping list */}
            <div className="lg:col-span-9 bg-white border border-gray-200 p-6 md:p-8 rounded-2xl min-h-[400px] shadow-sm text-left">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-800 border-b border-gray-100 pb-3 mb-6">
                Your Digital Accounts Orders ({ordersList.filter(o => o.email === currentUserEmail).length})
              </h3>

              {ordersList.filter(o => o.email === currentUserEmail).length > 0 ? (
                <div className="space-y-4">
                  {ordersList.filter(o => o.email === currentUserEmail).map((ord) => (
                    <div
                      id={`dashboard-order-row-${ord.id}`}
                      key={ord.id}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-gray-300 shadow-xs"
                    >
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-blue-50 border border-blue-200 text-blue-600 font-mono font-black px-2 py-0.5 rounded shadow-sm">
                            {ord.id}
                          </span>
                          <span className="text-xs text-gray-400 font-mono font-bold">{ord.date}</span>
                        </div>
                        
                        <div className="text-xs text-gray-800 font-extrabold max-w-sm">
                          {ord.items.map((it, i) => (
                            <span key={i}>
                              {it.product.title} (x{it.quantity}){i < ord.items.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-1 font-mono font-bold">
                          <span>Gateway: {ord.paymentMethod}</span>
                          <span>•</span>
                          <span>Code: {ord.trackingId}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 justify-between md:justify-end w-full md:w-auto border-t md:border-transparent pt-3 md:pt-0 mt-2 md:mt-0 border-gray-150">
                        <div className="text-left md:text-right font-sans">
                          <span className="block text-[10px] text-gray-400 font-black">DELIVERY STATE</span>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full mt-1 uppercase ${
                            ord.status === 'delivered' 
                              ? 'bg-emerald-50 text-emerald-750 border border-emerald-250 font-black shadow-sm' 
                              : ord.status === 'pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200 font-black shadow-sm'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            • {ord.status}
                          </span>
                        </div>

                        <button
                          id={`dash-track-btn-${ord.trackingId}`}
                          onClick={() => {
                            localStorage.setItem('last_tracking_id', ord.trackingId);
                            onNavigate('order-tracking');
                          }}
                          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-xs text-white font-black rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-blue-500/10"
                        >
                          View Keys 🔑
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500 space-y-4">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto animate-bounce" />
                  <p className="text-xs font-semibold">No active account keys ordered yet. Checkout with crypto to receive your items instantly!</p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-black text-white hover:shadow transition cursor-pointer"
                  >
                    Go to shop
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================= ADMIN CONTROL SUITE VIEW ======================= */}
        {panelTab === 'admin' && isAdmin && (
          <div className="space-y-6 animate-fade-in text-left">
            
            {/* Warning banner */}
            <div className="p-4 bg-purple-50 border border-purple-150 text-purple-900 rounded-2xl flex items-center gap-3.5 shadow-sm">
              <ShieldAlert className="w-7 h-7 text-purple-600 flex-shrink-0 animate-pulse" />
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-purple-950 uppercase tracking-wide">Secure Administrator Console Activates</h4>
                <p className="text-[11px] text-purple-800 leading-relaxed font-semibold mt-0.5">
                  Authorize direct blockchain cryptocurrency dispatches, customize listed items details, configure coupons code indexes, and write blog guides.
                </p>
              </div>
            </div>

            {/* Admin sub-tab switcher */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 rounded-2xl border border-gray-220">
              <button
                onClick={() => setAdminSubTab('orders')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                  adminSubTab === 'orders' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-950 font-bold'
                }`}
              >
                <Receipt className="w-4 h-4" /> Store Orders Manager ({ordersList.length})
              </button>
              
              <button
                onClick={() => setAdminSubTab('products')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                  adminSubTab === 'products' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-950 font-bold'
                }`}
              >
                <ShoppingBag className="w-4 h-4" /> Products Editor & Creator
              </button>

              <button
                onClick={() => setAdminSubTab('blogs')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                  adminSubTab === 'blogs' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-950 font-bold'
                }`}
              >
                <Newspaper className="w-4 h-4" /> Manage Blog Posts ({blogsList.length})
              </button>

              <button
                onClick={() => setAdminSubTab('crypto')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                  adminSubTab === 'crypto' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-950 font-bold'
                }`}
              >
                <Coins className="w-4 h-4" /> Direct Crypto Dispatcher
              </button>
            </div>

            {/* SUBTAB 1: ORDERS MANAGER */}
            {adminSubTab === 'orders' && (
              <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm text-left">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-800 border-b border-gray-100 pb-3 mb-6">
                  Manage Store Orders Logs
                </h3>

                {ordersList.length > 0 ? (
                  <div className="space-y-4 font-sans">
                    {ordersList.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-gray-300 transition shadow-xs"
                      >
                        <div className="text-left space-y-1.5 max-w-[70%]">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-mono bg-purple-50 text-purple-705 border border-purple-150 px-2.5 py-0.5 rounded font-black">
                              {order.id}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono font-bold">Date: {order.date}</span>
                          </div>

                          <div className="text-xs text-gray-800 truncate font-bold">
                            User Inbox: <strong className="text-blue-600 font-extrabold">{order.email}</strong>
                          </div>

                          <div className="text-[10.5px] text-gray-500 font-bold leading-normal">
                            Items: {order.items.map(it => `${it.product.title} (x${it.quantity})`).join(', ')}
                          </div>

                          <div className="text-[10px] text-gray-400 font-mono font-bold">
                            Total: <strong className="text-gray-900 font-black">${order.total.toFixed(2)}</strong> via {order.paymentMethod}
                          </div>
                        </div>

                        {/* Order Status Update Selector */}
                        <div className="flex flex-col items-start gap-1 w-full md:w-auto border-t md:border-transparent pt-3 md:pt-0 border-gray-150">
                          <span className="text-[9px] text-gray-400 uppercase font-mono font-black">Update Order State</span>
                          <select
                            value={order.status}
                            onChange={(e) => onAdminUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-white text-xs text-gray-800 border border-gray-300 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer w-full md:w-auto font-sans font-black select-none shadow-sm"
                          >
                            <option value="pending" className="bg-white text-amber-600 font-bold">• Pending Handshake</option>
                            <option value="processing" className="bg-white text-blue-600 font-bold">• Processing Accounts</option>
                            <option value="delivered" className="bg-white text-emerald-600 font-bold">• Delivered (Pushed Keys)</option>
                            <option value="cancelled" className="bg-white text-rose-600 font-bold">• Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-400 space-y-2">
                    <p className="text-sm font-semibold">No order transactions found in datalogs.</p>
                  </div>
                )}
              </div>
            )}

            {/* SUBTAB 2: PRODUCTS CREATOR & EDITOR */}
            {adminSubTab === 'products' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Product creator left column (5/12) */}
                <div className="lg:col-span-6 bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-sm text-left">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#111827] border-b border-gray-100 pb-3 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-purple-650" /> Publish New Listing
                  </h3>

                  {productCreatedMsg && (
                    <p className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-150 p-3 rounded-xl font-bold">{productCreatedMsg}</p>
                  )}

                  <form onSubmit={handleCreateProduct} className="space-y-4 text-left font-sans">
                    <div className="space-y-1">
                      <label htmlFor="adm-prod-title" className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Product Title</label>
                      <input
                        id="adm-prod-title"
                        type="text"
                        required
                        value={newProdTitle}
                        onChange={(e) => setNewProdTitle(e.target.value)}
                        placeholder="e.g. Verified Wise Business Account"
                        className="w-full bg-gray-50 border border-gray-205 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-bold placeholder-gray-400 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="adm-prod-cat" className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Category</label>
                        <select
                          id="adm-prod-cat"
                          value={newProdCategory}
                          onChange={(e) => setNewProdCategory(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 cursor-pointer focus:bg-white font-extrabold"
                        >
                          {CATEGORIES.map(c => (
                            <option key={c.id} value={c.id} className="bg-white font-extrabold">{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="adm-prod-price" className="text-[10px] text-gray-555 font-extrabold uppercase tracking-wider block">Price ($)</label>
                        <input
                          id="adm-prod-price"
                          type="number"
                          required
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(Number(e.target.value))}
                          placeholder="49"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold font-mono placeholder-gray-400 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="adm-prod-brief" className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Brief Specifications</label>
                      <input
                        id="adm-prod-brief"
                        type="text"
                        value={newProdBrief}
                        onChange={(e) => setNewProdBrief(e.target.value)}
                        placeholder="e.g. SOCKS5 Proxy + physical passport pack"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold placeholder-gray-400 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="adm-prod-desc" className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Full Specs</label>
                      <textarea
                        id="adm-prod-desc"
                        rows={3}
                        value={newProdDescription}
                        onChange={(e) => setNewProdDescription(e.target.value)}
                        placeholder="Specify terms, documentation instructions, backup browser cookies formats..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-medium placeholder-gray-400 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="adm-prod-keys" className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Digital Deliverable Credentials (One per line)</label>
                      <textarea
                        id="adm-prod-keys"
                        rows={3}
                        value={newProdKeys}
                        onChange={(e) => setNewProdKeys(e.target.value)}
                        placeholder="Wise:wise_pass_99 : wise_pin_1021&#10;EmailBackup:recoveryEmail1@outlook.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[10.5px] font-mono text-gray-800 placeholder-gray-400 focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-xs font-black rounded-xl text-white shadow-md transition cursor-pointer uppercase"
                    >
                      Publish Product Listing
                    </button>
                  </form>
                </div>

                {/* PRODUCT EDITOR right column (7/12) */}
                <div className="lg:col-span-6 bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-sm text-left">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#111827] border-b border-gray-100 pb-3 flex items-center gap-1.5">
                    <Edit className="w-4 h-4 text-purple-650 animate-bounce" /> Edit Product Details
                  </h3>

                  {productEditedMsg && (
                    <p className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-150 p-3 rounded-xl font-bold">{productEditedMsg}</p>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Select Listed Account Asset to Modify</label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => handleLoadProductToEdit(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 cursor-pointer focus:bg-white font-extrabold text-left mb-4"
                    >
                      <option value="">-- Choose Account --</option>
                      {activeCatalog.map(p => (
                        <option key={p.id} value={p.id} className="bg-white font-semibold">
                          [{p.category.split('-')[0].toUpperCase()}] {p.title} (${p.price.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedProductId ? (
                    <form onSubmit={handleSaveProductEdit} className="space-y-4 text-left font-sans animate-fade-in">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Product Title</label>
                        <input
                          type="text"
                          required
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-205 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Category</label>
                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs text-gray-800 cursor-pointer focus:bg-white font-extrabold"
                          >
                            {CATEGORIES.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-555 font-extrabold uppercase tracking-wider block">Price ($)</label>
                          <input
                            type="number"
                            required
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold font-mono focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-555 font-extrabold uppercase tracking-wider block">Brief Specs Param</label>
                        <input
                          type="text"
                          value={editBrief}
                          onChange={(e) => setEditBrief(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Full Specifications</label>
                        <textarea
                          rows={3}
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-medium focus:bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block font-mono">Credential Locked Keys (Sheet dispatch)</label>
                        <textarea
                          rows={3}
                          value={editKeys}
                          onChange={(e) => setEditKeys(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[10.5px] font-mono text-gray-800 focus:bg-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-violet-605 bg-violet-600 hover:bg-purple-700 text-xs font-black rounded-xl text-white shadow-md transition cursor-pointer"
                      >
                        ✓ Save Edited Product Changes
                      </button>
                    </form>
                  ) : (
                    <div className="bg-gray-50 border border-gray-150 rounded-2xl p-12 text-center text-gray-450 italic text-xs font-medium border-dashed">
                      Please select an active product listing from the dropdown selector block to dynamically edit its pricing, stocks, descriptions or locked passwords!
                    </div>
                  )}

                  {/* Coupon Creators */}
                  <div className="border-t border-gray-200 pt-6 mt-4 space-y-4">
                    <h4 className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">Authorize Promo Coupons</h4>
                    {couponCreatedMsg && (
                      <p className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-150 p-2.5 rounded-xl font-bold">{couponCreatedMsg}</p>
                    )}
                    <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="PROMO20"
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value)}
                        className="sm:col-span-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-extrabold uppercase focus:bg-white"
                      />
                      <input
                        type="number"
                        required
                        value={newCouponVal}
                        onChange={(e) => setNewCouponVal(Number(e.target.value))}
                        className="bg-gray-50 border border-gray-205 rounded-xl px-3 py-2 text-xs text-gray-900 font-mono font-bold focus:bg-white"
                      />
                      <button
                        type="submit"
                        className="py-2 px-3 bg-violet-650 bg-violet-600 hover:bg-violet-750 text-white rounded-xl text-xs font-black transition cursor-pointer"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            )}

            {/* SUBTAB 3: BLOGS PUBLICATIONS MANAGER */}
            {adminSubTab === 'blogs' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Blog Publisher form left (5/12) */}
                <div className="lg:col-span-5 bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-sm text-left">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#111827] border-b border-gray-100 pb-3 flex items-center gap-1.5">
                    {editingBlogId ? <Edit className="w-4 h-4 text-purple-650" /> : <Plus className="w-4 h-4 text-purple-650" />}
                    {editingBlogId ? 'Update Editorial Publication' : 'Write Editorial Publication'}
                  </h3>

                  {blogMsg && (
                    <p className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-150 p-3 rounded-xl font-bold">{blogMsg}</p>
                  )}

                  <form onSubmit={handleBlogSubmit} className="space-y-3 font-sans">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Publication Title</label>
                      <input
                        type="text"
                        required
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="e.g. Scaling Stripe Payments in 2026 without Bans"
                        className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3 py-2 text-xs text-gray-900 font-extrabold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Category</label>
                        <select
                          value={blogCategory}
                          onChange={(e) => setBlogCategory(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3 py-2 text-xs text-gray-800 font-bold"
                        >
                          <option value="Ads Accounts">Ads Accounts</option>
                          <option value="Payment Accounts">Payment Accounts</option>
                          <option value="Reviews Services">Reviews Services</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Read Time</label>
                        <input
                          type="text"
                          required
                          value={blogReadTime}
                          onChange={(e) => setBlogReadTime(e.target.value)}
                          placeholder="5 min read"
                          className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3 py-2 text-xs text-gray-900 font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-555 font-extrabold uppercase tracking-wider block">Brief Summary</label>
                      <input
                        type="text"
                        value={blogBrief}
                        onChange={(e) => setBlogBrief(e.target.value)}
                        placeholder="Brief 1-sentence synopsis summary..."
                        className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Image Asset (High stock stockUrl)</label>
                      <input
                        type="text"
                        required
                        value={blogImage}
                        onChange={(e) => setBlogImage(e.target.value)}
                        className="w-full bg-gray-55 border border-gray-200 focus:bg-white rounded-xl px-2 py-1.5 text-[10px] font-mono text-gray-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block font-sans">Publication Content Manual Body</label>
                      <textarea
                        rows={6}
                        required
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="Draft the complete informational lore guidelines details here..."
                        className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3 py-2 text-xs text-gray-900 font-medium"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-750 text-white rounded-xl text-xs font-black transition cursor-pointer text-center"
                      >
                        {editingBlogId ? '✓ Save Edit Publication' : 'Publish Article Grid'}
                      </button>
                      {editingBlogId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBlogId(null);
                            setBlogTitle('');
                            setBlogBrief('');
                            setBlogContent('');
                          }}
                          className="px-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl text-xs font-bold text-gray-700"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Publication manager lists right (7/12) */}
                <div className="lg:col-span-7 bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-sm text-left">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#111827] border-b border-gray-100 pb-3 flex items-center gap-1.5">
                    <Newspaper className="w-4.5 h-4.5 text-purple-650" /> Live Publication Lists ({blogsList.length})
                  </h3>

                  <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                    {blogsList.map((blog) => (
                      <div key={blog.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3 transition hover:bg-white hover:border-gray-250">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase bg-violet-50 text-violet-700 border border-purple-150 px-2 rounded">
                              {blog.category}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono font-bold">{blog.date}</span>
                          </div>
                          
                          <h4 className="text-xs font-black text-gray-900 truncate leading-snug">{blog.title}</h4>
                          <p className="text-[10.5px] text-gray-500 leading-normal line-clamp-2 pr-1 font-medium">{blog.brief}</p>
                          
                          <div className="pt-2 flex items-center gap-2 border-t border-gray-100/60 mt-1">
                            <button
                              type="button"
                              onClick={() => handleEditBlogInline(blog)}
                              className="text-[10px] font-black text-purple-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                            >
                              <Edit className="w-3 h-3" /> Edit Article
                            </button>
                            <span className="text-gray-300">•</span>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete blog: "${blog.title}"?`)) {
                                  onAdminDeleteBlog(blog.id);
                                }
                              }}
                              className="text-[10px] font-black text-rose-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* SUBTAB 4: DIRECT CRYPTO DISPATCHER CORES */}
            {adminSubTab === 'crypto' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Console Form left (6/12) */}
                <div className="lg:col-span-6 bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-sm text-left">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#111827] border-b border-gray-100 pb-3 flex items-center gap-1.5">
                    <Coins className="w-4.5 h-4.5 text-purple-650 animate-bounce" /> Order Cryptocurrency Console Simulator
                  </h3>

                  {cryptoMsg && (
                    <p className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-150 p-3 rounded-xl font-bold leading-normal">{cryptoMsg}</p>
                  )}

                  <form onSubmit={handleCryptoOrderSimulation} className="space-y-4 font-sans text-left">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Cryptocurrency network</label>
                        <select
                          value={cryptoCoin}
                          onChange={(e) => setCryptoCoin(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 cursor-pointer focus:bg-white font-extrabold"
                        >
                          <option value="USDT-TRC20">USDT (TRC-20)</option>
                          <option value="USDT-BEP20">USDT (BEP-20)</option>
                          <option value="BTC">Bitcoin (BTC)</option>
                          <option value="LTC">Litecoin (LTC)</option>
                          <option value="ETH">Ethereum (ETH)</option>
                          <option value="BNB">Binance Coin (BNB)</option>
                          <option value="SOL">Solana (SOL)</option>
                          <option value="TRX">TRON (TRX)</option>
                          <option value="DOGE">Dogecoin (DOGE)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block font-sans">Dispatch Amount ($ USD equivalent)</label>
                        <input
                          type="number"
                          required
                          value={cryptoOrderAmount}
                          onChange={(e) => setCryptoOrderAmount(Number(e.target.value))}
                          placeholder="150"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-black focus:bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Destination Address</label>
                      <input
                        type="text"
                        required
                        value={cryptoWalletAddress}
                        onChange={(e) => setCryptoWalletAddress(e.target.value)}
                        placeholder="TJ8VSjUqJfUEb1aiozMogv38nvYaMUp5Tp"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[10.5px] text-gray-900 font-mono focus:bg-white font-black"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-550 font-extrabold uppercase tracking-wider block">Simulated blockchain Confirmation Status</label>
                      <select
                        value={cryptoEscrowState}
                        onChange={(e) => setCryptoEscrowState(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-205 rounded-xl px-3 py-2 text-xs text-gray-850 cursor-pointer focus:bg-white font-bold"
                      >
                        <option value="Immediate Confirmed Nodes font-bold">Immediate Confirmed Nodes (Verification in 2s)</option>
                        <option value="Delayed verification mempool">Delayed verification mempool (Sync in 2 min)</option>
                        <option value="Sandbox simulation check">Sandbox simulation check (Immediate Delivered)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow transition"
                    >
                      🚀 Dispatch Simulated Crypto Order
                    </button>
                  </form>
                </div>

                {/* Outputs ledger keys right (6/12) */}
                <div className="lg:col-span-6 bg-white border border-gray-200 p-6 rounded-2xl space-y-4 shadow-sm text-left">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#111827] border-b border-gray-100 pb-3 flex items-center gap-1.5">
                    <Receipt className="w-4 h-4 text-purple-650" /> Blockchain Escrow Node Dispatch Keys
                  </h3>

                  {lastDispatchedKeys.length > 0 ? (
                    <div className="space-y-4 animate-fade-in font-mono">
                      <div className="bg-gray-900 text-purple-250 p-5 rounded-2xl space-y-2 border border-slate-800 text-[11px] leading-relaxed shadow-inner overflow-x-auto text-purple-300">
                        <span className="block text-[#FFCC00] font-bold text-[10px] uppercase tracking-wider mb-2">// BLOCKCHAIN BROADCAST HANDSHAKE COMPLETE</span>
                        {lastDispatchedKeys.map((k, i) => (
                          <div key={i} className="py-0.5 select-all hover:bg-slate-800 px-1 rounded truncate">
                            {k}
                          </div>
                        ))}
                      </div>

                      <div className="bg-purple-50/65 border border-purple-150 rounded-xl p-4 text-[11px] text-purple-900 leading-normal font-semibold">
                        💡 <strong>Real-time update logic:</strong> This simulated transaction has been registered seamlessly as a 100% verified order in your user's orders history state! Feel free to checkout other pages or track details.
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-150 rounded-2xl p-12 text-center text-gray-450 italic text-xs font-medium border-dashed">
                      No cryptocurrency dispatches dispatched yet. Input destination details on the left and submit to view ledger keys and validation strings instantly.
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

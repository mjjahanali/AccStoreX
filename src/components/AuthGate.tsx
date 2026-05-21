import React, { useState } from 'react';
import { ShieldAlert, Mail, Lock, User, LayoutDashboard, KeyRound, CheckCircle } from 'lucide-react';

interface AuthGateProps {
  onLoginSuccess: (email: string) => void;
  isAdminMode?: boolean;
}

export default function AuthGate({ onLoginSuccess, isAdminMode }: AuthGateProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(isAdminMode ? 'signin' : 'signin');
  const [email, setEmail] = useState(isAdminMode ? 'mjjahan854@gmail.com' : '');
  const [password, setPassword] = useState(isAdminMode ? 'Mj854???' : '');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMsg('Please enter all required fields.');
      return;
    }

    if (activeTab === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please specify your registration name.');
        return;
      }
      setSuccessMsg('Account registered successfully! Redirecting you to AccStoreX...');
      localStorage.setItem('accstorex_user_name', name);
      setTimeout(() => {
        onLoginSuccess(cleanEmail);
      }, 1000);
    } else {
      // Sign in simulation
      if (cleanEmail === 'mjjahan854@gmail.com') {
        if (cleanPassword !== 'Mj854???' && cleanPassword !== 'adminSecurityPass2026!') {
          setErrorMsg('Access denied! Incorrect administrator password credential.');
          return;
        }
      }
      
      setSuccessMsg('Authentication signature verified. Access granted!');
      const displayName = cleanEmail === 'mjjahan854@gmail.com' ? 'M. Jahan (Admin)' : 'Valued Client';
      localStorage.setItem('accstorex_user_name', displayName);
      setTimeout(() => {
        onLoginSuccess(cleanEmail);
      }, 1000);
    }
  };

  const handleQuickDemoAdmin = () => {
    setEmail('mjjahan854@gmail.com');
    setPassword('Mj854???');
    setActiveTab('signin');
  };

  const handleQuickDemoClient = () => {
    setEmail('client@growthagency.com');
    setPassword('clientPass123!');
    setActiveTab('signin');
  };

  return (
    <div className="bg-[#FAFDFD] bg-gradient-to-tr from-[#ECEFF1] to-[#F5F7F8] min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div id="auth-gate-card" className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl border border-gray-200/90 shadow-2xl relative overflow-hidden text-left">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 items-center justify-center text-white font-black text-2xl tracking-tight shadow-md">
            {isAdminMode ? '👑' : 'A'}
          </div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900 leading-none">
            {isAdminMode ? 'Admin Security Gateway' : 'AccStoreX Identity Gateway'}
          </h2>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
            {isAdminMode ? 'Authorized Staff Login' : 'Aged Portals & verified accounts escrow'}
          </p>
        </div>

        {/* Informative Help banner */}
        <div className={`border rounded-xl p-3 text-xs space-y-1 ${isAdminMode ? 'bg-violet-50/75 border-violet-150 text-violet-950' : 'bg-blue-50/50 border-blue-105 text-gray-600'}`}>
          <span className={`font-extrabold flex items-center gap-1 ${isAdminMode ? 'text-violet-800' : 'text-blue-800'}`}>
            <ShieldAlert className={`w-4 h-4 ${isAdminMode ? 'text-violet-600' : 'text-blue-600'}`} /> 
            {isAdminMode ? 'Administrator Authentication Active' : 'Web Access Gate active'}
          </span>
          <p className="text-[11px] leading-relaxed">
            {isAdminMode 
              ? 'Please authenticate using your verified master administrator credentials. Default preset keys have been auto-configured.'
              : 'Please log in or register a free on-the-fly website login credential below to view our active lists and catalog of profiles.'}
          </p>
        </div>

        {/* Return to website directory shortcut */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => window.location.hash = 'home'}
            className="text-[11px] text-indigo-600 hover:text-indigo-800 font-extrabold transition-colors cursor-pointer"
          >
            ← Cancel and Return to Store Homepage
          </button>
        </div>

        {/* Tabs switcher (only show signup option if not admin mode) */}
        {!isAdminMode && (
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-100 rounded-2xl border border-gray-202/50">
            <button
              id="auth-tab-signin"
              type="button"
              onClick={() => { setActiveTab('signin'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-950 font-bold'
              }`}
            >
              Sign In Gate
            </button>
            <button
              id="auth-tab-signup"
              type="button"
              onClick={() => { setActiveTab('signup'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-950 font-bold'
              }`}
            >
              Create Login Account
            </button>
          </div>
        )}

        {/* Main form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left">
          {errorMsg && (
            <p className="text-xs bg-red-50 border border-red-150 text-red-700 p-2.5 rounded-xl font-bold">
              ⚠️ {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="text-xs bg-emerald-50 border border-emerald-150 text-emerald-700 p-2.5 rounded-xl font-bold animate-pulse">
              ✓ {successMsg}
            </p>
          )}

          {activeTab === 'signup' && (
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider block">Full Corporate Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. M. Jahan"
                  className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-900 font-bold placeholder-gray-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider block">Email Address Inbox</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. mjjahan854@gmail.com"
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-900 font-bold placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider block">Access Key Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow shadow-blue-500/10 cursor-pointer"
          >
            {activeTab === 'signin' ? 'Verify Gate Access' : 'Register Secure Account'}
          </button>
        </form>

        {/* Quick Testing shortcuts */}
        <div className="pt-4 border-t border-gray-150 space-y-2.5">
          <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-black text-center">
            Or Use Sandbox Fast Testing Logs
          </span>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              id="quick-demo-admin-btn"
              type="button"
              onClick={handleQuickDemoAdmin}
              className="flex-1 py-1.5 px-2 bg-gray-50 hover:bg-blue-50/50 border border-gray-200 hover:border-blue-300 text-[11px] font-bold text-gray-700 rounded-lg transition-colors cursor-pointer text-center"
            >
              👑 Admin Gmail Logging
            </button>
            <button
              id="quick-demo-client-btn"
              type="button"
              onClick={handleQuickDemoClient}
              className="flex-1 py-1.5 px-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[11px] font-bold text-gray-700 rounded-lg transition-colors cursor-pointer text-center"
            >
              👤 Client Account Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

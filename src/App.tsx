/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Search, Command, X, Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Dashboard } from './components/Dashboard';
import { ProductStudio } from './components/ProductStudio';
import { UnifiedInbox } from './components/UnifiedInbox';
import { LogisticsHub } from './components/LogisticsHub';
import { CategoryManager } from './components/CategoryManager';
import { PageBuilder } from './components/PageBuilder';
import { AIAgentBuilder } from './components/AIAgentBuilder';
import { Settings } from './components/Settings';
import { BrandProvider } from './BrandContext';
import { motion, AnimatePresence } from 'motion/react';

function Layout({ children }: { children: React.ReactNode }) {
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans select-none relative">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-slate-900 z-[70] lg:hidden shadow-2xl"
            >
              <div className="absolute top-4 right-4 z-50">
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-hidden relative flex flex-col">
        {/* Global Floating Header */}
        <div className="h-20 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl sticky top-0 z-40 transition-all duration-300 flex items-center justify-between px-4 lg:px-10">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div 
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-3 px-4 py-2.5 bg-slate-50/50 border border-slate-200/60 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer group w-40 sm:w-72"
              >
                  <Search className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  <span className="text-[11px] font-semibold flex-1 tracking-tight truncate">Search orders...</span>
                  <div className="hidden sm:flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-lg border border-slate-200 text-[9px] font-black group-hover:border-indigo-200 shadow-sm transition-all">
                    <Command className="w-2.5 h-2.5" />
                    <span>K</span>
                  </div>
              </div>
           </div>
           
           <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden xl:flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mainframe Stable</span>
              </div>

              <div className="hidden sm:block h-6 w-px bg-slate-200/60" />

              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">Tushar T.</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter mt-1">Admin Access</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-slate-200 cursor-pointer hover:scale-105 transition-transform active:scale-95">
                  TT
                </div>
              </div>
           </div>
        </div>

        <div className="flex-1 relative overflow-hidden pb-16 lg:pb-0">
          {children}
        </div>
        
        <MobileNav />
        
        {/* Subtle Scanlines effect for "OS" feel */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.01)_50%),linear-gradient(90deg,rgba(255,0,0,0.005),rgba(0,255,0,0.005),rgba(0,0,255,0.005))] bg-[length:100%_4px,3px_100%] z-50 mix-blend-multiply opacity-10" />

        {/* Command Palette Modal */}
        {showSearch && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4 bg-slate-900/40 backdrop-blur-[2px]">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden outline-none animate-in fade-in zoom-in duration-200">
              <div className="p-4 flex items-center gap-3 border-b border-slate-100">
                <Search className="w-5 h-5 text-indigo-600" />
                <input 
                  autoFocus
                  placeholder="Type an order #, product name, or command..." 
                  className="flex-1 bg-transparent border-none outline-none text-base text-slate-900 placeholder:text-slate-400"
                />
                <button onClick={() => setShowSearch(false)} className="p-1 hover:bg-slate-100 rounded-md transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="p-2 max-h-[400px] overflow-y-auto">
                <div className="p-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Actions</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-xl cursor-not-allowed group transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                      <Command className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">Sync Inventory with Shopify</p>
                      <p className="text-xs text-slate-500">Last synced 12 mins ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-xl cursor-not-allowed group transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Search className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">Search Order #ORD-1002</p>
                      <p className="text-xs text-slate-500">Sarah Jenkins • Luxe Cosmetics</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Tip: Use ⌘K to open this search anytime</span>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500">ESC to close</span>
                 </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductStudio />} />
            <Route path="/categories" element={<CategoryManager />} />
            <Route path="/orders" element={<LogisticsHub />} />
            <Route path="/builder" element={<PageBuilder />} />
            <Route path="/agent-builder" element={<AIAgentBuilder />} />
            <Route path="/inbox" element={<UnifiedInbox />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </BrandProvider>
  );
}



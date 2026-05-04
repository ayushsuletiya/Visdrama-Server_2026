import React from 'react';
import {
  Link
} from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Code, 
  Bell, 
  CreditCard,
  ExternalLink,
  ChevronRight,
  Bot,
  Instagram,
  MessageCircle,
  Facebook,
  Layers,
  Sparkles,
  Cpu
} from 'lucide-react';

export function Settings() {
  return (
    <div className="h-full overflow-y-auto p-4 sm:p-10 space-y-6 sm:space-y-10 max-w-[800px] mx-auto pb-20 no-scrollbar">
      <header className="px-2">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">System Configuration</h1>
        </div>
        <p className="text-sm text-slate-500">Manage your brand infrastructure, AI agents, and external connectors.</p>
      </header>

      <div className="space-y-6">
        {/* AI Agent Builder Section */}
        <section className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] -mr-32 -mt-32 rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full w-fit border border-white/10 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest">Master AI Agent</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">OmniAI Agent Builder</h2>
              <p className="text-indigo-200/80 text-sm leading-relaxed">
                Configure your unified AI support agent. Your agent learns from your store data, social interactions, and previous customer support logs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Link to="/agent-builder" className="px-6 py-2.5 bg-white text-indigo-900 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-xl shadow-indigo-950/40 text-center">
                  Enter Builder Studio
                </Link>
                <button className="px-6 py-2.5 bg-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 transition-all border border-white/10">
                  Review Logs
                </button>
              </div>
            </div>
            <div className="relative group-hover:scale-105 transition-transform duration-500 flex justify-center">
               <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-indigo-500/10 border-2 border-white/5 flex items-center justify-center backdrop-blur-sm shadow-inner">
                  <Bot className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-2xl flex items-center justify-center border-4 border-indigo-950 shadow-lg">
                    <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white rounded-full animate-pulse" />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Social Connectors */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Social Media Connectors</h3>
            <span className="text-[10px] font-bold text-slate-400">UNIFIED SYNC ACTIVE</span>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { name: 'WhatsApp Business', icon: <MessageCircle className="w-5 h-5 text-emerald-500" />, status: 'Connected', sub: '+1 (555) 000-1234' },
              { name: 'Instagram Direct', icon: <Instagram className="w-5 h-5 text-pink-500" />, status: 'Connected', sub: '@luxe_cosmetics_official' },
              { name: 'Facebook Messenger', icon: <Facebook className="w-5 h-5 text-blue-600" />, status: 'Connect', sub: 'Page not linked' },
            ].map((social) => (
              <div key={social.name} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {social.icon}
                  </div>
                  <div>
                     <h4 className="text-sm font-bold text-slate-900">{social.name}</h4>
                     <p className="text-[10px] text-slate-500 mt-0.5 font-medium">{social.sub}</p>
                  </div>
                </div>
                <button className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  social.status === 'Connected' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-indigo-600 text-white shadow-md hover:bg-indigo-500'
                }`}>
                  {social.status}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* External E-commerce Plugins */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">External E-commerce Plugins</h3>
          </div>
          <div className="divide-y divide-slate-50">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-100">S</div>
                <div>
                   <div className="flex items-center gap-2">
                     <h4 className="text-sm font-bold text-slate-900">Shopify Connector</h4>
                     <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-tighter bg-indigo-50 px-1.5 py-0.5 rounded">Syncing</span>
                   </div>
                   <p className="text-xs text-slate-500 mt-1 truncate max-w-[200px]">luxe-cosmetics-prod.myshopify.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Active</span>
                <button className="text-slate-400 hover:text-slate-900"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
            
            <div className="p-6 flex items-center justify-between opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">W</div>
                <div>
                   <h4 className="text-sm font-bold text-slate-900">WooCommerce Plugin</h4>
                   <p className="text-xs text-slate-500 mt-1">Not connected</p>
                </div>
              </div>
              <button className="text-indigo-600 text-xs font-bold hover:underline">Connect</button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <button className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-left hover:border-indigo-200 transition-all group">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
              <Layers className="w-5 h-5 text-indigo-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Brand Templates</h4>
            <p className="text-xs text-slate-500 mt-1">Chat & email design assets.</p>
          </button>
          
          <button className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-left hover:border-indigo-200 transition-all group">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Staff & Security</h4>
            <p className="text-xs text-slate-500 mt-1">Manage agent permissions.</p>
          </button>
        </div>
      </div>
    </div>
  );
}

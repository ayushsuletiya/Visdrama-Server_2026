import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Sparkles, 
  RefreshCcw, 
  ChevronRight,
  MoreVertical,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../mockData';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';

export function ProductStudio() {
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [selectedStyle, setSelectedStyle] = useState('Studio');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const openStudio = (product: any) => {
    setSelectedProduct(product);
    setIsStudioOpen(true);
    setIsFinished(false);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsFinished(false);
    // Simulate generation stages
    setTimeout(() => {
      setIsGenerating(false);
      setIsFinished(true);
    }, 3000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Shopify inventory sync completed successfully.');
    }, 2000);
  };

  const STYLE_PRESETS = [
    { name: 'Studio', icon: '🏠', prompt: 'clean studio lighting, professional' },
    { name: 'Editorial', icon: '📖', prompt: 'high fashion editorial, moody' },
    { name: 'Lifestyle', icon: '☕', prompt: 'cosy home environment, natural' },
    { name: 'Marble', icon: '🪨', prompt: 'on marble surface, elegant' },
    { name: 'Velvet', icon: '🎭', prompt: 'lush velvet background, luxury' },
    { name: 'Outdoor', icon: '🌳', prompt: 'natural sunlight, forest background' },
    { name: 'Silk', icon: '👔', prompt: 'draped on silk fabric, high sheen' },
    { name: 'Noir', icon: '🌉', prompt: 'dark cinematic lighting, dramatic' },
  ];

  const BACKGROUNDS = ['Cream', 'Charcoal', 'Terracotta', 'Forest', 'Mint'];
  const RATIOS = ['1:1', '4:5', '9:16', '16:9'];

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-10 space-y-8 sm:space-y-10 max-w-[1600px] mx-auto no-scrollbar">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-center md:text-left">Products & AI Studio</h1>
          <p className="text-slate-500 font-medium text-sm sm:text-base text-center md:text-left">Manage your catalog and generate professional assets.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all shadow-sm group disabled:opacity-50"
          >
            <RefreshCcw className={cn("w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors", isSyncing && "animate-spin")} />
            {isSyncing ? 'Syncing...' : 'Sync Shopify'}
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-200">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between bg-slate-50/50 gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products, SKU or tags..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button className="p-2 text-slate-500 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-500 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Last Sync</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div 
                        onClick={() => openStudio(product)}
                        className="w-12 h-12 rounded-lg border border-slate-100 overflow-hidden shrink-0 shadow-sm relative group-hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900 leading-none">{product.title}</p>
                          <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-indigo-600 transition-colors">
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Edit</span>
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-1">Inventory: 42 in stock</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={cn(
                        "text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border",
                        product.status === 'Published' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                      )}>
                        {product.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-slate-600 font-mono font-medium">{product.sku}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.lastSynced}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => openStudio(product)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-bold hover:bg-indigo-500 transition-all shadow-md shadow-indigo-100"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Studio
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-slate-50">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div 
                  onClick={() => openStudio(product)}
                  className="w-16 h-16 rounded-xl border border-slate-100 overflow-hidden shrink-0 shadow-sm relative cursor-pointer"
                >
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">{product.title}</h4>
                    <span className="text-sm font-bold text-slate-900 shrink-0">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">{product.sku}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded-full border",
                      product.status === 'Published' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                    )}>
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => openStudio(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl text-[11px] font-bold hover:bg-indigo-500 transition-all shadow-md shadow-indigo-100"
                >
                  <Sparkles className="w-4 h-4" />
                  AI Magic Studio
                </button>
                <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog.Root open={isStudioOpen} onOpenChange={setIsStudioOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-4xl bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="flex flex-col lg:flex-row h-full overflow-hidden">
              <div className="flex-1 bg-slate-50 flex flex-col p-6 sm:p-8 items-center justify-center relative min-h-[350px] lg:min-h-0">
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <Dialog.Title className="text-sm font-bold text-slate-900 uppercase tracking-tighter truncate max-w-[150px] sm:max-w-none">AI Magic Studio</Dialog.Title>
                </div>
                
                <div className={cn(
                  "relative w-full max-w-[280px] sm:max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white transition-all duration-500",
                  selectedRatio === '1:1' ? "aspect-square" : 
                  selectedRatio === '4:5' ? "aspect-[4/5]" : 
                  selectedRatio === '9:16' ? "aspect-[9/16] h-[300px] sm:h-[450px]" : "aspect-[16/9]"
                )}>
                  <AnimatePresence mode="wait">
                    {isGenerating ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-center gap-6 z-10 p-4 sm:p-12 text-center"
                      >
                         <div className="relative">
                            <div className="w-12 h-12 sm:w-20 sm:h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                            <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                         </div>
                         <div className="space-y-1 sm:space-y-2">
                           <p className="text-[10px] sm:text-sm font-black text-white uppercase tracking-[0.3em] animate-pulse">OmniAI Imaging</p>
                           <p className="text-[9px] sm:text-xs font-medium text-slate-400 italic">"Thinking..."</p>
                         </div>
                         <div className="w-full max-w-[150px] sm:max-w-[200px] h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 3 }}
                              className="h-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                            />
                         </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                  
                  {selectedProduct && (
                    <img 
                      src={selectedProduct.image} 
                      alt="Preview" 
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-700",
                        isGenerating ? "scale-105 blur-sm" : "scale-100"
                      )} 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                <div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar w-full justify-center">
                  <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-200">
                    {RATIOS.map(ratio => (
                      <button 
                        key={ratio}
                        onClick={() => setSelectedRatio(ratio)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap",
                          selectedRatio === ratio ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:text-slate-600"
                        )}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-96 border-l border-slate-100 p-6 sm:p-8 flex flex-col overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <button 
                    onClick={() => setActiveTab('presets')}
                    className={cn(
                      "flex-1 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest border-b-2 transition-all",
                      activeTab === 'presets' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400"
                    )}
                  >
                    Presets
                  </button>
                  <button 
                    onClick={() => setActiveTab('custom')}
                    className={cn(
                      "flex-1 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest border-b-2 transition-all",
                      activeTab === 'custom' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400"
                    )}
                  >
                    Custom
                  </button>
                </div>
                
                <div className="space-y-6 flex-1">
                  {activeTab === 'presets' ? (
                    <>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Style Preset</label>
                        <div className="grid grid-cols-2 gap-3">
                          {STYLE_PRESETS.map(style => (
                            <button 
                              key={style.name}
                              onClick={() => setSelectedStyle(style.name)}
                              className={cn(
                                "p-3 sm:p-4 border-2 rounded-2xl text-center transition-all group",
                                selectedStyle === style.name ? "border-indigo-500 bg-indigo-50/50" : "border-slate-100 bg-white hover:border-slate-200"
                              )}
                            >
                              <span className="block text-xl sm:text-2xl mb-2 group-hover:scale-110 transition-transform">{style.icon}</span>
                              <span className={cn(
                                "text-[9px] sm:text-[10px] font-bold uppercase tracking-tight block",
                                selectedStyle === style.name ? "text-indigo-700" : "text-slate-500"
                              )}>{style.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Background</label>
                        <div className="flex flex-wrap gap-2">
                          {BACKGROUNDS.map(bg => (
                            <button 
                              key={bg}
                              className="px-3 py-1.5 rounded-full border border-slate-200 text-[9px] font-bold uppercase text-slate-500 hover:bg-slate-50 transition-all"
                            >
                              {bg}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Direct Prompt</label>
                      <textarea 
                        placeholder="e.g. A minimalist marble surface..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none h-32 lg:h-40"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-100">
                  <button 
                    onClick={isFinished ? () => setIsStudioOpen(false) : handleGenerate}
                    disabled={isGenerating}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 p-4 rounded-2xl font-bold transition-all shadow-xl shadow-slate-200 active:scale-[0.98]",
                      isFinished ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-slate-800",
                      isGenerating && "disabled:opacity-50"
                    )}
                  >
                    {isFinished ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm">Save to Catalog</span>
                      </div>
                    ) : (
                      <>
                        <Sparkles className={cn("w-5 h-5 text-indigo-400", isGenerating && "animate-pulse")} />
                        <span className="text-sm">{isGenerating ? 'Generating...' : 'Generate Mockup'}</span>
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter italic">Subject Preserved</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] font-bold text-slate-500 uppercase">GPU Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

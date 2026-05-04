import React, { useState } from 'react';
import { 
  Folder, 
  ChevronRight, 
  Plus, 
  Search,
  Globe,
  Tag,
  XCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const CATEGORIES = [
  { 
    id: '1', 
    name: 'Cosmetics', 
    count: 24, 
    sub: [
      { id: '1-1', name: 'Lipstick', count: 12 },
      { id: '1-2', name: 'Skincare', count: 8 },
      { id: '1-3', name: 'Eye Makeup', count: 4 },
    ]
  },
  { id: '2', name: 'Jewelry', count: 15, sub: [] },
  { id: '3', name: 'Fashion', count: 42, sub: [] },
];

export function CategoryManager() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    if (newCatName.trim()) {
      setCategories([...categories, { id: Date.now().toString(), name: newCatName, count: 0, sub: [] }]);
      setNewCatName('');
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-10 space-y-6 sm:space-y-10 max-w-[1200px] mx-auto no-scrollbar">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Taxonomy & SEO</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Organize your omnichannel catalog and optimize for search.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-all shadow-lg active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          New Category
        </button>
      </header>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
             />
             <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl space-y-6"
             >
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Folder className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">New Category</h3>
                  <p className="text-sm text-slate-500 mt-1">Add a top-level category to your catalog.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Category Name</label>
                    <input 
                      autoFocus
                      type="text"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="e.g. Wellness"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={handleAddCategory}
                    disabled={!newCatName.trim()}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
                  >
                    Create Category
                  </button>
                  <button 
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-full py-4 text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="md:col-span-2 space-y-4 px-2 sm:px-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                   type="text" 
                   placeholder="Filter categories..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                 />
               </div>
             </div>
             
             <div className="divide-y divide-slate-50">
               {filteredCategories.map((cat) => (
                 <div key={cat.id} className="group">
                   <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                     <div className="flex items-center gap-3">
                       <Folder className="w-5 h-5 text-indigo-500 shrink-0" />
                       <span className="text-sm font-bold text-slate-900 truncate">{cat.name}</span>
                       <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold shrink-0">
                         {cat.count}
                       </span>
                     </div>
                     <div className="flex items-center gap-2 shrink-0">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 sm:opacity-0 group-hover:opacity-100 transition-all">
                         <Tag className="w-4 h-4" />
                       </button>
                       <ChevronRight className="w-4 h-4 text-slate-400" />
                     </div>
                   </div>
                   
                   {cat.sub.length > 0 && (
                     <div className="bg-slate-50/50 pl-8 sm:pl-12 divide-y divide-slate-100/50">
                       {cat.sub.map((sub) => (
                         <div key={sub.id} className="flex items-center justify-between p-3 hover:bg-white transition-colors cursor-pointer pr-4 sm:pr-8">
                           <span className="text-sm text-slate-600 font-medium truncate pr-4">{sub.name}</span>
                           <span className="text-[10px] text-slate-400 whitespace-nowrap">{sub.count} items</span>
                         </div>
                       ))}
                     </div>
                   )}
                 </div>
               ))}
             </div>
           </div>
         </div>
 
         <div className="space-y-6 px-2 sm:px-0">
           <div className="bg-indigo-900 p-6 sm:p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] -mr-16 -mt-16 rounded-full" />
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                 <Globe className="w-5 h-5 text-indigo-400" />
                 <h3 className="text-lg font-bold">SEO Snapshot</h3>
               </div>
               <p className="text-indigo-200 text-sm leading-relaxed">
                 Your "Cosmetics" category is missing meta descriptions on 12 products. This could hurt your Google ranking.
               </p>
               <button className="mt-6 w-full flex items-center justify-center gap-2 p-3 bg-white text-indigo-900 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-lg active:scale-[0.98]">
                 Auto-Fix with OmniAI
               </button>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
}

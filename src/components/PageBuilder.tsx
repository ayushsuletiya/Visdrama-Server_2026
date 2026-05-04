import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Plus, 
  Eye, 
  Save, 
  Sparkles, 
  ChevronLeft,
  GripVertical,
  Type,
  Image as ImageIcon,
  Layout,
  MousePointer2,
  Trash2,
  Copy
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, Reorder } from 'framer-motion';

const SECTION_TEMPLATES = [
  { id: 'hero', name: 'Hero Banner', icon: Layout },
  { id: 'grid', name: 'Product Grid', icon: GripVertical },
  { id: 'text', name: 'Rich Text', icon: Type },
  { id: 'testi', name: 'Testimonials', icon: MessageSquareIcon },
  { id: 'image', name: 'Image + Text', icon: ImageIcon },
];

function MessageSquareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function PageBuilder() {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'canvas' | 'elements' | 'settings'>('canvas');
  const [sections, setSections] = useState([
    { id: '1', type: 'hero', content: { title: 'Elevate Your Glow', subtitle: 'Introducing the Midnight Serum Collection' } },
    { id: '2', type: 'text', content: { text: 'Our products are crafted with the finest organic ingredients to ensure your skin receives the best treatment possible.' } },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addSection = (type: string) => {
    const newSection = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === 'hero' ? { title: 'New Hero banner', subtitle: 'Subtitle goes here' } :
               type === 'grid' ? { title: 'Featured Products', products: [1, 2, 3, 4] } :
               type === 'text' ? { text: 'Enter your rich text content here...' } :
               { text: 'Sample content' }
    };
    setSections([...sections, newSection]);
    setSelectedId(newSection.id);
    if (window.innerWidth < 1024) setActiveTab('canvas');
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const selectedSection = sections.find(s => s.id === selectedId);

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#0A0A0F] text-slate-300 font-sans select-none overflow-hidden">
      {/* Mobile Switcher */}
      <div className="lg:hidden flex border-b border-white/5 bg-[#111118]">
        <button 
          onClick={() => setActiveTab('elements')}
          className={cn("flex-1 p-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all", activeTab === 'elements' ? "text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5" : "text-slate-500 hover:text-slate-300")}
        >
          Elements
        </button>
        <button 
          onClick={() => setActiveTab('canvas')}
          className={cn("flex-1 p-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all", activeTab === 'canvas' ? "text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5" : "text-slate-500 hover:text-slate-300")}
        >
          Canvas
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={cn("flex-1 p-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all", activeTab === 'settings' ? "text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5" : "text-slate-500 hover:text-slate-300")}
        >
          Selection
        </button>
      </div>

      {/* Left Panel - Elements */}
      <div className={cn(
        "w-full lg:w-72 border-r border-white/5 bg-[#111118] flex flex-col transition-all",
        activeTab !== 'elements' && "hidden lg:flex"
      )}>
        <div className="p-6 border-b border-white/5 hidden lg:block">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <Layout className="w-4 h-4 text-indigo-400" />
            Sections
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-4 no-scrollbar">
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-4">
             <div className="flex items-center gap-2 mb-3">
               <Sparkles className="w-4 h-4 text-indigo-400" />
               <span className="text-xs font-bold text-indigo-200 uppercase">AI Generator</span>
             </div>
             <p className="text-[11px] text-indigo-300/80 mb-3 leading-relaxed">Describe the section you want to build...</p>
             <div className="relative">
                <textarea 
                  placeholder="e.g. A three column feature section for my skincare products..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-24 lg:h-20"
                />
                <button 
                  onClick={() => addSection('grid')}
                  className="absolute bottom-2 right-2 p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
             </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-1">Standard Sections</p>
            {SECTION_TEMPLATES.map((item) => (
              <button
                key={item.id}
                onClick={() => addSection(item.id)}
                className="w-full flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/10 transition-all text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{item.name}</span>
                <Plus className="w-3.5 h-3.5 ml-auto text-slate-600 group-hover:text-white" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center - Canvas */}
      <div className={cn(
        "flex-1 flex flex-col bg-[#0A0A0F] h-full",
        activeTab !== 'canvas' && "hidden lg:flex"
      )}>
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 bg-[#111118]/80 backdrop-blur-md z-20">
          <div className="hidden sm:flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
            <button 
              onClick={() => setViewport('mobile')}
              className={cn("p-1.5 rounded-md transition-all", viewport === 'mobile' ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300")}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewport('tablet')}
              className={cn("p-1.5 rounded-md transition-all", viewport === 'tablet' ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300")}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewport('desktop')}
              className={cn("p-1.5 rounded-md transition-all", viewport === 'desktop' ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300")}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
          <div className="sm:hidden text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Page View</div>

          <div className="flex items-center gap-2 sm:gap-3">
             <button className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] sm:text-xs font-semibold transition-all border border-white/5">
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
             </button>
             <button className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] sm:text-xs font-semibold transition-all shadow-lg shadow-indigo-500/20">
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Publish to Shopify</span>
              <span className="sm:hidden">Publish</span>
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 flex justify-center bg-dots-white/5 no-scrollbar">
          <div className={cn(
            "bg-white h-fit shadow-2xl rounded-sm transition-all duration-300 overflow-hidden text-slate-900 border-x-4 border-slate-200",
            (viewport === 'desktop' || window.innerWidth < 640) ? "w-full max-w-5xl" : 
            viewport === 'tablet' ? "w-[768px]" : "w-[375px]"
          )}>
            <div className="flex flex-col">
              {sections.map((section) => (
                <div 
                  key={section.id} 
                  onClick={() => {
                    setSelectedId(section.id);
                    if (window.innerWidth < 1024) setActiveTab('settings');
                  }}
                  className={cn(
                    "relative group cursor-pointer border-2 border-transparent transition-all",
                    selectedId === section.id ? "border-indigo-500" : "hover:border-indigo-500/30"
                  )}
                >
                   {/* Mini toolbar */}
                   <div className={cn(
                     "absolute -top-3 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10",
                     selectedId === section.id ? "opacity-100" : ""
                   )}>
                      <button className="p-1.5 bg-white shadow-lg border border-slate-200 rounded-md text-slate-500 hover:text-indigo-600 transition-all"><Copy className="w-3 h-3"/></button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
                        className="p-1.5 bg-white shadow-lg border border-slate-200 rounded-md text-slate-500 hover:text-rose-600 transition-all"
                      >
                        <Trash2 className="w-3 h-3"/>
                      </button>
                      <button className="hidden sm:flex p-1.5 bg-indigo-600 shadow-lg border border-indigo-500 rounded-md text-white cursor-grab"><GripVertical className="w-3 h-3"/></button>
                   </div>

                   {section.type === 'hero' ? (
                     <div className="py-12 sm:py-24 px-6 sm:px-12 bg-slate-950 text-white text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-transparent to-transparent" />
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter mb-4 relative z-10">{(section.content as any).title}</h1>
                        <p className="text-base sm:text-xl text-slate-400 mb-8 relative z-10">{(section.content as any).subtitle}</p>
                        <button className="bg-indigo-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:bg-indigo-500 transition-all relative z-10 uppercase tracking-widest text-[10px] sm:text-xs">Shop Now</button>
                     </div>
                   ) : section.type === 'grid' ? (
                     <div className="py-10 sm:py-16 px-6 sm:px-12 bg-white">
                        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12">{(section.content as any).title}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                           {[1,2,3,4].map(i => (
                             <div key={i} className="space-y-3 sm:space-y-4">
                                <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                                   <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                                <div className="space-y-1.5 sm:space-y-1">
                                   <div className="h-3 sm:h-4 bg-slate-100 rounded w-3/4" />
                                   <div className="h-3 sm:h-4 bg-slate-100 rounded w-1/2" />
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                   ) : (
                     <div className="py-10 sm:py-16 px-6 sm:px-12 bg-white text-center">
                        <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">{(section.content as any).text}</p>
                     </div>
                   )}
                </div>
              ))}
              
              <div 
                onClick={() => addSection('hero')}
                className="py-10 sm:py-12 border-2 border-dashed border-slate-200 m-4 sm:m-8 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-3 hover:border-slate-300 transition-all cursor-pointer group"
              >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                    <Plus className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">Click to add a section</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Settings */}
      <div className={cn(
        "w-full lg:w-80 border-l border-white/5 bg-[#111118] flex flex-col transition-all",
        activeTab !== 'settings' && "hidden lg:flex"
      )}>
        <div className="p-6 border-b border-white/5 hidden lg:block">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <SettingsIcon className="w-4 h-4 text-indigo-400" />
            Selection
          </h2>
        </div>

        {selectedSection ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Typography</label>
              <div className="space-y-4">
                {selectedSection.type === 'hero' ? (
                  <>
                    <div className="space-y-1.5">
                      <span className="text-[11px] text-slate-400">Heading Text</span>
                      <input 
                        type="text" 
                        defaultValue={(selectedSection.content as any).title}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[11px] text-slate-400">Subheading</span>
                      <textarea 
                        defaultValue={(selectedSection.content as any).subtitle}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-24 lg:h-24"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-slate-400">Text Content</span>
                    <textarea 
                      defaultValue={(selectedSection.content as any).text}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-40 lg:h-32"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Appearance</label>
              <div className="grid grid-cols-2 gap-3">
                 <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Background</span>
                    <div className="flex items-center gap-2">
                       <div className={cn(
                         "w-4 h-4 rounded-sm border border-white/20",
                         selectedSection.type === 'hero' ? "bg-slate-950" : "bg-white"
                       )} />
                       <span className="text-[10px] text-white">#020617</span>
                    </div>
                 </div>
                 <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Padding</span>
                    <div className="flex items-center gap-2 text-[10px] text-white">
                       <span className="font-bold">96px</span>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-xl p-4 mt-auto">
               <button className="w-full flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" />
                  Optimize Copy with AI
               </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-30">
            <MousePointer2 className="w-12 h-12 mb-4 text-slate-600" />
            <p className="text-sm font-medium">Select a section in the canvas to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

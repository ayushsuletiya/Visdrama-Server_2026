import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Settings2, 
  Database, 
  MessageSquare, 
  Shield, 
  Command,
  Plus,
  Play,
  Save,
  Wand2,
  BrainCircuit,
  Workflow,
  Zap,
  Check,
  ChevronDown,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function AIAgentBuilder() {
  const [activeTab, setActiveTab] = useState<'personality' | 'knowledge' | 'workflow' | 'test'>('personality');
  const [agentRole, setAgentRole] = useState('Customer Success Lead');
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [tones, setTones] = useState<string[]>(['Professional', 'Empathetic']);
  const [isRefining, setIsRefining] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [instructions, setInstructions] = useState(`You are the Elite Concierge for Luxe Cosmetics. Your primary goal is to provide luxurious, high-end support.
1. Always be empathetic.
2. Use sophisticated but accessible language.
3. Prioritize customer retention during refund requests.
4. If a user is a Platinum member, offer immediate free shipping codes.`);
  
  const ROLES = [
    { title: 'Customer Success Lead', desc: 'Prioritizes empathy and problem-solving.' },
    { title: 'Sales Personal Assistant', desc: 'Focused on conversions and product knowledge.' },
    { title: 'Technical Support Engineer', desc: 'Brief, precise, and data-driven responses.' }
  ];

  const handleAiRefine = () => {
    setIsRefining(true);
    setTimeout(() => {
      setInstructions(prev => prev + "\n5. (AI Enhanced) Proactively suggest complementary products based on skin type.");
      setIsRefining(false);
    }, 2000);
  };

  const [testMessages, setTestMessages] = useState([
    { role: 'agent', text: 'How can I help you today?' },
    { role: 'user', text: 'I need to return order #1002, the item arrived damaged.' },
    { role: 'agent', text: 'I am so sorry to hear that your order arrived damaged. As a Platinum member, we\'ve already flagged this for priority resolution. Would you like a fresh replacement sent via Express today, or a full refund to your original payment method?' },
  ]);
  const [testInput, setTestInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const sendTestMessage = () => {
    if (!testInput.trim() || isTyping) return;
    
    const newMessages = [...testMessages, { role: 'user', text: testInput }];
    setTestMessages(newMessages);
    setTestInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setTestMessages(prev => [...prev, { 
        role: 'agent', 
        text: 'I\'ll process that for you immediately. Is there anything else you need assistance with?' 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#FAFBFF] overflow-hidden">
      {/* Left Sidebar - Configuration Steps (Hidden on Mobile) */}
      <div className="hidden lg:flex w-80 border-r border-slate-200 bg-white flex-col p-6 space-y-8 shadow-[10px_0_15px_-10px_rgba(0,0,0,0.02)]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">OmniAI Agent</h2>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">v2.1 Stable</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            Train your master agent with custom personality, store data, and automation rules.
          </p>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'personality', label: 'Personality & Voice', icon: Sparkles, desc: 'Tone, language, and behavior' },
            { id: 'knowledge', label: 'Knowledge Base', icon: Database, desc: 'Training data & store docs' },
            { id: 'workflow', label: 'Automation Rules', icon: Workflow, desc: 'Refunds, tracking, escalation' },
            { id: 'test', label: 'Interaction Studio', icon: Play, desc: 'Real-time test environment' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full p-4 rounded-2xl text-left border transition-all relative group",
                activeTab === item.id 
                  ? "bg-indigo-50 border-indigo-200 shadow-sm" 
                  : "bg-white border-transparent hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3 mb-1">
                <item.icon className={cn(
                  "w-4 h-4 transition-colors",
                  activeTab === item.id ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                )} />
                <span className={cn(
                  "text-sm font-bold tracking-tight",
                  activeTab === item.id ? "text-slate-900" : "text-slate-600"
                )}>{item.label}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium pl-7">{item.desc}</p>
              {activeTab === item.id && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
           <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">AI Power Status</span>
           </div>
           <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full w-[85%]" />
           </div>
           <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">8.2k Operations this month</p>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <header className="min-h-[5rem] lg:h-20 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between py-4 sm:py-0 gap-4">
           <div className="flex items-center gap-4 overflow-hidden">
              <div className="hidden sm:block px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0">Builder Mode</div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
                {activeTab === 'personality' && "Voice & Tone Configuration"}
                {activeTab === 'knowledge' && "Vector Database / Training Data"}
                {activeTab === 'workflow' && "Custom Resolution Flows"}
                {activeTab === 'test' && "Real-time Simulation"}
              </h1>
           </div>
           <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 whitespace-nowrap">Discard</button>
              <button 
                onClick={() => setShowSuccessModal(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-100 whitespace-nowrap"
              >
                <Save className="w-3.5 h-3.5" />
                Deploy Agent
              </button>
           </div>
        </header>

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto p-4 bg-white border-b border-slate-200 no-scrollbar shrink-0">
          {[
            { id: 'personality', label: 'Personality', icon: Sparkles },
            { id: 'knowledge', label: 'Knowledge', icon: Database },
            { id: 'workflow', label: 'Workflows', icon: Workflow },
            { id: 'test', label: 'Interaction', icon: Play },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap",
                activeTab === item.id 
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100" 
                  : "bg-white border-slate-200 text-slate-600"
              )}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccessModal(false)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
               />
               <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl text-center space-y-6"
               >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Agent Deployed</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Your OmniAI Agent is now active across all connected channels and learning from live interactions.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all"
                  >
                    Return to Dashboard
                  </button>
               </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px]">
           <AnimatePresence mode="wait">
              {activeTab === 'personality' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-3xl mx-auto space-y-6 sm:space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                         <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Tone Profile</h3>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{tones.length} Active</span>
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {['Professional', 'Friendly', 'Empathetic', 'Direct', 'Concise', 'Formal'].map(tag => (
                              <button 
                                key={tag} 
                                onClick={() => {
                                  if (tones.includes(tag)) {
                                    setTones(tones.filter(t => t !== tag));
                                  } else {
                                    setTones([...tones, tag]);
                                  }
                                }}
                                className={cn(
                                  "px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border",
                                  tones.includes(tag)
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                )}
                              >
                                {tag}
                              </button>
                            ))}
                         </div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                         <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Agent Role</h3>
                         <div className="relative">
                            <button 
                              onClick={() => setIsRoleOpen(true)}
                              className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 transition-all hover:bg-slate-100 group"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                                  <Bot className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="font-bold tracking-tight truncate">{agentRole}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-400 group-hover:text-indigo-600 transition-colors">
                                <span className="text-[10px] font-bold uppercase hidden sm:inline">Change</span>
                                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isRoleOpen && "rotate-180")} />
                              </div>
                            </button>
                            
                            <AnimatePresence>
                              {isRoleOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                                   <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsRoleOpen(false)}
                                    className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                                   />
                                   <motion.div 
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="relative w-full max-w-lg bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl p-6 sm:p-8 space-y-6"
                                   >
                                      <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Select Agent Role</h3>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">Define the primary objective and behavior of your AI assistant.</p>
                                      </div>
                                      
                                      <div className="space-y-3">
                                        {ROLES.map(role => (
                                          <button
                                            key={role.title}
                                            onClick={() => {
                                              setAgentRole(role.title);
                                              setIsRoleOpen(false);
                                            }}
                                            className={cn(
                                              "w-full text-left p-4 rounded-2xl transition-all flex items-start gap-4 group border-2",
                                              agentRole === role.title ? "bg-indigo-50 border-indigo-600 shadow-sm shadow-indigo-100" : "bg-white border-slate-100 hover:border-slate-200"
                                            )}
                                          >
                                            <div className={cn(
                                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300",
                                              agentRole === role.title ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                                            )}>
                                              {agentRole === role.title ? <Check className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                            </div>
                                            <div className="min-w-0">
                                              <p className={cn(
                                                "text-sm font-bold tracking-tight transition-colors whitespace-normal",
                                                agentRole === role.title ? "text-indigo-900" : "text-slate-900"
                                              )}>{role.title}</p>
                                              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{role.desc}</p>
                                            </div>
                                          </button>
                                        ))}
                                      </div>
                                      
                                      <button 
                                        onClick={() => setIsRoleOpen(false)}
                                        className="w-full py-4 text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-slate-900 transition-colors"
                                      >
                                        Close
                                      </button>
                                   </motion.div>
                                </div>
                              )}
                            </AnimatePresence>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                      <div className="flex items-center justify-between">
                         <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Base Instructions</h3>
                         <button 
                          onClick={handleAiRefine}
                          disabled={isRefining}
                          className="flex items-center gap-1.5 text-indigo-600 text-[10px] font-bold hover:underline disabled:opacity-50"
                         >
                            {isRefining ? (
                              <motion.div 
                                animate={{ rotate: 360 }} 
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              >
                                <Sparkles className="w-3 h-3" />
                              </motion.div>
                            ) : <Wand2 className="w-3 h-3" />}
                            {isRefining ? "Refining..." : "Refine"}
                         </button>
                      </div>
                      <div className="relative">
                        <textarea 
                          value={instructions}
                          onChange={(e) => setInstructions(e.target.value)}
                          className="w-full min-h-[200px] bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 text-sm italic text-slate-600 leading-relaxed focus:bg-white transition-all outline-none"
                          placeholder="Define how the agent should behave..."
                        />
                        {isRefining && (
                          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
                            <motion.div 
                              animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl"
                            >
                              AI Optimization Active
                            </motion.div>
                          </div>
                        )}
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'knowledge' && (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="max-w-4xl mx-auto space-y-6"
                 >
                    <div className="flex items-center justify-between">
                       <h2 className="text-xl font-bold text-slate-900 tracking-tight">Source Documents</h2>
                       <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                          <Plus className="w-4 h-4" />
                          Add Knowledge Source
                       </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                         { name: 'Refund-Policy-2024.pdf', type: 'PDF', size: '1.2MB', date: 'Synced 2h ago' },
                         { name: 'Product-Catalog-S/S24', type: 'Shopify Sync', size: '1,421 Items', date: 'Synced 15m ago' },
                         { name: 'FAQ-Common-Scenarios.docx', type: 'DOCX', size: '42KB', date: 'Synced 1d ago' },
                         { name: 'Internal-Slack-Logs', type: 'Integration', size: '8.4k Messages', date: 'Synced 5h ago' },
                       ].map((doc) => (
                         <div key={doc.name} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-indigo-200 transition-all group">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                  <Database className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                                  <div className="flex gap-2 text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                                     <span>{doc.type}</span>
                                     <span>•</span>
                                     <span>{doc.size}</span>
                                  </div>
                               </div>
                            </div>
                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{doc.date}</span>
                         </div>
                       ))}
                    </div>

                    <div className="mt-12 p-10 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 group hover:border-indigo-300 transition-all bg-white/50">
                       <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                          <Plus className="w-8 h-8 text-slate-300 group-hover:text-indigo-600" />
                       </div>
                       <div className="text-center">
                          <p className="text-sm font-bold text-slate-900 tracking-tight">Upload new data or connect URL</p>
                          <p className="text-xs text-slate-400 mt-1">PDF, TXT, DOCX or Website URLs supported</p>
                       </div>
                    </div>
                 </motion.div>
              )}

              {activeTab === 'workflow' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto space-y-6"
                >
                   <div className="flex items-center justify-between mb-8">
                      <div>
                         <h2 className="text-xl font-bold text-slate-900 tracking-tight">Automation Workflows</h2>
                         <p className="text-sm text-slate-500">Define logic for autonomous resolutions.</p>
                      </div>
                      <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100">
                         <Plus className="w-4 h-4" />
                         New Workflow
                      </button>
                   </div>

                   <div className="space-y-4">
                      {[
                        { title: 'Refund Request Handler', trigger: 'Customer asks for refund', action: 'Check order status -> If < 30 days -> Auto-generate label', status: 'Active' },
                        { title: 'Platinum Upsell Mode', trigger: 'High value cart abandonment', action: 'Offer 15% discount code -> Send via WhatsApp', status: 'Testing' },
                        { title: 'Damaged Item Escalation', trigger: 'Keywords: broken, damaged, leaked', action: 'Flag to Admin -> Ask for photo -> Offer replacement', status: 'Active' },
                      ].map((flow) => (
                        <div key={flow.title} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start justify-between gap-6 hover:shadow-md transition-shadow">
                           <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                                 <Workflow className="w-5 h-5 text-indigo-600" />
                              </div>
                              <div className="space-y-1">
                                 <h4 className="text-sm font-bold text-slate-900">{flow.title}</h4>
                                 <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400">TRIGGER:</span>
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter bg-slate-100 px-2 rounded">{flow.trigger}</span>
                                 </div>
                                 <p className="text-xs text-slate-500 font-medium mt-2 italic">“{flow.action}”</p>
                              </div>
                           </div>
                           <div className="flex flex-col items-end gap-3">
                              <span className={cn(
                                "text-[9px] font-bold px-2 py-0.5 rounded-full border",
                                flow.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                              )}>{flow.status}</span>
                              <div className="flex items-center gap-2">
                                 <button className="p-1.5 text-slate-400 hover:text-slate-600"><Settings2 className="w-4 h-4"/></button>
                                 <button className="p-1.5 text-slate-400 hover:text-rose-600"><Plus className="w-4 h-4 rotate-45"/></button>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'test' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden mb-10"
                >
                   <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                         </div>
                         <div>
                            <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Agent Preview</p>
                            <p className="text-[9px] text-emerald-600 font-bold">READY TO CHAT</p>
                         </div>
                      </div>
                      <button className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest">Reset Chat</button>
                   </div>
                   <div className="flex-1 flex flex-col p-8 space-y-4 overflow-y-auto min-h-[400px] no-scrollbar">
                      <AnimatePresence mode="popLayout">
                        {testMessages.map((msg, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn(
                              "max-w-[80%] p-3 rounded-2xl text-sm tracking-tight flex items-start gap-2",
                              msg.role === 'agent' 
                                ? "self-start bg-slate-100 rounded-tl-none text-slate-800" 
                                : "self-end ml-auto bg-indigo-600 rounded-tr-none text-white font-medium shadow-md shadow-indigo-100"
                            )}
                          >
                            {msg.role === 'agent' && <Bot className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />}
                            <div className="flex flex-col gap-2">
                              <span>{msg.text}</span>
                              {msg.role === 'agent' && (
                                <button 
                                  onClick={() => copyToClipboard(msg.text)}
                                  className="w-fit flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest mt-1"
                                >
                                  <Copy className="w-3 h-3" />
                                  Copy Text
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                        {isTyping && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="self-start bg-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                   <div className="p-6 border-t border-slate-100 flex gap-3">
                      <input 
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendTestMessage()}
                        disabled={isTyping}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white outline-none disabled:opacity-50" 
                        placeholder={isTyping ? "Agent is thinking..." : "Type a test message..."} 
                       />
                      <button 
                        onClick={sendTestMessage}
                        disabled={isTyping || !testInput.trim()}
                        className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-20"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

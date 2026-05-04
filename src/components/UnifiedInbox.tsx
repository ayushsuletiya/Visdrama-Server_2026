import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  User, 
  Bot,
  Instagram,
  MessageCircle,
  Clock,
  CheckCheck,
  BrainCircuit,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_CHATS } from '../mockData';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import * as Switch from '@radix-ui/react-switch';

export function UnifiedInbox() {
  const [chats, setChats] = useState(MOCK_CHATS);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(MOCK_CHATS[0].id);
  const [isAiPilot, setIsAiPilot] = useState(true);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');

  const selectedChat = chats.find(c => c.id === selectedChatId) || chats[0];
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;

  const handleSend = (text: string, isAi = false) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: isAi ? 'AI Agent' : 'Admin',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: selectedChat.channel,
      isCustomer: false
    };

    setChats(prev => prev.map(c => {
      if (c.id === selectedChatId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: text,
          timestamp: 'Just now',
          unreadCount: 0
        };
      }
      return c;
    }));
    setMessage('');
  };

  const handleApproveAi = () => {
    handleSend("Your order #1002 is arriving tomorrow via FedEx.", true);
  };

  return (
    <div className="flex h-full bg-white overflow-hidden relative">
      {/* Sidebar - Chat List */}
      <div className={cn(
        "w-full lg:w-80 flex flex-col border-r border-slate-100 bg-slate-50/10 transition-all",
        selectedChatId && "hidden lg:flex"
      )}>
        <div className="p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Messages</h2>
            <Link 
              to="/agent-builder"
              className="p-2 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-all group"
              title="Configure AI Agent"
            >
               <BrainCircuit className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar h-0">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={cn(
                "w-full p-4 flex gap-4 hover:bg-white transition-all text-left relative group",
                selectedChatId === chat.id ? "bg-white shadow-sm z-10" : "border-b border-slate-100/50"
              )}
            >
              {selectedChatId === chat.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />
              )}
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white text-indigo-700 font-bold">
                    {chat.name[0]}
                   </div>
                </div>
                <div className="absolute -right-1 -bottom-1 w-5 h-5 rounded-full bg-white flex items-center justify-center p-1 shadow-sm border border-slate-100">
                  {chat.channel === 'WhatsApp' ? (
                    <MessageCircle className="w-full h-full text-emerald-500 fill-emerald-500 px-0.5" />
                  ) : (
                    <Instagram className="w-full h-full text-pink-500" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-slate-900 truncate tracking-tight">{chat.name}</p>
                  <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{chat.timestamp}</span>
                </div>
                <p className={cn(
                  "text-xs mt-1 truncate",
                  chat.unreadCount > 0 ? "text-slate-900 font-bold" : "text-slate-500 font-medium"
                )}>
                  {chat.lastMessage}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-4 h-4 rounded bg-amber-50 text-amber-600 flex items-center justify-center text-[8px] font-bold border border-amber-100">AI</div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Drafting...</span>
                </div>
              </div>
              {chat.unreadCount > 0 && (
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-[10px] font-bold text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
                  {chat.unreadCount}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className={cn(
        "flex-1 flex flex-col bg-slate-50/10 transition-all",
        !selectedChatId && "hidden lg:flex"
      )}>
        {/* Header */}
        <div className="h-20 lg:px-10 px-4 border-b border-slate-100 bg-white flex items-center justify-between z-10 shadow-sm shadow-slate-50">
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            <button 
              onClick={() => setSelectedChatId(null)}
              className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold shrink-0">
               {selectedChat.name[0]}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 tracking-tight truncate">{selectedChat.name}</p>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate">Live • {selectedChat.channel}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 pr-6 border-r border-slate-200">
               <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-100 flex items-center justify-center text-[8px] font-bold">AJ</div>
                  <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white ring-1 ring-indigo-50 flex items-center justify-center text-[8px] font-bold text-indigo-600">+2</div>
               </div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter whitespace-nowrap">Assigned to Sam</span>
            </div>
            <div className="hidden md:flex items-center gap-3 pr-6 border-r border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Auto-Pilot</span>
              <Switch.Root 
                checked={isAiPilot} 
                onCheckedChange={setIsAiPilot}
                className={cn(
                  "w-10 h-5 rounded-full relative transition-colors outline-none cursor-pointer",
                  isAiPilot ? "bg-indigo-600 shadow-inner" : "bg-slate-200 shadow-inner"
                )}
              >
                <Switch.Thumb className={cn(
                  "block w-3.5 h-3.5 bg-white rounded-full shadow-md transition-transform duration-100 translate-x-1 will-change-transform",
                  isAiPilot && "translate-x-5.5"
                )} />
              </Switch.Root>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="lg:px-8 px-4 border-b border-slate-100 bg-white flex gap-6 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('chat')}
            className={cn("py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap", activeTab === 'chat' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-600")}
          >
            Conversation
          </button>
          <button 
            onClick={() => setActiveTab('notes')}
            className={cn("py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap", activeTab === 'notes' ? "border-amber-600 text-amber-600" : "border-transparent text-slate-400 hover:text-slate-600")}
          >
            Internal Notes
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col overflow-y-auto lg:p-8 p-4 space-y-6 no-scrollbar h-0 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] bg-[length:24px_24px]">
          <AnimatePresence mode="popLayout">
            {activeTab === 'chat' ? (
              selectedChat.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "flex flex-col max-w-[85%] sm:max-w-[70%]",
                    msg.isCustomer ? "self-start" : "self-end items-end ml-auto"
                  )}
                >
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-[13px] shadow-sm tracking-tight leading-relaxed",
                    msg.isCustomer 
                      ? "bg-white text-slate-900 rounded-tl-none border border-slate-100" 
                      : "bg-indigo-600 text-white rounded-tr-none shadow-indigo-100"
                  )}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 px-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{msg.timestamp}</span>
                    {!msg.isCustomer && <CheckCheck className="w-3 h-3 text-indigo-400" />}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                 <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 shadow-sm border-l-4 border-l-amber-500">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-5 h-5 rounded bg-amber-200 flex items-center justify-center text-[10px] font-bold text-amber-800">AM</div>
                       <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Admin Note • 2h ago</span>
                    </div>
                    <p className="text-[12px] text-amber-900 leading-relaxed">Customer is asking for order #1002 status. I've checked and it's already with FedEx. Keep an eye if she asks for a refund.</p>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {isAiPilot && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 justify-center py-6 text-slate-400"
            >
              <Bot className="w-4 h-4 animate-pulse text-indigo-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest italic tracking-widest">AI is drafting...</span>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="lg:p-6 p-4 bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
           {isAiPilot && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 lg:p-4 p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                 </div>
                 <div className="min-w-0">
                    <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest">AI Suggestion</p>
                    <p className="text-xs font-medium text-indigo-800 tracking-tight leading-none mt-1 truncate">"Your order #1002 is arriving tomorrow..."</p>
                 </div>
              </div>
              <button 
                onClick={handleApproveAi}
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-bold hover:bg-indigo-500 transition-all shadow-md shadow-indigo-100 uppercase tracking-widest whitespace-nowrap"
              >
                Approve & Send
              </button>
            </motion.div>
          )}
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="flex items-center gap-0.5 sm:gap-1.5">
              <button className="p-2 sm:p-2.5 text-slate-400 hover:text-indigo-600 transition-all hover:bg-indigo-50 rounded-xl group">
                <Paperclip className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="hidden sm:block p-2.5 text-slate-400 hover:text-indigo-600 transition-all hover:bg-indigo-50 rounded-xl group">
                <Smile className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend(message);
                }}
                placeholder="Message..." 
                className={cn(
                  "w-full border-transparent rounded-2xl px-4 lg:px-5 py-3 lg:py-3.5 text-sm transition-all outline-none ring-1 ring-slate-100 shadow-inner",
                  activeTab === 'chat' ? "bg-slate-50 focus:bg-white focus:ring-indigo-500/20" : "bg-amber-50/30 focus:bg-white focus:ring-amber-500/20"
                )}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2">
                 <button className="p-1 px-2 text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Templates</button>
              </div>
            </div>
            <button 
              onClick={() => handleSend(message)}
              className={cn(
               "p-3 sm:p-3.5 text-white rounded-2xl transition-all shadow-xl shrink-0",
               activeTab === 'chat' ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-100" : "bg-amber-600 hover:bg-amber-500 shadow-amber-100"
            )}>
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <div className="w-80 border-l border-slate-100 bg-white p-8 space-y-8 hidden xl:block overflow-y-auto no-scrollbar">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 mx-auto border-4 border-white shadow-lg flex items-center justify-center text-3xl">
            {selectedChat.name[0]}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-4 tracking-tight">{selectedChat.name}</h3>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Luxe Platinum Client</p>
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 px-1.5 rounded bg-indigo-600 text-white shadow-sm">
              <BrainCircuit className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest leading-none mt-1">AI Agent Context</h4>
          </div>
          
          <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50 space-y-4">
             <div className="space-y-1.5">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Detected Intent</label>
               <div className="flex items-center gap-2">
                 <div className="px-2 py-0.5 rounded-full bg-white border border-indigo-100 text-[10px] font-bold text-indigo-700">Order Status</div>
                 <div className="px-2 py-0.5 rounded-full bg-white border border-indigo-100 text-[10px] font-bold text-indigo-700">Fulfillment Query</div>
               </div>
             </div>

             <div className="space-y-1.5">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">AI Confidence</label>
               <div className="h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '92%' }}
                   className="h-full bg-indigo-600"
                 />
               </div>
               <div className="flex justify-between text-[9px] font-bold text-indigo-600 mt-1 uppercase">
                 <span>Confidence Level</span>
                 <span>92%</span>
               </div>
             </div>

             <div className="space-y-2 pt-2 border-t border-indigo-100/30">
               <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Current Action Plan</label>
               <div className="space-y-2">
                  {[
                    { text: 'Verify Order #ORD-1002 status', done: true, time: '2m' },
                    { text: 'Check shipping manifest (FedEx)', done: true, time: '1m' },
                    { text: 'Analyze customer sentiment', done: true, time: '30s' },
                    { text: 'Draft empathetic status update', done: false, active: true },
                    { text: 'Propose $10 "Patience Credit"', done: false, active: false }
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-2 group/step">
                      <div className={cn(
                        "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300",
                        step.done ? "bg-indigo-500 border-indigo-500" : 
                        step.active ? "border-indigo-500 animate-pulse" : "border-indigo-200"
                      )}>
                        {step.done ? <CheckCheck className="w-2 h-2 text-white" /> : 
                         step.active ? <div className="w-1 h-1 bg-indigo-500 rounded-full" /> : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                           <span className={cn(
                             "text-[11px] leading-tight font-medium transition-colors",
                             step.done ? "text-slate-400 line-through" : 
                             step.active ? "text-indigo-900 font-bold" : "text-slate-500"
                           )}>{step.text}</span>
                           {step.time && <span className="text-[8px] font-bold text-slate-300 group-hover/step:text-slate-400">{step.time}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
             </div>
             
             <button className="w-full py-2 bg-white border border-indigo-100 rounded-xl text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:bg-white transition-all shadow-sm active:scale-[0.98]">
               Take over from AI
             </button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Customer Details</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Email</span>
              <span className="text-slate-900 font-medium font-mono text-[10px]">sarah.j@gmail.com</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Phone</span>
              <span className="text-slate-900 font-medium">+1 555-0123</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Orders</h4>
            <span className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer">View All</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">#ORD-1002</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Paid</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Today, 10:00 AM</span>
                <span>$245.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

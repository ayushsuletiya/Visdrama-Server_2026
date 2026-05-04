import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowRight, Calendar, Activity, ShoppingBag, ArrowUpRight, Sparkles, MessageCircle, Sun, Bell, CheckCircle2 } from 'lucide-react';
import { MOCK_METRICS, MOCK_ACTIVITY, TOP_PRODUCTS } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { useBrand } from '../BrandContext';

const chartData = [
  { time: '00:00', sales: 400 },
  { time: '04:00', sales: 300 },
  { time: '08:00', sales: 800 },
  { time: '12:00', sales: 1200 },
  { time: '16:00', sales: 1100 },
  { time: '20:00', sales: 1500 },
  { time: '23:59', sales: 1400 },
];

import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { currentBrand } = useBrand();
  const navigate = useNavigate();
  const [chartView, setChartView] = React.useState<'revenue' | 'orders'>('revenue');
  const [aiAccepted, setAiAccepted] = React.useState(false);

  const handleTaskClick = (task: string) => {
    if (task.includes('order')) navigate('/orders');
    else if (task.includes('Serum')) navigate('/products');
    else if (task.includes('reviews')) navigate('/inbox');
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-10 space-y-8 sm:space-y-10 max-w-[1600px] mx-auto no-scrollbar">
      <header className="flex flex-col lg:flex-row lg:items-start xl:items-center justify-between gap-6 sm:gap-8 mb-4">
        <div className="space-y-4 w-full lg:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100 shadow-sm">
              <Sun className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                Good morning, <span className="text-indigo-600 italic">Sarah.</span>
              </h1>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Monday, May 4th • Operational Status: {aiAccepted ? 'Optimizing' : 'Optimal'}</p>
            </div>
          </div>

          {/* Pulse Strip: Cohesive status bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/5 backdrop-blur-sm rounded-2xl border border-slate-200/50 w-full sm:w-fit">
             {[
               { label: 'Storefront', status: 'Live & Healthy', color: 'emerald', detail: '24ms lat' },
               { label: 'AI Agent', status: aiAccepted ? 'Optimizing' : 'Learning', color: 'indigo', detail: '98% acc' },
               { label: 'Orders', status: '4 Pending', color: 'amber', detail: 'Bulk ready' },
               { label: 'Inventory', status: 'Optimal', color: 'emerald', detail: '1.2k SKU' },
             ].map((pulse, i) => (
               <React.Fragment key={pulse.label}>
                 <div className="flex items-center gap-3 px-3 sm:px-4 py-1.5 hover:bg-white rounded-xl transition-all cursor-default group min-w-[140px] sm:min-w-0">
                    <div className={cn(
                      "w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--color))] shadow-current shrink-0",
                      pulse.color === 'emerald' ? "bg-emerald-500 text-emerald-500" :
                      pulse.color === 'indigo' ? "bg-indigo-500 text-indigo-500" : "bg-amber-500 text-amber-500"
                    )} />
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter leading-none mb-0.5">{pulse.label}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-900 leading-none">{pulse.status}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase leading-none whitespace-nowrap">{pulse.detail}</span>
                      </div>
                    </div>
                 </div>
                 {i < 3 && <div className="hidden sm:block h-6 w-px bg-slate-200 mx-1" />}
               </React.Fragment>
             ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm self-start">
          <div className="flex flex-col items-end mr-4">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Regional Latency</span>
             <div className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-500" />
                <span className="text-xs font-bold text-slate-900 font-mono">14ms</span>
             </div>
          </div>

          <div className="h-10 w-[1px] bg-slate-200" />

          <div className="flex items-center gap-2 pl-2">
            <button className="relative p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            </button>
            <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all">
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_METRICS.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
          >
            <p className="text-sm font-medium text-slate-500">{metric.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{metric.value}</h3>
              <span className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1",
                metric.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(metric.change)}%
              </span>
            </div>
            <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                className={cn(
                  "h-full rounded-full transition-all",
                  metric.trend === 'up' ? "bg-emerald-500" : "bg-rose-500"
                )}
              />
            </div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Sales Performance</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setChartView('revenue')}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold rounded-md uppercase tracking-widest transition-all",
                  chartView === 'revenue' ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                Revenue
              </button>
              <button 
                onClick={() => setChartView('orders')}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold rounded-md uppercase tracking-widest transition-all",
                  chartView === 'orders' ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                Orders
              </button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                  labelStyle={{ color: '#64748b', fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl shadow-xl space-y-6 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">OmniAI Insight</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your "Midnight Serum" is trending on Instagram. Should I increase the stock level by 20% to prevent stockouts?
              </p>
              <div className="mt-8 space-y-2">
                <button 
                  onClick={() => setAiAccepted(true)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border transition-all text-sm group",
                    aiAccepted ? "bg-emerald-500 text-white border-emerald-400" : "bg-white/5 border-white/10 hover:bg-white/10"
                  )}
                >
                  <span className={cn("font-medium", aiAccepted ? "text-white" : "text-white")}>
                    {aiAccepted ? 'Suggestion Applied' : 'Accept Suggestion'}
                  </span>
                  {aiAccepted ? <CheckCircle2 className="w-4 h-4 text-white" /> : <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />}
                </button>
                {!aiAccepted && (
                  <button className="w-full text-center p-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-slate-300 transition-colors">
                    Ignore for now
                  </button>
                )}
              </div>
            </div>
            <div className="relative z-10 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" />
                <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">AI Agent Active</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 <Activity className="w-4 h-4 text-indigo-500" />
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Recent Activity</h3>
               </div>
               <span className="text-[10px] text-slate-400 font-bold uppercase cursor-pointer hover:text-indigo-600">View All</span>
            </div>
            <div className="space-y-5">
              {MOCK_ACTIVITY.slice(0, 3).map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm shrink-0 border border-slate-100">{item.icon}</div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.text}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                   <MessageCircle className="w-4 h-4 text-amber-500" />
                   <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Support Tickets</h3>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-bold rounded uppercase tracking-tighter border border-amber-100">
                   3 Urgent
                </div>
             </div>
             <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                   <span>Unassigned Tickets</span>
                   <span className="text-slate-900">12</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                   <span>Wait Time (Avg)</span>
                   <span className="text-slate-900">14 min</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                   <span>CSAT Score</span>
                   <span className="text-emerald-600 font-bold">4.8/5.0</span>
                </div>
             </div>
             <button className="w-full mt-6 py-2 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-slate-100 hover:bg-white hover:border-indigo-600 hover:text-indigo-600 transition-all">
                Go to Helpdesk
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 <ShoppingBag className="w-4 h-4 text-indigo-500" />
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Top Selling Products</h3>
               </div>
               <button className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:underline uppercase tracking-widest">
                Full Report <ArrowUpRight className="w-3 h-3" />
               </button>
            </div>
            <div className="space-y-4">
               {TOP_PRODUCTS.map((prod) => (
                 <div key={prod.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200" />
                       <div>
                          <p className="text-xs font-bold text-slate-900">{prod.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{prod.sales} units sold</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-slate-900">${prod.revenue.toLocaleString()}</p>
                       <span className={cn(
                         "text-[10px] font-bold",
                         prod.growth > 0 ? "text-emerald-600" : "text-rose-600"
                       )}>
                        {prod.growth > 0 ? '+' : ''}{prod.growth}%
                       </span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Activity className="w-4 h-4 text-indigo-500" />
                   <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Things to do</h3>
                </div>
                <div className="w-5 h-5 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">5</div>
             </div>
             
             <div className="space-y-3">
                {[
                  { text: 'Verify 3 COD orders', type: 'urgent', count: 3, ai: true },
                  { text: 'Approve 2 refund requests', type: 'urgent', count: 2, ai: false },
                  { text: 'Replenish "Midnight Serum"', type: 'warning', count: 12, ai: true },
                  { text: 'Unreplied store reviews', type: 'info', count: 8, ai: false },
                  { text: 'Fix 3 slow storefront pages', type: 'info', count: 3, ai: true },
                ].map((todo, i) => (
                  <button 
                    key={i}
                    onClick={() => handleTaskClick(todo.text)}
                    className={cn(
                      "w-full flex flex-col p-3.5 rounded-xl border transition-all text-left group relative backdrop-blur-sm",
                      todo.type === 'urgent' ? "bg-rose-50/40 border-rose-100 hover:border-rose-300 shadow-sm" :
                      todo.type === 'warning' ? "bg-amber-50/40 border-amber-100 hover:border-amber-300 shadow-sm" :
                      "bg-slate-50/40 border-slate-100 hover:border-indigo-200"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          todo.type === 'urgent' ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" :
                          todo.type === 'warning' ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" : "bg-indigo-500"
                        )} />
                        <span className="text-[12px] font-bold text-slate-700 tracking-tight">{todo.text}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    {todo.ai && (
                      <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 bg-indigo-600/5 border border-indigo-200/50 rounded-md w-fit">
                        <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
                        <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">OmniAI Flagged</span>
                      </div>
                    )}
                  </button>
                ))}
             </div>
          </div>
      </div>
    </div>
  );
}

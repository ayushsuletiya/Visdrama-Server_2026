import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Download, 
  Truck, 
  CheckCircle2, 
  XCircle,
  MoreHorizontal,
  Clock,
  ArrowRight,
  Printer,
  ChevronDown,
  FileSpreadsheet,
  Settings2,
  FileText
} from 'lucide-react';
import { MOCK_ORDERS } from '../mockData';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';

const TABS = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;

const EXPORT_PRESETS = [
  { id: 'shiprocket', name: 'Shiprocket', icon: '🚀', description: 'Bulk shipment upload format' },
  { id: 'delhivery', name: 'Delhivery', icon: '📦', description: 'Standard manifest CSV' },
  { id: 'tally', name: 'Tally Prime', icon: '📊', description: 'Accounting & GST export' },
  { id: 'custom', name: 'Custom CSV', icon: '📝', description: 'Build your own column map' },
];

const EXPORT_COLUMNS = [
  'Order ID', 'Date', 'Customer Name', 'Phone', 'Address', 'Pincode', 'SKU', 'Quantity', 'Weight', 'Price', 'Payment Mode', 'Notes'
];

export function LogisticsHub() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('All');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('shiprocket');
  const [selectedColumns, setSelectedColumns] = useState<string[]>(EXPORT_COLUMNS.slice(0, 7));
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(o => {
    const matchesTab = activeTab === 'All' || o.status === activeTab;
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         o.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsExportModalOpen(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const updateOrderStatus = (ids: string[], newStatus: 'Shipped' | 'Cancelled') => {
    setOrders(prev => prev.map(o => ids.includes(o.id) ? { ...o, status: newStatus } : o));
    setSelectedOrders([]);
  };

  const toggleSelectOrder = (id: string) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id));
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-10 space-y-8 sm:space-y-10 max-w-[1600px] mx-auto no-scrollbar">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Logistics Hub</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">High-volume fulfillment with real-time sync.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
            <Printer className="w-4 h-4 text-slate-400" />
            Print Pick Lists
          </button>
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            <Download className="w-4 h-4" />
            Export to Courier
          </button>
        </div>
      </header>

      <Dialog.Root open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden border border-slate-200 focus:outline-none">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
                   <FileSpreadsheet className="w-5 h-5 text-white" />
                 </div>
                 <div className="min-w-0">
                    <Dialog.Title className="text-lg font-bold text-slate-900 leading-none truncate">Export to Courier</Dialog.Title>
                    <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider truncate">Format orders for bulk shipping</p>
                 </div>
              </div>
              <Dialog.Close asChild>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <XCircle className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            <div className="flex flex-col md:flex-row h-full max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="w-full md:w-1/2 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-100 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">Select Preset</label>
                  <div className="space-y-2">
                    {EXPORT_PRESETS.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPreset(preset.id)}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group",
                          selectedPreset === preset.id ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200 bg-white"
                        )}
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">{preset.icon}</span>
                        <div className="min-w-0">
                          <p className={cn("text-sm font-bold truncate", selectedPreset === preset.id ? "text-indigo-900" : "text-slate-900")}>{preset.name}</p>
                          <p className="text-[10px] font-medium text-slate-500 mt-0.5 line-clamp-1">{preset.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                   <div className="flex gap-2">
                      <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase">
                        {selectedOrders.length > 0 
                          ? `Exporting ${selectedOrders.length} selected orders` 
                          : `Exporting ${filteredOrders.length} filtered orders`}
                      </p>
                   </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col">
                 <div className="flex items-center justify-between mb-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Map Columns</label>
                   <button className="text-[9px] font-black text-indigo-600 uppercase tracking-tighter hover:underline">Select All</button>
                 </div>
                 
                 <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 overflow-y-auto max-h-[300px] pr-2 no-scrollbar">
                    {EXPORT_COLUMNS.map(column => (
                      <div 
                        key={column}
                        onClick={() => {
                          setSelectedColumns(prev => 
                            prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
                          )
                        }}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all",
                          selectedColumns.includes(column) ? "bg-slate-900 border-slate-900" : "bg-white border-slate-100 hover:border-slate-200"
                        )}
                      >
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-tight truncate",
                          selectedColumns.includes(column) ? "text-white" : "text-slate-600"
                        )}>{column}</span>
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ml-2",
                          selectedColumns.includes(column) ? "bg-indigo-500 border-indigo-500" : "border-slate-300"
                        )}>
                          {selectedColumns.includes(column) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </div>
                    ))}
                 </div>

                 <div className="pt-8 mt-8 border-t border-slate-100">
                    <button 
                      onClick={handleExport}
                      disabled={isExporting}
                      className="w-full flex items-center justify-center gap-2 p-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                    >
                      {isExporting ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Download className="w-4 h-4" />}
                      {isExporting ? 'Preparing...' : 'Manifest'}
                    </button>
                    <p className="text-[9px] text-center text-slate-400 mt-4 font-black uppercase tracking-[0.2em]">{selectedPreset.toUpperCase()} VALIDATED</p>
                 </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Status Bar */}
      <div className="flex items-center justify-between bg-white p-1 rounded-xl border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-bold transition-all relative whitespace-nowrap",
                activeTab === tab 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-100" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {tab}
              <span className={cn(
                "ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-mono",
                activeTab === tab ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              )}>
                {tab === 'All' ? orders.length : orders.filter(o => o.status === tab).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
            
            {selectedOrders.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1 sm:gap-2 p-1 bg-indigo-50 rounded-lg border border-indigo-100 w-full sm:w-auto overflow-x-auto no-scrollbar"
              >
                <span className="text-[10px] font-bold text-indigo-700 px-3 whitespace-nowrap">{selectedOrders.length} Sel.</span>
                <div className="h-6 w-px bg-indigo-200 mx-1 shrink-0" />
                <button 
                  onClick={() => updateOrderStatus(selectedOrders, 'Shipped')}
                  className="flex items-center gap-1.5 px-3 py-1 bg-white text-indigo-600 rounded-md text-[10px] font-bold shadow-sm hover:bg-indigo-50 transition-all whitespace-nowrap"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  Mark Shipped
                </button>
                <button 
                  onClick={() => updateOrderStatus(selectedOrders, 'Cancelled')}
                  className="flex items-center gap-1.5 px-3 py-1 bg-white text-rose-600 rounded-md text-[10px] font-bold shadow-sm hover:bg-rose-50 transition-all whitespace-nowrap"
                >
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  Cancel
                </button>
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
             <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all group whitespace-nowrap">
               <Truck className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
               Group
             </button>
             <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all group whitespace-nowrap">
               <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
               Export
             </button>
             <button className="p-2 text-slate-500 hover:bg-white rounded-lg transition-colors border border-slate-200 shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-500 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Channel</th>
                <th className="px-6 py-4">Fulfillment Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className={cn(
                  "hover:bg-slate-50/80 transition-colors group cursor-default",
                  selectedOrders.includes(order.id) ? "bg-indigo-50/10" : ""
                )}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleSelectOrder(order.id)}
                      className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900">{order.orderNumber}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{order.date.split('T')[1].slice(0, 5)} • {order.items} items</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                        {order.customerName[0]}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 leading-none">{order.customerName}</span>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Platinum Member</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className={cn(
                        "text-[9px] font-bold px-2 py-1 rounded inline-flex items-center gap-1.5 shadow-sm border",
                        order.channel === 'Shopify' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : order.channel === 'Instagram' ? "bg-pink-50 text-pink-600 border-pink-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                     )}>
                        {order.channel}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className={cn(
                        "text-[10px] uppercase font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer",
                        order.status === 'Processing' ? "bg-amber-50 text-amber-600 border border-amber-100" : 
                        order.status === 'Shipped' ? "bg-blue-50 text-blue-600 border border-blue-100" :
                        order.status === 'Delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                        "bg-rose-50 text-rose-600 border border-rose-100"
                      )}>
                        {order.status === 'Processing' && <Clock className="w-3 h-3" />}
                        {order.status === 'Shipped' && <Truck className="w-3 h-3" />}
                        {order.status === 'Delivered' && <CheckCircle2 className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-indigo-600 transition-all hover:bg-slate-100 rounded-lg">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className={cn(
                "p-4 space-y-4 hover:bg-slate-50 transition-all",
                selectedOrders.includes(order.id) && "bg-indigo-50/10"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleSelectOrder(order.id)}
                    className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{order.orderNumber}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{order.date.split('T')[1].slice(0, 5)} • {order.items} items</p>
                  </div>
                </div>
                <button className="p-2 text-slate-300">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between py-2 border-y border-slate-50">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                      {order.customerName[0]}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{order.customerName}</span>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">${order.amount.toFixed(2)}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">{order.channel}</p>
                 </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-[10px] uppercase font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5",
                  order.status === 'Processing' ? "bg-amber-50 text-amber-600 border border-amber-100" : 
                  order.status === 'Shipped' ? "bg-blue-50 text-blue-600 border border-blue-100" :
                  order.status === 'Delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  "bg-rose-50 text-rose-600 border border-rose-100"
                )}>
                  {order.status}
                </span>
                <button className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                  View <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
              className="relative bg-white rounded-[40px] p-8 sm:p-10 max-w-sm w-full shadow-2xl text-center space-y-6"
             >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100/50">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Export Successful</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Logistics manifest exported in <span className="font-bold text-slate-900">{selectedPreset}</span> format. {selectedOrders.length || filteredOrders.length} orders processed.
                  </p>
                </div>
                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-[0.98]"
                >
                  Got it
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Layers, 
  Settings, 
  ChevronDown,
  Plus,
  PlusCircle,
  Layout,
  Bot
} from 'lucide-react';
import { useBrand } from '../BrandContext';
import { cn } from '../lib/utils';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Layers, label: 'Categories', path: '/categories' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: Layout, label: 'Page Builder', path: '/builder' },
  { icon: MessageSquare, label: 'Inbox', path: '/inbox' },
  { icon: Bot, label: 'AI Builder', path: '/agent-builder' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const { currentBrand, setCurrentBrand, brands } = useBrand();

  return (
    <div className="w-full lg:w-64 bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-slate-800 shrink-0">
      <div className="p-4">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="w-full flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-all border border-slate-700/50 group">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-lg shrink-0"
                style={{ backgroundColor: currentBrand.color }}
              >
                {currentBrand.logo}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-semibold text-white truncate">{currentBrand.name}</p>
                <p className="text-xs text-slate-400">Merchant OS</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="bg-slate-800 p-2 rounded-xl shadow-2xl border border-slate-700 min-w-[224px] z-[100] animate-in fade-in zoom-in duration-200">
              {brands.map((brand) => (
                <DropdownMenu.Item 
                  key={brand.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 cursor-pointer outline-none transition-colors"
                  onClick={() => {
                    setCurrentBrand(brand);
                    if (onClose) onClose();
                  }}
                >
                   <div 
                    className="w-8 h-8 rounded-md flex items-center justify-center text-sm"
                    style={{ backgroundColor: brand.color }}
                  >
                    {brand.logo}
                  </div>
                  <span className="text-sm text-slate-200">{brand.name}</span>
                </DropdownMenu.Item>
              ))}
              <DropdownMenu.Separator className="h-px bg-slate-700 my-2" />
              <DropdownMenu.Item className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 cursor-pointer outline-none transition-colors">
                <div className="w-8 h-8 rounded-md bg-slate-600 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-slate-300" />
                </div>
                <span className="text-sm text-slate-400 font-medium">Add New Brand</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            onClick={() => {
              if (onClose) onClose();
            }}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
              isActive 
                ? "bg-slate-800 text-white shadow-sm ring-1 ring-white/10" 
                : "hover:bg-slate-800/50 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              "group-hover:text-white text-slate-500"
            )} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 mt-auto">
        <button className="flex items-center gap-2 w-full p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg ring-1 ring-indigo-400/20">
          <PlusCircle className="w-5 h-5" />
          Quick Action
        </button>
      </div>
    </div>
  );
}

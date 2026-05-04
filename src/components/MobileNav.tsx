import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Settings 
} from 'lucide-react';
import { cn } from '../lib/utils';

const mobileNavItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: MessageSquare, label: 'Inbox', path: '/inbox' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 px-6 flex items-center justify-between z-50">
      {mobileNavItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center gap-1 transition-all duration-300 relative",
            isActive ? "text-indigo-600 scale-110" : "text-slate-400"
          )}
        >
          {({ isActive }) => (
            <>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
              <div className={cn(
                "absolute -bottom-1.5 w-1 h-1 bg-indigo-600 rounded-full transition-all duration-300",
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
              )} />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

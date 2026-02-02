
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ShoppingCart, Users, CreditCard, Settings, Menu, X, Plus, 
  ChevronDown, Box, Truck, Magnet, Monitor, CheckCircle, Moon, Sun, Search, Wallet, Briefcase, Star, Key, Satellite, ShieldCheck, RefreshCcw, Barcode, PieChart, UserCog, UserCheck, Banknote, History, Ruler, Award, MessageSquare, ListOrdered, MapPin, LucideIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewType } from '../types';

const MotionDiv = motion.div as any;

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const LayoutWrapper: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isBW, setIsBW] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({ 
    products: true, 
    stockOps: false,
    customers: true,
    hr: false,
    admin: false,
    pos: true,
    procurement: false
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('erp-theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    setIsBW(localStorage.getItem('erp-bw') === 'true');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('erp-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('erp-theme', 'light');
    }
  };

  const toggleBW = () => {
    const newBW = !isBW;
    setIsBW(newBW);
    localStorage.setItem('erp-bw', String(newBW));
  };

  const toggleMenu = (key: string) => {
    setExpandedMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isCustomerView = [
    'customers-list', 'customer-orders', 'customer-requests', 
    'special-requests', 'update-order-status', 'payment-tracking'
  ].includes(activeView);

  const navigate = (view: ViewType) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans bg-slate-50 dark:bg-zinc-950 transition-all duration-300 ${isBW ? 'bw-mode' : ''}`}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 no-print">
        <div className="p-8 flex items-center gap-3">
          <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Satellite size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter uppercase">Sebrisat</h1>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">Enterprise ERP</p>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-2 space-y-1.5 overflow-y-auto scrollbar-hide pb-10">
          <NavItem icon={LayoutDashboard} label="Dashboard" active={activeView === 'dashboard'} onClick={() => navigate('dashboard')} />
          <NavItem icon={PieChart} label="Weekly Report" active={activeView === 'weekly-report'} onClick={() => navigate('weekly-report')} />
          
          <div className="pt-4 pb-2 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operations</div>
          
          <CollapsibleMenu label="Sales & POS" icon={ShoppingCart} isOpen={expandedMenus.pos} onToggle={() => toggleMenu('pos')} isActive={activeView === 'pos-sale' || activeView === 'sold-items'}>
            <SubNavItem icon={Monitor} label="POS Sale" active={activeView === 'pos-sale'} onClick={() => navigate('pos-sale')} />
            <SubNavItem icon={CheckCircle} label="Sold Items" active={activeView === 'sold-items'} onClick={() => navigate('sold-items')} />
          </CollapsibleMenu>

          <CollapsibleMenu label="Hardware Stock" icon={Box} isOpen={expandedMenus.products} onToggle={() => toggleMenu('products')} isActive={['all-products', 'categories', 'brands', 'units'].includes(activeView)}>
            <SubNavItem icon={Box} label="Active Inventory" active={activeView === 'all-products'} onClick={() => navigate('all-products')} />
            <SubNavItem icon={Satellite} label="Categories" active={activeView === 'categories'} onClick={() => navigate('categories')} />
            <SubNavItem icon={Award} label="Brands" active={activeView === 'brands'} onClick={() => navigate('brands')} />
            <SubNavItem icon={Ruler} label="Units" active={activeView === 'units'} onClick={() => navigate('units')} />
          </CollapsibleMenu>

          <CollapsibleMenu label="Stock Ops" icon={Barcode} isOpen={expandedMenus.stockOps} onToggle={() => toggleMenu('stockOps')} isActive={activeView === 'stock-adjustment' || activeView === 'digital-keys'}>
            <SubNavItem icon={RefreshCcw} label="Manual Adjustment" active={activeView === 'stock-adjustment'} onClick={() => navigate('stock-adjustment')} />
            <SubNavItem icon={Key} label="IP Server Vault" active={activeView === 'digital-keys'} onClick={() => navigate('digital-keys')} />
          </CollapsibleMenu>

          <div className="pt-4 pb-2 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Core Modules</div>

          <CollapsibleMenu label="Customers" icon={Users} isOpen={expandedMenus.customers} onToggle={() => toggleMenu('customers')} isActive={isCustomerView}>
            <SubNavItem icon={Users} label="All Customers" active={activeView === 'customers-list'} onClick={() => navigate('customers-list')} />
            <SubNavItem icon={ListOrdered} label="All Orders" active={activeView === 'customer-orders'} onClick={() => navigate('customer-orders')} />
            <SubNavItem icon={MessageSquare} label="Requests" active={activeView === 'customer-requests'} onClick={() => navigate('customer-requests')} />
            <SubNavItem icon={Star} label="Special Requests" active={activeView === 'special-requests'} onClick={() => navigate('special-requests')} />
            <SubNavItem icon={RefreshCcw} label="Update Order Status" active={activeView === 'update-order-status'} onClick={() => navigate('update-order-status')} />
            <SubNavItem icon={Wallet} label="Payment Tracking" active={activeView === 'payment-tracking'} onClick={() => navigate('payment-tracking')} />
            <SubNavItem icon={CreditCard} label="Installments" active={activeView === 'credits'} onClick={() => navigate('credits')} />
          </CollapsibleMenu>

          <CollapsibleMenu label="Procurement" icon={Truck} isOpen={expandedMenus.procurement} onToggle={() => toggleMenu('procurement')} isActive={activeView.includes('supplier')}>
            <SubNavItem icon={Briefcase} label="Suppliers" active={activeView === 'suppliers'} onClick={() => navigate('suppliers')} />
            <SubNavItem icon={ShoppingCart} label="Purchase Orders" active={activeView === 'supplier-orders'} onClick={() => navigate('supplier-orders')} />
          </CollapsibleMenu>

          <CollapsibleMenu label="Human Resources" icon={Briefcase} isOpen={expandedMenus.hr} onToggle={() => toggleMenu('hr')} isActive={activeView.includes('hr-') || activeView === 'employees' || activeView === 'attendance'}>
            <SubNavItem icon={LayoutDashboard} label="HR Overview" active={activeView === 'hr-dashboard'} onClick={() => navigate('hr-dashboard')} />
            <SubNavItem icon={Users} label="Employee List" active={activeView === 'employees'} onClick={() => navigate('employees')} />
            <SubNavItem icon={UserCheck} label="Attendance" active={activeView === 'attendance'} onClick={() => navigate('attendance')} />
            <SubNavItem icon={Banknote} label="Payroll" active={activeView === 'hr-payments'} onClick={() => navigate('hr-payments')} />
          </CollapsibleMenu>

          <CollapsibleMenu label="Administration" icon={UserCog} isOpen={expandedMenus.admin} onToggle={() => toggleMenu('admin')} isActive={activeView === 'accounts' || activeView === 'settings'}>
            <SubNavItem icon={UserCog} label="User Accounts" active={activeView === 'accounts'} onClick={() => navigate('accounts')} />
            <SubNavItem icon={Settings} label="Global Settings" active={activeView === 'settings'} onClick={() => navigate('settings')} />
            <SubNavItem icon={History} label="System Logs" active={activeView === 'product-log'} onClick={() => navigate('product-log')} />
          </CollapsibleMenu>
        </nav>

        <div className="p-6 space-y-3 bg-slate-50 dark:bg-zinc-800/30">
          <button onClick={toggleBW} className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-2xl transition-all hover:scale-[1.02] border border-slate-200 dark:border-zinc-700">
            <span className="text-[10px] font-black uppercase tracking-widest">{isBW ? 'Normal' : 'High Contrast'}</span>
            <div className={`w-8 h-4 rounded-full relative ${isBW ? 'bg-indigo-500' : 'bg-slate-300'}`}>
              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isBW ? 'right-0.5' : 'left-0.5'}`} />
            </div>
          </button>
          <button onClick={toggleTheme} className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-2xl transition-all hover:scale-[1.02] border border-slate-200 dark:border-zinc-700">
            <span className="text-[10px] font-black uppercase tracking-widest">{isDark ? 'Light' : 'Dark'}</span>
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between z-20 md:sticky md:top-0 no-print">
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><Satellite size={20} /></div>
            <span className="font-black text-slate-900 dark:text-white tracking-tighter uppercase">Sebrisat</span>
          </div>
          
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
             <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input type="text" placeholder="Global search items, customers, drivers..." className="w-full pl-12 pr-4 py-2.5 bg-slate-100 dark:bg-zinc-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
             </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all">
              <Menu size={26} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 pb-24 md:pb-10 scroll-smooth">
          <AnimatePresence mode="wait">
            <MotionDiv key={activeView} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }} className="max-w-[1600px] mx-auto">
              {children}
            </MotionDiv>
          </AnimatePresence>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 px-6 pt-3 pb-6 flex justify-between items-center z-30 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] safe-area-bottom no-print">
           <MobileNavItem icon={LayoutDashboard} label="Home" active={activeView === 'dashboard'} onClick={() => navigate('dashboard')} />
           <MobileNavItem icon={Box} label="Stock" active={activeView === 'all-products'} onClick={() => navigate('all-products')} />
           <button onClick={() => navigate('pos-sale')} className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center -mt-12 shadow-2xl shadow-indigo-400 border-4 border-white dark:border-zinc-900 transition-transform active:scale-90"><Plus size={28} strokeWidth={3} /></button>
           <MobileNavItem icon={PieChart} label="Report" active={activeView === 'weekly-report'} onClick={() => navigate('weekly-report')} />
           <MobileNavItem icon={Briefcase} label="Admin" active={activeView === 'hr-dashboard'} onClick={() => navigate('hr-dashboard')} />
        </nav>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" />
            <MotionDiv initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-zinc-900 z-50 p-8 shadow-2xl overflow-y-auto">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><Satellite size={20} /></div>
                  <h2 className="text-xl font-black tracking-tighter uppercase">Menu</h2>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-all"><X size={24} /></button>
              </div>
              <div className="space-y-4">
                <NavItem icon={LayoutDashboard} label="Business Overview" active={activeView === 'dashboard'} onClick={() => navigate('dashboard')} />
                <NavItem icon={PieChart} label="Weekly Insights" active={activeView === 'weekly-report'} onClick={() => navigate('weekly-report')} />
                <NavItem icon={Box} label="Stock Inventory" active={activeView === 'all-products'} onClick={() => navigate('all-products')} />
                <NavItem icon={Users} label="Customers" active={isCustomerView} onClick={() => navigate('customers-list')} />
                <NavItem icon={Truck} label="Supplier Orders" active={activeView === 'supplier-orders'} onClick={() => navigate('supplier-orders')} />
                <NavItem icon={Briefcase} label="HR Portal" active={activeView === 'hr-dashboard'} onClick={() => navigate('hr-dashboard')} />
                <NavItem icon={UserCog} label="Administration" active={activeView === 'accounts'} onClick={() => navigate('accounts')} />
              </div>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active, onClick }: { icon: LucideIcon, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all group ${active ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}>
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    <span className="font-bold text-sm">{label}</span>
  </button>
);

const SubNavItem = ({ icon: Icon, label, active, onClick }: { icon: LucideIcon, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${active ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/5' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-200'}`}>
    <Icon size={16} />
    <span className="font-bold text-[13px]">{label}</span>
  </button>
);

const CollapsibleMenu = ({ label, icon: Icon, isOpen, onToggle, children, isActive }: any) => (
  <div className="space-y-1">
    <button onClick={onToggle} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${isOpen || isActive ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/20' : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}>
      <div className="flex items-center gap-3.5">
        <Icon size={20} strokeWidth={2.5} />
        <span className="font-bold text-sm">{label}</span>
      </div>
      <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <MotionDiv initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="ml-6 space-y-1 overflow-hidden">
          {children}
        </MotionDiv>
      )}
    </AnimatePresence>
  </div>
);

const MobileNavItem = ({ icon: Icon, label, active, onClick }: { icon: LucideIcon, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 min-w-[50px] transition-all active:scale-95">
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' : 'text-slate-400 dark:text-zinc-600'}`}>
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-zinc-600'}`}>{label}</span>
  </button>
);

export default LayoutWrapper;

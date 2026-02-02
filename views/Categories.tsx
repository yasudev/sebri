
import React from 'react';
import { Plus, Pencil, Trash2, LayoutGrid, Search, Satellite, Tv, Camera, Wifi, Key, HardDrive } from 'lucide-react';

interface CategoriesProps {
  onAdd?: () => void;
}

const Categories: React.FC<CategoriesProps> = ({ onAdd }) => {
  const categories = [
    { name: 'Satellite Gear', items: 142, status: 'Active', icon: Satellite },
    { name: 'Televisions', items: 15, status: 'Active', icon: Tv },
    { name: 'Security Systems', items: 42, status: 'Active', icon: Camera },
    { name: 'Connectivity', items: 28, status: 'Active', icon: Wifi },
    { name: 'Subscriptions', items: 120, status: 'Active', icon: Key },
    { name: 'Computing & Media', items: 56, status: 'Active', icon: HardDrive },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Shop Categories</h2>
          <p className="text-slate-500 font-medium">Manage departments and stock classification.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#10b981] text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:scale-105 transition-all"
        >
          <Plus size={20} strokeWidth={3} />
          <span>New Category</span>
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="grid gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-3xl border border-transparent hover:border-[#10b981]/20 hover:bg-white dark:hover:bg-zinc-800 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-zinc-700 rounded-2xl flex items-center justify-center text-[#10b981] shadow-sm">
                  <cat.icon size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-lg">{cat.name}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cat.items} Items Linked</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  cat.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                }`}>
                  {cat.status}
                </span>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-white dark:bg-zinc-700 text-indigo-500 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                    <Pencil size={18} />
                  </button>
                  <button className="p-2.5 bg-white dark:bg-zinc-700 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

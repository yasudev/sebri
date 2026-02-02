
import React from 'react';
import { Zap, TrendingUp, ShoppingCart, Award } from 'lucide-react';

const FastMovingItems: React.FC = () => {
  const items = [
    { name: 'iPhone 15 Pro Max', sales: 124, trend: '+12%', color: 'bg-indigo-600' },
    { name: 'Sony WH-1000XM5', sales: 86, trend: '+5%', color: 'bg-emerald-500' },
    { name: 'Samsung Galaxy S24', sales: 74, trend: '-2%', color: 'bg-blue-500' },
    { name: 'MacBook Air M3', sales: 42, trend: '+22%', color: 'bg-violet-600' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-amber-100 text-amber-600 rounded-[24px]">
          <Zap size={32} fill="currentColor" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Fast Moving Items</h2>
          <p className="text-slate-500 font-medium">Top selling electronics this month.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
           <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <Award className="text-amber-500" /> Performance Rankings
           </h3>
           <div className="space-y-8">
             {items.map((item, i) => (
               <div key={i} className="space-y-3">
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Rank #{i+1}</p>
                     <h4 className="font-black text-slate-900 text-lg">{item.name}</h4>
                   </div>
                   <div className="text-right">
                     <p className="font-black text-slate-900 text-2xl tracking-tighter">{item.sales}</p>
                     <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{item.trend} Growth</p>
                   </div>
                 </div>
                 <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100">
                   <div 
                    className={`h-full rounded-full transition-all duration-1000 ${item.color}`} 
                    style={{ width: `${(item.sales / 150) * 100}%` }} 
                   />
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <div className="flex-1 bg-slate-900 p-8 rounded-[40px] text-white flex flex-col justify-between">
              <div>
                <ShoppingCart size={40} className="text-blue-400 mb-4" />
                <h4 className="text-2xl font-black mb-2">Inventory Velocity</h4>
                <p className="text-slate-400 font-medium">Your current stock turnover is 4.2x faster than last quarter.</p>
              </div>
              <div className="mt-8">
                 <div className="text-5xl font-black text-blue-400 tracking-tighter">82%</div>
                 <p className="text-xs font-black uppercase tracking-[0.2em] mt-2 opacity-50">Sell-through Rate</p>
              </div>
           </div>
           
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp size={28} />
                 </div>
                 <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Recommended Stock</p>
                    <h5 className="font-black text-slate-900 text-lg">Auto-replenish Active</h5>
                 </div>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FastMovingItems;

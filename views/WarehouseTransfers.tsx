
import React from 'react';
import { Send, MapPin, ArrowRight, Package, Calendar } from 'lucide-react';

interface WarehouseTransfersProps {
  onAdd?: () => void;
}

const WarehouseTransfers: React.FC<WarehouseTransfersProps> = ({ onAdd }) => {
  const transfers = [
    { from: 'Central Warehouse', to: 'Showroom Store', item: 'iPhone 15 Pro', qty: 10, status: 'In Transit', date: 'Oct 12' },
    { from: 'Showroom Store', to: 'Kality Depot', item: 'Sony WH-1000XM5', qty: 5, status: 'Completed', date: 'Oct 10' },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Internal Transfers</h2>
          <p className="text-slate-500 font-medium">Relocate stock between warehouse locations.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-[24px] font-black shadow-xl shadow-blue-100 hover:scale-105 transition-all"
        >
          <Send size={22} className="-rotate-45" />
          <span>Initiate Transfer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {transfers.map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 group">
            <div className="flex flex-1 items-center gap-8">
               <div className="flex-1 space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source Warehouse</p>
                  <div className="flex items-center gap-2 text-slate-900 font-black">
                     <MapPin size={18} className="text-blue-500" />
                     {t.from}
                  </div>
               </div>
               <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <ArrowRight size={20} />
               </div>
               <div className="flex-1 space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
                  <div className="flex items-center gap-2 text-slate-900 font-black">
                     <MapPin size={18} className="text-[#10b981]" />
                     {t.to}
                  </div>
               </div>
            </div>

            <div className="flex flex-1 items-center justify-between md:border-l border-slate-50 md:pl-8">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                     <Package size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{t.item}</h4>
                    <p className="text-xs font-bold text-slate-400">Qty: {t.qty} units</p>
                  </div>
               </div>
               <div className="text-right">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    t.status === 'In Transit' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {t.status}
                  </span>
                  <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{t.date}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehouseTransfers;

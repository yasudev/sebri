
import React from 'react';
import { History, ArrowUpRight, ArrowDownLeft, RefreshCcw, User } from 'lucide-react';

const ProductLog: React.FC = () => {
  const logs = [
    { type: 'Stock In', item: 'iPhone 15 Pro', qty: '+50', user: 'Admin', time: '2h ago', color: 'text-emerald-500' },
    { type: 'Sale', item: 'MacBook Air M3', qty: '-1', user: 'Cashier_01', time: '4h ago', color: 'text-rose-500' },
    { type: 'Adjustment', item: 'Sony WH-1000XM5', qty: '-2', user: 'Supervisor', time: '1d ago', color: 'text-amber-500' },
    { type: 'Transfer', item: 'Galaxy S24 Ultra', qty: '10', user: 'Logistics', time: '2d ago', color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-white rounded-[24px] shadow-sm text-blue-600">
          <History size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Product Activity Log</h2>
          <p className="text-slate-500 font-medium">Audit trail of all inventory movements.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="space-y-4">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[32px] border border-transparent hover:border-slate-100 hover:bg-white transition-all">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm ${log.color}`}>
                  {log.type === 'Stock In' && <ArrowUpRight size={24} />}
                  {log.type === 'Sale' && <ArrowDownLeft size={24} />}
                  {log.type === 'Adjustment' && <RefreshCcw size={24} />}
                  {log.type === 'Transfer' && <ArrowUpRight size={24} className="rotate-45" />}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg">{log.item}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{log.type} • {log.time}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-10">
                <div className="hidden md:flex items-center gap-2 text-slate-400">
                  <User size={16} />
                  <span className="text-xs font-bold uppercase">{log.user}</span>
                </div>
                <div className={`text-2xl font-black tracking-tighter w-24 ${log.color}`}>
                  {log.qty}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
          Load Historical Archives
        </button>
      </div>
    </div>
  );
};

export default ProductLog;

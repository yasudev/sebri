
import React from 'react';
import { Calendar, AlertCircle, Clock, Archive } from 'lucide-react';

const AgingReport: React.FC = () => {
  const data = [
    { period: '0 - 30 Days', value: 850000, color: 'bg-emerald-500', count: 124 },
    { period: '31 - 60 Days', value: 320000, color: 'bg-blue-500', count: 45 },
    { period: '61 - 90 Days', value: 120000, color: 'bg-amber-500', count: 18 },
    { period: 'Over 90 Days', value: 45000, color: 'bg-rose-500', count: 7 },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-slate-900 text-white rounded-[24px]">
          <Clock size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Stock Aging Report</h2>
          <p className="text-slate-500 font-medium">Inventory value distribution by shelf life.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((d, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4 hover:shadow-lg transition-all">
            <div className={`w-3 h-3 rounded-full ${d.color}`} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.period}</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Br {d.value.toLocaleString()}</h3>
            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
               <span className="text-xs font-bold text-slate-500">{d.count} SKUs</span>
               <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">View List</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-10">
           <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
             <AlertCircle className="text-rose-500" /> Stale Stock Alert
           </h3>
           <button className="px-6 py-3 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-100 transition-all">
             Generate Clearance Plan
           </button>
        </div>

        <div className="space-y-6">
          {[
            { name: 'Samsung S22 Ultra (Legacy)', age: '142 Days', value: 'Br 45,000', location: 'Kality depot' },
            { name: 'HP Pavilion Laptop 2023', age: '105 Days', value: 'Br 32,000', location: 'Showroom' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-300">
                   <Archive size={28} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg">{item.name}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.location} • In stock for {item.age}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-rose-500">{item.value}</p>
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Apply Discount</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgingReport;

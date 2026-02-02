
import React from 'react';
import { Plus, Ruler, Settings2, Trash2 } from 'lucide-react';

interface UnitsProps {
  onAdd?: () => void;
}

const Units: React.FC<UnitsProps> = ({ onAdd }) => {
  const units = [
    { name: 'Piece', short: 'Pcs', allowDecimal: false },
    { name: 'Box', short: 'Box', allowDecimal: false },
    { name: 'Set', short: 'Set', allowDecimal: false },
    { name: 'Kilogram', short: 'Kg', allowDecimal: true },
    { name: 'Meter', short: 'M', allowDecimal: true },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Unit Configurations</h2>
          <p className="text-slate-500 font-medium">Define measurement units for your inventory.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#10b981] text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:scale-105 transition-all"
        >
          <Plus size={20} strokeWidth={3} />
          <span>Create Unit</span>
        </button>
      </div>

      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</th>
              <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Short Name</th>
              <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Allow Decimal</th>
              <th className="pb-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {units.map((u, i) => (
              <tr key={i} className="group hover:bg-slate-50 transition-colors">
                <td className="py-6 font-black text-slate-900 text-lg">{u.name}</td>
                <td className="py-6">
                  <span className="bg-slate-100 px-4 py-1.5 rounded-xl font-mono font-bold text-slate-600">{u.short}</span>
                </td>
                <td className="py-6">
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${u.allowDecimal ? 'bg-blue-500' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${u.allowDecimal ? 'right-1' : 'left-1'}`} />
                  </div>
                </td>
                <td className="py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Settings2 size={20} /></button>
                    <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={20} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Units;


import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  Pencil, 
  Trash2, 
  UserSquare2,
  ArrowUpDown
} from 'lucide-react';

interface DriversProps {
  onAdd?: () => void;
}

const Drivers: React.FC<DriversProps> = ({ onAdd }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const drivers = [
    { id: 1, name: 'Test2', vehicleType: 'test', plateNumber: '', cost: 0.03, createdAt: '2025-10-10 09:48', updatedAt: '2025-10-10 09:48' },
    { id: 2, name: 'George Meelalii', vehicleType: 'test', plateNumber: 'A73352', cost: 1000.00, createdAt: '2025-11-12 10:00', updatedAt: '2025-11-12 10:00' }
  ];

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredDrivers.length;
  const showingStart = totalEntries > 0 ? 1 : 0;
  const showingEnd = Math.min(entriesPerPage, totalEntries);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Drivers</h2>
          <p className="text-slate-500 font-medium">Manage fleet drivers, plate numbers, and individual trip costs.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-3 px-8 py-4 bg-rose-600 text-white rounded-[24px] font-black shadow-xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={24} />
          <span>Add Driver</span>
        </button>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-400">Show</span>
            <div className="relative">
              <select 
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="appearance-none bg-slate-50 border border-slate-200 pl-4 pr-10 py-2.5 rounded-xl font-black text-slate-700 outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
            <span className="text-sm font-bold text-slate-400">entries</span>
          </div>

          <div className="flex items-center gap-3 w-full md:max-w-md">
            <span className="text-sm font-bold text-slate-400 whitespace-nowrap">Search:</span>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-8">
          <table className="w-full min-w-[1100px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 first:rounded-tl-[32px]">Action</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">#</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    Name <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    Vehicle Type <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Plate Number</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Default Trip Cost</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Created At</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 last:rounded-tr-[32px]">Updated At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDrivers.slice(0, entriesPerPage).map((d) => (
                <tr key={d.id} className="group hover:bg-slate-50 transition-all duration-200">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm" title="Edit">
                        <Pencil size={16} strokeWidth={2.5} />
                      </button>
                      <button className="p-2.5 bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm" title="Delete">
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-6 font-black text-slate-400 text-sm">
                    {d.id}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center font-black text-xs uppercase">
                        {d.name.charAt(0)}
                      </div>
                      <span className="font-black text-slate-900 text-sm group-hover:text-rose-600 transition-colors">
                        {d.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-slate-100 rounded-lg font-bold text-xs text-slate-600 uppercase">
                      {d.vehicleType}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-mono font-black text-slate-900 text-sm">
                    {d.plateNumber || '---'}
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-0.5">
                      <p className="font-black text-slate-900 text-sm">ETB {d.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fixed Rate</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-slate-500 font-bold text-xs">
                    {d.createdAt}
                  </td>
                  <td className="px-8 py-6 text-slate-500 font-bold text-xs">
                    {d.updatedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {totalEntries === 0 && (
            <div className="py-24 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-slate-200">
                <UserSquare2 size={40} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-black text-slate-800">No Drivers Found</h3>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-2">Add a new driver to start managing deliveries</p>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-slate-50">
          <p className="text-sm font-bold text-slate-400">
            Showing <span className="text-slate-900">{showingStart}</span> to <span className="text-slate-900">{showingEnd}</span> of <span className="text-slate-900">{totalEntries}</span> entries
          </p>
          <div className="flex items-center gap-2">
             <button className="px-5 py-2.5 bg-slate-50 text-slate-400 font-black text-xs uppercase rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50">Previous</button>
             <button className="w-10 h-10 bg-rose-600 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-100 transition-all">1</button>
             <button className="px-5 py-2.5 bg-slate-50 text-slate-400 font-black text-xs uppercase rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drivers;

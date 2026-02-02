
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  Pencil, 
  Trash2, 
  PackageCheck,
  ArrowUpDown,
  Calendar,
  Clock
} from 'lucide-react';

interface DeliveriesProps {
  onAdd?: () => void;
}

const Deliveries: React.FC<DeliveriesProps> = ({ onAdd }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const deliveries = [
    { id: 2, date: '2025-11-21', time: '12:09', driver: 'George Meelalii', vehicleType: 'test', itemsSent: 'adhesive', tripCost: 1000.00, status: 'Pending', notes: 'reason' },
    { id: 1, date: '2025-10-10', time: '08:49', driver: 'Test2', vehicleType: 'test', itemsSent: 'adhesive', tripCost: 0.03, status: 'Delivered', notes: '2025-10-10' }
  ];

  const filteredDeliveries = deliveries.filter(d => 
    d.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.itemsSent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showingStart = filteredDeliveries.length > 0 ? 1 : 0;
  const showingEnd = Math.min(entriesPerPage, filteredDeliveries.length);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Deliveries</h2>
          <p className="text-slate-500 font-medium">Track and record fleet delivery operations and trip costs.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-3 px-8 py-4 bg-rose-600 text-white rounded-[24px] font-black shadow-xl shadow-rose-100 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={24} />
          <span>Record Delivery</span>
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
          <table className="w-full min-w-[1200px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 first:rounded-tl-[32px]">Action</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">#</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Date</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Time</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    Driver <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Vehicle Type</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Items Sent</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Trip Cost</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 last:rounded-tr-[32px]">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDeliveries.slice(0, entriesPerPage).map((d) => (
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
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-sm font-bold">{d.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-sm font-bold">{d.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center font-black text-[10px] uppercase">
                        {d.driver.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900 text-sm">{d.driver}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-slate-100 rounded-lg font-bold text-[10px] text-slate-500 uppercase tracking-widest">
                      {d.vehicleType}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-bold text-slate-600 capitalize">{d.itemsSent}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-0.5">
                      <p className="font-black text-slate-900 text-sm">ETB {d.tripCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Route Cost</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                      d.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-bold text-slate-500 max-w-[150px] truncate" title={d.notes}>
                      {d.notes}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDeliveries.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-slate-200">
                <PackageCheck size={40} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-black text-slate-800">No Deliveries Found</h3>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-2">Record a new delivery to populate the log</p>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-slate-50">
          <p className="text-sm font-bold text-slate-400">
            Showing <span className="text-slate-900">{showingStart}</span> to <span className="text-slate-900">{showingEnd}</span> of <span className="text-slate-900">{filteredDeliveries.length}</span> entries
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

export default Deliveries;

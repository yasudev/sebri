
import React, { useState, useMemo } from 'react';
import { 
  Star, 
  Search, 
  Pencil, 
  Trash2, 
  Filter,
  Calendar,
  User,
  Sparkles,
  ClipboardCheck
} from 'lucide-react';

interface SpecialRequestRecord {
  id: string;
  customerName: string;
  detail: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Declined';
  createdAt: string;
}

const SpecialRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [requests, setRequests] = useState<SpecialRequestRecord[]>([
    { id: 'SR-101', customerName: 'Amanuel Girma', detail: 'Bulk order discount for 50x units', status: 'Approved', createdAt: '2024-11-20' },
    { id: 'SR-102', customerName: 'Dawit Mekonnen', detail: 'Custom engraving for MacBook', status: 'Under Review', createdAt: '2024-11-22' },
    { id: 'SR-103', customerName: 'Sara Konjo', detail: 'Extended warranty request (3 years)', status: 'Draft', createdAt: '2024-11-22' },
  ]);

  const filteredRequests = useMemo(() => {
    return requests.filter(r => 
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.detail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [requests, searchTerm]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <Star className="text-amber-500" size={32} />
            Special Requests
          </h2>
          <p className="text-slate-500 font-medium mt-1">High-priority or unique requests requiring management review.</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search special requests..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-10">
          <table className="w-full min-w-[1200px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Action</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">#</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Customer</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Special Detail</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Status</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRequests.map((req, idx) => (
                <tr key={req.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm transition-all group-hover:scale-110">
                        <ClipboardCheck size={16} strokeWidth={2.5} />
                      </button>
                      <button className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 rounded-xl shadow-sm transition-all group-hover:scale-110">
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-mono text-sm font-black text-slate-300 group-hover:text-amber-400 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <User size={14} className="text-slate-300" />
                       <span className="font-black text-slate-900 text-sm">{req.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <Sparkles size={14} className="text-amber-500" />
                       <span className="text-xs font-bold text-slate-700 leading-relaxed max-w-[400px]">{req.detail}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      req.status === 'Declined' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <Calendar size={12} />
                       <span className="text-[10px] font-bold uppercase">{req.createdAt}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpecialRequests;

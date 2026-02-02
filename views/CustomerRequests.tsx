
import React, { useState, useMemo } from 'react';
import { 
  ClipboardList, 
  Search, 
  Pencil, 
  Trash2, 
  Filter,
  Calendar,
  User,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface RequestRecord {
  id: string;
  customerName: string;
  type: 'Inquiry' | 'Support' | 'Refund' | 'Repair';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Resolved' | 'Closed';
  date: string;
}

const CustomerRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [requests, setRequests] = useState<RequestRecord[]>([
    { id: 'REQ-001', customerName: 'Amanuel Girma', type: 'Repair', priority: 'High', status: 'Open', date: '2024-11-20' },
    { id: 'REQ-002', customerName: 'Bethelhem Tesfaye', type: 'Inquiry', priority: 'Low', status: 'Resolved', date: '2024-11-21' },
    { id: 'REQ-003', customerName: 'Dawit Mekonnen', type: 'Support', priority: 'Medium', status: 'Open', date: '2024-11-22' },
  ]);

  const filteredRequests = useMemo(() => {
    return requests.filter(r => 
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [requests, searchTerm]);

  const getPriorityStyle = (p: string) => {
    switch (p) {
      case 'High': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Low': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      default: return 'text-slate-400 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <ClipboardList className="text-blue-600" size={32} />
            Customer Requests
          </h2>
          <p className="text-slate-500 font-medium mt-1">Manage standard support tickets and service inquiries.</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search requests..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Request Type</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Priority</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Status</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRequests.map((req, idx) => (
                <tr key={req.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm transition-all group-hover:scale-110">
                        <Pencil size={16} strokeWidth={2.5} />
                      </button>
                      <button className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 rounded-xl shadow-sm transition-all group-hover:scale-110">
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-mono text-sm font-black text-slate-300 group-hover:text-blue-400 transition-colors">
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
                       <MessageSquare size={14} className="text-blue-400" />
                       <span className="text-xs font-bold text-slate-700">{req.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getPriorityStyle(req.priority)}`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${
                      req.status === 'Open' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <Calendar size={12} />
                       <span className="text-[10px] font-bold uppercase">{req.date}</span>
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

export default CustomerRequests;


import React, { useState, useMemo } from 'react';
import { 
  RefreshCw, 
  Search, 
  Pencil, 
  MapPin, 
  Filter,
  Calendar,
  Clock,
  Navigation,
  Box
} from 'lucide-react';

interface TrackingRecord {
  id: string;
  orderId: string;
  status: string;
  location: string;
  updatedAt: string;
}

const UpdateOrderStatus: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [trackingData, setTrackingData] = useState<TrackingRecord[]>([
    { id: 'TRK-001', orderId: 'ORD-5001', status: 'Delivered', location: 'Bole Road, Ward 03', updatedAt: '2024-11-20 04:30 PM' },
    { id: 'TRK-002', orderId: 'ORD-5002', status: 'In Transit', location: 'Mercato District', updatedAt: '2024-11-21 11:20 AM' },
    { id: 'TRK-003', orderId: 'ORD-5003', status: 'Packing', location: 'Central Warehouse', updatedAt: '2024-11-22 09:45 AM' },
  ]);

  const filteredTracking = useMemo(() => {
    return trackingData.filter(t => 
      t.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [trackingData, searchTerm]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <RefreshCw className="text-blue-600" size={32} />
            Update Status / Location
          </h2>
          <p className="text-slate-500 font-medium mt-1">Real-time logistic adjustments for active customer orders.</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Order ID or status..."
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
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Order ID</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Current Status</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Current Location</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTracking.map((trk, idx) => (
                <tr key={trk.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <button className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-blue-600 rounded-xl shadow-sm transition-all group-hover:scale-110">
                      <RefreshCw size={16} strokeWidth={2.5} />
                    </button>
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-mono text-sm font-black text-slate-300 group-hover:text-blue-400 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <Box size={14} className="text-slate-300" />
                       <span className="font-black text-blue-600 text-sm">{trk.orderId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${
                      trk.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      trk.status === 'In Transit' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>
                      {trk.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <MapPin size={14} className="text-rose-400" />
                       <span className="text-xs font-bold text-slate-700">{trk.location}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <Clock size={12} />
                       <span className="text-[10px] font-bold uppercase">{trk.updatedAt}</span>
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

export default UpdateOrderStatus;

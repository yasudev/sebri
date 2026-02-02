
import React, { useState, useMemo } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Eye, 
  Trash2, 
  Filter,
  Calendar,
  Clock,
  Package,
  ArrowRight
} from 'lucide-react';

interface OrderRecord {
  id: string;
  customerName: string;
  items: string;
  total: number;
  status: 'Completed' | 'Pending' | 'Canceled' | 'In Progress';
  date: string;
}

const CustomerOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [orders, setOrders] = useState<OrderRecord[]>([
    { id: 'ORD-5001', customerName: 'Amanuel Girma', items: 'iPhone 15 Pro Max', total: 85000, status: 'Completed', date: '2024-11-20' },
    { id: 'ORD-5002', customerName: 'Bethelhem Tesfaye', items: 'Sony XM5 Headphones', total: 25000, status: 'Completed', date: '2024-11-21' },
    { id: 'ORD-5003', customerName: 'Dawit Mekonnen', items: 'MacBook Air M3 15"', total: 145000, status: 'Pending', date: '2024-11-22' },
    { id: 'ORD-5004', customerName: 'Elias Habte', items: 'Samsung Galaxy Watch', total: 18000, status: 'In Progress', date: '2024-11-22' },
  ]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => 
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.items.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'In Progress': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Canceled': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <ShoppingCart className="text-blue-600" size={32} />
            All Orders
          </h2>
          <p className="text-slate-500 font-medium mt-1">Track and manage every customer transaction across the suite.</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..."
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
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Customer</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Items</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Total</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Status</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order, idx) => (
                <tr key={order.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm transition-all group-hover:scale-110">
                        <Eye size={16} strokeWidth={2.5} />
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
                    <span className="font-black text-blue-600 text-sm">{order.id}</span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-black text-slate-900 text-sm whitespace-nowrap">{order.customerName}</p>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <Package size={14} className="text-slate-300" />
                       <span className="text-xs font-bold text-slate-600 truncate max-w-[200px]">{order.items}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-black text-slate-900 text-sm">Br {order.total.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <Calendar size={12} />
                       <span className="text-[10px] font-bold uppercase font-mono">{order.date}</span>
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

export default CustomerOrders;

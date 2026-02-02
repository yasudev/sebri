
import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
  Package,
  Truck,
  FileText
} from 'lucide-react';

interface SupplierOrdersProps {
  onAdd?: () => void;
}

type OrderTab = 'all' | 'regular' | 'dropship';

const SupplierOrders: React.FC<SupplierOrdersProps> = ({ onAdd }) => {
  const [activeTab, setActiveTab] = useState<OrderTab>('all');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterSupplier, setFilterSupplier] = useState('All Suppliers');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const orders = useMemo(() => [
    { id: 'PO-2024-001', vendor: 'Global Electronics Co.', items: 124, amount: 45000, status: 'Received', date: '2024-10-15', type: 'regular' },
    { id: 'PO-2024-002', vendor: 'Smart Parts Ltd.', items: 50, amount: 8200, status: 'In Transit', date: '2024-10-28', type: 'dropship' },
    { id: 'PO-2024-003', vendor: 'EuroCircuit Distro', items: 12, amount: 15400, status: 'Pending Approval', date: '2024-11-02', type: 'regular' },
    { id: 'PO-2024-005', vendor: 'Smart Parts Ltd.', items: 15, amount: 4200, status: 'Awaiting Ship', date: '2024-11-06', type: 'dropship' },
    { id: 'PO-2024-006', vendor: 'Global Electronics Co.', items: 200, amount: 98000, status: 'In Transit', date: '2024-11-07', type: 'dropship' },
    { id: 'PO-2024-007', vendor: 'EuroCircuit Distro', items: 85, amount: 22400, status: 'Ordered', date: '2024-11-08', type: 'regular' },
    { id: 'PO-2024-008', vendor: 'Kality Logistics', items: 300, amount: 12500, status: 'Received', date: '2024-11-10', type: 'regular' },
  ], []);

  const suppliers = useMemo(() => Array.from(new Set(orders.map(o => o.vendor))), [orders]);
  const statuses = useMemo(() => Array.from(new Set(orders.map(o => o.status))), [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesTab = activeTab === 'all' || order.type === activeTab;
      const matchesStatus = filterStatus === 'All Status' || order.status === filterStatus;
      const matchesSupplier = filterSupplier === 'All Suppliers' || order.vendor === filterSupplier;
      const matchesDateFrom = !dateFrom || order.date >= dateFrom;
      const matchesDateTo = !dateTo || order.date <= dateTo;
      const matchesSearch = !searchTerm || 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesTab && matchesStatus && matchesSupplier && matchesDateFrom && matchesDateTo && matchesSearch;
    });
  }, [orders, activeTab, filterStatus, filterSupplier, dateFrom, dateTo, searchTerm]);

  const tabItems: { id: OrderTab; label: string; icon: any }[] = [
    { id: 'all', label: 'All Orders', icon: ShoppingBag },
    { id: 'regular', label: 'Regular Orders', icon: Package },
    { id: 'dropship', label: 'Dropship Orders', icon: Truck },
  ];

  const totalEntries = filteredOrders.length;
  const showingStart = totalEntries > 0 ? 1 : 0;
  const showingEnd = Math.min(entriesPerPage, totalEntries);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Procurement Hub</h2>
          <p className="text-slate-500 font-medium">Global and local supply chain operations dashboard.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-[24px] font-black shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={24} />
          <span>New Request</span>
        </button>
      </div>

      <div className="bg-white p-2 rounded-[32px] border border-slate-100 shadow-sm flex flex-wrap gap-2 w-fit">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm transition-all ${
              activeTab === tab.id 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Order Status</label>
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              <option>All Status</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Supplier / Vendor</label>
          <div className="relative">
            <select 
              value={filterSupplier}
              onChange={(e) => setFilterSupplier(e.target.value)}
              className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              <option>All Suppliers</option>
              {suppliers.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date From</label>
          <div className="relative">
            <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            <input 
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date To</label>
          <div className="relative">
            <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            <input 
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-400">Show</span>
            <div className="relative">
              <select 
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="appearance-none bg-slate-50 border border-slate-200 pl-4 pr-10 py-2.5 rounded-xl font-black text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
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
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-8">
          <table className="w-full min-w-[1000px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 first:rounded-tl-[32px]">Order ID</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Supplier</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Type</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Items</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Total</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Date</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 last:rounded-tr-[32px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.slice(0, entriesPerPage).map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50 transition-all duration-200">
                  <td className="px-8 py-6">
                    <span className="font-mono text-sm font-black text-indigo-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-50 text-indigo-400 rounded-lg flex items-center justify-center font-black text-[10px]">
                        {order.vendor.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900 text-sm whitespace-nowrap">{order.vendor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg tracking-tighter ${
                      order.type === 'dropship' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {order.type}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-bold text-slate-600 text-sm">
                    {order.items} Units
                  </td>
                  <td className="px-6 py-6 font-black text-slate-900 text-sm whitespace-nowrap">
                    Br {order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-6">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase whitespace-nowrap ${
                      order.status === 'Received' ? 'bg-emerald-100 text-emerald-700' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 
                      order.status === 'Draft' ? 'bg-slate-100 text-slate-400' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-bold text-slate-400 text-xs">
                    {order.date}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="View Detail">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
                        <Pencil size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalEntries === 0 && (
          <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[40px]">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-slate-200" />
            </div>
            <p className="font-black text-slate-400 uppercase text-xs tracking-[0.2em]">No records matching filters</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-slate-50">
          <p className="text-sm font-bold text-slate-400">
            Showing <span className="text-slate-900">{showingStart}</span> to <span className="text-slate-900">{showingEnd}</span> of <span className="text-slate-900">{totalEntries}</span> entries
          </p>
          <div className="flex items-center gap-2">
             <button className="px-5 py-2.5 bg-slate-50 text-slate-400 font-black text-xs uppercase rounded-xl hover:bg-slate-100 transition-all">Previous</button>
             <button className="w-10 h-10 bg-indigo-600 text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-100">1</button>
             <button className="px-5 py-2.5 bg-slate-50 text-slate-400 font-black text-xs uppercase rounded-xl hover:bg-slate-100 transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrders;

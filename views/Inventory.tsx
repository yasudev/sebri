
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  Pencil, 
  Trash2, 
  Eye, 
  Warehouse as WarehouseIcon,
  Calendar,
  RefreshCcw,
  Key,
  ShieldCheck
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_WAREHOUSES } from '../constants.tsx';

interface InventoryProps {
  onAddProduct?: () => void;
}

const Inventory: React.FC<InventoryProps> = ({ onAddProduct }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('all');

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWarehouse = selectedWarehouseId === 'all' || p.warehouseIds?.includes(selectedWarehouseId);
    return matchesSearch && matchesWarehouse;
  });

  const getWarehouseNames = (ids?: string[]) => {
    if (!ids) return 'None';
    return ids.map(id => MOCK_WAREHOUSES.find(w => w.id === id)?.name).filter(Boolean).join(', ');
  };

  const totalEntries = filteredProducts.length;
  const showingStart = totalEntries > 0 ? 1 : 0;
  const showingEnd = Math.min(entriesPerPage, totalEntries);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header & Main Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Inventory Hub</h2>
          <p className="text-slate-500 font-medium mt-1">Advanced control for electronics stock and serial tracking.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={onAddProduct}
            className="flex items-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all text-sm"
          >
            <Plus size={20} strokeWidth={3} />
            <span>New Item</span>
          </button>
        </div>
      </div>

      {/* Table Controls */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-400">Show</span>
            <div className="relative">
              <select 
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="appearance-none bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 pl-4 pr-10 py-2.5 rounded-xl font-black text-slate-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 md:max-w-2xl">
             <div className="relative flex-1 w-full flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by name, brand, or SKU..."
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
             </div>
             <div className="relative w-full sm:w-60">
                <WarehouseIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                <select 
                  className="w-full appearance-none bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 pl-12 pr-10 py-3.5 rounded-2xl font-black text-slate-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                  value={selectedWarehouseId}
                  onChange={(e) => setSelectedWarehouseId(e.target.value)}
                >
                  <option value="all">All Locations</option>
                  {MOCK_WAREHOUSES.map(wh => (
                    <option key={wh.id} value={wh.id}>{wh.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
             </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto -mx-8">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-zinc-800">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Hardware / Tech</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Level</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Warranty</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              {filteredProducts.slice(0, entriesPerPage).map((p, idx) => (
                <tr key={p.id} className="group hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all duration-200">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-zinc-800 overflow-hidden relative border border-slate-100 dark:border-zinc-700">
                        <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-zinc-200 text-sm">{p.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{p.brand} • {p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">{p.category}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${p.stock < 10 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <span className={`font-black text-sm ${p.stock < 10 ? 'text-rose-600' : 'text-slate-900 dark:text-zinc-300'}`}>{p.stock} {p.unit}</span>
                      </div>
                      <p className="text-[9px] font-black text-slate-400 uppercase truncate max-w-[150px]">{getWarehouseNames(p.warehouseIds)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                      <ShieldCheck size={14} className="text-indigo-500" />
                      <span className="text-xs font-bold">{p.category === 'Subscriptions' ? 'Digital' : '12 Months'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-black text-slate-900 dark:text-zinc-200 text-sm">Br {p.price.toLocaleString()}</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Sale Price</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm transition-all" title="Edit">
                        <Pencil size={16} />
                      </button>
                      <button className="p-2.5 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 text-slate-400 hover:text-rose-500 rounded-xl shadow-sm transition-all" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {totalEntries === 0 && (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-slate-200 dark:border-zinc-700">
                 <Search size={40} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-zinc-400">No results found</h3>
            </div>
          )}
        </div>

        {/* Footer info & Pagination UI */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-slate-50 dark:border-zinc-800">
          <p className="text-sm font-bold text-slate-400">
            Showing <span className="text-slate-900 dark:text-zinc-200">{showingStart}</span> to <span className="text-slate-900 dark:text-zinc-200">{showingEnd}</span> of <span className="text-slate-900 dark:text-zinc-200">{totalEntries}</span> items
          </p>
          <div className="flex items-center gap-2">
             <button className="px-5 py-2.5 bg-slate-50 dark:bg-zinc-800 text-slate-400 font-black text-xs uppercase rounded-xl hover:bg-slate-100 transition-all">Previous</button>
             <button className="w-10 h-10 bg-indigo-600 text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-100">1</button>
             <button className="px-5 py-2.5 bg-slate-50 dark:bg-zinc-800 text-slate-400 font-black text-xs uppercase rounded-xl hover:bg-slate-100 transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

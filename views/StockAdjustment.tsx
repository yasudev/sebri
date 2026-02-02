
import React, { useState } from 'react';
import { RefreshCcw, Search, Plus, Save, ArrowLeft, Box, Trash2, ChevronDown, Info } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

const StockAdjustment: React.FC = () => {
  const [formData, setFormData] = useState({
    productId: '',
    type: 'Stock In' as 'Stock In' | 'Stock Out' | 'Correction',
    quantity: '',
    reason: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentAdjustments] = useState([
    { id: 'ADJ-01', item: 'Tiger T8 Receiver', type: 'Stock In', qty: '+50', reason: 'Bulk Purchase', date: '2024-11-22' },
    { id: 'ADJ-02', item: 'Sony 55" TV', type: 'Correction', qty: '-1', reason: 'Display Damage', date: '2024-11-21' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Adjustment Recorded Successfully');
      setFormData({ productId: '', type: 'Stock In', quantity: '', reason: '', notes: '' });
    }, 1000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <RefreshCcw className="text-indigo-600" size={32} />
            Stock Operations
          </h2>
          <p className="text-slate-500 font-medium mt-1">Manual arrivals, corrections, and damaged inventory logs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-10 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-50 dark:border-zinc-800 pb-6">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Info size={24} /></div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Record New Operation</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Product</label>
                <div className="relative">
                  <Box size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <select required className="w-full pl-12 pr-10 py-4 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 appearance-none" value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})}>
                    <option value="">Search Inventory...</option>
                    {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operation Type</label>
                <select className="w-full px-5 py-4 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                  <option value="Stock In">Stock In (Arrival)</option>
                  <option value="Stock Out">Stock Out (Correction)</option>
                  <option value="Correction">Manual Correction</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Quantity Change</label>
                <input required type="number" placeholder="0" className="w-full px-5 py-4 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reason / Note</label>
                <textarea rows={3} placeholder="e.g. Returned from customer, shipment arrival #42..." className="w-full px-5 py-4 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-indigo-600 text-white rounded-[32px] font-black text-xl shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50">
              {isSubmitting ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={24} /><span>Apply Stock Change</span></>}
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl space-y-6">
            <h3 className="text-xl font-black border-b border-white/10 pb-4">Recent Stock Activity</h3>
            <div className="space-y-4">
              {recentAdjustments.map((adj) => (
                <div key={adj.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div>
                    <p className="text-sm font-bold">{adj.item}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{adj.reason} • {adj.date}</p>
                  </div>
                  <div className={`text-lg font-black ${adj.qty.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {adj.qty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAdjustment;

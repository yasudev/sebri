
import React, { useState } from 'react';
import { Key, Plus, Search, Eye, Trash2, CheckCircle2, AlertCircle, Copy, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

const DigitalKeys: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'sold'>('available');
  const [searchTerm, setSearchTerm] = useState('');

  const [keys] = useState([
    { id: '1', service: 'Apollo IPTV (1 Year)', code: 'APL-9821-XXXX-2190', status: 'available', addedAt: '2024-11-20' },
    { id: '2', service: 'Tiger Server (6 Months)', code: 'TGR-2211-XXXX-0092', status: 'available', addedAt: '2024-11-21' },
    { id: '3', service: 'Apollo IPTV (1 Year)', code: 'APL-1100-XXXX-8821', status: 'sold', addedAt: '2024-11-15', soldTo: 'John Doe', soldAt: '2024-11-18' },
    { id: '4', service: 'Forever Server (1 Year)', code: 'FRV-5541-XXXX-1120', status: 'available', addedAt: '2024-11-22' },
  ]);

  const filteredKeys = keys.filter(k => 
    k.service.toLowerCase().includes(searchTerm.toLowerCase()) || 
    k.code.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(k => k.status === activeTab);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Key copied to clipboard');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Key className="text-amber-500" size={32} />
            Digital Keys Vault
          </h2>
          <p className="text-slate-500 font-medium mt-1">Manage IP Server rechargers and subscription licenses.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-amber-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-amber-100 hover:scale-105 active:scale-95 transition-all">
          <Plus size={20} /> Bulk Import Keys
        </button>
      </div>

      <div className="flex gap-2 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm w-fit">
        <button onClick={() => setActiveTab('available')} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'available' ? 'bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-slate-400'}`}>Stock</button>
        <button onClick={() => setActiveTab('sold')} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'sold' ? 'bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-slate-400'}`}>Redeemed</button>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 md:p-10 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-8">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search service or key code..." className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredKeys.map((k) => (
              <MotionDiv layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={k.id} className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-[32px] border border-transparent hover:border-amber-500/20 hover:bg-white dark:hover:bg-zinc-800 transition-all group relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-zinc-700 rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
                    <Hash size={24} />
                  </div>
                  <button onClick={() => handleCopy(k.code)} className="p-2.5 bg-white dark:bg-zinc-700 text-slate-400 hover:text-amber-500 rounded-xl transition-all shadow-sm">
                    <Copy size={16} />
                  </button>
                </div>
                <h4 className="font-black text-slate-900 dark:text-white text-lg mb-1">{k.service}</h4>
                <p className="font-mono text-xs font-bold text-slate-400 mb-6 tracking-tighter">{k.code}</p>
                
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-700 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{activeTab === 'available' ? 'Imported' : 'Sold To'}</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">{activeTab === 'available' ? k.addedAt : k.soldTo}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${activeTab === 'available' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>{k.status}</span>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </AnimatePresence>
        </div>

        {filteredKeys.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-slate-200 dark:border-zinc-700">
              <Key size={32} className="text-slate-200" />
            </div>
            <h4 className="text-xl font-black text-slate-800 dark:text-zinc-400">Vault Empty</h4>
            <p className="text-sm text-slate-400 font-medium">No keys found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalKeys;

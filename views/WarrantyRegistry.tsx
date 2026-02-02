
import React, { useState } from 'react';
import { ShieldCheck, Search, Calendar, User, Smartphone, BadgeCheck, AlertCircle } from 'lucide-react';

const WarrantyRegistry: React.FC = () => {
  const [lookupSerial, setLookupSerial] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registry lookup
    if (lookupSerial.length > 5) {
      setResult({
        item: 'Tiger T8 High Class V2',
        serial: lookupSerial.toUpperCase(),
        soldDate: '2024-05-12',
        expiryDate: '2025-05-12',
        customer: 'Amanuel Girma',
        status: 'Active'
      });
    } else {
      setResult('not_found');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="w-20 h-20 bg-indigo-600 text-white rounded-[32px] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200 mb-6">
          <ShieldCheck size={40} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Warranty Registry</h2>
        <p className="text-slate-500 font-medium">Instantly verify coverage status and electronics service history.</p>
      </div>

      <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 p-2 rounded-[36px] border border-slate-100 dark:border-zinc-800 shadow-2xl flex items-center">
        <form onSubmit={handleLookup} className="flex-1 flex items-center pr-2">
          <Search className="ml-6 text-slate-300" size={24} />
          <input type="text" placeholder="Scan Barcode or Type Serial Number..." className="flex-1 px-4 py-6 bg-transparent font-bold text-xl outline-none dark:text-white" value={lookupSerial} onChange={e => setLookupSerial(e.target.value)} />
          <button type="submit" className="px-10 py-4 bg-indigo-600 text-white rounded-[28px] font-black text-sm uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all shadow-xl">Lookup</button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto">
        {result === 'not_found' && (
          <div className="p-10 bg-rose-50 border border-rose-100 rounded-[48px] text-center space-y-3 animate-in zoom-in-95 duration-300">
            <AlertCircle className="mx-auto text-rose-500" size={48} />
            <h3 className="text-2xl font-black text-rose-900">Serial Not Found</h3>
            <p className="text-rose-600 font-bold uppercase tracking-widest text-xs">Verify the serial number and try again</p>
          </div>
        )}

        {result && result !== 'not_found' && (
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[56px] border border-slate-100 dark:border-zinc-800 shadow-sm animate-in slide-up duration-500">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-1/3 space-y-6">
                <div className="aspect-square bg-slate-50 dark:bg-zinc-800 rounded-[40px] flex items-center justify-center text-slate-200">
                  <Smartphone size={80} />
                </div>
                <div className="p-6 bg-emerald-50 text-emerald-700 rounded-[32px] text-center">
                  <BadgeCheck className="mx-auto mb-2" size={32} />
                  <p className="font-black text-xl uppercase tracking-tighter">{result.status}</p>
                  <p className="text-[10px] font-black uppercase opacity-60">Warranty Status</p>
                </div>
              </div>

              <div className="flex-1 space-y-8 py-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Product Identity</p>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase leading-tight">{result.item}</h3>
                </div>

                <div className="grid grid-cols-2 gap-10">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Serial Number</p>
                      <p className="text-xl font-mono font-black text-slate-900 dark:text-zinc-300">{result.serial}</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Registered Owner</p>
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-indigo-500" />
                        <p className="text-xl font-black text-slate-900 dark:text-zinc-300">{result.customer}</p>
                      </div>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sold Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400" />
                        <p className="text-lg font-bold text-slate-700 dark:text-zinc-400">{result.soldDate}</p>
                      </div>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Expiry Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-rose-400" />
                        <p className="text-lg font-bold text-slate-700 dark:text-zinc-400">{result.expiryDate}</p>
                      </div>
                   </div>
                </div>

                <button className="w-full py-5 bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 rounded-[28px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-95 shadow-xl">
                  Log Support Ticket
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarrantyRegistry;

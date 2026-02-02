
import React from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Printer, 
  DollarSign, 
  CreditCard, 
  Wallet, 
  ShieldAlert,
  Search,
  Eye,
  Trash2
} from 'lucide-react';

interface CustomerFinancialReportProps {
  onBack: () => void;
  customerName?: string;
}

const CustomerFinancialReport: React.FC<CustomerFinancialReportProps> = ({ onBack, customerName = "BOC" }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all active:scale-90"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Financial Report</h2>
            <p className="text-slate-500 font-medium mt-1 tracking-wide">Detailed audit of customer transactions and credit status.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">
            <Printer size={18} />
            <span>Print Report</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all">
            <Download size={18} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-[32px] flex items-center justify-center text-4xl font-black text-blue-400 backdrop-blur-md">
              {customerName.charAt(0)}
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Customer Profile</p>
              <h1 className="text-5xl font-black tracking-tighter">{customerName}</h1>
              <p className="text-slate-400 font-bold mt-2 flex items-center gap-2">
                <ShieldAlert size={16} className="text-emerald-400" /> Account in Good Standing
              </p>
            </div>
          </div>
          <div className="h-20 w-px bg-white/10 hidden md:block" />
          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Currency</p>
              <p className="text-xl font-black">ETB (Birr)</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Generated</p>
              <p className="text-xl font-black">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Amount', value: '0.00', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { title: 'Total Paid', value: '0.00', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'Remaining Balance', value: '0.00', icon: CreditCard, color: 'text-rose-600', bg: 'bg-rose-50' },
          { title: 'Credit Limit', value: '0.00', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group hover:border-blue-200 transition-all">
            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
              <card.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.title}</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Birr {card.value}</h3>
          </div>
        ))}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-10">
        {/* Paid Payments Table */}
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              Paid Payments
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 first:rounded-tl-[32px]">Type</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Order/Sale ID</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Amount</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Date</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 last:rounded-tr-[32px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-30">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-300">
                        <Wallet size={24} className="text-slate-400" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">No paid payments.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Credit Entries Table */}
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              Credit Entries
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 first:rounded-tl-[32px]">Type</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Order/Sale ID</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Amount</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Date</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 last:rounded-tr-[32px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-30">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-300">
                        <CreditCard size={24} className="text-slate-400" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">No credit entries.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFinancialReport;

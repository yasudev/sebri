
import React, { useState, useMemo } from 'react';
import { 
  Wallet2, 
  Search, 
  Filter,
  Calendar,
  Clock,
  User,
  DollarSign,
  Download,
  CreditCard
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  customerName: string;
  orderId: string;
  amount: number;
  method: string;
  date: string;
}

const PaymentTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [payments, setPayments] = useState<PaymentRecord[]>([
    { id: 'PAY-801', customerName: 'Amanuel Girma', orderId: 'ORD-5001', amount: 85000, method: 'Cash', date: '2024-11-20' },
    { id: 'PAY-802', customerName: 'Bethelhem Tesfaye', orderId: 'ORD-5002', amount: 25000, method: 'Telebirr', date: '2024-11-21' },
    { id: 'PAY-803', customerName: 'Dawit Mekonnen', orderId: 'ORD-5003', amount: 50000, method: 'Credit Installment', date: '2024-11-22' },
  ]);

  const filteredPayments = useMemo(() => {
    return payments.filter(p => 
      p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.method.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [payments, searchTerm]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <Wallet2 className="text-blue-600" size={32} />
            Payment Tracking
          </h2>
          <p className="text-slate-500 font-medium mt-1">Audit ledger for all incoming customer payments and installments.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-[24px] font-black text-sm shadow-sm hover:bg-slate-50 transition-all">
          <Download size={18} />
          <span>Export Ledger</span>
        </button>
      </div>

      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by customer or order..."
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
                <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">#</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Payment ID</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Customer</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Order ID</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Amount Paid</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Method</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPayments.map((pay, idx) => (
                <tr key={pay.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <span className="font-mono text-sm font-black text-slate-300 group-hover:text-blue-400 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-black text-slate-900 text-sm">{pay.id}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <User size={14} className="text-slate-300" />
                       <span className="font-black text-slate-900 text-sm">{pay.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-black text-blue-600 text-sm italic">{pay.orderId}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-1.5">
                       <DollarSign size={14} className="text-emerald-500" />
                       <span className="text-sm font-black text-slate-900">Br {pay.amount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <CreditCard size={14} className="text-blue-400" />
                       <span className="text-xs font-bold text-slate-700">{pay.method}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <Calendar size={12} />
                       <span className="text-[10px] font-bold uppercase">{pay.date}</span>
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

export default PaymentTracking;

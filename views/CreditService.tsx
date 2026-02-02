
import React from 'react';
import { CreditCard, ShieldCheck, Plus, UserCheck } from 'lucide-react';
import { MOCK_CUSTOMERS, MOCK_CREDITS } from '../constants.tsx';

interface CreditServiceProps {
  onAddCreditPlan?: () => void;
}

const CreditService: React.FC<CreditServiceProps> = ({ onAddCreditPlan }) => {
  const [selectedCustomer, setSelectedCustomer] = React.useState(MOCK_CUSTOMERS[0]);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Credit Service</h2>
          <p className="text-slate-500 font-medium">Electronics financing and installment management in Ethiopia.</p>
        </div>
        <button 
          onClick={onAddCreditPlan}
          className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          <span>New Credit Plan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Active Credit Accounts</h3>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-lg">
                <ShieldCheck size={16} /> Secure Ledger
              </div>
            </div>
            <div className="p-0">
              {MOCK_CREDITS.map(credit => {
                const customer = MOCK_CUSTOMERS.find(c => c.id === credit.customerId);
                const progress = ((credit.totalAmount - credit.remainingAmount) / credit.totalAmount) * 100;
                return (
                  <div key={credit.id} className="p-8 hover:bg-slate-50 transition-colors border-b last:border-b-0 border-slate-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
                          {customer?.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">{customer?.name}</h4>
                          <p className="text-sm font-semibold text-slate-500">Awaiting installment on {credit.installments.find(i => i.status === 'pending')?.dueDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-slate-900">Br {credit.remainingAmount.toLocaleString()}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Remaining Balance</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold text-slate-600">
                        <span>Repayment Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      {credit.installments.map((inst, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border ${inst.status === 'paid' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{inst.status === 'paid' ? 'Paid' : 'Due'} {inst.dueDate}</p>
                          <p className={`font-bold ${inst.status === 'paid' ? 'text-emerald-700' : 'text-slate-900'}`}>Br {inst.amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 -mr-12 -mt-12 rounded-full transition-transform group-hover:scale-150 duration-700" />
            <div className="relative">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CreditCard className="text-indigo-600" /> Customer Credit Status
              </h3>
              
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Select Customer</label>
                <select 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold outline-none ring-indigo-500 ring-offset-2 focus:ring-2"
                  value={selectedCustomer.id}
                  onChange={(e) => setSelectedCustomer(MOCK_CUSTOMERS.find(c => c.id === e.target.value) || MOCK_CUSTOMERS[0])}
                >
                  {MOCK_CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="bg-slate-900 rounded-3xl p-6 text-white mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400 text-sm font-bold uppercase">Credit Score</span>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <UserCheck size={16} />
                    <span className="text-sm font-bold">Verified</span>
                  </div>
                </div>
                <div className="text-5xl font-black mb-2 tracking-tighter">
                  {selectedCustomer.creditScore}
                  <span className="text-xl text-slate-500 font-bold ml-1">/100</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{width: `${selectedCustomer.creditScore}%`}} />
                </div>
              </div>

              <div className="p-6 rounded-2xl border bg-slate-50 border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Manual Evaluation</h4>
                <p className="text-sm text-slate-600">
                  Customer has a balance of Br {selectedCustomer.currentBalance.toLocaleString()}. Please review financial documents before extending further credit limits.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-200">
            <h3 className="text-xl font-bold mb-6">Quick Repayment</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/15 cursor-pointer transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-300">Jane Smith</span>
                  <span className="text-xs bg-indigo-500/20 px-2 py-0.5 rounded-full">Due Today</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Br 5,500</span>
                  <button className="text-xs font-bold px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 rounded-lg transition-colors">Collect Cash</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditService;

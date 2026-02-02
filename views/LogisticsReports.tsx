
import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Calendar, 
  ArrowUpRight, 
  TrendingUp, 
  Truck, 
  Wallet, 
  Filter,
  ArrowDownRight,
  Clock,
  PackageSearch
} from 'lucide-react';

const LogisticsReports: React.FC = () => {
  // Default range covering the mock data years
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');
  const [appliedRange, setAppliedRange] = useState({ start: '2025-01-01', end: '2025-12-31' });

  // Source Data (Consistent with Deliveries and DriverPayments views)
  const allDeliveries = [
    { date: '2025-11-21', driver: 'George Meelalii', type: 'test', cost: 1000.00, items: 'adhesive', status: 'Pending' },
    { date: '2025-10-10', driver: 'Test2', type: 'test', cost: 0.03, items: 'adhesive', status: 'Delivered' }
  ];

  const allPayments = [
    { date: '2025-11-21', driver: 'George Meelalii', type: 'test', amount: 1000.00 },
    { date: '2025-10-10', driver: 'Test2', type: 'test', amount: 999.99 },
    { date: '2025-04-29', driver: 'Test2', type: 'test', amount: 1000.00 },
    { date: '2025-04-27', driver: 'Test2', type: 'test', amount: 6500.00 },
  ];

  const handleApplyFilter = () => {
    setAppliedRange({ start: startDate, end: endDate });
  };

  // Filtered Data based on Applied Range
  const filteredDeliveries = useMemo(() => {
    return allDeliveries.filter(d => d.date >= appliedRange.start && d.date <= appliedRange.end);
  }, [appliedRange]);

  const filteredPayments = useMemo(() => {
    return allPayments.filter(p => p.date >= appliedRange.start && p.date <= appliedRange.end);
  }, [appliedRange]);

  // Derived Stats
  const totalExpenses = filteredDeliveries.reduce((sum, d) => sum + d.cost, 0);
  const totalPayments = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const outstandingBalance = Math.max(0, totalExpenses - totalPayments);

  // Driver Wise Summary logic
  const drivers = ['George Meelalii', 'Test2'];
  const driverSummary = drivers.map(name => {
    const dStats = filteredDeliveries.filter(d => d.driver === name);
    const pStats = filteredPayments.filter(p => p.driver === name);
    const expenses = dStats.reduce((sum, d) => sum + d.cost, 0);
    const payments = pStats.reduce((sum, p) => sum + p.amount, 0);
    return {
      driver: name,
      type: 'test',
      deliveries: dStats.length,
      expenses,
      payments,
      outstanding: Math.max(0, expenses - payments)
    };
  });

  // Combined Activity Log
  const recentActivity = useMemo(() => {
    const combined = [
      ...filteredDeliveries.map(d => ({ date: d.date, type: 'Delivery', driver: d.driver, details: d.items, amount: d.cost, direction: 'in' })),
      ...filteredPayments.map(p => ({ date: p.date, type: 'Payment', driver: p.driver, details: 'Settlement', amount: p.amount, direction: 'out' }))
    ];
    return combined.sort((a, b) => b.date.localeCompare(a.date));
  }, [filteredDeliveries, filteredPayments]);

  const showingStart = driverSummary.length > 0 ? 1 : 0;
  const showingEnd = driverSummary.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header & Filters */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Logistics Reports</h2>
          <p className="text-slate-500 font-medium mt-1">Operational performance and financial settlement audits.</p>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="space-y-1.5 w-full md:w-48">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="date" 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5 w-full md:w-48">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="date" 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button 
            onClick={handleApplyFilter}
            className="w-full md:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-95 transition-all mt-auto shadow-lg shadow-slate-100"
          >
            <Filter size={18} />
            Apply Filter
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all">
              <Truck size={24} />
            </div>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Deliveries</p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{filteredDeliveries.length}</h3>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all">
              <BarChart3 size={24} />
            </div>
            <TrendingUp size={16} className="text-rose-500 rotate-180" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Expenses</p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter">ETB {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Wallet size={24} />
            </div>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Payments</p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter">ETB {totalPayments.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
        </div>

        <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl shadow-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <ArrowUpRight size={24} className="text-blue-400" />
            </div>
            <div className="px-2 py-0.5 bg-blue-500/20 rounded-full text-[8px] font-black uppercase tracking-widest text-blue-400 border border-blue-500/20">Active Balance</div>
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Outstanding Balance</p>
          <h3 className="text-3xl font-black text-white tracking-tighter">ETB {outstandingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Driver-wise Summary */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <h3 className="text-xl font-black text-slate-900">Driver-wise Summary</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Aggregated Performance</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Driver</th>
                  <th className="px-4 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Vehicle Type</th>
                  <th className="px-4 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Deliveries</th>
                  <th className="px-4 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Expenses</th>
                  <th className="px-4 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Payments</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Outstanding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {driverSummary.map((d, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center font-black text-[10px] uppercase">
                          {d.driver.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900 text-sm">{d.driver}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 font-bold text-slate-500 text-xs uppercase tracking-widest">{d.type}</td>
                    <td className="px-4 py-5 text-center font-black text-slate-900 text-sm">{d.deliveries}</td>
                    <td className="px-4 py-5 text-right font-black text-slate-900 text-sm">ETB {d.expenses.toFixed(2)}</td>
                    <td className="px-4 py-5 text-right font-black text-emerald-600 text-sm">ETB {d.payments.toFixed(2)}</td>
                    <td className="px-6 py-5 text-right font-black text-rose-600 text-sm">ETB {d.outstanding.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-slate-50">
            <p className="text-sm font-bold text-slate-400">
              Showing <span className="text-slate-900">{showingStart}</span> to <span className="text-slate-900">{showingEnd}</span> of <span className="text-slate-900">{driverSummary.length}</span> entries
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8 h-fit">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-slate-900">Recent Activity</h3>
            <Clock size={20} className="text-slate-300" />
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-slate-50/50 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-white transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.type === 'Payment' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {item.type === 'Payment' ? <ArrowDownRight size={18} /> : <Truck size={18} />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="font-black text-slate-900 text-sm">{item.type}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</p>
                  </div>
                  <p className="text-xs font-bold text-slate-500">{item.driver} • <span className="text-slate-400">{item.details}</span></p>
                  <p className={`font-black text-sm pt-1 ${item.direction === 'out' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    ETB {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <PackageSearch size={40} className="text-slate-200 mb-4" />
                <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No activity in this range</p>
              </div>
            )}
          </div>

          <button className="w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all shadow-sm">
            View Full Activity Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogisticsReports;

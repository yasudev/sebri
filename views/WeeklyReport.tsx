
import React from 'react';
import { 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Package, 
  ShoppingCart, 
  Wallet,
  PieChart as PieIcon,
  Download,
  Printer
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 45000, expenses: 12000 },
  { name: 'Tue', revenue: 52000, expenses: 15000 },
  { name: 'Wed', revenue: 38000, expenses: 22000 },
  { name: 'Thu', revenue: 65000, expenses: 18000 },
  { name: 'Fri', revenue: 78000, expenses: 25000 },
  { name: 'Sat', revenue: 89000, expenses: 30000 },
  { name: 'Sun', revenue: 42000, expenses: 10000 },
];

const catData = [
  { name: 'Satellite Gear', value: 45 },
  { name: 'Televisions', value: 25 },
  { name: 'Security', value: 15 },
  { name: 'Subscriptions', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#94a3b8'];

const WeeklyReport: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 no-print">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
            <PieIcon className="text-indigo-600" size={32} />
            Weekly Intelligence
          </h2>
          <p className="text-slate-500 font-medium mt-1">Performance audit for the period: Nov 15 - Nov 21, 2024</p>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-all active:scale-95 flex items-center gap-2">
            <Printer size={14} /> Print
          </button>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Weekly Revenue" value="Br 409,000" trend="+18.4%" positive={true} icon={ShoppingCart} color="bg-indigo-600" />
        <StatCard title="Net Profit" value="Br 277,000" trend="+12.1%" positive={true} icon={TrendingUp} color="bg-emerald-600" />
        <StatCard title="Active Credit" value="Br 142,500" trend="+5.2%" positive={false} icon={Wallet} color="bg-amber-500" />
        <StatCard title="Inventory Value" value="Br 2.4M" trend="-2.4%" positive={true} icon={Package} color="bg-violet-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Revenue vs Expenses</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Daily Performance Breakdown</p>
            </div>
          </div>
          <div className="h-80 w-full overflow-hidden">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">Sales by Category</h3>
          <div className="flex-1 space-y-6">
            {catData.map((item, i) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.value}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-slate-50 dark:border-zinc-800 text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Growth Driver</p>
             <h4 className="text-lg font-black text-indigo-600 mt-1 uppercase">Satellite Gear</h4>
          </div>
        </div>
      </div>

      {/* Detailed Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Items */}
        <div className="bg-slate-900 p-10 rounded-[56px] text-white shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 -mr-32 -mt-32 rounded-full" />
          <h3 className="text-2xl font-black mb-8 relative z-10">Fastest Weekly Sellers</h3>
          <div className="space-y-5 relative z-10">
            {[
              { name: 'Tiger T8 Receiver', sales: 42, growth: '+15%' },
              { name: 'Apollo IP Recharge', sales: 120, growth: '+22%' },
              { name: 'HD LNB Quad', sales: 35, growth: '-2%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-[32px] group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black">#{i+1}</div>
                  <span className="font-bold">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-black">{item.sales} units</p>
                  <p className={`text-[10px] font-black uppercase ${item.growth.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{item.growth} vs Last Week</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[56px] border border-slate-100 dark:border-zinc-800 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Financial Health Score</h3>
          <div className="flex flex-col items-center justify-center py-4">
             <div className="w-48 h-48 rounded-full border-[12px] border-slate-50 dark:border-zinc-800 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-[12px] border-emerald-500 border-t-transparent -rotate-45" />
                <span className="text-5xl font-black text-slate-900 dark:text-white">88</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Excellent</span>
             </div>
             <div className="grid grid-cols-2 gap-10 mt-10 w-full text-center">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cash Inflow</p>
                   <p className="text-xl font-black text-emerald-600 tracking-tight">ETB 265k</p>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Credit Aging</p>
                   <p className="text-xl font-black text-amber-500 tracking-tight">14 Days</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, positive, icon: Icon, color }: any) => (
  <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm group hover:shadow-lg transition-all">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-current/10 transition-transform group-hover:scale-110`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {positive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
        {trend}
      </div>
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h3>
  </div>
);

export default WeeklyReport;

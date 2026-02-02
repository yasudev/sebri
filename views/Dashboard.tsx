
import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  DollarSign, 
  Package, 
  Users, 
  Clock,
  AlertTriangle,
  ChevronRight,
  Warehouse as WarehouseIcon
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_WAREHOUSES } from '../constants.tsx';

const data = [
  { name: 'Mon', sales: 4000, credit: 2400 },
  { name: 'Tue', sales: 3000, credit: 1398 },
  { name: 'Wed', sales: 2000, credit: 9800 },
  { name: 'Thu', sales: 2780, credit: 3908 },
  { name: 'Fri', sales: 1890, credit: 4800 },
  { name: 'Sat', sales: 2390, credit: 3800 },
  { name: 'Sun', sales: 3490, credit: 4300 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }: any) => (
  <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} shadow-lg shadow-current/10`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className={`flex items-center px-2 py-1 rounded-full text-[10px] font-black uppercase ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {isPositive ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
        {change}%
      </div>
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h3>
  </div>
);

interface DashboardProps {
  onViewReports: () => void;
  onNewSale: () => void;
  onViewAllTransactions: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewReports, onNewSale, onViewAllTransactions }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Business Overview</h2>
          <p className="text-slate-500 font-medium mt-1">Sebrisat Tech & Satellite Performance Hub</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onViewReports}
            className="flex-1 md:flex-none px-5 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 rounded-2xl font-bold text-sm hover:bg-slate-50 shadow-sm transition-all active:scale-95"
          >
            Reports
          </button>
          <button 
            onClick={onNewSale}
            className="flex-1 md:flex-none px-5 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            New Sale <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="Br 124,592" change="12.4" isPositive={true} icon={DollarSign} color="bg-indigo-600" />
        <StatCard title="Outstanding Credit" value="Br 42,300" change="3.2" isPositive={false} icon={Clock} color="bg-amber-500" />
        <StatCard title="Active Clients" value="842" change="8.1" isPositive={true} icon={Users} color="bg-emerald-500" />
        <StatCard title="Total Stock" value="4,820" change="2.5" isPositive={true} icon={Package} color="bg-violet-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Revenue Growth</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Daily Performance (Birr)</p>
              </div>
              <select className="bg-slate-50 dark:bg-zinc-800 border-none text-xs font-black text-slate-600 dark:text-zinc-400 rounded-xl px-4 py-2 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                <option>Weekly View</option>
                <option>Monthly View</option>
              </select>
            </div>
            <div className="h-72 w-full overflow-hidden">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} 
                  />
                  <Tooltip 
                    contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Recent Transactions</h3>
              <button 
                onClick={onViewAllTransactions}
                className="text-xs font-black text-indigo-600 hover:text-indigo-700"
              >
                View All Transactions
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Tiger T8 High Class V2', amount: '8,500', method: 'Cash', status: 'Completed', icon: '📡' },
                { name: 'Sony 55" X80L Google TV', amount: '145,000', method: 'Credit', status: 'Processing', icon: '📺' },
                { name: 'Apollo IP Server (1 Year)', amount: '2,500', method: 'Cash', status: 'Completed', icon: '🔑' },
              ].map((sale, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 dark:bg-zinc-800/50 rounded-3xl hover:bg-white dark:hover:bg-zinc-800 hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-slate-100 dark:hover:border-zinc-700">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-700 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                      {sale.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{sale.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sale.method} Sale</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">2m ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900 dark:text-white">Br {sale.amount}</p>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase mt-1 inline-block ${
                      sale.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {sale.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Analytics/Alerts */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Warehouse Stock</h3>
              <WarehouseIcon className="text-slate-400" size={20} />
            </div>
            <div className="space-y-6">
              {MOCK_WAREHOUSES.map((wh, idx) => {
                const utilization = idx === 0 ? 82 : 34;
                return (
                  <div key={wh.id} className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-indigo-600 border border-slate-100 dark:border-zinc-700 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <WarehouseIcon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{wh.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{wh.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-900 dark:text-white">{utilization}%</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Utilized</p>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${utilization > 80 ? 'bg-amber-500' : 'bg-indigo-500'}`} 
                        style={{ width: `${utilization}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <AlertTriangle className="text-amber-400" size={24} />
              Stock Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer flex items-center gap-4 group">
                <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-500">
                  <Package size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">LNB HD Stock Low</p>
                  <p className="text-xs text-slate-400 font-medium">3 units remaining</p>
                </div>
                <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React from 'react';
import { 
  Truck, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ArrowUpRight,
  TrendingUp,
  Activity,
  Navigation
} from 'lucide-react';

interface LogisticsDashboardProps {
  onAddDelivery: () => void;
  onAddDriver: () => void;
}

const LogisticsDashboard: React.FC<LogisticsDashboardProps> = ({ onAddDelivery, onAddDriver }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header & Main Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight text-rose-600">Logistics Overview</h2>
          <p className="text-slate-500 font-medium mt-1">Real-time monitoring of Sebrisat fleet and dispatch network.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onAddDriver}
            className="flex-1 md:flex-none px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-sm hover:bg-slate-50 shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Add Driver
          </button>
          <button 
            onClick={onAddDelivery}
            className="flex-1 md:flex-none px-8 py-3.5 bg-rose-600 text-white rounded-2xl font-black text-sm hover:bg-rose-700 shadow-xl shadow-rose-100 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Record Trip <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* Fleet Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <Truck size={24} />
            </div>
            <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[8px] font-black uppercase">8 Active</div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Vehicles</p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">12</h3>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Users size={24} />
            </div>
            <div className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[8px] font-black uppercase">Online</div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Drivers</p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">15</h3>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Clock size={24} />
            </div>
            <div className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[8px] font-black uppercase">Pending</div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Due Deliveries</p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">04</h3>
        </div>

        <div className="bg-slate-900 p-6 rounded-[32px] text-white shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <TrendingUp size={24} className="text-rose-400" />
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Today's Trip Costs</p>
          <h3 className="text-3xl font-black text-white tracking-tight">ETB 1,000</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Dispatch List */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between px-2">
            <div>
              <h3 className="text-xl font-black text-slate-900">Current Dispatch</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Live Delivery Tracking</p>
            </div>
            <button className="text-xs font-black text-rose-600 hover:underline">View Delivery Log</button>
          </div>

          <div className="space-y-4">
            {[
              { id: 'DEL-202', driver: 'George Meelalii', status: 'In Transit', loc: 'Mercato Branch', items: 'Adhesive 5kg', time: '12:09 PM' },
              { id: 'DEL-201', driver: 'Test2', status: 'Loading', loc: 'Central Warehouse', items: 'Sony TV x2', time: '1:30 PM' },
            ].map((trip, i) => (
              <div key={i} className="group p-6 bg-slate-50/50 rounded-3xl border border-transparent hover:border-rose-100 hover:bg-white transition-all cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm group-hover:scale-110 transition-transform">
                      <Truck size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-slate-900">{trip.driver}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase">#{trip.id}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <MapPin size={12} className="text-rose-400" /> {trip.loc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-1 items-center justify-between md:justify-end gap-10">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cargo</p>
                       <p className="text-xs font-bold text-slate-700">{trip.items}</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                       <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                         trip.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                       }`}>
                         {trip.status}
                       </span>
                       <p className="text-[10px] font-black text-slate-400 mt-2 uppercase">{trip.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          {/* Fleet Composition */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Activity size={20} className="text-rose-500" /> Fleet Mix
            </h3>
            <div className="space-y-5">
              {[
                { label: 'Heavy Trucks', count: 3, percent: 70 },
                { label: 'Light Vans', count: 5, percent: 45 },
                { label: 'Motorcycles', count: 4, percent: 90 },
              ].map((fleet, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{fleet.label}</span>
                    <span className="text-xs font-black text-slate-900">{fleet.count} Units</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rose-500 rounded-full" 
                      style={{ width: `${fleet.percent}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-1000" />
             <div className="relative">
                <h3 className="text-xl font-black mb-6">Logistics Links</h3>
                <div className="grid grid-cols-1 gap-4">
                  <button className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left">
                    <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center">
                      <Navigation size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black">Routes & Areas</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Optimisation</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black">Maintenance Log</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Due in 2 days</p>
                    </div>
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;

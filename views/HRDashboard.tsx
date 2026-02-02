
import React from 'react';
import { 
  Users, 
  Building, 
  UserCheck, 
  Banknote, 
  TrendingUp, 
  ArrowUpRight,
  UserPlus,
  Clock,
  Calendar
} from 'lucide-react';

interface HRDashboardProps {
  onAddEmployee: () => void;
}

const HRDashboard: React.FC<HRDashboardProps> = ({ onAddEmployee }) => {
  const stats = [
    { title: 'Total Employees', value: '24', icon: Users, color: 'bg-violet-600', trend: '+2 this month' },
    { title: 'Departments', value: '5', icon: Building, color: 'bg-indigo-600', trend: 'Global Network' },
    { title: 'Attendance Today', value: '21/24', icon: UserCheck, color: 'bg-emerald-600', trend: '88% Presence' },
    { title: 'Payroll Budget', value: 'Br 142k', icon: Banknote, color: 'bg-rose-600', trend: 'Next: Nov 25' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight text-violet-600">HR Operations</h2>
          <p className="text-slate-500 font-medium mt-1">Manage Sebrisat's most valuable asset: our people.</p>
        </div>
        <button 
          onClick={onAddEmployee}
          className="flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-violet-100 hover:scale-105 active:scale-95 transition-all"
        >
          <UserPlus size={20} strokeWidth={3} />
          <span>Onboard Employee</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.color} text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight size={16} className="text-slate-200" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-2">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Recently Hired</h3>
            <button className="text-xs font-black text-violet-600 uppercase tracking-widest">View Directory</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Abebe Kebede', role: 'Sales Lead', dept: 'Retail', joined: '2 days ago' },
              { name: 'Sara Konjo', role: 'Logistics Coord', dept: 'Operations', joined: '1 week ago' },
              { name: 'Henok Tadesse', role: 'Finance Analyst', dept: 'Finance', joined: '2 weeks ago' },
            ].map((staff, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group cursor-pointer hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-violet-100">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-violet-600 shadow-sm">
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg">{staff.name}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{staff.role} • {staff.dept}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Joined</p>
                  <p className="text-sm font-bold text-slate-900">{staff.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Clock size={28} className="text-violet-400" />
            </div>
            <h3 className="text-xl font-black">Staff Alerts</h3>
          </div>
          <div className="space-y-6">
            <div className="p-5 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">Upcoming Leave</p>
              <p className="text-sm font-bold">Mulugeta T. (Sales)</p>
              <p className="text-[10px] text-slate-500 mt-1">Starting Nov 15 - 3 Days</p>
            </div>
            <div className="p-5 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-1">Performance Review</p>
              <p className="text-sm font-bold">Q4 Cycle Starts</p>
              <p className="text-[10px] text-slate-500 mt-1">12 staff members due for review</p>
            </div>
          </div>
          <button className="w-full py-4 bg-violet-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-violet-900/50">
            Open HR Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;

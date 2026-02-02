
import React, { useState, useMemo } from 'react';
import { 
  Magnet, 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  Filter,
  Mail,
  Phone,
  Target,
  Calendar,
  Download,
  Building2,
  User,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronDown,
  Timer,
  ExternalLink
} from 'lucide-react';

interface LeadRecord {
  id: string;
  leadName: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  assignedTo: string;
  nextVisitDate: string;
  createdAt: string;
}

interface LeadManagementProps {
  onAddLead: () => void;
}

const LeadManagement: React.FC<LeadManagementProps> = ({ onAddLead }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const [leads, setLeads] = useState<LeadRecord[]>([
    { 
      id: 'LD-1001', 
      leadName: 'Samuel L. Jackson', 
      company: 'Avengers Tech Hub', 
      email: 'samuel@avengers.tech', 
      phone: '+251 911 888 777', 
      source: 'Website Inquiry',
      status: 'New', 
      assignedTo: 'Abebe K.',
      nextVisitDate: '2024-11-25',
      createdAt: '2024-11-20' 
    },
    { 
      id: 'LD-1002', 
      leadName: 'Zarah Tadesse', 
      company: 'Sunrise Electronics', 
      email: 'zarah.t@sunrise.et', 
      phone: '+251 922 333 444', 
      source: 'Referral',
      status: 'Qualified', 
      assignedTo: 'Sara K.',
      nextVisitDate: '2024-11-23',
      createdAt: '2024-11-18' 
    },
    { 
      id: 'LD-1003', 
      leadName: 'Michael Demissie', 
      company: 'Skyline Solutions', 
      email: 'mike@skyline.et', 
      phone: '+251 933 555 666', 
      source: 'Social Media',
      status: 'Contacted', 
      assignedTo: 'Henok T.',
      nextVisitDate: '2024-11-21',
      createdAt: '2024-11-15' 
    },
    { 
      id: 'LD-1004', 
      leadName: 'Ruth Belay', 
      company: 'Blue Nile Importers', 
      email: 'ruth.b@bluenile.com', 
      phone: '+251 944 666 777', 
      source: 'Cold Call',
      status: 'Negotiation', 
      assignedTo: 'Abebe K.',
      nextVisitDate: '2024-11-24',
      createdAt: '2024-11-10' 
    }
  ]);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = l.leadName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || l.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, filterStatus]);

  const getStatusStyle = (status: LeadRecord['status']) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Contacted': return 'bg-violet-50 text-violet-600 border-violet-100';
      case 'Qualified': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Negotiation': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Closed Won': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Closed Lost': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const handleDelete = (id: string) => {
    if(confirm('Archive this lead?')) {
      setLeads(prev => prev.filter(l => l.id !== id));
    }
  };

  const isFollowUpDue = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr <= today;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <Magnet className="text-orange-600" size={32} />
            Lead Pipeline
          </h2>
          <p className="text-slate-500 font-medium mt-1">Nurture and convert electronics retail prospects.</p>
        </div>
        <div className="flex gap-3">
          <button className="hidden sm:flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-[24px] font-black text-sm shadow-sm hover:bg-slate-50 transition-all">
            <Download size={18} />
            <span>Export Pipeline</span>
          </button>
          <button 
            onClick={onAddLead}
            className="flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-orange-100 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={20} strokeWidth={3} />
            <span>Capture New Lead</span>
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Total Leads', val: leads.length, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Target },
           { label: 'New This Week', val: '04', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: TrendingUp },
           { label: 'Follow-ups Due', val: leads.filter(l => isFollowUpDue(l.nextVisitDate)).length, color: 'text-rose-600', bg: 'bg-rose-50', icon: Timer },
           { label: 'Conversion Rate', val: '24.2%', color: 'text-orange-600', bg: 'bg-orange-50', icon: Sparkles },
         ].map((kpi, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-orange-100 transition-all">
               <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                  <kpi.icon size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{kpi.label}</p>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">{kpi.val}</h4>
               </div>
            </div>
         ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                <Target size={24} />
             </div>
             <div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Leads</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{filteredLeads.length} Records Found</p>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search leads, companies..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative w-full sm:w-48">
               <select 
                className="w-full pl-4 pr-10 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer shadow-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
               >
                  <option value="All">All Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
               </select>
               <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        {/* Lead Table */}
        <div className="overflow-x-auto -mx-10">
          <table className="w-full min-w-[1400px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Actions</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Prospect</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Company & Source</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Contact</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Status</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Assigned To</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Next Visit</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Captured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLeads.map((lead, idx) => (
                <tr key={lead.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-orange-600 rounded-xl shadow-sm transition-all group-hover:scale-110">
                        <Pencil size={16} strokeWidth={2.5} />
                      </button>
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 rounded-xl shadow-sm transition-all group-hover:scale-110"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg shadow-orange-100 uppercase shrink-0">
                        {lead.leadName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm leading-none group-hover:text-orange-600 transition-colors whitespace-nowrap">{lead.leadName}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{lead.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-slate-800">
                        <Building2 size={14} className="text-slate-300" />
                        <span className="text-xs font-black uppercase tracking-tighter whitespace-nowrap">{lead.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-orange-500/60">
                        <ExternalLink size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{lead.source}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Mail size={12} className="text-slate-300" />
                        <span className="text-[11px] font-bold">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Phone size={12} className="text-slate-300" />
                        <span className="text-[11px] font-bold font-mono">{lead.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${getStatusStyle(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0">
                          {lead.assignedTo.charAt(0)}
                       </div>
                       <span className="text-xs font-bold text-slate-600 whitespace-nowrap">{lead.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className={`flex items-center gap-2 ${isFollowUpDue(lead.nextVisitDate) ? 'text-rose-500' : 'text-slate-500'}`}>
                       <Timer size={14} className={isFollowUpDue(lead.nextVisitDate) ? 'animate-pulse' : ''} />
                       <span className="text-xs font-black uppercase tracking-tighter">{lead.nextVisitDate}</span>
                       {isFollowUpDue(lead.nextVisitDate) && <span className="w-2 h-2 bg-rose-500 rounded-full" />}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <Calendar size={12} />
                       <span className="text-[10px] font-bold uppercase font-mono">{lead.createdAt}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-center px-10">
              <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-100">
                <Target size={48} />
              </div>
              <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">No Leads Found</h4>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2">Adjust your search to find specific prospects</p>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-slate-100">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Lead Database Sync • {new Date().toLocaleDateString()}</p>
           </div>
           <div className="flex items-center gap-2">
              <button className="px-6 py-2.5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all">Previous</button>
              <button className="px-6 py-2.5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;


import React, { useState, useMemo } from 'react';
import { 
  UserCheck, 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  Filter,
  Calendar,
  Clock,
  Download,
  FileText,
  User
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Leave';
  note: string;
  createdAt: string;
}

interface AttendanceProps {
  onAdd?: () => void;
}

const Attendance: React.FC<AttendanceProps> = ({ onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- MOCK DATA FOR ATTENDANCE ---
  const [records, setRecords] = useState<AttendanceRecord[]>([
    { 
      id: 'ATT-001', 
      employeeName: 'Abebe Kebede', 
      employeeId: 'S001',
      date: '2024-11-21', 
      status: 'Present', 
      note: 'Arrived on time at Bole HQ',
      createdAt: '2024-11-21 08:32 AM'
    },
    { 
      id: 'ATT-002', 
      employeeName: 'Sara Konjo', 
      employeeId: 'S002',
      date: '2024-11-21', 
      status: 'Present', 
      note: 'Remote clock-in from Mercato',
      createdAt: '2024-11-21 08:45 AM'
    },
    { 
      id: 'ATT-003', 
      employeeName: 'Henok Tadesse', 
      employeeId: 'S003',
      date: '2024-11-21', 
      status: 'Leave', 
      note: 'Medical appointment approved',
      createdAt: '2024-11-20 04:12 PM'
    },
    { 
      id: 'ATT-004', 
      employeeName: 'Mulugeta Tesfaye', 
      employeeId: 'S004',
      date: '2024-11-21', 
      status: 'Absent', 
      note: 'No prior notification provided',
      createdAt: '2024-11-21 09:15 AM'
    }
  ]);

  const filteredRecords = useMemo(() => {
    return records.filter(r => 
      r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [records, searchTerm]);

  const handleDelete = (id: string) => {
    if (confirm('Delete this attendance record?')) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Absent': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Leave': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <UserCheck className="text-violet-600" size={32} />
            Attendance List
          </h2>
          <p className="text-slate-500 font-medium mt-1">Daily presence logs and staff activity tracking.</p>
        </div>
        <div className="flex gap-3">
          <button className="hidden sm:flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-[24px] font-black text-sm shadow-sm hover:bg-slate-50 transition-all">
            <Download size={18} />
            <span>Export</span>
          </button>
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-violet-100 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={20} strokeWidth={3} />
            <span>Add Attendance</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Staff Daily Registry</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">{records.length} Records Today</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search employee or status..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-4 bg-white border border-slate-200 text-slate-400 hover:text-violet-600 rounded-2xl shadow-sm transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto -mx-10">
          <table className="w-full min-w-[1200px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Action</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">#</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Employee</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Date</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Status</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Note</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRecords.map((rec, idx) => (
                <tr key={rec.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm transition-all group-hover:scale-110">
                        <Pencil size={16} strokeWidth={2.5} />
                      </button>
                      <button 
                        onClick={() => handleDelete(rec.id)}
                        className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 rounded-xl shadow-sm transition-all group-hover:scale-110"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-mono text-sm font-black text-slate-300 group-hover:text-violet-400 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-violet-600 text-white rounded-xl flex items-center justify-center font-black text-xs shadow-lg shadow-violet-100">
                        {rec.employeeName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm leading-none group-hover:text-violet-600 transition-colors">{rec.employeeName}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{rec.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-slate-600">
                       <Calendar size={14} className="text-slate-300" />
                       <span className="text-xs font-bold">{rec.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${getStatusStyle(rec.status)}`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-medium text-slate-500 line-clamp-1 max-w-[200px]">
                      {rec.note}
                    </p>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                       <Clock size={12} />
                       <span className="text-[10px] font-bold uppercase">{rec.createdAt}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-center px-10">
              <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-100">
                <Search size={48} />
              </div>
              <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">No Records Found</h4>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2">Adjust your filters to see historical logs</p>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-slate-100">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Attendance Validated • {new Date().toLocaleDateString()}</p>
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

export default Attendance;

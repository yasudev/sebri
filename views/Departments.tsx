
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Building, 
  Search, 
  Pencil, 
  Trash2, 
  Filter,
  MoreVertical,
  Activity
} from 'lucide-react';

interface Department {
  id: string;
  name: string;
  description: string;
  count: number;
}

interface DepartmentsProps {
  onAdd: () => void;
}

const Departments: React.FC<DepartmentsProps> = ({ onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- MOCK DATA FOR DEPARTMENTS ---
  const [departments, setDepartments] = useState<Department[]>([
    { id: 'd1', name: 'Retail & Sales', description: 'Manages all physical storefronts and direct customer sales operations.', count: 12 },
    { id: 'd2', name: 'Logistics', description: 'Oversees fleet management, delivery schedules, and warehouse transfers.', count: 6 },
    { id: 'd3', name: 'Finance', description: 'Handles payroll, bookkeeping, tax compliance, and credit service audits.', count: 3 },
    { id: 'd4', name: 'Operations', description: 'Internal business processes, facility management, and general support.', count: 2 },
    { id: 'd5', name: 'Administration', description: 'Executive leadership and high-level strategic decision making.', count: 1 },
  ]);

  // --- ACTIONS ---
  const handleDelete = (id: string) => {
    if (!confirm(`Are you sure you want to permanently delete this department?`)) return;
    setDepartments(prev => prev.filter(d => d.id !== id));
  };

  const handleEdit = (id: string) => {
    alert(`Editing Department [ID: ${id}]`);
  };

  const filteredDepartments = useMemo(() => {
    return departments.filter(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <Building className="text-violet-600" size={32} />
            Department Hub
          </h2>
          <p className="text-slate-500 font-medium mt-1">Organize and manage Sebrisat's business units.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-violet-100 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} strokeWidth={3} />
          <span>Add Department</span>
        </button>
      </div>

      {/* Primary Table Control Card */}
      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center">
              <Building size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Organization Map</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">{departments.length} Units Active</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search departments..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-4 bg-white border border-slate-200 text-slate-400 hover:text-violet-600 rounded-2xl hover:border-violet-100 transition-all shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Departments Table */}
        <div className="overflow-x-auto -mx-10">
          <table className="w-full min-w-[900px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Action</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">#</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Department Name</th>
                <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDepartments.map((dept, idx) => (
                <tr key={dept.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleEdit(dept.id)}
                        className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-violet-600 hover:border-violet-100 rounded-xl transition-all shadow-sm group-hover:scale-110"
                        title="Edit Department"
                      >
                        <Pencil size={16} strokeWidth={2.5} />
                      </button>
                      <button 
                        onClick={() => handleDelete(dept.id)}
                        className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:border-rose-100 rounded-xl transition-all shadow-sm group-hover:scale-110"
                        title="Delete Department"
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
                        {dept.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-base leading-none mb-1 group-hover:text-violet-600 transition-colors">{dept.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{dept.count} Staff Members</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <p className="text-sm font-medium text-slate-500 line-clamp-2 max-w-md leading-relaxed">
                      {dept.description}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDepartments.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-center px-10">
              <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-100">
                <Search size={48} />
              </div>
              <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">No Departments Found</h4>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2">Try searching for Sales, Logistics, or Finance</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-slate-100">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Internal Structure Audited • {new Date().toLocaleDateString()}</p>
           </div>
           <div className="flex items-center gap-2">
              <button className="px-6 py-2.5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all">Previous</button>
              <button className="px-6 py-2.5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all">Next</button>
           </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-slate-900 p-12 rounded-[56px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_35%,_rgba(139,92,246,0.15)_0%,_transparent_50%)]" />
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-white/10 rounded-[32px] flex items-center justify-center text-violet-400 border border-white/5 backdrop-blur-md">
               <Activity size={40} />
            </div>
            <div>
               <h4 className="text-2xl font-black tracking-tight">Operational Structuring</h4>
               <p className="text-sm font-medium text-slate-400 mt-2 max-w-md">Departments define the logical separation of business workflows and personnel allocation across Sebrisat locations.</p>
            </div>
         </div>
         <button className="w-full md:w-auto px-12 py-5 bg-white text-slate-900 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:bg-violet-500 hover:text-white transition-all shadow-xl active:scale-95 relative z-10">
           Organization Chart
         </button>
      </div>
    </div>
  );
};

export default Departments;


import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Filter, Pencil, Trash2, Mail, Phone, Building, Briefcase, Calendar, 
  DollarSign, Download, Printer, ChevronLeft, ChevronRight, User as UserIcon
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';

const MotionTr = motion.tr as any;

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joinDate: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
  image?: string;
}

interface EmployeesProps {
  onAdd: () => void;
}

const Employees: React.FC<EmployeesProps> = ({ onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [employees, setEmployees] = useState<Employee[]>([
    { id: 'S001', name: 'Abebe Kebede', email: 'abebe@sebrisat.com', phone: '+251 911 223 344', department: 'Retail', designation: 'Sales Lead', joinDate: '2024-01-12', salary: 15500, status: 'Active' },
    { id: 'S002', name: 'Sara Konjo', email: 'sara.k@sebrisat.com', phone: '+251 912 334 455', department: 'Logistics', designation: 'Coordinator', joinDate: '2023-11-05', salary: 12800, status: 'Active' },
    { id: 'S003', name: 'Henok Tadesse', email: 'henok.t@sebrisat.com', phone: '+251 913 445 566', department: 'Finance', designation: 'Analyst', joinDate: '2024-03-20', salary: 18200, status: 'On Leave' },
    { id: 'S004', name: 'Mulugeta Tesfaye', email: 'mulu.t@sebrisat.com', phone: '+251 914 556 677', department: 'Operations', designation: 'Manager', joinDate: '2022-06-15', salary: 22000, status: 'Active' },
    { id: 'S005', name: 'Almaz Ayana', email: 'almaz@sebrisat.com', phone: '+251 915 667 788', department: 'Retail', designation: 'Sales Exec', joinDate: '2024-05-02', salary: 9500, status: 'Active' }
  ]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.department.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [employees, searchTerm]);

  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handleDelete = (id: string) => {
    if (confirm('Delete employee record?')) {
      setEmployees(prev => prev.filter(e => e.id !== id));
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sebrisat Staff Directory", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Name', 'Department', 'Role', 'Salary', 'Status']],
      body: filteredEmployees.map(e => [e.id, e.name, e.department, e.designation, e.salary.toLocaleString(), e.status]),
    });
    doc.save(`Employees_${Date.now()}.pdf`);
  };

  const exportExcel = () => {
    const headers = "ID,Name,Department,Role,Salary,Status\n";
    const rows = filteredEmployees.map(e => `${e.id},"${e.name}",${e.department},${e.designation},${e.salary},${e.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `Employees_${Date.now()}.csv`; a.click();
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 no-print">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Staff Directory</h2>
          <p className="text-slate-500 font-medium mt-1">Manage personnel and payroll.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => window.print()} className="px-4 py-3 bg-white dark:bg-zinc-900 border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest"><Printer size={14} /></button>
          <button onClick={exportExcel} className="px-4 py-3 bg-white dark:bg-zinc-900 border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest">Excel</button>
          <button onClick={exportPDF} className="px-6 py-3 bg-violet-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg">PDF Export</button>
          <button onClick={onAdd} className="px-8 py-4 bg-slate-900 dark:bg-zinc-100 dark:text-slate-900 text-white rounded-[24px] font-black text-sm hover:scale-105 transition-all"><Plus size={18} /></button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 md:p-10 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-8">
        <div className="relative max-w-md no-print">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search staff..." className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="overflow-x-auto -mx-10">
          <table className="w-full min-w-[1000px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-zinc-800/50">
                <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">Employee</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">Role</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">Salary</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">Status</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800 no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              <AnimatePresence mode='popLayout'>
                {paginatedEmployees.map((emp) => (
                  <MotionTr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} key={emp.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-all duration-200">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm uppercase bg-violet-600 text-white">{emp.name.charAt(0)}</div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-zinc-200 text-sm group-hover:text-violet-600 transition-colors">{emp.name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase">{emp.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-bold text-slate-600 dark:text-zinc-400 text-xs uppercase">{emp.designation}</td>
                    <td className="px-6 py-6 font-black text-slate-900 dark:text-zinc-200 text-sm">ETB {emp.salary.toLocaleString()}</td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>{emp.status}</span>
                    </td>
                    <td className="px-10 py-6 text-right no-print">
                      <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2.5 bg-white dark:bg-zinc-800 border border-slate-100 rounded-xl"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(emp.id)} className="p-2.5 bg-white dark:bg-zinc-800 border border-slate-100 text-rose-500 rounded-xl"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </MotionTr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-slate-50 dark:border-zinc-800 no-print">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Staff: {employees.length}</p>
           <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 bg-slate-50 dark:bg-zinc-800 text-slate-400 rounded-xl"><ChevronLeft /></button>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="p-2 bg-slate-50 dark:bg-zinc-800 text-slate-400 rounded-xl"><ChevronRight /></button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;

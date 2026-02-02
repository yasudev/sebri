
import React, { useState, useMemo } from 'react';
import { Search, Plus, Pencil, Trash2, Eye, Download, Printer, ChevronLeft, ChevronRight, Phone, MapPin, User as UserIcon } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';

const MotionTr = motion.tr as any;

const Suppliers: React.FC<{ onAdd?: () => void }> = ({ onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [suppliers, setSuppliers] = useState([
    { id: '1', name: 'Global Electronics Co.', contactPerson: 'Adam Smith', phone: '+1 555-0192', address: 'Dubai Silicon Oasis, UAE', creditLimit: 500000, currentCredit: 125000 },
    { id: '2', name: 'Smart Parts Ltd.', contactPerson: 'Sarah Chen', phone: '+86 21 6789 0123', address: 'Futian District, Shenzhen, China', creditLimit: 250000, currentCredit: 45000 },
    { id: '3', name: 'Addis Tech Importers', contactPerson: 'Abebe Kebede', phone: '+251 911 234 567', address: 'Bole Road, Addis Ababa, Ethiopia', creditLimit: 1000000, currentCredit: 0 },
    { id: '4', name: 'EuroCircuit Distro', contactPerson: 'Marc Weber', phone: '+49 30 1234 5678', address: 'Charlottenburg, Berlin, Germany', creditLimit: 750000, currentCredit: 210000 },
    { id: '5', name: 'Kality Logistics Partners', contactPerson: 'Mulugeta Tesfaye', phone: '+251 911 998 877', address: 'Kality Ind. Zone, Addis Ababa', creditLimit: 150000, currentCredit: 12000 },
  ]);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [suppliers, searchTerm]);

  const paginatedSuppliers = filteredSuppliers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sebrisat Supplier Directory", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [['Name', 'Contact', 'Phone', 'Credit Limit', 'Current Credit']],
      body: filteredSuppliers.map(s => [s.name, s.contactPerson, s.phone, s.creditLimit.toLocaleString(), s.currentCredit.toLocaleString()]),
    });
    doc.save(`Suppliers_${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 no-print">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Suppliers</h2>
          <p className="text-slate-500 dark:text-zinc-500 font-medium">Manage procurement partners.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportPDF} className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">PDF Export</button>
          <button onClick={onAdd} className="px-8 py-4 bg-slate-900 dark:bg-zinc-100 dark:text-slate-900 text-white rounded-2xl font-black shadow-xl"><Plus size={20} /></button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 md:p-10 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-8">
        <div className="relative max-w-md no-print">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search suppliers..." className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-zinc-800 border-none rounded-2xl font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="overflow-x-auto -mx-10">
          <table className="w-full min-w-[1000px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-zinc-800/50">
                <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">Supplier Name</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">Contact</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800">Outstanding</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800 no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              <AnimatePresence mode='popLayout'>
                {paginatedSuppliers.map((s) => (
                  <MotionTr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} key={s.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-all duration-200">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm uppercase bg-blue-100 text-blue-600">{s.name.charAt(0)}</div>
                        <span className="font-black text-slate-900 dark:text-zinc-200 text-sm">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-bold text-slate-700 dark:text-zinc-400">{s.contactPerson}</p>
                      <p className="text-[10px] font-mono text-slate-400">{s.phone}</p>
                    </td>
                    <td className="px-6 py-6 font-black text-rose-600 text-sm">ETB {s.currentCredit.toLocaleString()}</td>
                    <td className="px-10 py-6 text-right no-print">
                      <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2.5 bg-white dark:bg-zinc-800 border border-slate-100 rounded-xl shadow-sm"><Pencil size={16} /></button>
                        <button onClick={() => setSuppliers(prev => prev.filter(i => i.id !== s.id))} className="p-2.5 bg-white dark:bg-zinc-800 border border-slate-100 text-rose-500 rounded-xl shadow-sm"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </MotionTr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between no-print pt-6 border-t border-slate-50 dark:border-zinc-800">
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{filteredSuppliers.length} Vendors Listed</p>
           <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 bg-slate-50 dark:bg-zinc-800 text-slate-400 rounded-xl"><ChevronLeft /></button>
              <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 bg-slate-50 dark:bg-zinc-800 text-slate-400 rounded-xl"><ChevronRight /></button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;

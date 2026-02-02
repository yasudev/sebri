
import React, { useState, useMemo } from 'react';
import { 
  Search, Eye, Download, Printer, ChevronDown, CreditCard, Package, CalendarDays, 
  Warehouse as WarehouseIcon, UserCheck, FileText, ChevronLeft, ChevronRight, Trash2, Monitor, User as UserIcon
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';

const MotionTr = motion.tr as any;

interface SoldItemRecord {
  id: string;
  orderId: string;
  productName: string;
  qty: number;
  unitPrice: number;
  total: number;
  customerName: string;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Partial' | 'Credit';
  warehouse: string;
  processedBy: string;
  date: string;
}

const SoldItems: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProduct, setFilterProduct] = useState('All Products');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const [soldItems, setSoldItems] = useState<SoldItemRecord[]>([
    { id: 'SI-101', orderId: 'ORD-5001', productName: 'iPhone 15 Pro Max', qty: 1, unitPrice: 85000, total: 85000, customerName: 'Amanuel Girma', paymentMethod: 'Cash', paymentStatus: 'Paid', warehouse: 'Bole HQ', processedBy: 'Abebe K.', date: '2024-11-20' },
    { id: 'SI-102', orderId: 'ORD-5002', productName: 'Sony WH-1000XM5', qty: 2, unitPrice: 25000, total: 50000, customerName: 'Bethelhem Tesfaye', paymentMethod: 'Telebirr', paymentStatus: 'Paid', warehouse: 'Showroom', processedBy: 'Sara K.', date: '2024-11-21' },
    { id: 'SI-103', orderId: 'ORD-5003', productName: 'MacBook Air M3 15"', qty: 1, unitPrice: 145000, total: 145000, customerName: 'Dawit Mekonnen', paymentMethod: 'Bank Transfer', paymentStatus: 'Partial', warehouse: 'Bole HQ', processedBy: 'Henok T.', date: '2024-11-22' },
    { id: 'SI-104', orderId: 'ORD-5004', productName: 'Samsung Galaxy S24', qty: 1, unitPrice: 72000, total: 72000, customerName: 'Elias Habte', paymentMethod: 'Credit', paymentStatus: 'Credit', warehouse: 'Kality Depot', processedBy: 'Abebe K.', date: '2024-11-22' },
    { id: 'SI-105', orderId: 'ORD-5005', productName: 'iPhone 15 Pro Max', qty: 1, unitPrice: 85000, total: 85000, customerName: 'Sara Konjo', paymentMethod: 'Bank', paymentStatus: 'Paid', warehouse: 'Bole HQ', processedBy: 'Sara K.', date: '2024-11-23' },
    { id: 'SI-106', orderId: 'ORD-5006', productName: 'Galaxy Watch 6', qty: 1, unitPrice: 12000, total: 12000, customerName: 'Kassa Belay', paymentMethod: 'Cash', paymentStatus: 'Paid', warehouse: 'Mercato', processedBy: 'Henok T.', date: '2024-11-24' },
  ]);

  const filteredItems = useMemo(() => {
    return soldItems.filter(item => {
      const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) || item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProduct = filterProduct === 'All Products' || item.productName === filterProduct;
      const matchesStatus = filterStatus === 'All Status' || item.paymentStatus === filterStatus;
      const matchesStartDate = !startDate || item.date >= startDate;
      const matchesEndDate = !endDate || item.date <= endDate;
      return matchesSearch && matchesProduct && matchesStatus && matchesStartDate && matchesEndDate;
    });
  }, [soldItems, searchTerm, filterProduct, filterStatus, startDate, endDate]);

  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleDelete = (id: string) => {
    if (confirm('Delete this record?')) {
      setSoldItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.text("Sebrisat Pro ERP - Sales Registry", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Customer', 'Product', 'Qty', 'Total', 'Status', 'Warehouse', 'User', 'Date']],
      body: filteredItems.map(i => [i.id, i.customerName, i.productName, i.qty, i.total.toLocaleString(), i.paymentStatus, i.warehouse, i.processedBy, i.date]),
    });
    doc.save(`Sales_Report_${Date.now()}.pdf`);
  };

  const exportToExcel = () => {
    const headers = "ID,Customer,Product,Qty,Total,Status,Warehouse,User,Date\n";
    const rows = filteredItems.map(i => `${i.id},"${i.customerName}","${i.productName}",${i.qty},${i.total},${i.paymentStatus},"${i.warehouse}","${i.processedBy}",${i.date}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `Sales_Export_${Date.now()}.csv`; a.click();
  };

  return (
    <div className="space-y-6 md:space-y-10 pb-20 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 no-print">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white"><Monitor size={24} /></div>
            Sales Registry
          </h2>
          <p className="text-slate-500 dark:text-zinc-500 font-medium mt-1 text-sm">Unified transaction ledger for inventory control.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => window.print()} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Printer size={14} /> Print
          </button>
          <button onClick={exportToExcel} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <FileText size={14} /> Excel
          </button>
          <button onClick={exportToPDF} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 dark:shadow-none hover:scale-105 active:scale-95 transition-all">
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-6 no-print">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-end">
          <div className="space-y-2 lg:col-span-2">
            <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Terminal Search</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search ID, Customer, SKU..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <FilterSelect label="Status" value={filterStatus} onChange={setFilterStatus} options={['All Status', 'Paid', 'Partial', 'Credit']} icon={CreditCard} />
          <button onClick={() => { setSearchTerm(''); setFilterProduct('All Products'); setFilterStatus('All Status'); setStartDate(''); setEndDate(''); }} className="px-4 py-3.5 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95">Clear</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-50 dark:border-zinc-800">
           <div className="space-y-2 relative">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">From</label>
              <div className="relative">
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                <input type="date" className="w-full pl-11 pr-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold dark:text-white" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
           </div>
           <div className="space-y-2 relative">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">To</label>
              <div className="relative">
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                <input type="date" className="w-full pl-11 pr-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold dark:text-white" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
           </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-zinc-900 p-2 md:p-8 rounded-[32px] md:rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[1200px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-zinc-800/50">
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-zinc-800">ID</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-zinc-800">Customer</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-zinc-800">Product</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-zinc-800">Total</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-zinc-800">Status</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-zinc-800">Date</th>
                <th className="px-6 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-zinc-800 no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              <AnimatePresence mode='popLayout'>
                {paginatedItems.map((item) => (
                  <MotionTr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} key={item.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-all duration-200">
                    <td className="px-6 py-6"><span className="font-mono text-xs font-black text-indigo-600 uppercase">{item.id}</span></td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 font-black text-[10px]">{item.customerName.charAt(0)}</div>
                        <span className="font-black text-slate-900 dark:text-zinc-200 text-sm whitespace-nowrap">{item.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div>
                        <p className="font-black text-slate-800 dark:text-zinc-300 text-sm whitespace-nowrap">{item.productName}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Qty: {item.qty}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-black text-slate-900 dark:text-zinc-200 text-sm">ETB {item.total.toLocaleString()}</td>
                    <td className="px-6 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        item.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        item.paymentStatus === 'Partial' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>{item.paymentStatus}</span>
                    </td>
                    <td className="px-6 py-6 text-xs font-bold text-slate-500">{item.date}</td>
                    <td className="px-6 py-6 text-right no-print">
                      <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => alert(`View ${item.id}`)} className="p-2.5 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm transition-all"><Eye size={16} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2.5 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 text-slate-400 hover:text-rose-600 rounded-xl shadow-sm transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </MotionTr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-slate-50 dark:border-zinc-800 no-print">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {paginatedItems.length} of {filteredItems.length} Records</p>
           </div>
           <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 bg-slate-50 dark:bg-zinc-800 text-slate-400 rounded-xl disabled:opacity-30 active:scale-95"><ChevronLeft /></button>
              <span className="px-4 font-black text-sm">{currentPage} / {totalPages || 1}</span>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="p-2 bg-slate-50 dark:bg-zinc-800 text-slate-400 rounded-xl disabled:opacity-30 active:scale-95"><ChevronRight /></button>
           </div>
        </div>
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options, icon: Icon }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full pl-10 pr-10 py-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-700 dark:text-zinc-200 appearance-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer">
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
    </div>
  </div>
);

export default SoldItems;

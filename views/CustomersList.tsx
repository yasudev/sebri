
import React, { useState, useMemo } from 'react';
import { 
  Users2, 
  Search, 
  Plus, 
  Trash2, 
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  User,
  Building2,
  Globe,
  FileBarChart
} from 'lucide-react';

interface CustomerRecord {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  joinedAt: string;
}

interface CustomersListProps {
  onAdd?: () => void;
  onViewReport?: (name: string) => void;
}

const CustomersList: React.FC<CustomersListProps> = ({ onAdd, onViewReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [customers, setCustomers] = useState<CustomerRecord[]>([
    { 
      id: 'CUST-001', 
      companyName: 'Sebrisat Tech Solutions', 
      contactPerson: 'Amanuel Girma',
      email: 'info@sebrisat-tech.com', 
      phone: '+251 911 223 344', 
      address: 'Bole Road, Suite 402',
      city: 'Addis Ababa',
      state: 'AA',
      country: 'Ethiopia',
      joinedAt: '2024-01-15' 
    },
    { 
      id: 'CUST-002', 
      companyName: 'Mercato Electronics Retail', 
      contactPerson: 'Bethelhem Tesfaye',
      email: 'betty.retail@yahoo.com', 
      phone: '+251 920 334 455', 
      address: 'Mercato Central Market, block B',
      city: 'Addis Ababa',
      state: 'AA',
      country: 'Ethiopia',
      joinedAt: '2024-02-10' 
    },
    { 
      id: 'CUST-003', 
      companyName: 'Kality Distribution Co.', 
      contactPerson: 'Dawit Mekonnen',
      email: 'distribution@kality.et', 
      phone: '+251 930 445 566', 
      address: 'Industrial Zone, Plot 12',
      city: 'Addis Ababa',
      state: 'AA',
      country: 'Ethiopia',
      joinedAt: '2024-03-05' 
    }
  ]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const handleDelete = (id: string) => {
    if(confirm('Are you sure you want to remove this customer record?')) {
      setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <Users2 className="text-blue-600" size={32} />
            All Customers
          </h2>
          <p className="text-slate-500 font-medium mt-1">Full directory of companies and retail partners in the Sebrisat network.</p>
        </div>
        <div className="flex gap-3">
          <button className="hidden sm:flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-[24px] font-black text-sm shadow-sm hover:bg-slate-50 transition-all">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={20} strokeWidth={3} />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Building2 size={24} />
             </div>
             <div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Partner Registry</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{filteredCustomers.length} Records found</p>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search company, person, city..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-4 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 rounded-2xl shadow-sm transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Updated Table UI */}
        <div className="overflow-x-auto -mx-10">
          <table className="w-full min-w-[1300px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">#</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Name</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Contact</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Address</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Joined At</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCustomers.map((cust, idx) => (
                <tr key={cust.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <span className="font-mono text-sm font-black text-slate-300 group-hover:text-blue-400 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-lg shadow-blue-100 uppercase">
                        {cust.companyName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-base leading-none group-hover:text-blue-600 transition-colors uppercase tracking-tight">{cust.companyName}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{cust.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-900">
                        <User size={14} className="text-blue-400" />
                        <span className="text-sm font-bold">{cust.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Mail size={12} className="text-slate-300" />
                        <span className="text-[11px] font-medium">{cust.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Phone size={12} className="text-slate-300" />
                        <span className="text-[11px] font-bold font-mono">{cust.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-slate-600">
                         <MapPin size={14} className="text-rose-400 mt-0.5 shrink-0" />
                         <span className="text-xs font-bold leading-tight max-w-[200px]">{cust.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 ml-5">
                         <span className="text-[10px] font-black uppercase tracking-wider">{cust.city}, {cust.state}</span>
                         <span className="w-1 h-1 bg-slate-200 rounded-full" />
                         <Globe size={10} />
                         <span className="text-[10px] font-black uppercase tracking-wider">{cust.country}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-slate-400">
                       <Calendar size={14} />
                       <span className="text-xs font-bold">{cust.joinedAt}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => onViewReport?.(cust.companyName)}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 rounded-2xl shadow-sm transition-all group-hover:scale-110" title="View Financial Report"
                      >
                        <FileBarChart size={18} strokeWidth={2.5} />
                      </button>
                      <button 
                        onClick={() => handleDelete(cust.id)}
                        className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 rounded-2xl shadow-sm transition-all group-hover:scale-110"
                        title="Delete Customer"
                      >
                        <Trash2 size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-center px-10">
              <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-100">
                <Search size={48} />
              </div>
              <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">No Matches Found</h4>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2">Adjust your filters to locate the partner</p>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-slate-100">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Master Database Active • {new Date().toLocaleDateString()}</p>
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

export default CustomersList;

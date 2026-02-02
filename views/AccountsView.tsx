
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  ShieldCheck, 
  ShieldAlert, 
  Activity,
  Shield,
  Users,
  UserPlus,
  Filter,
  ArrowLeft,
  Save,
  Lock,
  Mail,
  Phone as PhoneIcon,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  privilege: 'Admin' | 'Finance' | 'Stock' | 'User';
  status: 'Active' | 'Suspended';
}

const AccountsView: React.FC = () => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- MOCK DATA FOR USERS ---
  const [users, setUsers] = useState<UserAccount[]>([
    { id: 'u1', name: 'Abebe Kebede', email: 'abebe@sebrisat.com', phone: '+251 911 223 344', privilege: 'Admin', status: 'Active' },
    { id: 'u2', name: 'Sara Konjo', email: 'sara.k@sebrisat.com', phone: '+251 912 334 455', privilege: 'Stock', status: 'Active' },
    { id: 'u3', name: 'Henok Tadesse', email: 'henok.t@sebrisat.com', phone: '+251 913 445 566', privilege: 'Finance', status: 'Active' },
    { id: 'u4', name: 'Mulugeta Tesfaye', email: 'mulu.t@sebrisat.com', phone: '+251 914 556 677', privilege: 'User', status: 'Suspended' },
    { id: 'u5', name: 'Almaz Ayana', email: 'almaz.a@sebrisat.com', phone: '+251 915 667 788', privilege: 'Finance', status: 'Active' },
    { id: 'u6', name: 'Kassa Belay', email: 'kassa.b@sebrisat.com', phone: '+251 916 778 899', privilege: 'User', status: 'Active' },
  ]);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    privilege: 'User' as UserAccount['privilege']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ACTIONS ---
  const handleDelete = (id: string) => {
    if (!confirm(`Are you sure you want to permanently delete this user account?`)) return;
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleEdit = (id: string) => {
    alert(`Editing User Account [ID: ${id}]`);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser: UserAccount = {
        id: `u${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        privilege: formData.privilege,
        status: 'Active'
      };
      setUsers(prev => [newUser, ...prev]);
      setIsSubmitting(false);
      setIsAddingUser(false);
      setFormData({ name: '', email: '', phone: '', password: '', privilege: 'User' });
    }, 800);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.privilege.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const getPrivilegeBadge = (priv: string) => {
    const styles: Record<string, string> = {
      Admin: 'bg-rose-50 text-rose-600 border-rose-100',
      Finance: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      Stock: 'bg-blue-50 text-blue-600 border-blue-100',
      User: 'bg-slate-50 text-slate-500 border-slate-100',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[priv] || styles.User}`}>
        {priv}
      </span>
    );
  };

  // --- RENDER CREATE FORM ---
  if (isAddingUser) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 pb-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAddingUser(false)}
            className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:shadow-md transition-all active:scale-90"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Add New User</h2>
            <p className="text-slate-500 font-medium">Configure credentials and system access levels.</p>
          </div>
        </div>

        <form onSubmit={handleCreateUser} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Abebe Kebede"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  type="email" 
                  placeholder="e.g. abebe@sebrisat.com"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative">
                <PhoneIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  type="tel" 
                  placeholder="e.g. +251 911 223 344"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Role</label>
              <div className="relative">
                <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <select 
                  className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 appearance-none outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all"
                  value={formData.privilege}
                  onChange={e => setFormData({...formData, privilege: e.target.value as UserAccount['privilege']})}
                >
                  <option value="Admin">Admin</option>
                  <option value="Finance">Finance</option>
                  <option value="Stock">Stock</option>
                  <option value="User">User</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-50">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  <span>Save User Account</span>
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={() => setIsAddingUser(false)}
              className="px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg hover:bg-slate-800 transition-all active:scale-95"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <ShieldCheck className="text-indigo-600" size={32} />
            Privileged Accounts
          </h2>
          <p className="text-slate-500 font-medium mt-1">Manage system users and their assigned access privileges.</p>
        </div>
        <button 
          onClick={() => setIsAddingUser(true)}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all"
        >
          <UserPlus size={20} strokeWidth={3} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Primary Table Control Card */}
      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active User Registry</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">{users.length} Total Users</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, email or role..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-4 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 rounded-2xl hover:border-indigo-100 transition-all shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* The Requested Table */}
        <div className="overflow-x-auto -mx-10">
          <table className="w-full min-w-[1000px] border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Action</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">#</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">User Details</th>
                <th className="px-6 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Contact</th>
                <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Privileged</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user, idx) => (
                <tr key={user.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleEdit(user.id)}
                        className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 rounded-xl transition-all shadow-sm group-hover:scale-110"
                        title="Edit Account"
                      >
                        <Pencil size={16} strokeWidth={2.5} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:border-rose-100 rounded-xl transition-all shadow-sm group-hover:scale-110"
                        title="Delete Account"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-mono text-sm font-black text-slate-300 group-hover:text-indigo-400 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm uppercase ${
                        user.status === 'Suspended' ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                      }`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-base leading-none mb-1 group-hover:text-indigo-600 transition-colors">{user.name}</p>
                        <p className="text-xs font-medium text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.status}</span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-500 font-mono">{user.phone}</p>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    {getPrivilegeBadge(user.privilege)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-center px-10">
              <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-100">
                <Search size={48} />
              </div>
              <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">No Users Found</h4>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2">Adjust your search to find specific staff accounts</p>
            </div>
          )}
        </div>

        {/* Table Pagination / Status Footer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-slate-100">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">System Synchronized • {new Date().toLocaleTimeString()}</p>
           </div>
           <div className="flex items-center gap-2">
              <button className="px-6 py-2.5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all">Previous</button>
              <button className="px-6 py-2.5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all">Next</button>
           </div>
        </div>
      </div>

      {/* Security Info Card */}
      <div className="bg-slate-900 p-12 rounded-[56px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_35%,_rgba(79,70,229,0.15)_0%,_transparent_50%)]" />
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-white/10 rounded-[32px] flex items-center justify-center text-indigo-400 border border-white/5 backdrop-blur-md">
               <Shield size={40} />
            </div>
            <div>
               <h4 className="text-2xl font-black tracking-tight">Role Based Access Control</h4>
               <p className="text-sm font-medium text-slate-400 mt-2 max-w-md">Privileges are strictly defined to ensure data integrity and security across the Sebrisat ERP environment.</p>
            </div>
         </div>
         <button className="w-full md:w-auto px-12 py-5 bg-white text-slate-900 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95 relative z-10">
           Audit Logs
         </button>
      </div>
    </div>
  );
};

export default AccountsView;

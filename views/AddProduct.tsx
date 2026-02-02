
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Box, 
  Tag, 
  Warehouse as WarehouseIcon,
  CheckCircle2,
  Layers,
  Ruler,
  FileText,
  Upload,
  X,
  ShieldCheck,
  Truck,
  Hash,
  Plus,
  Percent,
  ChevronDown
} from 'lucide-react';
import { MOCK_WAREHOUSES } from '../constants.tsx';
import { Category } from '../types';

interface AddProductProps {
  onBack: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Satellite Gear' as Category,
    brand: 'Tiger',
    unit: 'Pcs',
    supplier: '',
    price: '',
    cost: '',
    stock: '',
    warrantyMonths: '12',
    warehouseIds: [] as string[],
    description: '',
    image: null as string | null,
    serialNumbers: [] as string[]
  });

  const [currentSerial, setCurrentSerial] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onBack();
      }, 1500);
    }, 1000);
  };

  const toggleWarehouse = (id: string) => {
    setFormData(prev => ({
      ...prev,
      warehouseIds: prev.warehouseIds.includes(id) 
        ? prev.warehouseIds.filter(w => w !== id) 
        : [...prev.warehouseIds, id]
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSerial = () => {
    if (currentSerial && !formData.serialNumbers.includes(currentSerial)) {
      setFormData(prev => ({
        ...prev,
        serialNumbers: [...prev.serialNumbers, currentSerial.toUpperCase()]
      }));
      setCurrentSerial('');
    }
  };

  const removeSerial = (serial: string) => {
    setFormData(prev => ({
      ...prev,
      serialNumbers: prev.serialNumbers.filter(s => s !== serial)
    }));
  };

  const numPrice = Number(formData.price) || 0;
  const numCost = Number(formData.cost) || 0;
  const profit = numPrice - numCost;
  const margin = numPrice > 0 ? (profit / numPrice) * 100 : 0;

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-50">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Inventory Updated!</h2>
        <p className="text-slate-500 font-bold">The hardware entry has been successfully logged into Central Stock.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:shadow-md transition-all active:scale-90"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">New Hardware Entry</h2>
            <p className="text-slate-500 font-medium">Register physical assets, serial numbers, and warranty terms.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Core Identity */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-50 dark:border-zinc-800 pb-6">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                  <Box size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Core Identity</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                  <input required type="text" placeholder="e.g. Tiger T8 High Class V2 Receiver" className="w-full px-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal SKU</label>
                  <div className="relative">
                    <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input required type="text" placeholder="e.g. SN-RECV-101" className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brand</label>
                  <div className="relative">
                    <select className="w-full px-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})}>
                      <option>Tiger</option>
                      <option>Eurostar</option>
                      <option>Sony</option>
                      <option>Dahua</option>
                      <option>Gecen</option>
                      <option>Generic</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <div className="relative">
                    <Layers size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <select className="w-full pl-12 pr-10 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Category})}>
                      <option value="Satellite Gear">Satellite Gear</option>
                      <option value="Televisions">Televisions</option>
                      <option value="Security Systems">Security Systems</option>
                      <option value="Computing & Media">Computing & Media</option>
                      <option value="Connectivity">Connectivity</option>
                      <option value="Subscriptions">Subscriptions</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit</label>
                  <div className="relative">
                    <Ruler size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <select className="w-full pl-12 pr-10 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
                      <option>Pcs</option>
                      <option>Box</option>
                      <option>Roll</option>
                      <option>Set</option>
                      <option>Month (Service)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description / Spec List</label>
                <div className="relative">
                  <FileText size={18} className="absolute left-4 top-5 text-slate-300" />
                  <textarea rows={3} placeholder="Technical specifications, features, and bundle contents..." className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-[28px] font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>
            </div>

            {/* 2. Procurement & Warranty */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-50 dark:border-zinc-800 pb-6">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                  <Truck size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Procurement & Warranty</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lead Supplier</label>
                  <div className="relative">
                    <select className="w-full px-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer" value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})}>
                      <option value="">Select Supplier...</option>
                      <option>Global Electronics Co.</option>
                      <option>Smart Parts Ltd.</option>
                      <option>Addis Tech Importers</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Warranty Period (Months)</label>
                  <div className="relative">
                    <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input type="number" placeholder="12" className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all" value={formData.warrantyMonths} onChange={e => setFormData({...formData, warrantyMonths: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Purchase Cost (ETB)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Br</span>
                    <input required type="number" step="0.01" placeholder="0.00" className="w-full pl-10 pr-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all" value={formData.cost} onChange={e => setFormData({...formData, cost: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Selling Price (ETB)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Br</span>
                    <input required type="number" step="0.01" placeholder="0.00" className="w-full pl-10 pr-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Profit Preview */}
              <div className="bg-emerald-50/50 dark:bg-emerald-500/5 rounded-3xl p-6 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 rounded-xl flex items-center justify-center">
                      <Percent size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projected Margin</p>
                      <p className="text-sm font-black text-emerald-600">Expected profitability based on price inputs</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-black text-emerald-600 tracking-tighter">Br {profit.toLocaleString()} <span className="text-xs font-bold opacity-60">({margin.toFixed(1)}%)</span></p>
                </div>
              </div>
            </div>

            {/* 3. Serial Number Registry */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-800 pb-6">
                <div className="flex items-center gap-3">
                   <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl">
                      <Hash size={24} />
                   </div>
                   <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Serial Registry</h3>
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-zinc-800 px-3 py-1 rounded-full">{formData.serialNumbers.length} Registered</span>
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1">
                   <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                   <input 
                    type="text" 
                    placeholder="Scan or type serial number..." 
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 transition-all" 
                    value={currentSerial}
                    onChange={e => setCurrentSerial(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSerial())}
                   />
                </div>
                <button 
                  type="button"
                  onClick={addSerial}
                  className="px-6 bg-amber-500 text-white rounded-2xl font-black hover:bg-amber-600 active:scale-95 transition-all shadow-lg shadow-amber-100 dark:shadow-none"
                >
                  <Plus size={24} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {formData.serialNumbers.map(sn => (
                  <div key={sn} className="flex items-center gap-2 pl-3 pr-1 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 rounded-xl font-mono text-[11px] font-black border border-slate-200 dark:border-zinc-700 group">
                    {sn}
                    <button onClick={() => removeSerial(sn)} className="p-1 hover:bg-rose-500 hover:text-white rounded-lg transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {formData.serialNumbers.length === 0 && (
                  <div className="w-full py-4 text-center border-2 border-dashed border-slate-100 dark:border-zinc-800 rounded-2xl">
                     <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">No serials logged for this batch</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Image Section */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Product Media</h3>
              <div className="relative group aspect-square rounded-[36px] border-2 border-dashed border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-indigo-200">
                {formData.image ? (
                  <>
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                      className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <Upload size={40} className="text-slate-300 mb-4 group-hover:text-indigo-400 transition-colors" />
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest text-center px-6">Upload High-res Product Photo</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>

            {/* Warehouse Management */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Inventory Logic</h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Opening Stock</label>
                <input required type="number" placeholder="Total available" className="w-full px-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Distribution Network</label>
                <div className="space-y-2">
                  {MOCK_WAREHOUSES.map(wh => (
                    <button
                      key={wh.id}
                      type="button"
                      onClick={() => toggleWarehouse(wh.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        formData.warehouseIds.includes(wh.id)
                          ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/50 text-indigo-600 dark:text-indigo-400'
                          : 'bg-slate-50 dark:bg-zinc-800 border-transparent text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <WarehouseIcon size={18} />
                        <span className="text-sm font-bold">{wh.name}</span>
                      </div>
                      {formData.warehouseIds.includes(wh.id) && <CheckCircle2 size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full py-6 bg-indigo-600 text-white rounded-[32px] font-black text-xl shadow-2xl shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-3 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={24} />
                    <span>Save Product</span>
                  </>
                )}
              </button>
              <button 
                type="button" 
                onClick={onBack} 
                className="w-full py-6 bg-slate-900 dark:bg-zinc-800 text-white rounded-[32px] font-black text-xl hover:bg-slate-800 dark:hover:bg-zinc-700 transition-all active:scale-95"
              >
                Discard Entry
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

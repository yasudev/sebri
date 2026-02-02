
import React, { useState } from 'react';
// Add ChevronDown to imports and remove unused CreditCard
import { 
  ArrowLeft, 
  Save, 
  UserSquare2, 
  Navigation, 
  ChevronDown,
  CheckCircle2,
  Truck
} from 'lucide-react';

interface AddDriverProps {
  onBack: () => void;
}

const AddDriver: React.FC<AddDriverProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    vehicleType: '',
    plateNumber: '',
    defaultCost: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onBack();
      }, 1500);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-rose-50">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Driver Registered!</h2>
        <p className="text-slate-500 font-bold">The driver has been successfully added to the active fleet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:shadow-md transition-all active:scale-90"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Register New Driver</h2>
          <p className="text-slate-500 font-medium">Onboard a new driver to the Sebrisat logistics network.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Driver Name */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Driver Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <UserSquare2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  type="text" 
                  placeholder="e.g. George Meelalii"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            {/* Vehicle Type */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Assigned Vehicle Type <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Navigation size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <select 
                  required
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 appearance-none transition-all cursor-pointer"
                  value={formData.vehicleType}
                  onChange={e => setFormData({...formData, vehicleType: e.target.value})}
                >
                  <option value="">Select Type</option>
                  <option value="test">test</option>
                  <option value="Small Truck">Small Truck</option>
                  <option value="Heavy Duty Van">Heavy Duty Van</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Plate Number */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Plate Number
              </label>
              <div className="relative">
                <Truck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="e.g. A73352"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all font-mono"
                  value={formData.plateNumber}
                  onChange={e => setFormData({...formData, plateNumber: e.target.value})}
                />
              </div>
            </div>

            {/* Trip Cost */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Driver Trip Cost (ETB) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Br</span>
                <input 
                  required
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  value={formData.defaultCost}
                  onChange={e => setFormData({...formData, defaultCost: e.target.value})}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-bold ml-1 italic">This can be an override for the default vehicle trip cost.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-5 bg-rose-600 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-rose-100 flex items-center justify-center gap-3 hover:bg-rose-700 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  <span>Onboard Driver</span>
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg hover:bg-slate-800 transition-all active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;

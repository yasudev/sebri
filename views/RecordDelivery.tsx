
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  PackageCheck, 
  User, 
  Navigation, 
  Calendar, 
  Clock,
  ClipboardList,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface RecordDeliveryProps {
  onBack: () => void;
}

const RecordDelivery: React.FC<RecordDeliveryProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    driver: '',
    vehicleType: '',
    itemsSent: '',
    tripCost: '',
    status: 'Pending',
    notes: ''
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
        <h2 className="text-3xl font-black text-slate-900 mb-2">Delivery Recorded!</h2>
        <p className="text-slate-500 font-bold">The delivery trip has been successfully logged.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:shadow-md transition-all active:scale-90"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Record Delivery</h2>
          <p className="text-slate-500 font-medium">Log a new trip and track inventory movement in the field.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Date & Time */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Delivery Date</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  type="date" 
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dispatch Time</label>
              <div className="relative">
                <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  required
                  type="time" 
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>

            {/* Driver & Vehicle */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Driver</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <select 
                  required
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 appearance-none transition-all cursor-pointer"
                  value={formData.driver}
                  onChange={e => setFormData({...formData, driver: e.target.value})}
                >
                  <option value="">Select Driver</option>
                  <option value="George Meelalii">George Meelalii</option>
                  <option value="Test2">Test2</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vehicle Type</label>
              <div className="relative">
                <Navigation size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <select 
                  required
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 appearance-none transition-all cursor-pointer"
                  value={formData.vehicleType}
                  onChange={e => setFormData({...formData, vehicleType: e.target.value})}
                >
                  <option value="">Select Vehicle</option>
                  <option value="test">test</option>
                  <option value="Small Truck">Small Truck</option>
                </select>
              </div>
            </div>

            {/* Items & Cost */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Items for Delivery</label>
              <div className="relative">
                <ClipboardList size={18} className="absolute left-4 top-5 text-slate-300" />
                <textarea 
                  required
                  placeholder="e.g. 5x Sony WH-1000XM5, 2x iPhone 15 Pro..."
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all min-h-[100px]"
                  value={formData.itemsSent}
                  onChange={e => setFormData({...formData, itemsSent: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Trip Cost (ETB)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Br</span>
                <input 
                  required
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  value={formData.tripCost}
                  onChange={e => setFormData({...formData, tripCost: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Returned">Returned</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Internal Notes</label>
              <input 
                type="text" 
                placeholder="Reason for delay, special instructions, etc."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
              />
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
                  <span>Save Delivery Record</span>
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

export default RecordDelivery;

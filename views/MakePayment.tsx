
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Wallet2, 
  User, 
  Calendar, 
  Navigation,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface MakePaymentProps {
  onBack: () => void;
}

const MakePayment: React.FC<MakePaymentProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    driver: '',
    vehicleType: '',
    amount: '',
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

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 pb-20">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-rose-50">
            <CheckCircle2 size={48} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Payment Settled!</h2>
          <p className="text-slate-500 font-bold">The driver payment has been successfully recorded.</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:shadow-md transition-all active:scale-90"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Make Driver Payment</h2>
              <p className="text-slate-500 font-medium">Clear outstanding balances and record settlements.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Date</label>
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

                {/* Driver Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Driver</label>
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

                {/* Vehicle Type */}
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
                      <option value="">Select Type</option>
                      <option value="test">test</option>
                      <option value="Small Truck">Small Truck</option>
                    </select>
                  </div>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Settlement Amount (ETB)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Br</span>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                      value={formData.amount}
                      onChange={e => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Reference / Notes</label>
                  <input 
                    type="text" 
                    placeholder="Voucher ID, Bank Ref, or specific reason..."
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
                      <Wallet2 size={20} />
                      <span>Settle Payment</span>
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
        </>
      )}
    </div>
  );
};

export default MakePayment;

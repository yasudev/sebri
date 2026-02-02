
import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Truck, 
  ShoppingBag, 
  CreditCard,
  Clock,
  MapPin,
  User,
  ArrowRight
} from 'lucide-react';

interface ERPEvent {
  id: string;
  date: string;
  title: string;
  type: 'delivery' | 'procurement' | 'credit';
  details: string;
  amount?: string;
}

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // Start at Nov 2025 for mock visibility
  const [selectedDate, setSelectedDate] = useState<string>('2025-11-21');

  // Unified Project/Event Data
  const events: ERPEvent[] = useMemo(() => [
    { id: 'd1', date: '2025-11-21', title: 'Adhesive Dispatch', type: 'delivery', details: 'Driver: George Meelalii • Mercato' },
    { id: 'p1', date: '2025-11-15', title: 'Sony Order Arrival', type: 'procurement', details: 'Vendor: Global Electronics Co.' },
    { id: 'c1', date: '2025-11-15', title: 'John Doe Installment', type: 'credit', details: 'Monthly Repayment', amount: 'Br 1,200' },
    { id: 'd2', date: '2025-11-10', title: 'Sony TV Delivery', type: 'delivery', details: 'Driver: Test2 • Bole HQ' },
    { id: 'p2', date: '2025-11-28', title: 'Smart Parts Shipment', type: 'procurement', details: 'Batch #202-A' },
    { id: 'c2', date: '2025-11-21', title: 'Jane Smith Payment', type: 'credit', details: 'Final Settlement', amount: 'Br 5,500' },
  ], []);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const formatDay = (day: number) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return d.toISOString().split('T')[0];
  };

  const selectedDayEvents = events.filter(e => e.date === selectedDate);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <CalendarIcon className="text-indigo-600" size={32} />
            Project Hub
          </h2>
          <p className="text-slate-500 font-medium mt-1">Timeline of deliveries, payments, and procurement.</p>
        </div>

        <div className="flex items-center bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all"><ChevronLeft /></button>
          <div className="px-6 text-sm font-black text-slate-900 uppercase tracking-widest min-w-[180px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all"><ChevronRight /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Calendar Grid */}
        <div className="xl:col-span-3 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
          <div className="grid grid-cols-7 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest py-4">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100">
            {/* Empty space for first day offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-slate-50/50 aspect-square" />
            ))}

            {/* Actual Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = formatDay(dayNum);
              const isSelected = selectedDate === dateStr;
              const dayEvents = events.filter(e => e.date === dateStr);
              const isToday = new Date().toISOString().split('T')[0] === dateStr;

              return (
                <div 
                  key={dayNum} 
                  onClick={() => setSelectedDate(dateStr)}
                  className={`bg-white aspect-square p-3 cursor-pointer group transition-all relative hover:z-10 ${
                    isSelected ? 'ring-2 ring-indigo-500 ring-inset z-10' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-sm font-black transition-colors ${
                    isSelected ? 'text-indigo-600' : isToday ? 'text-blue-500' : 'text-slate-400'
                  }`}>
                    {dayNum}
                  </span>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {dayEvents.slice(0, 3).map(e => (
                      <div key={e.id} className={`w-1.5 h-1.5 rounded-full ${
                        e.type === 'delivery' ? 'bg-rose-500' : 
                        e.type === 'procurement' ? 'bg-blue-500' : 'bg-emerald-500'
                      }`} />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[8px] font-black text-slate-300">+{dayEvents.length - 3}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-6 px-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deliveries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Supplier Orders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Credits</span>
            </div>
          </div>
        </div>

        {/* Sidebar Agenda */}
        <div className="bg-slate-900 rounded-[48px] p-10 text-white flex flex-col shadow-2xl">
          <div className="mb-10">
            <h3 className="text-xl font-black mb-1">Daily Agenda</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              {new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-hide">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map(event => (
                <div key={event.id} className="bg-white/5 border border-white/10 rounded-[32px] p-6 space-y-4 hover:bg-white/10 transition-all group">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl ${
                      event.type === 'delivery' ? 'bg-rose-500/20 text-rose-400' :
                      event.type === 'procurement' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {event.type === 'delivery' ? <Truck size={20} /> : 
                       event.type === 'procurement' ? <ShoppingBag size={20} /> : <CreditCard size={20} />}
                    </div>
                    {event.amount && <span className="font-black text-emerald-400 text-sm">{event.amount}</span>}
                  </div>
                  
                  <div>
                    <h4 className="font-black text-base leading-tight group-hover:text-indigo-400 transition-colors">{event.title}</h4>
                    <p className="text-[11px] font-bold text-slate-500 mt-2 flex items-center gap-2">
                      <Clock size={12} /> {event.details}
                    </p>
                  </div>
                  
                  <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-indigo-600 group-hover:border-transparent transition-all flex items-center justify-center gap-2">
                    View Record <ArrowRight size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-30">
                <Clock size={48} className="mb-4" />
                <p className="font-black uppercase text-xs tracking-widest">No Projects Scheduled</p>
              </div>
            )}
          </div>
          
          <div className="pt-8 mt-8 border-t border-white/10">
             <div className="flex justify-between items-center px-2">
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Events</p>
                  <p className="text-2xl font-black">{selectedDayEvents.length}</p>
               </div>
               <button className="p-4 bg-indigo-600 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-900">
                  <CalendarIcon size={24} />
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;


import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Search, 
  Warehouse as WarehouseIcon, 
  ChevronDown,
  CheckCircle2,
  Wallet,
  CreditCard,
  Banknote,
  Send,
  ArrowUp,
  User,
  Smartphone
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CUSTOMERS, MOCK_WAREHOUSES } from '../constants.tsx';
import { Product } from '../types';

const Sales: React.FC = () => {
  const [cart, setCart] = useState<{product: Product, qty: number}[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>(MOCK_WAREHOUSES[0].id);
  const [paymentType, setPaymentType] = useState<string>('Full paid');
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? {...item, qty: item.qty + 1} : item);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.product.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ).filter(item => item.qty > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesWarehouse = selectedWarehouseId === 'all' || p.warehouseIds?.includes(selectedWarehouseId);
      return matchesSearch && matchesWarehouse;
    });
  }, [searchTerm, selectedWarehouseId]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500 pb-10">
      {/* Left Column: Product Selection Area */}
      <div className="flex-1 space-y-6">
        {/* Filter Controls */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-slate-100 dark:border-zinc-800 shadow-sm">
          <div className="mb-6">
            <h3 className="text-indigo-500 font-black text-lg tracking-tight">Select Warehouse</h3>
            <p className="text-slate-400 text-sm font-medium">Filtering catalog by location availability</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-1/2">
              <select 
                className="w-full pl-4 pr-10 py-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-700 dark:text-zinc-200 appearance-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                value={selectedWarehouseId}
                onChange={(e) => setSelectedWarehouseId(e.target.value)}
              >
                <option value="all">All Warehouses</option>
                {MOCK_WAREHOUSES.map(wh => (
                  <option key={wh.id} value={wh.id}>{wh.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown size={20} />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-1/2">
               <div className="relative w-full">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                   <Search size={20} />
                 </div>
                 <input 
                  type="text" 
                  placeholder="Search model, brand or SKU..." 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
               </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm min-h-[600px]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Available Inventory</h2>
            <span className="text-slate-400 font-black text-xs uppercase tracking-widest bg-slate-50 dark:bg-zinc-800 px-4 py-2 rounded-full border border-slate-100 dark:border-zinc-700">
              {filteredProducts.length} Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map(p => (
              <div 
                key={p.id} 
                onClick={() => addToCart(p)}
                className="group bg-white dark:bg-zinc-900 p-5 rounded-[36px] border border-slate-50 dark:border-zinc-800 hover:border-indigo-100 dark:hover:border-indigo-900 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[1.5/1] rounded-[28px] bg-slate-50 dark:bg-zinc-800 mb-5 overflow-hidden relative border border-slate-100 dark:border-zinc-700 flex items-center justify-center">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08] group-hover:opacity-[0.15] transition-opacity">
                     <span className="text-indigo-900 dark:text-indigo-200 font-black text-5xl transform -rotate-15 uppercase tracking-tighter">Sebrisat</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-slate-800 dark:text-zinc-100 text-lg leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{p.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.brand} • {p.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-0.5">
                      <p className="font-black text-indigo-600 dark:text-indigo-400 text-2xl tracking-tighter">{p.price.toFixed(2)}</p>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Birr</p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black px-4 py-2 flex items-center justify-center rounded-2xl text-[10px] border border-emerald-100 dark:border-emerald-900/50 shadow-sm uppercase tracking-widest">
                      {p.stock} Unit
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Checkout / Order Sidebar */}
      <div className="w-full lg:w-[460px]">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[48px] border border-slate-100 dark:border-zinc-800 shadow-2xl sticky top-6 flex flex-col h-[calc(100vh-140px)]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Current Order</h3>
            <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-2xl font-black text-sm shadow-lg shadow-indigo-200">
              {cart.length}
            </div>
          </div>

          <div className="space-y-5 mb-8">
            {/* Customer Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                <User size={12} className="text-indigo-500" /> Customer Information
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="Walking Customer"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
              </div>
            </div>

            {/* Payment Configuration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Type</label>
                <div className="relative">
                  <select 
                    className="w-full pl-4 pr-10 py-4 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-zinc-200 appearance-none outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <option value="Full paid">Full paid</option>
                    <option value="Credit">Credit</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>

              {/* Payment Method Dropdown - Always visible or conditional as per design, but updated options */}
              <div className="space-y-1.5 transition-all duration-300">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Method</label>
                <div className="relative">
                  <select 
                    className="w-full pl-4 pr-10 py-4 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold text-slate-800 dark:text-zinc-200 appearance-none outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Telebirr">Telebirr</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Cart Items Area */}
          <div className="flex-1 space-y-6 pt-6 border-t border-slate-100 dark:border-zinc-800 overflow-y-auto pr-2 scrollbar-hide">
            {cart.map(item => (
              <div key={item.product.id} className="space-y-4 animate-in slide-in-from-right-4 duration-300 group">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-black text-slate-900 dark:text-white text-base leading-tight group-hover:text-indigo-600 transition-colors">{item.product.name}</h5>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">SN: {item.product.sku}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-[20px] px-5 py-3 flex-1 flex justify-between items-center">
                    <span className="font-black text-slate-900 dark:text-white text-lg">{item.product.price.toFixed(2)}</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase ml-2 tracking-widest">Birr</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-zinc-700 p-1.5 rounded-[22px]">
                    <button 
                      onClick={() => updateQty(item.product.id, -1)}
                      className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-slate-700 dark:text-zinc-200 hover:text-indigo-600 hover:shadow-md transition-all active:scale-90"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-10 text-center font-black text-slate-900 dark:text-white text-lg">{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item.product.id, 1)}
                      className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-slate-700 dark:text-zinc-200 hover:text-indigo-600 hover:shadow-md transition-all active:scale-90"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-zinc-700 py-12">
                <div className="w-24 h-24 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-slate-200 dark:border-zinc-700">
                  <Smartphone size={40} className="opacity-20" />
                </div>
                <p className="font-black text-xl">The cart is empty</p>
                <p className="text-sm font-bold uppercase tracking-widest mt-1 opacity-50">Select items from inventory</p>
              </div>
            )}
          </div>

          {/* Checkout Totals & Final Button */}
          <div className="pt-8 border-t border-slate-100 dark:border-zinc-800 space-y-4 mt-auto">
            <div className="space-y-2 px-2">
              <div className="flex justify-between text-slate-400 font-black text-[10px] uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-slate-900 dark:text-zinc-200">{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-black text-[10px] uppercase tracking-widest">
                <span>VAT (15%)</span>
                <span className="text-slate-900 dark:text-zinc-200">{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-5 px-2 border-t border-slate-100 dark:border-zinc-800">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Total Amount</span>
              <div className="text-right">
                <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter leading-none">{total.toFixed(2)}</span>
                <span className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1.5">Ethiopian Birr</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <button 
                disabled={cart.length === 0}
                className="flex-1 py-5.5 bg-indigo-600 text-white rounded-[32px] font-black text-xl shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none group"
              >
                <span>Complete Sale</span>
                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              
              <button 
                disabled={cart.length === 0}
                className="w-18 h-18 bg-emerald-500 text-white rounded-[24px] shadow-xl shadow-emerald-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100"
                title="Finish Transaction"
              >
                <ArrowUp size={36} />
              </button>
            </div>
            
            <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-6">
              {paymentType === 'Credit' ? 'CREDIT FACILITY TRANSACTION • SEBRISAT SUITE' : `SETTLEMENT VIA ${paymentMethod.toUpperCase()} • FULLY PAID`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;

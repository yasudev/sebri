
import React from 'react';
import { 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Banknote, 
  User, 
  ReceiptText,
  Search
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CUSTOMERS } from '../constants.tsx';
import { Product } from '../types';

const Sales: React.FC = () => {
  const [cart, setCart] = React.useState<{product: Product, qty: number}[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

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

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Terminal</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Quick search..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
            {filteredProducts.map(p => (
              <div 
                key={p.id} 
                onClick={() => addToCart(p)}
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
              >
                <div className="aspect-square rounded-2xl bg-slate-100 mb-3 overflow-hidden">
                  <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{p.name}</h4>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-black text-indigo-600">${p.price}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{p.stock} In Stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[400px] flex flex-col bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden text-white border-8 border-slate-800">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Checkout</h3>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{cart.length} Items</span>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 mb-6">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
              <User size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</p>
              <select className="bg-transparent border-none text-sm font-bold w-full outline-none p-0 cursor-pointer">
                <option className="text-slate-900">Walk-in Customer</option>
                {MOCK_CUSTOMERS.map(c => <option key={c.id} value={c.id} className="text-slate-900">{c.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <ReceiptText className="text-slate-600" />
              </div>
              <p className="font-bold text-slate-500">Cart is empty</p>
              <p className="text-xs text-slate-600 mt-1">Add items to start processing sale</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 shrink-0">
                  <img src={item.product.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm line-clamp-1">{item.product.name}</h5>
                  <p className="text-xs font-bold text-indigo-400">${item.product.price} × {item.qty}</p>
                </div>
                <div className="flex items-center bg-white/5 rounded-xl border border-white/10">
                  <button onClick={() => updateQty(item.product.id, -1)} className="p-2 hover:bg-white/10 transition-colors">
                    {item.qty === 1 ? <Trash2 size={14} className="text-rose-400" /> : <Minus size={14} />}
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                  <button onClick={() => updateQty(item.product.id, 1)} className="p-2 hover:bg-white/10 transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 bg-slate-950/50 backdrop-blur-md space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-slate-400 font-bold text-sm">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400 font-bold text-sm">
              <span>Tax (0%)</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/5">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-2xl font-black text-indigo-400">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all">
              <Banknote size={20} className="text-emerald-400" />
              <span className="text-xs font-bold">Cash</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all">
              <CreditCard size={20} className="text-indigo-400" />
              <span className="text-xs font-bold">Credit Plan</span>
            </button>
          </div>

          <button 
            disabled={cart.length === 0}
            className="w-full py-5 bg-indigo-600 disabled:bg-slate-700 hover:bg-indigo-700 rounded-[24px] font-black text-lg transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            Complete Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sales;


import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  ChevronDown, 
  Calendar,
  User,
  Truck,
  CreditCard,
  ShoppingBag,
  Package
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CUSTOMERS } from '../constants.tsx';

interface AddSupplierOrderProps {
  onBack: () => void;
}

interface OrderItem {
  id: string;
  productId: string;
  qty: number;
  purchasePrice: number;
  sellingPrice: number;
}

const AddSupplierOrder: React.FC<AddSupplierOrderProps> = ({ onBack }) => {
  const [orderType, setOrderType] = useState('Direct to Customer (Dropship)');
  const [supplier, setSupplier] = useState('');
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [customer, setCustomer] = useState('');
  const [supplierPayment, setSupplierPayment] = useState('Credit');
  const [customerPayment, setCustomerPayment] = useState('Paid');
  
  const [items, setItems] = useState<OrderItem[]>([
    { id: '1', productId: '', qty: 1, purchasePrice: 0, sellingPrice: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), productId: '', qty: 1, purchasePrice: 0, sellingPrice: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Auto-fill prices if product is selected
        if (field === 'productId') {
          const product = MOCK_PRODUCTS.find(p => p.id === value);
          if (product) {
            updated.purchasePrice = product.cost;
            updated.sellingPrice = product.price;
          }
        }
        return updated;
      }
      return item;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:shadow-md transition-all active:scale-90"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create Supplier Order</h2>
          <p className="text-slate-500 font-medium">Draft a new procurement or dropship request.</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-12">
        {/* Main Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              Order Type <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
              >
                <option>Direct to Customer (Dropship)</option>
                <option>Stock Procurement (Regular)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              Supplier <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              >
                <option value="">Select Supplier</option>
                <option>Global Electronics Co.</option>
                <option>Smart Parts Ltd.</option>
                <option>Addis Tech Importers</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              Order Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              <input 
                type="date"
                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </div>
          </div>

          <div className={`space-y-2 transition-opacity ${orderType.includes('Dropship') ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              Customer (for Dropship) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              >
                <option value="">Select Customer</option>
                {MOCK_CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              Supplier Payment <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={supplierPayment}
                onChange={(e) => setSupplierPayment(e.target.value)}
              >
                <option>Credit</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              Customer Payment <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={customerPayment}
                onChange={(e) => setCustomerPayment(e.target.value)}
              >
                <option>Paid</option>
                <option>Credit</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        {/* Product Selection Table */}
        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-6 pb-4 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
            <div className="col-span-5">Product</div>
            <div className="col-span-1">Qty</div>
            <div className="col-span-3">Purchase Price</div>
            <div className="col-span-2">Selling Price</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-6 items-center group animate-in slide-in-from-left-4 duration-300 px-4 py-2 hover:bg-slate-50 rounded-[20px] transition-all">
                <div className="col-span-5">
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none shadow-sm"
                      value={item.productId}
                      onChange={(e) => updateItem(item.id, 'productId', e.target.value)}
                    >
                      <option value="">Select a Product</option>
                      {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  </div>
                </div>
                <div className="col-span-1">
                  <input 
                    type="number"
                    min="1"
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    value={item.qty}
                    onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-3">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Br</span>
                    <input 
                      type="number"
                      className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                      value={item.purchasePrice}
                      onChange={(e) => updateItem(item.id, 'purchasePrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Br</span>
                    <input 
                      type="number"
                      className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                      value={item.sellingPrice}
                      onChange={(e) => updateItem(item.id, 'sellingPrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="col-span-1 text-right">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={addItem}
            className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={18} strokeWidth={3} />
            <span>Add Item</span>
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-12 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="px-10 py-5 text-slate-500 font-black text-lg uppercase tracking-widest hover:text-slate-900 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Supplier Order Created Successfully!');
                onBack();
              }}
              className="px-12 py-5 bg-[#10b981] text-white rounded-[24px] font-black text-xl shadow-2xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <Save size={24} />
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierOrder;

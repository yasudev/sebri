
import React from 'react';
import { Plus, Award, MoreVertical, Search } from 'lucide-react';

interface BrandsProps {
  onAdd?: () => void;
}

const Brands: React.FC<BrandsProps> = ({ onAdd }) => {
  const brands = [
    { name: 'Apple', origin: 'USA', products: 42 },
    { name: 'Samsung', origin: 'South Korea', products: 38 },
    { name: 'Sony', origin: 'Japan', products: 12 },
    { name: 'Dell', origin: 'USA', products: 8 },
    { name: 'JBL', origin: 'USA', products: 22 },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Brand Catalog</h2>
          <p className="text-slate-500 font-medium">Manage manufacturer entities.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#10b981] text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:scale-105 transition-all"
        >
          <Plus size={20} strokeWidth={3} />
          <span>Register Brand</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-slate-50 rounded-[20px] flex items-center justify-center text-[#10b981] group-hover:bg-[#10b981] group-hover:text-white transition-all duration-500">
                <Award size={32} />
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-1">{brand.name}</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{brand.origin}</p>
            <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Stock</span>
              <span className="font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{brand.products} SKUs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;

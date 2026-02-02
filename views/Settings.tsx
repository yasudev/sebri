
import React, { useState } from 'react';
import { 
  Building2, 
  Warehouse as WarehouseIcon, 
  Settings as SettingsIcon, 
  MapPin, 
  Phone, 
  Plus, 
  ChevronRight, 
  ShieldCheck, 
  User, 
  Box, 
  ToggleLeft, 
  ToggleRight, 
  X, 
  Store, 
  Briefcase, 
  Building, 
  Pencil, 
  Trash2 
} from 'lucide-react';
import { MOCK_LOCATIONS as INITIAL_LOCATIONS, MOCK_WAREHOUSES as INITIAL_WAREHOUSES } from '../constants.tsx';
import { Warehouse, BusinessLocation } from '../types';

type SettingsTab = 'general' | 'locations' | 'warehouses';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [locations, setLocations] = useState<BusinessLocation[]>(INITIAL_LOCATIONS);
  const [warehouses, setWarehouses] = useState<Warehouse[]>(INITIAL_WAREHOUSES);

  const [isAddingWarehouse, setIsAddingWarehouse] = useState(false);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [warehouseForm, setWarehouseForm] = useState<Partial<Warehouse>>({
    name: '',
    location: '',
    inventoryOverride: false,
    capacity: '',
    supervisor: ''
  });

  const [locationForm, setLocationForm] = useState<Partial<BusinessLocation>>({
    name: '',
    address: '',
    phone: '',
    type: 'retail'
  });

  const handleAddOrEditWarehouse = () => {
    if (editingId) {
      setWarehouses(prev => prev.map(w => w.id === editingId ? { ...w, ...warehouseForm } as Warehouse : w));
    } else {
      const newWh: Warehouse = {
        ...warehouseForm,
        id: `wh-${Date.now()}`,
        capacity: warehouseForm.capacity || '0 units',
        supervisor: warehouseForm.supervisor || 'Unassigned'
      } as Warehouse;
      setWarehouses(prev => [...prev, newWh]);
    }
    closeWarehouseForm();
  };

  const handleAddOrEditLocation = () => {
    if (editingId) {
      setLocations(prev => prev.map(l => l.id === editingId ? { ...l, ...locationForm } as BusinessLocation : l));
    } else {
      const newLoc: BusinessLocation = {
        ...locationForm,
        id: `loc-${Date.now()}`,
        address: locationForm.address || '',
        phone: locationForm.phone || '',
        type: locationForm.type || 'retail'
      } as BusinessLocation;
      setLocations(prev => [...prev, newLoc]);
    }
    closeLocationForm();
  };

  const deleteWarehouse = (id: string) => {
    if (confirm('Are you sure you want to delete this warehouse?')) {
      setWarehouses(prev => prev.filter(w => w.id !== id));
    }
  };

  const deleteLocation = (id: string) => {
    if (confirm('Are you sure you want to delete this location?')) {
      setLocations(prev => prev.filter(l => l.id !== id));
    }
  };

  const startEditWarehouse = (w: Warehouse) => {
    setWarehouseForm(w);
    setEditingId(w.id);
    setIsAddingWarehouse(true);
  };

  const startEditLocation = (l: BusinessLocation) => {
    setLocationForm(l);
    setEditingId(l.id);
    setIsAddingLocation(true);
  };

  const closeWarehouseForm = () => {
    setIsAddingWarehouse(false);
    setEditingId(null);
    setWarehouseForm({ name: '', location: '', inventoryOverride: false, capacity: '', supervisor: '' });
  };

  const closeLocationForm = () => {
    setIsAddingLocation(false);
    setEditingId(null);
    setLocationForm({ name: '', address: '', phone: '', type: 'retail' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'locations':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Business Locations</h3>
              {!isAddingLocation && (
                <button 
                  onClick={() => setIsAddingLocation(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition-all"
                >
                  <Plus size={16} /> Add Location
                </button>
              )}
            </div>

            {isAddingLocation && (
              <div className="bg-white p-8 rounded-[32px] border-2 border-indigo-100 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <h4 className="text-lg font-black text-slate-900">{editingId ? 'Edit Location' : 'New Business Location'}</h4>
                  <button onClick={closeLocationForm} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Downtown Retail Hub"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                      value={locationForm.name}
                      onChange={e => setLocationForm({...locationForm, name: e.target.value})}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={handleAddOrEditLocation}
                    className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                    {editingId ? 'Update Location' : 'Save Location'}
                  </button>
                  <button 
                    onClick={closeLocationForm}
                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {locations.map(loc => (
                <div key={loc.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-indigo-200 transition-all group relative">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{loc.name}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => startEditLocation(loc)}
                      className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => deleteLocation(loc.id)}
                      className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {locations.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold">No locations found. Add one to get started.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'warehouses':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Warehouse Network</h3>
              {!isAddingWarehouse && (
                <button 
                  onClick={() => setIsAddingWarehouse(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition-all"
                >
                  <Plus size={16} /> Add Warehouse
                </button>
              )}
            </div>

            {isAddingWarehouse && (
              <div className="bg-white p-8 rounded-[32px] border-2 border-indigo-100 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <h4 className="text-lg font-black text-slate-900">{editingId ? 'Edit Warehouse' : 'New Warehouse'}</h4>
                  <button onClick={closeWarehouseForm} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Warehouse Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. North Hub"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                      value={warehouseForm.name}
                      onChange={e => setWarehouseForm({...warehouseForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Physical Location</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mekelle Industrial Zone"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                      value={warehouseForm.location}
                      onChange={e => setWarehouseForm({...warehouseForm, location: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 md:col-span-2">
                    <div>
                      <p className="font-black text-slate-900 text-sm">Inventory Override</p>
                      <p className="text-xs text-slate-500 font-medium">Allow stock levels to be manually adjusted regardless of system transactions.</p>
                    </div>
                    <button 
                      onClick={() => setWarehouseForm({...warehouseForm, inventoryOverride: !warehouseForm.inventoryOverride})}
                      className={`p-2 transition-colors ${warehouseForm.inventoryOverride ? 'text-indigo-600' : 'text-slate-300'}`}
                    >
                      {warehouseForm.inventoryOverride ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={handleAddOrEditWarehouse}
                    className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                    {editingId ? 'Update Warehouse' : 'Save Warehouse'}
                  </button>
                  <button 
                    onClick={closeWarehouseForm}
                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {warehouses.map(wh => (
                <div key={wh.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <WarehouseIcon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{wh.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{wh.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button 
                        onClick={() => startEditWarehouse(wh)}
                        className="p-1.5 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => deleteWarehouse(wh.id)}
                        className="p-1.5 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {warehouses.length === 0 && (
                <div className="md:col-span-2 text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold">No warehouses found. Add your first storage unit.</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Store Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Name</label>
                  <input type="text" defaultValue="Sebrisat Electronics" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Base Currency</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Ethiopian Birr (Br)</option>
                    <option>US Dollar ($)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Default Tax Rate (%)</label>
                  <input type="number" defaultValue="15" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold">System Security</h4>
                  <p className="text-sm text-slate-400 font-medium">Manage access and API configurations.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="font-bold text-sm">Two-Factor Authentication</span>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="font-bold text-sm">API Access Logs</span>
                  <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View Logs</button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const menuItems = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'locations', label: 'Locations', icon: Building2 },
    { id: 'warehouses', label: 'Warehouses', icon: WarehouseIcon },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h2>
          <p className="text-slate-500 font-medium">Configure your store parameters and infrastructure.</p>
        </div>
      </div>

      <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm w-fit overflow-x-auto scrollbar-hide">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              closeWarehouseForm();
              closeLocationForm();
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === item.id 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;


import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Inventory from './views/Inventory';
import Sales from './views/Sales';
import CreditService from './views/CreditService';
import Settings from './views/Settings';
import AddProduct from './views/AddProduct';
import Categories from './views/Categories';
import Brands from './views/Brands';
import Units from './views/Units';
import ProductLog from './views/ProductLog';
import WarehouseTransfers from './views/WarehouseTransfers';
import FastMovingItems from './views/FastMovingItems';
import AgingReport from './views/AgingReport';
import Suppliers from './views/Suppliers';
import SupplierOrders from './views/SupplierOrders';
import AddSupplierOrder from './views/AddSupplierOrder';
import AddSupplier from './views/AddSupplier';
import VehicleTypes from './views/VehicleTypes';
import AddVehicleType from './views/AddVehicleType';
import Drivers from './views/Drivers';
import AddDriver from './views/AddDriver';
import Deliveries from './views/Deliveries';
import RecordDelivery from './views/RecordDelivery';
import DriverPayments from './views/DriverPayments';
import MakePayment from './views/MakePayment';
import LogisticsReports from './views/LogisticsReports';
import LogisticsDashboard from './views/LogisticsDashboard';
import CalendarView from './views/CalendarView';
import AccountsView from './views/AccountsView';
// New HR Imports
import HRDashboard from './views/HRDashboard';
import Departments from './views/Departments';
import Employees from './views/Employees';
import HRPayments from './views/HRPayments';
import Attendance from './views/Attendance';
import AddEmployee from './views/AddEmployee';
import AddHRPayment from './views/AddHRPayment';
import AddAttendance from './views/AddAttendance';
// New Customer Imports
import CustomersList from './views/CustomersList';
import AddCustomer from './views/AddCustomer';
import CustomerFinancialReport from './views/CustomerFinancialReport';
import CustomerOrders from './views/CustomerOrders';
import CustomerRequests from './views/CustomerRequests';
import SpecialRequests from './views/SpecialRequests';
import UpdateOrderStatus from './views/UpdateOrderStatus';
import PaymentTracking from './views/PaymentTracking';
// New Lead Imports
import LeadManagement from './views/LeadManagement';
import AddLead from './views/AddLead';
// New POS Imports
import SoldItems from './views/SoldItems';
// New Stock Ops Imports
import StockAdjustment from './views/StockAdjustment';
import DigitalKeys from './views/DigitalKeys';
import WarrantyRegistry from './views/WarrantyRegistry';
// Weekly Report
import WeeklyReport from './views/WeeklyReport';
import { ViewType } from './types';

// Generic Creation Placeholder for repetitive modules
const CreationView = ({ title, onBack }: { title: string, onBack: () => void }) => (
  <div className="max-w-2xl mx-auto p-12 bg-white dark:bg-zinc-900 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-sm animate-in zoom-in-95 duration-300">
    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight uppercase">{title}</h2>
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Entity Name</label>
        <input type="text" className="w-full px-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="Enter name..." />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description / Notes</label>
        <textarea className="w-full px-5 py-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="Additional details..." rows={3} />
      </div>
      <div className="flex gap-4 pt-4">
        <button onClick={() => { alert(`${title} saved (Mock)`); onBack(); }} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all">
          Save Record
        </button>
        <button onClick={onBack} className="px-8 py-4 bg-slate-900 dark:bg-zinc-100 dark:text-slate-900 text-white rounded-2xl font-black active:scale-95 transition-all">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [selectedCustomerForReport, setSelectedCustomerForReport] = useState<string>('');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': 
        return (
          <Dashboard 
            onViewReports={() => setActiveView('weekly-report')} 
            onNewSale={() => setActiveView('pos-sale')} 
            onViewAllTransactions={() => setActiveView('sold-items')}
          />
        );
      case 'weekly-report': return <WeeklyReport />;
      case 'calendar': return <CalendarView />;
      case 'accounts': return <AccountsView />;
      case 'inventory': 
      case 'all-products': return <Inventory onAddProduct={() => setActiveView('add-product')} />;
      case 'sales': 
      case 'pos-sale': return <Sales />;
      case 'sold-items': return <SoldItems />;
      case 'credits': return <CreditService onAddCreditPlan={() => setActiveView('add-credit-plan')} />;
      case 'settings': return <Settings />;
      case 'add-product': return <AddProduct onBack={() => setActiveView('inventory')} />;
      case 'categories': return <Categories onAdd={() => setActiveView('add-category')} />;
      case 'brands': return <Brands onAdd={() => setActiveView('add-brand')} />;
      case 'units': return <Units onAdd={() => setActiveView('add-unit')} />;
      case 'add-category': return <CreationView title="New Category" onBack={() => setActiveView('categories')} />;
      case 'add-brand': return <CreationView title="New Brand" onBack={() => setActiveView('brands')} />;
      case 'add-unit': return <CreationView title="New Unit" onBack={() => setActiveView('units')} />;
      case 'add-transfer': return <CreationView title="New Transfer Request" onBack={() => setActiveView('warehouse-transfers')} />;
      case 'add-credit-plan': return <CreationView title="New Credit Plan" onBack={() => setActiveView('credits')} />;
      case 'add-supplier': return <AddSupplier onBack={() => setActiveView('suppliers')} />;
      case 'add-supplier-order': return <AddSupplierOrder onBack={() => setActiveView('supplier-orders')} />;
      case 'product-log': return <ProductLog />;
      case 'warehouse-transfers': return <WarehouseTransfers onAdd={() => setActiveView('add-transfer')} />;
      case 'fast-moving-items': return <FastMovingItems />;
      case 'aging-report': return <AgingReport />;
      case 'suppliers': return <Suppliers onAdd={() => setActiveView('add-supplier')} />;
      case 'supplier-orders': return <SupplierOrders onAdd={() => setActiveView('add-supplier-order')} />;
      
      // Stock Ops
      case 'stock-adjustment': return <StockAdjustment />;
      case 'digital-keys': return <DigitalKeys />;
      case 'warranty-registry': return <WarrantyRegistry />;

      // Logistics Views
      case 'logistics-dashboard': 
        return <LogisticsDashboard onAddDelivery={() => setActiveView('add-delivery')} onAddDriver={() => setActiveView('add-driver')} />;
      case 'vehicle-types': return <VehicleTypes onAdd={() => setActiveView('add-vehicle-type')} />;
      case 'add-vehicle-type': return <AddVehicleType onBack={() => setActiveView('vehicle-types')} />;
      case 'drivers': return <Drivers onAdd={() => setActiveView('add-driver')} />;
      case 'add-driver': return <AddDriver onBack={() => setActiveView('drivers')} />;
      case 'deliveries': return <Deliveries onAdd={() => setActiveView('add-delivery')} />;
      case 'add-delivery': return <RecordDelivery onBack={() => setActiveView('deliveries')} />;
      case 'logistics-payments': return <DriverPayments onAdd={() => setActiveView('make-payment')} />;
      case 'make-payment': return <MakePayment onBack={() => setActiveView('logistics-payments')} />;
      case 'logistics-reports': return <LogisticsReports />;

      // HR Views
      case 'hr-dashboard': return <HRDashboard onAddEmployee={() => setActiveView('add-employee')} />;
      case 'departments': return <Departments onAdd={() => setActiveView('add-department')} />;
      case 'add-department': return <CreationView title="New Department" onBack={() => setActiveView('departments')} />;
      case 'employees': return <Employees onAdd={() => setActiveView('add-employee')} />;
      case 'add-employee': return <AddEmployee onBack={() => setActiveView('employees')} />;
      case 'hr-payments': return <HRPayments onAdd={() => setActiveView('add-hr-payment')} />;
      case 'add-hr-payment': return <AddHRPayment onBack={() => setActiveView('hr-payments')} />;
      case 'attendance': return <Attendance onAdd={() => setActiveView('add-attendance')} />;
      case 'add-attendance': return <AddAttendance onBack={() => setActiveView('attendance')} />;

      // Customer Views
      case 'customers':
      case 'customers-list': 
        return (
          <CustomersList 
            onAdd={() => setActiveView('add-customer')} 
            onViewReport={(name) => {
              setSelectedCustomerForReport(name);
              setActiveView('customer-report');
            }} 
          />
        );
      case 'add-customer': return <AddCustomer onBack={() => setActiveView('customers-list')} />;
      case 'customer-report': 
        return <CustomerFinancialReport onBack={() => setActiveView('customers-list')} customerName={selectedCustomerForReport} />;
      case 'customer-orders': return <CustomerOrders />;
      case 'customer-requests': return <CustomerRequests />;
      case 'special-requests': return <SpecialRequests />;
      case 'update-order-status': return <UpdateOrderStatus />;
      case 'payment-tracking': return <PaymentTracking />;

      // Lead Management Views
      case 'leads-list': return <LeadManagement onAddLead={() => setActiveView('add-lead')} />;
      case 'add-lead': return <AddLead onBack={() => setActiveView('leads-list')} />;

      default: return <Dashboard onViewReports={() => setActiveView('weekly-report')} onNewSale={() => setActiveView('pos-sale')} onViewAllTransactions={() => setActiveView('sold-items')} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;

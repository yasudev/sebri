
export type Category = 
  | 'Satellite Gear' 
  | 'Televisions' 
  | 'Security Systems' 
  | 'Computing & Media' 
  | 'Connectivity' 
  | 'Subscriptions'
  | 'Accessories';

export interface Product {
  id: string;
  name: string;
  category: Category;
  brand: string;
  price: number;
  cost: number;
  stock: number;
  sku: string;
  image: string;
  unit: string;
  createdAt: string;
  warehouseIds?: string[];
  warrantyMonths?: number;
  serialNumbers?: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  creditLimit: number;
  currentBalance: number;
  creditScore: number; // 0 to 100
}

export interface Installment {
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
}

export interface CreditAccount {
  id: string;
  customerId: string;
  totalAmount: number;
  remainingAmount: number;
  installments: Installment[];
  status: 'active' | 'completed' | 'defaulted';
}

export interface Sale {
  id: string;
  date: string;
  items: { productId: string; quantity: number; price: number; serialUsed?: string }[];
  total: number;
  paymentMethod: 'cash' | 'credit' | 'card';
  customerId?: string;
}

export interface BusinessLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  type: 'retail' | 'office' | 'hybrid';
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: string;
  supervisor: string;
  inventoryOverride: boolean;
}

export type ViewType = 
  | 'dashboard' 
  | 'sales' 
  | 'inventory' 
  | 'credits' 
  | 'customers' 
  | 'settings'
  | 'calendar'
  | 'accounts'
  | 'all-products'
  | 'add-product'
  | 'add-category'
  | 'add-brand'
  | 'add-unit'
  | 'add-transfer'
  | 'add-credit-plan'
  | 'categories'
  | 'brands'
  | 'units'
  | 'product-log'
  | 'warehouse-transfers'
  | 'fast-moving-items'
  | 'aging-report'
  | 'suppliers'
  | 'supplier-orders'
  | 'add-supplier'
  | 'add-supplier-order'
  | 'vehicle-types'
  | 'add-vehicle-type'
  | 'drivers'
  | 'add-driver'
  | 'deliveries'
  | 'add-delivery'
  | 'logistics-dashboard'
  | 'logistics-payments'
  | 'make-payment'
  | 'logistics-reports'
  | 'hr-dashboard'
  | 'departments'
  | 'employees'
  | 'hr-payments'
  | 'attendance'
  | 'add-employee'
  | 'add-department'
  | 'add-hr-payment'
  | 'add-attendance'
  | 'customers-list'
  | 'add-customer'
  | 'customer-report'
  | 'customer-orders'
  | 'customer-requests'
  | 'special-requests'
  | 'update-order-status'
  | 'payment-tracking'
  | 'leads-list'
  | 'add-lead'
  | 'pos-sale'
  | 'sold-items'
  | 'stock-adjustment'
  | 'digital-keys'
  | 'warranty-registry'
  | 'weekly-report';

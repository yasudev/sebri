
import { Product, Customer, CreditAccount, BusinessLocation, Warehouse } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Tiger T8 High Class V2 Receiver', category: 'Satellite Gear', brand: 'Tiger', price: 8500, cost: 6200, stock: 45, sku: 'TG-T8-V2', image: 'https://picsum.photos/seed/tiger/200', unit: 'Pcs', createdAt: '2024-01-15', warehouseIds: ['wh1', 'wh2'] },
  { id: '2', name: 'HD LNB Quad Output 0.1dB', category: 'Satellite Gear', brand: 'Eurostar', price: 1200, cost: 850, stock: 120, sku: 'LNB-HD-Q', image: 'https://picsum.photos/seed/lnb/200', unit: 'Pcs', createdAt: '2024-02-10', warehouseIds: ['wh1'] },
  { id: '3', name: '8-Port Diseqc Switch 2.0', category: 'Satellite Gear', brand: 'Gecen', price: 950, cost: 600, stock: 85, sku: 'DSQ-8P', image: 'https://picsum.photos/seed/switch/200', unit: 'Pcs', createdAt: '2024-02-20', warehouseIds: ['wh2'] },
  { id: '4', name: 'Sony 55" X80L Bravia 4K Google TV', category: 'Televisions', brand: 'Sony', price: 145000, cost: 110000, stock: 8, sku: 'SNY-55X80', image: 'https://picsum.photos/seed/sony-tv/200', unit: 'Pcs', createdAt: '2024-03-05', warehouseIds: ['wh1', 'wh2'] },
  { id: '5', name: 'Dahua 4MP IP Security Camera (Outdoor)', category: 'Security Systems', brand: 'Dahua', price: 7500, cost: 5200, stock: 32, sku: 'DH-IPC-HFW', image: 'https://picsum.photos/seed/dahua/200', unit: 'Pcs', createdAt: '2024-03-10', warehouseIds: ['wh1'] },
  { id: '6', name: 'Apollo IP Server Recharge (1 Year)', category: 'Subscriptions', brand: 'Apollo', price: 2500, cost: 1800, stock: 1000, sku: 'APL-1YR', image: 'https://picsum.photos/seed/apollo/200', unit: 'Month', createdAt: '2024-03-12', warehouseIds: ['wh1'] },
  { id: '7', name: 'Universal Remote Control (All Models)', category: 'Accessories', brand: 'Generic', price: 450, cost: 150, stock: 250, sku: 'URC-G2', image: 'https://picsum.photos/seed/remote/200', unit: 'Pcs', createdAt: '2024-03-15', warehouseIds: ['wh2'] },
  { id: '8', name: 'Android TV Box 4K 4GB/64GB', category: 'Computing & Media', brand: 'TX6', price: 5800, cost: 4100, stock: 55, sku: 'TX6-PRO', image: 'https://picsum.photos/seed/tx6/200', unit: 'Pcs', createdAt: '2024-03-20', warehouseIds: ['wh1'] },
  { id: '9', name: 'Cat6 FTP Internet Cable (305m Roll)', category: 'Connectivity', brand: 'D-Link', price: 12500, cost: 9500, stock: 15, sku: 'DL-C6-305', image: 'https://picsum.photos/seed/cable/200', unit: 'Roll', createdAt: '2024-03-22', warehouseIds: ['wh1', 'wh2'] },
  { id: '10', name: 'Offset Satellite Dish (90cm)', category: 'Satellite Gear', brand: 'Eurostar', price: 3200, cost: 2100, stock: 60, sku: 'DSH-90CM', image: 'https://picsum.photos/seed/dish/200', unit: 'Pcs', createdAt: '2024-03-25', warehouseIds: ['wh1'] },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'John Doe', email: 'john@example.com', phone: '+123456789', creditLimit: 2000, currentBalance: 450, creditScore: 85 },
  { id: 'c2', name: 'Jane Smith', email: 'jane@example.com', phone: '+987654321', creditLimit: 5000, currentBalance: 1200, creditScore: 92 },
];

export const MOCK_CREDITS: CreditAccount[] = [
  {
    id: 'cr1',
    customerId: 'c1',
    totalAmount: 1200,
    remainingAmount: 450,
    status: 'active',
    installments: [
      { dueDate: '2024-06-15', amount: 150, status: 'paid' },
      { dueDate: '2024-07-15', amount: 150, status: 'pending' },
    ]
  }
];

export const MOCK_LOCATIONS: BusinessLocation[] = [
  { id: 'loc1', name: 'Bole Road Branch (HQ)', address: 'Bole Road, Ward 03', phone: '+251 11 123 4567', type: 'hybrid' },
  { id: 'loc2', name: 'Mercato Tech Plaza', address: 'Mercato Market District', phone: '+251 11 987 6543', type: 'retail' },
];

export const MOCK_WAREHOUSES: Warehouse[] = [
  { id: 'wh1', name: 'Central Distribution', location: 'Kality District', capacity: '20,000 units', supervisor: 'Abebe Bikila', inventoryOverride: false },
  { id: 'wh2', name: 'Retail Storage (Bole)', location: 'Bole HQ Basement', capacity: '5,000 units', supervisor: 'Sara Konjo', inventoryOverride: true },
];

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'cashier';
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  sku: string;
  barcode?: string;
  image: string;
  category: 'teddy-bears' | 'plush-toys' | 'accessories' | 'gift-sets';
  stock: number;
  minStock: number;
  supplier?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  loyaltyPoints: number;
  totalPurchases: number;
  lastPurchase?: string;
  createdAt: string;
}

export interface Sale {
  id: string;
  customerId?: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'qr' | 'loyalty_points';
  cashierId: string;
  status: 'completed' | 'refunded' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface SaleItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InventoryLog {
  id: string;
  productId: string;
  type: 'stock_in' | 'stock_out' | 'adjustment';
  quantity: number;
  reason: string;
  userId: string;
  createdAt: string;
}

export interface DashboardStats {
  todaySales: number;
  todayTransactions: number;
  lowStockItems: number;
  totalCustomers: number;
  monthlyRevenue: number;
  topProducts: Array<{
    product: Product;
    quantity: number;
    revenue: number;
  }>;
}
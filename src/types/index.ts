// Core types for the Teddy Bear POS System
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'cashier' | 'manager';
  name: string;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  barcode?: string;
  image: string;
  supplier?: string;
  costPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  loyaltyPoints: number;
  totalSpent: number;
  visits: number;
  createdAt: Date;
  lastVisit?: Date;
}

export interface SaleItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Sale {
  id: string;
  customerId?: string;
  customer?: Customer;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'qr';
  status: 'completed' | 'pending' | 'cancelled';
  cashierId: string;
  cashier: User;
  createdAt: Date;
  notes?: string;
}

export interface InventoryLog {
  id: string;
  productId: string;
  product: Product;
  type: 'restock' | 'sale' | 'adjustment' | 'return';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason?: string;
  userId: string;
  user: User;
  createdAt: Date;
}

export interface DashboardStats {
  todaysSales: {
    total: number;
    count: number;
    change: number;
  };
  weeklyRevenue: {
    total: number;
    change: number;
  };
  totalProducts: {
    count: number;
    lowStock: number;
  };
  totalCustomers: {
    count: number;
    newThisWeek: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutData {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'qr';
  cashReceived?: number;
  change?: number;
}
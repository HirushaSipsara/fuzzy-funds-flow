import { create } from 'zustand';
import { Product, SaleItem, Customer } from '@/types';

interface CartState {
  items: SaleItem[];
  customer: Customer | null;
  discount: number;
  taxRate: number;
  subtotal: number;
  tax: number;
  total: number;
  
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCustomer: (customer: Customer | null) => void;
  setDiscount: (discount: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  customer: null,
  discount: 0,
  taxRate: 0.08, // 8% tax
  subtotal: 0,
  tax: 0,
  total: 0,

  addItem: (product, quantity = 1) => {
    const state = get();
    const existingItem = state.items.find(item => item.productId === product.id);
    
    let newItems;
    if (existingItem) {
      newItems = state.items.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.unitPrice }
          : item
      );
    } else {
      const newItem: SaleItem = {
        productId: product.id,
        product,
        quantity,
        unitPrice: product.price,
        total: product.price * quantity,
      };
      newItems = [...state.items, newItem];
    }
    
    set({ items: newItems });
    get().calculateTotals();
  },

  removeItem: (productId) => {
    const state = get();
    const newItems = state.items.filter(item => item.productId !== productId);
    set({ items: newItems });
    get().calculateTotals();
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    const state = get();
    const newItems = state.items.map(item =>
      item.productId === productId
        ? { ...item, quantity, total: quantity * item.unitPrice }
        : item
    );
    set({ items: newItems });
    get().calculateTotals();
  },

  setCustomer: (customer) => {
    set({ customer });
  },

  setDiscount: (discount) => {
    set({ discount });
    get().calculateTotals();
  },

  clearCart: () => {
    set({
      items: [],
      customer: null,
      discount: 0,
      subtotal: 0,
      tax: 0,
      total: 0,
    });
  },

  calculateTotals: () => {
    const state = get();
    const subtotal = state.items.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = subtotal * (state.discount / 100);
    const discountedSubtotal = subtotal - discountAmount;
    const tax = discountedSubtotal * state.taxRate;
    const total = discountedSubtotal + tax;
    
    set({
      subtotal,
      tax,
      total,
    });
  },
}));
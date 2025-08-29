import { create } from 'zustand';
import { CartItem, Product, Customer } from '@/types';

interface CartState {
  items: CartItem[];
  customer: Customer | null;
  discount: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCustomer: (customer: Customer | null) => void;
  setDiscount: (discount: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
}

const TAX_RATE = 0.08; // 8% tax rate

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  customer: null,
  discount: 0,

  addItem: (product: Product) => {
    const items = get().items;
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      set({ items: [...items, { product, quantity: 1 }] });
    }
  },

  removeItem: (productId: string) => {
    set({ items: get().items.filter(item => item.product.id !== productId) });
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    set({
      items: get().items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    });
  },

  setCustomer: (customer: Customer | null) => {
    set({ customer });
  },

  setDiscount: (discount: number) => {
    set({ discount: Math.max(0, Math.min(100, discount)) });
  },

  clearCart: () => {
    set({ items: [], customer: null, discount: 0 });
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  },

  getTax: () => {
    const subtotal = get().getSubtotal();
    const discount = get().discount;
    const discountedSubtotal = subtotal * (1 - discount / 100);
    return discountedSubtotal * TAX_RATE;
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().discount;
    const tax = get().getTax();
    const discountedSubtotal = subtotal * (1 - discount / 100);
    return discountedSubtotal + tax;
  },
}));
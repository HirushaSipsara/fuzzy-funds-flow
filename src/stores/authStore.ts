import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@teddybears.com',
    role: 'admin',
    name: 'Admin User',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
  },
  {
    id: '2',
    username: 'cashier',
    email: 'cashier@teddybears.com',
    role: 'cashier',
    name: 'Jane Smith',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(),
  },
  {
    id: '3',
    username: 'manager',
    email: 'manager@teddybears.com',
    role: 'manager',
    name: 'Bob Johnson',
    createdAt: new Date('2024-01-10'),
    lastLogin: new Date(),
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        // Mock authentication - in real app, this would call an API
        const user = mockUsers.find(u => u.username === username);
        if (user && password === 'password') {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
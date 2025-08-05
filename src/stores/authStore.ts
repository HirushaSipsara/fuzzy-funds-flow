import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@teddypos.com',
    role: 'admin',
    name: 'Store Manager',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'cashier',
    email: 'cashier@teddypos.com',
    role: 'cashier',
    name: 'Sarah Johnson',
    createdAt: new Date().toISOString(),
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (credentials) => {
        // Mock authentication - replace with real API call
        const user = mockUsers.find(
          (u) => u.username === credentials.username && credentials.password === 'password'
        );

        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
    }),
    {
      name: 'teddy-pos-auth',
    }
  )
);
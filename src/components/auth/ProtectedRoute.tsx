import { ReactNode } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { LoginForm } from './LoginForm';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: ('admin' | 'cashier' | 'manager')[];
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated || !user) {
    return <LoginForm />;
  }
  
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};
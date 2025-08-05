import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { LoginForm } from "@/components/auth/LoginForm";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import PointOfSale from "./pages/PointOfSale";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginForm />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout>
                <Navigate to="/dashboard" replace />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/pos" element={
            <ProtectedRoute>
              <AppLayout>
                <PointOfSale />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Placeholder routes for navigation items */}
          <Route path="/products" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="text-center py-20">
                  <h1 className="text-3xl font-display font-bold mb-4">Products Management</h1>
                  <p className="text-muted-foreground">Coming soon! 🧸</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/customers" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="text-center py-20">
                  <h1 className="text-3xl font-display font-bold mb-4">Customer Management</h1>
                  <p className="text-muted-foreground">Coming soon! 👥</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/sales" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="text-center py-20">
                  <h1 className="text-3xl font-display font-bold mb-4">Sales History</h1>
                  <p className="text-muted-foreground">Coming soon! 💰</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="text-center py-20">
                  <h1 className="text-3xl font-display font-bold mb-4">Reports & Analytics</h1>
                  <p className="text-muted-foreground">Coming soon! 📊</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/store" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="text-center py-20">
                  <h1 className="text-3xl font-display font-bold mb-4">Online Store</h1>
                  <p className="text-muted-foreground">Coming soon! 🌐</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="text-center py-20">
                  <h1 className="text-3xl font-display font-bold mb-4">Settings</h1>
                  <p className="text-muted-foreground">Coming soon! ⚙️</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

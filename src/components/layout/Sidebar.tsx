import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/stores/authStore';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  Heart,
  UserCircle,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  roles?: ('admin' | 'cashier' | 'manager')[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Point of Sale',
    href: '/pos',
    icon: ShoppingCart,
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: Package,
    roles: ['admin', 'manager'],
  },
  {
    title: 'Customers',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['admin', 'manager'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin'],
  },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const filteredItems = sidebarItems.filter(item => 
    !item.roles || (user && item.roles.includes(user.role))
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 shadow-soft",
          isCollapsed ? "-translate-x-full lg:w-16" : "w-72 lg:w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className={cn("flex items-center gap-3", isCollapsed && "lg:justify-center")}>
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-sidebar-foreground">TeddyBear POS</h1>
                  <p className="text-xs text-sidebar-foreground/60">Cuddles & Commerce</p>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden h-8 w-8"
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-2">
            <nav className="space-y-2">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 transition-smooth hover:shadow-soft",
                        isCollapsed && "lg:justify-center lg:px-2",
                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                      {!isCollapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border space-y-3">
            <div className={cn("flex items-center gap-3", isCollapsed && "lg:justify-center")}>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="w-4 h-4 text-primary" />
              </div>
              {!isCollapsed && user && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 capitalize">
                    {user.role}
                  </p>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className={cn(
                "w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10",
                isCollapsed && "lg:justify-center lg:px-2"
              )}
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Desktop toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex fixed top-4 left-4 z-40 h-8 w-8 bg-background/80 backdrop-blur-sm border shadow-soft hover:shadow-cute"
      >
        <Menu className="h-4 w-4" />
      </Button>
    </>
  );
};
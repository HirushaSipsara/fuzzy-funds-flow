import { AppLayout } from '@/components/layout/AppLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { mockProducts } from '@/data/mockData';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  TrendingUp,
  Heart,
  Star,
} from 'lucide-react';
import bearsCollection from '@/assets/bears-collection.jpg';

const Dashboard = () => {
  const { user } = useAuthStore();
  
  // Mock dashboard stats
  const stats = {
    todaysSales: { total: 1247.50, count: 23, change: 12.5 },
    weeklyRevenue: { total: 8945.25, change: 8.2 },
    totalProducts: { count: 156, lowStock: 8 },
    totalCustomers: { count: 342, newThisWeek: 15 },
  };

  const lowStockProducts = mockProducts.filter(product => product.stock < 10);
  const featuredProducts = mockProducts.slice(0, 3);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name}! 🧸
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening in your teddy bear store today.
            </p>
          </div>
          <Button variant="cute" className="shadow-cute">
            <Heart className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Today's Sales"
            value={stats.todaysSales.total}
            description={`${stats.todaysSales.count} transactions`}
            icon={<DollarSign className="h-4 w-4 text-primary" />}
            trend={{ value: stats.todaysSales.change, isPositive: true }}
          />
          <StatsCard
            title="Weekly Revenue"
            value={stats.weeklyRevenue.total}
            description="Last 7 days"
            icon={<TrendingUp className="h-4 w-4 text-primary" />}
            trend={{ value: stats.weeklyRevenue.change, isPositive: true }}
          />
          <StatsCard
            title="Products"
            value={stats.totalProducts.count}
            description={`${stats.totalProducts.lowStock} low stock`}
            icon={<Package className="h-4 w-4 text-primary" />}
          />
          <StatsCard
            title="Customers"
            value={stats.totalCustomers.count}
            description={`+${stats.totalCustomers.newThisWeek} this week`}
            icon={<Users className="h-4 w-4 text-primary" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Low Stock Alerts */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <CardTitle>Low Stock Alerts</CardTitle>
              </div>
              <CardDescription>
                Products that need restocking soon
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                      {product.stock} left
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">All products are well stocked! 🎉</p>
              )}
              <Button variant="playful" size="sm" className="w-full mt-4">
                Manage Inventory
              </Button>
            </CardContent>
          </Card>

          {/* Featured Products */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <CardTitle>Featured Bears</CardTitle>
              </div>
              <CardDescription>
                Your best-selling teddy bears
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg bg-card hover:bg-accent/50 transition-smooth">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover shadow-soft"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-primary">${product.price}</span>
                      <Badge variant="secondary" className="text-xs">
                        {product.stock} in stock
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to help you manage your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Start New Sale</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <Package className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Add Product</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <Users className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">New Customer</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
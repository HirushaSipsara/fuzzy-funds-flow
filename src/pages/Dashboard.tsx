import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '@/data/mockData';
import bearsCollection from '@/assets/bears-collection.jpg';

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock data - replace with real data from API
  const stats = {
    todaySales: 1247.50,
    todayTransactions: 23,
    lowStockItems: 4,
    totalCustomers: 156,
    monthlyRevenue: 18450.75,
  };

  const lowStockProducts = mockProducts.filter(p => p.stock <= p.minStock);
  const topProducts = mockProducts.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome to TeddyPOS! 🧸
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in your teddy bear store today
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="cute" 
            size="lg"
            onClick={() => navigate('/pos')}
            className="font-semibold"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Sale
          </Button>
          <Button 
            variant="playful" 
            size="lg"
            onClick={() => navigate('/products')}
          >
            <Package className="h-5 w-5 mr-2" />
            Manage Products
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Sales"
          value={`$${stats.todaySales.toFixed(2)}`}
          icon={DollarSign}
          description="Revenue generated today"
          trend={{ value: 12.5, isUpward: true }}
        />
        <StatsCard
          title="Transactions"
          value={stats.todayTransactions}
          icon={ShoppingCart}
          description="Orders completed today"
          trend={{ value: 8.2, isUpward: true }}
        />
        <StatsCard
          title="Low Stock Alert"
          value={stats.lowStockItems}
          icon={AlertTriangle}
          description="Items need restocking"
          className="border-destructive/20"
        />
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          description="Registered customers"
          trend={{ value: 5.1, isUpward: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Sales Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Sales Chart Coming Soon
                  </h3>
                  <p className="text-muted-foreground">
                    Beautiful charts and analytics will be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <Card className="shadow-card border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span>Low Stock Alert</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockProducts.slice(0, 3).map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Stock: {product.stock} (Min: {product.minStock})
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/products')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {lowStockProducts.length > 3 && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/products')}
                  >
                    View All ({lowStockProducts.length - 3} more)
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Featured Products */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span>Featured Bears</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img 
                  src={bearsCollection} 
                  alt="Teddy bears collection" 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-sm font-semibold">New Arrivals</p>
                  <p className="text-xs">Cute & Cuddly Collection</p>
                </div>
              </div>
              <div className="space-y-2">
                {topProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center justify-between p-2 hover:bg-muted/50 rounded"
                  >
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {product.stock} left
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
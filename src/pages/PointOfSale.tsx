import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCartStore } from '@/stores/cartStore';
import { mockProducts, mockCustomers, productCategories } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  CreditCard,
  Banknote,
  QrCode,
  User,
  Heart,
} from 'lucide-react';

const PointOfSale = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qr'>('cash');
  const [cashReceived, setCashReceived] = useState('');
  
  const { 
    items, 
    customer,
    discount,
    addItem, 
    removeItem, 
    updateQuantity,
    setCustomer,
    setDiscount,
    clearCart,
    getSubtotal,
    getTax,
    getTotal
  } = useCartStore();
  
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();
  const change = paymentMethod === 'cash' && cashReceived ? 
    Math.max(0, parseFloat(cashReceived) - total) : 0;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === 'cash' && (!cashReceived || parseFloat(cashReceived) < total)) {
      toast({
        title: "Insufficient cash",
        description: "Please enter the correct cash amount.",
        variant: "destructive",
      });
      return;
    }

    // Process the sale
    toast({
      title: "Sale completed! 🎉",
      description: `Transaction processed successfully. Total: $${total.toFixed(2)}`,
    });
    
    clearCart();
    setCashReceived('');
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
        {/* Left Panel - Products */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products or scan barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-cute transition-smooth border-0 bg-card/80 backdrop-blur-sm"
                onClick={() => addItem(product)}
              >
                <CardContent className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3 shadow-soft"
                  />
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    <Badge 
                      variant={product.stock < 10 ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {product.stock}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Panel - Cart & Checkout */}
        <div className="space-y-4">
          {/* Cart */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart ({items.length})
                </CardTitle>
                {items.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-destructive hover:text-destructive"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-64 overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Your cart is empty. Add some adorable bears! 🧸
                </p>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">${item.product.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Customer Selection */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={customer?.id || 'guest'} 
                onValueChange={(value) => {
                  const selectedCustomer = value === 'guest' ? null : mockCustomers.find(c => c.id === value);
                  setCustomer(selectedCustomer || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Guest Customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guest">Guest Customer</SelectItem>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.loyaltyPoints} pts)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {customer && (
                <div className="mt-2 p-2 bg-accent/50 rounded-lg">
                  <p className="text-sm font-medium">{customer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {customer.loyaltyPoints} loyalty points • {customer.visits} visits
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%):</span>
                    <span>-${(subtotal * discount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPaymentMethod('cash')}
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <Banknote className="h-4 w-4" />
                  <span className="text-xs">Cash</span>
                </Button>
                <Button
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPaymentMethod('card')}
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="text-xs">Card</span>
                </Button>
                <Button
                  variant={paymentMethod === 'qr' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPaymentMethod('qr')}
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <QrCode className="h-4 w-4" />
                  <span className="text-xs">QR</span>
                </Button>
              </div>

              {/* Cash Input */}
              {paymentMethod === 'cash' && (
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Cash received"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    className="text-lg font-bold text-center"
                  />
                  {change > 0 && (
                    <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700">
                        Change: <span className="font-bold">${change.toFixed(2)}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full h-12 text-lg font-bold"
                variant="cute"
              >
                <Heart className="w-5 h-5 mr-2" />
                Complete Sale ${total.toFixed(2)}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default PointOfSale;
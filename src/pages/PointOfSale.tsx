import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cartStore';
import { mockProducts, mockCustomers } from '@/data/mockData';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  DollarSign,
  QrCode,
  User,
  ShoppingCart
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function PointOfSale() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const {
    items,
    customer,
    subtotal,
    tax,
    total,
    addItem,
    removeItem,
    updateQuantity,
    setCustomer,
    clearCart
  } = useCartStore();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'teddy-bears', name: 'Teddy Bears' },
    { id: 'plush-toys', name: 'Plush Toys' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'gift-sets', name: 'Gift Sets' },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = (paymentMethod: 'cash' | 'card' | 'qr') => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before checkout",
        variant: "destructive",
      });
      return;
    }

    // Simulate checkout process
    toast({
      title: "Sale Completed! 🧸",
      description: `Payment of $${total.toFixed(2)} processed via ${paymentMethod}`,
    });

    clearCart();
  };

  return (
    <div className="h-[calc(100vh-8rem)] grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Products Section */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="cursor-pointer hover:shadow-soft transition-all duration-300 border hover:border-primary/30"
                  onClick={() => addItem(product)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-secondary rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🧸</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Stock: {product.stock}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cart Section */}
      <div className="space-y-4">
        {/* Customer Selection */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Customer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setCustomer(mockCustomers[0])}
              >
                {customer ? customer.name : "Select Customer (Optional)"}
              </Button>
              {customer && (
                <div className="text-xs text-muted-foreground">
                  Loyalty Points: {customer.loyaltyPoints}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cart Items */}
        <Card className="shadow-card flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart ({items.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Cart is empty</p>
                  <p className="text-sm">Add products to start a sale</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${item.unitPrice.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 p-0 ml-2"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary */}
            {items.length > 0 && (
              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                {/* Payment Buttons */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCheckout('cash')}
                    className="flex flex-col h-16 p-2"
                  >
                    <DollarSign className="h-5 w-5 mb-1" />
                    <span className="text-xs">Cash</span>
                  </Button>
                  <Button
                    variant="cute"
                    size="sm"
                    onClick={() => handleCheckout('card')}
                    className="flex flex-col h-16 p-2"
                  >
                    <CreditCard className="h-5 w-5 mb-1" />
                    <span className="text-xs">Card</span>
                  </Button>
                  <Button
                    variant="playful"
                    size="sm"
                    onClick={() => handleCheckout('qr')}
                    className="flex flex-col h-16 p-2"
                  >
                    <QrCode className="h-5 w-5 mb-1" />
                    <span className="text-xs">QR Code</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
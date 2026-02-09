import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner@2.0.3';
import { Minus, Plus, Trash2, Printer } from 'lucide-react';
import { MenuItem, CartItem } from '../../types';

export function POSPage() {
  const { menuItems, addOrder } = useApp();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qr' | 'e-wallet'>('cash');

  const categories = ['coffee', 'non-coffee', 'snacks', 'desserts'];
  const filteredItems = menuItems.filter(item => item.category === activeCategory && item.available);

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    if (!customerName.trim()) {
      toast.error('Please enter customer name');
      return;
    }

    addOrder({
      items: cart,
      customerName,
      phone: '',
      tableNumber: '',
      orderType: 'dine-in',
      paymentMethod,
      total: cartTotal,
      status: 'completed',
    });

    setCart([]);
    setCustomerName('');
    toast.success('Order completed successfully!');
  };

  const handlePrintReceipt = () => {
    toast.success('Receipt printed!');
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Menu Items */}
      <div className="lg:col-span-2">
        <Card className="bg-card border-border h-full flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-4 mb-4">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category.replace('-', ' ')}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="flex-1 overflow-auto mt-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => addToCart(item)}
                        className="text-left p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-all"
                      >
                        <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-sm mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-lg text-primary">Rp {item.price.toLocaleString('id-ID')}</p>
                      </button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Order Panel */}
      <div>
        <Card className="bg-card border-border h-full flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <h2 className="text-xl mb-4">Current Order</h2>

            {/* Cart Items */}
            <div className="flex-1 overflow-auto mb-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <p>No items added yet</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm mb-1">{item.name}</p>
                      <p className="text-primary text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-7 h-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-7 h-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-7 h-7"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Customer Info */}
            <div className="space-y-4 mb-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="mt-2 bg-input-background border-border"
                />
              </div>

              <div>
                <Label className="mb-2 block">Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div className="flex gap-2">
                    <div className="flex items-center space-x-2 flex-1">
                      <RadioGroupItem value="cash" id="pos-cash" />
                      <Label htmlFor="pos-cash" className="cursor-pointer text-sm">Cash</Label>
                    </div>
                    <div className="flex items-center space-x-2 flex-1">
                      <RadioGroupItem value="qr" id="pos-qr" />
                      <Label htmlFor="pos-qr" className="cursor-pointer text-sm">QR</Label>
                    </div>
                    <div className="flex items-center space-x-2 flex-1">
                      <RadioGroupItem value="e-wallet" id="pos-wallet" />
                      <Label htmlFor="pos-wallet" className="cursor-pointer text-sm">E-Wallet</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-border pt-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex items-center justify-between text-xl">
                <span>Total:</span>
                <span className="text-primary">Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                className="w-full bg-primary hover:bg-secondary"
                size="lg"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Complete Order
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handlePrintReceipt}
                disabled={cart.length === 0}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

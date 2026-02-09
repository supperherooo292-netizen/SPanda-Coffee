import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function CheckoutPage() {
  const { cart = [], removeFromCart } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const total = Array.isArray(cart) ? cart.reduce((sum, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0) : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission logic here
    console.log('Order submitted:', { ...formData, items: cart, total });
  };

  const isEmpty = !Array.isArray(cart) || cart.length === 0;

  return (
    <div className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 font-serif">Checkout</h1>
          <p className="text-muted-foreground text-lg">Selesaikan pesanan Anda</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Ringkasan Pesanan
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEmpty ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">Keranjang belanja Anda kosong</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(cart as any[]).map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} x Rp {item.price?.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">
                            Rp {((item.price || 0) * (item.quantity || 1)).toLocaleString('id-ID')}
                          </span>
                          <button
                            onClick={() => removeFromCart && removeFromCart(index)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Order Total */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Total Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Biaya Pengiriman</span>
                  <span>Rp 10.000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">Rp {(total + 10000).toLocaleString('id-ID')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Informasi Pengiriman</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama Anda"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+62 8xx xxxx xxxx"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Alamat Pengiriman</Label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Masukkan alamat lengkap"
                      rows={3}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Catatan khusus untuk pesanan Anda"
                      rows={2}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isEmpty}
                    className="w-full"
                  >
                    Proses Pesanan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

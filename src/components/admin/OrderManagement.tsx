import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function OrderManagement() {
  const { orders, updateOrderStatus } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    toast.success(`Order ${status}!`);
    setSelectedOrder(null);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-[#7A9D7E]/10 text-[#7A9D7E]';
      case 'pending':
        return 'bg-[#D4A574]/10 text-[#D4A574]';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl">Order Management</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredOrders.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center text-muted-foreground">
                No orders found
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className="bg-card border-border cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedOrder(order)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg">Order #{order.id}</h3>
                          <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl text-primary mb-1">Rp {order.total.toLocaleString('id-ID')}</p>
                        <p className="text-xs text-muted-foreground capitalize">{order.paymentMethod}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Customer</p>
                        <p>{order.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Order Type</p>
                        <p className="capitalize">{order.orderType}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Items ({order.items.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item) => (
                          <span key={item.id} className="text-xs px-2 py-1 bg-muted rounded">
                            {item.quantity}x {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order Details #{selectedOrder.id}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
                    <p>{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p>{selectedOrder.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order Type</p>
                    <p className="capitalize">{selectedOrder.orderType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Table Number</p>
                    <p>{selectedOrder.tableNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                    <p className="capitalize">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                    <p>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">Order Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div>
                            <p>{item.name}</p>
                            <p className="text-sm text-muted-foreground">Rp {item.price.toLocaleString('id-ID')} each</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-primary">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between text-xl mb-4">
                    <span>Total:</span>
                    <span className="text-primary">Rp {selectedOrder.total.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex gap-2">
                    {selectedOrder.status === 'pending' && (
                      <>
                        <Button
                          className="flex-1 bg-[#7A9D7E] hover:bg-[#6A8D6E]"
                          onClick={() => handleStatusChange(selectedOrder.id, 'completed')}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Completed
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleStatusChange(selectedOrder.id, 'cancelled')}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel Order
                        </Button>
                      </>
                    )}
                    {selectedOrder.status === 'cancelled' && (
                      <Button
                        className="w-full"
                        onClick={() => handleStatusChange(selectedOrder.id, 'pending')}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Restore to Pending
                      </Button>
                    )}
                    {selectedOrder.status === 'completed' && (
                      <p className="text-center w-full text-muted-foreground py-2">Order completed</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

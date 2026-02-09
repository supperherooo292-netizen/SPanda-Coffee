import { Card, CardContent } from '../ui/card';
import { DollarSign, ShoppingBag, TrendingUp, Clock, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function AdminDashboard() {
  const { orders, menuItems, testimonials } = useApp();

  const today = new Date().toDateString();
  const todayOrders = orders.filter(
    order => new Date(order.createdAt).toDateString() === today
  );
  
  const todaySales = todayOrders.reduce((sum, order) => sum + order.total, 0);
  const completedToday = todayOrders.filter(order => order.status === 'completed').length;
  const pendingReviews = testimonials.filter(t => !t.approved).length;

  // Calculate best selling items
  const itemSales = new Map<string, number>();
  orders.forEach(order => {
    order.items.forEach(item => {
      const current = itemSales.get(item.name) || 0;
      itemSales.set(item.name, current + item.quantity);
    });
  });
  
  const bestSelling = Array.from(itemSales.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      title: 'Penjualan Hari Ini',
      value: `Rp ${todaySales.toLocaleString('id-ID')}`,
      icon: DollarSign,
      color: 'text-[#6F4E37]',
      bgColor: 'bg-[#6F4E37]/10',
    },
    {
      title: 'Total Pesanan',
      value: todayOrders.length.toString(),
      icon: ShoppingBag,
      color: 'text-[#A47551]',
      bgColor: 'bg-[#A47551]/10',
    },
    {
      title: 'Selesai',
      value: completedToday.toString(),
      icon: TrendingUp,
      color: 'text-[#7A9D7E]',
      bgColor: 'bg-[#7A9D7E]/10',
    },
    {
      title: 'Ulasan Menunggu',
      value: pendingReviews.toString(),
      icon: MessageCircle,
      color: 'text-[#D4A574]',
      bgColor: 'bg-[#D4A574]/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.title}</p>
                <p className="text-3xl">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Best Selling Menu */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-xl mb-4">Item Terlaris</h2>
            <div className="space-y-3">
              {bestSelling.length > 0 ? (
                bestSelling.map(([name, quantity], index) => (
                  <div key={name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                        {index + 1}
                      </span>
                      <span>{name}</span>
                    </div>
                    <span className="text-muted-foreground">{quantity} terjual</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No sales data yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-xl mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="mb-1">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleTimeString()} • {order.items.length} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary mb-1">${order.total.toFixed(2)}</p>
                      <span className={`
                        text-xs px-2 py-1 rounded-full
                        ${order.status === 'completed' ? 'bg-[#7A9D7E]/10 text-[#7A9D7E]' : ''}
                        ${order.status === 'pending' ? 'bg-[#D4A574]/10 text-[#D4A574]' : ''}
                        ${order.status === 'cancelled' ? 'bg-destructive/10 text-destructive' : ''}
                      `}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No orders yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

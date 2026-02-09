import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ReportsPage() {
  const { orders } = useApp();
  const [period, setPeriod] = React.useState('week');

  // Calculate daily sales for the chart
  const getDailySales = () => {
    const salesByDate = new Map<string, number>();
    
    orders.forEach(order => {
      if (order.status === 'completed') {
        const date = new Date(order.createdAt).toLocaleDateString();
        const current = salesByDate.get(date) || 0;
        salesByDate.set(date, current + order.total);
      }
    });

    return Array.from(salesByDate.entries())
      .map(([date, total]) => ({ date, total }))
      .slice(-7);
  };

  // Calculate category sales
  const getCategorySales = () => {
    const salesByCategory = new Map<string, number>();
    
    orders.forEach(order => {
      if (order.status === 'completed') {
        order.items.forEach(item => {
          const current = salesByCategory.get(item.category) || 0;
          salesByCategory.set(item.category, current + (item.price * item.quantity));
        });
      }
    });

    return Array.from(salesByCategory.entries())
      .map(([category, total]) => ({ 
        category: category.replace('-', ' '), 
        total 
      }));
  };

  const dailySalesData = getDailySales();
  const categorySalesData = getCategorySales();

  // Calculate totals
  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = completedOrders.length > 0 
    ? totalRevenue / completedOrders.length 
    : 0;

  const handleExport = () => {
    toast.success('Report exported successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Sales Reports</h2>
        <div className="flex gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground text-sm">Total Revenue</p>
              <TrendingUp className="w-5 h-5 text-[#6F4E37]" />
            </div>
            <p className="text-3xl mb-1">Rp {totalRevenue.toLocaleString('id-ID')}</p>
            <p className="text-xs text-muted-foreground">From {completedOrders.length} completed orders</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground text-sm">Average Order Value</p>
              <TrendingUp className="w-5 h-5 text-[#A47551]" />
            </div>
            <p className="text-3xl mb-1">Rp {averageOrderValue.toLocaleString('id-ID')}</p>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground text-sm">Total Orders</p>
              <TrendingUp className="w-5 h-5 text-[#7A9D7E]" />
            </div>
            <p className="text-3xl mb-1">{orders.length}</p>
            <p className="text-xs text-muted-foreground">{completedOrders.length} completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h3 className="text-lg mb-4">Daily Sales</h3>
            {dailySalesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="var(--muted-foreground)" 
                    fontSize={12}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                    formatter={(value: any) => `Rp ${value.toLocaleString('id-ID')}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#6F4E37" 
                    strokeWidth={2}
                    dot={{ fill: '#6F4E37' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No sales data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Sales Chart */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h3 className="text-lg mb-4">Sales by Category</h3>
            {categorySalesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categorySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis 
                    dataKey="category" 
                    stroke="var(--muted-foreground)" 
                    fontSize={12}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                    formatter={(value: any) => `Rp ${value.toLocaleString('id-ID')}`}
                  />
                  <Bar dataKey="total" fill="#A47551" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No category data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <h3 className="text-lg mb-4">Recent Completed Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Items</th>
                  <th className="text-right py-3 px-4 text-sm text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {completedOrders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">#{order.id}</td>
                    <td className="py-3 px-4 text-sm">{order.customerName}</td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm">{order.items.length}</td>
                    <td className="py-3 px-4 text-sm text-right text-primary">
                      Rp {order.total.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {completedOrders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No completed orders yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

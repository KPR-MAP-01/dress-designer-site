import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Package, CheckCircle, Clock, Truck, Star } from "lucide-react";

interface Order {
  orderId: string;
  fullName: string;
  email: string;
  costumeType: string;
  status: 'received' | 'in-progress' | 'ready' | 'shipped' | 'delivered';
  createdAt: string;
  deliveryDate?: string;
}

const OrderTracking = () => {
  const [searchOrderId, setSearchOrderId] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load recent orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    setRecentOrders(orders.slice(-5).reverse()); // Show last 5 orders
  }, []);

  const handleSearch = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find((o: Order) => o.orderId === searchOrderId);
    setFoundOrder(order || null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'in-progress':
        return <Package className="h-5 w-5 text-yellow-500" />;
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <Star className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusSteps = (currentStatus: string) => {
    const steps = [
      { key: 'received', label: 'Order Received', description: 'Your order has been received and is being reviewed' },
      { key: 'in-progress', label: 'In Progress', description: 'Your costume is being crafted by our artisans' },
      { key: 'ready', label: 'Ready for Pickup', description: 'Your costume is ready and will be shipped soon' },
      { key: 'shipped', label: 'Shipped', description: 'Your order is on its way to you' },
      { key: 'delivered', label: 'Delivered', description: 'Your order has been delivered successfully' },
    ];

    const currentIndex = steps.findIndex(step => step.key === currentStatus);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex,
    }));
  };

  return (
    <section id="tracking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Track Your Order
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter your order ID to check the status of your custom costume
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Order Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-accent" />
                Search Your Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    placeholder="Enter your order ID (e.g., EC123456)"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleSearch}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Found Order Details */}
          {foundOrder && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Details - {foundOrder.orderId}</span>
                  <Badge className={getStatusColor(foundOrder.status)}>
                    {foundOrder.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {foundOrder.fullName}</p>
                      <p><strong>Email:</strong> {foundOrder.email}</p>
                      <p><strong>Costume Type:</strong> {foundOrder.costumeType.replace('-', ' ')}</p>
                      <p><strong>Order Date:</strong> {new Date(foundOrder.createdAt).toLocaleDateString()}</p>
                      {foundOrder.deliveryDate && (
                        <p><strong>Expected Delivery:</strong> {new Date(foundOrder.deliveryDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Order Progress</h4>
                    <div className="space-y-3">
                      {getStatusSteps(foundOrder.status).map((step, index) => (
                        <div key={step.key} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 ${step.completed ? 'text-green-500' : 'text-gray-300'}`}>
                            {getStatusIcon(step.key)}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {step.label}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {searchOrderId && !foundOrder && (
            <Card className="mb-8">
              <CardContent className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No order found with ID: {searchOrderId}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Please check your order ID and try again
                </p>
              </CardContent>
            </Card>
          )}

          {/* Recent Orders */}
          {recentOrders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div 
                      key={order.orderId} 
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {getStatusIcon(order.status)}
                        <div>
                          <p className="font-medium">{order.orderId}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.costumeType.replace('-', ' ')} • {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderTracking;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { Clock, CheckCircle, Truck, Package } from 'lucide-react';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getById(orderId);
      setOrder(response.data.data);
    } catch (err) {
      setError('Failed to fetch order details');
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-6 h-6 text-blue-500" />;
      case 'baking':
        return <Package className="w-6 h-6 text-orange-500" />;
      case 'ready':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'delivered':
        return <Truck className="w-6 h-6 text-green-600" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Order Pending';
      case 'confirmed':
        return 'Order Confirmed';
      case 'baking':
        return 'Cake Baking';
      case 'ready':
        return 'Ready for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading order details...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error || 'Order not found'}</div>
        <button onClick={fetchOrder} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order #{order.id.slice(0, 8)}</h1>
        <p className="text-gray-600">Track your order status</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Status */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Status</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                {getStatusIcon(order.status)}
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {getStatusText(order.status)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="card p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
            
            <div className="space-y-4">
              {order.order_items?.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.cake?.image_url ? (
                      <img 
                        src={item.cake.image_url} 
                        alt={item.cake.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">
                        🧁
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.cake?.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Customer Information</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Name:</strong> {order.customer_name}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Phone:</strong> {order.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Delivery Address</h3>
                <p className="text-sm text-gray-600">{order.address}</p>
              </div>
              
              <hr className="border-gray-200" />
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Order Summary</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{order.total_amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <hr className="border-gray-200 my-1" />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₹{order.total_amount}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>Order placed: {new Date(order.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking; 
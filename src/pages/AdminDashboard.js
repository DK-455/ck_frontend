import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { BarChart3, Package, Users, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [ordersResponse] = await Promise.all([
        orderAPI.getAll({ limit: 1000 })
      ]);
      
      const orders = ordersResponse.data.data || [];
      const uniqueCustomers = new Set(orders.map(order => order.email)).size;
      
      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter(order => order.status === 'pending').length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total_amount, 0),
        totalCustomers: uniqueCustomers
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <Package className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toFixed(2)}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-purple-500'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <Link to="/admin/orders" className="btn-primary">
            Manage Orders
          </Link>
          <Link to="/admin/cakes" className="btn-secondary">
            Manage Cakes
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/orders"
              className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-800">View All Orders</h3>
              <p className="text-sm text-gray-600">Manage and update order status</p>
            </Link>
            <Link
              to="/admin/cakes"
              className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-800">Manage Cakes</h3>
              <p className="text-sm text-gray-600">Add, edit, or remove cakes</p>
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Dashboard loaded</p>
                <p className="text-xs text-gray-600">Just now</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Stats updated</p>
                <p className="text-xs text-gray-600">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 
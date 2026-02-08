import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderClient from "../../api/OrderClient";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null); // Track which order is being updated

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        OrderClient.init();
        const response = await OrderClient.getOrders();
        const ordersData = response.data?.orders || response.data || [];
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await OrderClient.updateOrderStatus(orderId, newStatus);
      // Update local state
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update order status");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Orders Management
        </h1>
        <div className="flex justify-center items-center min-h-64">
          <div className="text-white">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Orders Management
        </h1>
        <div className="flex justify-center items-center min-h-64">
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-6 rounded-lg text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Orders Management</h1>
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-gray-300">Order ID</th>
              <th className="px-6 py-3 text-gray-300">Total</th>
              <th className="px-6 py-3 text-gray-300">Status</th>
              <th className="px-6 py-3 text-gray-300">Date</th>
              <th className="px-6 py-3 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t border-slate-600">
                <td className="px-6 py-4 text-gray-300">
                  #{order._id.slice(-8)}
                </td>
                <td className="px-6 py-4 text-cyan-400">
                  Rp {order.totalPrice?.toLocaleString("id-ID") || 0}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status || "Pending"}
                    onChange={(e) =>
                      handleStatusUpdate(order._id, e.target.value)
                    }
                    disabled={updating === order._id}
                    className="bg-slate-600 text-white px-2 py-1 rounded text-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {new Date(order.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/order/${order._id}`}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded mr-2"
                  >
                    View
                  </Link>
                  {updating === order._id && (
                    <span className="text-yellow-400 text-sm ml-2">
                      Updating...
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;

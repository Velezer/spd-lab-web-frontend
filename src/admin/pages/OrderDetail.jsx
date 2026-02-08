import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import OrderClient from "../../api/OrderClient";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        OrderClient.init();
        const response = await OrderClient.getOrderById(id);
        const orderData = response.data?.order || response.data;
        setOrder(orderData);
      } catch (err) {
        console.error("Error fetching order detail:", err);
        setError(err.response?.data?.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetail();
    }
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      await OrderClient.updateOrderStatus(id, newStatus);
      setOrder({ ...order, status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-white">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-6 rounded-lg text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700/50 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Order not found
            </h3>
            <Link
              to="/admin/orders"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          to="/admin/orders"
          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Orders
        </Link>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Order Details
        </h2>
        <p className="text-slate-300 text-xl max-w-2xl mx-auto">
          Complete information about the order
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Order Information
              </h3>
              <div className="space-y-2">
                <p className="text-slate-400">
                  <span className="font-medium text-white">Order ID:</span> #
                  {order._id}
                </p>
                <p className="text-slate-400">
                  <span className="font-medium text-white">Customer:</span>{" "}
                  {order.user?.name && order.user.name !== "undefined"
                    ? order.user.name
                    : "Unknown"}
                </p>
                <p className="text-slate-400">
                  <span className="font-medium text-white">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white">Status:</span>
                  <select
                    value={order.status || "Pending"}
                    onChange={(e) => handleStatusUpdate(e.target.value)}
                    disabled={updating}
                    className="bg-slate-600 text-white px-3 py-1 rounded text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {updating && (
                    <span className="text-yellow-400 text-sm">Updating...</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Payment Summary
              </h3>
              <div className="space-y-2">
                <p className="text-slate-400">
                  <span className="font-medium text-white">Subtotal:</span> Rp{" "}
                  {order.totalPrice.toLocaleString("id-ID")}
                </p>
                <p className="text-slate-400">
                  <span className="font-medium text-white">Shipping:</span> Rp 0
                </p>
                <p className="text-cyan-400 font-semibold text-lg">
                  <span className="font-medium text-white">Total:</span> Rp{" "}
                  {order.totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-white font-semibold text-xl mb-6">Order Items</h3>
          <div className="space-y-6">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-6 p-4 bg-slate-700/30 rounded-lg"
              >
                <img
                  src={
                    item.product?.imgUrl ||
                    `https://picsum.photos/300/200?random=${item.product?._id}` ||
                    "/placeholder-image.jpg"
                  }
                  alt={item.product?.name || "Product"}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg mb-1">
                    {item.product?.name || "Unknown Product"}
                  </h4>
                  <p className="text-slate-400 text-sm mb-2">
                    {item.product?.description || "No description available"}
                  </p>
                  <div className="flex items-center space-x-4">
                    <p className="text-slate-400">
                      <span className="font-medium text-white">Quantity:</span>{" "}
                      {item.quantity}
                    </p>
                    <p className="text-slate-400">
                      <span className="font-medium text-white">Price:</span> Rp{" "}
                      {item.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-cyan-400 font-semibold">
                      Subtotal: Rp{" "}
                      {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;

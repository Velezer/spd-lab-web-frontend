import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderClient from "../../api/OrderClient";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        OrderClient.init();
        const response = await OrderClient.getOrders();
        // Handle different possible response structures
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Your Orders
        </h2>
        <p className="text-slate-300 text-xl max-w-2xl mx-auto">
          Track and manage all your transactions
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="text-white">Loading orders...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-6 rounded-lg text-center">
            {error}
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700/50 text-center">
            <svg
              className="mx-auto h-24 w-24 text-slate-400 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-4">
              No orders yet
            </h3>
            <p className="text-slate-300 mb-6">
              Your order history will appear here once you make a purchase
            </p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Order #{order._id.slice(-8)}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-semibold">
                    Total: Rp {order.totalPrice.toLocaleString("id-ID")}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {order.status || "Pending"}
                  </p>
                  <Link
                    to={`/order/${order._id}`}
                    className="inline-block mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    <img
                      src={
                        item.product?.imgUrl ||
                        `https://picsum.photos/300/200?random=${item.product?._id}` ||
                        "/placeholder-image.jpg"
                      }
                      alt={item.product?.name || "Product"}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {item.product?.name || "Unknown Product"}
                      </p>
                      <p className="text-slate-400 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-white">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

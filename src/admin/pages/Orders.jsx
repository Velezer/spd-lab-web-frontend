import React, { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      total: 250,
      status: "Completed",
      date: "2023-05-01",
    },
    {
      id: 2,
      customer: "Jane Smith",
      total: 150,
      status: "Pending",
      date: "2023-05-02",
    },
    {
      id: 3,
      customer: "Bob Johnson",
      total: 300,
      status: "Shipped",
      date: "2023-05-03",
    },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Orders Management</h1>
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-gray-300">Order ID</th>
              <th className="px-6 py-3 text-gray-300">Customer</th>
              <th className="px-6 py-3 text-gray-300">Total</th>
              <th className="px-6 py-3 text-gray-300">Status</th>
              <th className="px-6 py-3 text-gray-300">Date</th>
              <th className="px-6 py-3 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-slate-600">
                <td className="px-6 py-4 text-gray-300">#{order.id}</td>
                <td className="px-6 py-4 text-white">{order.customer}</td>
                <td className="px-6 py-4 text-cyan-400">${order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.status === "Completed"
                        ? "bg-green-500 text-white"
                        : order.status === "Pending"
                          ? "bg-yellow-500 text-black"
                          : "bg-blue-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">{order.date}</td>
                <td className="px-6 py-4">
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded mr-2">
                    View
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Cancel
                  </button>
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

import React from "react";

function Orders() {
  // Dummy data untuk tampilan saja
  const orders = []; // Kosongkan dulu untuk tampilan

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

      {orders.length === 0 ? (
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
              key={order.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Order #{order.id}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Placed on {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-semibold">
                    Total: {order.total}
                  </p>
                  <p className="text-slate-400 text-sm">{order.status}</p>
                </div>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-slate-400 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-white">{item.price}</p>
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

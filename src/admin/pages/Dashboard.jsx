import React from "react";

function Dashboard() {
  const stats = [
    {
      title: "Total Products",
      value: "150",
      icon: "📦",
      color: "text-blue-400",
    },
    {
      title: "Total Users",
      value: "1,234",
      icon: "👥",
      color: "text-green-400",
    },
    {
      title: "Total Orders",
      value: "567",
      icon: "📋",
      color: "text-yellow-400",
    },
    {
      title: "Revenue",
      value: "$12,345",
      icon: "💰",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-4xl mr-4">{stat.icon}</div>
              <div>
                <p className="text-gray-300 text-sm">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Order #1234</p>
                <p className="text-gray-400 text-sm">John Doe - $250</p>
              </div>
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                Completed
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Order #1235</p>
                <p className="text-gray-400 text-sm">Jane Smith - $150</p>
              </div>
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs">
                Pending
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Order #1236</p>
                <p className="text-gray-400 text-sm">Bob Johnson - $300</p>
              </div>
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                Shipped
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Top Products</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Product A</p>
                <p className="text-gray-400 text-sm">Sold: 45 units</p>
              </div>
              <p className="text-cyan-400 font-semibold">$100</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Product B</p>
                <p className="text-gray-400 text-sm">Sold: 32 units</p>
              </div>
              <p className="text-cyan-400 font-semibold">$200</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Product C</p>
                <p className="text-gray-400 text-sm">Sold: 28 units</p>
              </div>
              <p className="text-cyan-400 font-semibold">$150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

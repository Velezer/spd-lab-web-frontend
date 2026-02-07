import React, { useState } from "react";

function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 100, stock: 50 },
    { id: 2, name: "Product 2", price: 200, stock: 30 },
    { id: 3, name: "Product 3", price: 150, stock: 20 },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Products Management
      </h1>
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-gray-300">ID</th>
              <th className="px-6 py-3 text-gray-300">Name</th>
              <th className="px-6 py-3 text-gray-300">Price</th>
              <th className="px-6 py-3 text-gray-300">Stock</th>
              <th className="px-6 py-3 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-slate-600">
                <td className="px-6 py-4 text-gray-300">{product.id}</td>
                <td className="px-6 py-4 text-white">{product.name}</td>
                <td className="px-6 py-4 text-cyan-400">${product.price}</td>
                <td className="px-6 py-4 text-gray-300">{product.stock}</td>
                <td className="px-6 py-4">
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Delete
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

export default Products;

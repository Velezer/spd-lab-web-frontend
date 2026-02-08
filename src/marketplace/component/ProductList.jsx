import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductClient from "../../api/ProductClient";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await ProductClient.getProducts();
        console.log("Response status:", response.status);
        if (response.status !== 200) {
          throw new Error(
            `Failed to fetch products: ${response.status} ${response.statusText}`,
          );
        }
        const data = response.data;
        console.log("Fetched data:", data);
        // Transform the data to match our component structure
        const transformedProducts = data.map((product) => ({
          id: product._id,
          name: product.name,
          price: `Rp ${product.price.toLocaleString("id-ID")}`,
          quantity: product.quantity,
          image:
            product.imgUrl ||
            `https://picsum.photos/300/200?random=${product._id}`,
        }));
        console.log("Transformed products:", transformedProducts);
        setProducts(transformedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Amazing Products
          </h2>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            Discover our curated collection of premium items designed for modern
            lifestyles
          </p>
        </div>
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Amazing Products
          </h2>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            Discover our curated collection of premium items designed for modern
            lifestyles
          </p>
        </div>
        <div className="flex justify-center items-center min-h-64">
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-8 max-w-md">
            <h3 className="text-red-400 text-xl font-bold mb-2">
              Error Loading Products
            </h3>
            <p className="text-slate-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Amazing Products
        </h2>
        <p className="text-slate-300 text-xl max-w-2xl mx-auto">
          Discover our curated collection of premium items designed for modern
          lifestyles
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-cyan-400/20 cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {product.name}
              </h3>
              <p className="text-cyan-400 font-semibold text-lg mb-2">
                {product.price}
              </p>
              <p className="text-slate-400 text-sm mb-4">
                Stock: {product.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

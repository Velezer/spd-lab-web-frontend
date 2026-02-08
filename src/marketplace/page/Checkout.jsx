import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderClient from "../../api/OrderClient";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];
  const [cartItems, setCartItems] = useState(() =>
    JSON.parse(localStorage.getItem("cart") || "[]").filter((item) =>
      selectedItems.includes(item.id),
    ),
  );
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    OrderClient.init();
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    // Check if cart is empty
    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }
  }, [navigate, cartItems.length]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate shipping address
    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      setError("Please fill in all shipping address fields.");
      setLoading(false);
      return;
    }

    // Construct order payload
    const orderData = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: parseInt(item.price.replace(/[^\d]/g, "")),
      })),
      totalPrice: calculateTotal(),
      shippingAddress,
      paymentMethod,
    };

    try {
      await OrderClient.createOrder(orderData);
      // Remove only selected items from cart
      const updatedCart = JSON.parse(
        localStorage.getItem("cart") || "[]",
      ).filter((item) => !selectedItems.includes(item.id));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems([]);
      // Redirect to orders page
      navigate("/orders");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Checkout
        </h2>
        <p className="text-slate-300 text-xl max-w-2xl mx-auto">
          Complete your order
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">
                    {item.name}
                  </h3>
                  <p className="text-cyan-400 font-medium">{item.price}</p>
                  <p className="text-slate-300">Quantity: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="space-y-4">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>Rp {calculateTotal().toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Shipping</span>
                <span>Rp 0</span>
              </div>
              <div className="border-t border-slate-700 pt-4">
                <div className="flex justify-between text-white font-bold text-xl">
                  <span>Total</span>
                  <span>Rp {calculateTotal().toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-white mb-6">
            Shipping & Payment
          </h3>
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-2">
                Shipping Address
              </label>
              <input
                type="text"
                placeholder="Street"
                value={shippingAddress.street}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    street: e.target.value,
                  })
                }
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                required
              />
              <input
                type="text"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 mt-2"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 mt-2"
                required
              />
              <input
                type="text"
                placeholder="Country"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 mt-2"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="e_wallet">E-Wallet</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all disabled:opacity-50"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

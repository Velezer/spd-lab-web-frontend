import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderClient from "../../api/OrderClient";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() =>
    JSON.parse(localStorage.getItem("cart") || "[]"),
  );
  const [selectedItems, setSelectedItems] = useState(() =>
    cartItems.map((item) => item.id),
  );

  useEffect(() => {
    OrderClient.init();
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    setSelectedItems((prev) => prev.filter((i) => i !== id));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ""));
        return total + price * item.quantity;
      }, 0);
  };

  const handleCheckout = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }
    navigate("/checkout", { state: { selectedItems } });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Your Cart
        </h2>
        <p className="text-slate-300 text-xl max-w-2xl mx-auto">
          Review and manage your selected items
        </p>
      </div>

      {cartItems.length === 0 ? (
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-4">
              Your cart is empty
            </h3>
            <p className="text-slate-300 mb-6">
              Start shopping to add items to your cart
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelection(item.id)}
                    className="w-5 h-5 text-cyan-400 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400 focus:ring-2"
                  />
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
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 h-fit">
            <h3 className="text-2xl font-bold text-white mb-6">
              Order Summary
            </h3>
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
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl mt-6"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

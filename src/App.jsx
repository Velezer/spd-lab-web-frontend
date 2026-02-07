import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./marketplace/component/Header.jsx";
import Footer from "./marketplace/component/Footer.jsx";
import ProductList from "./marketplace/component/ProductList.jsx";
import Login from "./marketplace/page/Login.jsx";
import Register from "./marketplace/page/Register.jsx";
import Profile from "./marketplace/page/Profile.jsx";
import ProductDetail from "./marketplace/page/ProductDetail.jsx";
import Cart from "./marketplace/page/Cart.jsx";
import Orders from "./marketplace/page/Orders.jsx";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleRegister = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
        <Header user={user} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/register"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/profile"
              element={<Profile user={user} onLogout={handleLogout} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

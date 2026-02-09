import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./marketplace/component/Header.jsx";
import Footer from "./marketplace/component/Footer.jsx";
import ProductList from "./marketplace/component/ProductList.jsx";
import Login from "./marketplace/page/Login.jsx";
import Register from "./marketplace/page/Register.jsx";
import Profile from "./marketplace/page/Profile.jsx";
import ProductDetail from "./marketplace/page/ProductDetail.jsx";
import Cart from "./marketplace/page/Cart.jsx";
import Checkout from "./marketplace/page/Checkout.jsx";
import Orders from "./marketplace/page/Orders.jsx";
import OrderDetail from "./marketplace/page/OrderDetail.jsx";
import AdminLayout from "./admin/pages/AdminLayout.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";
import AdminProducts from "./admin/pages/Products.jsx";
import AdminOrders from "./admin/pages/Orders.jsx";
import AdminOrderDetail from "./admin/pages/OrderDetail.jsx";
import AdminSettings from "./admin/pages/Settings.jsx";
import AdminProfile from "./admin/pages/AdminProfile.jsx";
import ProductClient from "./api/ProductClient";
import LogRocket from 'logrocket'

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    ProductClient.init();
  }, []);

  useEffect(() => {
    if (user) {
      const userDto = user.user;
      const userId = userDto.id || userDto.email || userDto.username || 'unknown';
      LogRocket.identify(userId, {
        name: userDto.name,
        email: userDto.email,
      });
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    const userDto = userData.user;
    const userId = userDto.id || userDto.email || userDto.username || 'unknown';
    LogRocket.identify(userId, {
      name: userDto.name,
      email: userDto.email,
    });
  };

  const handleRegister = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    const userDto = userData.user;
    const userId = userDto.id || userDto.email || userDto.username || 'unknown';
    LogRocket.identify(userId, {
      name: userDto.name,
      email: userDto.email,
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    try {
      LogRocket.identify('guest');
    } catch (e) {
      // ignore if LogRocket not available
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
              <Header user={user} />
              <main className="flex-1">
                <ProductList />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
              <Header user={user} />
              <main className="flex-1">
                <Login onLogin={handleLogin} />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
              <Header user={user} />
              <main className="flex-1">
                <Register onRegister={handleRegister} />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
              <Header user={user} />
              <main className="flex-1">
                <Profile user={user} onLogout={handleLogout} />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
              <Header user={user} />
              <main className="flex-1">
                <Cart />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/checkout"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
              <Header user={user} />
              <main className="flex-1">
                <Checkout />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/orders"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
              <Header user={user} />
              <main className="flex-1">
                <Orders />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/product/:id"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
              <Header user={user} />
              <main className="flex-1">
                <ProductDetail />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/order/:id"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
              <Header user={user} />
              <main className="flex-1">
                <OrderDetail />
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="order/:id" element={<AdminOrderDetail />} />
          <Route
            path="profile"
            element={<AdminProfile user={user} onLogout={handleLogout} />}
          />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

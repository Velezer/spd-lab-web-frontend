import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import ProductList from "./component/ProductList.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import Profile from "./page/Profile.jsx";
import ProductDetail from "./page/ProductDetail.jsx";
import Cart from "./page/Cart.jsx";
import Orders from "./page/Orders.jsx";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentView("home");
  };

  const handleRegister = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentView("home");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCurrentView("home");
  };

  const renderMain = () => {
    switch (currentView) {
      case "login":
        return (
          <Login
            onSwitchToRegister={() => setCurrentView("register")}
            onLogin={handleLogin}
          />
        );
      case "register":
        return (
          <Register
            onSwitchToLogin={() => setCurrentView("login")}
            onRegister={handleRegister}
          />
        );
      case "profile":
        return <Profile user={user} onLogout={handleLogout} />;
      case "cart":
        return <Cart />;
      default:
        return <ProductList />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
        <Header user={user} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route
              path="/login"
              element={
                <Login
                  onSwitchToRegister={() => setCurrentView("register")}
                  onLogin={handleLogin}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  onSwitchToLogin={() => setCurrentView("login")}
                  onRegister={handleRegister}
                />
              }
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

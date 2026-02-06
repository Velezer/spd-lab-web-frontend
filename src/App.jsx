import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './component/Header.jsx'
import Footer from './component/Footer.jsx'
import ProductList from './component/ProductList.jsx'
import Login from './page/Login.jsx'
import Register from './page/Register.jsx'
import Profile from './page/Profile.jsx'
import ProductDetail from './page/ProductDetail.jsx'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentView('home')
  }

  const handleRegister = (userData) => {
    setUser(userData)
    setCurrentView('home')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('home')
  }

  const renderMain = () => {
    switch (currentView) {
      case 'login':
        return <Login onSwitchToRegister={() => setCurrentView('register')} onLogin={handleLogin} />
      case 'register':
        return <Register onSwitchToLogin={() => setCurrentView('login')} onRegister={handleRegister} />
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} />
      default:
        return <ProductList />
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header user={user} onNavigate={setCurrentView} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={renderMain()} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

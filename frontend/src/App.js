import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/About';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { fetchProducts } from './Api';
import { fetchSubscriptions } from './Api';
import FacilitiesPage from './pages/FacilitiesPage';
import NotFound from './pages/NotFound';
import axios from 'axios';
import { CartContext, CartContextProvider } from './components/CartContext';
import MyPurchases from './pages/MyPurchases';
import Packages from './pages/Packages';

const API_URL="http://localhost:4000/";
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    const loadSubscriptions = async () => {
      try {
        const data = await fetchSubscriptions();
        console.log('Subscriptions:', data);
      } catch (error) {
        console.error('Failed to load subscriptions:', error);
      }
    };

    loadSubscriptions();
    loadProducts();
  }, []);

  


  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <CartContextProvider>
      <Router>
        <div className="flex flex-col min-h-screen dark-mode">
          <Header cartItems={cartItems} toggleCart={toggleCart} setCurrentPage={setCurrentPage} />
          <main className="flex-grow bg-gray-200">
            {showCart ? (
              <div className="container mx-auto px-4 py-8">
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<HomePage setCurrentPage={setCurrentPage} />} />
                <Route path="/facilities" element={<FacilitiesPage products={products} addToCart={addToCart} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
                <Route path="/profile/mypurchases" element={<MyPurchases />} />
                <Route path="/packages" element={<Packages packages={packages} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </main>
          <Footer />
        </div>
      </Router>
    </CartContextProvider>
    
  );
}

export default App;
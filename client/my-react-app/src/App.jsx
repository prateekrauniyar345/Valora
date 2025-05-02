// import from React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { useEffect, useState } from 'react';

// imports from components folder
import Header from './components/header';
import Footer from './components/footer';


// imports from pages folder
import LandingPage from './pages/LandingPage';
import About from './pages/about';
import Contact from './pages/contacts';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductListing from './pages/ProductListing'; 
import ProductDetails  from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Collections from './pages/Collections';
import Shop from './pages/Shop';
import Sale from './pages/Sale';
import Shipping from './pages/Shipping';
import Returns from './pages/Return';
import FAQs from './pages/FAQs';
import SizeGuide from './pages/SizeGuide';
import Profile from './pages/Profile';
import AdminProducts from './pages/AdminProducts';



import './App.css';
import { CartProvider } from './components/CartContext';

function PageLogger() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      console.log('🏠 I am in home page');
    } else if (location.pathname === '/about') {
      console.log('📘 I am in about page');
    } else if (location.pathname === '/contact') {
      console.log('📞 I am in contact page');
    }
  }, [location.pathname]);

  return null; // It doesn't render anything, just logs
}

function App() {
  return (
    <CartProvider>
    <Router>
    <PageLogger />
      <Header />

      <div className="content">
      <Routes>
        {/* Category pages */}
        <Route
            path="/products/:gender/:category"
          element={<ProductListing />}
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 🆕 Dynamic product route */}
        {/* <Route path="/products/:gender/:subcategory" element={<ProductListing />} /> */}
        <Route path="/products/:gender/:category" element={<ProductListing />} />
        <Route path="/search" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        <Route path="/collections" element={<Collections />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/products" element={<AdminProducts />} />



      </Routes>
    
      </div>

      <Footer />
    </Router>
    </CartProvider>
  );
}

export default App;

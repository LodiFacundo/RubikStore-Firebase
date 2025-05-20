import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Contacto from './components/Pages/Contacto/Contacto';
import Nosotros from './components/Pages/Nosotros/Nosotros';
import ItemListContainer from './components/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ProductDetail from './components/ProductDetail/ProductDetail';
import CartPage from './components/CartPage/CartPage';
import Checkout from './components/Checkout';
import { CartProvider } from './components/CartContext';
import Home from './components/Pages/Home/Home';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <NavBar />
        <Main />
      </Router>
    </CartProvider>
  );
};

const Main = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/categoria/:category" element={<ItemListContainer />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/lista" element={<ItemListContainer />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      {location.pathname === '/' && <Footer />}
    </>
  );
};

export default App;
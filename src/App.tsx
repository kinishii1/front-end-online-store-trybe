import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import { ProductType } from './types';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const productsInCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCartCount = productsInCart
      .reduce((sum: number, product: ProductType) => sum + (product.quantity || 0), 0);
    setCartCount(newCartCount);
  };

  return (
    <Routes>
      {/* Pagina Inicial - Requisito 2 */}
      <Route
        path="/"
        element={
          <Home
            cartCount={ cartCount }
            updateCartCount={ updateCartCount }
          />
      }
      />

      {/* Pagina de Carrinho - Requisito 3 */}
      <Route path="/cart" element={ <Cart cartCount={ cartCount } /> } />
      <Route path="/checkout" element={ <Checkout cartCount={ cartCount } /> } />
      <Route
        path="/productDetails/:productId"
        element={ <ProductDetails
          cartCount={ cartCount }
          updateCartCount={ updateCartCount }
        /> }
      />
    </Routes>
  );
}

export default App;

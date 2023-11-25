import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Routes>
      {/* Pagina Inicial - Requisito 2 */}
      <Route
        path="/"
        element={
          <Home />
      }
      />
      {/* Pagina que mostra os detalhes do produto - Requisito 7 */}
      <Route path="/productDetails/:productId" element={ <ProductDetails /> } />
      {/* Pagina de Carrinho - Requisito 3 */}
      <Route path="/cart" element={ <Cart /> } />
      {/* Pagina de Checkout - Requisito 11 */}
      <Route path="/checkout" element={ <Checkout /> } />
    </Routes>
  );
}

export default App;

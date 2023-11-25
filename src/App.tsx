import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  const [cartList, setCartList] = useState<any[]>([]);
  return (
    <Routes>
      {/* Pagina Inicial - Requisito 2 */}
      <Route
        path="/"
        element={ <Home /> }
      />
      {/* Página de Detalhes do Produto - Novo Requisito */}
      <Route
        path="/product/:productId"
        element={ <ProductDetails /> }
      />
      {/* Página de Carrinho - Requisito 3 */}
      <Route
        path="/cart"
        element={ <Cart cartList={ cartList } /> }
      />
    </Routes>
  );
}

export default App;

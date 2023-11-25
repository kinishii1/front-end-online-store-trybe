import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';

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
      {/* Pagina de Carrinho - Requisito 3 */}
      <Route path="/cart" element={ <Cart /> } />
    </Routes>
  );
}

export default App;

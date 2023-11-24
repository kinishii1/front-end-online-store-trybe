import { ChangeEvent, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  // receber os dados da API e armazenar no estado
  const [productsList, setProductsList] = useState([]);

  // state para o input de pesquisa da pagina inicial
  const [search, setSearch] = useState('');

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Routes>
      {/* Pagina Inicial - Requisito 2 */}
      <Route
        path="/"
        element={
          <Home productsList={ productsList } changeHandler={ changeHandler } />
        }
      />
      {/* Pagina de Carrinho - Requisito 3 */}
      <Route path="/cart" element={ <Cart productsList={ productsList } /> } />
    </Routes>
  );
}

export default App;

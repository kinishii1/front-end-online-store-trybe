import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      {/* Pagina Inicial - Requisito 2 */}
      <Route path="/" element={ <Home /> } />
    </Routes>
  );
}

export default App;

import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

type PropsHome = {
  productsList: any[];
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

function Home({ productsList, changeHandler }: PropsHome) {
  return (
    <>
      <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
      <input type="text" onChange={ changeHandler } />
      {productsList.length > 0 ? (
        // renderizar os itens da lista aqui dentro
        <div>Products exist</div>
      ) : (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      )}
    </>
  );
}

export default Home;

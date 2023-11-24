import { ChangeEvent, useState } from 'react';

function Home() {
  const [search, setSearch] = useState('');
  const [productsList, setProductsList] = useState([]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    console.log(search);
  };

  return (
    <>
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

import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { addToCart, getCategories, getProductsFromCategoryAndQuery }
  from '../services/api';
import SideCart from './SideCart';
import { HomeProps, ProductType } from '../types';

// Tipo para os objetos de categoria
interface Category {
  id: string;
  name: string;
}

function Home({ cartCount, updateCartCount }: HomeProps) {
  const [search, setSearch] = useState('');
  const [productsList, setProductsList] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData: Category[] = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    updateCartCount();
  }, [updateCartCount]);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCategoryClick = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setProductsList([]);
    try {
      const searchData = await getProductsFromCategoryAndQuery(
        categoryId,
        search,
      );
      setProductsList(searchData.results);
      setSearched(true);
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
      setProductsList([]);
      setSearched(false);
      setSelectedCategory('');
    }
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = await getProductsFromCategoryAndQuery(
        selectedCategory,
        search,
      );

      if (data.results.length === 0) {
        setProductsList([]);
      } else {
        setProductsList(data.results);
      }
      setSearched(true);
    } catch (error) {
      console.error('Erro ao buscar produtos por texto', error);
      setProductsList([]);
      setSearched(false);
    }
  };

  const handleAddInCart = (product: ProductType) => {
    addToCart(product);
    updateCartCount();
  };

  return (
    <>
      <SideCart showCart={ showCart } />
      <Link
        onMouseEnter={ () => setShowCart(true) }
        onMouseLeave={ () => setShowCart(false) }
        data-testid="shopping-cart-button"
        to="/cart"
      >
        Carrinho
        <span data-testid="shopping-cart-size">{cartCount}</span>
      </Link>
      <h1>Lista de Produtos</h1>
      <form onSubmit={ handleSearch }>
        <input
          type="text"
          onChange={ handleSearchInput }
          placeholder="Digite o produto desejado..."
          value={ search }
          data-testid="query-input"
        />
        {' '}
        {categories.length > 0 ? (
          categories.map((category, i) => (
            <div key={ category.id }>
              <input
                type="radio"
                id={ `category-${i}` }
                name="category"
                value={ category.id }
                checked={ selectedCategory === category.id }
                onChange={ () => handleCategoryClick(category.id) }
                data-testid="category"
              />
              <label htmlFor={ `category-${i}` }>{category.name}</label>
            </div>
          ))
        ) : (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        <button data-testid="query-button" type="submit">
          Pesquisa
        </button>
      </form>
      {searched && (
        <div>
          {productsList.length > 0 ? (
            <ul>
              {productsList.map((product: any) => (
                <>
                  <Link
                    to={ `/productDetails/${product.id}` }
                    data-testid="product-detail-link"
                  >
                    <li key={ product.id } data-testid="product">
                      {product.title}
                    </li>
                    {product.shipping?.free_shipping
                      && <p data-testid="free-shipping">Frete grátis</p>}
                  </Link>
                  <button
                    data-testid="product-add-to-cart"
                    onClick={ () => handleAddInCart(product) }
                  >
                    Adicionar ao carrinho
                  </button>
                </>
              ))}
            </ul>
          ) : (
            <p data-testid="home-initial-message">
              {search.trim() !== ''
                ? 'Nenhum produto foi encontrado.'
                : 'Digite algum termo de pesquisa ou escolha uma categoria.'}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Home;

import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  addToCart,
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import { HomeProps, ProductType } from '../types';
import '../css/ProductCard.css';
import '../css/CartIcon.css';
import Header from './Header';
import styles from '../css/Home.module.css';
import Titulos from '../components/Titulos';

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
  const [cartList, setCartList] = useState<ProductType[]>([]);

  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

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
    setCartList([...cartList, product]);
    console.log(cartList);
  };

  const handleOrderBy = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'asc') {
      const orderedProducts = [...productsList].sort(
        (a, b) => a.price - b.price,
      );
      console.log(orderedProducts);
      setProductsList(orderedProducts);
    } else if (event.target.value === 'desc') {
      const orderedProducts = [...productsList].sort(
        (a, b) => b.price - a.price,
      );
      console.log(orderedProducts);
      setProductsList(orderedProducts);
    } else if (event.target.value === 'alpha') {
      const orderedProducts = [...productsList].sort((a, b) => {
        const aTitleFirstThree = a.title.slice(0, 3);
        const bTitleFirstThree = b.title.slice(0, 3);
        return aTitleFirstThree.localeCompare(bTitleFirstThree);
      });
      setProductsList(orderedProducts);
    }
  };
  return (
    <div className={ styles.pai }>
      <Header cartCount={ cartCount } />
      <main className={ styles.containerMain }>
        <form className={ styles.categorias } onSubmit={ handleSearch }>
          <input
            className={ styles.search }
            type="text"
            onChange={ handleSearchInput }
            placeholder="Digite o produto desejado..."
            value={ search }
            data-testid="query-input"
          />
          <Titulos>Categorias</Titulos>
          {categories.length > 0 ? (
            categories.map((category, i) => (
              <div className={ styles.radioCategory } key={ category.id }>
                <input
                  type="radio"
                  id={ `category-${i}` }
                  name="category"
                  value={ category.id }
                  checked={ selectedCategory === category.id }
                  onChange={ () => handleCategoryClick(category.id) }
                  data-testid="category"
                />
                <label
                  htmlFor={ `category-${i}` }
                >
                  {category.name}
                </label>
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
          <div className={ styles.produtos }>
            <select onChange={ handleOrderBy }>
              <option value="">Ordenar por preço</option>
              <option value="asc">Maior preço</option>
              <option value="desc">Menor preço</option>
              <option value="alpha">Ordem alfabética</option>
            </select>
            {productsList.length > 0 ? (
              <ul className="product-list">
                {productsList.map((product: any) => {
                  const isInCart = cartList.some(
                    (item) => item.id === product.id,
                  );
                  return (
                    <div
                      key={ product.id }
                      className={ `product-card ${isInCart ? 'highlight' : ''}` }
                    >
                      <Link
                        to={ `/productDetails/${product.id}` }
                        data-testid="product-detail-link"
                      >
                        <img src={ product.thumbnail } alt={ product.title } />
                        <li
                          className="product-card__title"
                          data-testid="product"
                        >
                          {product.title}
                        </li>
                        <li className="product-card__price">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(product.price)}
                        </li>
                        {product.shipping?.free_shipping && (
                          <p
                            className="product-card__tag"
                            data-testid="free-shipping"
                          >
                            Frete grátis
                          </p>
                        )}
                      </Link>
                      <button
                        className="product-card__button"
                        data-testid="product-add-to-cart"
                        onClick={ () => handleAddInCart(product) }
                      >
                        Adicionar ao carrinho
                      </button>
                    </div>
                  );
                })}
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
      </main>
    </div>
  );
}

export default Home;

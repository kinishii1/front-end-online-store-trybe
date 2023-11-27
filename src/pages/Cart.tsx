import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changeQuantity, removeProduct } from '../services/api';
import { ProductType } from '../types';
import Header from './Header';

type CartProps = {
  cartCount: number;
};

function Cart({ cartCount }: CartProps) {
  const [cartList, setCartList] = useState<ProductType[]>([]);

  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const handleChangeQuantity = (product: ProductType, mult: number) => {
    setCartList(changeQuantity(product, mult));
  };

  const handleRemoveProduct = (product: ProductType) => {
    setCartList(removeProduct(product, cartList));
  };

  return (
    <div>
      <Header cartCount={ cartCount } />
      <h1>Carrinho de Compras</h1>
      {cartList.length > 0 ? (
        cartList.map((product) => (
          <div key={ product.id }>
            <img src={ product.thumbnail } alt={ product.title } />
            <p data-testid="shopping-cart-product-name">{product.title}</p>
            <p data-testid="shopping-cart-product-quantity">
              <strong>{product.quantity}</strong>
            </p>
            <p>{product.price}</p>
            <button
              data-testid="remove-product"
              onClick={ () => handleRemoveProduct(product) }
            >
              remover
            </button>
            <button
              data-testid="product-decrease-quantity"
              onClick={ () => handleChangeQuantity(product, -1) }
              disabled={ product.quantity === 1 }
            >
              -
            </button>
            <strong>{product.quantity}</strong>
            <button
              data-testid="product-increase-quantity"
              onClick={ () => handleChangeQuantity(product, 1) }
            >
              +
            </button>
          </div>
        ))
      ) : (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      )}
      <Link to="/checkout">
        <button
          disabled={ !cartList.length }
          data-testid="checkout-products"
        >
          Checkout
        </button>
      </Link>
    </div>
  );
}

export default Cart;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeQuantity, removeProduct } from '../services/api';
import { ProductType } from '../types';

import Header from './Header';
import CartListItens from '../components/CartListItens';
import styles from '../css/Cart.module.css';
import BackIcon from '../components/BackIcon';

type CartProps = {
  cartCount: number;
  updateCartCount: () => void;
};

function Cart({ cartCount, updateCartCount }: CartProps) {
  const [cartList, setCartList] = useState<ProductType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const handleChangeQuantity = (product: ProductType, mult: number) => {
    setCartList(changeQuantity(product, mult));
    updateCartCount();
  };

  const handleRemoveProduct = (product: ProductType) => {
    setCartList(removeProduct(product, cartList));
    updateCartCount();
  };

  return (
    <div>
      <Header cartCount={ cartCount } />
      <BackIcon />
      <div className={ styles.main_container }>
        <div className={ styles.container }>
          <h1>Carrinho de Compras</h1>
          {cartList.length > 0 ? (
            <CartListItens
              cartList={ cartList }
              handleChangeQuantity={ handleChangeQuantity }
              handleRemoveProduct={ handleRemoveProduct }
            />
          ) : (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )}
        </div>
        <div className={ styles.container }>
          <div className={ styles.checkout_steps }>
            <h2>Valor total da compra: </h2>
            <h3>
              {cartList.length > 0
                ? new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(
                  cartList.reduce(
                    (acc, curr) => acc + curr.price * (curr.quantity || 0),
                    0,
                  ),
                )
                : 'R$ 0,00'}
            </h3>
            <button
              disabled={ !cartList.length }
              data-testid="checkout-products"
              onClick={ () => navigate('/checkout') }
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

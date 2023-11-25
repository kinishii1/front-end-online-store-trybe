import { useEffect, useState } from 'react';
import { ProductType } from '../types';

function Cart() {
  const [cartList, setCartList] = useState<ProductType[]>([]);

  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  return (
    <>
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
          </div>
        ))
      ) : (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      )}
    </>
  );
}

export default Cart;

import styles from '../css/Checkout.module.css';
import { ProductType } from '../types';

function CheckoutListItens({ cartList }: { cartList: ProductType[] }) {
  return (
    <section className={ styles.itens }>
      <h1>Review Your Products</h1>
      {cartList.map(({ title, thumbnail, price, id, quantity }) => (
        <div className={ styles.cart_item } key={ id }>
          <img src={ thumbnail } alt={ title } />
          <h1>{title}</h1>
          <p
            data-testid="shopping-cart-product-quantity"
          >
            <strong>{quantity}</strong>
          </p>
          <span>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price)}
          </span>
        </div>
      ))}
      <p className={ styles.total }>
        Total:
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
      </p>
    </section>
  );
}

export default CheckoutListItens;

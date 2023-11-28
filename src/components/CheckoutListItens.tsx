import styles from '../css/Checkout.module.css';
import { ProductType } from '../types';

function CheckoutListItens({ cartList }: { cartList: ProductType[] }) {
  return (
    <section className={ styles.itens }>
      <h1>Review Your Products</h1>
      {cartList.map(({ title, thumbnail, price, id }) => (
        <div className={ styles.cart_item } key={ id }>
          <img src={ thumbnail } alt={ title } />
          <h1>{title}</h1>
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
        {Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(cartList.reduce((acc, curr) => acc + curr.price, 0))}
      </p>
    </section>
  );
}

export default CheckoutListItens;

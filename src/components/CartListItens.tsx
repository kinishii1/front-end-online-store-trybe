import { ProductType } from '../types';
import styles from '../css/CartListItens.module.css';

type CartListItensProps = {
  cartList: ProductType[];
  handleChangeQuantity: (product: ProductType, mult: number) => void;
  handleRemoveProduct: (product: ProductType) => void;
};

function CartListItens({
  cartList,
  handleChangeQuantity,
  handleRemoveProduct,
}: CartListItensProps) {
  return (
    <div className={ styles.product_list }>
      {cartList.map((product) => (
        <div className={ styles.card_product } key={ product.id }>
          <button
            className={ styles.remove_button }
            data-testid="remove-product"
            onClick={ () => handleRemoveProduct(product) }
          >
            X
          </button>
          <img src={ product.thumbnail } alt={ product.title } />
          <p className={ styles.title } data-testid="shopping-cart-product-name">
            {product.title}
          </p>
          <div className={ styles.quantity_buttons }>
            <button
              className={ styles.quantity_button }
              data-testid="product-decrease-quantity"
              onClick={ () => handleChangeQuantity(product, -1) }
              disabled={ product.quantity === 1 }
            >
              -
            </button>

            <p
              className={ styles.quantity }
              data-testid="shopping-cart-product-quantity"
            >
              <strong>{product.quantity}</strong>
            </p>

            <button
              className={ styles.quantity_button }
              data-testid="product-increase-quantity"
              onClick={ () => handleChangeQuantity(product, 1) }
            >
              +
            </button>
          </div>
          <p className={ styles.price }>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(product.price * (product.quantity || 0))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CartListItens;

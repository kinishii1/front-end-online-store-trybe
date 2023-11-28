import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import styles from '../css/Header.module.css';
import cartIcon from '../assets/cart-icon.svg';

type LayoutProsps = {
  cartCount: number;
};

function Layout({ cartCount }: LayoutProsps) {
  return (
    <header className={ styles.header }>
      <Link to="/">
        <img src={ Logo } alt="" />
      </Link>
      <Link
        data-testid="shopping-cart-button"
        to="/cart"
        className={ styles['link-cart'] }
      >
        <img src={ cartIcon } className={ styles['cart-icon'] } alt="cart-icon" />
        <span
          data-testid="shopping-cart-size"
          className={ styles['item-count'] }
        >
          { cartCount }
        </span>
      </Link>
    </header>
  );
}

export default Layout;

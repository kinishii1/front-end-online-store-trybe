import Cart from './Cart';
import { SideCartProps } from '../types';
import '../css/SideCart.css';

function SideCart({ showCart }: SideCartProps) {
  return (
    <div className="sideCart" hidden={ !showCart }>
      <Cart />
    </div>
  );
}

export default SideCart;

import { SideCartProps } from '../types';
import '../css/SideCart.css';

function SideCart({ showCart }: SideCartProps) {
  return (
    <div className="sideCart" hidden={ !showCart }>
      Itens
    </div>
  );
}

export default SideCart;

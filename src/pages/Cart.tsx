type CartProps = {
  cartList: any[];
};

function Cart({ cartList }: CartProps) {
  return (
    <>
      <h1>Carrinho de Compras</h1>
      {cartList.length > 0 ? (
        // renderizar os itens da lista aqui dentro
        <div>Products exist</div>
      ) : (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      )}
    </>
  );
}

export default Cart;

type PropsCart = {
  productsList: any[];
};

function Cart({ productsList }: PropsCart) {
  return (
    <>
      <h1>Carrinho de Compras</h1>
      {productsList.length > 0 ? (
        // renderizar os itens da lista aqui dentro
        <div>Products exist</div>
      ) : (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      )}
    </>
  );
}

export default Cart;

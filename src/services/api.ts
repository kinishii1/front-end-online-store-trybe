import { ProductType } from '../types';

export async function getCategories() {
  // Implemente aqui
  const data = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  return data.json();
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe.
  const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  return data.json();
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}

const getCart = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

const setCart = (arrayCart: ProductType[]) => {
  localStorage.setItem('cart', JSON.stringify(arrayCart));
};

export const addToCart = (product: ProductType) => {
  const cart = getCart();
  const itemInCart = cart
    .find((cartProduct: ProductType) => cartProduct.id === product.id);
  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  setCart(cart);
};

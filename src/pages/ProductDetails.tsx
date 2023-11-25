import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addToCart, getProductDetails } from '../services/api';
import { ProductType } from '../types';

function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const [productDetails, setProductDetails] = useState<any>({});

  useEffect(() => {
    if (productId) {
      getProductDetails(productId)
        .then((details) => setProductDetails(details))
        .catch((error) => console.error('Erro ao buscar detalhes do produto:', error));
    }
  }, [productId]);

  const handleAddInCart = (product: ProductType) => {
    addToCart(product);
  };

  return (
    <>
      <h1 data-testid="product-detail-name">{productDetails.title}</h1>
      <img
        src={ productDetails.image }
        alt={ productDetails.title }
        data-testid="product-detail-image"
      />
      <p data-testid="product-detail-price">{productDetails.price}</p>
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => handleAddInCart(productDetails) }
      >
        Adicionar ao carrinho
      </button>
      <Link to="/cart" data-testid="shopping-cart-button">
        Carrinho
      </Link>
    </>
  );
}

export default ProductDetails;

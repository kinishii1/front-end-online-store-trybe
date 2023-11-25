import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetails } from '../services/api';

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

  return (
    <>
      <h1 data-testid="product-detail-name">{productDetails.title}</h1>
      <img
        src={ productDetails.image }
        alt={ productDetails.title }
        data-testid="product-detail-image"
      />
      <p data-testid="product-detail-price">{productDetails.price}</p>
      {productDetails.shipping?.free_shipping
        && <p data-testid="free-shipping">Frete grátis</p>}
      <Link to="/cart" data-testid="shopping-cart-button">
        Carrinho
      </Link>
    </>
  );
}

export default ProductDetails;

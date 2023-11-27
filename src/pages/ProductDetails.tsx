import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReviewType, ProductType, HomeProps } from '../types';
import { addToCart, getProductDetails } from '../services/api';
import '../css/CartIcon.css';
import cartIcon from '../assets/cart-icon.svg';
import Header from './Header';

function ProductDetails({ cartCount, updateCartCount }: HomeProps) {
  const { productId } = useParams<{ productId: string }>();
  const [productDetails, setProductDetails] = useState<any>({});
  const ratings = [...Array(5).keys()].map((index) => index + 1);

  const [error, setError] = useState<string>('');
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [form, setForm] = useState<ReviewType>({
    email: '',
    rating: 0,
    review: '',
  });
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (productId) {
      getProductDetails(productId)
        .then((details) => setProductDetails(details))
        .catch(
          (requestError) => {
            console.error('Erro ao buscar detalhes do produto:', requestError);
          },
        );
    }
    if (productId) {
      const storedReviews = localStorage.getItem(productId);
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    }
    updateCartCount();
  }, [productId, updateCartCount]);

  const handleInputChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const validValue = name === 'rating' ? Number(value) : value;
    setForm({ ...form, [name]: validValue });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!productId) return;

    if (
      !form.email.length
      || !form.email.includes('.')
      || !form.email.includes('@')
      || !form.rating
    ) {
      setError('Campos inválidos');
      return;
    }

    const newReview: ReviewType = {
      email: form.email,
      rating: form.rating,
      review: form.review,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    localStorage.setItem(productId, JSON.stringify(updatedReviews));

    setForm({
      email: '',
      rating: 0,
      review: '',
    });

    setError('');
  };

  const handleAddInCart = (product: ProductType) => {
    addToCart(product);
    updateCartCount();

    setBounce(true);
    setTimeout(() => setBounce(false), 500);
  };

  return (
    <>
      <Header cartCount={ cartCount } />
      <h1 data-testid="product-detail-name">{productDetails.title}</h1>
      <img
        src={ productDetails.image }
        alt={ productDetails.title }
        data-testid="product-detail-image"
      />
      <p data-testid="product-detail-price">{productDetails.price}</p>
      {productDetails.shipping?.free_shipping && (
        <p data-testid="free-shipping">Frete grátis</p>
      )}
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => handleAddInCart(productDetails) }
      >
        Adicionar ao carrinho
      </button>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          <input
            data-testid="product-detail-email"
            type="text"
            name="email"
            value={ form.email }
            id="email"
            onChange={ handleInputChange }
          />
        </label>

        <label htmlFor="review">
          <textarea
            data-testid="product-detail-evaluation"
            name="review"
            value={ form.review }
            id="review"
            onChange={ handleInputChange }
          />
        </label>

        {ratings.map((value) => (
          <label htmlFor="" key={ value }>
            {value}
            <input
              data-testid={ `${value}-rating` }
              type="radio"
              name="rating"
              value={ value }
              onChange={ handleInputChange }
              checked={ form.rating === value }
            />
          </label>
        ))}

        {error && <p data-testid="error-msg">{error}</p>}

        <button type="submit" data-testid="submit-review-btn">
          Avaliar
        </button>
      </form>

      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={ index }>
            <p data-testid="review-card-email">{review.email}</p>
            <p data-testid="review-card-rating">{review.rating}</p>
            <p data-testid="review-card-evaluation">{review.review}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductDetails;

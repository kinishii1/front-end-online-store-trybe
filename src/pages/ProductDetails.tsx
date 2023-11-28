import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReviewType, ProductType, HomeProps } from '../types';
import { addToCart, getProductDetails } from '../services/api';
import '../css/CartIcon.css';
import Header from './Header';
import styles from '../css/ProductDetails.module.css';
import backIcon from '../assets/back.svg';

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
  };
  const navigate = useNavigate();
  return (
    <>
      <Header cartCount={ cartCount } />
      <div className={ styles.containerPai }>
        <section className={ styles.blockleft }>
          <button
            className={ styles.back }
            onClick={ () => {
              navigate('/');
            } }
          >
            <img src={ backIcon } alt="Back icon" />
            <p>Voltar</p>
          </button>
          <div>
            <h1
              className={ styles.title }
              data-testid="product-detail-name"
            >
              {productDetails.title}
            </h1>
            <img
              className={ styles.image }
              src={ productDetails.thumbnail }
              alt={ productDetails.title }
              data-testid="product-detail-image"
            />
          </div>

        </section>
        <section className={ styles.blockright }>
          <p data-testid="product-detail-price">
            <span>R$ </span>
            { productDetails.price }
          </p>
          {productDetails.shipping?.free_shipping && (
            <p data-testid="free-shipping">Frete grátis</p>
          )}
          <button
            className={ styles.btn }
            data-testid="product-detail-add-to-cart"
            onClick={ () => handleAddInCart(productDetails) }
          >
            Adicionar ao carrinho
          </button>

        </section>
      </div>
      <div className={ styles.contAv }>

        <form className={ styles.form } onSubmit={ handleSubmit }>
          <p>Avaliações</p>
          <label htmlFor="email">
            <input
              className={ styles.emailInput }
              data-testid="product-detail-email"
              type="text"
              name="email"
              placeholder="Email"
              value={ form.email }
              id="email"
              onChange={ handleInputChange }
            />
          </label>

          <label htmlFor="review">
            <textarea
              className={ styles.textAreaInput }
              data-testid="product-detail-evaluation"
              name="review"
              placeholder="Mensagem...!"
              value={ form.review }
              id="review"
              onChange={ handleInputChange }
            />
          </label>
          <div>
            Nota
            {ratings.map((value) => (
              <label className={ styles.radioLabel } htmlFor="" key={ value }>
                {value}
                <input
                  className={ styles.radio }
                  data-testid={ `${value}-rating` }
                  type="radio"
                  name="rating"
                  value={ value }
                  onChange={ handleInputChange }
                  checked={ form.rating === value }
                />
              </label>
            ))}
          </div>

          {error && <p data-testid="error-msg">{error}</p>}

          <button
            className={ styles.btn }
            type="submit"
            data-testid="submit-review-btn"
          >
            Avaliar
          </button>
        </form>

        <div className={ styles.reviews }>
          {reviews.map((review, index) => (
            <div className={ styles.comentarioIndividual } key={ index }>
              <div>
                <p
                  className={ styles.email }
                  data-testid="review-card-email"
                >
                  {review.email}
                </p>
                <p
                  className={ styles.nota }
                  data-testid="review-card-rating"
                >
                  {review.rating}
                </p>
              </div>
              <p
                className={ styles.comentario }
                data-testid="review-card-evaluation"
              >
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

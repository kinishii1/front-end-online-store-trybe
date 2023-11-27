import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutFormType, ProductType } from '../types';
import Header from './Header';

type CheckoutProps = {
  cartCount: number;
};

function Checkout({ cartCount }: CheckoutProps) {
  const [campos, setCampos] = useState<CheckoutFormType>({
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
  });

  const [cartList, setCartList] = useState<ProductType[]>([]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartList(cart);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCampos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { fullname, email, cpf, phone, cep, address, payment } = campos;
    const camposInvalidos = !fullname
    || !email || !cpf || !phone || !cep || !address || !payment;

    if (camposInvalidos) {
      setShowError(true);
      return;
    }

    localStorage.setItem('cart', JSON.stringify([]));
    navigate('/');
  };

  return (
    <>
      <Header cartCount={ cartCount } />
      <section>
        <h1>Review Your Products</h1>
        {cartList.map(({ title, thumbnail, price, id }) => (
          <div key={ id }>
            <img src={ thumbnail } alt={ title } />
            <span>{title}</span>
            <span>{price}</span>
          </div>
        ))}
      </section>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="fullname">Nome Completo:</label>
          <input
            name="fullname"
            type="text"
            id="fullname"
            data-testid="checkout-fullname"
            value={ campos.fullname }
            onChange={ handleChange }
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            id="email"
            data-testid="checkout-email"
            value={ campos.email }
            onChange={ handleChange }
            required
          />
        </div>

        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            name="cpf"
            type="text"
            id="cpf"
            data-testid="checkout-cpf"
            value={ campos.cpf }
            onChange={ handleChange }
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Telefone:</label>
          <input
            name="phone"
            type="text"
            id="phone"
            data-testid="checkout-phone"
            value={ campos.phone }
            onChange={ handleChange }
            required
          />
        </div>

        <div>
          <label htmlFor="cep">CEP:</label>
          <input
            name="cep"
            type="text"
            id="cep"
            data-testid="checkout-cep"
            value={ campos.cep }
            onChange={ handleChange }
            required
          />
        </div>

        <div>
          <label htmlFor="address">Endereço:</label>
          <input
            name="address"
            type="text"
            id="address"
            data-testid="checkout-address"
            value={ campos.address }
            onChange={ handleChange }
            required
          />
        </div>

        <div>
          <h3>Método de pagamento:</h3>
          <div>
            <input
              type="radio"
              id="ticket"
              name="payment"
              data-testid="ticket-payment"
              value="Boleto"
              checked={ campos.payment === 'Boleto' }
              onChange={ handleChange }
              required
            />
            <label htmlFor="ticket">Boleto</label>
          </div>
          <div>
            <input
              type="radio"
              id="visa"
              name="payment"
              data-testid="visa-payment"
              value="Visa"
              checked={ campos.payment === 'Visa' }
              onChange={ handleChange }
              required
            />
            <label htmlFor="visa">Visa</label>
          </div>
          <div>
            <input
              type="radio"
              id="master"
              name="payment"
              data-testid="master-payment"
              value="MasterCard"
              checked={ campos.payment === 'MasterCard' }
              onChange={ handleChange }
              required
            />
            <label htmlFor="master">MasterCard</label>
          </div>
          <div>
            <input
              type="radio"
              id="elo"
              name="payment"
              data-testid="elo-payment"
              value="Elo"
              checked={ campos.payment === 'Elo' }
              onChange={ handleChange }
              required
            />
            <label htmlFor="elo">Elo</label>
          </div>
        </div>
        { showError && <div data-testid="error-msg">Campos inválidos</div> }
        <button
          onClick={ handleSubmit }
          type="submit"
          data-testid="checkout-btn"
        >
          Enviar
        </button>
      </form>
      <form onSubmit={ handleSubmit } />
    </>
  );
}

export default Checkout;

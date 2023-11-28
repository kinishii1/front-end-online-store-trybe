import { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { CheckoutFormType, ProductType } from '../types';
import Header from './Header';
import backIcon from '../assets/back.svg';
import styles from '../css/Checkout.module.css';

import PaymentMethods from '../components/PaymentMethods';
import CheckoutListItens from '../components/CheckoutListItens';
import FormInputs from '../components/FormInputs';

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
    number: '',
    complemento: '',
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
      <section className={ styles.back }>
        <img src={ backIcon } alt="Back icon" />
        <p>Voltar</p>
      </section>
      <div className={ styles.container }>
        <CheckoutListItens cartList={ cartList } />
        <form className={ styles.form } onSubmit={ handleSubmit }>
          <h1>Informações do comprador</h1>
          <FormInputs campos={ campos } handleChange={ handleChange } />
          <div className={ styles.payment }>
            <h3>Método de pagamento:</h3>
            <PaymentMethods campos={ campos } handleChange={ handleChange } />
            <hr />
          </div>
          {showError && <div data-testid="error-msg">Campos inválidos</div>}
          <button
            onClick={ handleSubmit }
            type="submit"
            data-testid="checkout-btn"
            className={ styles.btn }
          >
            Comprar
          </button>
        </form>
        <form onSubmit={ handleSubmit } />
      </div>
    </>
  );
}

export default Checkout;

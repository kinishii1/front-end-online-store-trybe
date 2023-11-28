import boletoIcon from '../assets/boleto.svg';
import visaIcon from '../assets/visa.svg';
import masterIcon from '../assets/master.svg';
import eloIcon from '../assets/elo.svg';
import styles from '../css/Checkout.module.css';
import { CheckoutFormType } from '../types';

type PaymentMethodsProps = {
  campos: CheckoutFormType;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function PaymentMethods({ campos, handleChange }: PaymentMethodsProps) {
  return (
    <div className={ styles.payment_methods }>
      <div className={ styles.input_container }>
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
        <label htmlFor="ticket">
          <img src={ boletoIcon } alt="boleto" />
        </label>
      </div>
      <div className={ styles.input_container }>
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
        <label htmlFor="visa">
          <img src={ visaIcon } alt="visa" />
        </label>
      </div>
      <div className={ styles.input_container }>
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
        <label htmlFor="master">
          <img src={ masterIcon } alt="visa" />
        </label>
      </div>
      <div className={ styles.input_container }>
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
        <label htmlFor="elo">
          <img src={ eloIcon } alt="visa" />
        </label>
      </div>
    </div>
  );
}

export default PaymentMethods;

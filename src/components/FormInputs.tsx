import styles from '../css/Checkout.module.css';
import { CheckoutFormType } from '../types';

type FormInputsProps = {
  campos: CheckoutFormType;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInputs({ campos, handleChange }: FormInputsProps) {
  return (
    <>
      <div className={ styles.section_row }>
        <input
          className={ styles.input }
          name="fullname"
          type="text"
          id="fullname"
          data-testid="checkout-fullname"
          value={ campos.fullname }
          onChange={ handleChange }
          placeholder="Nome Completo"
          required
        />
        <input
          className={ styles.input }
          name="email"
          type="email"
          id="email"
          data-testid="checkout-email"
          value={ campos.email }
          onChange={ handleChange }
          placeholder="Email"
          required
        />
      </div>
      <div className={ styles.section_row }>
        <input
          className={ styles.input }
          placeholder="CPF"
          name="cpf"
          type="text"
          id="cpf"
          data-testid="checkout-cpf"
          value={ campos.cpf }
          onChange={ handleChange }
          required
        />

        <input
          className={ styles.input }
          placeholder="Telefone"
          name="phone"
          type="text"
          id="phone"
          data-testid="checkout-phone"
          value={ campos.phone }
          onChange={ handleChange }
          required
        />
      </div>
      <div className={ styles.section_row }>
        <input
          className={ styles.input_minor }
          placeholder="CEP"
          name="cep"
          type="text"
          id="cep"
          data-testid="checkout-cep"
          value={ campos.cep }
          onChange={ handleChange }
          required
        />
        <input
          className={ styles.input }
          placeholder="Endereço"
          name="address"
          type="text"
          id="address"
          data-testid="checkout-address"
          value={ campos.address }
          onChange={ handleChange }
          required
        />
      </div>
      <div className={ styles.section_row }>
        <input
          className={ styles.input }
          placeholder="Complemento"
          name="complemento"
          type="text"
          id="complemento"
          value={ campos.cep }
          onChange={ handleChange }
        />
        <input
          className={ styles.input_minor }
          placeholder="Numero"
          name="number"
          type="text"
          id="number"
          value={ campos.number }
          onChange={ handleChange }
        />
      </div>
    </>
  );
}

export default FormInputs;

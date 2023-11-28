import { Link } from 'react-router-dom';
import backIcon from '../assets/back.svg';
import styles from '../css/BackIcon.module.css';

function BackIcon() {
  return (
    <section className={ styles.back }>
      <Link to="/">
        <img src={ backIcon } alt="Back icon" />
      </Link>
      <p>Voltar</p>
    </section>
  );
}

export default BackIcon;

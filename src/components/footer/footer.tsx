import { FaHeart } from 'react-icons/fa';
import type { VFC } from 'react';

import styles from './footer.module.scss';

const Footer: VFC = () => {
  return (
    <footer>
      <p className={styles.copyright}>Copyright &copy; 2021 - à la Dine</p>
      <p>
        Made with{' '}
        <span className={styles.icon}>
          <FaHeart />
        </span>{' '}
        by Latif Sulistyo
      </p>
    </footer>
  );
};

export default Footer;

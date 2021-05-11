import { FaHeart } from 'react-icons/fa';
import type { VFC } from 'react';

import style from './footer.module.scss';

const Footer: VFC = () => {
  return (
    <footer>
      <p className={style.copyright}>Copyright &copy; 2021 - à la Dine</p>
      <p>
        Made with{' '}
        <span className={style.icon}>
          <FaHeart />
        </span>{' '}
        by Latif Sulistyo
      </p>
    </footer>
  );
};

export default Footer;

import type { VFC } from 'react';

import styles from './hero.module.scss';

const Hero: VFC = () => {
  return <div className={styles.hero}>This is hero</div>;
};

export default Hero;

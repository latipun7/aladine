import Eating from 'assets/eating.svg';
import Lamp from 'assets/lamp.svg';
import Lemonade from 'assets/lemonade.svg';
import type { VFC } from 'react';

import styles from './hero.module.scss';

const Hero: VFC = () => {
  return (
    <div className={styles.hero}>
      <Lamp width="25%" height="25%" className={styles.lamp} />
      <Lemonade width="25%" height="25%" className={styles.lemonade} />
      <h1>dine away the easy way 😋</h1>
      <Eating width="90%" height="60%" />
    </div>
  );
};

export default Hero;

import Eating from 'assets/eating.svg';
import Lamp from 'assets/lamp.svg';
import Lemonade from 'assets/lemonade.svg';
import type { VFC } from 'react';

import styles from './hero.module.scss';

const Hero: VFC = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.readyToPour}>
        <Lamp className={styles.lamp} />
        <Lemonade className={styles.lemonade} />
      </div>
      <h1>dine away the easy way 😋</h1>
      <Eating />
    </div>
  );
};

export default Hero;

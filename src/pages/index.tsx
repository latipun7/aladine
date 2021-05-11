import Card from 'components/card';
import DATA from 'src/DATA.json';
import type { VFC } from 'react';

import styles from 'styles/pages/index.module.scss';

const Index: VFC = () => {
  return (
    <>
      <h2>Choose Your Dining Restaurant</h2>
      <div className={styles.gridContainer}>
        {DATA.restaurants.map((data) => (
          <Card data={data} key={data.id} />
        ))}
      </div>
    </>
  );
};

export default Index;

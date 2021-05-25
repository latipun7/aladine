import DATA from 'src/DATA.json';
import Card from 'components/card';
import { parseTemplate, clearAllChild } from 'lib/utils';

import htmlString from './home.html';
import styles from './home.module.scss';

type HTMLString = {
  gridContainerStyle: string;
  loadingStyle: string;
};

class Home extends HTMLElement {
  gridContainer: HTMLSlotElement | null;

  constructor() {
    super();

    this.render();
    this.gridContainer = this.querySelector(`.${styles.gridContainer}`);
  }

  connectedCallback() {
    const { restaurants } = DATA;

    setTimeout(() => {
      clearAllChild(this.gridContainer);
      this.gridContainer?.classList.remove(`${styles.isLoading}`);

      restaurants.forEach((restaurant) => {
        const card = new Card();

        card.dataRestaurant = restaurant;
        this.gridContainer?.appendChild(card);
      });
    }, 1000);
  }

  render() {
    const template = parseTemplate<HTMLString>(htmlString, {
      gridContainerStyle: `${styles.gridContainer} ${styles.isLoading}`,
      loadingStyle: styles.loading,
    });

    this.appendChild(template.content);
  }
}

customElements.define('aladine-home', Home);
export default Home;

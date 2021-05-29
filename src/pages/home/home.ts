import Card from 'components/card';
import RestaurantAPI from 'lib/restaurant-api';
import { parseTemplate, clearAllChild } from 'utils';

import htmlString from './home.html';
import styles from './home.module.scss';

type HTMLString = {
  gridContainerStyle: string;
  loadingStyle: string;
};

class Home extends HTMLElement {
  gridContainer: HTMLDivElement | null;

  constructor() {
    super();

    this.render();
    this.gridContainer = this.querySelector(`.${styles.gridContainer}`);
  }

  async connectedCallback() {
    try {
      const api = new RestaurantAPI();
      const { restaurants } = await api.getList();

      clearAllChild(this.gridContainer);
      this.gridContainer?.classList.remove(`${styles.isLoading}`);

      restaurants.forEach((restaurant) => {
        const card = new Card();

        card.dataRestaurant = restaurant;
        this.gridContainer?.appendChild(card);
      });
    } catch (error) {
      if (error instanceof Error) {
        const paragraphElement = document.createElement('p');

        clearAllChild(this.gridContainer);
        paragraphElement.innerText = error.message;
        this.gridContainer?.appendChild(paragraphElement);
      }
    }
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

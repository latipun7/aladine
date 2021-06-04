import Card from 'components/card';
import { getAllFromStore } from 'lib/idb-utils';
import { parseTemplate, clearAllChild, isEmpty } from 'utils';
import type { Restaurant } from 'lib/restaurant-api';

import htmlString from './favorite.html';
import styles from './favorite.module.scss';

type HTMLString = {
  gridContainerStyle: string;
  loadingStyle: string;
};

class Favorite extends HTMLElement {
  gridContainer: HTMLDivElement | null;

  constructor() {
    super();

    this.render();
    this.gridContainer = this.querySelector(`.${styles.gridContainer}`);
  }

  static isListOfRestaurant(list: unknown[]): list is Restaurant[] {
    if (isEmpty(list)) {
      throw new Error("You don't have favorite restaurant.");
    }
    return (list[0] as Restaurant).name !== 'undefined';
  }

  async connectedCallback() {
    try {
      const restaurants = await getAllFromStore('favorite');

      if (Favorite.isListOfRestaurant(restaurants)) {
        clearAllChild(this.gridContainer);
        this.gridContainer?.classList.remove(`${styles.isLoading}`);

        restaurants.forEach((restaurant) => {
          const card = new Card();

          card.dataRestaurant = restaurant;
          this.gridContainer?.appendChild(card);
        });
      } else {
        throw new Error('Sorry. Something went wrong.');
      }
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

customElements.define('aladine-favorite', Favorite);
export default Favorite;

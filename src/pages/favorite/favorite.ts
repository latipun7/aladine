import Card from 'components/card';
import { getAllFromStore } from 'lib/idb-utils';
import {
  clearAllChild,
  isEmpty,
  parseTemplate,
  showErrorMessageElement,
} from 'utils';

import htmlString from './favorite.html';
import styles from './favorite.module.scss';

type HTMLString = {
  gridContainerStyle: string;
  loadingStyle: string;
};

class Favorite extends HTMLElement {
  private gridContainer: HTMLDivElement | null;

  constructor() {
    super();

    this.render();
    this.gridContainer = this.querySelector(`.${styles.gridContainer}`);
  }

  async connectedCallback() {
    try {
      const restaurants = await getAllFromStore('favorite');

      if (isEmpty(restaurants)) {
        throw new Error("You don't have favorite restaurant.");
      } else {
        clearAllChild(this.gridContainer);
        this.gridContainer?.classList.remove(`${styles.isLoading}`);

        restaurants.forEach((restaurant) => {
          const card = new Card(restaurant);

          this.gridContainer?.appendChild(card);
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        showErrorMessageElement(this.gridContainer, error.message);
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

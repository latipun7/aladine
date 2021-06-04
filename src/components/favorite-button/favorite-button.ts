import heartOutlineIcon from 'assets/icons/heart.svg';
import heartFillIcon from 'assets/icons/heart-fill.svg';
import { parseTemplate, clearAllChild } from 'utils';
import {
  getOneFromStore,
  addOrUpdateToStore,
  deleteFromStore,
} from 'lib/idb-utils';
import type { Restaurant } from 'lib/restaurant-api';

import htmlString from './favorite-button.html';
import styles from './favorite-button.module.scss';

type HTMLString = {
  favoriteButtonStyle: string;
  buttonTitle: string;
  loadingStyle: string;
};

class FavoriteButton extends HTMLElement {
  private buttonElement: HTMLButtonElement | null;

  private favoriteRestaurant: Restaurant | undefined;

  constructor(private restaurant: Restaurant) {
    super();

    this.restaurant = restaurant;
    this.render();
    this.buttonElement = this.querySelector('button');
  }

  async handleClick() {
    if (this.buttonElement) {
      if (this.favoriteRestaurant) {
        await deleteFromStore('favorite', this.restaurant.id);
        this.buttonElement.innerHTML = heartOutlineIcon;
        this.buttonElement.title = 'Add to favorite';
        this.favoriteRestaurant = undefined;
      } else {
        await addOrUpdateToStore('favorite', this.restaurant);
        this.buttonElement.innerHTML = heartFillIcon;
        this.buttonElement.title = 'Remove from favorite';
        this.favoriteRestaurant = this.restaurant;
      }
    }
  }

  async connectedCallback() {
    this.favoriteRestaurant = await getOneFromStore(
      'favorite',
      this.restaurant.id
    );

    if (this.buttonElement) {
      if (this.favoriteRestaurant) {
        this.buttonElement.innerHTML = heartFillIcon;
        this.buttonElement.title = 'Remove from favorite';
      } else {
        this.buttonElement.innerHTML = heartOutlineIcon;
        this.buttonElement.title = 'Add to favorite';
      }
    }

    this.addEventListener('click', this.handleClick.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick.bind(this));
  }

  render() {
    const template = parseTemplate<HTMLString>(htmlString, {
      favoriteButtonStyle: styles.favoriteButton,
      buttonTitle: 'Getting favorite info...',
      loadingStyle: styles.loading,
    });

    clearAllChild(this);
    this.appendChild(template.content);
  }
}

customElements.define('favorite-button', FavoriteButton);
export default FavoriteButton;

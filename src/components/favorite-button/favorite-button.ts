import heartOutlineIcon from 'assets/icons/heart.svg?raw';
import heartFillIcon from 'assets/icons/heart-fill.svg?raw';
import { clearAllChild, parseTemplate } from 'utils';
import {
  addOrUpdateToStore,
  deleteFromStore,
  getOneFromStore,
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

  private showHeartOutlineIcon() {
    if (this.buttonElement) {
      this.buttonElement.innerHTML = heartOutlineIcon;
      this.buttonElement.title = 'Add to favorite';
    }
  }

  private showHeartFillIcon() {
    if (this.buttonElement) {
      this.buttonElement.innerHTML = heartFillIcon;
      this.buttonElement.title = 'Remove from favorite';
    }
  }

  private async handleClick() {
    if (this.favoriteRestaurant) {
      await deleteFromStore('favorite', this.restaurant.id);
      this.favoriteRestaurant = undefined;
      this.showHeartOutlineIcon();
    } else {
      await addOrUpdateToStore('favorite', this.restaurant);
      this.favoriteRestaurant = this.restaurant;
      this.showHeartFillIcon();
    }
  }

  async connectedCallback() {
    this.favoriteRestaurant = await getOneFromStore(
      'favorite',
      this.restaurant.id
    );

    if (this.favoriteRestaurant) {
      this.showHeartFillIcon();
    } else {
      this.showHeartOutlineIcon();
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

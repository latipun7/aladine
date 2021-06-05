import mapMarkerIcon from 'assets/icons/map-marker.svg';
import regStarIcon from 'assets/icons/reg-star.svg';
import starIcon from 'assets/icons/star.svg';
import RestaurantAPI from 'lib/restaurant-api';
import Router from 'lib/router';
import {
  calculateStarRatingPercentage,
  parseTemplate,
  truncateWords,
} from 'utils';
import type { Restaurant } from 'lib/restaurant-api';

import htmlString from './card.html';
import styles from './card.module.scss';

type HTMLString = {
  cardContainerStyle: string;
  cardHeaderStyle: string;
  pictureIdData: string;
  pictureNameData: string;
  cityStyle: string;
  flailStyle: string;
  mapMarkerIcon: string;
  cityData: string;
  titleLink: string;
  titleStyle: string;
  nameData: string;
  ratingStyle: string;
  ratingLabel: string;
  starOutlineStyle: string;
  starFillStyle: string;
  regStarIcon: string;
  starIcon: string;
  ratingData: string;
  descriptionData: string;
};

class Card extends HTMLElement {
  constructor(private data: Restaurant) {
    super();

    this.data = data;
    this.render();
  }

  private fillStarRating() {
    const percentageRounded = calculateStarRatingPercentage(this.data?.rating);
    const starFillElement = this.querySelector<HTMLDivElement>(
      `.${styles.starFill}`
    );

    if (starFillElement) starFillElement.style.width = `${percentageRounded}%`;
  }

  private handleClick(event: MouseEvent) {
    const router = new Router();

    event.preventDefault();
    if (this.data && (event.target as HTMLElement).matches('a')) {
      router.navigate(`/restaurant/${this.data.id}`);
    }
  }

  connectedCallback() {
    this.addEventListener('click', this.handleClick.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick.bind(this));
  }

  render() {
    const { data } = this;
    const api = new RestaurantAPI();
    const image = api.pictureLink(data?.pictureId);
    const template = parseTemplate<HTMLString>(htmlString, {
      cardContainerStyle: styles.container,
      cardHeaderStyle: styles.header,
      pictureIdData: image || '',
      pictureNameData: data?.name || '',
      cityStyle: styles.city,
      flailStyle: styles.flail,
      mapMarkerIcon,
      cityData: data?.city || '',
      titleLink: `/restaurant/${data?.id || ''}`,
      titleStyle: styles.title,
      nameData: data?.name || '',
      ratingStyle: styles.rating,
      ratingLabel: `star rating ${data?.rating || ''} of 5`,
      starOutlineStyle: styles.starOutline,
      starFillStyle: styles.starFill,
      regStarIcon,
      starIcon,
      ratingData: `${data?.rating || ''}`,
      descriptionData: truncateWords(data?.description || '', 150),
    });

    this.classList.add(styles.this);
    this.appendChild(template.content);
    this.fillStarRating();
  }
}

customElements.define('aladine-card', Card);
export default Card;

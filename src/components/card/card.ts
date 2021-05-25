import mapMarkerIcon from 'assets/icons/map-marker.svg';
import regStarIcon from 'assets/icons/reg-star.svg';
import starIcon from 'assets/icons/star.svg';
import { clearAllChild, parseTemplate, truncateWords } from 'lib/utils';

import htmlString from './card.html';
import styles from './card.module.scss';

type Data = {
  id: string;
  name: string;
  description: string;
  pictureId: string;
  city: string;
  rating: number;
} | null;

type HTMLString = {
  cardContainerStyle: string;
  pictureIdData: string;
  pictureNameData: string;
  cityStyle: string;
  flailStyle: string;
  mapMarkerIcon: string;
  cityData: string;
  titleStyle: string;
  titleLink: string;
  nameData: string;
  ratingStyle: string;
  ratingLabel: string;
  starsStyle: string;
  starOutlineStyle: string;
  starFillStyle: string;
  regStarIcon: string;
  starIcon: string;
  ratingData: string;
  descriptionStyle: string;
  descriptionData: string;
};

class Card extends HTMLElement {
  data: Data | null;

  constructor() {
    super();

    this.data = null;
    this.render();
  }

  set dataRestaurant(value: Data) {
    this.data = value;
    clearAllChild(this);
    this.render();
  }

  fillStarRating() {
    const rating = this.data?.rating ? this.data?.rating : 0;
    const starWidthPercentage = (rating / 5) * 100;
    const percentageRounded = Math.round(starWidthPercentage / 10) * 10;
    const starFillElement = this.querySelector<HTMLDivElement>(
      `.${styles.starFill}`
    );

    if (starFillElement) starFillElement.style.width = `${percentageRounded}%`;
  }

  render() {
    const { data } = this;

    // if (data) {
    const template = parseTemplate<HTMLString>(htmlString, {
      cardContainerStyle: styles.cardContainer,
      pictureIdData: data?.pictureId || '',
      pictureNameData: data?.name || '',
      cityStyle: styles.city,
      flailStyle: styles.flail,
      mapMarkerIcon,
      cityData: data?.city || '',
      titleStyle: styles.title,
      titleLink: `/restaurant/${data?.id || ''}`,
      nameData: data?.name || '',
      ratingStyle: styles.rating,
      ratingLabel: `star rating ${data?.rating || ''} of 5`,
      starsStyle: styles.stars,
      starOutlineStyle: styles.starOutline,
      starFillStyle: styles.starFill,
      regStarIcon,
      starIcon,
      ratingData: `${data?.rating || ''}`,
      descriptionStyle: styles.description,
      descriptionData: truncateWords(data?.description || '', 150),
    });

    this.appendChild(template.content);
    this.fillStarRating();
    // }
  }
}

customElements.define('aladine-card', Card);
export default Card;

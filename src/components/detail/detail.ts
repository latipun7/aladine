import mapMarkerIcon from 'assets/icons/map-marker.svg';
import regStarIcon from 'assets/icons/reg-star.svg';
import starIcon from 'assets/icons/star.svg';
import RestaurantAPI from 'lib/restaurant-api';
import { clearAllChild, parseTemplate } from 'utils';

import htmlContainerString from './detail-container.html';
import htmlDetailString from './detail.html';
import styles from './detail.module.scss';

type HTMLString = Partial<{
  detailContainerStyle: string;
  loadingStyle: string;
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
}>;

class Detail extends HTMLElement {
  container: HTMLDivElement | null;

  constructor(private restaurantID: string) {
    super();

    this.restaurantID = restaurantID;
    this.render();
    this.container = this.querySelector(`.${styles.detailContainer}`);
  }

  async connectedCallback() {
    try {
      const api = new RestaurantAPI();
      const { restaurant } = await api.getDetail(this.restaurantID);
      const image = api.pictureLink(restaurant.pictureId, 'large');

      const template = parseTemplate<HTMLString>(htmlDetailString, {
        pictureIdData: image,
        pictureNameData: restaurant.name,
        cityStyle: styles.city,
        flailStyle: styles.flail,
        mapMarkerIcon,
        cityData: restaurant.city,
        titleStyle: styles.title,
        titleLink: `/restaurant/${restaurant.id}`,
        nameData: restaurant.name,
        ratingStyle: styles.rating,
        ratingLabel: `star rating ${restaurant.rating} of 5`,
        starsStyle: styles.stars,
        starOutlineStyle: styles.starOutline,
        starFillStyle: styles.starFill,
        regStarIcon,
        starIcon,
        ratingData: `${restaurant.rating}`,
        descriptionStyle: styles.description,
        descriptionData: restaurant.description,
      });

      clearAllChild(this.container);
      this.container?.appendChild(template.content);
      this.fillStarRating(restaurant.rating);
    } catch (error) {
      if (error instanceof Error) {
        const paragraphElement = document.createElement('p');

        clearAllChild(this.container);
        paragraphElement.innerText = error.message;
        this.container?.appendChild(paragraphElement);
      }
    }
  }

  fillStarRating(rating: number) {
    const starWidthPercentage = (rating / 5) * 100;
    const percentageRounded = Math.round(starWidthPercentage / 10) * 10;
    const starFillElement = this.querySelector<HTMLDivElement>(
      `.${styles.starFill}`
    );

    if (starFillElement) starFillElement.style.width = `${percentageRounded}%`;
  }

  render() {
    const template = parseTemplate<HTMLString>(htmlContainerString, {
      detailContainerStyle: styles.detailContainer,
      loadingStyle: styles.loading,
    });

    this.appendChild(template.content);
  }
}

customElements.define('restaurant-detail', Detail);
export default Detail;

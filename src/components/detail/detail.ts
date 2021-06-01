import mapMarkerIcon from 'assets/icons/map-marker.svg';
import regStarIcon from 'assets/icons/reg-star.svg';
import starIcon from 'assets/icons/star.svg';
import heartOutlineIcon from 'assets/icons/heart.svg';
// import heartFillIcon from 'assets/icons/heart-fill.svg';
import RestaurantAPI from 'lib/restaurant-api';
import { clearAllChild, parseTemplate } from 'utils';

import htmlDetailString from './detail.html';
import styles from './detail.module.scss';

type HTMLString = Partial<{
  detailContainerStyle: string;
  detailHeaderStyle: string;
  pictureIdData: string;
  pictureNameData: string;
  favoriteButtonStyle: string;
  heartIcon: string;
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
  descriptionData: string;
  categoryData: string;
  foodsData: string;
  drinksData: string;
}>;

class Detail extends HTMLElement {
  constructor(private restaurantID: string) {
    super();

    this.restaurantID = restaurantID;
    this.render();
  }

  async connectedCallback() {
    try {
      const api = new RestaurantAPI();
      const { restaurant } = await api.getDetail(this.restaurantID);
      const image = api.pictureLink(restaurant.pictureId, 'large');
      const heartIcon = heartOutlineIcon;
      const template = parseTemplate<HTMLString>(htmlDetailString, {
        detailContainerStyle: styles.container,
        detailHeaderStyle: styles.header,
        pictureIdData: image,
        pictureNameData: restaurant.name,
        favoriteButtonStyle: styles.favoriteButton,
        heartIcon,
        cityStyle: styles.city,
        flailStyle: styles.flail,
        mapMarkerIcon,
        cityData: `${restaurant.address}, ${restaurant.city}`,
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
        descriptionData: restaurant.description,
        categoryData: restaurant.categories
          .map((category) => category.name)
          .join(', '),
        foodsData: restaurant.menus.foods
          .map((category) => category.name)
          .join(', '),
        drinksData: restaurant.menus.drinks
          .map((category) => category.name)
          .join(', '),
      });

      clearAllChild(this);
      this.appendChild(template.content);
      this.fillStarRating(restaurant.rating);
    } catch (error) {
      if (error instanceof Error) {
        const paragraphElement = document.createElement('p');

        clearAllChild(this);
        paragraphElement.classList.add(styles.error);
        paragraphElement.innerText = error.message;
        this.appendChild(paragraphElement);
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
    const loadingElement = document.createElement('div');

    this.classList.add(styles.this);
    loadingElement.classList.add(styles.loading);
    this.appendChild(loadingElement);
  }
}

customElements.define('restaurant-detail', Detail);
export default Detail;

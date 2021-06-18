import mapMarkerIcon from 'assets/icons/map-marker.svg';
import regStarIcon from 'assets/icons/reg-star.svg';
import starIcon from 'assets/icons/star.svg';
import AddReview from 'components/add-review';
import FavoriteButton from 'components/favorite-button';
import Review from 'components/review';
import RestaurantAPI from 'lib/restaurant-api';
import {
  calculateStarRatingPercentage,
  clearAllChild,
  parseTemplate,
  showErrorMessageElement,
} from 'utils';

import htmlDetailString from './detail.html';
import styles from './detail.module.scss';

type HTMLString = Partial<{
  detailContainerStyle: string;
  detailHeaderStyle: string;
  pictureLowData: string;
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
  starOutlineStyle: string;
  starFillStyle: string;
  regStarIcon: string;
  starIcon: string;
  ratingData: string;
  descriptionData: string;
  categoryData: string;
  foodsData: string;
  drinksData: string;
  reviewContainerStyle: string;
  subtitleStyle: string;
}>;

class Detail extends HTMLElement {
  constructor(private restaurantID: string) {
    super();

    this.restaurantID = restaurantID;
    this.render();
  }

  private fillStarRating(rating: number) {
    const percentageRounded = calculateStarRatingPercentage(rating);
    const starFillElement = this.querySelector<HTMLDivElement>(
      `.${styles.starFill}`
    );

    if (starFillElement) starFillElement.style.width = `${percentageRounded}%`;
  }

  async connectedCallback() {
    try {
      const api = new RestaurantAPI();
      const { restaurant } = await api.getDetail(this.restaurantID);
      const imageLow = api.pictureLink(restaurant.pictureId);
      const image = api.pictureLink(restaurant.pictureId, 'large');
      const template = parseTemplate<HTMLString>(htmlDetailString, {
        detailContainerStyle: styles.container,
        detailHeaderStyle: styles.header,
        pictureLowData: imageLow,
        pictureIdData: image,
        pictureNameData: restaurant.name,
        cityStyle: styles.city,
        flailStyle: styles.flail,
        mapMarkerIcon,
        cityData: `${restaurant.address}, ${restaurant.city}`,
        titleStyle: styles.title,
        titleLink: `/restaurant/${restaurant.id}`,
        nameData: restaurant.name,
        ratingStyle: styles.rating,
        ratingLabel: `star rating ${restaurant.rating} of 5`,
        starOutlineStyle: styles.starOutline,
        starFillStyle: styles.starFill,
        regStarIcon,
        starIcon,
        ratingData: `${restaurant.rating}`,
        descriptionData: restaurant.description,
        reviewContainerStyle: styles.reviewContainer,
        subtitleStyle: styles.subtitle,
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

      const headerElement = this.querySelector(`.${styles.header}`);
      const reviewElement = this.querySelector(`.${styles.reviewContainer}`);
      const addReview = new AddReview(restaurant.id);
      const favoriteButton = new FavoriteButton({
        city: restaurant.city,
        description: restaurant.description,
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      });

      restaurant.customerReviews.forEach((review) => {
        const reviewComponent = new Review(review);

        reviewElement?.appendChild(reviewComponent);
      });

      headerElement?.appendChild(favoriteButton);
      this.appendChild(addReview);
    } catch (error) {
      if (error instanceof Error) {
        showErrorMessageElement(this, error.message, styles.error);
      }
    }
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

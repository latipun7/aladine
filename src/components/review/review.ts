import { parseTemplate } from 'utils';
import type { CustomerReview } from 'lib/restaurant-api';

import htmlString from './review.html';
import styles from './review.module.scss';

type HTMLString = {
  containerStyle: string;
  nameData: string;
  dateData: string;
  reviewStyle: string;
  reviewData: string;
};

class Review extends HTMLElement {
  constructor(private data: CustomerReview) {
    super();

    this.data = data;
    this.render();
  }

  render() {
    const { data } = this;
    const template = parseTemplate<HTMLString>(htmlString, {
      containerStyle: styles.container,
      nameData: data.name,
      dateData: data.date,
      reviewStyle: styles.review,
      reviewData: data.review,
    });

    this.appendChild(template.content);
  }
}

customElements.define('detail-review', Review);
export default Review;

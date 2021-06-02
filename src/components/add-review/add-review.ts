import addIcon from 'assets/icons/add-list.svg';
import RestaurantAPI from 'lib/restaurant-api';
import { parseTemplate } from 'utils';
import type { AddCustomerReview } from 'lib/restaurant-api';

import htmlString from './add-review.html';
import styles from './add-review.module.scss';

type HTMLString = {
  addButtonStyle: string;
  addIcon: string;
  overlayStyle: string;
  containerStyle: string;
  buttonGroupStyle: string;
};

class AddReview extends HTMLElement {
  addButtonElement: HTMLButtonElement | null;

  overlayElement: HTMLDivElement | null;

  cancelButtonElement: HTMLButtonElement | null;

  submitButtonElement: HTMLButtonElement | null;

  formElement: HTMLFormElement | null;

  constructor(private restaurantID: string) {
    super();

    this.restaurantID = restaurantID;
    this.render();
    this.addButtonElement = this.querySelector(`.${styles.addButton}`);
    this.overlayElement = this.querySelector(`.${styles.overlay}`);
    this.formElement = this.querySelector('form');
    this.cancelButtonElement = this.querySelector('button[type="reset"]');
    this.submitButtonElement = this.querySelector('button[type="submit"]');
  }

  static convertFormDataToObject(form: HTMLFormElement) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as AddCustomerReview;

    return data;
  }

  async handleSubmitClick(event: MouseEvent) {
    if (this.formElement && this.formElement.checkValidity()) {
      event.preventDefault();

      const data = AddReview.convertFormDataToObject(this.formElement);
      const api = new RestaurantAPI();

      data.id = this.restaurantID;

      try {
        const response = await api.addReview(data);

        if (this.overlayElement) {
          this.overlayElement.style.visibility = 'hidden';
          this.overlayElement.style.opacity = '0';
        }

        console.log(response);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
  }

  handleAddClick() {
    if (this.overlayElement) {
      this.overlayElement.style.visibility = 'visible';
      this.overlayElement.style.opacity = '1';
    }
  }

  handleCancelClick() {
    if (this.overlayElement) {
      this.overlayElement.style.visibility = 'hidden';
      this.overlayElement.style.opacity = '0';
    }
  }

  connectedCallback() {
    this.addButtonElement?.addEventListener(
      'click',
      this.handleAddClick.bind(this),
      true
    );

    this.cancelButtonElement?.addEventListener(
      'click',
      this.handleCancelClick.bind(this)
    );

    this.submitButtonElement?.addEventListener(
      'click',
      this.handleSubmitClick.bind(this)
    );
  }

  disconnectedCallback() {
    this.addButtonElement?.removeEventListener(
      'click',
      this.handleAddClick.bind(this)
    );

    this.cancelButtonElement?.removeEventListener(
      'click',
      this.handleCancelClick.bind(this)
    );

    this.submitButtonElement?.removeEventListener(
      'click',
      this.handleSubmitClick.bind(this)
    );
  }

  render() {
    const template = parseTemplate<HTMLString>(htmlString, {
      addButtonStyle: styles.addButton,
      addIcon,
      overlayStyle: styles.overlay,
      containerStyle: styles.container,
      buttonGroupStyle: styles.buttonGroup,
    });

    this.appendChild(template.content);
  }
}

customElements.define('add-review', AddReview);
export default AddReview;

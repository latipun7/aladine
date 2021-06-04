import { parseTemplate } from 'utils';

import htmlString from './scroll-to-top.html';
import styles from './scroll-to-top.module.scss';

type HTMLString = {
  scrollButtonStyle: string;
};

class ScrollToTop extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  private scrollEvent() {
    const buttonElement = this.querySelector('button');
    const footerElement = document.querySelector('footer');
    const scrollPosition = window.scrollY;

    if (buttonElement) {
      if (scrollPosition > 354) {
        buttonElement.classList.add(`${styles.scrolled}`);
      } else {
        buttonElement.classList.remove(`${styles.scrolled}`);
      }

      if (footerElement) {
        const footerHeight = footerElement.getBoundingClientRect().height;
        const footerTopBounding = document.body.offsetHeight - footerHeight;

        if (window.innerHeight + scrollPosition >= footerTopBounding) {
          buttonElement.classList.add(`${styles.bottom}`);
        } else {
          buttonElement.classList.remove(`${styles.bottom}`);
        }
      }
    }
  }

  private static handleScrollToTop(this: void) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  connectedCallback() {
    window.addEventListener('scroll', this.scrollEvent.bind(this));
    this.addEventListener('click', ScrollToTop.handleScrollToTop);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.scrollEvent.bind(this));
    this.removeEventListener('click', ScrollToTop.handleScrollToTop);
  }

  render() {
    const template = parseTemplate<HTMLString>(htmlString, {
      scrollButtonStyle: styles.scrollButton,
    });

    this.appendChild(template.content);
  }
}

customElements.define('scroll-to-top', ScrollToTop);
export default ScrollToTop;

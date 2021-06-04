import { parseTemplate } from 'utils';

import htmlString from './menu.html';
import styles from './menu.module.scss';

type HTMLString = {
  mainNavigationStyle: string;
  logoStyle: string;
  menuButtonStyle: string;
  menuLinksStyle: string;
  menuLinkStyle: string;
};

class Menu extends HTMLElement {
  private menuLinksElement: HTMLUListElement | null;

  private menuButtonElement: HTMLButtonElement | null;

  private menuLinkElements: NodeListOf<HTMLLIElement>;

  constructor() {
    super();

    this.render();
    this.menuLinksElement = this.querySelector('ul');
    this.menuButtonElement = this.querySelector('button');
    this.menuLinkElements = this.querySelectorAll('li');
  }

  private handleClickOutside({ target }: MouseEvent) {
    const notMenuLinksTarget = !this.menuLinksElement?.contains(target as Node);
    const notMenuButtonTarget = !this.menuButtonElement?.contains(
      target as Node
    );

    if (notMenuLinksTarget && notMenuButtonTarget) {
      this.opened = false;
    }
  }

  private scrollEvent() {
    const navElement = this.querySelector('nav');
    const footerElement = document.querySelector('footer');
    const scrollPosition = window.scrollY;

    if (this.menuButtonElement) {
      if (scrollPosition > 99) {
        navElement?.classList.add(`${styles.scrolled}`);
      } else {
        navElement?.classList.remove(`${styles.scrolled}`);
      }

      if (footerElement) {
        const footerHeight = footerElement.getBoundingClientRect().height;
        const footerTopBounding = document.body.offsetHeight - footerHeight;

        if (window.innerHeight + scrollPosition >= footerTopBounding) {
          this.menuButtonElement.classList.add(`${styles.bottom}`);
        } else {
          this.menuButtonElement.classList.remove(`${styles.bottom}`);
        }
      }
    }
  }

  private handleToggleMenu() {
    this.opened = !this.opened;
    this.menuButtonElement?.classList.remove(`${styles.bottom}`);
  }

  private handleClickMenuLink() {
    this.opened = false;
  }

  set opened(isOpened: boolean) {
    if (isOpened) this.setAttribute('opened', '');
    else this.removeAttribute('opened');
  }

  get opened() {
    return this.hasAttribute('opened');
  }

  static get observedAttributes() {
    return ['opened'];
  }

  attributeChangedCallback(_: string, __: string, newValue: string) {
    const hasValue = newValue !== null;

    if (hasValue) {
      this.menuLinksElement?.classList.add(styles.open);
      this.menuButtonElement?.classList.add(styles.open);
    } else {
      this.menuLinksElement?.classList.remove(styles.open);
      this.menuButtonElement?.classList.remove(styles.open);
    }
  }

  connectedCallback() {
    window.addEventListener('scroll', this.scrollEvent.bind(this));

    window.addEventListener('click', this.handleClickOutside.bind(this), true);

    this.menuButtonElement?.addEventListener(
      'click',
      this.handleToggleMenu.bind(this)
    );

    this.menuLinkElements.forEach((element) => {
      element.addEventListener(
        'click',
        this.handleClickMenuLink.bind(this),
        true
      );
    });
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.scrollEvent.bind(this));

    window.removeEventListener(
      'click',
      this.handleClickOutside.bind(this),
      true
    );

    this.menuButtonElement?.removeEventListener(
      'click',
      this.handleToggleMenu.bind(this)
    );

    this.menuLinkElements.forEach((element) => {
      element.removeEventListener(
        'click',
        this.handleClickMenuLink.bind(this),
        true
      );
    });
  }

  render() {
    const template = parseTemplate<HTMLString>(htmlString, {
      mainNavigationStyle: styles.mainNavigation,
      logoStyle: styles.logo,
      menuButtonStyle: styles.menuButton,
      menuLinksStyle: styles.menuLinks,
      menuLinkStyle: styles.menuLink,
    });

    this.appendChild(template.content);
  }
}

customElements.define('aladine-menu', Menu);
export default Menu;

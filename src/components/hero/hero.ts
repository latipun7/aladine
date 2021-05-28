import eatingImage from 'assets/eating.svg';
import { parseTemplate } from 'utils';

import htmlString from './hero.html';
import styles from './hero.module.scss';

type HTMLString = {
  heroStyle: string;
  readyToPourStyle: string;
  lampStyle: string;
  lemonadeStyle: string;
  eatingImage: string;
};

class Hero extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const template = parseTemplate<HTMLString>(htmlString, {
      heroStyle: styles.hero,
      readyToPourStyle: styles.readyToPour,
      lampStyle: styles.lamp,
      lemonadeStyle: styles.lemonade,
      eatingImage,
    });

    this.appendChild(template.content);
  }
}

customElements.define('aladine-hero', Hero);
export default Hero;

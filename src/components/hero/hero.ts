import diningImage from 'assets/dining.svg';
import lampImage from 'assets/lamp.svg';
import lemonadeImage from 'assets/lemonade.svg';
import { parseTemplate } from 'utils';

import htmlString from './hero.html';
import styles from './hero.module.scss';

type HTMLString = {
  heroStyle: string;
  readyToPourStyle: string;
  lampImage: string;
  lampStyle: string;
  lemonadeImage: string;
  lemonadeStyle: string;
  diningImage: string;
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
      lampImage,
      lampStyle: styles.lamp,
      lemonadeImage,
      lemonadeStyle: styles.lemonade,
      diningImage,
    });

    this.appendChild(template.content);
  }
}

customElements.define('aladine-hero', Hero);
export default Hero;

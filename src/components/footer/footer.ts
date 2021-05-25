import { parseTemplate } from 'lib/utils';

import htmlString from './footer.html';
import styles from './footer.module.scss';

type HTMLString = {
  copyrightStyle: string;
  iconStyle: string;
};

class Footer extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const template = parseTemplate<HTMLString>(htmlString, {
      copyrightStyle: styles.copyright,
      iconStyle: styles.icon,
    });

    this.appendChild(template.content);
  }
}

customElements.define('aladine-footer', Footer);
export default Footer;

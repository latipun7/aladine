import { parseTemplate } from 'utils';

import htmlString from './not-found.html';
import styles from './not-found.module.scss';

type HTMLString = {
  notFoundStyle: string;
};

class NotFound extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const template = parseTemplate<HTMLString>(htmlString, {
      notFoundStyle: styles.notFound,
    });

    this.appendChild(template.content);
  }
}

customElements.define('not-found', NotFound);
export default NotFound;

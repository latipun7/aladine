import Navigo from 'navigo';
import Menu from 'components/menu';
import Hero from 'components/hero';
import Home from 'pages/home';
import NotFound from 'components/not-found';
import { clearAllChild } from 'lib/utils';

class Router {
  router: Navigo;

  constructor(publicPath = '/') {
    this.router = new Navigo(publicPath);
  }

  static inject(component: HTMLElement, inHeader = false) {
    const headerElement = document.querySelector('header');
    const mainContent = document.querySelector('main');

    if (inHeader) {
      clearAllChild(headerElement);
      headerElement?.appendChild(new Menu());
      headerElement?.appendChild(component);
    } else {
      clearAllChild(headerElement);
      headerElement?.appendChild(new Menu());

      clearAllChild(mainContent);
      mainContent?.appendChild(component);
    }
  }

  init() {
    this.router
      .hooks({
        leave(done) {
          window.scrollTo({ top: 0 });
          done();
        },
      })
      .on('/', () => {
        Router.inject(new Home());
        Router.inject(new Hero(), true);
      })
      .notFound(() => {
        Router.inject(new NotFound());
      })
      .resolve();
  }
}

export default Router;

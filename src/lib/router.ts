import Navigo from 'navigo';
import Detail from 'components/detail';
import Menu from 'components/menu';
import Hero from 'components/hero';
import Home from 'pages/home';
import NotFound from 'components/not-found';
import { clearAllChild } from 'utils';

class Router {
  router: Navigo;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';

    this.router = new Navigo(isProduction ? '/aladine/' : '/');
    this.#defineRoute();
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

  #defineRoute() {
    this.router
      .hooks({
        before(done) {
          window.scrollTo({ top: 0 });
          done();
        },
      })
      .on('/restaurant/:id', (match) => {
        if (match && match.data) Router.inject(new Detail(match.data.id));
        // TODO: else, inject site-error. (something went wrong)
      })
      .on('/', () => {
        Router.inject(new Home());
        Router.inject(new Hero(), true);
      })
      .notFound(() => {
        Router.inject(new NotFound());
      });
  }

  init() {
    this.router.resolve();
  }

  navigate(path: string) {
    this.router.navigate(path);
  }
}

export default Router;

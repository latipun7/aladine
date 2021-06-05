import Navigo from 'navigo';
import Menu from 'components/menu';
import Hero from 'components/hero';
import Detail from 'pages/detail';
import Favorite from 'pages/favorite';
import Home from 'pages/home';
import NotFound from 'components/not-found';
import { clearAllChild, getPublicPath } from 'utils';

class Router {
  router: Navigo;

  constructor() {
    const publicPath = getPublicPath();

    this.router = new Navigo(publicPath);
    this.defineRoute();
  }

  private defineRoute() {
    this.router
      .hooks({
        before(done) {
          window.scrollTo({ top: 0 });
          done();
        },
      })
      .on('/restaurant/:id', (match) => {
        if (match && match.data) Router.inject(new Detail(match.data.id));
      })
      .on('/favorite', () => {
        Router.inject(new Favorite());
      })
      .on('/', () => {
        Router.inject(new Home());
        Router.inject(new Hero(), true);
      })
      .notFound(() => {
        Router.inject(new NotFound());
      });
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
    this.router.resolve();
  }

  navigate(path: string) {
    this.router.navigate(path);
  }

  resolve(path?: string) {
    this.router.resolve(path);
  }
}

export default Router;

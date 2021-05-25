import Router from 'lib/router';
import 'components/scroll-to-top';
import 'components/footer';

const isProduction = process.env.NODE_ENV === 'production';

const App = () => {
  const router = new Router(isProduction ? '/aladine' : '/');

  router.init();
};

export default App;

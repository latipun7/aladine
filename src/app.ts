import Router from 'lib/router';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/blur-up/ls.blur-up';
import 'components/scroll-to-top';
import 'components/footer';

const App = () => {
  const router = new Router();

  router.init();
};

export default App;

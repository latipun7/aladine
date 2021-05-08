import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from 'components/footer';
import Menu from 'components/menu';
import Hero from 'components/hero';
import Index from 'pages/index';
import type { FC } from 'react';

const isProduction = process.env.NODE_ENV === 'production';

const App: FC = () => {
  return (
    <BrowserRouter basename={isProduction ? '/react-webpack-ts' : '/'}>
      <header>
        <Menu />
        <Route exact path="/" component={Hero} />
      </header>
      <main id="main-contents">
        <Switch>
          <Route exact path="/" component={Index} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

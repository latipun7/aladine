import { render } from 'test.utils';
import Index from 'pages/index';

describe('Index page', () => {
  it('matches initial page snapshot', () => {
    const { asFragment } = render(<Index />);

    expect(asFragment()).toMatchSnapshot();
  });

  it.todo('needs more tests!');
});

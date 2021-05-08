import Index from 'src/app';
import { render } from './test.utils';

describe('Index pages', () => {
  it.todo('needs test!');

  it('prints test app!', () => {
    const { getByText } = render(<Index />);
    const element = getByText(/Test/i);

    expect(element).toHaveTextContent('Test apps.');
  });
});

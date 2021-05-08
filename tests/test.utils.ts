import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

const customRender = (
  ui: React.ReactElement,
  options: Omit<RenderOptions, 'queries'> = {}
) => render(ui, { ...options });

export * from '@testing-library/react';
export { customRender as render };

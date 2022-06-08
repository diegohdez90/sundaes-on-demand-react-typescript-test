import { render, RenderOptions } from '@testing-library/react';
import { OrderDetailsProvider } from '../context/OrderDetails';

const renderWithContext = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, {
    ...options,
    wrapper: OrderDetailsProvider,
  });

export * from '@testing-library/react';
export { renderWithContext as render };

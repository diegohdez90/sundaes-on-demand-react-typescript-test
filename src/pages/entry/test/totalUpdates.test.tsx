import React from 'react';
import { render, screen } from '@testing-library/react';
import Options from '../Options';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../context/OrderDetails';

const setup = (component: React.ReactElement) => ({
  user: userEvent.setup(),
  ...render(component, {
    wrapper: OrderDetailsProvider,
  }),
});

describe('total Updates', () => {
  test('should update scoop subtotal when scoops changes', async () => {
    const { user } = setup(<Options optionType="scoops" singular="scoop" />);

    const scoopsSubTotal = screen.getByText('Total: $', {
      exact: false,
    });

    expect(scoopsSubTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    user.type(vanillaInput, '1');

    expect(scoopsSubTotal).toBe('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    user.type(chocolateInput, '2');
    expect(scoopsSubTotal).toHaveTextContent('6.00');
  });
});

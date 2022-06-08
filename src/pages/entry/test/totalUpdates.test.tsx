import React from 'react';
import { render, screen } from './../../../test-utils/testing-library-utils';
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
    const { user } = setup(
      <Options optionType="scoops" singular="scoop" inputType="number" />
    );

    const scoopsSubTotal = screen.getByText('Scoops total: $', {
      exact: false,
    });

    expect(scoopsSubTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    user.clear(vanillaInput);
    user.type(vanillaInput, '1');

    expect(scoopsSubTotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    user.clear(chocolateInput);
    user.type(chocolateInput, '2');
    expect(scoopsSubTotal).toHaveTextContent('6.00');
  });

  test('should update toppings when toppings update', async () => {
    const { user } = setup(
      <Options optionType="toppings" singular="scoop" inputType="checkbox" />
    );

    const totalToppings = screen.getByText('Toppings total: $', {
      exact: false,
    });
    expect(totalToppings).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    user.click(cherriesCheckbox);
    expect(totalToppings).toHaveTextContent('1.50');

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    user.click(hotFudgeCheckbox);
    expect(totalToppings).toHaveTextContent('3.00');

    user.click(hotFudgeCheckbox);
    expect(totalToppings).toHaveTextContent('1.50');
  });
});

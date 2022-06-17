import React from 'react';
import {
  act,
  render,
  screen,
} from './../../../test-utils/testing-library-utils';
import Options from '../Options';
import userEvent from '@testing-library/user-event';
import OrderEntry from '../OrderEntry';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';

const setup = (component: React.ReactElement) => ({
  user: userEvent.setup(),
  ...render(component),
});

describe('total Updates', () => {
  test('should update scoop subtotal when scoops changes', async () => {
    const { user } = setup(
      <Options optionType="scoops" singular="scoop" inputType="number" />
    );
    const userEvent = user;

    const scoopsSubTotal = screen.getByText('Scoops total: $', {
      exact: false,
    });

    expect(scoopsSubTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent?.clear(vanillaInput);
    userEvent?.type(vanillaInput, '1');

    expect(scoopsSubTotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent?.clear(chocolateInput);
    userEvent?.type(chocolateInput, '2');
    expect(scoopsSubTotal).toHaveTextContent('6.00');
  });

  test('should update toppings when toppings update', async () => {
    let userEvent: UserEvent | undefined;
    await act(() => {
      const { user } = setup(
        <Options
          optionType="toppings"
          singular="topping"
          inputType="checkbox"
        />
      );
      userEvent = user;
    });

    const totalToppings = screen.getByText('Toppings total: $', {
      exact: false,
    });
    expect(totalToppings).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent?.click(cherriesCheckbox);
    expect(totalToppings).toHaveTextContent('1.50');

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    userEvent?.click(hotFudgeCheckbox);
    expect(totalToppings).toHaveTextContent('3.00');

    userEvent?.click(hotFudgeCheckbox);
    expect(totalToppings).toHaveTextContent('1.50');
  });
});

describe('Grand total', () => {
  test('should render total if scoop is added first', async () => {
    let userEvent: UserEvent | undefined;
    await act(() => {
      const { user } = setup(<OrderEntry setOrderPhase={jest.fn()} />);
      userEvent = user;
    });
    const total = screen.getByRole('heading', {
      name: /Total: \$/,
    });

    expect(total).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent?.clear(vanillaInput);
    userEvent?.type(vanillaInput, '2');

    expect(total).toHaveTextContent('4.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent?.click(cherriesCheckbox);
    expect(total).toHaveTextContent('5.50');
  });

  test('should render total if topping is added first', async () => {
    let userEvent: UserEvent | undefined;
    await act(() => {
      const { user } = setup(<OrderEntry setOrderPhase={jest.fn()} />);
      userEvent = user;
    });
    const total = screen.getByRole('heading', {
      name: /Total: \$/,
    });

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent?.click(cherriesCheckbox);
    expect(total).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent?.clear(vanillaInput);
    userEvent?.type(vanillaInput, '2');

    expect(total).toHaveTextContent('4.00');
  });

  test('should render total if item is removed', async () => {
    let userEvent: UserEvent | undefined;
    await act(() => {
      const { user } = setup(<OrderEntry setOrderPhase={jest.fn()} />);
      userEvent = user;
    });
    const total = screen.getByRole('heading', {
      name: /Total: \$/,
    });

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent?.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent?.clear(vanillaInput);
    userEvent?.type(vanillaInput, '2');

    userEvent?.clear(vanillaInput);
    userEvent?.type(vanillaInput, '1');

    expect(total).toHaveTextContent('3.50');

    userEvent?.click(cherriesCheckbox);
    expect(total).toHaveTextContent('2.00');
  });
});

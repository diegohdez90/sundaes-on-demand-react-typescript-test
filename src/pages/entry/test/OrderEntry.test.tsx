import React from 'react';
import {
  act,
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';

const setup = (component: React.ReactElement) => ({
  user: userEvent.setup(),
  ...render(component),
});

describe('Order entry', () => {
  test('should handle error for scoops and toppings routes', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);
    });
  });
});

test('disable order button if there are no scoops ordered', async () => {
  let userEvent: UserEvent | undefined;
  await act(() => {
    const { user } = setup(<OrderEntry setOrderPhase={jest.fn()} />);
    userEvent = user;
  });

  // order button should be disabled at first, even before options load
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent?.clear(vanillaInput);
  userEvent?.type(vanillaInput, '1');
  expect(orderButton).toBeEnabled();

  // expect button to be disabled again after removing scoop
  userEvent?.clear(vanillaInput);
  userEvent?.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});

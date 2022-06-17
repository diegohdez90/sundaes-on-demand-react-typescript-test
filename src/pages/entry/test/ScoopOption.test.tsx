import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Option from '../Option';

const setup = (component: React.ReactElement) => ({
  user: userEvent.setup(),
  ...render(component),
});

test.only('indicate if scoop count is non-int or out of range', async () => {
  const { user } = setup(
    <Option
      name=""
      imagePath=""
      updateItemCount={jest.fn()}
      optionType="scoop"
      inputType="number"
    />
  );

  // expect input to be invalid with negative number
  const vanillaInput = screen.getByRole('spinbutton');
  user.clear(vanillaInput);
  user.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with decimal input
  user.clear(vanillaInput);
  user.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with input that's too high
  user.clear(vanillaInput);
  user.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with valid input
  // note: here we're testing our validation rules (namely that the input can display as valid)
  // and not react-bootstrap's response
  user.clear(vanillaInput);
  user.type(vanillaInput, '3');

  screen.debug(vanillaInput);
  expect(vanillaInput).not.toHaveClass('is-invalid');
});

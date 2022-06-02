import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';
import React from 'react';

const setup = (component: React.ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(component),
  };
};

describe('Summary page', () => {
  test('should render page', async () => {
    await setup(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', {
      name: /Confirm order/i,
    });
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('should enable button after checked terms and conditions', async () => {
    const { user } = setup(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', {
      name: /Confirm order/i,
    });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });

  test('should disabled button after unselect terms and conditions checkbox', async () => {
    const { user } = setup(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', {
      name: /Confirm order/i,
    });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('should popover responds to hover', () => {});
});

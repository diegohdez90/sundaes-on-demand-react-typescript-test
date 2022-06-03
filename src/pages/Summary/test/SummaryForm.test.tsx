import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SummaryForm from '../SummaryForm';

const setup = (component: React.ReactElement) => ({
  user: userEvent.setup(),
  ...render(component),
});

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

  test('should popover responds to hover', async () => {
    const { user } = setup(<SummaryForm />);

    const nullPopover = screen.queryByText(
      /No ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);

    const popover = screen.getByText(
      /No ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    await user.unhover(termsAndConditions);
    const content = screen.queryByText(
      /No ice cream will actually be delivered/i
    );
    expect(content).not.toBeInTheDocument();
  });
});

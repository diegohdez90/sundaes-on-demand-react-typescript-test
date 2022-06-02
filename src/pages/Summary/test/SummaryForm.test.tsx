import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

describe('Summary page', () => {
  test('should render page', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', {
      name: /Confirm order/i,
    });
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('should enable button after checked terms and conditions', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', {
      name: /Confirm order/i,
    });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });

  test('should disabled button after unselect terms and conditions checkbox', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', {
      name: /Confirm order/i,
    });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });
});

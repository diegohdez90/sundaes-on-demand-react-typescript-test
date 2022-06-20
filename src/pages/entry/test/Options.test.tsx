import React from 'react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';
import userEvent from '@testing-library/user-event';

const setup = (component: React.ReactElement) => ({
  user: userEvent.setup(),
  ...render(component),
});

describe('Options', () => {
  test('should display image for each scoop option from server', async () => {
    render(<Options optionType="scoops" singular="scoop" inputType="number" />);

    const scoopImages: Array<HTMLImageElement> = await screen.findAllByRole(
      'img',
      {
        name: /scoop$/i,
      }
    );

    expect(scoopImages).toHaveLength(2);

    const altText: Array<string> = scoopImages.map(
      (element: HTMLImageElement, _) => element.alt
    );

    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });
});

test("don't update total if scoops input is invalid", async () => {
  const { user } = setup(
    <Options optionType="scoops" singular="scoop" inputType="number" />
  );
  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');

  // make sure scoops subtotal hasn't updated
  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

describe('Toppings', () => {
  test('should display image for each topping option from server', async () => {
    render(<Options optionType="toppings" singular="topping" />);

    const toppingImages: Array<HTMLImageElement> = await screen.findAllByRole(
      'img',
      {
        name: /topping$/i,
      }
    );

    expect(toppingImages).toHaveLength(3);

    const altText: Array<string> = toppingImages.map(
      (element: HTMLImageElement, _) => element.alt
    );

    expect(altText).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
    ]);
  });
});

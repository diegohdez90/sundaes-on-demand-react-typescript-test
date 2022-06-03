import React, { ImgHTMLAttributes } from 'react';
import { render, screen } from '@testing-library/react';
import Options from '../Options';

describe('Options', () => {
  test('should display image for each scoop option from server', () => {
    render(<Options optionType="scoops" />);
  });

  const scoopImages: Array<HTMLImageElement> = screen.getAllByRole('img', {
    name: /scoop$/i,
  });

  expect(scoopImages).toHaveLength(2);

  const altText: Array<string> = scoopImages.map(
    (element: HTMLImageElement, _) => element.alt
  );

  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

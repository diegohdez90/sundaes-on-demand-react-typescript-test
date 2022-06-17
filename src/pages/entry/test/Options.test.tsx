import React from 'react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

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

test('Displays image for each toppings option from server', async () => {
  // Mock Service Worker will return three toppings from server
  const { user } = setup(
    <Options optionType="toppings" singular="topping" inputType="checkbox" />
  );

  // find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  // check the actual alt text for the images
  // @ts-ignore
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

test("don't update total if scoops input is invalid", async () => {
  const { user } = setup(
    <Options optionType="toppings" singular="topping" inputType="checkbox" />
  );
  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  user.clear(vanillaInput);
  user.type(vanillaInput, '-1');

  // make sure scoops subtotal hasn't updated
  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toBeInTheDocument();
});

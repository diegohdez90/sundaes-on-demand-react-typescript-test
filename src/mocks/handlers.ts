import { rest } from 'msw';
import { ScoopsResponse } from '../utils/ScoopsResponse';

export const handlers = [
  rest.get<ScoopsResponse>('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Chocolate',
          imagePath: '/images/chocolate.png',
        },
        {
          name: 'Vanilla',
          imagePath: '/images/vanilla.png',
        },
      ])
    );
  }),
];

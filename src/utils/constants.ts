export type OrderDetailsInterface = [
  data: {
    totals: Map<string, string>;
    scoops: Map<string, number>;
    toppings: Map<string, number>;
  },
  updateItemCount: (
    itemName: string,
    newItemCount: string,
    optionType: string
  ) => void,
  resetOrder: () => void
];

export type STORE_PRICES = {
  scoops: number;
  toppings: number;
  [key: string]: number;
};

export interface Totals {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
}

export type MapOrderDetails<T> = {
  [key: string]: T;
};

export const prices: STORE_PRICES = {
  scoops: 2,
  toppings: 1.5,
};

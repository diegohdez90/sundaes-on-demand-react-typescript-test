declare global {
  type MapOrderDetailsType<T> = {
    [key: string]: T;
  };
}

export type STORE_PRICES = {
  scoops: number;
  toppings: number;
};

export type MapOrderDetails = {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
};

export const prices: STORE_PRICES = {
  scoops: 2,
  toppings: 1.5,
};

export interface OrderDetailsContext {
  orderDetails: string;
  updateItemCount?: () => void;
}

export type STORE_PRICES = {
  scoops: number;
  toppings: number;
  [key: string]: number;
};

export type MapOrderDetails<T> = {
  scoops: T;
  toppings: T;
  [key: string]: T;
};

export const prices: STORE_PRICES = {
  scoops: 2,
  toppings: 1.5,
};

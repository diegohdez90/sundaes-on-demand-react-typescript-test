import React, { ProviderProps } from 'react';

export type OrderDetailsInterface = {
  orderDetails: {
    totals: Map<string, string>;
  };
  optionCounts: Map<string, Map<string, number>>;
  updateItemCount: (
    itemName: string,
    newItemCount: string,
    optionType: string
  ) => void;
  children: React.ReactNode;
  value: ProviderProps<OrderDetailsInterface | null>;
  [Symbol.toStringTag]: string;
};

export type STORE_PRICES = {
  scoops: number;
  toppings: number;
  [key: string]: number;
};

export type MapOrderDetails<T> = {
  [key: string]: T;
};

export const prices: STORE_PRICES = {
  scoops: 2,
  toppings: 1.5,
};

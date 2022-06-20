import React, { ProviderProps } from 'react';

export type OrderDetailsInterface = {
  orderDetails: {
    totals: Map<string, string>;
    scoops: Map<string, string>;
    toppings: Map<string, string>;
  };
  optionCounts: Totals;
  updateItemCount: (
    itemName: string,
    newItemCount: string,
    optionType: string
  ) => void;
  children: React.ReactNode;
  value: ProviderProps<OrderDetailsInterface | null>;
  [Symbol.toStringTag]: string;
  [Symbol.iterator](): string;
};

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

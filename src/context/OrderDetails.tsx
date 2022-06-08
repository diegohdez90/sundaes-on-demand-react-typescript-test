import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  MapOrderDetails,
  OrderDetailsContext,
  prices,
  STORE_PRICES,
} from '../utils/constants';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

const OrderDetails = createContext<OrderDetailsContext | null>(null);

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be used within OrderDetailsProvider');
  }

  return context;
};

const calculateSubTotal = (
  optionItemType: string,
  optionCounts: MapOrderDetails<Map<string, number>>
): number => {
  let optionCount = 0;
  for (const count of optionCounts[optionItemType].values()) {
    optionCount += count;
  }
  return optionCount * prices[optionItemType];
};
export const OrderDetailsProvider = (props: any) => {
  const [optionCounts, setOptionCounts] = useState<
    MapOrderDetails<Map<string, number>>
  >({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });

  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState<{
    scoops: string;
    toppings: string;
    total: string;
  }>({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    total: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubTotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubTotal('toppings', optionCounts);
    const total = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      total: formatCurrency(total),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (
      itemName: string,
      newItemCount: string,
      optionType: string
    ) => {
      const newOptionCounts = {
        ...optionCounts,
      };
      const optionCountMap = optionCounts[optionType];
      optionCountMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    };
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
};

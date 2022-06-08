import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { MapOrderDetails, prices, STORE_PRICES } from '../utils/constants';

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be used within OrderDetailsProvider');
  }

  return context;
};

const calculateSubTotal = (
  optionItemType: string,
  optionCounts: MapOrderDetails
): number => {
  let optionCount = 0;
  for (const count of optionCounts[
    optionItemType as keyof MapOrderDetails
  ].values()) {
    optionCount += count;
  }
  return optionCount * prices[optionItemType as keyof STORE_PRICES];
};
export const OrderDetailsProvider = (props: any) => {
  const [optionCounts, setOptionCounts] = useState<MapOrderDetails>({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });

  const [totals, setTotals] = useState<{
    scoops: number;
    toppings: number;
    total: number;
  }>({
    scoops: 0,
    toppings: 0,
    total: 0,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubTotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubTotal('toppings', optionCounts);
    const total = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      total: total,
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
      const optionCountMap = optionCounts[optionType as keyof MapOrderDetails];
      optionCountMap.set(itemName, Number(newItemCount));
      setOptionCounts(newOptionCounts);
    };
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
};

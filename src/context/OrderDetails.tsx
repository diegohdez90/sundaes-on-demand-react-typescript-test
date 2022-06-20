import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { OrderDetailsInterface, prices, Totals } from '../utils/constants';
import { formatCurrency } from '../utilities/formatCurrency';

const OrderDetails = createContext<OrderDetailsInterface | null>(null);

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be used within OrderDetailsProvider');
  }

  return context;
};

const calculateSubTotal = (
  optionItemType: string,
  optionCounts: Totals
): number => {
  let optionCount = 0;
  for (const count of optionCounts[optionItemType as keyof Totals].values()) {
    optionCount += count;
  }
  return optionCount * prices[optionItemType as keyof Totals];
};

export const OrderDetailsProvider = (
  props: PropsWithChildren<{
    children: React.ReactNode;
  }>
): JSX.Element => {
  const [optionCounts, setOptionCounts] = useState<Totals>({
    scoops: new Map<string, number>([
      ['Mint chip', 0],
      ['Vanilla', 0],
      ['Chocolate', 0],
      ['Salted caramel', 0],
    ]),
    toppings: new Map<string, number>([
      ['M&Ms', 0],
      ['Hot fudge', 0],
      ['Peanut butter cups', 0],
      ['Gummi bears', 0],
      ['Mochi', 0],
      ['Cherries', 0],
    ]),
  });

  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState<Map<string, string>>(
    new Map<string, string>([
      ['scoops', zeroCurrency],
      ['toppings', zeroCurrency],
      ['total', zeroCurrency],
    ])
  );

  useEffect(() => {
    const scoopsSubtotal = calculateSubTotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubTotal('toppings', optionCounts);
    const total = scoopsSubtotal + toppingsSubtotal;
    const innerTotal = new Map<string, string>();
    innerTotal.set('scoops', formatCurrency(scoopsSubtotal));
    innerTotal.set('toppings', formatCurrency(toppingsSubtotal));
    innerTotal.set('total', formatCurrency(total));

    setTotals(innerTotal);
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      optionType: string
    ) {
      const newOptionCounts = { ...optionCounts };
      const optionCountMap = optionCounts[optionType as keyof Totals];
      optionCountMap?.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    }

    function resetOrder() {
      setOptionCounts({
        scoops: new Map<string, number>(),
        toppings: new Map<string, number>(),
      });
    }

    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);
  return (
    <OrderDetails.Provider value={value} {...props}>
      {props.children}
    </OrderDetails.Provider>
  );
};

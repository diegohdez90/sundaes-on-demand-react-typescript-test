import React from 'react';
import { useOrderDetails } from '../../context/OrderDetails';
import { OrderDetailsInterface } from '../../utils/constants';
import SummaryForm from './SummaryForm';

export default function OrderSummary({
  setOrderPhase,
}: {
  setOrderPhase: (stage: string) => void;
}) {
  const [{ scoops, toppings, totals }] = useOrderDetails();

  const scoopArray: Map<string, string>[] = Array.from(scoops.entries());
  const scoopList: JSX.Element[] = scoopArray.map(([key, value]) => (
    <li key={key.toString()}>
      {value} {key}
    </li>
  ));

  const hasToppings = toppings.size > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray: Map<string, string>[] = Array.from(toppings.keys());
    const toppingList = toppingsArray.map((key) => (
      <li key={key.toString()}>{key}</li>
    ));
    toppingsDisplay = (
      <>
        <h2>Toppings: {totals.get('toppings')}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {totals.get('scoops')}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

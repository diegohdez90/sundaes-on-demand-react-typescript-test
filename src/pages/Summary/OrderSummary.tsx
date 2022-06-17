import React from 'react';
import { useOrderDetails } from '../../context/OrderDetails';
import SummaryForm from './SummaryForm';

export default function OrderSummary({
  setOrderPhase,
}: {
  setOrderPhase: (stage: string) => void;
}) {
  const [{ scoops, toppings, totals }] = useOrderDetails();

  const scoopArray = Array.from(scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasToppings = toppings.size > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray = Array.from(toppings.keys());
    const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);
    toppingsDisplay = (
      <>
        <h2>Toppings: {totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

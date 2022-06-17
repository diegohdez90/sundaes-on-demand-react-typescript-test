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

  console.log(scoopArray);

  const scoopList = scoopArray.map(([key, value], index) => (
    <li key={index}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Array.from(toppings.keys());
  const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);
  console.log(toppingsArray);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {totals.toppings}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

import React from 'react';
import { useOrderDetails } from '../../context/OrderDetails';
import SummaryForm from './SummaryForm';

export default function OrderSummary({
  setOrderPhase,
}: {
  setOrderPhase: (stage: string) => void;
}) {
  const [{ scoops, toppings, totals }] = useOrderDetails();

  const scoopArray: [string, number][] = Array.from(scoops.entries());
  const scoopList: JSX.Element[] = scoopArray
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => (
      <li key={key.toString()}>
        {value} {key}
      </li>
    ));

  const hasToppings = toppings.size > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray: [string, number][] = Array.from(toppings.entries());
    const toppingList = toppingsArray
      .filter(([, value]) => value !== 0)
      .map(([key]) => <li key={key.toString()}>{key}</li>);
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

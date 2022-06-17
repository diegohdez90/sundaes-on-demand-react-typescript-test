import React from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../context/OrderDetails';
import Options from './Options';

export default function OrderEntry({
  setOrderPhase,
}: {
  setOrderPhase: (stage: string) => void;
}) {
  const [{ totals }] = useOrderDetails();

  // disable order button if there aren't any scoops in order
  const orderDisabled = totals.get('scoops') === '$0.00';

  return (
    <div>
      <Options optionType="scoops" singular="scoop" inputType="number" />
      <Options optionType="toppings" singular="topping" inputType="checkbox" />
      <h4>Total: {totals.get('total')}</h4>
      <Button
        disabled={orderDisabled}
        onClick={() => setOrderPhase?.('review')}
      >
        Order Sundae!
      </Button>
    </div>
  );
}

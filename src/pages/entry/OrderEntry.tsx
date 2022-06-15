import React from 'react';
import { useOrderDetails } from '../../context/OrderDetails';
import Options from './Options';

export default function OrderEntry() {
  const [{ totals }] = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" singular="scoop" inputType="number" />
      <Options optionType="toppings" singular="topping" inputType="checkbox" />
      <h4>Total: {totals.get('total')}</h4>
    </div>
  );
}

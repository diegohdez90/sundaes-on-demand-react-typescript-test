import React from 'react';
import Options from './Options';

export default function OrderEntry() {
  return (
    <div>
      <Options optionType="scoops" singular="scoop" inputType="number" />
      <Options optionType="toppings" singular="topping" inputType="checkbox" />
    </div>
  );
}

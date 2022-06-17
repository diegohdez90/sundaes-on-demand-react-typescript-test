import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './context/OrderDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/Summary/OrderSummary';
import SummaryForm from './pages/Summary/SummaryForm';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry; // default to order page
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <>
      <OrderDetailsProvider>
        <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
      </OrderDetailsProvider>
    </>
  );
}

export default App;

import React from 'react';
import { OrderDetailsProvider } from './context/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import SummaryForm from './pages/Summary/SummaryForm';

function App() {
  return (
    <>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </>
  );
}

export default App;

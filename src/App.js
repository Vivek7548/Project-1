import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import InvoicePDF from './components/InvoicePDF';
import './App.css'

const App = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  return (
    <div className="App">
      <h1>Invoice Generator</h1>
      {!invoiceData && <InvoiceForm onSubmit={setInvoiceData} />}
      {invoiceData && (
        <>
          <InvoicePreview invoiceData={invoiceData} />
          <InvoicePDF invoiceData={invoiceData} />
          <button onClick={() => setInvoiceData(null)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default App;

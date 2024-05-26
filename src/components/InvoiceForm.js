import React, { useState } from 'react';
import './InvoiceForm.css'; 

const InvoiceForm = ({ onSubmit }) => {
  const [billTo, setBillTo] = useState({ name: '', address: '', city: '', state: '', zip: '' });
  const [shipTo, setShipTo] = useState({ name: '', address: '', city: '', state: '', zip: '' });
  const [invoiceDetails, setInvoiceDetails] = useState({ invoiceNumber: '', date: '', dueDate: '', subject: '' });
  const [lineItems, setLineItems] = useState([{ description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  const [tax, setTax] = useState(0);

  const handleLineItemChange = (index, field, value) => {
    const newLineItems = [...lineItems];
    newLineItems[index][field] = value;
    newLineItems[index].total = newLineItems[index].quantity * newLineItems[index].unitPrice;
    setLineItems(newLineItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ billTo, shipTo, invoiceDetails, lineItems, tax });
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((acc, item) => acc + item.total, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + (subtotal * (tax / 100));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Bill To and Ship To */}
      <fieldset>
        <legend>Bill To:</legend>
        <input type="text" placeholder="Name" value={billTo.name} onChange={(e) => setBillTo({ ...billTo, name: e.target.value })} required />
        <input type="text" placeholder="Address" value={billTo.address} onChange={(e) => setBillTo({ ...billTo, address: e.target.value })} required />
        <input type="text" placeholder="City" value={billTo.city} onChange={(e) => setBillTo({ ...billTo, city: e.target.value })} required />
        <input type="text" placeholder="State" value={billTo.state} onChange={(e) => setBillTo({ ...billTo, state: e.target.value })} required />
        <input type="text" placeholder="ZIP Code" value={billTo.zip} onChange={(e) => setBillTo({ ...billTo, zip: e.target.value })} required />
      </fieldset>

      <fieldset>
        <legend>Ship To:</legend>
        <input type="text" placeholder="Name" value={shipTo.name} onChange={(e) => setShipTo({ ...shipTo, name: e.target.value })} required />
        <input type="text" placeholder="Address" value={shipTo.address} onChange={(e) => setShipTo({ ...shipTo, address: e.target.value })} required />
        <input type="text" placeholder="City" value={shipTo.city} onChange={(e) => setShipTo({ ...shipTo, city: e.target.value })} required />
        <input type="text" placeholder="State" value={shipTo.state} onChange={(e) => setShipTo({ ...shipTo, state: e.target.value })} required />
        <input type="text" placeholder="ZIP Code" value={shipTo.zip} onChange={(e) => setShipTo({ ...shipTo, zip: e.target.value })} required />
      </fieldset>

      {/* Invoice Details */}
      <fieldset>
        <legend>Invoice Details:</legend>
        <input type="text" placeholder="Invoice Number" value={invoiceDetails.invoiceNumber} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceNumber: e.target.value })} required />
        <input type="date" placeholder="Date" value={invoiceDetails.date} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })} required />
        <input type="date" placeholder="Due Date" value={invoiceDetails.dueDate} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, dueDate: e.target.value })} required />
        <input type="text" placeholder="Subject" value={invoiceDetails.subject} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, subject: e.target.value })} required />
      </fieldset>

      {/* Line Items */}
      <fieldset>
        <legend>Line Items:</legend>
        {lineItems.map((item, index) => (
          <div key={index}>
            <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleLineItemChange(index, 'description', e.target.value)} required />
            <input type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => handleLineItemChange(index, 'quantity', Number(e.target.value))} required />
            <input type="number" placeholder="Unit Price" value={item.unitPrice} onChange={(e) => handleLineItemChange(index, 'unitPrice', Number(e.target.value))} required />
            <input type="number" placeholder="Total" value={item.total} readOnly />
          </div>
        ))}
        <button type="button" onClick={addLineItem}>Add Line Item</button>
      </fieldset>

      {/* Totals */}
      <fieldset>
        <legend>Totals:</legend>
        <input type="number" placeholder="Tax (%)" value={tax} onChange={(e) => setTax(Number(e.target.value))} required />
        <div>Subtotal: {calculateSubtotal()}</div>
        <div>Total: {calculateTotal()}</div>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default InvoiceForm;

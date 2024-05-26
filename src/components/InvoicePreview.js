import React from 'react';

const InvoicePreview = ({ invoiceData }) => {
  const { billTo, shipTo, invoiceDetails, lineItems, tax } = invoiceData;

  const calculateSubtotal = () => {
    return lineItems.reduce((acc, item) => acc + item.total, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + (subtotal * (tax / 100));
  };

  return (
    <div>
      <h2>Invoice Preview</h2>
      <div>
        <h3>Bill To:</h3>
        <p>{billTo.name}</p>
        <p>{billTo.address}</p>
        <p>{billTo.city}, {billTo.state} {billTo.zip}</p>
      </div>
      <div>
        <h3>Ship To:</h3>
        <p>{shipTo.name}</p>
        <p>{shipTo.address}</p>
        <p>{shipTo.city}, {shipTo.state} {shipTo.zip}</p>
      </div>
      <div>
        <h3>Invoice Details:</h3>
        <p>Invoice Number: {invoiceDetails.invoiceNumber}</p>
        <p>Date: {invoiceDetails.date}</p>
        <p>Due Date: {invoiceDetails.dueDate}</p>
        <p>Subject: {invoiceDetails.subject}</p>
      </div>
      <div>
        <h3>Line Items:</h3>
        <ul>
          {lineItems.map((item, index) => (
            <li key={index}>
              <p>{item.description} - {item.quantity} x {item.unitPrice} = {item.total}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Totals:</h3>
        <p>Subtotal: {calculateSubtotal()}</p>
        <p>Tax: {tax}%</p>
        <p>Total: {calculateTotal()}</p>
      </div>
    </div>
  );
};

export default InvoicePreview;

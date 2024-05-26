import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 15,
    padding: 10,
    borderBottom: '1px solid #dddddd',
  },
  subheader: {
    fontSize: 16,
    marginBottom: 10,
    color: '#495057',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#212529',
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    marginBottom: 5,
    color: '#212529',
  },
  total: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#28a745',
  },
  boldText: {
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 10,
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 20,
  },
});

const InvoicePDF = ({ invoiceData }) => {
  const { billTo, shipTo, invoiceDetails, lineItems, tax } = invoiceData;

  const calculateSubtotal = () => {
    return lineItems.reduce((acc, item) => acc + item.total, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + (subtotal * (tax / 100));
  };

  return (
    <PDFViewer width="100%" height="600">
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Invoice</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Bill To:</Text>
            <Text style={styles.text}>{billTo.name}</Text>
            <Text style={styles.text}>{billTo.address}</Text>
            <Text style={styles.text}>{billTo.city}, {billTo.state} {billTo.zip}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Ship To:</Text>
            <Text style={styles.text}>{shipTo.name}</Text>
            <Text style={styles.text}>{shipTo.address}</Text>
            <Text style={styles.text}>{shipTo.city}, {shipTo.state} {shipTo.zip}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Invoice Details:</Text>
            <Text style={styles.text}>Invoice Number: <Text style={styles.boldText}>{invoiceDetails.invoiceNumber}</Text></Text>
            <Text style={styles.text}>Date: <Text style={styles.boldText}>{invoiceDetails.date}</Text></Text>
            <Text style={styles.text}>Due Date: <Text style={styles.boldText}>{invoiceDetails.dueDate}</Text></Text>
            <Text style={styles.text}>Subject: <Text style={styles.boldText}>{invoiceDetails.subject}</Text></Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Line Items:</Text>
            {lineItems.map((item, index) => (
              <View key={index} style={styles.lineItem}>
                <Text style={styles.text}>{item.description}</Text>
                <Text style={styles.text}>{item.quantity} x {item.unitPrice} = {item.total}</Text>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.total}>Subtotal: {calculateSubtotal()}</Text>
            <Text style={styles.total}>Tax: {tax}%</Text>
            <Text style={styles.total}>Total: {calculateTotal()}</Text>
          </View>
          <View style={styles.footer}>
            <Text>Thank you for your business!</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default InvoicePDF;

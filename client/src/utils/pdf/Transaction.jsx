import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCellHeader: {
    width: '14%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    width: '14%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    fontSize: 10,
    textAlign: 'center',
  },
});

const Footer = ({username}) => (
  <View style={styles.footer}>
    <Text> {username} {`${new Date().toLocaleString()}`}</Text>
  </View>
);

const TransactionPDF = ({ transactions,username }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Transaction Logs</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}> Id</Text>
            <Text style={styles.tableCellHeader}>Date</Text>
            <Text style={styles.tableCellHeader}>Member Name</Text>
            <Text style={styles.tableCellHeader}>Mode</Text>
            <Text style={styles.tableCellHeader}>Amount</Text>
            <Text style={styles.tableCellHeader}>Narration</Text>
            <Text style={styles.tableCellHeader}>Initiated By</Text>
          </View>
          {transactions  && transactions.map((transaction, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{transaction.transactionId}</Text>
              <Text style={styles.tableCell}>{  new Date(transaction.date).getDate()/ new Date(transaction.date).getMonth()+1/ new Date(transaction.date).getFullYear() }</Text>
              <Text style={styles.tableCell}>{transaction.member}</Text>
              <Text style={styles.tableCell}>{transaction.mode}</Text>
              <Text style={styles.tableCell}>{transaction.amount}</Text>
              <Text style={styles.tableCell}>{transaction.narration}</Text>
              <Text style={styles.tableCell}>{transaction.initiatedBy}</Text>
            </View>
          ))}
        </View>
      </View>
      <Footer  username={username}/>
    </Page>
  </Document>
);

export default TransactionPDF;

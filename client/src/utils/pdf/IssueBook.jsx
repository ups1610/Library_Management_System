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
    width: '13%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    width: '13%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 10,
  },

  CellCounter: {
    width: '5%',
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

const IssueBookPDF = ({ issueBooks,username }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>BookIssue  Logs</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
          <Text style={styles.CellCounter}>#</Text>
            <Text style={styles.tableCellHeader}> Book</Text>
            <Text style={styles.tableCellHeader}>Instance</Text>
            <Text style={styles.tableCellHeader}>Member Name</Text>
            <Text style={styles.tableCellHeader}>Date of Issue</Text>
            <Text style={styles.tableCellHeader}>Due Date</Text>
            <Text style={styles.tableCellHeader}>Is Return</Text>
            <Text style={styles.tableCellHeader}>Issued By</Text>
          </View>
          {issueBooks  && issueBooks.map((issueBook, index) => (
            <View style={styles.tableRow} key={index}>
                   <Text style={styles.CellCounter}>{index+1}</Text>
     
              <Text style={styles.tableCell}>  {issueBook.bookInstance.book.title}</Text>
              <Text style={styles.tableCell}>     {issueBook.bookInstance.id}</Text>
              <Text style={styles.tableCell}>{issueBook.memberName}</Text>
              <Text style={styles.tableCell}>{  new Date(issueBook.dateOfIssue).getDate()/ new Date(issueBook.dateOfIssue).getMonth()+1/ new Date(issueBook.dateOfIssue).getFullYear() }</Text>
              <Text style={styles.tableCell}>{  new Date(issueBook.dateOfReturn).getDate()/ new Date(issueBook.dateOfReturn).getMonth()+1/ new Date(issueBook.dateOfReturn).getFullYear() }</Text>
              <Text style={styles.tableCell}>{issueBook.member}</Text>
              <Text style={styles.tableCell}>{issueBook.isReturn}</Text>
              <Text style={styles.tableCell}>{issueBook.issueBy}</Text>
            </View>
          ))}
        </View>
      </View>
      <Footer  username={username}/>
    </Page>
  </Document>
);

export default IssueBookPDF;

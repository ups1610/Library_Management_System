import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
  page: {
    padding: 2,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    margin:'auto'
  },
  tableRow: {
    flexDirection: 'row',
    borderWidth: 0,
  },
  tableColHeader: {
    width: '18%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding:1,
    borderTopWidth: 0,
    fontSize: 12,
  },
  tableCol: {
    width: '18%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding:1,
    borderTopWidth: 0,
    fontSize: 10,
    color:'#6b6e70'
  },
  ColEmail:{
    width: '24%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding:1,
    borderTopWidth: 0,
    fontSize: 10,
    color:'#6b6e70'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    fontSize: 10,
    display:'flex'
  },
});

const Footer = ({ username }) => (
  <View style={styles.footer}>
    <Text>{`${username}`}</Text>
    <Text>{`: ${new Date().toLocaleString()}`}</Text>
  </View>
);

const UserPDF = ({ userData, username }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text>Username</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>Email</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>Name</Text>
          </View>
        
          <View style={styles.tableColHeader}>
            <Text>Role</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>Status</Text>
          </View>
        </View>
        {userData.map((user, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>{user.userName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{user.email}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{user.firstName} {user.lastName}</Text>
            </View>
         
            <View style={styles.tableCol}>
              <Text>{user.role}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{user.status}</Text>
            </View>
          </View>
        ))}
      </View>
      <Footer username={username} />
    </Page>
  </Document>
);

export default UserPDF;

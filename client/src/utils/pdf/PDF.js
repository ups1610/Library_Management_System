import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});


 export const UserPDF = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {userData.map((user) => (
        <View key={user.id} style={styles.section}>
          <Text>{`Username: ${user.userName}`}</Text>
          <Text>{`Email: ${user.email}`}</Text>
          <Text>{`First Name: ${user.firstName}`}</Text>
          <Text>{`Last Name: ${user.lastName}`}</Text>
          <Text>{`Role: ${user.role}`}</Text>
          <Text>{`Status: ${user.status}`}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default UserPDF;

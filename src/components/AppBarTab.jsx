import React from "react";
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {},
  content: {
    color: "white",
    fontWeight: "bold",
    margin: 10
  },
});

const AppBarTab = ({ content }) => (
  <View style={styles.container}>
    <Text style={styles.content}>{content}</Text>
  </View>
);

export default AppBarTab;

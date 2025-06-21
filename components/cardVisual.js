import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatAmount } from "../util/format_montos";

export const CardVisual = (props) => {
  const { total, title } = props;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>$ {formatAmount(total)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#FBF5DD",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  value: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

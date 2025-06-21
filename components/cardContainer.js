import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatAmount } from "../util/format_montos";

export const CardContainer = (props) => {
  const { title, value } = props;

  return (
    <View style={styles.card} {...props}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 20,
    backgroundColor: "#FBF5DD",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
});

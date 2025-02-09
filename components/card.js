import { Link } from "expo-router";

import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { formatAmount } from "../util/format_montos";

export function Card({ item, index }) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.description}>{item.concepto}</Text>
        <Text style={styles.description2}>{item.categoria}</Text>
        <Text style={styles.description2}>{item.tipo}</Text>
      </View>
      <Text
        style={{
          ...styles.amount,
          backgroundColor: item.tipo === "Ingreso" ? "#16404D" : "#DDA853",
        }}
      >
        $ {formatAmount(item.presupuesto_usd)}
      </Text>
    </View>
  );
}

export function DetailCard({ item, index }) {
  return (
    <View style={styles.item}>
      <View
        style={{
          maxWidth: 250,
        }}
      >
        <Text style={styles.description}>{item.detalle}</Text>
        <Text style={styles.description2}>{item.nombre_presupuesto}</Text>
        <Text style={styles.description2}>{item.fecha}</Text>
      </View>
      <Text style={styles.amount}>$ {formatAmount(item.monto_usd)}</Text>
    </View>
  );
}

export function DetailAnimatedCard({ item, index }) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity: opacity }}>
      <DetailCard item={item} index={index} />
    </Animated.View>
  );
}

export function AnimatedCard({ item, index }) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity: opacity }}>
      <Card item={item} index={index} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    backgroundColor: "#FBF5DD",
    padding: 15,
    marginVertical: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  description2: {
    fontSize: 12,
    color: "#333",
  },
  amount: {
    backgroundColor: "#DDA853",
    padding: 10,
    /* borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20, */
    borderRadius: 20,
    /* width: 100, */
    textAlign: "right",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

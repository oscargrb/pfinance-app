import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#DDA853" },
        headerTitle: "Mi App de Finanzas",
        headerTintColor: "#16404D",
      }}
    />
  );
}

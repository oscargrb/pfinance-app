import { Picker } from "@react-native-picker/picker";
import { Screen } from "../components/screen";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { ButtonCustom } from "../components/buttonCustom";
import { router, useLocalSearchParams } from "expo-router";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { CalendarIcon } from "../components/icons";
import { find_budget, submit_budget } from "../services/budget";
import { submit_detail } from "../services/details";

const NuevoDetalle = (props) => {
  const [budgets, setBudgets] = useState([]);
  const { month, year } = useLocalSearchParams();

  const [formData, setFormData] = useState({
    fecha: "",
    presupuesto: "",
    detalle: "",
    monto_bs: "",
  });

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);

    handleform("fecha", currentDate.toLocaleDateString());
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  useEffect(() => {
    find_budget(year, month, (d) => {
      console.log(d);
      setBudgets(d);
    });
  }, []);

  const handleform = (name, val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: val,
    }));
  };

  return (
    <Screen>
      <Text>Ingrese los campos requeridos</Text>

      <View style={styles.input_container}>
        <Text style={styles.label}>* Mes</Text>
        <CalendarIcon onPress={showDatepicker} />
        <Text style={styles.label}>{date.toLocaleDateString()}</Text>
      </View>

      <View style={styles.input_container}>
        <Text style={styles.label}>* Presupuesto</Text>
        <Picker
          selectedValue={formData["presupuesto"]}
          mode="dropdown"
          style={styles.select}
          onValueChange={(val) => {
            console.log(val);
            handleform("presupuesto", Number(val));
          }}
        >
          {budgets.map((item) => (
            <Picker.Item key={item.ID} label={item.concepto} value={item.ID} />
          ))}
        </Picker>
      </View>

      <View style={styles.input_container}>
        <Text style={styles.label}>* Detalle</Text>
        <TextInput
          inputMode="text"
          style={styles.input}
          onChangeText={(val) => {
            handleform("detalle", val);
          }}
        />
      </View>

      <View style={styles.input_container}>
        <Text style={styles.label}>* Monto BS</Text>
        <TextInput
          inputMode="decimal"
          style={styles.input}
          onChangeText={(val) => {
            handleform("monto_bs", Number(val));
          }}
        />
      </View>

      <View style={styles.button_container}>
        <ButtonCustom
          title={"Guardar"}
          exec={() => {
            console.log("Entra");
            submit_detail(formData, () => router.back());
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  input_container: {
    padding: 10,
    display: "flex",
    gap: 5,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",

    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  select: {
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button_container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
  },
});

export default NuevoDetalle;

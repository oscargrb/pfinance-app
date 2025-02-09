import { Picker } from "@react-native-picker/picker";
import { Screen } from "../components/screen";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { ButtonCustom } from "../components/buttonCustom";
import { router, useLocalSearchParams } from "expo-router";

import { get_data_to_form, submit_budget } from "../services/budget";

const NuevoPresupuesto = (props) => {
  const { month, year } = useLocalSearchParams();

  const [tipos, setTipos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    month: Number(month),
    year: Number(year),
    tipo: "",
    categoria: "",
    concepto: "",
    presupuesto_usd: "",
  });

  useEffect(() => {
    initComponent();
    console.log(month, year);
  }, []);

  const initComponent = async () => {
    await get_data_to_form((data) => {
      setTipos(data.tipos);
      setCategorias(data.categorias);
    });
    handleform("tipo", tipos[0].id);
    handleform(
      "categoria",
      categorias.filter((i) => i.tipo === tipos[0].id)[0].id
    );
  };

  const handleform = (name, val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: val,
    }));
    console.log(formData);
  };

  return (
    <Screen>
      <Text>Ingrese los campos requeridos</Text>

      <View style={styles.input_container}>
        <Text style={styles.label}>* Mes</Text>
        <TextInput
          inputMode="numeric"
          style={styles.input}
          defaultValue={String(formData.month)}
          onChangeText={(val) => {
            console.log(val);
            handleform("month", Number(val));
          }}
        />
      </View>

      <View style={styles.input_container}>
        <Text style={styles.label}>* Año</Text>
        <TextInput
          inputMode="numeric"
          style={styles.input}
          defaultValue={String(formData.year)}
          onChangeText={(val) => {
            handleform("year", Number(val));
          }}
        />
      </View>

      <View style={styles.input_container}>
        <Text style={styles.label}>* Tipo</Text>
        <Picker
          selectedValue={formData["tipo"]}
          mode="dropdown"
          style={styles.select}
          onValueChange={(val) => {
            handleform("tipo", Number(val));
          }}
        >
          {tipos.map((item) => (
            <Picker.Item key={item.id} label={item.tipo} value={item.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.input_container}>
        <Text style={styles.label}>* Categoria</Text>
        <Picker
          selectedValue={formData["categoria"]}
          mode="dropdown"
          style={styles.select}
          onValueChange={(val) => {
            handleform("categoria", Number(val));
          }}
        >
          {categorias
            .filter((i) => i.tipo === formData.tipo)
            .map((item) => (
              <Picker.Item
                key={item.id}
                label={item.categoria}
                value={item.id}
              />
            ))}
        </Picker>
      </View>

      <View style={styles.input_container}>
        <Text style={styles.label}>* Concepto</Text>
        <TextInput
          inputMode="text"
          style={styles.input}
          onChangeText={(val) => {
            handleform("concepto", val);
          }}
        />
      </View>

      <View style={styles.input_container}>
        <Text style={styles.label}>* Presupuesto USD</Text>
        <TextInput
          inputMode="decimal"
          style={styles.input}
          onChangeText={(val) => {
            handleform("presupuesto_usd", Number(val));
          }}
        />
      </View>

      <View style={styles.button_container}>
        <ButtonCustom
          title={"Guardar"}
          exec={() =>
            submit_budget(formData, () => {
              router.back();
            })
          }
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

export default NuevoPresupuesto;

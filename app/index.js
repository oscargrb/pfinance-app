import { Pressable, StyleSheet, View } from "react-native";
import { Screen } from "../components/screen";
import { useEffect, useState } from "react";
import { ButtonCustom } from "../components/buttonCustom";
import { useRouter } from "expo-router";
import { CalculatorIcon, ChartIcon, InvoiceIcon } from "../components/icons";
import { find_budget } from "../services/budget";
import { find_details } from "../services/details";
import { find_dashboard } from "../services/dashboard";
import { MonthPicker, YearPicker } from "../components/index/pickers";
import {
  DashboardPane,
  GeneralBudgetTable,
  GeneralDetailsTable,
} from "../components/index/paneTables";

export default function Index() {
  //states
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [budgets, setBudget] = useState([]);
  const [details, setDetails] = useState([]);
  const [dataDash, setDataDash] = useState(null);
  const [paneOption, setPaneOption] = useState("budget");

  // router
  const router = useRouter();

  // on init
  useEffect(() => {
    find_budget(year, month, (d) => setBudget(d));
    find_details(year, month, (d) => setDetails(d));
    find_dashboard(year, month, (d) => setDataDash(d));
  }, [year, month]);

  return (
    <Screen>
      <View>
        <MonthPicker value={month} set={setMonth} />
        <YearPicker value={year} set={setYear} />
      </View>

      <View style={styles.paneContainer}>
        {/* Option Pane */}

        <View style={styles.paneOptionsContainer}>
          <Pressable
            backgroundColor={paneOption == "budget" ? "#16404D" : "#A6CDC6"}
            style={styles.paneOption}
            onPress={() => {
              setPaneOption("budget");
              find_budget(year, month, (d) => setBudget(d));
            }}
          >
            <CalculatorIcon color={"#FBF5DD"} size={30} />
          </Pressable>
          <Pressable
            style={styles.paneOption}
            onPress={() => {
              setPaneOption("detail");
              find_details(year, month, (d) => setDetails(d));
            }}
            backgroundColor={paneOption == "detail" ? "#16404D" : "#A6CDC6"}
          >
            <InvoiceIcon color={"#FBF5DD"} />
          </Pressable>
          <Pressable
            backgroundColor={paneOption == "dashboard" ? "#16404D" : "#A6CDC6"}
            style={styles.paneOption}
            onPress={() => {
              setPaneOption("dashboard");
              find_dashboard(year, month, (d) => setDataDash(d));
            }}
          >
            <ChartIcon color={"#FBF5DD"} />
          </Pressable>
        </View>

        {/* Content Pane */}

        {paneOption === "budget" ? (
          <GeneralBudgetTable data={budgets} title={"Presupuestos"} />
        ) : paneOption === "detail" ? (
          <GeneralDetailsTable data={details} title={"Detalles"} />
        ) : (
          <DashboardPane dataDash={dataDash} />
        )}
      </View>

      {/* Action Buttons */}

      <View style={styles.actionButton}>
        <ButtonCustom
          title={"Nuevo Detalle"}
          exec={() =>
            router.navigate(`/nuevoDetalle?month=${month}&year=${year}`)
          }
        />
        <ButtonCustom
          title={"Nuevo Presuesto"}
          exec={() =>
            router.navigate(`/nuevoPresupuesto?month=${month}&year=${year}`)
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  paneContainer: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#A6CDC6",
  },
  paneOptionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    padding: 5,
    gap: 5,
    alignItems: "center",
  },
  paneOption: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    height: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    padding: 10,
    overflow: "hidden",
  },
});

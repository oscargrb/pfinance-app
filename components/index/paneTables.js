import { FlatList, ScrollView, Text } from "react-native";
import { CardContainer } from "../cardContainer";
import { AnimatedCard, DetailAnimatedCard } from "../card";
import { CardVisual } from "../cardVisual";
import BarChartVisual from "../barChartVisual";
import { CascadeBar } from "../cascadeBar";

export const GeneralBudgetTable = (props) => {
  return (
    <>
      <CardContainer backgroundColor="#16404D">
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {props.title}
        </Text>
      </CardContainer>
      {props.data.length > 0 ? (
        <FlatList
          data={props.data}
          keyExtractor={({ index, item }) => index}
          renderItem={({ index, item }) => {
            return <AnimatedCard key={index} index={index} item={item} />;
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export const GeneralDetailsTable = (props) => {
  return (
    <>
      <CardContainer backgroundColor="#16404D">
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {props.title}
        </Text>
      </CardContainer>
      {props.data.length > 0 ? (
        <FlatList
          data={props.data}
          keyExtractor={({ index, item }) => index}
          renderItem={({ index, item }) => {
            return <DetailAnimatedCard key={index} index={index} item={item} />;
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export const DashboardPane = (props) => {
  const { dataDash } = props;

  return (
    <>
      <CardContainer backgroundColor="#16404D">
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Dashboard
        </Text>
      </CardContainer>
      <ScrollView
        style={{
          display: "flex",
          gap: 5,
        }}
      >
        {dataDash ? (
          <>
            <CardVisual
              title={"Ingresos Presupuesto"}
              total={dataDash.total_ingresos_pre}
            />
            <CardVisual
              title={"Egresos Presupuesto"}
              total={dataDash.total_egresos_pre}
            />
            <CardVisual
              title={"Ingresos Totales"}
              total={dataDash.total_ingresos}
            />
            <CardVisual
              title={"Egresos Totales"}
              total={dataDash.total_egresos}
            />
            <CardVisual
              title={"Saldo Restante"}
              total={dataDash.total_ingresos - dataDash.total_egresos}
            />

            {/* bar */}

            <CardContainer>
              <Text
                style={{
                  fontSize: 18,
                  padding: 5,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#16404D",
                }}
              >
                Ingresos Presupuesto
              </Text>
              <BarChartVisual data={dataDash.ingresos_pre} />
            </CardContainer>

            <CardContainer>
              <Text
                style={{
                  fontSize: 18,
                  padding: 5,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#16404D",
                }}
              >
                Ingresos
              </Text>
              <BarChartVisual data={dataDash.ingresos} />
            </CardContainer>

            <CardContainer>
              <Text
                style={{
                  fontSize: 18,
                  padding: 5,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#16404D",
                }}
              >
                Egresos Presupuesto
              </Text>
              <BarChartVisual data={dataDash.egresos_pre} />
            </CardContainer>

            <CardContainer>
              <Text
                style={{
                  fontSize: 18,
                  padding: 5,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#16404D",
                }}
              >
                Egresos
              </Text>
              <BarChartVisual data={dataDash.egresos} />
            </CardContainer>

            <CardContainer>
              <Text
                style={{
                  fontSize: 18,
                  padding: 5,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#16404D",
                }}
              >
                Ingresos Vs Egresos
              </Text>
              <CascadeBar
                data={dataDash.ing_vs_egr}
                total={dataDash.total_ingresos - dataDash.total_egresos}
              />
            </CardContainer>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </>
  );
};

import React from "react";
import { View, Dimensions, ScrollView } from "react-native";
import Svg, { Rect, Text, G, Line } from "react-native-svg";
import { formatAmount } from "../util/format_montos";

const { width } = Dimensions.get("window");

const BarChartVisual = (props) => {
  const { data } = props;

  const barWidth = width / (data.length * 3); // Ajusta el ancho de las barras
  const chartHeight = 400;
  const maxValue = Math.max(...data.map((item) => Math.max(item.monto_usd)));

  return (
    <ScrollView
      horizontal
      style={{
        display: "flex",
        padding: 5,
        gap: 10,
      }}
    >
      <Svg width={width} height={chartHeight + 40}>
        {/* Ejes */}
        <Line
          x1="0"
          y1={chartHeight}
          x2={width}
          y2={chartHeight}
          stroke="black"
        />
        <Line x1="0" y1="0" x2="0" y2={chartHeight} stroke="black" />

        {/* Líneas de la cuadrícula */}
        {Array.from({ length: 5 }).map((_, index) => (
          <Line
            key={index}
            x1="0"
            y1={(chartHeight / 5) * index}
            x2={width}
            y2={(chartHeight / 5) * index}
            stroke="gray"
            strokeDasharray="3 3"
          />
        ))}

        {data.map((item, index) => (
          <G key={index}>
            {/* Barra para monto_usd */}
            <Rect
              x={index * barWidth * 3 + barWidth}
              y={chartHeight - (item.monto_usd / maxValue) * chartHeight}
              width={barWidth}
              height={(item.monto_usd / maxValue) * chartHeight}
              fill="#16404D"
            />
            <Text
              x={index * barWidth * 3 + barWidth + barWidth / 2}
              y={chartHeight - (item.monto_usd / maxValue) * chartHeight + 20}
              fontSize={9}
              fill="#fff"
              textAnchor="middle"
            >
              {`$ ${formatAmount(item.monto_usd)}`}
            </Text>

            {/* Barra para monto_usd_pre */}
            {/* <Rect
              x={index * barWidth * 3 + barWidth * 1.5}
              y={chartHeight - (item.monto_usd_pre / maxValue) * chartHeight}
              width={barWidth}
              height={(item.monto_usd_pre / maxValue) * chartHeight}
              fill="#DDA853"
            />
            <Text
              x={index * barWidth * 3 + barWidth * 2}
              y={
                chartHeight - (item.monto_usd_pre / maxValue) * chartHeight - 10
              }
              fontSize={9}
              fill="#16404D"
              textAnchor="middle"
            >
              {`$ ${formatAmount(item.monto_usd_pre)}`}
            </Text> */}

            {/* Categoría */}
            <Text
              x={index * barWidth * 3 + barWidth * 1.5}
              y={chartHeight + 20}
              fontSize={14}
              fill="black"
              textAnchor="middle"
            >
              {item.categoria}
            </Text>
          </G>
        ))}
      </Svg>
    </ScrollView>
  );
};

export default BarChartVisual;

import React, { useState, useEffect } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import Svg, { Rect, Text, G, Line, Path } from "react-native-svg";
import { formatAmount } from "../util/format_montos";

const { width } = Dimensions.get("window");

export const CascadeBar = (props) => {
  const { data, total } = props;

  let data_format = [].concat(data);

  if (!data_format.find((i) => i.categoria === "Restante")) {
    data_format.push({
      categoria: "Restante",
      tipo: "Egreso",
      monto_usd: total,
    });
  }

  const data_sort = data_format.sort((a, b) => {
    if (a.tipo === "Ingreso" && b.tipo !== "Ingreso") {
      return -1;
    }
    if (a.tipo !== "Ingreso" && b.tipo === "Ingreso") {
      return 1;
    }
    return 0;
  });

  const barWidth = width / (data_sort.length * 2);
  const chartHeight = 400;
  const maxValue = Math.max(
    ...data_sort.map((item) => Math.abs(item.monto_usd))
  );

  return (
    <ScrollView style={{ paddingVertical: 16 }} horizontal>
      <Svg width={width} height={chartHeight + 40}>
        {/* Ejes */}
        <Line
          x1="0"
          y1={chartHeight / 2}
          x2={width}
          y2={chartHeight / 2}
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

        {data_sort.map((item, index) => {
          const barHeight =
            (Math.abs(item.monto_usd) / maxValue) * (chartHeight / 2);
          const yPosition =
            item.monto_usd >= 0 ? chartHeight / 2 - barHeight : chartHeight / 2;

          const fillColor = item.tipo === "Ingreso" ? "#16404D" : "#DDA853";

          return (
            <G key={index}>
              <Rect
                x={index * barWidth * 2 + barWidth / 2}
                y={yPosition}
                width={barWidth}
                height={barHeight}
                fill={fillColor}
              />
              <Text
                x={index * barWidth * 2 + barWidth}
                y={yPosition + (item.monto_usd >= 0 ? 20 : barHeight + 20)}
                fontSize={9}
                fill={item.tipo === "Ingreso" ? "#A6CDC6" : "#16404D"}
                textAnchor="middle"
              >
                {`$ ${formatAmount(item.monto_usd)}`}
              </Text>
              <Text
                x={index * barWidth * 2 + barWidth}
                y={chartHeight + 20}
                fontSize={14}
                fill="black"
                textAnchor="middle"
              >
                {item.categoria}
              </Text>
            </G>
          );
        })}
      </Svg>
    </ScrollView>
  );
};

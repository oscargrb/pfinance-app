import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import Svg, { G, Path, Text } from "react-native-svg";

const { width } = Dimensions.get("window");

export const PieChart = (props) => {
  const { data } = props;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const createPieChart = (data) => {
    const pieSlices = [];
    const total = data.reduce((sum, item) => sum + item.monto_usd, 0);
    let cumulativeValue = 0;

    data.forEach((item, index) => {
      const startAngle = (cumulativeValue / total) * 2 * Math.PI;
      const endAngle =
        ((cumulativeValue + item.monto_usd) / total) * 2 * Math.PI;
      const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

      const x1 = 100 * Math.cos(startAngle);
      const y1 = 100 * Math.sin(startAngle);
      const x2 = 100 * Math.cos(endAngle);
      const y2 = 100 * Math.sin(endAngle);

      const pathData = [
        `M 0 0`,
        `L ${x1} ${y1}`,
        `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`,
      ].join(" ");

      pieSlices.push(
        <G key={`slice-${index}`}>
          <Path d={pathData} fill={COLORS[index % COLORS.length]} />
          <Text
            x={(x1 + x2) / 2}
            y={(y1 + y2) / 2}
            fill="white"
            fontSize={14}
            textAnchor="middle"
          >
            {`${item.categoria}: ${(item.monto_usd / total) * 100}%`}
          </Text>
        </G>
      );

      cumulativeValue += item.monto_usd;
    });

    return pieSlices;
  };

  return (
    <View style={{ alignItems: "center", paddingVertical: 16 }}>
      <Svg width={width / 2} height={400}>
        <G x={width / 4} y={200}>
          {createPieChart(data)}
        </G>
      </Svg>
    </View>
  );
};

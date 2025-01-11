import React from "react";
import ReactECharts from "echarts-for-react";

const SurvivorsChart = ({ transformedData, ageGroups }) => {
  const xAxisData = ageGroups;
  const survivorsData = xAxisData.map(
    (group) => transformedData[group]?.survivors || 0
  );
  const nonSurvivorsData = xAxisData.map(
    (group) => transformedData[group]?.nonSurvivors || 0
  );

  const options = {
    title: { text: "Survivors Chart" },
    tooltip: { trigger: "axis" },
    legend: { data: ["Survivors", "Non-Survivors"] },
    xAxis: { type: "category", data: xAxisData },
    yAxis: { type: "value" },
    series: [
      {
        name: "Survivors",
        type: "bar",
        data: survivorsData,
        itemStyle: { color: "green" },
      },
      {
        name: "Non-Survivors",
        type: "bar",
        data: nonSurvivorsData,
        itemStyle: { color: "red" },
      },
    ],
  };

  return <ReactECharts option={options} />;
};

export default SurvivorsChart;

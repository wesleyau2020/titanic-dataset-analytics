import React from "react";
import ReactECharts from "echarts-for-react";

const SurvivorsChart = ({ data, ageGroups }) => {
  const survivorsData = Object.values(data).map((item) => item.survivors);
  const nonSurvivorsData = Object.values(data).map((item) => item.nonSurvivors);
  // console.log("survivorsData:", survivorsData);
  // console.log("nonSurvivorsData:", nonSurvivorsData);

  const options = {
    // title: { text: "Survivors Chart" },
    tooltip: { trigger: "axis" },
    legend: { data: ["Survivors", "Non-Survivors"] },
    xAxis: { type: "category", data: ageGroups },
    yAxis: {
      type: "value",
      name: "Survivor Count",
    },
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

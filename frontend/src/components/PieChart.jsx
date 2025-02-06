// src/components/PieChartComponent.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChartComponent = ({ data }) => {
  const labels = data.map((item) => item.category);
  const counts = data.map((item) => item.count);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Items per Category",
        data: counts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#00FA9A",
          "#FF7F50",
          "#a1c4fd",
          "#c2e9fb",
        ],
      },
    ],
  };
  return (
    <div>
      <h3>Category Distribution</h3>
      <Pie data={chartData} options={{ maintainAspectRatio: true }} />
    </div>
  );
};
export default PieChartComponent;

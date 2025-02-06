// src/components/BarChartComponent.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const BarChartComponent = ({ data }) => {
  const labels = data.map((item) => item.range);
  const counts = data.map((item) => item.count);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of Items",
        data: counts,
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };
  return (
    <div>
      <h3>Price Range Distribution</h3>
      <Bar data={chartData} options={{ maintainAspectRatio: true }} />
    </div>
  );
};
export default BarChartComponent;

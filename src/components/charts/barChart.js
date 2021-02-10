import React from "react";
import { Bar } from "react-chartjs-2";
import "./css/charts.css";

function BarChart({ dataCharts: { labels, data }, label = "Not Selected" }) {
  const state = {
    labels,
    datasets: [
      {
        label: "Null values",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data,
      },
    ],
  };

  return (
    <div className="general">
      <span className="barchart-label">
        <strong>{label}</strong>
      </span>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}

export default BarChart;

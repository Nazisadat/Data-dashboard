import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart({
  dataCharts: { labels, data },
  label = "Not selected",
}) {
  const state = {
    labels,
    datasets: [
      {
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
          "#438aff",
          "#b8429c",
          "#8b6244",
          "#cf908c",
          "#1cefe8",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data,
      },
    ],
  };
  return (
    <div className="general">
      <span className="doughnut-label">
        <strong>{label}</strong>
      </span>
      <Doughnut
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

export default DoughnutChart;

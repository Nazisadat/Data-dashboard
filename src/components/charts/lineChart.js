import React from "react";
import { Line } from "react-chartjs-2";
import "./css/charts.css";

function LineChart({ dataCharts: { labels, data } }) {
  const state = {
    labels,
    datasets: [
      {
        label: "Rainfall",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data,
      },
    ],
  };
  console.log(labels, data);
  return (
    <div className="general">
      <Line
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

export default LineChart;

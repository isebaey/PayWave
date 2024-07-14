import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const TransactionGraph = ({ transactions, type }) => {
  if (!transactions.length) {
    return <p>No transactions available.</p>;
  }

  const groupByDate = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + transaction.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(groupByDate),
    datasets: [
      {
        label: "Transaction Amount",
        data: Object.values(groupByDate),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line data={data} />;
      case "bar":
        return <Bar data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded p-3 bg-white shadow-sm">
      <h2 className="chart-title text-center">
        {type.charAt(0).toUpperCase() + type.slice(1)} Chart
      </h2>
      <div className="chart-container">{renderChart()}</div>
    </div>
  );
};

export default TransactionGraph;

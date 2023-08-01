import React from "react";
import "./Dashboard.css";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const donutChartOptions = {
    chart: {
      id: "donut-chart",
    },
    labels: ["Apple", "Banana", "Orange", "Grapes", "Mango"],
  };
  const donutChartData = [60, 20, 15, 10, 35];

  const lineChartOptions = {
    chart: {
      id: "line-chart",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };
  const lineChartData = [
    {
      name: "Sales",
      data: [65, 59, 80, 81, 56, 55, 40], 
    },
  ];

  const barChartOptions = {
    chart: {
      id: "bar-chart",
    },
    xaxis: {
      categories: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    },
  };
  const barChartData = [
    {
      name: "Quantity",
      data: [12, 30, 15, 28, 8, 22],
    },
  ];

  // const allHeadLines = value.map((item) => item.headLine);
  // const uniqueHeadLines = [...new Set(allHeadLines)];

  return (
    <div className="data-dashboard">
      <div className="chart-container">
        <h2>
          Line Chart
          {/* {uniqueHeadLines} */}
          <select name="" id="">
            <option value="iron"></option>
          </select>
        </h2>
        <Chart
          options={lineChartOptions}
          series={lineChartData}
          type="line"
          height={350}
        />
      </div>
      <div className="chart-container">
        <h2>
          Bar Chart
          {/* {uniqueHeadLines} */}
        </h2>
        <Chart
          options={barChartOptions}
          series={barChartData}
          type="bar"
          height={350}
        />
      </div>
      <div className="chart-container">
        <h2>
          Donut Chart
          {/* {uniqueHeadLines} */}
        </h2>
        <Chart
          options={donutChartOptions}
          series={donutChartData}
          type="donut"
          height={350}
        />
      </div>
      <div className="chart-container">
        <h2>
          Line Chart
          {/* {uniqueHeadLines} */}
        </h2>
        <Chart
          options={lineChartOptions}
          series={lineChartData}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default Dashboard;

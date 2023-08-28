import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Chart from "react-apexcharts";
import axios from "axios";
import Host from "../utils/routes";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import { tokens } from "../Theme";
import { useTheme } from "@mui/material";
import Loader from "./Loader";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { inventoryId, setInventoryId, project, setProject } =
    useContext(ProjectContext);
  const [contractorsArray, setContractorsArray] = useState([]);
  const [tools, setTools] = useState([]);
  const [orders, setOrders] = useState([]);
  const [service, setService] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedDonutChartOption, setSelectedDonutChartOption] =
    useState("כמות מוצר");
  const [selectedLineChartOption, setSelectedLineChartOption] =
    useState("כמות שירותים לקבלן");
  const [selectedBarChartOption, setSelectedBarChartOption] =
    useState("מחיר לשירות");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      project &&
      localStorage.getItem("selectedProjectId") !== undefined
    ) {
      axios
        .post(
          `${Host}/project/get`,
          {},
          {
            headers: { projectId: localStorage.getItem("selectedProjectId") },
          }
        )
        .then(({ data }) => {
          setProject(data);
          setInventoryId(data.inventory[0]);
          setProducts(data.inventory[0].products);
          setContractorsArray(data.contractors);
          setLoading(false);

          localStorage.setItem("ordersId", data.projectOrders);
          localStorage.setItem("inventoryId", data.inventory[0]._id);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (inventoryId) {
      const fetchData = async () => {
        try {
          const serviceResponse = await axios.post(
            `${Host}/contractor/getAllServices`,
            {
              contractorId: contractorsArray.map((order) => order._id),
            }
          );
          setService(serviceResponse.data);

          const ordersResponse = await axios.post(
            `${Host}/productOrder/getAllProductOrders`,
            {
              ordersId: "64c6496edd068b2c46962f28",
            }
          );
          setOrders([ordersResponse.data]);

          const toolsResponse = await axios.post(`${Host}/tools/getAllTools`, {
            inventoryId: inventoryId,
          });
          setTools(toolsResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [inventoryId]);


  const getLineChartData = () => {
    switch (selectedLineChartOption) {
      case "מחיר לשירות":
        return {
          labels: service.map((v) => v.unit),
          data: service.map((v) => v.price),
        };
      case "כמות שירותים לקבלן":
        return {
          labels: contractorsArray.map((contractor) => contractor.name),
          data: contractorsArray.map(
            (contractor) => contractor.services.length
          ),
        };
      case "כמות מוצר":
        return {
          labels: products.map((item) => item?.name),
          data: products.map((item) => item?.quantity),
        };
      case "tools":
        return {
          labels: tools.map((item) => item.toolName),
          data: tools.map((item) => item.takenBy),
        };
      default:
        return {
          labels: [],
          data: [],
        };
    }
  };

  const getBarChartData = () => {
    switch (selectedBarChartOption) {
      case "מחיר לשירות":
        return {
          labels: service.map((v) => v.unit),
          data: service.map((v) => v.price),
        };
      case "כמות שירותים לקבלן":
        return {
          labels: contractorsArray.map((contractor) => contractor.name),
          data: contractorsArray.map(
            (contractor) => contractor.services.length
          ),
        };
      case "כמות מוצר":
        return {
          labels: products.map((item) => item.name),
          data: products.map((item) => item.quantity),
        };
      // case "tools":
      //   return {
      //     labels: tools.map((item) => item.toolName),
      //     data: tools.map((item) => item.takenBy),
      //   };
      default:
        return {
          labels: [],
          data: [],
        };
    }
  };
  console.log(
    products,
    "THIS IS THE PRODUCTSSSSSS"
  );
  const getDonutChartData = () => {
    switch (selectedDonutChartOption) {
      case "מחיר לשירות":
        return {
          labels: service.map((v) => v.unit),
          data: service.map((v) => v.price),
        };
      case "כמות שירותים לקבלן":
        return {
          labels: contractorsArray.map((contractor) => contractor.name),
          data: contractorsArray.map((contractor) => contractor._id),
        };
      case "כמות מוצר":
        return {
          labels: products.map((item) => item.name),
          data: products.map((item) => item.quantity),
        };
      case "tools":
        return {
          labels: tools.map((item) => item.toolName),
          data: tools.map((item) => item.takenBy),
        };
      default:
        return {
          labels: [],
          data: [],
        };
    }
  };


  const { labels: lineChartLabels, data: lineChartData } = getLineChartData();
  const { labels: barChartLabels, data: barChartData } = getBarChartData();
  const { labels: donutChartLabels, data: donutChartData } =
    getDonutChartData();

  if (loading) {
    return <Loader />;
  }
  console.log(new Date());
  
  return (
    <div className="data-dashboard">
      <div className="chart-container">
        <h2 className="h2-graphs">תרשים קו</h2>
        <div>
          <label>
            <select
              className="dashboard-select"
              value={selectedLineChartOption}
              onChange={(e) => setSelectedLineChartOption(e.target.value)}
            >
              <option value="כמות שירותים לקבלן">קבלנים</option>
              <option value="כמות מוצר">מוצרים</option>
            </select>
          </label>
        </div>
        <Chart
          options={{
            xaxis: {
              categories: lineChartLabels,
            },
          }}
          series={[{ name: selectedLineChartOption, data: lineChartData }]}
          type="line"
          height={350}
        />
      </div>
      <div className="chart-container">
        <h2 className="h2-graphs">דיאגרמת עמודות</h2>
        <div>
          <label>
            <select
              className="dashboard-select"
              value={selectedBarChartOption}
              onChange={(e) => setSelectedBarChartOption(e.target.value)}
            >
              <option value="מחיר לשירות">שירותים</option>
              <option value="כמות שירותים לקבלן">קבלנים</option>
              <option value="כמות מוצר">מוצרים</option>
            </select>
          </label>
        </div>
        <Chart
          options={{
            xaxis: {
              categories: barChartLabels,
            },
          }}
          series={[{ name: selectedBarChartOption, data: barChartData }]}
          type="bar"
          height={350}
        />
      </div>
      <div className="chart-container">
        <h2 className="h2-graphs">דיאגרמת עוגה</h2>
        <div>
          <label>
            <select
              className="dashboard-select"
              value={selectedDonutChartOption}
              onChange={(e) => setselectedDonutChartOption(e.target.value)}
            >
              <option value="מחיר לשירות">שירותים</option>
              <option value="כמות מוצר">מוצרים</option>
            </select>
          </label>
        </div>
        <Chart
          options={{ labels: donutChartLabels }}
          series={donutChartData}
          type="donut"
          height={350}
        />
      </div>
    </div>
  );
};

export default Dashboard;

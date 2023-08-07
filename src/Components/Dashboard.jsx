import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Chart from "react-apexcharts";
import axios from "axios";
import Host from "../utils/routes";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Loader from "./Loader";

const Dashboard = () => {
  const { inventoryId, setInventoryId, project, setProject } =
    useContext(ProjectContext);
  const [contractorsArray, setContractorsArray] = useState([]);
  const [tools, setTools] = useState([]);
  const [orders, setOrders] = useState([]);
  const [service, setService] = useState([]);
  const [products, setProducts] = useState([]);
  // const [currentProject, setCurrentProject] = useState([]);
  const [selectedDonutChartOption, setselectedDonutChartOption] =
    useState("service");
  const [selectedDonutTwoChartOption, setselectedDonutTwoChartOption] =
    useState("service");
  const [selectedLineChartOption, setSelectedLineChartOption] =
    useState("service");
  const [selectedBarChartOption, setSelectedBarChartOption] =
    useState("service");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (project) {
      axios
        .post(
          `${Host}/project/get`,
          {},
          {
            headers: { projectId: localStorage.getItem("selectedProjectId") },
          }
        )
        .then(({ data }) => {
          console.log(data, "Thats a log");
          setProject(data);
          setInventoryId(data.inventory[0]);
          localStorage.setItem("inventoryId", data.inventory[0]._id);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  console.log(project, "This is the current project");
  console.log(inventoryId, "INVENTORY ID");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${Host}/product/getAll`, {
          inventoryId,
        });
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [inventoryId]);

  // console.log(products, "this is products");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractorsResponse = await axios.post(
          `${Host}/contractor/getAllContractor`,
          {},
          {
            headers: { projectId: project._id },
          }
        );
        setContractorsArray(contractorsResponse.data.contractors);

        const serviceResponse = await axios.post(
          `${Host}/contractor/getAllServices`,
          {
            contractorId: contractorsResponse.data.contractors.map(
              (order) => order._id
            ),
          }
        );
        setService(serviceResponse.data);
        // console.log(service, "this is the servicesss");

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

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [inventoryId]);

  // console.log(contractorsArray, "contractors array");

  const getLineChartData = () => {
    switch (selectedLineChartOption) {
      case "service":
        return {
          labels: service.map((v) => v.unit),
          data: service.map((v) => v.price),
        };
      case "contractors":
        return {
          labels: contractorsArray.map((contractor) => contractor.name),
          data: contractorsArray.map((contractor) => contractor._id),
        };
      case "product":
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

  const getBarChartData = () => {
    switch (selectedBarChartOption) {
      case "service":
        return {
          labels: service.map((v) => v.unit),
          data: service.map((v) => v.price),
        };
      case "contractors":
        return {
          labels: contractorsArray.map((contractor) => contractor.name),
          data: contractorsArray.map((contractor) => contractor._id),
        };
      case "product":
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

  const getDonutChartData = () => {
    switch (selectedDonutChartOption) {
      case "service":
        return {
          labels: service.map((v) => v.unit),
          data: service.map((v) => v.price),
        };
      case "contractors":
        return {
          labels: contractorsArray.map((contractor) => contractor.name),
          data: contractorsArray.map((contractor) => contractor._id),
        };
      case "product":
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

  const getDonutTwoChartData = () => {
    switch (selectedDonutTwoChartOption) {
      case "service":
        return {
          labels: service.map((v) => v.unit),
          data: service.map((v) => v.price),
        };
      case "contractors":
        return {
          labels: contractorsArray.map((contractor) => contractor.name),
          data: contractorsArray.map((contractor) => contractor._id),
        };
      case "product":
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
  const { labels: donutTwoLabels, data: donutTwoData } = getDonutTwoChartData();

  if (loading) {
    return (
      <Loader />
    )
  }
  // console.log(tools, "tools");
  // console.log(orders, "this is orders");
  // console.log(service, "the servicesssss");
  // console.log(products, "this is productsa");
  return (
    <div className="data-dashboard">
      <div className="chart-container">
        <h2 className="h2-graphs">גרף 1</h2>
        <div>
          <label>
            <select
              value={selectedLineChartOption}
              onChange={(e) => setSelectedLineChartOption(e.target.value)}
            >
              <option value="service">שירותים</option>
              <option value="contractors">קבלנים</option>
              <option value="product">מוצרים</option>
              <option value="tools">כלים</option>
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
        <h2 className="h2-graphs">גרף 2</h2>
        <div>
          <label>
            <select
              value={selectedBarChartOption}
              onChange={(e) => setSelectedBarChartOption(e.target.value)}
            >
              <option value="service">שירותים</option>
              <option value="contractors">קבלנים</option>
              <option value="product">מוצרים</option>
              <option value="tools">כלים</option>
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
        <h2 className="h2-graphs">גרף 3 </h2>
        <div>
          <label>
            <select
              value={selectedDonutChartOption}
              onChange={(e) => setselectedDonutChartOption(e.target.value)}
            >
              <option value="service">שירותים</option>
              <option value="contractors">קבלנים</option>
              <option value="product">מוצרים</option>
              <option value="tools">כלים</option>
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
      <div className="chart-container">
        <h2 className="h2-graphs">גרף 4 </h2>
        <div>
          <label>
            <select
              value={selectedDonutTwoChartOption}
              onChange={(e) => setselectedDonutTwoChartOption(e.target.value)}
            >
              <option value="service">שירותים</option>
              <option value="contractors">קבלנים</option>
              <option value="product">מוצרים</option>
              <option value="tools">כלים</option>
            </select>
          </label>
        </div>
        <Chart
          options={{ labels: donutTwoLabels }}
          series={donutTwoData}
          type="donut"
          height={350}
        />
      </div>
    </div>
  );
};

export default Dashboard;

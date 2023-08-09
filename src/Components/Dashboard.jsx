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
    useState("מחיר לשירות");
  const [selectedDonutTwoChartOption, setselectedDonutTwoChartOption] =
    useState("מחיר לשירות");
  const [selectedLineChartOption, setSelectedLineChartOption] =
    useState("כמות שירותים לקבלן");
  const [selectedBarChartOption, setSelectedBarChartOption] =
    useState("מחיר לשירות");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (project && localStorage.getItem("selectedProjectId") != undefined) {
      console.log(localStorage.getItem("selectedProjectId"), "GOT INTO THE IF");
      console.log(project, "Thats a project inside of the if");
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
          setProducts(data.inventory[0].products);
          setContractorsArray(data.contractors);
          setLoading(false);

          localStorage.setItem("ordersId", data.projectOrders);
          localStorage.setItem("inventoryId", data.inventory[0]._id);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  console.log(project, "This is the current project");
  console.log(inventoryId, "INVENTORY ID");

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.post(`${Host}/product/getAll`, {
  //         inventoryId,
  //       });
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.log("Error fetching products:", error);
  //     }
  //   };
  //   if (inventoryId) {
  //     fetchProducts();
  //   }
  // }, [inventoryId]);

  // console.log(products, "this is products");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //     const contractorsResponse = await axios.post(
        //       `${Host}/contractor/getAllContractor`,
        //       {},
        //       {
        //         headers: { projectId: localStorage.getItem("selectedProjectId") },
        //       }
        //     );
        //     setContractorsArray(contractorsResponse.data.contractors);

        const serviceResponse = await axios.post(
          `${Host}/contractor/getAllServices`,
          {
            contractorId: contractorsArray.map((order) => order._id),
          }
        );
        setService(serviceResponse.data);
        console.log(service, "this is the servicesss");

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
    console.log(service, "THIS IS THE SERVICE@$!@$@!#!@#");
    if (localStorage.getItem("inventoryId", inventoryId)) fetchData();
  }, [inventoryId]);

  // console.log(contractorsArray, "contractors array");

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
    "THIS IS THE PRODUCTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
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

  const getDonutTwoChartData = () => {
    switch (selectedDonutTwoChartOption) {
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
  const { labels: donutTwoLabels, data: donutTwoData } = getDonutTwoChartData();

  if (loading) {
    return <Loader />;
  }
  console.log(new Date());
  // console.log(tools, "tools");
  // console.log(orders, "this is orders");
  // console.log(service, "the servicesssss");
  // console.log(products, "this is productsa");
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
              {/* <option value="service">שירותים</option> */}
              <option value="כמות שירותים לקבלן">קבלנים</option>
              <option value="כמות מוצר">מוצרים</option>
              {/* <option value="tools">כלים</option> */}
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
              {/* <option value="tools">כלים</option> */}
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
              <option value="כמות שירותים לקבלן">קבלנים</option>
              <option value="כמות מוצר">מוצרים</option>
              {/* <option value="tools">כלים</option> */}
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
      {/* <div className="chart-container">
        <h2 className="h2-graphs">גרף 4 </h2>
        <div>
          <label>
            <select
              value={selectedDonutTwoChartOption}
              onChange={(e) => setselectedDonutTwoChartOption(e.target.value)}
            >
              <option value="מחיר לשירות">שירותים</option>
              <option value="כמות שירותים לקבלן">קבלנים</option>
              <option value="כמות מוצר">מוצרים</option>
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
      </div> */}
    </div>
  );
};

export default Dashboard;

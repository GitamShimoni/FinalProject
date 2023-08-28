import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";
import { ProjectContext } from "../Contexts/ProjectContext";
import axios from "axios";
import { Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import StatBox from "./StatBox";
import Host from "../utils/routes";
import { tokens } from "../Theme";

const AlternativeDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { inventoryId, setInventoryId, project, setProject } =
    useContext(ProjectContext);
  const [contractorsArray, setContractorsArray] = useState([]);
  const [orders, setOrders] = useState([]);
  const [service, setService] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedDonutChartOption, setselectedDonutChartOption] =
    useState("כמות מוצר");
  const [selectedLineChartOption, setSelectedLineChartOption] =
    useState("כמות שירותים לקבלן");
  const [selectedBarChartOption, setSelectedBarChartOption] =
    useState("מחיר לשירות");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (project && localStorage.getItem("selectedProjectId") !== undefined) {
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

  return (
    <Box margin={"20px"}>
      <Box marginBottom={"15px"}>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlined sx={{ marginRight: "10px" }} />
          Download Reports
        </Button>
      </Box>

      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gridAutoRows={"140px"}
        gap={"20px"}
      >
        <Box
          gridColumn={"span 3"}
          backgroundColor={colors.primary[400]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"10px"}
        >
          <StatBox
            title={"12,361"}
            subtitle={"email sent"}
            progress={"0.75"}
            increase={"+14%"}
            icon={
              <Email
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={"span 3"}
          backgroundColor={colors.primary[400]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"10px"}
        >
          <StatBox
            title={"431,361"}
            subtitle={"orders deliverd"}
            progress={"0.5"}
            increase={"+21%"}
            icon={
              <PointOfSale
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={"span 3"}
          backgroundColor={colors.primary[400]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"10px"}
        >
          <StatBox
            title={"32,361"}
            subtitle={"New Clients"}
            progress={"0.30"}
            increase={"+5%"}
            icon={
              <PersonAdd
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={"span 3"}
          backgroundColor={colors.primary[400]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"10px"}
        >
          <StatBox
            title={"1,500,361"}
            subtitle={"Traffic"}
            progress={"0.80"}
            increase={"+43%"}
            icon={
              <Traffic
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={"span 8"}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
        >
          <Box
            marginTop={"25px"}
            padding={"0 30px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={"600"}
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight={"bold"}
                color={colors.greenAccent[500]}
              >
                $59,234,325
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlined
                  sx={{
                    fontSize: "26px",
                    color: colors.greenAccent[500],
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height={"250px"} marginTop={"-20px"}>
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn={"span 4"}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
          overflow={"auto"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            padding={"15px"}
          >
            <Typography
              color={colors.grey[100]}
              variant="h5"
              fontWeight={"600"}
            >
              Recent Transactions
            </Typography>
          </Box>
          {orders
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((order) => {
              return (
                <Box
                  key={order._id}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  padding={"15px"}
                  borderBottom={`1px solid ${colors.primary[500]}`}
                >
                  <Typography
                    variant="body2"
                    color={colors.grey[100]}
                    fontWeight={"600"}
                  >
                    {order.client}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={colors.grey[100]}
                    fontWeight={"600"}
                  >
                    {order.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={colors.grey[100]}
                    fontWeight={"600"}
                  >
                    {order.total}$
                  </Typography>
                </Box>
              );
            })}
        </Box>
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(12, 1fr)"}
          gridAutoRows={"140px"}
          gap={"20px"}
        >
          <Box gridColumn={"span 8"} gridRow={"span 2"}>
            <LineChart />
          </Box>
          <Box gridColumn={"span 4"} gridRow={"span 2"}>
            <BarChart />
          </Box>
          <Box gridColumn={"span 4"} gridRow={"span 2"}>
            <PieChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AlternativeDashboard;

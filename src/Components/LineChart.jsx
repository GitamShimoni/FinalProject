import React, { useState, useEffect, useContext } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import Host from "../utils/routes";
import { ProjectContext } from "../Contexts/ProjectContext";

const LineChart = () => {
  const { project } = useContext(ProjectContext);
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeOption, setSelectedTimeOption] = useState("week");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${Host}/endDay/getServicesByTime`, {
          projectId: project._id,
          timeOption: selectedTimeOption,
        });

        const serviceChartData = response.data.map((entry) => ({
          x: entry.date,
          y: entry.servicesCount,
        }));

        setServiceData(serviceChartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (project && selectedTimeOption) {
      fetchData();
    }
  }, [project, selectedTimeOption]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <ResponsiveLine
        data={[
          {
            id: "services",
            data: serviceData,
          },
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Tool Types",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Tool Count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
  );
};

export default LineChart;

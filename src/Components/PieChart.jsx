import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";
import Host from "../utils/routes";
import { ProjectContext } from "../Contexts/ProjectContext";

const PieChart = () => {
  const { project } = useContext(ProjectContext);
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceResponse = await axios.post(
          `${Host}/contractor/getAllServices`,
          {
            projectId: project._id,
          }
        );
        const processedServiceData = serviceResponse.data.map(
          (serviceItem) => ({
            id: serviceItem.sectionName,
            value: serviceItem.quantity,
          })
        );
        setServiceData(processedServiceData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (project) {
      fetchData();
    }
  }, [project]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <ResponsivePie
        data={serviceData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", "0.2"]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextOffset={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
  );
};
export default PieChart;

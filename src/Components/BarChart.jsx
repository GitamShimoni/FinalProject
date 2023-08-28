import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import Host from "../utils/routes";
import { ProjectContext } from "../Contexts/ProjectContext";

const BarChart = () => {
  const { project } = useContext(ProjectContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.post(`${Host}/product/getAll`, {
          inventoryId: project.inventory[0]._id,
        });
        setProducts(productsResponse.data);
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

  const data = products.map((product) => ({
    id: product.name,
    quantity: product.quantity,
    minQuantity: product.minQuantity,
    isUnderstocked: product.quantity <= product.minQuantity,
  }));

  return (
      <ResponsiveBar
        data={data}
        keys={["quantity", "minQuantity"]}
        indexBy="id"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: false }}
        colors={(bar) => (bar.data.isUnderstocked ? "#FF0000" : "#1f77b4")}
        // Update the axisBottom and axisLeft props
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "מוצרים",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "כמות",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableGridY={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={(bar) =>
          bar.data.isUnderstocked ? "#FF0000" : "#000000"
        }
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: true,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 81,
            itemHeight: 24,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          `${e.id}: ${e.formattedValue} במוצר: ${e.indexValue}`
        }
      />
  );
};

export default BarChart;

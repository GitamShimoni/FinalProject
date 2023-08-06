import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Host from "../utils/routes";
import { ProjectContext } from "../Contexts/ProjectContext";
import InventoryTable from "./InventoryTable";
import "./InventoryPage.css";
function InventoryPage() {
  const { setInventoryArr } = useContext(ProjectContext);
  const [productsArr, setProductsArr] = useState([]);
  const [ironsArr, setIronsArr] = useState([]);
  const [needToOrderArr, setNeedToOrderArr] = useState([]);

  useEffect(() => {
    const inventoryId = "64bfb6686d6efc963d2855ec";
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${Host}/product/getAll`, {
          inventoryId,
        });
        console.log(response.data);
        setInventoryArr(response.data);

        const products = response.data.filter((item) => !item.isIron);
        const irons = response.data.filter((item) => item.isIron);
        const toOrderArr = response.data.filter(
          (item) => item.minQuantity >= item.quantity
        );

        setNeedToOrderArr(toOrderArr);
        setProductsArr(products);
        setIronsArr(irons);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setInventoryArr]);

  return (
    <div className="inventory-page-container">
      <h1>ברזל</h1>
      <InventoryTable inventoryArr={ironsArr} />
      <h1>מתכלים</h1>
      <InventoryTable inventoryArr={productsArr} />

      <h1>:צריך להזמין</h1>
      {needToOrderArr.length>0 ? (
        <div>
          <InventoryTable inventoryArr={needToOrderArr} />
          <Link to={"/orders"}>לביצוע הזמנה עבור להזמנות</Link>
        </div>
      ) : (
        <div><h1>כרגע אין חומרים שדרוש להזמין </h1></div>
      )}
    </div>
  );
}

export default InventoryPage;

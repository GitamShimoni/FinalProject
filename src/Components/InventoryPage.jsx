import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Host from "../utils/routes";
import { ProjectContext } from "../Contexts/ProjectContext";
import InventoryTable from "./InventoryTable";
import "./InventoryPage.css";
import { useNavigate } from "react-router-dom";

function InventoryPage() {
  const { setInventoryArr, inventoryId } = useContext(ProjectContext);
  const [productsArr, setProductsArr] = useState([]);
  const [ironsArr, setIronsArr] = useState([]);
  const [needToOrderArr, setNeedToOrderArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${Host}/product/getAll`, {
          inventoryId: localStorage.getItem("inventoryId"),
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

    if (inventoryId) {
      console.log(inventoryId);
      fetchProducts();
    }
  }, [setInventoryArr, inventoryId]);

  console.log(inventoryId);
  return (
    <div className="inventory-page-container">
      <h1>ברזל</h1>
      <InventoryTable inventoryArr={ironsArr} />
      <h1>מתכלים</h1>
      <InventoryTable inventoryArr={productsArr} />
      <h1>:צריך להזמין</h1>
      {needToOrderArr.length > 0 ? (
        <div className="inventoryPage-need-to-order">
          <InventoryTable inventoryArr={needToOrderArr} />
          <div
            className="inventoryPage-order-btn"
            onClick={() => navigate("/orders")}
          >
            <h3>לביצוע הזמנה עבור להזמנות</h3>
          </div>
        </div>
      ) : (
        <div>
          <h1>כרגע אין חומרים שדרוש להזמין </h1>
        </div>
      )}
    </div>
  );
}

export default InventoryPage;

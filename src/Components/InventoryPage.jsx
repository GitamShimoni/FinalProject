import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Host from "../utils/routes";
import { ProjectContext } from "../Contexts/ProjectContext";
import InventoryTable from "./InventoryTable";
import "./InventoryPage.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function InventoryPage() {
  const [inventoryId, setInventoryId] = useState("");
  const [productsArr, setProductsArr] = useState([]);
  const [ironsArr, setIronsArr] = useState([]);
  const [needToOrderArr, setNeedToOrderArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inventoryArr, setInventoryArr] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${Host}/product/getAll`, {
          inventoryId: localStorage.getItem("inventoryId"),
        });
        console.log(response.data, "THIS IS THE INVENTORY");
        setInventoryArr(response.data);

        const products = response.data.filter((item) => !item.isIron);
        const irons = response.data.filter((item) => item.isIron);
        const toOrderArr = response.data.filter(
          (item) => item.minQuantity >= item.quantity
        );

        setNeedToOrderArr(toOrderArr);
        setProductsArr(products);
        setIronsArr(irons);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setInventoryArr, inventoryId]);
  if (loading) {
    return <Loader />;
  }

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

// useEffect(() => {
//   const checkTokenAndFetch = async () => {
//     const token = localStorage.getItem("token");

//     if (!token || token == null || token == undefined) {
//       useNavigate("/")
//     }
// else{
//   const answer = await axios.post(`${Host}/users/isToken`,{
//   token: token
//  })
//  console.log(answer);
// }
// try {
//   const response = await axios.post(`${Host}/product/getAll`, {
//     inventoryId: localStorage.getItem("inventoryId"),
//   });

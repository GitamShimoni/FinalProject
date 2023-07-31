import { useEffect, useState } from "react";
import axios from "axios";
import ProductOrder from "./ProductOrder";
import "./ProductOrdersTable.css";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
const ProductOrdersTable = () => {
  const { productOrders, setProductOrders, orders, setOrders } =
    useContext(ProjectContext);
  // const [tools, setTools] = useState([]);
  useEffect(() => {
    const ordersId = "64c6496edd068b2c46962f28";
    axios
      .post(`${Host}/productOrder/getAllProductOrders`, {
        ordersId,
      })
      .then(({ data }) => setOrders([data]))
      .catch((err) => console.log(err));
    console.log(orders);
  }, []);
  useEffect(() => {
    setProductOrders(orders[0]?.productOrders);
  }, [orders]);
  console.log(productOrders, "This is the product orders");
  return (
    <div className="project-orders-table">
      <div className="project-orders-tr">
        <div className="project-orders-toprow-tr">{`ספק`}</div>
        <div
          className="project-orders-toprow-tr"
          id="project-orders-topleft-td"
        >{`סטאטוס`}</div>
        <div className="project-orders-toprow-tr">{`תאריך הזמנה`}</div>
        <div className="project-orders-toprow-tr">{`כמות מוזמנת`}</div>
        <div
          className="project-orders-toprow-tr"
          id="project-orders-topright-td"
        >{`מוצר`}</div>
      </div>
      {productOrders?.map((order, index) => {
        return <ProductOrder key={index} order={order} index={index} />;
      })}
    </div>
  );
};

export default ProductOrdersTable;

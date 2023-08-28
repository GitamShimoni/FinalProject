import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductOrdersTable.css";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
import CashFlowOrderRow from "./CashFlowOrderRow";

function CashFlowContractorTable() {
    const { productOrders, setProductOrders, orders, setOrders } =
    useContext(ProjectContext);

  useEffect(() => {
    const ordersId = "64c6496edd068b2c46962f28";
    axios
      .post(`${Host}/productOrder/getAllProductOrders`, {
        ordersId,
      })
      .then(({ data }) => {
        setOrders([data]);
      })
      .catch((err) => console.log(err));
    console.log(orders, "Thats a fetch for the orders");
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const sortedProductOrders = orders[0]?.productOrders.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setProductOrders(sortedProductOrders);
    }
  }, [orders]);
  console.log(productOrders, "This is the product orders");

  return (
    <div>
      <div className="project-orders-table">
        <div className="project-orders-tr">
          <div className="project-orders-toprow-tr">{`כמות`}</div>
          <div className="project-orders-toprow-tr">{`שירות`}</div>
          <div className="project-orders-toprow-tr">{`קבלן`}</div>
          <div className="project-orders-toprow-tr">{`מחיר`}</div>
          <div className="project-orders-toprow-tr">{`תאריך`}</div>
        </div>
        {productOrders?.map((order, index) => {
          return <CashFlowOrderRow key={index} order={order} index={index} />;
        })}
      </div>
    </div>
  );
}

export default CashFlowContractorTable

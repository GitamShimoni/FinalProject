import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductOrder from "./ProductOrder";
import "./ProductOrdersTable.css";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
import Loader from "./Loader";
import ProductOrderForm from "./ProductOrderForm";
import { useDownloadExcel } from "react-export-table-to-excel";

const ProductOrdersTable = () => {
  const { productOrders, setProductOrders, orders, setOrders } =
    useContext(ProjectContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [tools, setTools] = useState([]);

  //SHOULD ADD SORTING FILTER THAT SORTS THE ORDERS FROM PENDING TO NOT PENDING
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
    setProductOrders(orders[0]?.productOrders);
  }, [orders]);
  console.log(productOrders, "This is the product orders");
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Product Orders Table",
    sheet: "Product Orders Table",
  });
  return (
    <div style={{display: "flex", flexDirection: "column-reverse" }}>
      <button
        className="tool-to-excel-button"
        onClick={onDownload}
        style={{marginBottom: "15px"}}
      >
       {`יצוא ל Excel`}
      </button>
      <div className="project-orders-table" ref={tableRef}>
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
    </div>
  );
};

export default ProductOrdersTable;

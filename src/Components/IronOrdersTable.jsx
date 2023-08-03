import { useEffect, useState } from "react";
import axios from "axios";
import "./IronOrdersTable.css";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
import IronOrder from "./IronOrder";
const IronOrdersTable = () => {
  const { ironOrders, setIronOrders, orders, setOrders } =
    useContext(ProjectContext);
  // const [tools, setTools] = useState([]);

  //SHOULD ADD SORTING FILTER THAT SORTS THE ORDERS FROM PENDING TO NOT PENDING
  useEffect(() => {
    const ordersId = "64c6496edd068b2c46962f28";
    axios
      .post(`${Host}/productOrder/getAllIronOrders`, {
        ordersId,
      })
      .then(({ data }) => setIronOrders(data.ironOrders))
      .catch((err) => console.log(err));
    console.log(orders);
  }, []);
  console.log(orders, "THIS IS THE ORDERS!!!!!!!!");
  console.log(ironOrders, "This is the product orders");

  return (
    <div className="project-ironOrders-table">
      <div className="project-ironOrders-tr">
        <div className="project-ironOrders-toprow-tr">{`תצלום`}</div>
        <div className="project-ironOrders-toprow-tr">{`ספק`}</div>
        <div
          className="project-ironOrders-toprow-tr"
          id="project-ironOrders-topleft-td"
        >{`סטאטוס`}</div>
        <div className="project-ironOrders-toprow-tr">
          <h3>{`תאריך שהוזמן`}</h3>
          <h3>{`תאריך שהגיע`}</h3>
        </div>
        <div className="project-ironOrders-toprow-tr">
          <h3>{`כמות מוזמנת`}</h3>
          <h3>{`כמות שהגיע`}</h3>
        </div>
        <div
          className="project-ironOrders-toprow-tr"
          id="project-ironOrders-topright-td"
        >{`שם ברזל`}</div>
      </div>
      {ironOrders?.map((order, index) => {
        return <IronOrder key={index} order={order} index={index} />;
      })}
    </div>
  );
};

export default IronOrdersTable;

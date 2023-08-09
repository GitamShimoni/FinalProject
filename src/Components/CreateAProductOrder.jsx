import { useState } from "react";
import "./CreateAProductOrder.css";
import axios from "axios";
import Host from "../utils/routes";
import { ProjectContext } from "../Contexts/ProjectContext";
import { useContext } from "react";
import Loader from "./Loader";
const CreateAProductOrder = () => {
  const [productName, setProductName] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productSupplier, setProductSupplier] = useState("");
  const [loading, setLoading] = useState(true)

  const { productOrders, setProductOrders } = useContext(ProjectContext);

  const handleCreateAProductOrder = async () => {
    try {
      await axios
        .post(`${Host}/productOrder/createProductOrder`, {
          //NEED TO CHANGE THE ORDERS ID WITH THE CONTEXT
          ordersId: "64c6496edd068b2c46962f28",
          productName: productName,
          unit: productUnit,
          quantity: productQuantity,
          supplier: productSupplier,
          status: "pending",
        })
        .then(({ data }) => {
          setProductOrders(data);
          setLoading(false)
        });
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };
  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <div id="create-aproduct-container">
      <h2 id="create-aproduct-header">צור הזמנה חדשה</h2>
      <div id="create-aproduct-inputs-div">
        <div className="create-aproduct-input-div">
          <h4 className="create-aproduct-name-header">שם המוצר</h4>
          <input
            onChange={(e) => setProductName(e.target.value)}
            className="create-aproduct-input"
            type="text"
            placeholder="שם המוצר"
          />
        </div>
        <div className="create-aproduct-input-div">
          <h4 className="create-aproduct-name-header">יחידת מידה</h4>
          <input
            onChange={(e) => setProductUnit(e.target.value)}
            className="create-aproduct-input"
            type="text"
            placeholder="יחידת מידה"
          />
        </div>
        <div className="create-aproduct-input-div">
          <h4 className="create-aproduct-name-header">כמות</h4>
          <input
            onChange={(e) => setProductQuantity(e.target.value)}
            className="create-aproduct-input"
            type="text"
            placeholder="כמות"
          />
        </div>
        <div className="create-aproduct-input-div">
          <h4 className="create-aproduct-name-header">ספק</h4>
          <input
            onChange={(e) => setProductSupplier(e.target.value)}
            className="create-aproduct-input"
            type="text"
            placeholder="כמות"
          />
        </div>
      </div>
      <button
        onClick={() => handleCreateAProductOrder()}
        id="create-aproduct-button"
      >
        הוסף
      </button>
    </div>
  );
};

export default CreateAProductOrder;

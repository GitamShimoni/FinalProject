import axios from "axios";
import Host from "../utils/routes";
import "./ProductOrderForm.css";
import { ProjectContext } from "../Contexts/ProjectContext";
import { useContext } from "react";
function ProductOrderForm() {
  const { productOrders, setProductOrders } = useContext(ProjectContext);
  // const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in 'yyyy-mm-dd' format
  let currentDate = new Date();
  currentDate.setHours(12, 0, 0, 0);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const productName = e.target[0].value;
    const dateOfOrder = e.target[1].value || currentDate; // Use current date if not selected
    const quantity = e.target[2].value;
    const unit = e.target[3].value;
    const supplier = e.target[4].value;

    try {
      await axios
        .post(`${Host}/productOrder/createProductOrder`, {
          //NEED TO CHANGE THE ORDERS ID WITH THE CONTEXT
          ordersId: "64c6496edd068b2c46962f28",
          productName: productName,
          dateOfOrder: dateOfOrder,
          unit: unit,
          quantity: quantity,
          supplier: supplier,
          status: "pending",
        })
        .then(({ data }) => {
          setProductOrders(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div id="ProductOrderForm-form-container">
        <form onSubmit={handleSubmitForm} id="Product-Order-Form">
          <h2>צור הזמנה חדשה</h2>
          <h2 className="ProductOrderForm-form-title">:שם המוצר</h2>
          <input
            required
            type="text"
            className="product-name ProductOrderForm-input"
            placeholder="שם המוצר"
          />
          <h2 className="ProductOrderForm-form-title">:תאריך ביצוע ההזמנה</h2>
          <input
            type="date"
            className="date-Of-order ProductOrderForm-input"
            placeholder="תאריך ביצוע ההזמנה"
          />
          <h2 className="ProductOrderForm-form-title">:כמות</h2>
          <input
            required
            type="number"
            className="quantity ProductOrderForm-input"
            placeholder="כמות"
          />
          <h2 className="ProductOrderForm-form-title">:יחידות</h2>
          <input
            required
            type="text"
            className="unit ProductOrderForm-input"
            placeholder="'יח"
          />
          <h2 className="ProductOrderForm-form-title">:ספק</h2>
          <input
            required
            type="text"
            className="unit ProductOrderForm-input"
            placeholder="ספק"
          />
          <button className="product-order-submit-btn" type="submit">
            הזמן
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductOrderForm;
